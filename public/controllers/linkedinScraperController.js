const fetch = require("node-fetch");

exports.triggerLinkedInScrape = async (req, res, next) => {
    try {
        const packageData = req.body; // Already a JS object
        const link = packageData[0].url
        console.log("Received Data:", packageData);
        console.log("URL Data:", link);

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
        console.log("Snapshot ID:", res.locals.snapshot_id);

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
        return null;
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
            console.log(data);
            try {
                const status = data.status || "unknown"; // Safely get the status
                console.log("Snapshot Status:", status);
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
exports.getJobPost = async (req, res) => {
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
            const text = await response.text();
            try {
                //const data = JSON.parse(text); // Convert text to JSON
                console.log("Scraped Data:", text);
                return res.json(text); // Send data response
            } catch (jsonError) {
                console.warn(`Attempt ${attempt}: Snapshot not ready yet. Retrying...`);
            }

        } catch (error) {
            console.error("Error fetching job post data:", error);
        }

        if (attempt < maxRetries) {
            await delay(20000); // Wait 20 seconds before retrying
        } else {
            return res.status(500).json({ error: "Failed to retrieve job post data after multiple attempts." });
        }
    }
};
//Maybe push to DB from here? 