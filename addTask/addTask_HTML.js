let currentState = [
  {
    toDo: [],
  },

  {
    inProgress: [],
  },

  {
    awaitFeedback: [],
  },

  {
    done: [],
  },
];

function renderGetSubtasks(i, element) {
  return /* html */ `
    <div class="showTaskSubtaskEditBTN" id="showTaskSubtaskEditBTN${i}">
        <input type="text" id="showTaskSubtaskEditInput${i}" value="${element}">
        <div class="editingDeleting">
            <img src="../assets/img/delete.svg" alt="" onclick="delNewTask(${i})" class="delSubtask">
            <img src="../assets/img/check.svg" alt="" onclick="saveEditNewTask(${i})" class="subtaskTakeover">
        </div>
    </div>

    <div class="editSubtasks_delEdit">
        <div class="showTask"><li>${element}</li></div>
        <div class="showSubTask">
            <img class="imgHoverBTN" src="../assets/img/edit.svg" onclick="EditNewSubTask(${i})">
            <div class="crossLine"></div>
            <img class="imgHoverBTN" src="../assets/img/delete.svg"  onclick="delNewTask(${i})">
        </div>
    </div>
    `;
}
