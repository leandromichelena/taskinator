var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function (event) {
    // console.log(event);
    event.preventDefault(); // prevents the browser from refreshing after submitting the form
    // creates the taskNameInput variable and stores the value of the <input> element
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // creates the taskTypeInput variable and stores the value of the <select> element
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("Please fill out the task form.");
        return false;
    };

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    formEl.reset();

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); // creates the <li> html element
    listItemEl.className = "task-item"; // assigns the class task-item to the <li> element

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create <div> to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"; // assigns the class task-info to the <div> element
    // add HTML content to <div> // the innerHTML property accepts HTML tags while the textContent would convert it to text
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); // adds the <div> element defined above to the <li> element

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl); // adds the <li> element to the #tasks-to-do <ul>
    
    // increase task counter for next unique id
    taskIdCounter ++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Complete"];

    actionContainerEl.appendChild(statusSelectEl);

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
    
        // append to select dropdown
        statusSelectEl.appendChild(statusOptionEl);

    };


    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);
// submit event is also called onsubmit in certain documentation

