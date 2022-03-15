var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
    // console.log(event);
    event.preventDefault(); // prevents the browser from refreshing after submitting the form
    var listItemEl = document.createElement("li"); // creates the <li> html element
    listItemEl.className = "task-item"; // assigns the class task-item to the <li> element
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl); // adds the li element to the #tasks-to-do <ul> 
}

formEl.addEventListener("submit", createTaskHandler);
// submit event is also called onsubmit in certain documentation

