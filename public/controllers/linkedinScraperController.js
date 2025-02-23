const fetch = require("node-fetch");

exports.triggerLinkedInScrape = async (req, res, next) => {
    const package = req.body;
    const url_string = JSON.parse(package);
    console.log("URL Data: "+url_string[0].url);
    try {
        const response = await fetch(
            "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lpfll7v5hcqtkxl6l&format=json&uncompressed_webhook=true&include_errors=true",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer "+process.env.BRIGHTDATA_API_TOKEN,
                    "Content-Type": "application/json",
                },
                body: data,
            }
        );
        const json = await response.json();
        
        console.log("response:"+json);
        // Assuming json contains the snapshot_id we need
        const snapshot_id = json.snapshot_id;

        // Call the next middleware or route (e.g., call another route to get job post data)
        req.snapshot_id = snapshot_id;  // Add snapshot_id to the response object
        console.log("Snapshot ID" +req.snapshot_id);
        next(); // Pass the control to the next middleware (like getJobPost)
    } catch (error) {
        console.error("Error triggering scrape:", error);
        res.status(500).send("Error triggering LinkedIn scrape.");
    }
};

// Get job post using snapshot_id
exports.getJobPost = async (req, res) => {
    const snapshot_id = req.snapshot_id;
    console.log(snapshot_id);

    if (!snapshot_id) {
        return res.status(400).send("No snapshot_id available.");
    }

    try {
        const response = await fetch(`https://api.brightdata.com/datasets/v3/snapshot?id=${snapshot_id}&format=json`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.BRIGHTDATA_API_TOKEN,
            },
        });
        const data = await response.json();

        // Return the scraped job data as response
        res.json(data);
    } catch (error) {
        console.error("Error fetching job post data:", error);
        res.status(500).send("Error fetching job post data.");
    }
};
