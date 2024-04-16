var flag = 1;
function testPrint(){
  if(flag == 1){
    document.getElementById("test").innerHTML = "WHAT!";
    flag = 0;
  }else{
    document.getElementById("test").innerHTML = "TESTING WORKS!!";
    flag = 1;
  }
}

document.getElementById('taskButtonAdd').addEventListener('click', newTask)

function newTask(){
  const inputTask = document.getElementById('taskInputAdd').value;

  var li = document.createElement('li');
  var t = document.createTextNode(inputTask);
  li.appendChild(t);

  document.getElementById('list').appendChild(li);
}