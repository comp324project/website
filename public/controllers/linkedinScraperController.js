const fetch = require("node-fetch");
const JobSchema = require('../models/jobSchema');

exports.triggerLinkedInScrape = async (req, res, next) => {
    try {
        const packageData = req.body; // Already a JS object
        const link = packageData[0].url

        if (!link) {
            return res.status(400).json({ error: "Missing URL in request body." });
        }

        const payload = JSON.stringify([{ url: link }]); // JSONify payload

        const response = await fetch(
            "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lpfll7v5hcqtkxl6l&format=json&uncompressed_webhook=true&include_errors=true",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env.BRIGHTDATA_API_TOKEN,
                    "Content-Type": "application/json",
                },
                body: payload,
            }
        );

        const json = await response.json();

        if (!json.snapshot_id) {
            return res.status(500).json({ error: "No snapshot_id returned from API." });
        }

        res.locals.snapshot_id = json.snapshot_id; // Use res.locals to store temporary data
        //console.log("Snapshot ID:", res.locals.snapshot_id);

        next(); // Call monitorProgress
    } catch (error) {
        console.error("Error triggering scrape:", error);
        res.status(500).json({ error: "Error triggering LinkedIn scrape." });
    }
};

// Checks API scraping progress, passes control to getJobPost when scrape is complete
exports.monitorProgress = async (req, res, next) => {
    const snapshot_id = res.locals.snapshot_id;
    if (typeof snapshot_id !== "string") {
        console.error("Invalid snapshot_id:", snapshot_id);
        return res.status(400).json({ error: "Invalid snapshot_id" });
    }
    const maxRetries = 10; // Max number of retries
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Delay function
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try{
            const response = await fetch("https://api.brightdata.com/datasets/v3/progress/" + snapshot_id,
                {
                    method: "GET",        
                    headers: {
                        "Authorization": "Bearer " + process.env.BRIGHTDATA_API_TOKEN,
                    },
                }
            )
            const data = await response.json();
            //console.log(data);
            try {
                const status = data.status || "unknown"; // Safely get the status
                if (status == "ready"){
                    next(); //call getJobPost
                    return;
                }
            } catch (jsonError) {
                console.warn(`Attempt ${attempt}: Snapshot not ready yet. Retrying...`);
            }
        }
        catch(error){
            console.error("Error fetching scrape status:", error);
        }
        // Wait before retrying
        if (attempt < maxRetries) {
            await delay(6000); // Wait 6 seconds before retrying
        } else {
            return res.status(500).json({ error: "Failed to retrieve job post data after multiple attempts." });
        }
    }
}

// Get job post using snapshot_id with timeout/retry functions
exports.getJobPost = async (req, res, next) => {
    const snapshot_id = res.locals.snapshot_id; // Get snapshot_id from previous middleware

    if (!snapshot_id) {
        return res.status(400).json({ error: "No snapshot_id available." });
    }

    const maxRetries = 3; // Max number of retries
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Delay function

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`https://api.brightdata.com/datasets/v3/snapshot/`+snapshot_id,
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + process.env.BRIGHTDATA_API_TOKEN,
                    },
                }
            );

            // Check if the response is valid JSON
            const data = await response.json();
            try {
                //console.log("Scraped Data:", data);
                res.locals.job = data;
                next();
                return;
            } catch (jsonError) {
                console.warn(`Attempt ${attempt}: Snapshot not ready yet. Retrying...`);
            }

        } catch (error) {
            console.error("Error fetching job post data:", error);
        }

        if (attempt < maxRetries) {
            await delay(10000); // Wait 10 seconds before retrying
        } else {
            return res.status(500).json({ error: "Failed to retrieve job post data after multiple attempts." });
        }
    }
};
//Push job posting to DB after scrape
exports.storeJobPost = async (req, res, next) => {
    const data = res.locals.job;
    if (data) {
        console.log(data);
        // Create a new job posting document from the response
        const jobSchema = new JobSchema({
            job_posting_url: data.url,
            job_title: data.job_title,
            company_name: data.company_name,
            job_summary: data.job_summary,
            location: data.job_location, // Changed from location to job_location
            date_posted: data.job_posted_date,
        });
      
        // Save the job posting to the database
        await jobSchema.save();
        next();
        return;
    }
    else{
        console.error("Job posting data not found")
        return res.status(500);
    }
};