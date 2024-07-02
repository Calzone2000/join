/** Includes ALL init Functions for main- and subpages
 */

/** Init Kanban Board */
async function initBoard() {
    await loadTasks();
    await loadContacts();
    renderKanbanBoard();
}

async function initSummary() {
    await loadTasks();
    await loadContacts();
    renderSummary();
}