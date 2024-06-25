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
  document.getElementById("addNewTask").classList.add("d-none");
  document.getElementById("delSubtask").classList.remove("d-none");
  document.getElementById("check").classList.remove("d-none");

  let taskSubtask = document.getElementById("taskSubtask");
}

/**
 * Task löschen / Inputfeld leeren
 */
function delSubtask() {
  document.getElementById("taskSubtasks").value = "";

  document.getElementById("addNewTask").classList.remove("d-none");
  document.getElementById("delSubtask").classList.add("d-none");
  document.getElementById("check").classList.add("d-none");
}

/**
 * Task hinzufügen
 */
function addNewSubTask() {
  document.getElementById("addNewTask").classList.remove("d-none");
  document.getElementById("delSubtask").classList.add("d-none");
  document.getElementById("check").classList.add("d-none");
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
