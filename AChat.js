function LogIn(){
    var name = document.getElementById("Name").value;
    localStorage.setItem("user_name", name);
    window.location = "Room.html";
}
