function dragThisTask(index) {
    currentDraggedTask = index;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTaskTo(state = "to-do") {
    //alert(state);
    task[currentDraggedTask].currentState = state;
    let updatedTask = generateUpdatedTaskAsJson();
    updateTaskInStorage(updatedTask);
    renderKanbanBoard();
}

function generateUpdatedTaskAsJson() {
    let assignetTo = task[currentDraggedTask].assignetTo;
    if (Array.isArray(assignetTo)) {
        let assignetToStr = "[";
        for (let i = 0; i < assignetTo.length; i++) {
            assignetToStr += "`" +assignetTo[i] +"`";
            if (i < assignetTo.length-1) {
                 assignetToStr += ","
            }else {
                assignetToStr += "]";
            }
        }
        alert(assignetToStr);
        assignetTo = assignetToStr;
    } 
    
    
    let updatedTask = {
        //assignetTo: `${task[currentDraggedTask].assignetTo}`,
        assignetTo: `${assignetTo}`,
        category: `${task[currentDraggedTask].category}`,
        currentState: `${task[currentDraggedTask].currentState}`,
        description: `${task[currentDraggedTask].description}`,
        dueDate: `${task[currentDraggedTask].dueDate}`,
        priority: `${task[currentDraggedTask].priority}`,
        title: `${task[currentDraggedTask].title}`
    };
    return updatedTask;
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

function uploadDemoTask() {
    let newTask = generateDemoTasks();
    createNewTaskInStorage(newTask);
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

