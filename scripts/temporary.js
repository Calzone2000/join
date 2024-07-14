
function generateTest() {
    return {
        array: [`value_1`, `value_2`, `value_3`]
    }
}

function generateTestUpdate() {
    return {
        array: [`value_4`, `value_5`, `value_6`]
    }
}

function updateTest() {
    let newTestUpdate = generateTestUpdate();
    updateTestInStorage(newTestUpdate);
}

function uploadTest() {
    let newTest = generateTest();
    createTestInStorage(newTest);
}

function uploadDemoTask() {
    let newTask = generateDemoTasks();
    createNewTaskInStorage(newTask);
}