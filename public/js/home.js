document.getElementById('taskButtonAdd').addEventListener('click', function(){
    newTask();
});
// Reloads the page after a new task is added so that it will be displayed
document.getElementById('taskButtonAdd').addEventListener('click', function(){
    window.location.reload();
});


// Function to display all tasks
function displayAllTasks() {

  fetch('/api/tasks', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => response.json())
  .then(tasks => {

    console.log('Tasks retrieved successfully:', tasks);

    var taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = '';  // Clear existing tasks

    tasks.forEach(task => {
    console.log('Task: ', task);
    console.log('Task ID: ', task.id);

    var textboxDiv = document.createElement("div");
    textboxDiv.classList.add("textboxDiv");

    //creates a new textarea
    var textbox = document.createElement("textarea");
    textbox.classList.add("textbox");

    // Goes inside the task array and gets the actual String value
    textbox.value = task.task;

    textboxDiv.appendChild(textbox);

    //create a new container for the buttons
    var buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    //creates the the buttons
    var buttonDone = document.createElement("button");
    buttonDone.textContent = "Done";  
    var buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    var buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";

    //makes thetextbox uneditable and updates the textbox
    buttonDone.addEventListener("click", function(){
        textbox.disabled = true;
        // Updates the task 
        // updateTask(task.id, textbox.value);
    });

    //makes the textbox editable
    buttonEdit.addEventListener("click", function(){
        textbox.disabled = false;
    });

    //makes it so that if the delete button is clicked on a specific task, that will be deleted
    buttonDelete.addEventListener("click", function(){
        addToHistory(task.task, task.id);
        deleteTask(task.id);
        textboxDiv.remove();
    });

    buttonDiv.appendChild(buttonDone);
    buttonDiv.appendChild(buttonEdit);
    buttonDiv.appendChild(buttonDelete);

    textboxDiv.appendChild(textbox);
    textboxDiv.appendChild(buttonDiv);

    var taskContainer = document.getElementById("taskContainer");

    taskContainer.prepend(textboxDiv);

    //make the textbox un-editable
    textbox.disabled = true;
    });
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

// Create the new task and send it to the server
function newTask() {
    var text = document.getElementById("taskInputAdd").value;
    var email = document.getElementById("userEmail").value;  // Retrieve email from hidden input
    // const taskId = generateTaskId();
    if (!text) {
        alert('Please enter a task.');
        return;
    }
    
    const taskId = generateTaskId();

    fetch('/api/add-to-current-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email, 
            newTask: {
                id: taskId,
                task: text
            }
        })
    });
}
// Generates a random value
function generateTaskId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Gets the deleted task and puts it into history
function addToHistory(text, taskId){
    var email = document.getElementById("userEmail").value;

    fetch('/api/add-to-history-list', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            email: email,
            newTask: {
                id: taskId,
                task: text
            }
        })
    })
}

// Delete a task
function deleteTask(taskId) {
    var email = document.getElementById("userEmail").value; // Retrieve email from hidden input
    fetch(`/api/delete-task/${email}/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}



// Call displayAllTasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
  displayAllTasks();
});
