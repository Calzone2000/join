let contacts = [];
let namesFirstLetters = [];
let initials = [];
let currentName = "";
let currentEmail = "";
let currentPhone = "";
let currentElement = "";

const AVATAR_COLOR = [
  "#ff7a00",
  "#ff5eb3",
  "#6e52ff",
  "#9327ff",
  "#00bee8",
  "#1fd7c1",
  "#ffa35e",
  "#fc71ff",
  "#ffdc00",
  "#0038ff",
  "#c3ff2b",
  "#ffe62b",
  "#ff4646",
];

/**
 * this function gets all required data from the database and renders the page
 */

async function onloadFunc() {
  let contactResponse = await getAllContacts("");
  let contactKey = contactResponse["contact"];
  let contactsKeys = Object.keys(contactKey);

  for (let i = 0; i < contactsKeys.length; i++) {
    let contactId = contactsKeys[i];
    let initials = contactResponse["contact"][contactId]["name"].split(" ");
    let firstInitial = initials[0][0].toUpperCase();
    let secondInitial = "";
    if (initials.length > 1) {
      secondInitial = initials[1][0].toUpperCase();
    }

    contacts.push({
      color: contactResponse["contact"][contactId]["color"],
      email: contactResponse["contact"][contactId]["email"],
      name: contactResponse["contact"][contactId]["name"],
      phone: contactResponse["contact"][contactId]["phone"],
      firstInitial: firstInitial,
      secondInitial: secondInitial,
      id: contactId,
    });
  }  
  getFirstLetters();
  renderContacts();
  renderContent();
}

/**
 * this function renders all the contacts
 */

function renderContacts() {
  for (let index = 0; index < namesFirstLetters.length; index++) {
    document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class="contacts-alphabet" id="${namesFirstLetters[index]}">${namesFirstLetters[index]}</div>
        <div class="seperator"></div>
        <div id="${namesFirstLetters[index]}-content"></div>
        `;
  }
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(`${contacts[i]["name"][0]}-content`).innerHTML +=
      renderContactsHtml(i);
  }
}

/**
 * this function returns the html code for the renderContacts function
 */

function renderContactsHtml(i) {
  return `
  <div id="contact-field-${i}" class="contact-field" onclick="showContact(${i})">
      <div>
          <div class="profile-badge" style="background-color: ${contacts[i]["color"]}">${contacts[i]["firstInitial"]}${contacts[i]["secondInitial"]}</div>
      </div>
      <div class="contact-data">
          <div>${contacts[i]["name"]}</div>
          <div><a href="${contacts[i]["email"]}">${contacts[i]["email"]}</a></div>

      </div>
  </div>
      
  `;
}

/**
 * this funtion hides all the contact data, which which were displayed by clicking on a contact
 */

function closeShownContact() {
  document.getElementById("right-container").classList.add("hide-800");
  document.getElementById("contacts-container").classList.remove("hide-800");
  document.getElementById("shown-contact-close").classList.add("hide");
}

/**
 * this function displays all the data from a contact by clicking on a contact
 * @param {index} i this parameter is there, to identify the current selected contact and to display the correct data
 */

function showContact(i) {
  let contactFields = document.querySelectorAll('.contact-field');
  contactFields.forEach(contactField => {
    contactField.classList.remove('activated');
  });
  
  document.getElementById(`contact-field-${i}`).classList.add('activated');
  
  document.getElementById("selected-contact").innerHTML = "";
  currentName = contacts[i]["name"];
  currentEmail = contacts[i]["email"];
  currentPhone = contacts[i]["phone"];
  currentElement = i;

  document.getElementById("right-container").classList.remove("hide-800");
  document.getElementById("contacts-container").classList.add("hide-800");
  document.getElementById("shown-contact-close").classList.remove("hide");
  document.getElementById("selected-contact").innerHTML += showContactHtml(i);
}

/**
 * this function returns the html code for the showContact function
 * @param {*} i this parameter is there, to identify the current selected contact and to display the correct data
 * @returns html code
 */

function showContactHtml(i) {
  return `
  <div class="selected-contact">
      <div class="selected-contact-top">
          <div class="profile-badge-big" style="background-color: ${contacts[i]["color"]}">${contacts[i]["firstInitial"]}${contacts[i]["secondInitial"]}</div>
          <div class="selected-contact-top-right">
              <h2>${contacts[i]["name"]}</h2>
              <div class="selected-contact-top-right-btns">
                  <button class="contact-buttons" onclick="openModalEdit(${i})">
                      <img src="../assets/img/edit.svg" alt="">
                      <p class="contact-button-p">Edit</p>
                  </button>
                  <button class="contact-buttons" onclick="deleteRequest()">
                      <img src="../assets/img/delete.svg" alt="">
                      <p class="contact-button-p">Delete</p>
                  </button>
              </div>
          </div>
      </div>
      <div>
          <h3>Contact Information</h3>
      </div>
      <div>
          <h4 class="mail-heading">Email</h4>
          <a href="${contacts[i]["email"]}">${contacts[i]["email"]}</a>
          <h4>Phone</h4>
          ${contacts[i]["phone"]}
      </div>
  </div>
`;
}

/**
 * this function is there to delete a contact by clicking the "delete" button, it deletes the data from the database and from the page, and renders the page again
 * @returns is there to leave the if loop
 */

async function deleteContact() {
  if (currentElement < 0 || currentElement >= contacts.length) {
    console.error("Index out of bounds");
    return;
  }

  let contactId = contacts[currentElement]["id"];

  try {
    let response = await fetch(BASE_URL + "contact/" + contactId + ".json", {
      method: "DELETE",
    });

    if (response.ok) {
      const index = assigningTo.indexOf(contactId);
      if (index > -1) {
        assigningTo.splice(index, 1);
      }

      contacts.splice(currentElement, 1);
      renderContacts();
    } else {
      console.error("Fehler beim Löschen des Kontakts: ", response.statusText);
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts: ", error);
  }
  location.reload();
  renderContacts();
}

/**
 * this function opens a window to ask if a contact should be deleted permanently
 */

function deleteRequest() {
  document.getElementById("delete-request").style.display = "flex";
}

/**
 * this function closes the window to ask if a contact should be deleted permanently
 */

function closeDeleteRequest() {
  document.getElementById("delete-request").style.display = "none";
}

/**
 * this function gets the first letters of all the contacts, in order to display a list with all the first letters
 */

function getFirstLetters() {
  namesFirstLetters.push(contacts[0]["name"][0]);
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i];
    let firstLetter = name["name"][0];
    if (!namesFirstLetters.includes(firstLetter)) {
      namesFirstLetters.push(firstLetter);
    }
  }
  namesFirstLetters.sort();
}

/**
 * this function is there to load all the data from the database
 * @param {*} path gets the correct path of where the requested data is stored
 * @returns returns the data as a json
 */

async function getAllContacts(path) {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * updates data in the database
 * @param {*} functionType allows to use the input data with different function types
 */

async function pushAllData(functionType) {
  const input = functionType;
  let name = input.name;
  let email = input.email;
  let phone = input.phone;
  let color = AVATAR_COLOR[Math.floor(Math.random() * AVATAR_COLOR.length)];

  let contactResponse = await getAllContacts("");
  let contactKey = contactResponse["contact"];
  let contactsKeys = Object.keys(contactKey);

  for (let i = 0; i < contactsKeys.length; i++) {
    let key = contactsKeys[i];
    let mail = contactKey[key].email;

    if (email == mail) {
      let emailInput = document.getElementById("email-input");
      emailInput.value = "";
      emailInput.style.borderColor = "red";
      emailInput.placeholder =
        "The e-mail address you entered is already taken.";
      return;
    }
  }

  postData("contact", { color: color, name: name, email: email, phone: phone })
    .then(() => {
      closeModalAdd();
      location.reload();
    })
    .catch((error) => {
      console.error("Fehler beim Posten der Daten: ", error);
    });
}

async function pushAllDataEdit(functionType) {
  const input = functionType;
  let name = input.name;
  let email = input.email;
  let phone = input.phone;
  let color = AVATAR_COLOR[Math.floor(Math.random() * AVATAR_COLOR.length)];

  let contactResponse = await getAllContacts("");
  let contactKey = contactResponse["contact"];
  let contactsKeys = Object.keys(contactKey);

  postData("contact", { color: color, name: name, email: email, phone: phone })
    .then(() => {
      closeModalEdit();
      location.reload();
    })
    .catch((error) => {
      console.error("Fehler beim Posten der Daten: ", error);
    });
}

/**
 * pushes new data to the database
 * @param {*} path gets the correct path of where the requested data is stored
 * @param {*} data gets the correct file, so that the correct file will be updated
 * @returns returns the data as a json
 */

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * gets the input values from all the input fields of the create contact window
 * @returns returns a json with all input values
 */

function getInput() {
  let name = document.getElementById("name-input").value;
  let email = document.getElementById("email-input").value;
  let phone = document.getElementById("phone-input").value;

  return {
    name: name,
    email: email,
    phone: phone,
  };
}

/**
 * gets the input values from the edit contact window
 * @returns returns a json with all input values
 */

function getInputEdit() {
  let name = document.getElementById("name-input-edit").value;
  let email = document.getElementById("email-input-edit").value;
  let phone = document.getElementById("phone-input-edit").value;

  return {
    name: name,
    email: email,
    phone: phone,
  };
}

/**
 *clears all input fields from the create contact window
 */

function clearInput() {
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("phone-input").value = "";
}

/**
 *clears all input fields from the edit contact window
 */

function clearInputEdit() {
  document.getElementById("name-input-edit").value = "";
  document.getElementById("email-input-edit").value = "";
  document.getElementById("phone-input-edit").value = "";
}

/**
 * includes add_contact.html file in the document und displays window to create new contact
 */

function openModalAdd() {
  document.getElementById("contact-form-modal-add").style.display = "block";
  document.body.classList.add("no-scroll");
  includeHTML();
}

/**
 * hides window to create new contact
 */

function closeModalAdd() {
  clearInput();
  let emailInput = document.getElementById("email-input");
  emailInput.style.borderColor = "";
  emailInput.placeholder = "Email";
  document.getElementById("contact-form-modal-add").style.display = "none";
  document.body.classList.remove("no-scroll");
}

/**
 * includes edit_contact.html file in the document und displays window to create new contact
 */

async function openModalEdit() {
  document.getElementById("contact-form-modal-edit").style.display = "block";
  document.body.classList.add("no-scroll");
  document.getElementById("name-input-edit").value = currentName;
  document.getElementById("email-input-edit").value = currentEmail;
  document.getElementById("phone-input-edit").value = currentPhone;
  includeHTML();
}

/**
 * hides window to edit contact
 */

function closeModalEdit() {
  document.getElementById("contact-form-modal-edit").style.display = "none";
  document.body.classList.remove("no-scroll");
}
