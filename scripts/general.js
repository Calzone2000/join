/**
 * Creates a new task and puts it into the state of this column
 * @param {string} currentState
 */
function openAddTask(currentState = "to-do") {
    window.name = currentState;
    window.location.href = 'add-task.html';
}

/**
 * Extract initials from name
 * @param {string} name
 */
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

/**
 * Get value of currentUserName (global variable) from localStorage if logged in and copy the * 
 */
function setCurrentUser() {
    let currentUserId = localStorage.getItem('user');
    if (currentUserId) {
        currentUserName = user[currentUserId].name;
    } else {
        currentUserName = "Guest User";
    }
}


/**
 * Generate greeting depending on local time
 */
function generateGreeting() {
    let currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
    } else if (currentHour >= 18 && currentHour < 24) {
        return "Good Evening";
    } else {
        return "Hello";
    }
}

/**
 * Render summary page, divided into several subfunctions
 */
function renderSummary() {
    renderStates();
    renderGreeting();
}


/**
 * open the small right side menu when clicked on initials
 */
function showSlideOutMenu() {
    document.getElementById('slide-out').classList.toggle('show');
}

/**
 * insert current User name dynamicly into the greeting area of the summary
 */
function renderGreeting() {
    document.getElementById('greeted-person').innerHTML = currentUserName;
}

/**
 * render the initials of the current user dynamicly into the small circle of the top area
 */
function renderInitials() {
    document.getElementById('user-initials').innerHTML = getInitials(currentUserName);
}

/**
 * render the computed figures for the summary page
 */
function renderStates() {
    document.getElementById('sum-tasks-open').innerHTML = countStateOccurrences("to-do");
    document.getElementById('sum-tasks-done').innerHTML = countStateOccurrences("done");
    document.getElementById('sum-tasks-total').innerHTML = taskId.length;
    document.getElementById('sum-tasks-in-progress').innerHTML = countStateOccurrences("in-progress");
    document.getElementById('sum-tasks-await-feedback').innerHTML = countStateOccurrences("await-feedback");
    document.getElementById('sum-tasks-urgent').innerHTML = countUrgency();
    document.getElementById('greeting-depends-on-time').innerHTML = generateGreeting();
}


