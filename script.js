let todos = [];
let taskButton = document.getElementById("button");
let taskInput = document.getElementById("text");
let container = document.getElementById('todo-list');
let numberOfTodo = document.getElementById("todo-number");
const clearBtn = document.getElementById('clearBtn');
const activeBtn = document.getElementById('activeBtn');
const completedBtn = document.getElementById('completedBtn');
const allBtn = document.getElementById('allBtn');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const body = document.body;

function addTodo(event) {
  event.preventDefault();

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  if (completedBtn.classList.contains("active")) {
    alert("Cannot add a new todo when Completed filter is active.");
    return;
  }

  let todo = taskInput.value;
  todos.push(todo);

  let todoContent = document.createElement("div");
  todoContent.className = "task";
  todoContent.innerHTML = `
    <input type="checkbox" class="todo-check">
    <li class="todo-li">
      <span class="list-content">${todo}</span>
      <button class="todo-button">Delete</button>
    </li>
  `;

  const deleteButton = todoContent.querySelector(".todo-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoContent);
  });

  const checkbox = todoContent.querySelector(".todo-check");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      todoContent.style.display = "none";
    } else {
      todoContent.style.display = "flex";
    }
    countTodo();
  });

  todoContent.setAttribute("data-todo", todo);

  container.appendChild(todoContent);
  taskInput.value = "";

  if (allBtn.classList.contains("active")) {
    showAllTodos();
  } else if (activeBtn.classList.contains("active")) {
    showActiveTodos();
  }

  countTodo();
}

countTodo(); 

function deleteTodoItem(todoItem) {
  const index = Array.from(container.children).indexOf(todoItem);
  todos.splice(index, 1);
  container.removeChild(todoItem);
  countTodo();
}

function clearTodos() {
  todos = []; 
  container.innerHTML = ""; 
  countTodo(); 
}

function showCompletedTodos() {
  completedBtn.classList.add("active");
  activeBtn.classList.remove("active");
  allBtn.classList.remove("active");
  
  const allTodoItems = container.querySelectorAll(".task");
  allTodoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector(".todo-check");
    if (checkbox.checked) {
      todoItem.style.display = "flex";
    } else {
      todoItem.style.display = "none";
    }
  });
  countTodo();
}

function showActiveTodos() {
  activeBtn.classList.add("active");
  completedBtn.classList.remove("active");
  allBtn.classList.remove("active");
  
  const allTodoItems = container.querySelectorAll(".task");
  allTodoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector(".todo-check");
    if (checkbox.checked) {
      todoItem.style.display = "none";
    } else {
      todoItem.style.display = "flex";
    }
  });
  countTodo();
}

function showAllTodos() {
  allBtn.classList.add("active");
  activeBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  
  const allTodoItems = container.querySelectorAll(".task");
  allTodoItems.forEach((todoItem) => {
    todoItem.style.display = "flex";
  });
  countTodo();
}

function toggleMode() {
  body.classList.toggle("light-mode");
}

function countTodo() {
  const selectedAction = getSelectedAction();
  let count = 0;

  if (selectedAction === "active") {
    count = getActiveTodos().length;
  } else if (selectedAction === "complete") {
    count = getCompletedTodos().length;
  } else {
    count = todos.length;
  }

  numberOfTodo.innerText = count + " " + (count === 1 ? "item left" : "items left");
}

function getActiveTodos() {
  return todos.filter((todo) => {
    const todoItem = container.querySelector(`[data-todo="${todo}"]`);
    const checkbox = todoItem.querySelector(".todo-check");
    return !checkbox.checked;
  });
}

function getCompletedTodos() {
  return todos.filter((todo) => {
    const todoItem = container.querySelector(`[data-todo="${todo}"]`);
    const checkbox = todoItem.querySelector(".todo-check");
    return checkbox.checked;
  });
}

function getSelectedAction() {
  if (activeBtn.classList.contains("active")) {
    return "active";
  } else if (completedBtn.classList.contains("active")) {
    return "complete";
  } else {
    return "all";
  }
}

taskButton.addEventListener("click", addTodo);
clearBtn.addEventListener("click", clearTodos);
completedBtn.addEventListener("click", showCompletedTodos);
activeBtn.addEventListener("click", showActiveTodos);
allBtn.addEventListener("click", showAllTodos);
toggleModeBtn.addEventListener("click", toggleMode);
