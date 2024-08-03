/**
 * Render Kanban Board columns
 */
function renderKanbanBoard() {
    renderKanbanCard("to-do");
    renderKanbanCard("in-progress");
    renderKanbanCard("await-feedback");
    renderKanbanCard("done");
    addEventListener()
}

/**
 * Render Kanban card (divided into sub functions)
 * @param {string} [state="to-do"] 
 */
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
        currentColumn.innerHTML = `<div id="no-task-to-do-${state}" class="no-task-info"><div class="no-task-info-inner">No tasks to do</div></div>`;
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
                        <img class="prio-icon" src="./assets/img/prio-${priority}.svg">
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
            if (participiantData && counter < 2) {
                let participiantName = participiantData.name;
                let participiantInitials = getInitials(participiantName);
                let participiantColor = participiantData.color;
                participiantHTML += `<span style="background-color: ${participiantColor}" class="user-in">${participiantInitials}</span>`;
            }
            counter++;
        }
        if (counter > 3) {
            participiantHTML += `<span style="background-color: black" class="user-in">+${counter - 2}</span>`;
        }
        return participiantHTML;
    } else {
        return `<span></span>`;
    }
}

/**
 * Render preview card on click (divided into sub functions)
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
                <div class="preview-card-action" onclick="openEditCard('${index}')">
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

async function openEditCard(index) {
    taskCache = task[index];
    await loadContacts();
    renderEditCard(index);
}

function getTaskPrio(id) {
    const button = document.getElementById(id);
    if (button.classList.contains("active")) {
        button.classList.remove("active");
    } else {
        document.querySelectorAll(".addTaskBTN").forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        userPriotity = button.innerText.trim();
    }
}

/**
 * Render edit card on click (divided into sub functions)
 * @param {*} index 
 */
function renderEditCard(index) {
    openEditTask(index);
    let editCard = document.getElementById('edit-card');
    let editCardForm = renderEditCardHeader(index);
    editCardForm += renderEditCardTitleSection(index);
    editCardForm += renderEditCard2ColArea(index);
    editCardForm += renderEditCardPriority(index);
    editCardForm += renderEditCardParticipiants(index);
    editCardForm += renderEditCardSubtaskArea(index);    
    editCardForm += renderEditCardFooter(index);        
    editCard.innerHTML = editCardForm;
}

function renderEditCardHeader(index) {
    return `<div class="preview-card-header">
                            <h3>Edit Task</h3>                                                       
                            <img class="pointer" src="./assets/img/close.svg" alt="Close Task" onclick="closeEditTask('${index}')">
                        </div>`;
}

function renderEditCardTitleSection(index) {
    return ` <div class="preview-card-content edit-card-content">                            
                            <form class="frm-edit-task" onsubmit="updateCurrentTask('${index}'); return false;">
                            <div class="title-input">                        
                                <label for="task-title"></label>
                                <h3 class="title-edit-card">Titel</h3>
                                <input type="text" required id="task-title" value="${task[index].title}">
                            </div>
                            <div class="title-input">
                                <label for="task-description"></label>
                                <h3 class="title-edit-card">Description</h3>
                                <textarea id="task-description" value="${task[index].description}">${task[index].description}</textarea>
                            </div>`;
}

function renderEditCard2ColArea(index) {
    let editCardForm = `<div class="edit-task-2-col">
                            <div class="title-input small">
                                <label for "task-category"></label>
                                <h3 class="title-edit-card">Category</h3>
                                <select id="task-category" requried>`;
    if (task[index].category == "technical") {
        editCardForm += `<option value="technical" selected>Technical Task</option>
                         <option value="story">User Story</option>`;
    } else {
        editCardForm += `<option value="story" selected>User story</option>
                         <option value="technical">Technical Task</option>`;
    }
    editCardForm += `</select></div>`;
    editCardForm += `<div class="title-input small">
                        <label for "task-due-date"></label>
                        <h3 class="title-edit-card">Due Date</h3>
                        <input type="date" id="task-due-date" value="${task[index].dueDate}"></input>
                     </div> </div>`;    
    return editCardForm;
}

function renderEditCardPriority(index) {
    let currentPriority = task[index].priority;
    if (!currentPriority) {
        currentPriority = "low";
    }
    let priority = task[index].priority;
    let editCardForm = `   <div class="title-input">                        
                                <label for="task-title"></label>
                            </div>
                            <h3 class="title-edit-card">Priority</h3>
                            <div id="priority">
                                <div id="btn-prio-low" onclick="changePriority('low')" class="btn-prio ${priority === 'low' ? 'green' : ''}" data-value="low">Low</div>
                                <div id="btn-prio-medium" onclick="changePriority('medium')"  class="btn-prio ${priority === 'medium' ? 'yellow' : ''}" data-value="medium">Medium</div>
                                <div id="btn-prio-high"  onclick="changePriority('high')" class="btn-prio ${priority === 'high' ? 'red' : ''}" data-value="high">High</div>
                            </div>`;
    return editCardForm;
}

function renderEditCardParticipiants(index) {
    let editCardForm = `<div class="task-participiants-dropdown">
                                <label="task-participiants">
                                <div class="dropdown-btn" onclick="showContacts()">
                                    <span>Assign contacts</span>                                    
                                    <img id="arrow" src="./assets/img/edit.svg">
                                </div>
                                <div class="dropdown-contacts d-none dropdown-contacts-edit" id="dropdown-contacts">`;
    for (let i = 0; i < contactId.length; i++) {
        let contactIsAssignet = false;
        if (task[index].assignetTo && task[index].assignetTo.length > 0) {
            for (let j = 0; j < task[index].assignetTo.length; j++) {
                if (contactId[i] == task[index].assignetTo[j]) {
                    contactIsAssignet = true;
                }
            }
        }
        if (contactIsAssignet == true) {
            editCardForm += `<label><input type="checkbox" name="task-participiant" value="${contactId[i]}" checked>${contact[contactId[i]].name}</label>`;
        } else {
            editCardForm += `<label><input type="checkbox" name="task-participiant" value="${contactId[i]}">${contact[contactId[i]].name}</label>`;
        }
        editCardForm += `<br>`;
    }
    editCardForm += `</label></div></div>`;
    return editCardForm;
}

function renderEditCardSubtaskArea(index) {
    let editCardForm = renderEditCardAddSubtask(index);
    editCardForm += renderEditCardEditSubtaskArea(index);
    return editCardForm;
}

function renderEditCardAddSubtask(index) {
    return `<div class="task-subtask-list title-input">
                <div class="title-input">                        
                    <label for="task-title"></label>
                </div>
                <h3 class="title-edit-card">Subtasks</h3>
                <div class="add-new-subtask">
                    <input id="add-subtask-input" class="add-task-input" type="text" preview="Add a new subtask">                                    
                    <img class="btn-add-new-subtask pointer" onclick = addSubtask('${index}') src="./assets/img/add.svg">
                </div>
                `;
}

function renderEditCardEditSubtaskArea(index) {
    let editCardForm = `<label="task-subtasks"></label><div id="subtask-list">`;
    if (task[index].subtask) {
        for (let i = 0; i < task[index].subtask.length; i++) {
            let isChecked = task[index].subtask[i].status;
            editCardForm += `<div id="subtask-${i}">
                                <div class="subtask-preview" id="subtask-preview-${i}">
                                    <div class="subtask-description">
                                        <input onclick="updateSubtaskState(${i})" class="task-done-prev" type="checkbox" id="checkbox-${i}" name="subtask-${i}" ${isChecked ? 'checked' : ''}>
                                        <span id="description-preview-${i}" class="description-preview">${task[index].subtask[i].description}</span>
                                    </div>
                                    <div class="edit-icons">
                                        <img class="pointer" src="./assets/img/edit.svg" onclick="editSubtask(${i}, '${index}')">
                                        <img class="pointer" src="./assets/img/delete.svg" onclick="deleteEditedSubtask(${i}, '${index}')">
                                    </div>
                                </div>
                                <div class="subtask-edit d-none" id="subtask-edit-${i}">
                                    <div class="subtask-description">                                        
                                        <input class="description-preview" type="text" id="subtask-description-${i}" value="${task[index].subtask[i].description}">                                    
                                    </div>
                                    <div class="edit-icons">
                                        <img class="pointer" src="./assets/img/check.svg" onclick="saveEditedSubtask(${i}, '${index}')">
                                    </div>
                                </div>
                             </div>
                             `;
        }
    } else {
        editCardForm += `There are NO subtasks`;
    }
    editCardForm += `</div></div></form></div>`;
    return editCardForm;
}

function renderEditCardFooter(index) {
    return `<div class="edit-card-footer blur">                        
                <span class="save-edited-task btn-add-task btn-small" onclick="updateTaskArray('${index}')">Save</span>
            </div>`;
}