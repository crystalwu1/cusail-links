// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBm87XbFNx1qbyXw9eBvgovbVXBD5osCpQ",
  authDomain: "cusail-omnibox-a6705.firebaseapp.com",
  databaseURL: "https://cusail-omnibox-a6705.firebaseio.com",
  projectId: "cusail-omnibox-a6705",
  storageBucket: "cusail-omnibox-a6705.appspot.com",
  messagingSenderId: "782612915461",
  appId: "1:782612915461:web:5df3976372f0736f2f436c",
  measurementId: "G-DLH92W1HM0"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const list = document.querySelector('#linktable');
const form = document.querySelector('#add-link-form');
const updateForm = document.querySelector('#update-link-form')
var modalDocument = null

function catchUser() {
  var user = firebase.auth().currentUser;
  console.log(user);
  if (user) {

  } else {
    alert("not signed in!")
    signIn()
  }
}

//show filter
function showFilter() {
  var filterWrapper = document.getElementById("filter").style.display
  if (filterWrapper == "block") {
    document.getElementById("filter").style.display = "none"
    document.getElementById("filterButton").className = ""
  }
  else {
    document.getElementById("filter").style.display = "block"
    document.getElementById("filterButton").className = "active"
  }
}

//close modals
function closeModal() {
  document.getElementById("myModal").style.display = "none"
  document.getElementById("modal-id").textContent = ""
}

//displays edit modal
function displayModal(id) {
  document.getElementById("modal-id").textContent = id
  document.getElementById("myModal").style.display = "block"

  db.collection('links').doc(id).get().then((doc) => {
    updateForm.name.value = doc.data().name
    updateForm.shortcut.value = doc.data().shortcut
    updateForm.link.value = doc.data().data
    updateForm.tag.value = doc.data().tag
  })

  modalDocument = id
}

//make filter tab active
function makeActive(tag) {
  document.getElementById("all").className = "filter";
  document.getElementById("General").className = "filter";
  document.getElementById("Mech").className = "filter mech";
  document.getElementById("Nav").className = "filter nav";
  document.getElementById("BOps").className = "filter bops";

  document.getElementById(tag).className = "filter active";
}

//saving helper
function addToDB() {
  db.collection('links').add({
    name: form.name.value,
    data: form.link.value,
    tag: form.tag.value,
    shortcut: form.shortcut.value
  });

  form.name.value = ""
  form.link.value = ""
  form.tag.value = " "
  form.shortcut.value = ""
}

//updating helper
function updateDB() {
  let id = document.getElementById("modal-id").textContent
  db.collection('links').doc(id).update({
    name: updateForm.name.value,
    data: updateForm.link.value,
    shortcut: updateForm.shortcut.value,
    tag: updateForm.tag.value
  })
  closeModal();
  filterSelection('all')
}

//checks to see that there is no conflicting data before adding or updating
function lookBeforeYouLeap(action, field, intended) {
  db.collection('links').where(field, "==", intended).get().then((snapshot) => {
    count = 0
    snapshot.docs.forEach(doc => {
      count = count + 1;
    })
    if (count > 0) {
      alert("Shortcut already taken. Please enter another one.")
    }
    else {
      if (action == "add") { addToDB(); }
      else if (action == "update") { updateDB(); }
    }
  })
}

//creates the table from each database document
function renderLink(doc) {
  let tr = document.createElement("tr");
  tr.setAttribute('data-id', doc.id);
  // cells
  let namecell = document.createElement("td")
  let linkcell = document.createElement("td")
  let shortcutcell = document.createElement("td");
  let tagcell = document.createElement("td");
  let deletecell = document.createElement("td");
  let editcell = document.createElement("td");
  //content
  let name = document.createElement("h1")
  let data = document.createElement("a");
  let shortcut = document.createElement("p")
  let tag = document.createElement("div")
  let cross = document.createElement('button');
  let edit = document.createElement('button');
  let editIcon = document.createElement('img')
  name.textContent = doc.data().name;
  data.href = doc.data().data;
  data.textContent = doc.data().data;
  shortcut.textContent = doc.data().shortcut;
  tag.textContent = doc.data().tag;
  if (doc.data().tag == "BOps") {
    tag.className = "tag-table bops"
  } else if (doc.data().tag == "Nav") {
    tag.className = "tag-table nav"
  } else if (doc.data().tag == "Mech") {
    tag.className = "tag-table mech"
  } else {
    tag.className = "tag-table"
  }
  cross.textContent = 'x';
  editIcon.src = "edit.svg"

  deletecell.className = "icon"
  editcell.className = "icon"
  //add it all together
  edit.append(editIcon)
  namecell.appendChild(name);
  linkcell.appendChild(data);
  shortcutcell.appendChild(shortcut)
  tagcell.appendChild(tag);
  deletecell.appendChild(cross);
  editcell.appendChild(edit);

  tr.appendChild(namecell);
  tr.appendChild(shortcutcell);
  tr.appendChild(linkcell);
  tr.appendChild(tagcell);
  tr.appendChild(deletecell);
  tr.appendChild(editcell);
  list.appendChild(tr);

  //deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    db.collection('links').doc(id).delete();
  });

  edit.addEventListener('click', (e) => {
    e.stopPropagation;
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    displayModal(id);
  })
}

//filtering and displaying data
function filterSelection(tag) {
  list.innerHTML = "";
  makeActive(tag);
  if (tag == "all") {
    db.collection('links').orderBy('name')
      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type == 'added') {
            renderLink(change.doc);
          } else if (change.type == "removed") {
            let li = list.querySelector('[data-id =' + change.doc.id + ']');
            list.removeChild(li);
          }
        })
      })
  }
  else {
    db.collection('links').where('tag', '==', tag).orderBy('name').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type == 'added') {
          renderLink(change.doc);
        } else if (change.type == "removed") {
          let li = list.querySelector('[data-id =' + change.doc.id + ']');
          list.removeChild(li);
        }
      })
    })
  }
}

//saving data
form.addEventListener('submit', (e) => {
  catchUser();
  e.preventDefault();
  lookBeforeYouLeap("add", "shortcut", form.shortcut.value);
})

//updating data
updateForm.addEventListener('submit', (e) => {
  catchUser();
  e.preventDefault();
  lookBeforeYouLeap("update", "shortcut", form.shortcut.value);
})

//display all
window.onload = filterSelection('all');