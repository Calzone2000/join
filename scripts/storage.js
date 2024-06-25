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

async function updateTaskInStorage(data={}) {
    path = "task/" + currentDraggedTask + ".json";
    //data = {title:"neuer Titel"};
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
    //data = {title:"neuer Titel"};
    let response = await fetch(BASE_URL + path, {
        method:"POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}