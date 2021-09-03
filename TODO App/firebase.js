const firebaseConfig = {
    apiKey: "AIzaSyC1qcQ7hP2eglMcmuVhtIrwbqtgtnhCs1A",
    authDomain: "todo-app-9bb6b.firebaseapp.com",
    projectId: "todo-app-9bb6b",
    storageBucket: "todo-app-9bb6b.appspot.com",
    messagingSenderId: "695737974249",
    appId: "1:695737974249:web:7c7b7ee016cd2017cf1f78",
    measurementId: "G-SEL5VNM3K3"
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();