/** Includes ALL init Functions for main- and subpages
 */

/** Init Kanban Board */
async function initBoard() {    
    await loadUserData();
    setCurrentUser();
    await loadTasks();
    await loadContacts();
    renderKanbanBoard();
    renderInitials();
    renderAddTask();
}

async function initSummary() {
    await loadUserData();
    setCurrentUser();
    await loadTasks();
    await loadContacts();
    renderSummary();
    renderInitials();
}

async function initAddTask() {        
    await loadUserData();        
    setCurrentUser();  
    await loadUserData();     
    renderAddTask();     
    generateCheckBox();  
    renderInitials();  
}

async function renderContent() {
    await loadUserData();
    setCurrentUser(); 
    await loadUserData();
    await loadUserData();
    renderInitials();
}
