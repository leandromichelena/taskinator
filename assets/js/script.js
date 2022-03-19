var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompleteEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasks = [];

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

    // if the form contains a data-task-id, it belongs to a task being edited
    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) { // if form has data attribute, get task id and call function to complete edit process
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else { // if form doesn't have data attribute, create object as normal and pass to createTaskEl function
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    };

    
    formEl.reset();
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

    // Recreates the loaded tasks in their appropriate columns after loading from localStorage
    switch (taskDataObj.status) {
        case "to do":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "in progress":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.append(listItemEl);
            break;
        case "completed":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompleteEl.append(listItemEl);
            break;
        default:
            console.log("Something went wrong!");
    }

    // creates an id property and adds to the taskDataObj
    taskDataObj.id = taskIdCounter;
    // add the taskDataObj to the tasks array (defined on the top)
    tasks.push(taskDataObj);

    // save array to the local storage
    saveTasks();

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

    var statusChoices = ["To Do", "In Progress", "Completed"];

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

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // Adds the contents of task name and type to the input form in the page header
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // changes the text content of the form button to save task
    document.querySelector("#save-task").textContent = "Save Task";
    
    // sets the data-task-id attribute to the form element during the editing 
    formEl.setAttribute("data-task-id", taskId);

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove(); 
    // the .remove() method will remove the task item <li> that parents the delete button 

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    };

    // save array to the local storage
    saveTasks();

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches (".edit-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);

    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    // save array to the local storage
    saveTasks();

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function(event) {
    // get the task's item id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // changes the list item to a new column 
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompleteEl.appendChild(taskSelected);
    }

    // update tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    };

    // save array to the local storage
    saveTasks();
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));    
}

var loadTasks = function(){
    // get from local storage 
    var savedTasks = localStorage.getItem("tasks");
    
    if (!savedTasks) {
        return false;
    }
    
    console.log("Loaded tasks successfully");
    // convert string back to array 
    savedTasks = JSON.parse(savedTasks);
    
    // iterate through the array to create tasks elements on the page
    for (i=0; i < savedTasks.length; i++){
        createTaskEl(savedTasks[i]);
        ;
    }
}

// submit event is also called onsubmit in certain documentation
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();