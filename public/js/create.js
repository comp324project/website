const sidebar = document.getElementById("sidebar");

sidebar.addEventListener("mouseover", sidebarHover, false);
sidebar.addEventListener("mouseout", sidebarHoverExit, false);

function sidebarHover(){
    sidebar.classList.remove('close');
}
function sidebarHoverExit(){
    sidebar.classList.add('close');
}
///BrightData API call
const urlInputButton = document.getElementById("url-input-button");
urlInputButton.addEventListener('click', async () => {
    let input = document.getElementById("url-input-text").value.trim();
    if (!input) {
        return;
    }
    if (isLinkedInUrl(input)) {
        triggerLinkedInScrape(input);
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
        if (data && data.length > 0) {
            // Assuming the response has data in the structure you expect
            const jobData = data[0];  // Assuming the first item in the response contains the job posting details
      
            // Create a new job posting document from the response
            const jobPosting = new JobPosting({
              url: url,
              job_title: jobData.job_title,
              company_name: jobData.company_name,
              job_summary: jobData.job_summary,
              location: jobData.location,
              date_posted: jobData.date_posted,
              salary: jobData.salary,
            });
      
            // Save the job posting to the database
            //await jobPosting.save();
        // Handle the response (e.g., display data)
        }
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
        if (data && data.length > 0) {
            // Assuming the response has data in the structure you expect
            const jobData = data[0];  // Assuming the first item in the response contains the job posting details
      
            // Create a new job posting document from the response
            const jobPosting = new JobPosting({
              url: url,
              job_title: jobData.job_title,
              company_name: jobData.company_name,
              job_summary: jobData.job_summary,
              location: jobData.location,
              date_posted: jobData.date_posted,
              salary: jobData.salary,
            });
      
            // Save the job posting to the database
            //await jobPosting.save();
        // Handle the response (e.g., display data)
        }
    } catch (error) {
        console.error('Error calling BrightData API:', error);
    }
}