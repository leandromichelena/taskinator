var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    // console.log(event);
    event.preventDefault(); // prevents the browser from refreshing after submitting the form
    // creates the taskNameInput variable and stores the value of the <input> element
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // creates the taskTypeInput variable and stores the value of the <select> element
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); // creates the <li> html element
    listItemEl.className = "task-item"; // assigns the class task-item to the <li> element

    // create <div> to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"; // assigns the class task-info to the <div> element
    // add HTML content to <div> // the innerHTML property accepts HTML tags while the textContent would convert it to text
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); // adds the <div> element defined above to the <li> element

    tasksToDoEl.appendChild(listItemEl); // adds the <li> element to the #tasks-to-do <ul> 
}

formEl.addEventListener("submit", taskFormHandler);
// submit event is also called onsubmit in certain documentation

