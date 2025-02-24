// Function to add a new text field
function addField(sectionId) {
    const section = document.getElementById(sectionId);
    const newField = document.createElement('div');
    const newTextarea = document.createElement('textarea');
    newTextarea.name = `${sectionId}[]`;
    newField.appendChild(newTextarea);
    section.appendChild(newField);
}

// Function to remove the last text field
function removeField(sectionId) {
    const section = document.getElementById(sectionId);
    const lastField = section.lastElementChild;
    if (lastField) {
        section.removeChild(lastField);
    }
}

// Function to handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
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

