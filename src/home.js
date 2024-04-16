document.getElementById('taskButtonAdd').addEventListener('click', newTask)

// function newTask(){
//   const inputTask = document.getElementById('taskInputAdd').value;

//   var li = document.createElement('li');
//   var t = document.createTextNode(inputTask);
//   li.appendChild(t);

//   document.getElementById('list').appendChild(li);
//   document.getElementById('taskInputAdd').value = '';
// }

function newTask(){
  const inputTask = document.getElementById('taskInputAdd').value;

  var textarea = document.createElement('textarea');
  var t = document.createTextNode(inputTask);
  textarea.appendChild(t);

  document.getElementById('task-list').appendChild(textarea);
  document.getElementById('taskInputAdd').value='';
}