function dragThisTask(index) {
    currentDraggedTask = index;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTaskTo(state = "to-do") {
    task[currentDraggedTask].currentState = state;
    let updatedTask = generateUpdatedTaskAsJson();
    updateTaskInStorage(updatedTask);
    renderKanbanBoard();
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


// Funktion zum Speichern von Demo-Tasks
function generateDemoTasks() {
    let demoTask = {
        assignetTo: [`-O-zxrQASTyx_kpyyE1j`, `-O-zxdfpYCqeU0sSbc3v`],
        category: `technical`,
        currentState: `await-feedback`,
        description: `Gruppenarbeit: Programmieren eines Kanban Boards`,
        dueDate: `10.07.2024`,
        priority: `high`,
        title: `Programmieren`
    };
    return demoTask;
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


function generateTest() {
    return {
        array: [`value_1`, `value_2`, `value_3`]
    }
}

function generateTestUpdate() {
    return {
        array: [`value_4`, `value_5`, `value_6`]
    }
}

function updateTest() {
    let newTestUpdate = generateTestUpdate();
    updateTestInStorage(newTestUpdate);
}

function uploadTest() {
    let newTest = generateTest();
    createTestInStorage(newTest);
}

function uploadDemoTask() {
    let newTask = generateDemoTasks();
    createNewTaskInStorage(newTask);
}



