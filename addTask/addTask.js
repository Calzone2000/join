/*let BASE_URL_addTask =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/task";

let BASE_URL_Contacts =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/user"; */

let task = [];
let taskID = [];

/* Tasks den Kontakten zu weisen */
function chooseContact() {}

/* Task Priorisieren */
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
 * add Task
 */
function showAddAndDeleteSubTask() {
  let BTNPlus = document.getElementById("addTaskBTNPlus");
  let del = document.getElementById("delSubtasks");
  let check = document.getElementById("check");

  BTNPlus.style.visibility = "hidden";
  del.style.display = "inline";
  check.style.display = "inline";
}

/**
 * del Task / clear inputfield
 */
function delTask() {
  let BTNPlus = document.getElementById("addTaskBTNPlus");
  let del = document.getElementById("delSubtasks");
  let check = document.getElementById("check");
  let subtask = document.getElementById("taskSubtasks");

  subtask.value = "";
  check.style.display = "none";
  del.style.display = "none";
  BTNPlus.style.visibility = "initial";
}

/**
 * add Task
 */
function addNewSubTask() {
  let subtask = document.getElementById("taskSubtasks");
  let BTNPlus = document.getElementById("addTaskBTNPlus");
  let del = document.getElementById("delSubtasks");
  let check = document.getElementById("check");

  if (subtask.value) {
    subtask.push(subtask.value);
  }
  getSubTaskAddTask();
  check.style.display = "none";
  del.style.display = "none";
  BTNPlus.style.visibility = "initial";
  subtask.value = "";
}

function getSubTaskAddTask() {
  let getSubtask = document.getElementById("getSubtask");
  getSubtask.innerHTML = "";

  if (subtask) {
    for (let i = 0; i < subtask.length; i++) {
      const element = subtask[i];
      getSubtask.innerHTML += renderGetSubtasks(i, element);
    }
  }
}

/**
 * Die Eingegebenen Inhalt wird gelöscht
 */
function clearContent() {
  let idChekBox = document.getElementById("showCheck");
  idChekBox.innerHTML = "";
  subtasks = [];
  document.getElementById("showCheck").innerHTML = "";
  document.getElementById("getSubtask").innerHTML = "";
  document.getElementById("myForm").reset();
  getSubTaskAddTask();
}

/**
 * Task wird erstellt und auf Board angezeigt werden
 */
function createTask() {}
