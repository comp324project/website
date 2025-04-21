//Sidebar functionality
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById('sidebar-toggle')

sidebarToggle.addEventListener('click', function(){
    sidebar.classList.toggle('close')
});