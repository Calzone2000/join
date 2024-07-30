/** top.html */
function renderInitials() {
    document.getElementById('user-initials').innerHTML = getInitials(currentUserName);
}

/** summary.html */

function renderSummary() {
    renderStates();
    renderGreeting();
}

function renderStates() {
    document.getElementById('sum-tasks-open').innerHTML = countStateOccurrences("to-do");
    document.getElementById('sum-tasks-done').innerHTML = countStateOccurrences("done");
    document.getElementById('sum-tasks-total').innerHTML = taskId.length;
    document.getElementById('sum-tasks-in-progress').innerHTML = countStateOccurrences("in-progress");
    document.getElementById('sum-tasks-await-feedback').innerHTML = countStateOccurrences("await-feedback");
    document.getElementById('sum-tasks-urgent').innerHTML = countUrgency();
    document.getElementById('greeting-depends-on-time').innerHTML = generateGreeting();
}

function renderGreeting() {
    document.getElementById('greeted-person').innerHTML = currentUserName;
}


/** board.html */

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
    if (countTasks > 0) {
    currentColumn.innerHTML = currentColumnContent;
    } else {
        currentColumn.innerHTML = `<div id="no-task-to-do-${state}" class="no-task-info">No tasks to do</div>`;
    }
}

function renderCardHeader(index) {
    let cardHeader = `<div id="${index}" draggable="true" onclick="renderPreviewCard('${index}')" ondragstart="dragThisTask('${index}')" ondragend="shakeTask('${index}') "class="task-info">
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
        if (task[index].subtask[i] != undefined && task[index].subtask[i].status == true) {
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
    let counter = 0;
    if (participiantId) {
        let participiantHTML = "";
        for (let i = 0; i < participiantId.length; i++) {            
            let participiantData = contact[participiantId[i]];
            if (participiantData && counter < 3) {
                let participiantName = participiantData.name;
                let participiantInitials = getInitials(participiantName);
                let participiantColor = participiantData.color;
                participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
            } 
            counter++;           
        }
        if (counter > 3) {
            participiantHTML += `<span style="background-color: black" class="user-in">+${counter-3}</span>`;
        }
        return participiantHTML;
    } else {
        return `<span style="background-color: red; color: black!important; font-weight: bold;" class="user-in">??</span>`;
    }
}

/**
 * Render preview card on click
 * @param {*} index 
 */

function renderPreviewCard(index) {    
    let previewCard = document.getElementById('preview-card');
    let previewCardHTML = ``;
    previewCardHTML += renderPreviewCardHeader(index);
    previewCardHTML += renderPreviewCardContent(index);
    previewCardHTML += renderPreviewCardFooter(index);
    previewCard.innerHTML = previewCardHTML;
    openPreview(index);
}

function renderPreviewCardHeader(index) {

    let previewCardHTML =
        `<div class="preview-card-header preview-card-menu">
                <div class="task-cat ${task[index].category}">${task[index].category}</div>
                <img class="pointer" src="./assets/img/close.svg" alt="Close Task" onclick="closePreview()">
            </div>`;
    return previewCardHTML;
}

function renderPreviewCardFooter(index) {

    let previewCardHTML = `
                <div class="preview-card-footer preview-card-menu">
                <div class="preview-card-action" onclick="deleteRequestTask('${index}')">
                    <img src="./assets/img/delete.svg" alt="Delete Task">
                    <span>Delete</span>
                </div>
                <div class="preview-card-action" onclick="renderEditCard('${index}')">
                    <img src="./assets/img/edit.svg" alt="Edit Task">
                    <span>Edit</span>
                </div>
            </div>`;
    return previewCardHTML;

}

function renderPreviewCardContent(index) {
    let previewCardHTML = `<div class="preview-card-content">`
    previewCardHTML += renderPreviewCardTitleDescription(index);
    previewCardHTML += renderPreviewCardTable(index);
    previewCardHTML += renderPreviewResponsibles(index);
    previewCardHTML += renderPreviewCardSubtasks(index);
    previewCardHTML += `</div>`
    return previewCardHTML;
}

function renderPreviewCardTitleDescription(index) {

    let previewCardHTML = `<h2 class="preview-card-title">${task[index].title}</h2>
                           <span class="preview-card-description">${task[index].description}</span>`;
    return previewCardHTML;
}

function renderPreviewCardTable(index) {

    let previewCardHTML = `<table>
                    <tr style="height: 60px;">
                        <td class="preview-card-sub-hl" style="width: 100px;">Due Date:</td>
                        <td>${task[index].dueDate}</td>
                    </tr>
                    <tr>
                        <td class="preview-card-sub-hl" style="width: 100px;">Priority:</td>
                        <td class="preview-card-prio">
                            <span>${task[index].priority}</span>
                            <img src="./assets/img/prio-${task[index].priority}.svg">
                        </td>
                    </tr>
                </table>`;
    return previewCardHTML;
}

function renderPreviewResponsibles(index) {
    let previewCardHTML = `<span class="preview-card-sub-hl">Assignet to:</span>
                           <div id="preview-card-responsibles">`;
    if (task[index].assignetTo) {
        for (let i = 0; i < task[index].assignetTo.length; i++) {
            if (contact[task[index].assignetTo[i]]) {
                let participiantInitials = getInitials(contact[task[index].assignetTo[i]].name);
                previewCardHTML += `<div class="user-preview">                                
                                <div style="background-color: ${contact[task[index].assignetTo[i]].color}" class="user-in left-20">${participiantInitials}</div>
                                <div>${contact[task[index].assignetTo[i]].name}</div>
                            </div>`;
            } else {
                previewCardHTML += `<div class="user-preview">                                
                                <div style="background-color: red; color: black!important; font-weight:bold" class="user-in left-20">??</div>
                                <div>Unknown User</div>
                            </div>`;
            }
        }
    } 

    previewCardHTML += `</div>`;
    return previewCardHTML;
}

function renderPreviewCardSubtasks(index) {

    let previewCardHTML = ``;
    if (task[index].subtask) {
        previewCardHTML += `<span class="preview-card-sub-hl">Subtasks</span>
                                <div class="preview-card-subtasks">`;
        for (let i = 0; i < task[index].subtask.length; i++) {
            previewCardHTML += `<div class="preview-card-subtask">
                                    <img src="./assets/img/check_${task[index].subtask[i].status}.svg" alt="Open">
                                    <div>${task[index].subtask[i].description}</div>
                                </div>`;
        }
    } else {
        previewCardHTML += `<span class="preview-card-sub-hl">No subtasks</span>`;
    }
    previewCardHTML += `</div></div>`;
    return previewCardHTML;
}

async function renderEditCard(index) {
    await loadContacts();
    renderEditCard2(index);
}


function renderEditCard2(index) {
    
    document.getElementById('edit-task-area').classList.remove('d-none');
    document.getElementById('preview-task-area').classList.add('d-none');
    let editCard = document.getElementById('edit-card');    
    let editCardForm = `<div class="preview-card-header">
                            <h3>Edit Task</h3>                                                       
                            <img class="pointer" src="./assets/img/close.svg" alt="Close Task" onclick="closeEditTask('${index}')">
                        </div>
                        <div class="preview-card-content">
                            <form class="frm-edit-task" onsubmit="updateCurrentTask('${index}'); return false;">
                            <div class="title-input">                        
                                <label for="task-title">Titel</label>
                                <input type="text" id="task-title" value="${task[index].title}">
                            </div>
                            <div class="title-input">
                                <label for="task-description">Description</label>
                                <textarea id="task-description" value="${task[index].description}">${task[index].description}</textarea>
                            </div>
                            <div class="edit-task-2-col">
                            <div class="title-input small">
                                <label for "task-category">Category</label>
                                <select id="task-category" requried>`;
    if (task[index].category == "technical") {
        editCardForm +=             `<option value="technical" selected>Technical Task</option>
                                    <option value="story">User Story</option>`;
    } else {
        editCardForm +=             `<option value="story" selected>User story</option>
                                    <option value="technical">Technical Task</option>`;
    }    
    editCardForm +=            `</select>
                            </div>`;
    
    editCardForm +=         `<div class="title-input small">
                                <label for "task-due-date">Due Date</label>
                                <input type="date" id="task-due-date" value="${task[index].dueDate}"></input>
                             </div> </div>`;

    let currentPriority = task[index].priority;
   
    
    if (!currentPriority) {
        currentPriority = "low";
    }

    editCardForm +=         `<div class="title-input">
                             <label for "task-priority">Priority</label>
                             <select id="task-priority" name="priority">
                                <option value="low" ${currentPriority === 'low' ? 'selected' : ''}>Low</option>
                                <option value="medium" ${currentPriority === 'medium' ? 'selected' : ''}>Medium</option>
                                <option value="high" ${currentPriority === 'high' ? 'selected' : ''}>High</option>                                
                             </select>
                             
                          </div>`;

    editCardForm +=         `<div class="task-participiants-dropdown">
                                <!--<label="task-participiants">-->
                                <div class="dropdown-btn" onclick="showContacts()">
                                    <span>Assign contacts</span>
                                    
                                    <img id="arrow" src="./assets/img/edit.svg">
                                </div>
                                <div class="dropdown-contacts d-none" id="dropdown-contacts">
                                    `;
                                    
   
    for (let i=0; i < contactId.length; i++) {
        let contactIsAssignet = false;
        for (let j=0; j<task[index].assignetTo.length; j++) {
            if (contactId[i] == task[index].assignetTo[j]) {
                contactIsAssignet = true;
            }
        }        
        if (contactIsAssignet == true) {
            editCardForm +=     `<label><input type="checkbox" name="task-participiant" value="${contactId[i]}" checked>${contact[contactId[i]].name}</label>`;
        } else {
            editCardForm +=     `<label><input type="checkbox" name="task-participiant" value="${contactId[i]}">${contact[contactId[i]].name}</label>`;
        }
        editCardForm += `<br>`                ;
    }
   

    editCardForm += `<!--</label>--></div></div>`;

    editCardForm +=         `<div class="task-subtask-list title-input">
                                <h3>Subtasks</h3>
                                    <div class="add-new-subtask">
                                        <input class="add-task-input" type="text" preview="Add a new subtask">
                                        <span class="btn-add-new-subtask pointer">+</span>
                                    </div>
                                <label="task-subtasks"></label>`;

    if (task[index].subtask) {
        for (let i=0; i < task[index].subtask.length; i++) {
            let isChecked = task[index].subtask[i].status;            
            editCardForm += `<div>
                                <div class="subtask-preview" id="subtask-preview-${i}">
                                    <div class="subtask-description">
                                        <input class="task-done" type="checkbox" name="subtask-${i}" ${isChecked ? 'checked' : ''}>
                                        <span class="description-preview">${task[index].subtask[i].description}</span>
                                    </div>
                                    <div class="edit-icons">
                                        <img class="pointer" src="./assets/img/edit.svg" onclick="editSubtask(${i}, '${index}')">
                                        <img class="pointer" src="./assets/img/delete.svg" onclick="deleteEditedSubtask(${i}, '${index}')">
                                    </div>
                                </div>
                                <div class="subtask-edit d-none" id="subtask-edit-${i}">
                                    <div class="subtask-description">
                                        <input class="task-done" type="checkbox" name="subtask-${i}" ${isChecked ? 'checked' : ''}>
                                        <input class="description-preview" type="text" id="subtask-description-${i}" value="${task[index].subtask[i].description}">                                    
                                    </div>
                                    <div class="edit-icons">
                                        <img class="pointer" src="./assets/img/edit.svg" onclick="saveEditedSubtask(${i}, '${index}')">
                                        <!--<img class="pointer" src="./assets/img/delete.svg">-->
                                    </div>
                                </div>
                             </div>`;                             
        }


        
    } else {
        editCardForm +=         `There are NO subtasks`;    
    }
    
    editCardForm +=         `</div></form></div>`;



    editCardForm += ``;
    editCardForm += `<div class="edit-card-footer blur">        
                        <span class="save-edited-task btn-add-task btn-small">Save</span>
                     </div>`;

    editCard.innerHTML = editCardForm;


}

/** Mandatory functions for rendering */

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

