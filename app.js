const form = document.getElementById('formulario');
const nameInput = document.getElementById('name');
const commitInput= document.getElementById('commit');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event){
    event.preventDefault();
    const name = nameInput.value;
    const commit = commitInput.value;

    if (name && commit){
        const newData = {name,commit};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('Se necesita una entrada de texto valida')
    }
})

function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data))
}

function renderTable(){
    tableBody.innerHTML ="";

    data.forEach(function (item, index){
         const row = document.createElement('tr');
         const nameCell = document.createElement('td')
         const commitCell = document.createElement('td')
         const actionCell = document.createElement('td')
         const editButton = document.createElement('button');
         const deleteButton = document.createElement('button');


         nameCell.textContent = item.name;
         commitCell.textContent = item.commit;
         editButton.textContent = 'Editar';
         deleteButton.textContent = 'Borrar';


         editButton.classList.add('button', 'button--secondary')
         deleteButton.classList.add('button', 'button--tertiary')

         
         editButton.addEventListener('click',function(){

            editData(index);
         })

         deleteButton.addEventListener('click',function(){

            deleteData(index);
         })



         actionCell.appendChild(editButton);
         actionCell.appendChild(deleteButton);
         

         


         row.appendChild(nameCell);
         row.appendChild(commitCell);
         row.appendChild(actionCell);

         tableBody.appendChild(row);
    })
}

function editData(index){
    const item = data[index];
     nameInput.value = item.name;
     commitInput.value = item.commit;
     data.splice(index, 1);
     saveDataToLocalStorage();
     renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();