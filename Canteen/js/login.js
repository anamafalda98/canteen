$(document).ready(function () {
    
     var login = []
 
     //para registar
     var novoEmail = ""
     var novaPassword = ""
     var novaPassword2 = ""
 
     //se já existir login em localStorage
     if(getLogin()) {
         login = getLogin();
     }
 
     //se não existirem users adicionar conta admin
     else {
         var admin = {
             email:"admin@esmad.ipp.pt",
             password:"admin"
         }
         login.push(admin)
         saveLogin();
     }
 
     //ao clicar, inicar validação e inserção
     $("#btnSubmit").click(function () { 
         novoEmail = $("#txtEmail").val();
         novaPassword = $("#txtPassword1").val();
         novaPassword2 = $("#txtPassword2").val();
         success = true;
         
         
         // validação
         // se já existe conta
         if (ifAccountExists(novoEmail)) {
             success = false;
             $("#txtErro1").text("*Já existe uma conta com este email.");
         }
         else {$("#txtErro1").text("");}
 
         //se passwords são differentes
         if (novaPassword!=novaPassword2){
             success = false;
             $("#txtPassword1").css("background-color", "#ff1a1a");
             $("#txtPassword2").css("background-color", "#ff1a1a");
             $("#txtErro2").text("As passwords são diferentes!");
         }
         else {$("#txtErro2").text("");}
 
         //se password é pequena demais
         if (novaPassword.length<6){
             success = false;
             $("#txtErro3").text("*A palavra-passe deve conter entre 6 a 10 símbolos.");
         }
         else {$("#txtErro3").text("");}
 
         //se emails não forem do campus 2
         if(novoEmail.indexOf("esmad.ipp.pt")==-1 && novoEmail.indexOf("esht.ipp.pt")==-1){
             sucess = false;
             $("#txtErro1").text("*Acesso restrito à comunidade Campus 2!");
             console.log(novoEmail.indexOf("esmad.ipp.pt")==-1)
             console.log(novoEmail.indexOf("esht.ipp.pt"))
         }
         
 
         //se passou toda a validação...
         if(success){

             //novo utilizador
             var novoUser ={
                 email: novoEmail,
                 password: novaPassword,
             }
             
             //quardar login em localstorage
             login.push(novoUser);
             saveLogin();

             //buscar a conta e passar-la sessionstorage
             var user = ifAccountExists(novoUser.email, novoUser.password);
             sessionStorage.setItem("auth", JSON.stringify(user))
     
             //load da próxima página
             window.location.href = "pagInicial.html"
             
         }
     });
 
     //ao tentar fazer login
     $("#btnEntrar").click(function (e) { 
         var email = $("#txtEmail").val();
         var password = $("#txtPassword").val();

         console.log(JSON.parse(localStorage.getItem("login")))
         
         //se existir a conta...
         if (ifAccountExists(email, password)) {
 
             //buscar a conta e passar-la sessionstorage
             var user = ifAccountExists(email, password);
             sessionStorage.setItem("auth", JSON.stringify(user))
     
             //load da próxima página
             window.location.href = "pagInicial.html"
         }
 
         else{
             alert("Esse utilizador não existe!")
         }
 
     });
     
     //função que devolve conta se já existir, se nãoe xistir devolve false
     function ifAccountExists(userEmail, userPassword){
         conta = ""
 
         for (var x = 0; x < login.length; x++) {
             if (login[x].email == userEmail && login[x].password == userPassword){
                 conta = login[x].email;
                 break; //ao primeiro que encontrar, sair do for para não perder tempo
             }
             else {                                                                                                                                                                                                             
                 conta = false;
             }
         }
 
         return conta;
     }
 
     //função que guarda em localstorage
     function saveLogin(){
         localStorage.setItem("login", JSON.stringify(login));
         console.log(JSON.parse(localStorage.getItem("login")));
     }
     
     //função que vai carrega login para memória
     function getLogin(){
         localLogin ="";
 
         if(localStorage.getItem("login")) {
             localLogin = JSON.parse(localStorage.getItem("login"));
         }
         else {
             localLogin = false;
         };
 
         return localLogin;
     }
 
 });
 
 

