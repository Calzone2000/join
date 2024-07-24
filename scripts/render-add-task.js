function renderAddTask() {
    let addTaskForm = renderAddTaskTitle();
    addTaskForm += renderAddTaskDescription();
    addTaskForm += renderAddTaskAssignetTo();
    addTaskForm += renderAddTaskDueDate();
    addTaskForm += renderAddTaskPrio();
    addTaskForm += renderAddTaskCategorie();
    addTaskForm += renderAddTaskSubtasks();
    addTaskForm += renderAddTaskFooter();
    document.getElementById('myForm').innerHTML = addTaskForm;
}

function renderAddTaskTitle() {
    return `<div class="addTaskForm">
                <div class="addTaskLeft addTaskWidth">
                    <div class="addTaskTitle formRow">
                        <label for="" class="titleAddTask">Title<b class="require">*</b></label>
                        <input type="text" name="title" id="taskTitle" class="addTaskInput" placeholder="Enter a Title" required/>
                    </div>`;
}

function renderAddTaskDescription() {
    return `<div class="addTaskDescription formRow">
                <label class="lblDescription" for="">Description<b class="require">*</b></label>
                <div class="addTaskTextArea">
                    <textarea name="description" id="taskDescriptionArea" class="DescriptionTXTArea" cols="30" rows="10"
                         placeholder="Enter a Description" required>
                    </textarea>
                </div>
            </div>`;
}

function renderAddTaskAssignetTo() {
    return `<div class="addTaskAssigned formRow">
      <label class="lblAssigned">Assigned to</label>
      <div class="choosingContact" onclick="toggleCheckboxes(event)">
        <img src="./assets/img/icon/arrow_drop_down.svg" alt=""/>
        <input type="text" name="assignedTo" class="AssignedToContact addTaskInput" id="taskAssignedTo" placeholder="Select options"/>
      </div>
      <div class="checkboxName" id="checkBoxes" onclick="event.stopPropagation()">
        <div class="dropdownUsername" id="checkboxUsername" ></div>
      </div>
    </div>
    <div class="showCheck" id="showCheck"></div>
  </div>`;
}


function renderAddTaskDueDate() {
    return `<div class="addTaskLine"></div>
            <div class="addTaskRight addTaskWidth">
            <div class="addTaskDueDate formRow">
                <label for="" class="addTaskDate" >Due date<b class="require">*</b></label>
                <div class="taskCalender">
                    <input for="" id="taskDate" class="addDate addTaskInput" type="date" required/>
                </div>
            </div>`;
}   

function renderAddTaskPrio() {
    return `<div class="addTaskPrio formRow">
                <label for="">Prio</label>
                <div class="prioBTNS">
                    <button id="high" type="button" class="addTaskBTN addTaskHover urgents" value="1" onclick="getTaskPrio('high')">
                        Urgent
                        <div class="addTaskBTNImg">
                            <img src="./assets/img/prio-high.svg" alt="" class="urgentIMG">
                        </div>
                    </button>
                    <button id="medium" type="button" class="addTaskBTN addTaskHover mediums active" value="1" onclick="getTaskPrio('medium')">
                        Medium
                        <div class="addTaskBTNImg">
                            <img src="./assets/img/prio-medium.svg" alt="" class="mediumIMG">           
                        </div>
                    </button>
                    <button id="low" type="button" class="addTaskBTN addTaskHover lows" value="1" onclick="getTaskPrio('low')">
                        Low
                        <div class="addTaskBTNImg">
                            <img src="./assets/img/prio-low.svg" alt="" class="lowIMG"/>
                        </div>
                    </button>
                </div>
            </div>`;
}


function renderAddTaskCategorie() {
    return `<div class="addTaskCategory formRow">
                <label class="lblCategory" for="">Category<b class="require">*</b></label>
                <select id="task_category" class="taskCategorySelection" required>
                    <option value="" hidden>Select task category</option>
                    <option value="technical">Technical Task</option>
                    <option value="story">User Story</option>
                </select>
            </div>`;
}

function renderAddTaskSubtasks() {
    return `<div class="addTaskSubtasks formRow">
                <label class="lblSubtasks">Subtasks</label>
                <div class="addTaskPlus" id="addTaskBTNPlus">
                    <img class="addTaskPlusIMG" id="addNewTask" src="./assets/img/icon/add.svg" onclick="showAddAndDeleteSubTask()"/>
                </div>
                <div class="addTaskCheckDel" id="addTaskCheckDel">
                    <img id="delSubtasks" src="./assets/img/icon/close.svg" alt="" onclick="delTask()" class="delContent"/>
                    <img id="check" src="./assets/img/check.svg" onclick="addNewSubTask()" class="accept"/>
                </div>
                    <input class="addTaskSubs addTaskInput" id="taskSubtasks" placeholder="Add new subtask" type="text"/>
                </div>
            <div class="getSubtask" id="getSubtask"></div>
        </div>
    </div>`;
}

function renderAddTaskFooter() {
    return `<div class="addTaskFooter">
                <p class="requiring"><b class="require">*</b>This field is required</p>
                <div class="BTNFooter">
                    <button class="clearBTNFooter" onclick="clearContent()">
                        Clear
                        <img src="./assets/img/icon/close.svg" alt="" class="cancelX"/>
                    </button>
                    <button class="creatingBTNFooter" onclick="createTask()">
                        Create Task
                        <img src="./assets/img/icon/check.svg" alt="" class="check" type="submit"/>
                    </button>
                </div>
            /div>`;
}


