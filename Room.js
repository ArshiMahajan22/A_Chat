const firebaseConfig = {
      apiKey: "AIzaSyA3iJds0ulIvnzrON2coEO_jkxHRGWt9rk",
      authDomain: "a-chat-244a7.firebaseapp.com",
      databaseURL: "https://a-chat-244a7-default-rtdb.firebaseio.com",
      projectId: "a-chat-244a7",
      storageBucket: "a-chat-244a7.appspot.com",
      messagingSenderId: "256985752974",
      appId: "1:256985752974:web:e0b5a83a5542c82d1eb0df"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  User = localStorage.getItem("user_name");
  document.getElementById("welcome_user").innerHTML = "Welcome "+User+"!";

  function AddRoom(){
    Room_name = document.getElementById("Room").value;
    localStorage.setItem("Room_Name", Room_name);
    window.location = "Chat.html";
}

function getData(){
firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
            childKey  = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room Name - "+Room_names);
            var row = "<div class='room_name' id="+Room_names+" onclick='Redirect_to_Roomname(this.id);'>#"+Room_names+"</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
      });});}
getData();

function Redirect_to_Roomname(room){
console.log(room);
localStorage.setItem("room_clicked", room);
window.location = "Chat.html";
}

function Back(){
      localStorage.removeItem("User_Name");
      localStorage.removeItem("Room_Clicked");
      window.location = "Achat.html";
}