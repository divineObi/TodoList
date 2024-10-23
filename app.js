const todoScreen = document.querySelector('.text-field');
const newTodo = document.querySelector('.task-text-field');
const addButton = document.querySelector('.addButton');
const list = document.querySelector('.task-container');
const todoList = [];
let itemCount = 0;

//function to add an item to the list and then render it.
addButton.addEventListener('click', ()=>{
    if (todoScreen.value.trim() === '') {
        alert("Task cannot be empty, please enter a valid task");
        return;
    }
    todoList.push({
        text : todoScreen.value,
        id : itemCount
    });
    renderList(); 
    itemCount++;
    todoScreen.value = ' ';
})

//function to render the list from the array
function renderList() {
    list.innerHTML = '';
    todoList.forEach((task, index)=>{
        const newItem = document.createElement('li');
        newItem.classList.add('main', 'mainList');
        const newItemCheckbox = document.createElement('input');
        newItemCheckbox.type = 'checkbox';
        newItemCheckbox.id = `checker-${index}`;
        newItemCheckbox.onclick = () => checkItem(index);
        newItem.appendChild(newItemCheckbox);
        const newItemDisplay = document.createElement('input');
        newItemDisplay.type = 'text';
        newItemDisplay.disabled = true;
        newItemDisplay.value = task.text;
        newItemDisplay.classList.add('task-text-field');
        newItem.appendChild(newItemDisplay);
        const container = document.createElement('div');
        container.classList.add('buttons');
        newItem.appendChild(container);
        const innerContainer = document.createElement('div');
        innerContainer.classList.add('twinButtons');
        container.appendChild(innerContainer);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => deleteItem(index);
        container.appendChild(deleteButton)
        const editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.innerHTML = 'Edit';
        editButton.onclick = () => editItem(index);
        innerContainer.appendChild(editButton);
        const saveButton = document.createElement('button');
        saveButton.classList.add('saveButton');
        saveButton.innerHTML = 'Save';
        innerContainer.appendChild(saveButton);
        saveButton.style.display = 'none';
        saveButton.onclick = () => saveItem(index);

        list.appendChild(newItem);

         setTimeout(() => {
            newItem.classList.add('visible');
        }, 120);  
    });
}



// Function to remove an item from the array and re-render the list
function deleteItem(index) {
    todoList.splice(index, 1);  
    renderList();  
}

//Function to edit an item in the array and re-render the list.
function editItem(index) {
    const allItems = document.querySelectorAll('li.main');
    const selectedItem = allItems[index];

   
    const editButton = selectedItem.querySelector('.editButton');
    const saveButton = selectedItem.querySelector('.saveButton');
    const newItemDisplay = selectedItem.querySelector('.task-text-field');

   
    editButton.style.display = 'none';  
    saveButton.style.display = 'block';  
    newItemDisplay.disabled = false;    
}

function saveItem(index) {
    const allItems = document.querySelectorAll('li.main');
    const selectedItem = allItems[index];
   
    const editButton = selectedItem.querySelector('.editButton');
    const saveButton = selectedItem.querySelector('.saveButton');
    const newItemDisplay = selectedItem.querySelector('.task-text-field');

    if (newItemDisplay.value.trim() === '') {
        alert("Task cannot be empty, please enter a valid task");
        return;
    }

    todoList[index].text = newItemDisplay.value;
    newItemDisplay.disabled = true; 
    saveButton.style.display = 'none';  
    editButton.style.display = 'block'; 
}


function checkItem(index) {
    const allItems = document.querySelectorAll('li.main');
    const selectedItem = allItems[index];

    const newItemCheckbox = selectedItem.querySelector('input[type = "checkbox"]');
    const newItemDisplay = selectedItem.querySelector('.task-text-field');
    if (newItemCheckbox.checked == true) {
        newItemDisplay.style.textDecoration = 'line-through';
    } else {
        newItemDisplay.style.textDecoration = 'none';
    }
}