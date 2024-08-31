togglePopUp = 0;

//ability to close the login popup by clicking on the "login" button
function openLogin() {
  if(!togglePopUp){
    document.getElementById("popUp").style.display = "block";
    togglePopUp = 1;
  }
  else{
    document.getElementById("popUp").style.display = "none";
    togglePopUp = 0;
  }
}

//ability to close the login popup by clicking the "X" button
function closeLogin() {
  document.getElementById("popUp").style.display = "none";
  togglePopUp = 0;
}
