let BASE_URL_addTask =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/task";

let BASE_URL_Contacts =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/user";

let task = [];
let taskID = [];

let toDo = "to-do";

/* Tasks den Kontakten zu weisen */
function chooseContact() {}

/* Task auf Urgent setzen
function getTaskPrio('urgent') {} */

/* Task auf medium setzen
function getTaskPrio('medium') {} */

/* Task auf low setzen
function getTaskPrio('low') {} */

/**
 * Task hinzufügen
 */
function showAddAndDeleteSubTask() {
  document.getElementById("addNewTask").classList.add("d-none");
}

/**
 * Task löschen / Inputfeld leeren
 */
function delSubtask() {
  // document.getElementById("taskSubtasks").value = "";
  document.getElementById("delSubtask").classList.remove("d-none");
}

/**
 * Task hinzufügen
 */
function addNewSubTask() {
  document.getElementById("check").classList.remove("d-none");
}
