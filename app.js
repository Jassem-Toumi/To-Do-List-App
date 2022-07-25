//Selectors
const todo_input = document.querySelector('.todo-input')
const todo_btn = document.querySelector('.todo-btn')
const todo_list = document.querySelector('.todo-list')
const select = document.getElementById('select')
const filter_option = document.querySelector('.filter-todo')



//Event Listeners 

document.addEventListener('DOMContentLoaded', getTodos)
todo_btn.addEventListener('click', addTodo)

todo_list.addEventListener('click', deleteORCheck)

select.addEventListener('click', updateArrow)

filter_option.addEventListener('click', filterToDo)



// Functions
function addTodo (event){
    //Prevent default form submitting
    event.preventDefault();

    //Creaing The Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Create LI
    const newToDoLi = document.createElement('li')
    newToDoLi.innerText = todo_input.value;
    newToDoLi.classList.add('todo-item')
    todoDiv.appendChild(newToDoLi)

    // Add TODO  TO local storage
    saveLocalTodos(todo_input.value)
    //Check mark button
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedBtn.classList.add("complete-btn") 
    todoDiv.appendChild(completedBtn)

    //Trash mark button
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add("trash-btn") 
    todoDiv.appendChild(trashBtn)

    //Append the todoDiv to the main List
    todo_list.appendChild(todoDiv)

    // Clear todo input value
    todo_input.value = "";
    // CompletedTask();
}

function deleteORCheck (e){
    const Clicked_item = e.target;
    // Delete ToDo
    if(Clicked_item.classList[0] === "trash-btn"){
        let todo = Clicked_item.parentElement;
        removeLocalTodos (todo)
        removeDeletedDoneItems (todo)
        //Animation
        todo.classList.add('fall')
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    } 
    
    // Check Mark
    if (Clicked_item.classList[0] === "complete-btn"){
        let todo = Clicked_item.parentElement
        todo.classList.toggle("completed")
        CompletedTask(todo)
    }

}

function updateArrow(){
    const selectContainer = select.parentElement
    selectContainer.classList.toggle('updateArrow')

}

function filterToDo(e){
    const todos = document.querySelectorAll('.todo')
    let eValue = e.target.value;
     todos.forEach(function(todo){

         switch(eValue){
            case "all":
                 todo.style.display = "flex";
                 break;
            case "completed":
                     if(todo.classList.contains("completed")){
                         todo.style.display = "flex"
                     }else {
                         todo.style.display = "none"
                     } break;
            case "uncompleted":
                         if(!todo.classList.contains("completed")){
                            todo.style.display = "flex" 
                         } else {
                            todo.style.display = "none"
                        }             
         }
                 //  if(eValue === "all"){
        //     todo.style.display = "flex";
        //  } 
        //  if (eValue === "completed"){
        //     if(todo.classList.contains("completed")){
        //         todo.style.display = "flex"
        //     }else {
        //         todo.style.display = "none"
        //     }
        //  }
        //  if (eValue === "uncompleted"){
        //     if(!todo.classList.contains("completed")){
        //         todo.style.display = "flex"
        //     }else {
        //         todo.style.display = "none"
        //     }
        //  }

     })
}

// ==== Save Local Todos ====
function saveLocalTodos (todo){
    //Check if there is any todos written
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
        
    //Creaing The Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Create LI
    const newToDoLi = document.createElement('li')
    newToDoLi.innerText = todo;
    newToDoLi.classList.add('todo-item')
    todoDiv.appendChild(newToDoLi)

    //Check mark button
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedBtn.classList.add("complete-btn") 
    todoDiv.appendChild(completedBtn)

    //Trash mark button
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add("trash-btn") 
    todoDiv.appendChild(trashBtn)

    // Check if any Item in the server has a check mark
    
          let DoneItems
          if(localStorage.getItem('Donetodos') === null){
            DoneItems = []
          } else {
            DoneItems = JSON.parse(localStorage.getItem('Donetodos'))
            for (const element of DoneItems){
                if(todo === element){
                    todoDiv.classList.add("completed")
                }
            }
          }
         
        // console.log(DoneItems)

    //Append the todoDiv to the main List
    todo_list.appendChild(todoDiv)
    })
}


function removeLocalTodos (todo){
    let todos;
    //Check local Storage
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
    
 
}

function CompletedTask(todo){
    let Donetodos;
    //Check local Storage
    if(localStorage.getItem('Donetodos') === null){
        Donetodos = []
    } else {
        Donetodos = JSON.parse(localStorage.getItem('Donetodos'))
    }

    const DonetodoIndex = todo.children[0].innerText;
    Donetodos.push(DonetodoIndex);

    localStorage.setItem('Donetodos', JSON.stringify(Donetodos));
}


function removeDeletedDoneItems (todo){
        // Remove the stored todos with check mark on them 
        let Donetodos;
        if(localStorage.getItem('Donetodos') === null){
            Donetodos =  [] 
        } else {
            Donetodos = JSON.parse(localStorage.getItem('Donetodos'))
            ContentOfTodo = todo.children[0].innerText
            for (const items of Donetodos){
                if(ContentOfTodo === items){
                  Donetodos.splice(Donetodos.indexOf(ContentOfTodo), 1);
                  localStorage.setItem('Donetodos', JSON.stringify(Donetodos));
                }
            }
        } 
}



