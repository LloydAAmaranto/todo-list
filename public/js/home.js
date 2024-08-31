document.getElementById('taskButtonAdd').addEventListener('click', newTask);
// Reloads the page after a new task is added so that it will be displayed
document.getElementById('taskButtonAdd').addEventListener('click', function(){
    window.location.reload();
});

// Create the new task and send it to the server
function newTask() {
    var text = document.getElementById("taskInputAdd").value;
    var email = document.getElementById("userEmail").value;  // Retrieve email from hidden input

    if (!text) {
        alert('Please enter a task.');
        return;
    }

    fetch('/api/add-to-current-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email, 
            newTask: text
        }),
    })
}


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
          var textboxDiv = document.createElement("div");
          textboxDiv.classList.add("textboxDiv");

          //creates a new textarea
          var textbox = document.createElement("textarea");
          textbox.classList.add("textbox");

          textbox.value = task;

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

          //makes thetextbox uneditable
          buttonDone.addEventListener("click", function(){
            textbox.disabled = true;
          });

          //makes the textbox editable
          buttonEdit.addEventListener("click", function(){
            textbox.disabled = false;
          });

          //makes it so that if the delete button is clicked on a specific task, that will be deleted
          buttonDelete.addEventListener("click", function(){
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

// Call displayAllTasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
  displayAllTasks();
});
