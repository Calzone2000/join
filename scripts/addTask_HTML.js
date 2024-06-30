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

let priority = [
  {
    high: [],
  },

  {
    medium: [],
  },

  {
    low: [],
  },
];

/** --> Funktion Ändern!!!! Extrem Wichtig
 * The function `renderGenerateCheckBox` generates HTML code for a checkbox element with user
 * initials and name.
 * @param element - The `element` parameter in the `renderGenerateCheckBox` function seems to
 * represent an object with properties like `name`, `color`, and possibly other properties. The
 * function generates HTML markup for a checkbox element based on the properties of this `element`
 * object.
 * @param i - The `i` parameter in the `renderGenerateCheckBox` function is used as an index or
 * identifier for the element being rendered. It is typically used to uniquely identify elements in a
 * list or array, such as when generating checkboxes dynamically in a loop.
 * @returns The function `renderGenerateCheckBox` is returning an HTML template string that
 * generates a checkbox element with a label, user initials, and a name based on the input element and
 * index `i`.
 */
function renderGenerateCheckBox(element, i) {
  let initial = element.name;
  return /*html*/ `        
    <label>
        <div class="board_task_check_box_name"> <!-- Klasse anpassen -->
            <div class="board_task_user_initial check_box_initial" style="background-color:${
              element.color
            }">${getInitials(initial)}</div>
            <p id="${i}">${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkboxIcon"></span>
            </label>
        </div>
    </label>
`;
}

/** --> Funktion Ändern!!!! Extrem Wichtig
 * The function `rendersearchNameFromGuestList` generates HTML markup for displaying a guest's name and
 * initial with a checkbox.
 * @param element - The `element` parameter in the `rendersearchNameFromGuestList` function represents
 * an object containing information about a guest. It likely has properties such as `name`, `color`,
 * and other relevant details.
 * @param initial - The `initial` parameter in the `rendersearchNameFromGuestList` function represents
 * the initial of a guest's name. It is used to display the initial inside a colored box next to the
 * guest's full name in the rendered HTML output.
 * @returns The function `rendersearchNameFromGuestList` returns an HTML template string that includes
 * a label element containing the guest's name and initial, along with a checkbox input element.
 */
function rendersearchNameFromGuestList(element, initial) {
  return /*html*/ `        
        <label>
        <div class="board_task_check_box_name">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${initial}</div>
            <p>${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkbox__icon"></span>
            </label>
        </div>
    </label>
`;
}

/**
 * The function `renderGetSubtasks` generates HTML elements for displaying and editing subtasks
 * within a task.
 * @param i - The parameter `i` in the `renderGetSubtasks` function is used as an index or
 * identifier for the subtask being rendered. It is used to dynamically generate unique IDs for
 * elements within the rendered HTML template.
 * @param element - The `element` parameter in the `renderGetSubtasks` function represents the
 * content of a subtask that will be displayed in the rendered HTML. It is used to dynamically generate
 * a section of HTML code for displaying and editing subtasks within a task.
 * @returns The `renderGetSubtasks` function returns a string containing HTML elements for
 * displaying a subtask with options to edit and delete.
 */
function renderGetSubtasks(i, element) {
  return /* html */ `
    <div class="showTaskSubtaskEditBTN" id="showTaskSubtaskEditBTN${i}">
        <input type="text" id="showTaskSubtaskEditInput${i}" value="${element}">
        <div class="editingDeleting">
            <img src="./assets/img/delete.svg" alt="" onclick="delNewTask(${i})" class="delSubtask">
            <img src="./assets/img/check.svg" alt="" onclick="saveEditNewTask(${i})" class="subtaskTakeover">
        </div>
    </div>

    <div class="editSubtasks_delEdit">
        <div class="showTask"><li>${element}</li></div>
        <div class="showSubTask">
            <img class="imgHoverBTN" src="./assets/img/edit.svg" onclick="EditNewSubTask(${i})">
            <div class="crossLine"></div>
            <img class="imgHoverBTN" src="./assets/img/delete.svg"  onclick="delNewTask(${i})">
        </div>
    </div>
    `;
}
