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
  User_Name = localStorage.getItem("user_name");
  Room_Name = localStorage.getItem("Room_Name");

function send(){
      msg = document.getElementById("msg").value;   
      firebase.database().ref("/"+Room_Name).push({
            Name: User_Name, 
            Message: msg,
            Like: 0
      });
      document.getElementById("msg").innerHTML = "";
}

function getData() { 
      firebase.database().ref("/"+Room_Name).on('value', function(snapshot) {
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) { 
                  childKey  = childSnapshot.key; 
                  childData = childSnapshot.val(); 
                  if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         Name = message_data['Name'];
         Message = message_data['Message'];
         Like = message_data['Like'];
         
         var Name_with_tag = "<h4>"+Name+"</h4>";
         var Message_with_tag = "<h4 class='Msg_h4'>"+Message+"</h4>";
         var Like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+Like+" onclick='Update_Like(this.id);'>";
         var Span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+Like+"</span></button><hr>";
         var row = Name_with_tag + Message_with_tag + Like_button + Span_with_tag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function Update_Like(Msg_Id){
      console.log("CLicked"+Msg_Id);
      Button_Id = Msg_Id;
      Like = document.getElementById(Button_Id).value;
      Updated_Likes = Number(Like) + 1;
      console.log(Updated_Likes);
      firebase.database().ref("/"+Room_Name).child(Msg_Id).update({
            Like: Updated_Likes
      });
}

function Back(){
      localStorage.removeItem("User_Name");
      localStorage.removeItem("Room_Clicked");
      window.location = "AChat.html";
}