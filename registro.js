$(document).ready(function () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBUb1DD2a3W4dDxhM2uIBVesHb4wqksQSk",
      authDomain: "fir-demo-5ad62.firebaseapp.com",
      projectId: "fir-demo-5ad62",
      storageBucket: "fir-demo-5ad62.appspot.com",
      messagingSenderId: "327286699446",
      appId: "1:327286699446:web:6a3cadeadc391df6e23d17",
      measurementId: "G-0E0YDR4TQ1"
    };
  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
  
    // Inicializar Auth de Firebase
    const auth = firebase.auth();
  
    // Inicializar Auth de Google
    var provider = new firebase.auth.GoogleAuthProvider();
  
    // Inicializar Firestore (Base de datos)
    const db = firebase.firestore();
  
    // Rergistrar los usuarios
    // Si no esta registrado, debe hacer click en boton registrar
    $("#btnRegistro").click(function (e) {
      e.preventDefault();
      // Esto hará que el login desaparezca
      $("#login").hide();
      // Esto hara que el formulario de registro aparezca
      $(".registro-usuario").show();
    })
  
    $("#registrate").click(function (e) {
      $("#btnRegistroConEmail").removeClass("d-none");
      $("#registrateAviso").addClass("d-none");
      $("#btnRegistroConEmail").addClass("d-block");
      $("#btnIngresoConEmail").addClass("d-none");
      $("#btnIngresoGmail").addClass("d-none");
    })
  
    // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
    $("#btnRegistroConEmail").click(function (e) {
      e.preventDefault();
      // Capturamos los datos enviados por el formulario de registro
      // Campo email
      var email = $("#IngresoEmail").val();
      //Campo Password
      var password = $("#ingresoPassword").val();
      // Metodo de firebase que permite registro de usarios con email
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // limpiar formulario de registro
          $("#IngresoEmailForm").trigger("reset");
        })
        .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          // Muestro en la consola el codigo de error y el mensaje de error
          if (error.code == 'auth/email-already-in-use') {
            $("#alert-login-registro").removeClass("d-none");
            $("#alert-login-registro").addClass("d-block");
          }
        });
  
    })
    // Acceso de usuarios
    // Ingresar por email
    $("#btnIngresoEmail").click(function (e) {
      e.preventDefault();
      // Mostramos formulario de ingreso por email
      $("#IngresoEmail").show();
      // Ocultamos boton de ingreso por email
      $("#btnIngresoEmail").hide();
    })
  
    // Si ingresamos por correo y password mostramos formulario de ingreso 
    $("#btnIngresoConEmail").click(function (e) {
      e.preventDefault();
      // Capturamos los datos enviados por el formulario de ingreso
      // Campo email
      var email = $("#ingresoEmail").val();
      // Campo Password
      var password = $("#ingresoPassword").val();
      // Metodo que permite ingreso de usarios con email
      try {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredential => {
            // limpiar formualrio de ingreso
            $("#IngresoEmail").trigger("reset");
            $("#alert-login").hide();
            $("#alert-login-registro").hide();
          })
          .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
            var errorCode = error.code;
            var errorMessage = error.message;
            // Muestro en la consola el codigo de error y el mensaje de error
            console.log(errorCode, errorMessage);
          });
      } catch (error) {
        if (error.code == 'auth/argument-error') {
          $("#alert-login").removeClass("d-none");
          $("#alert-login").addClass("d-block");
        }
      }
  
    })
  
    // Ingresar con google
    $("#btnIngresoGmail").click(function (e) {
      e.preventDefault();
      auth.signInWithPopup(provider)
        .then(result => {
          console.log("Ingreso con Google");
        })
        .catch(err => {
          console.log(err);
        })
    })
})