const toggleButton = document.getElementById("sidebar-toggle")
const sidebar = document.getElementById("sidebar")

function toggleSidebar(){
    sidebar.classList.toggle("close")
}

///BrightData API call
const urlInputButton = document.getElementById("url-input-button");
urlInputButton.addEventListener('click', async () => {
    let input = document.getElementById("url-input-text");
    input = input.value.trim();
    if (!input) {
        return;
    }
    console.log("URL: "+input);
    if (isLinkedInUrl(input)) {
        
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
    } else {
        alert('Please enter a valid LinkedIn URL.');
    }
});

// Function to check if the URL is a LinkedIn URL
function isLinkedInUrl(url) {
    const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com/;
    return linkedinPattern.test(url);
}