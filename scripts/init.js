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
}

async function initSummary() {
    await loadUserData();
    setCurrentUser();
    await loadTasks();
    await loadContacts();
    renderSummary();
    renderInitials();
}