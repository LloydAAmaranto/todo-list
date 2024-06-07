document.getElementById('taskButtonAdd').addEventListener('click', newTask)

//creates the new textbox
function newTask(){

  //create a new container for the new task
  var textboxDiv = document.createElement("div");
  textboxDiv.classList.add("textboxDiv");

  //creates a new textarea
  var textbox = document.createElement("textarea");
  textbox.classList.add("textbox");

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

  var firstChild = taskContainer.firstChild;

  var br = document.createElement("br");
  taskContainer.insertBefore(br, firstChild);
  taskContainer.insertBefore(textboxDiv, firstChild);


  //inserts the text from the search bar into the new textbox
  var text = document.getElementById("taskInputAdd").value;
  textbox.value = text;

  //make the textbox un-editable
  textbox.disabled = true;

  //clears the search bar after entering in a task
  document.getElementById("taskInputAdd").value = "";
}
