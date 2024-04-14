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