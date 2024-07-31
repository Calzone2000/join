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
    initBoard();
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
    /*alert (idTask);*/
    task[idTask].subtask.splice(i, 1);
    let editedTask = generateEditedTaskAsJson(idTask);
    document.getElementById(`subtask-${i}`).classList.add('d-none');
    await updateEditedTaskInStorage(editedTask, idTask);  
    
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

function generateEditedTaskAsJson(idTask) {
    let assignetTo = task[idTask].assignetTo;
    let subTask = task[idTask].subtask;
    let updatedTask = {
        assignetTo: assignetTo,
        category: `${task[idTask].category}`,
        currentState: `${task[idTask].currentState}`,
        description: `${task[idTask].description}`,
        dueDate: `${task[idTask].dueDate}`,
        priority: `${task[idTask].priority}`,
        title: `${task[idTask].title}`,
        subtask: subTask
    };
    return updatedTask;
}

function addSubtask(idTask) {    
    let newSubtaskDescription = document.getElementById('add-subtask-input').value;
   if(taskCache.subtask) {        
        taskCache.subtask.push ({
            description: newSubtaskDescription,
            status:false
        });
    }
    else {
        let mySubtask = [{description: newSubtaskDescription, status:false}];
        taskCache.subtask = mySubtask;        
    }
    renderEditCard2(idTask);
}

async function updateTaskArray(idTask) {    
    taskCache.title = document.getElementById('task-title').value;
    taskCache.description = document.getElementById('task-description').value;
    taskCache.category = document.getElementById('task-category').value;
    //taskCache.currentState = document.getElementById('task-description').value;
    taskCache.dueDate = document.getElementById('task-due-date').value;
    taskCache.assignetTo = getSelectedParticipiants();
    //taskCache.subtask = getSubtasks();
    task[idTask] = taskCache;
    await updateEditedTaskInStorage(taskCache, idTask);
    closeEditTask(idTask);
}

function getSelectedParticipiants() {
    let dropdown=document.getElementById('dropdown-contacts');
    let checkboxes = dropdown.querySelectorAll('input[type="checkbox"]')
    let selectedContacts = [];
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedContacts.push(checkbox.value);
        }
    })
    return selectedContacts;
}

function changePriority(priority) {
    taskCache.priority = priority;
    document.getElementById('btn-prio-low').classList.remove('green');
    document.getElementById('btn-prio-medium').classList.remove('yellow');
    document.getElementById('btn-prio-high').classList.remove('red');
    if (priority === 'low') {
        document.getElementById('btn-prio-low').classList.add('green');
    } else if (priority === 'medium') {
        document.getElementById('btn-prio-medium').classList.add('yellow');
    } else {
        document.getElementById('btn-prio-high').classList.add('red');
    }
}

function updateSubtaskState(i) {    
    let currentState = document.getElementById(`checkbox-${i}`).checked;
    taskCache.subtask[i].status=currentState;
}

