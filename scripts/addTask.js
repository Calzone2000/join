let BASE_URL =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/";

let BASE_URL_addTask =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/task";

let BASE_URL_Contacts =
  "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/contact";

let task = [];
let taskID = [];
let subtask = [];
let assigningTo = [];
let data = [];
let path = "contacts";
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

let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;
let statusSubtask = false;
let addTaskProcess = false;

async function loadGestFromServer() {
  try {
    const response = await fetch(`${BASE_URL_Contacts}.json`);
    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok.");
    }
    const data = await response.json();
    guesteArray = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

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
 * create Task and switching to the Board.
 */
function getValue(id) {
  return document.getElementById(id).value.trim();
}

function getTaskFromForm() {
  const priorityElement = document.querySelector(".prioBTNS .active"); // Find the active priority button
  const priority = priorityElement ? priorityElement.id : "";

  if (window.name) {
    currentState=window.name;
  }

  const task = {
    title: getValue("taskTitle"),
    description: getValue("taskDescriptionArea"),
    dueDate: getValue("taskDate"),
    category: getValue("task_category"),
    priority,
    assignetTo: assigningTo,
    subtasks: subtask,
    currentState: currentState,
  };
  return task;
}

async function createTask() {
  const task = getTaskFromForm();
  const databaseUrl =
    "https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/task.json";

  try {
    showLoadingOverlay(); // Show loading overlay before making the request

    const response = await fetch(databaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      // Redirect to board.html after a short delay to show the loading indicator
      setTimeout(() => {
        window.location.href = "board.html";
      }, 1000);
    } else {
      console.error("Failed to create task");
      removeLoadingOverlay(); // Remove loading overlay if there is an error
    }
  } catch (error) {
    console.error("Error:", error);
    removeLoadingOverlay(); // Remove loading overlay if there is an error
  }
}

async function createNewTaskInStorage(data = {}) {
  path = "task/.json";
  //data = {title:"neuer Titel"};
  let response = await fetch(BASE_URL + path, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

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

/**
 * The above code is a JavaScript function named `deleteNewSubTask` that takes an index `i` as a
 * parameter. Inside the function, it uses the `splice` method to remove one element at the specified
 * index `i` from the `subtasks` array. After removing the element, the function then calls another
 * function `getSubTaskAddTask()`. */
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

/**
 * The function `toggleCheckboxes` toggles the visibility of checkboxes and clears the value of an
 * input field based on a boolean variable `show`.
 * @param event - The `event` parameter is an object that represents an event that occurs in the DOM
 * (Document Object Model), such as a click, keypress, or mouse movement. In this context, it is likely
 * being used to handle an event triggered by a user action, such as clicking on a checkbox or
 */
async function toggleCheckboxes(event) {
  event.preventDefault();
  event.stopPropagation();

  let assignedToInput = document.getElementById("checkBoxes");
  const checkboxes = document.getElementById("checkboxUsername");
  checkboxes.innerHTML = ""; // Clear existing checkboxes

  try {
    const response = await fetch(`${BASE_URL_Contacts}.json`);
    if (!response.ok && show) {
      throw new Error("Netzwerkantwort war nicht ok.");
    }
    const snapshot = await response.json();
    Object.keys(snapshot).forEach((key) => {
      const data = snapshot[key];
      checkboxes.innerHTML += renderGenerateCheckBox(data, key);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  if (show) {
    assignedToInput.style.display = "block";
    show = false;
  } else {
    assignedToInput.style.display = "";
    show = true;
    // assignedToInput.value = "";
  }
}

/**
 * The function generates a list of selected guests' names, colors, and initials based on checked
 * checkboxes.
 */
function generateCheckBoxName() {
  const selectedGuest = Array.from(
    document.querySelectorAll('input[name="optionen"]:checked')
  )
    .map((checkbox) => guesteArray.find((g) => g.name === checkbox.value))
    .filter(Boolean);

  selectedGuest.forEach((guest) => {
    namelist.push(guest.name);
    colorList.push(guest.color);
    initials.push(getInitials(guest.name));
  });
}

/**
 * The function generates checkbox based on elements in an array and hides the checkbox when
 * clicking outside the select box.
 */
async function generateCheckBox() {
  const checkboxes = document.getElementById("checkboxUsername");
  checkboxes.innerHTML = ""; // Clear existing checkboxes

  try {
    const response = await fetch(`${BASE_URL_Contacts}.json`);
    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok.");
    }
    const snapshot = await response.json();
    Object.keys(snapshot).forEach((key) => {
      const data = snapshot[key];
      checkboxes.innerHTML += renderGenerateCheckBox(data, key);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

/**
 * The function `searchNameFromGuestList` searches for a name from a guest list based on user input and
 * renders the results.
 */
function searchNameFromGuestList() {
  let idInput = document.getElementById("taskAssignedTo").value;
  idInput = idInput.toLowerCase();

  let id = document.getElementById("checkboxUsername");

  id.innerHTML = "";
  for (let i = 0; i < guesteArray.length; i++) {
    const element = guesteArray[i];
    let initial = getInitials(element.name);
    if (element.name.toLowerCase().includes(idInput)) {
      id.innerHTML += renderSearchNameFromList(element, initial);
    }
  }
}

/**
 * The function `getValues` retrieves the checked values of checkboxes with a specific name and calls
 * the `checkGuestsName` function with those values.
 * @param id - The `id` parameter in the `getValues` function is used to specify the ID of an HTML
 * element that will be targeted to display the selected values from checkboxes.
 */
function getValues(id) {
  let addTaskShowCheck = document.getElementById(id);
  const checkboxes = document.querySelectorAll(
    'input[name="optionen"]:checked'
  );
  addTaskShowCheck.innerHTML = "";

  let checkedValues = [];
  checkboxes.forEach((checkbox) => {
    checkedValues.push(checkbox.value);
  });
  checkGuestsName(checkedValues);
}

/**
 * The function `checkGuestsName` retrieves selected guest names and their corresponding colors from
 * checkboxes and displays their initials with respective colors on the webpage.
 * @param checkedValues - The `checkedValues` parameter in the `checkGuestsName` function is used to
 * determine if any checkboxes have been checked. If `checkedValues` is truthy, the function will
 * proceed to retrieve the selected checkboxes, find the corresponding guest information, and display
 * the initials of the selected guests with
 */
function checkGuestsName(checkedValues) {
  if (checkedValues) {
    const selectedCheckboxes = document.querySelectorAll(
      'input[name="optionen"]:checked'
    );
    const selectedGuests = [];
    selectedCheckboxes.forEach((checkbox) => {
      const guestName = checkbox.value;
      const guest = guesteArray.find((g) => g.name === guestName);
      if (guest) {
        selectedGuests.push({
          name: guest.name,
          color: guest.color,
        });
      }
    });
    showCheck.innerHTML = "";
    for (let index = 0; index < selectedGuests.length; index++) {
      const element = selectedGuests[index];
      let initial = getInitials(element.name);
      showCheck.innerHTML += /* html */ `
        <div class="addTask_checkboxName boardTask_userInitial showTask_userInitial" style="background-color: ${element.color};">${initial}</div>
      `;
    }
  }
}
