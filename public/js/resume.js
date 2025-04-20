//Sidebar functionality
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById('sidebar-toggle')

sidebarToggle.addEventListener('click', function(){
    sidebar.classList.toggle('close')
});

document.addEventListener("DOMContentLoaded", () => {
    getResume(); // fetch resume from DB and the update page once DOM is loaded
});

//Function to load master resume from db
function getResume(){
    //fetch resume from db
    fetch('/db/resume', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch resume.");
        }
        return res.json(); //This parses the response body as JSON
    })
    .then(data => {
        //const resume = data.resume; // Access the actual resume data from the parsed JSON
        console.log("Loaded resume:", data.masterResume);
        updateResumeView(data.masterResume);//Use resume to fill out master resume fields
    })
    
}
function updateResumeView(resume){
    // Basic info
    document.getElementById("name").value = resume.name || "";
    document.getElementById("summary").value = resume.summary || "";
    document.getElementById("email").value = resume.email || "";
    document.getElementById("phone").value = resume.phone || "";
    document.getElementById("website").value = resume.website || "";
    document.getElementById("location").value = resume.location || "";

    // Skills
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = "";
    if (Array.isArray(resume.skills)) {
        resume.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    // Experience
    const experienceSection = document.getElementById("experience-section");
    document.querySelectorAll(".experience-entry").forEach(e => e.remove()); // clear
    resume.experience?.forEach(exp => {
        addExperience();
        const last = experienceSection.querySelectorAll(".experience-entry:last-of-type")[0];
        last.querySelector(".exp-company").value = exp.company || "";
        last.querySelector(".exp-title").value = exp.title || "";
        last.querySelector(".exp-date").value = exp.date || "";
        last.querySelector(".exp-description").value = exp.description || "";
    });

    // Education
    const educationSection = document.getElementById("education-section");
    document.querySelectorAll(".education-entry").forEach(e => e.remove());
    resume.education?.forEach(edu => {
        addEducation();
        const last = educationSection.querySelectorAll(".education-entry:last-of-type")[0];
        last.querySelector(".edu-school").value = edu.school || "";
        last.querySelector(".edu-date").value = edu.date || "";
        last.querySelector(".edu-degree").value = edu.degree || "";
        last.querySelector(".edu-gpa").value = edu.gpa || "";
        last.querySelector(".edu-achievements").value = edu.achievements || "";
    });

    // Projects
    const projectsSection = document.getElementById("projects-section");
    document.querySelectorAll(".project-entry").forEach(e => e.remove());
    resume.projects?.forEach(proj => {
        addProject();
        const last = projectsSection.querySelectorAll(".project-entry:last-of-type")[0];
        last.querySelector(".proj-title").value = proj.title || "";
        last.querySelector(".proj-date").value = proj.date || "";
        last.querySelector(".proj-description").value = proj.description || "";
        last.querySelector(".proj-bullets").value = (proj.bullets || []).join("\n");
    });

    //Involvement
    const involvementSection = document.getElementById("involvement-section");
    document.querySelectorAll(".involvement-entry").forEach(e => e.remove()); // clear
    resume.involvement?.forEach(involve => {
        addInvolvement();
        const last = involvementSection.querySelectorAll(".involvement-entry:last-of-type")[0];
        last.querySelector(".involvement").value = involve.inv || "";
        last.querySelector(".involvement-description").value = involve.invDesc || "";
    });

    // References
    const referencesSection = document.getElementById("references-section");
    document.querySelectorAll(".reference-entry").forEach(e => e.remove());
    resume.references?.forEach(ref => {
        addReference();
        const last = referencesSection.querySelectorAll(".reference-entry:last-of-type")[0];
        last.querySelector(".ref-dept").value = ref.dept || "";
        last.querySelector(".ref-name").value = ref.name || "";
        last.querySelector(".ref-email").value = ref.email || "";
        last.querySelector(".ref-phone").value = ref.phone || "";
    });
    updateResumePreview(); //Update preview after document elements are loaded
}

// Function to add a new text field
function addField(sectionId) {
    const section = document.getElementById(sectionId);
    const newField = document.createElement('div');
    const newTextarea = document.createElement('textarea');
    newTextarea.name = `${sectionId}[]`;
    newField.appendChild(newTextarea);
    section.appendChild(newField);
}

// Skills functionality (consider removing)
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');
const resSkills = document.getElementById('res-skills');

skillInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (skillInput.value.trim()) {
            const li = document.createElement('li');
            li.textContent = skillInput.value;
            skillsList.appendChild(li);
            skillInput.value = '';
        }
    }
}); // This whole thing seems eh to me - Alyssa

// Consider removing this as its not used?
// Function to remove the last text field
function removeField(sectionId) {
    const section = document.getElementById(sectionId);
    const lastField = section.lastElementChild;
    if (lastField) {
        section.removeChild(lastField);
    }
}

// New Function to adding fields starts here + live resume output -- Alyssa's Code

// Function to add experince entry
function addExperience() {
    const entry = document.createElement('div');
    entry.className = 'experience-entry';

    const hr = document.createElement('hr');

    const labelCompany = document.createElement('label');
    labelCompany.textContent = 'Company';

    const inputCompany = document.createElement('input');
    inputCompany.type = 'text';
    inputCompany.className = 'exp-company';

    const row = document.createElement('div');
    row.className = 'row';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Job Title';
    inputTitle.className = 'exp-title long-input';

    const inputDate = document.createElement('input');
    inputDate.type = 'text';
    inputDate.placeholder = 'YYYY-MM';
    inputDate.className = 'exp-date short-input';

    row.appendChild(inputTitle);
    row.appendChild(inputDate);

    const labelDesc = document.createElement('label');
    labelDesc.textContent = 'Description';

    const textareaDesc = document.createElement('textarea');
    textareaDesc.placeholder = 'Describe your role and achievements';
    textareaDesc.className = 'exp-description';

    // Append everything to entry
    entry.appendChild(hr);
    entry.appendChild(labelCompany);
    entry.appendChild(inputCompany);
    entry.appendChild(row);
    entry.appendChild(labelDesc);
    entry.appendChild(textareaDesc);

    // Insert before "+" button
    document.getElementById('experience-section').insertBefore(entry, document.getElementById('add-experience'));

    // Attach update listener
    entry.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateResumePreview);
    });
}

// function to add education entry
function addEducation() {
    const entry = document.createElement('div');
    entry.className = 'education-entry';

    const hr = document.createElement('hr');

    const row1 = document.createElement('div');
    row1.className = 'row';
    const schoolInput = document.createElement('input');
    schoolInput.type = 'text';
    schoolInput.className = 'edu-school long-input';
    schoolInput.placeholder = 'School';
    const dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.className = 'edu-date short-input';
    dateInput.placeholder = 'YYYY-MM';
    row1.appendChild(schoolInput);
    row1.appendChild(dateInput);

    const row2 = document.createElement('div');
    row2.className = 'row';
    const degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.className = 'edu-degree long-input';
    degreeInput.placeholder = 'Degree & Major';
    const gpaInput = document.createElement('input');
    gpaInput.type = 'text';
    gpaInput.className = 'edu-gpa short-input';
    gpaInput.placeholder = 'GPA';
    row2.appendChild(degreeInput);
    row2.appendChild(gpaInput);

    const achLabel = document.createElement('label');
    achLabel.textContent = 'Achievements';

    const achInput = document.createElement('textarea');
    achInput.className = 'edu-achievements';
    achInput.placeholder = "Awards, scholarships, dean's list... (optional)";

    entry.appendChild(hr);
    entry.appendChild(row1);
    entry.appendChild(row2);
    entry.appendChild(achLabel);
    entry.appendChild(achInput);

    document.getElementById('education-section').insertBefore(entry, document.getElementById('add-education'));

    entry.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateResumePreview);
    });
}

// function to add project entry
function addProject() {
    const entry = document.createElement('div');
    entry.className = 'project-entry';

    const hr = document.createElement('hr');

    const row = document.createElement('div');
    row.className = 'row';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'proj-title long-input';
    titleInput.placeholder = 'Project Title';
    const dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.className = 'proj-date short-input';
    dateInput.placeholder = 'YYYY-MM';
    row.appendChild(titleInput);
    row.appendChild(dateInput);

    const descInput = document.createElement('textarea');
    descInput.className = 'proj-description';
    descInput.placeholder = 'Describe the project here...';

    const bulletInput = document.createElement('textarea');
    bulletInput.className = 'proj-bullets';
    bulletInput.placeholder = 'Bullet points, enter each on a new line';

    entry.appendChild(hr);
    entry.appendChild(row);
    entry.appendChild(descInput);
    entry.appendChild(bulletInput);

    document.getElementById('projects-section').insertBefore(entry, document.getElementById('add-project'));

    entry.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateResumePreview);
    });
}

//function to add involvement entry
function addInvolvement() {
    const entry = document.createElement('div');
    entry.className = 'involvement-entry';

    const hr = document.createElement('hr');

    const inputInvolvement = document.createElement('input');
    inputInvolvement.type = 'text';
    inputInvolvement.className = 'involvement';
    inputInvolvement.placeholder = 'Activity';

    const row = document.createElement('div');
    row.className = 'row';

    const labelDesc = document.createElement('label');
    labelDesc.textContent = 'Description';

    const textareaDesc = document.createElement('textarea');
    textareaDesc.placeholder = 'Describe your role...';
    textareaDesc.className = 'involvement-description';

    // Append everything to entry
    entry.appendChild(hr);
    entry.appendChild(inputInvolvement);
    entry.appendChild(row);
    entry.appendChild(labelDesc);
    entry.appendChild(textareaDesc);

    // Insert before "+" button
    document.getElementById('involvement-section').insertBefore(entry, document.getElementById('add-involvement'));

    // Attach update listener
    entry.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateResumePreview);
    });
}

// function to add reference entry
function addReference() {
    const entry = document.createElement('div');
    entry.className = 'reference-entry';

    const hr = document.createElement('hr');

    const deptInput = document.createElement('input');
    deptInput.type = 'text';
    deptInput.className = 'ref-dept long-input';
    deptInput.placeholder = 'Department';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'ref-name long-input';
    nameInput.placeholder = 'Name';

    const row = document.createElement('div');
    row.className = 'row';
    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.className = 'ref-email long-input';
    emailInput.placeholder = 'Email';
    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.className = 'ref-phone short-input';
    phoneInput.placeholder = 'Phone';
    row.appendChild(emailInput);
    row.appendChild(phoneInput);

    entry.appendChild(hr);
    entry.appendChild(deptInput);
    entry.appendChild(nameInput);
    entry.appendChild(row);

    document.getElementById('references-section').insertBefore(entry, document.getElementById('add-reference'));

    entry.querySelectorAll('input').forEach(el => {
        el.addEventListener('input', updateResumePreview);
    });
}

function updateResumePreview() {
    document.getElementById("res-name").textContent = document.getElementById("name").value;
    document.getElementById("res-summary").textContent = document.getElementById("summary").value;
    document.getElementById("res-email").textContent = document.getElementById("email").value;
    document.getElementById("res-phone").textContent = document.getElementById("phone").value;
    document.getElementById("res-website").textContent = document.getElementById("website").value;
    document.getElementById("res-location").textContent = document.getElementById("location").value;

    // Update skills list
    const skillList = document.getElementById("skills-list").querySelectorAll("li");
    const resSkills = document.getElementById("res-skills");
    resSkills.innerHTML = "";
    skillList.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill.textContent;
        resSkills.appendChild(li);
    });

    // Update experience
    const expEntries = document.querySelectorAll(".experience-entry");
    const resExperience = document.getElementById("res-experience");
    resExperience.innerHTML = "";
    expEntries.forEach(entry => {
        const company = entry.querySelector(".exp-company").value;
        const title = entry.querySelector(".exp-title").value;
        const date = entry.querySelector(".exp-date").value;
        const desc = entry.querySelector(".exp-description").value;

        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${title}</strong> @ ${company} (${date})</p><p>${desc}</p>`;
        resExperience.appendChild(div);
    });

    // Update education
    const eduEntries = document.querySelectorAll('.education-entry');
    const resEducation = document.getElementById('res-education');
    resEducation.innerHTML = "";
    eduEntries.forEach(entry => {
        const school = entry.querySelector('.edu-school').value;
        const date = entry.querySelector('.edu-date').value;
        const degree = entry.querySelector('.edu-degree').value;
        const gpa = entry.querySelector('.edu-gpa').value;
        const ach = entry.querySelector('.edu-achievements').value;

        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${degree}</strong> @ ${school} (${date})</p>
            <p>GPA: ${gpa}</p>
            ${ach ? `<p><em>Achievements:</em> ${ach}</p>` : ""}
        `;
        resEducation.appendChild(div);
    });

    // Update projects
    const projEntries = document.querySelectorAll('.project-entry');
    const resProjects = document.getElementById('res-projects');
    resProjects.innerHTML = "";
    projEntries.forEach(entry => {
        const title = entry.querySelector('.proj-title').value;
        const date = entry.querySelector('.proj-date').value;
        const desc = entry.querySelector('.proj-description').value;
        const bullets = entry.querySelector('.proj-bullets').value.trim().split('\n');

        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${title}</strong> (${date})</p>
            <p>${desc}</p>
        `;

        if (bullets.length > 0 && bullets[0] !== "") {
            const ul = document.createElement('ul');
            bullets.forEach(bullet => {
                const li = document.createElement('li');
                li.textContent = bullet;
                ul.appendChild(li);
            });
            div.appendChild(ul);
        }

        resProjects.appendChild(div);
    });

    //Update involvement
    const involvementEntries = document.querySelectorAll(".involvement-entry");
    const resInvolvement = document.getElementById("res-involvement");
    resInvolvement.innerHTML = "";
    involvementEntries.forEach(entry => {
        const inv = entry.querySelector(".involvement").value;
        const invDesc = entry.querySelector(".involvement-description").value;

        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${inv}</strong></p><p>${invDesc}</p>`;
        resInvolvement.appendChild(div);
    });


    // Update References
    const refEntries = document.querySelectorAll('.reference-entry');
    const resReferences = document.getElementById('res-references');
    resReferences.innerHTML = "";
    refEntries.forEach(entry => {
        const dept = entry.querySelector('.ref-dept').value;
        const name = entry.querySelector('.ref-name').value;
        const email = entry.querySelector('.ref-email').value;
        const phone = entry.querySelector('.ref-phone').value;

        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${name}</strong> — ${dept}</p>
            <p>${email} | ${phone}</p>
        `;
        resReferences.appendChild(div);
    });    
}

// Live update resume preview
document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updateResumePreview);
});

// NEW ENDS HERE

//Function to save all resume information
function saveResume() {
    //Initialize JSON object
    const resume = {
        name: document.getElementById("name").value,
        summary: document.getElementById("summary").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        website: document.getElementById("website").value,
        location: document.getElementById("location").value,
        skills: document.getElementById("skill-input").value,
        experience: [],
        education: [],
        projects: [],
        involvement: [],
        references: []
    };

    // Get experience entries
    const expEntries = document.querySelectorAll(".experience-entry");
    expEntries.forEach(entry => {
        resume.experience.push({
            company: entry.querySelector(".exp-company").value,
            title: entry.querySelector(".exp-title").value,
            date: entry.querySelector(".exp-date").value,
            description: entry.querySelector(".exp-description").value
        });
    });

    // Get education entries
    const eduEntries = document.querySelectorAll(".education-entry");
    eduEntries.forEach(entry => {
        resume.education.push({
            school: entry.querySelector(".edu-school").value,
            date: entry.querySelector(".edu-date").value,
            degree: entry.querySelector(".edu-degree").value,
            gpa: entry.querySelector(".edu-gpa").value,
            achievements: entry.querySelector(".edu-achievements").value
        });
    });

    // Get projects
    const projEntries = document.querySelectorAll(".project-entry");
    projEntries.forEach(entry => {
        const bullets = entry.querySelector(".proj-bullets").value.trim().split('\n').filter(line => line.trim() !== "");
        resume.projects.push({
            title: entry.querySelector(".proj-title").value,
            date: entry.querySelector(".proj-date").value,
            description: entry.querySelector(".proj-description").value,
            bullets: bullets
        });
    });

    // Get involvement entries
    const involvementEntries = document.querySelectorAll(".involvement-entry");
    involvementEntries.forEach(entry => {
        resume.involvement.push({
            inv: entry.querySelector(".involvement").value,
            invDesc: entry.querySelector(".involvement-description").value
        });
    });
    // Get references
    const refEntries = document.querySelectorAll(".reference-entry");
    refEntries.forEach(entry => {
        resume.references.push({
            department: entry.querySelector(".ref-dept").value,
            name: entry.querySelector(".ref-name").value,
            email: entry.querySelector(".ref-email").value,
            phone: entry.querySelector(".ref-phone").value
        });
    });
    //Update resume request to backend
    fetch('/db/resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(resume)
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to update resume");
        return res.json(); // parses the JSON body
    })
    .then(data => {
        console.log("Resume saved:", data);
        alert("Resume saved successfully!");
    })
    .catch(error => {
        console.error("Error saving resume:", error);
        alert("Failed to save resume.");
    });
    return;
}

