/*
let task = [];
let taskId = [];
*/

function renderSummary() {        
    renderStates();  
    renderGreeting();
}

function renderStates() {
    document.getElementById('sum-tasks-open').innerHTML = countStateOccurrences("to-do");
    document.getElementById('sum-tasks-done').innerHTML = countStateOccurrences("done");
    document.getElementById('sum-tasks-total').innerHTML = taskId.length;
    document.getElementById('sum-tasks-in-progress').innerHTML = countStateOccurrences("in-progress");
    document.getElementById('sum-tasks-await-feedback').innerHTML = countStateOccurrences("await-feedback"); 
    document.getElementById('sum-tasks-urgent').innerHTML = countUrgency();
}

function renderGreeting() {
    document.getElementById('greeted-person').innerHTML = currentUserName;
}

function countStateOccurrences(searchString) {    
    let count = 0;
    for (let i = 0; i < taskId.length; i++) {             
        if (task[taskId[i]] && task[taskId[i]].currentState === searchString) {
            count++;
        }
    }    
    return count;
}

function countUrgency(priority="high") {
    let count = 0;
    for (let i = 0; i < taskId.length; i++) {             
        if (task[taskId[i]] && task[taskId[i]].priority === priority) {
            count++;
        }
    }    
    return count;
}
