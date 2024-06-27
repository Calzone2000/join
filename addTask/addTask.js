let BASE_URL_addTask =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/task";

let BASE_URL_Contacts =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/user";

let task = [];
let taskID = [];
let subtask = []; // Stellt sicher, dass subtask global definiert ist
let data = [];
let path = "/guestContacts";
let contactColors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];
let colorIndex = 0;
let popUpAction = false;
let user = {
  name: "Gast",
  email: "gast@join.com",
  initials: "G",
  color: "#FC71FF",
};

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
 * add Subtask
 */
function addNewSubTask() {
  let subtaskInput = document.getElementById("taskSubtasks");
  let BTNPlus = document.getElementById("addTaskBTNPlus");
  let del = document.getElementById("delSubtasks");
  let check = document.getElementById("check");

  if (subtaskInput.value) {
    subtask.push(subtaskInput.value); // Füge den neuen Subtask zur globalen subtask-Liste hinzu
  }
  getSubTaskAddTask(); // Aktualisiere die Anzeige der Subtasks
  check.style.display = "none"; // Verstecke den Check-Button
  del.style.display = "none"; // Verstecke den Delete-Button
  BTNPlus.style.visibility = "initial"; // Zeige den Plus-Button
  subtaskInput.value = ""; // Setze das Eingabefeld zurück
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
  // Lösche den Inhalt des Div-Containers mit der ID "getSubtask"
  document.getElementById("getSubtask").innerHTML = "";

  // Setze die globale Variable "subtask" zurück
  subtask = [];

  // Leere das Eingabefeld für Subtasks
  document.getElementById("taskSubtasks").value = "";

  // Setze das Formular zurück
  document.getElementById("myForm").reset();

  // Aktualisiere die Anzeige der Subtasks
  getSubTaskAddTask();
}

/**
 * Task wird erstellt und auf Board angezeigt werden
 */
function createTask() {}

/* async function createNewTaskInStorage(data={}) {
  path = "task/.json";
  //data = {title:"neuer Titel"};
  let response = await fetch(BASE_URL + path, {
      method:"POST",
      header: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  });
} */

/**
 * The function `EditNewSubTask` displays an edit button and input field for a specific subtask
 * based on the index `i`.
 * @param i - The parameter `i` in the `EditNewSubTask` function is used as an index to identify a
 * specific subtask.
 */
function EditNewSubTask(i) {
  let showEditSubtask = document.getElementById(`showTaskSubtaskEditBTN${i}`);
  showEditSubtask.style.display = "flex";

  let showInputSubtask = document.getElementById(
    `showTaskSubtaskEditInput${i}`
  );
  showInputSubtask.value = subtask[i];
}

/* The above code is a JavaScript function named `deleteNewSubTask` that takes an index `i` as a
parameter. Inside the function, it uses the `splice` method to remove one element at the specified
index `i` from the `subtasks` array. After removing the element, the function then calls another
function `getSubTaskAddTask()`. */
function delNewTask(i) {
  subtask.splice(i, 1);
  getSubTaskAddTask();
}

/**
 * The function `saveEditNewTask` updates a specific subtask in an array and then calls another
 * function to update the task.
 * @param i - The parameter `i` in the `saveEditNewTask` function is used as an index to access and
 * update a specific subtask in the `subtasks` array.
 */
function saveEditNewTask(i) {
  let showTaskSubtaskEditInput = document.getElementById(
    `showTaskSubtaskEditInput${i}`
  );
  subtask[i] = showTaskSubtaskEditInput.value;
  getSubTaskAddTask();
}
