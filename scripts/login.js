const BASE_URL = 'https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/'

async function createNewUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const acceptPrivacyPolicyCheckbox = document.getElementById('acceptPrivacyPolicyCheckbox');

    // if (submitConditions(name, email, password, confirmPassword, acceptPrivacyPolicyCheckbox)) {

    data = {
        name: name,
        email: email,
        password: password
    };    
  
    try {
        const response = await postNewUser("/user", data);
        alert('User created successfully!');
    } catch (error) {
        console.error("Error creating user:", error);
        alert('There was an error creating the user.');
    }    
}



// boolean werte: 

// function submitConditions(name, email, password, confirmPassword, acceptPrivacyPolicyCheckbox) {
//     let validName = false;
//     let validEmail = false;

//     if (name) {
//         validName = true;
//     } else {
//         document.getElementById('name').style.border = 'solid 2px rgb(255, 4, 4)';
//         return;
//     }

//     if (email) {
//         validEmail = true;
//     } else {
//         document.getElementById('email').style.border = 'solid 2px rgb(255, 4, 4)';
//         return;
//     }

//     if (!validName && !validEmail) {
//         document.getElementById('name').style.border = 'solid 2px rgb(255, 4, 4)';
//         document.getElementById('email').style.border = 'solid 2px rgb(255, 4, 4)';
//         return false;
//     }

//     if (password !== confirmPassword) {
//         document.getElementById('password').style.border = 'solid 2px rgb(255, 4, 4)';
//         document.getElementById('confirm-password').style.border = 'solid 2px rgb(255, 4, 4)';
//         return;
//     }

//     if (!acceptPrivacyPolicyCheckbox.checked) {
//         alert("Please accept the Privacy Policy!")
//         return;
//     }

//     return true;
// }


async function postNewUser(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}