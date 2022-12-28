const tblProducts = document.querySelector("#tabx")
const inputName = document.querySelector("#inputName")
const inputMarque = document.querySelector("#inputMarque")
const inputPrix = document.querySelector("#inputPrix")
const inputDate = document.querySelector("#inputDate")
const selectTypeProduit = document.querySelector("#selectTypeProduit")
const radioPromotionOui = document.querySelector("#radioPromotionOui")
const radioPromotionNon = document.querySelector("#radioPromotionNon")
const modal = document.querySelector("#modal")

let listProducts = [];

function onSave(event) {
  event.preventDefault();

  if (isValidForm()) {
    listProducts.push({
      name: inputName.value,
      marque: inputMarque.value,
      prix: inputPrix.value,
      date: inputDate.value,
      typeProduit: selectTypeProduit.value,
      promotion: radioPromotionOui.checked ? 'Oui' : 'Non',
    })
  
    inputName.value = ''
    inputDate.value = ''
    inputMarque.value = ''
    inputPrix.value = ''
    selectTypeProduit.value = ''
    radioPromotionOui.checked = false;
    radioPromotionNon.checked = true;
  
    reRenderListProducts();
  }

}

function isValidForm() {
  if (inputName.value == '') {
    document.querySelector("#inputNameError").style.display =  'block';
    return false;
  } else {
    document.querySelector("#inputNameError").style.display =  'none';
  }
  
  if (inputMarque.value == '') {
    document.querySelector("#inputMarqueError").style.display =  'block';
    return false;
  } else {
    document.querySelector("#inputMarqueError").style.display =  'none';
  }

  if (inputPrix.value == '') {
    document.querySelector("#inputPrixError").style.display =  'block';
    return false;
  } else {
    document.querySelector("#inputPrixError").style.display =  'none';
  }

  if (inputDate.value == '') {
    document.querySelector("#inputDateError").style.display =  'block';
    return false;
  } else {
    document.querySelector("#inputDateError").style.display =  'none';
  }

  if (selectTypeProduit.value == '') {
    document.querySelector("#selectProduitError").style.display =  'block';
    return false;
  } else {
    document.querySelector("#selectProduitError").style.display =  'none';
  }

  return true;
}

function edit(elementIndex) {
  const [prodcut] = listProducts.splice(elementIndex, 1);

  inputName.value = prodcut.name
  inputDate.value = prodcut.date
  inputMarque.value = prodcut.marque
  inputPrix.value = prodcut.prix
  selectTypeProduit.value = prodcut.typeProduit
  radioPromotionOui.checked = prodcut.promotion === 'Oui';
  radioPromotionNon.checked = prodcut.promotion === 'Non';

  reRenderListProducts();
}

let elementToDeleteAfterConfirm;
function supprimer(elementIndex) {
  elementToDeleteAfterConfirm = elementIndex;
  modal.style.display = 'grid';
  return false;
}

function confirmDelete() {
  modal.style.display = 'none';
  listProducts.splice(elementToDeleteAfterConfirm, 1);

  reRenderListProducts();
}

function cancelDelete() {
  modal.style.display = 'none';
}

function createColumn(value) {
  var column = document.createElement('td');
  column.appendChild(document.createTextNode(value));
  return column;
}

function createButton(index, name, action, clazz) {
  var btn = document.createElement('a');
  btn.setAttribute('class', 'btn btn-sm ' + clazz);
  btn.setAttribute('onclick', action);
  btn.appendChild(document.createTextNode(name));
  return btn;
}

function reRenderListProducts() {
  const rows = listProducts.map((proudct, index) => {
    const row = document.createElement('tr');
    row.appendChild(createColumn(proudct.name));
    row.appendChild(createColumn(proudct.marque));
    row.appendChild(createColumn(proudct.prix));
    row.appendChild(createColumn(proudct.date));
    row.appendChild(createColumn(proudct.typeProduit));
    row.appendChild(createColumn(proudct.promotion));

    var btnColumn = document.createElement('td');
    btnColumn.appendChild(createButton(index, 'Edit', `return edit(${index})`, 'btn-warning'));
    btnColumn.appendChild(createButton(index, 'Delete', `return supprimer(${index})`, 'mx-2 btn-danger'));
    row.appendChild(btnColumn);

    return row;
  })

  tblProducts.replaceChildren(...rows)
}

reRenderListProducts();

