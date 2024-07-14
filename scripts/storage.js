async function loadTasks(path="task") {
    try {
        let response = await fetch(BASE_URL + path + ".json");        
        task = await response.json();
        Object.keys(task).forEach(id => {        
            taskId.push(id); 
        });
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

async function loadContacts(path="contact") {
    try {
        let response = await fetch(BASE_URL + path + ".json");        
        contact = await response.json();
        Object.keys(task).forEach(id => {        
            contactId.push(id); 
        });
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

async function deleteThisTask(index) {    
    let confirmDelete = confirm("Do you really want to delete this task?");
    if (confirmDelete) {
        let path = "task/" + index + ".json";    
        let response = await fetch(BASE_URL + path, {
            method:"DELETE",
            header: {
                "Content-Type": "application/json",
            }            
        });
    document.getElementById('preview-task-area').classList.add('d-none');
    task.length = 0;
    taskId.length = 0;
    await loadTasks();
    renderKanbanBoard();
    }
}


async function updateTaskInStorage(data={}) {
    path = "task/" + currentDraggedTask + ".json";    
    let response = await fetch(BASE_URL + path, {
        method:"PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

async function createNewTaskInStorage(data={}) {
    path = "task/.json";    
    let response = await fetch(BASE_URL + path, {
        method:"POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

async function createTestInStorage(data={}) {    
    path = "test/.json";
        let response = await fetch(BASE_URL + path, {
        method:"POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

async function updateTestInStorage(data={}) {
    path = "test/-O0NzSEsE4_jJFMmF6g4/.json";    
    let response = await fetch(BASE_URL + path, {
        method:"PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

function setCurrentUser() {
    loggedInUserId = localStorage.getItem('user');
    setCurrentUserName();
}

function setCurrentUserName(uid) {
    currentUID = localStorage.getItem('user');    
    if (currentUID) {
        currentUserName = user[currentUID].name;
    }
}

function logoutCurrentUser() {
    localStorage.removeItem('user');
    loggedInUserId = "";
    window.location.href = 'login.html';
}

async function loadUserData(path="user") {
    try {
        let response = await fetch(BASE_URL + path + ".json");        
        user = await response.json();
        Object.keys(user).forEach(id => {        
            uid.push(id); 
        });
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}
