document.getElementById('taskButtonAdd').addEventListener('click', newTask)


function newTask(){
  var textbox = document.createElement("textarea");
  textbox.type = "text";
  textbox.classList.add("textbox");


  var taskContainer = document.getElementById("taskContainer");
  var firstChild = taskContainer.firstChild;

  var br = document.createElement("br");
  taskContainer.insertBefore(br, firstChild);

  taskContainer.insertBefore(textbox, firstChild);

  // var button = document.createElement("button");
  // taskContainer.insertBefore(button, button);

}
