/** Render functions
 */

function renderKanbanBoard() {
    renderKanbanCard("to-do");
    renderKanbanCard("in-progress");
    renderKanbanCard("await-feedback");
    renderKanbanCard("done");
}

function renderKanbanCard(state = "to-do") {
    let currentColumn = document.getElementById(`kb-task-${state}`);
    let currentColumnContent = "";
    let countTasks = 0;
    for (let i = 0; i < taskId.length; i++) {
        if (task[taskId[i]].currentState == state) {
            countTasks++;
            currentColumnContent += renderCardHeader(taskId[i]);
            currentColumnContent += renderCardSubtasks(taskId[i]);
            currentColumnContent += renderCardFooter(taskId[i]);
        }
    }    
    currentColumn.innerHTML = currentColumnContent;    
}

function renderCardHeader(index) {    
    let cardHeader = `<div id="${index}" draggable="true" ondragstart="dragThisTask('${index}')" ondragend="shakeTask('${index}')"class="task-info">
                        <div class="task-cat ${task[index].category}">${task[index].category}</div>
                        <h4>${task[index].title}</h4>
                        <span>${task[index].description}</span>`;
    return cardHeader;
}

function renderCardSubtasks(index) {    
    let cardProgress = '<div class="progress">';
    if (task[index].subtask) {        
        cardProgress += renderProgress(index);        
    }
    cardProgress += `</div>`;
    return cardProgress;
}

function renderProgress(index) {    
    let subtasksCompleted = 0;    
    let subtasksTotal = task[index].subtask.length;
    for (let i = 0; i < subtasksTotal; i++) {
        if (task[index].subtask[i].status == true) {
            subtasksCompleted++;
        }
    }
    let percentage = 100 * (subtasksCompleted / subtasksTotal);    
    return `<div class="progress-bar">
                <div class="current-progress" style="width: ${percentage}%;"></div>
            </div>
            <div class="progress-counter">${subtasksCompleted}/${subtasksTotal} subtasks</div>`;  
}

function renderCardFooter(index) {
    let priority = task[index].priority;
    let cardFooter = `<div class="task-add-info">
                        <div class="participants">`;
    cardFooter += renderParticipants(index);
    cardFooter += `                    </div>
                        <img src="./assets/img/prio-${priority}.svg">
                    </div>
                </div>`;
    return cardFooter;
}

function renderParticipants(index) {
    let participiantId = task[index].assignetTo;
    let participiantHTML = "";
    if (!Array.isArray(participiantId)) {
        let participiantData = contact[participiantId];
        if (participiantData) {
            let participiantName = participiantData.name;
            let participiantInitials = getInitials(participiantName);
            let participiantColor = participiantData.color;
            participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
        }
    } else {
        for (let i = 0; i < participiantId.length; i++) {
            let participiantData = contact[participiantId[i]];
            if (participiantData) {
                let participiantName = participiantData.name;
                let participiantInitials = getInitials(participiantName);
                let participiantColor = participiantData.color;
                participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
            }
        }
    }
    return participiantHTML;
}
