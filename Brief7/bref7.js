document.getElementById("add").addEventListener("click", (e) => {
  ajouter();
  if (arr.length != 6) {
    e.preventDefault();
  } else {
    id++;
    arrvalue.push(`<a href="#" id="edite${id}" onclick = "edit(this)" class="btn btn-warning btn-sm edit">Edit</a>
    <a href="#" onclick="supprimer(this)" id="delete${id}" class="btn btn-danger btn-sm delete">Delete</a>`);
    save();
    clearFields();
  }
});
let arr = [];
let id = 0;
let arrvalue = [];
function ajouter() {
  Namex();
  marquex();
  prixx();
  date();
  var selectproduit = document.getElementById("produit").value;
  var radio = document.getElementsByName("inlineRadioOptions");

  let radiovalue;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radiovalue = radio[i].value;
    }
  }

  if (selectproduit == "") {
    document.getElementById("selectOblig").innerHTML =
      "* tu dois choisir un option";
    document.getElementById("selectOblig").style.color = "red";
  } else {
    document.getElementById("selectOblig").innerHTML = "";
    arr.push(true);
    arrvalue.push(selectproduit);
  }
  if (!radio[0].checked && !radio[1].checked) {
    document.getElementById("radioOblig").innerHTML =
      "* tu dois choisir un seul option";
    document.getElementById("radioOblig").style.color = "red";
  } else {
    document.getElementById("radioOblig").innerHTML = "";
    arr.push(true);
    arrvalue.push(radiovalue);
  }
}

function Namex() {
  var nom = document.getElementById("Nom");
  if (nom.value == "") {
    document.getElementById("NomOblig").innerHTML = "* le nom est obligatoire";
    document.getElementById("NomOblig").style.color = "red";
  } else {
    document.getElementById("NomOblig").innerHTML = "";
    arr.push(true);
    arrvalue.push(nom.value);
  }
}
function date() {
  var date = document.getElementById("Date");
  if (date.value == "") {
    document.getElementById("Date").innerHTML = "* Choisir une date";
    document.getElementById("Date").style.color = "red";
  } else {
    document.getElementById("Date").innerHTML = "";
    arr.push(true);
    arrvalue.push(date.value);
  }
}

function marquex() {
  var marque = document.getElementById("Marque");
  if (marque.value == "") {
    document.getElementById("MarqueOblig").innerHTML =
      "* la Marque est obligatoire";
    document.getElementById("MarqueOblig").style.color = "red";
  } else {
    document.getElementById("MarqueOblig").innerHTML = "";
    arr.push(true);
    arrvalue.push(marque.value);
  }
}

function prixx() {
  var prix = document.getElementById("Prix");

  if (prix.value == "") {
    document.getElementById("PrixOblig").innerHTML =
      "* le Prix est obligatoire";
    document.getElementById("PrixOblig").style.color = "red";
  } else {
    document.getElementById("PrixOblig").innerHTML = "";
    arr.push(true);
    arrvalue.push(prix.value);
  }
}

// Save //
function save() {
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr" + id);
  document.getElementById("tbl").appendChild(tr);
  for (let i = 0; i < arrvalue.length; i++) {
    let td = document.createElement("td");
    td.setAttribute("id", "td" + id + i);
    document.getElementById("tr" + id).appendChild(td);
    document.getElementById("td" + id + i).innerHTML = arrvalue[i];
  }
}
// Clear All Fields
function clearFields() {
  document.getElementById("Nom").value = "";
  document.getElementById("Marque").value = "";
  document.getElementById("Date").value = "";
  document.getElementById("Prix").value = "";
  document.getElementById("produit").value = "";
  let radio = document.getElementsByName("inlineRadioOptions");
  for (let i = 0; i < radio.length; i++) {
    radio[i].checked = false;
  }
  arr = [];
  arrvalue = [];
}
/////// Modal/////
function modal() {
  document.getElementById("modal").style.display = "grid";
}
document.getElementById("annuler").onclick = function () {
  document.getElementById("modal").style.display = "none";
};
function supprimer(sup) {
  modal();
  document.getElementById("supprimer").onclick = function () {
    sup.closest("tr").remove();
    document.getElementById("modal").style.display = "none";
  };
}
//////// Edit //////////

function edit(edit) {
  let edite = document.getElementById("edit");
  let add = document.getElementById("add");
  edite.style.display = "block";
  add.style.display = "none";
  let table = edit.closest("tr");
  let tdata = table.querySelectorAll("td");
  let tabledata = [];
  let inputdata = [];
  tdata.forEach((element) => tabledata.push(element.innerHTML));
  let input = document.querySelectorAll("form input,select");
  input.forEach((element) => inputdata.push(element));
  for (let i = 0; i < tabledata.length - 2; i++) {
    inputdata[i].value = tabledata[i];
  }
  edite.onclick = function () {
    ajouter();
    if (arr.length != 6) {
      e.preventDefault();
    } else {
      for (let i = 0; i < arrvalue.length; i++) {
        tdata[i].innerHTML = arrvalue[i];
      }
      clearFields();
      edite.style.display = "none";
      add.style.display = "block";
    }
  };
}
