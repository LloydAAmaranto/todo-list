toggleLogin = 0;

//ability to close the login popup by clicking on the "login" button
function openLogin() {
  if(!toggleLogin){
    document.getElementById("login").style.display = "block";
    toggleLogin = 1;
  }
  else{
    document.getElementById("login").style.display = "none";
    toggleLogin = 0;
  }
}

//ability to close the login popup by clicking the "X" button
function closeLogin() {
  document.getElementById("login").style.display = "none";
  toggleLogin = 0;
}
