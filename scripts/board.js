let currentTask = '';

function dragThisTask(index) {
    currentDraggedTask = index;
}

function shakeTask(index) {
    document.getElementById(`${index}`).classList.add('shake');
}

function allowDrop(ev) {
    ev.preventDefault();
}

function addTaskFromBoard(currentState = "to-do") {
    window.name = currentState;
    window.location.href = 'add-task.html';
}

function moveTaskTo(state = "to-do") {
    task[currentDraggedTask].currentState = state;
    let updatedTask = generateUpdatedTaskAsJson();
    updateTaskInStorage(updatedTask);
    renderKanbanBoard();
    dishighlight(state);
}

function highlight(state) {
    document.getElementById(`kb-task-${state}`).classList.add('kanban-tasks-highlight');
    if (document.getElementById(`no-task-to-do-${state}`)) {
        document.getElementById(`no-task-to-do-${state}`).classList.add('d-none');
    }
}

function dishighlight(state) {
    document.getElementById(`kb-task-${state}`).classList.remove('kanban-tasks-highlight');
    if (document.getElementById(`no-task-to-do-${state}`)) {
        document.getElementById(`no-task-to-do-${state}`).classList.remove('d-none');
    }
}

function closePreview() {
    document.getElementById('preview-task-area').classList.add('d-none');
}

function openPreview(index) {
    document.getElementById('preview-task-area').classList.remove('d-none');
}

function generateUpdatedTaskAsJson() {
    let assignetTo = task[currentDraggedTask].assignetTo;
    let subTask = task[currentDraggedTask].subtask;
    let updatedTask = {
        assignetTo: assignetTo,
        category: `${task[currentDraggedTask].category}`,
        currentState: `${task[currentDraggedTask].currentState}`,
        description: `${task[currentDraggedTask].description}`,
        dueDate: `${task[currentDraggedTask].dueDate}`,
        priority: `${task[currentDraggedTask].priority}`,
        title: `${task[currentDraggedTask].title}`,
        subtask: subTask
    };
    return updatedTask;
}

function filterTasks() {
    let searchString = document.getElementById('filter-tasks').value.toLowerCase();
    for (let i = 0; i < taskId.length; i++) {
        if (!task[taskId[i]].title.toLowerCase().includes(searchString)) {
            document.getElementById(`${taskId[i]}`).classList.add('d-none');
        } else {
            document.getElementById(`${taskId[i]}`).classList.remove('d-none');
        }
    }
}

function deleteRequestTask(index) {
    document.getElementById("delete-request-task").style.display = "flex";
    currentTask = index;
}

/**
 * this function closes the window to ask if a contact should be deleted for sure
 */

function closeDeleteRequestTask() {
    document.getElementById("delete-request-task").style.display = "none";
}

/*
function editSubtask(i, idTask) {
    document.getElementById(`edit-task-area`).classList.remove("d-none");
    document.getElementById(`preview-task-area`).classList.add("d-none");
}*/

function editSubtask(i, idTask) {
    document.getElementById(`subtask-preview-${i}`).classList.add("d-none");
    document.getElementById(`subtask-edit-${i}`).classList.remove("d-none");
}

function saveEditedSubtask(i, idTask) {
    document.getElementById(`subtask-preview-${i}`).classList.remove("d-none");
    document.getElementById(`subtask-edit-${i}`).classList.add("d-none");
}

/*
function saveEditedSubtask(i, idTask) {
    document.getElementById(`edit-task-area`).classList.add("d-none");
    document.getElementById(`preview-task-area`).classList.remove("d-none");
}
    */

async function deleteEditedSubtask(i, idTask) {
    await deleteThisSubTask(idTask, i);
}

async function updateCurrentTask(idTask) {
    renderKanbanBoard();
    renderPreviewCard(idTask);
    document.getElementById(`edit-task-area`).classList.add("d-none");
}

function showContacts() {
    let currentRotation
    document.getElementById('arrow').style.transform = 'rotate(180deg)';
    document.getElementById('dropdown-contacts').classList.toggle('d-none');    
}

function closeEditTask(idTask) {
    renderPreviewCard(idTask);
    document.getElementById(`edit-task-area`).classList.add("d-none");
    document.getElementById(`preview-task-area`).classList.remove("d-none");
}