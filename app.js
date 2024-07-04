// script.js
document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById('inp');
    let todoList = document.getElementById('todo-list');
    let progressList = document.getElementById('progress-list');
    let doneList = document.getElementById('done-list');
    var existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = "";
        for(var i = 0; i < existingTodos.length; i++) {
            todoList.innerHTML += `
                <li draggable="true" class="task-item">
                    ${existingTodos[i].todoItem}
                    <button onclick="deleteTodo(${i})" class="delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </li>
            `;
        }
    }

    window.Add = function() {
        if (input.value === "") {
            Swal.fire({
                icon: "error",
                title: "Please Enter a Task",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else {
            var newTodoItem = input.value;
            input.value = "";
            existingTodos.push({
                todoItem: newTodoItem,
            });
            localStorage.setItem('todos', JSON.stringify(existingTodos));
            renderTodos(); // Render the updated list
        }
    }

    window.deleteTodo = function(index) {
        existingTodos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(existingTodos));
        renderTodos(); // Render the updated list after deletion
    }

    // Initial rendering of todos
    renderTodos();

    // Initialize SortableJS
    new Sortable(todoList, {
        group: 'shared',
        animation: 150,
        onAdd: function (evt) {
            evt.item.classList.remove('progress-item', 'done-item');
        },
        onEnd: function(evt) {
            saveState();
        }
    });

    new Sortable(progressList, {
        group: 'shared',
        animation: 150,
        onAdd: function (evt) {
            evt.item.classList.add('progress-item');
            evt.item.classList.remove('done-item');
        },
        onEnd: function(evt) {
            saveState();
        }
    });

    new Sortable(doneList, {
        group: 'shared',
        animation: 150,
        onAdd: function (evt) {
            evt.item.classList.add('done-item');
            evt.item.classList.remove('progress-item');
        },
        onEnd: function(evt) {
            saveState();
        }
    });

    function saveState() {
        let todoItems = Array.from(todoList.children).map(item => item.textContent.trim());
        let progressItems = Array.from(progressList.children).map(item => item.textContent.trim());
        let doneItems = Array.from(doneList.children).map(item => item.textContent.trim());

        localStorage.setItem('todos', JSON.stringify(todoItems));
        localStorage.setItem('progress', JSON.stringify(progressItems));
        localStorage.setItem('done', JSON.stringify(doneItems));
    }

    // Load saved state from local storage
    function loadState() {
        let savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        let savedProgress = JSON.parse(localStorage.getItem('progress')) || [];
        let savedDone = JSON.parse(localStorage.getItem('done')) || [];

        savedTodos.forEach(item => {
            todoList.innerHTML += `
                <li draggable="true" class="task-item">
                    ${item}
                    <button onclick="deleteTodo()" class="delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </li>
            `;
        });

        savedProgress.forEach(item => {
            progressList.innerHTML += `
                <li draggable="true" class="task-item progress-item">
                    ${item}
                </li>
            `;
        });

        savedDone.forEach(item => {
            doneList.innerHTML += `
                <li draggable="true" class="task-item done-item">
                    ${item}
                </li>
            `;
        });
    }

    // Load the initial state
    loadState();
});
var input = document.getElementById("inp");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});