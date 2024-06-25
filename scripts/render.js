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
            currentColumnContent += renderCardProgress(taskId[i]);
            currentColumnContent += renderCardFooter(taskId[i]);
        }
    }
    //if (countTasks > 0) {
    currentColumn.innerHTML = currentColumnContent;
    //}
}

function renderCardHeader(index) {
    //alert(index);
    let cardHeader = `<div id="${index}" draggable="true" ondragstart="dragThisTask('${index}')" class="task-info">
                        <div class="task-cat ${task[index].category}">${task[index].category}</div>
                        <h4>${task[index].title}</h4>
                        <span>${task[index].description}</span>`;
    return cardHeader;
}

// Hier muss noch überprüft werden, ob Subtasks vorhanden sind, sobald Datenstruktur steht
function renderCardProgress(index) {
    let cardProgress = `<div class="progress">
                            <div class="progress-bar"></div>
                            <div class="progress-counter">1/2 subtasks</div>
                        </div>`;
    return cardProgress;
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

/*
function renderParticipants(index) {
    let participiantId = task[index].assignetTo;
    let participiantHTML="";
    if (!Array.isArray(participiantId)) {
        //let participiantName = "Frank Kessler"
        let participiantName = contact[participiantId].name;
        let participiantInitials = getInitials(participiantName);
        let participiantColor = contact[participiantId].color;
        //let participiantColor = "#FFFFFF";
        participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
    } else {
        for (let i = 0; i < participiantId.length; i++) {
            let participiantName = contact[participiantId[i]].name;
            let participiantInitials = getInitials(participiantName);
            let participiantColor = contact[participiantId[i]].color;
            participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
        }
    }
    return participiantHTML;
}*/

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
