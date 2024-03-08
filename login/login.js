  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  import { push,set,getDatabase,ref,onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB8gKh_uQ1xDaCieJ4Wj39F0LNHYxrB2MU",
    authDomain: "todo-app-63254.firebaseapp.com",
    databaseURL: "https://todo-app-63254-default-rtdb.firebaseio.com",
    projectId: "todo-app-63254",
    storageBucket: "todo-app-63254.appspot.com",
    messagingSenderId: "1030413978948",
    appId: "1:1030413978948:web:0242713d4cd12c34a09b11"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
  const auth = getAuth();

  let userName = document.getElementById("userName");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let model ={};

  window.signUp = function(e){
    e.preventDefault()
    model.email = email.value;
    model.password = password.value
    console.log(model);

    signInWithEmailAndPassword (auth,model.email,model.password)
    .then(function(res){
        console.log(res.user.uid, "successfull Login");
        window.location.assign("../todoapp/todo.html")
        model.id = res.user.uid;
        let refrence = ref(database ,`user/ ${model.id}`);
        onValue(refrence,function(user){
            console.log(user.val());
        })
        
    email.value = ""
    password.value = ""
    })
    .catch(function(err){
        console.log(err.message)
      })
  }
