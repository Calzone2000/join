const BASE_URL = 'https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/'

function createNewUser() {
    postNewUser("/user", {"asd": "dfg"});
}

async function postNewUser(path="", data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}