function renderGetSubtasks(i, element) {
  return /* html */ `
    <div class="showTaskSubtaskEditBTN" id="showTaskSubtaskEditBTN${i}">
        <input type="text" id="showTaskSubtaskEditInput${i}">
        <div>
            <img src="../assets/img/delete.svg" alt="" onclick="delNewTask(${i})">
            <img src="../assets/img/check.svg" alt="" onclick="editNewTask(${i})" >
        </div>
    </div>

    <div class="editSubtasks_delEdit">
        <div class="showTask"><li>${element}</li></div>
        <div class="showTask_editSubtasks_delEditBTN">
            <img class="imgHoverBTN" src="./assets/img/edit.svg" onclick="showEditNewSubTask(${i})">
            <div class="crossLine"></div>
            <img class="imgHoverBTN" src="./assets/img/delete.svg"  onclick="delNewTask(${i})">
        </div>
    </div>
    `;
}
