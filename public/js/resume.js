//Sidebar functionality
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById('sidebar-toggle')

sidebarToggle.addEventListener('click', function(){
    sidebar.classList.toggle('close')
});

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

// NEW STARTS HERE
// Function to remove the last text field (Do i still need this?) 
function removeField(sectionId) {
    const section = document.getElementById(sectionId);
    const lastField = section.lastElementChild;
    if (lastField) {
        section.removeChild(lastField);
    }
}

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
        el.addEventListener('input', updateResume);
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
        el.addEventListener('input', updateResume);
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
        el.addEventListener('input', updateResume);
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
        el.addEventListener('input', updateResume);
    });
}

function updateResume() {
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
    el.addEventListener('input', updateResume);
});

// NEW ENDS HERE

// DID NOT CHANGE ANYTHING BELOW -- might need to check this button in HTML

// Function to handle form submission
document.getElementById('master-resume').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the usual way

    let output = '';

    // Loop through each section and gather inputs
    const sections = ['skills', 'experience', 'projects', 'research', 'volunteering', 'education', 'references'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const inputs = section.querySelectorAll('textarea');
        
        if (inputs.length > 0) {
            output += `${sectionId}:\n`;
            inputs.forEach((input, index) => {
                output += `${sectionId} ${index + 1}: ${input.value}\n`;
            });
            output += '\n'; // Add a newline after each section
        }
    });

    // Output the result
    alert(output);
});

