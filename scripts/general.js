function openAddTask(currentState="to-do") {
    window.name = currentState;
    window.location.href = 'add-task.html';
}

function getInitials(name) {        
    name = name.trim();    
    let spaceIndex = name.indexOf(' ');    
    if (spaceIndex !== -1) {
        let firstWord = name.slice(0, spaceIndex).trim();        
        let secondWord = name.slice(spaceIndex + 1).trim();        
        let initials = firstWord.charAt(0).toUpperCase() + secondWord.charAt(0).toUpperCase();                
        return initials;    
    } else {        
        let initials = name.slice(0, 2).toUpperCase();                
        return initials;
    }    
}

function showSlideOutMenu() {
    document.getElementById('slide-out').classList.toggle('show');
}
