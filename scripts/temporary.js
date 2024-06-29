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
                <div class="preview-card-action">
                    <img src="./assets/img/delete.svg" alt="Delete Task">
                    <span>Delete</span>
                </div>
                <div class="preview-card-action">
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
    for (let i = 0; i < task[index].assignetTo.length; i++) {
        let participiantInitials = getInitials(contact[task[index].assignetTo[i]].name);
        previewCardHTML += `<div class="user-preview">
                                <div style="background-color: ${contact[task[index].assignetTo[i]].color}" class="user-in left-20">${participiantInitials}</div>
                                <div>${contact[task[index].assignetTo[i]].name}</div>
                            </div>`;
    }
    previewCardHTML += `</div>`;
    return previewCardHTML;
}

function renderPreviewCardSubtasks(index) {
    let previewCardHTML = `<span class="preview-card-sub-hl">Subtasks</span>
                                <div class="preview-card-subtasks">`;
    if (task[index].subtask) {
        for (let i = 0; i < task[index].subtask.length; i++) {
            previewCardHTML += `<div class="preview-card-subtask">
                                    <img src="./assets/img/check_${task[index].subtask[i].status}.svg" alt="Open">
                                    <div>${task[index].subtask[i].description}</div>
                                </div>`;            
        }
    }
    previewCardHTML += `</div></div>`;
    return previewCardHTML;
}