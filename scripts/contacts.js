let contacts = [];
let namesFirstLetters = [];
let initials = [];
let currentName = "";
let currentEmail = "";
let currentPhone = "";
let currentElement = "";

async function onloadFunc() {
  let contactResponse = await getAllContacts("");
  let contactKey = contactResponse["contact"];
  let contactsKeys = Object.keys(contactKey);

  for (let i = 0; i < contactsKeys.length; i++) {
    let contactId = contactsKeys[i];
    let initials = contactResponse["contact"][contactId]["name"].split(" ");
    let firstInitial = initials[0][0].toUpperCase();
    let secondInitial = '';
    if(initials.length > 1){
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
}

function renderContacts() {
  for (let index = 0; index < namesFirstLetters.length; index++) {
    document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class="contacts-alphabet" id="${namesFirstLetters[index]}">${namesFirstLetters[index]}</div>
        <div class="seperator"></div>
        <div id="${namesFirstLetters[index]}-content"></div>
        `;
  }
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(
      `${contacts[i]["name"][0]}-content`
    ).innerHTML += /*html*/ `
    <div class="contact-field" onclick="showContact(${i})">
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
}

function closeShownContact(){
    document.getElementById('right-container').classList.add('hide-800');
  document.getElementById('contacts-container').classList.remove('hide-800');
  document.getElementById('shown-contact-close').classList.add('hide');
}

function showContact(i) {
  document.getElementById("selected-contact").innerHTML = "";
  currentName = contacts[i]["name"];
  currentEmail = contacts[i]["email"];
  currentPhone = contacts[i]["phone"];
  currentElement = i;

  document.getElementById('right-container').classList.remove('hide-800');
  document.getElementById('contacts-container').classList.add('hide-800');
  document.getElementById('shown-contact-close').classList.remove('hide');
  document.getElementById('selected-contact').innerHTML += /*html*/ `
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
                        <button class="contact-buttons" onclick="deleteContact(${i})">
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

async function deleteContact() {
  if (currentElement < 0 || currentElement >= contacts.length) {
    console.log("Index out of bounds");
    return;
  }

  let contactId = contacts[currentElement]["id"];
  try {
    let response = await fetch(BASE_URL + "contact/" + contactId + ".json", {
      method: "DELETE",
    });

    if (response.ok) {
      contacts.splice(currentElement, 1);
      console.log("Kontakt erfolgreich gelöscht");
    } else {
      console.error("Fehler beim Löschen des Kontakts", response.statusText);
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts", error);
  }

  location.reload();
  renderContacts();
}

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

async function getAllContacts(path) {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}

function pushAllData(functionType) {
  const input = functionType;
  let name = input.name;
  let email = input.email;
  let phone = input.phone;
  let color = AVATAR_COLOR[Math.floor(Math.random() * AVATAR_COLOR.length)];

  postData("contact", { color: color, name: name, email: email, phone: phone })
    .then(() => {
      closeModalAdd();
      location.reload();
    })
    .catch((error) => {
      console.error("Fehler beim Posten der Daten: ", error);
    });
}

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

function clearInput() {
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("phone-input").value = "";
}

function clearInputEdit() {
  document.getElementById("name-input-edit").value = "";
  document.getElementById("email-input-edit").value = "";
  document.getElementById("phone-input-edit").value = "";
}

function openModalAdd() {
  document.getElementById("contact-form-modal-add").style.display = "block";
  document.body.classList.add("no-scroll");
  includeHTML();
}

function closeModalAdd() {
  document.getElementById("contact-form-modal-add").style.display = "none";
  document.body.classList.remove("no-scroll");
}

async function openModalEdit() {
  document.getElementById("contact-form-modal-edit").style.display = "block";
  document.body.classList.add("no-scroll");
  document.getElementById("name-input-edit").value = currentName;
  document.getElementById("email-input-edit").value = currentEmail;
  document.getElementById("phone-input-edit").value = currentPhone;
  includeHTML();
}

function closeModalEdit() {
  document.getElementById("contact-form-modal-edit").style.display = "none";
  document.body.classList.remove("no-scroll");
}
