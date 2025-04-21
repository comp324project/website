//Check authentication first!!

///BrightData API call
const urlInputButton = document.getElementById("url-input-button");
urlInputButton.addEventListener('click', async () => {
    let input = document.getElementById("url-input-text").value.trim();
    if (!input) {
        return;
    }
    if (isLinkedInUrl(input)) {
        triggerLinkedInScrape(input);
        //const resume = generateResume(jobData)
    } else if(isIndeedUrl(input)){
        triggerIndeedScrape(input);
    } else {
        alert('Please enter a valid job posting URL.');
    }
});

// Function to check if the URL is a LinkedIn URL
function isLinkedInUrl(url) {
    const expected = "linkedin.com/jobs/view";
    const linkedin = "linkedin.com"
    if (url.includes(linkedin)){
        if (url.includes(expected)){
            return true;
        }
        alert('LinkedIn job posting URLs must be in the format: linkedin.com/jobs/view')
    } 
    return false;
}
function isIndeedUrl(url){
    const expected = 'indeed.com/viewjob?'
    const indeed = 'indeed.com'
    if (url.includes(indeed)){
        if (url.includes(expected)){
            return true;
        }
        alert('Indeed job posting URLs must be in the format: indeed.com/viewjob?')
    }
    return false;
}

//Method to call backend Deepseek Resume Tailoring
async function generateResume(jobPost) {
    const response = await fetch('/api/deepseek/tailor', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ jobPost })
    });
    return await response.json();
  }

//Function to trigger a LinkedInScrape by BrightData API
async function triggerLinkedInScrape(input){
    try {
        // Call the BrightData API for LinkedIn scraping
        const response = await fetch('/api/brightdata/linkedin/trigger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ url: input }])
        });
        const data = await response.json();
        const jobId = data.jobId;
        console.log("jobId: ",jobId);
        triggerResumeTailor(jobId);
        return;
    } catch (error) {
        console.error('Error calling BrightData API:', error);
    }
}
//Function to trigger a LinkedInScrape by BrightData API
async function triggerIndeedScrape(input){
    try {
        // Call the BrightData API for LinkedIn scraping
        const response = await fetch('/api/brightdata/indeed/trigger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ url: input }])
        });
        const data = await response.json();
        const jobId = data.jobId;
        triggerResumeTailor(jobId);
        return;
        // Handle the response (e.g., display data)
    } catch (error) {
        console.error('Error calling BrightData API:', error);
    }
}
async function triggerResumeTailor(jobId){
    try{
        const resume = await fetch('/api/deepseek/tailor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobId: jobId })
        });
        const data =await response.json();
        return;
    } catch(err){
        console.error("Error tailoring resume: ",err);
    }
}