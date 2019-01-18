$(document).ready(function () {

    //se não existir nada em local storage...
    if(!sessionStorage.getItem("auth")){
        window.location.href="pagLogin.html";
    }    

    //ir buscar o mail da pessoa que está logada!
    function getEmail(){
        var userEmail = sessionStorage.getItem("auth");
        return userEmail;
    }

    //função que retorna se user é admin
    function isAdmin(){
        var email = getEmail()
        if (email == '"admin@esmad.ipp.pt"') {
            return true
        }
        else{
            console.log(getEmail())
            return false;
        }
    }

    //função para logout
    $("#logout").click(function () { 
        sessionStorage.removeItem("auth")
        window.location.href="pagLogin.html"
        
    });

    //bloco para fazer mudanças de acordo com se admin our não
    if(!isAdmin()) {
        $("#navAdmin").attr("hidden", true);
        $("#reservaAdmin").attr("hidden", true);
        console.log("adfg")
    }
    else {
        $("#navAdmin").removeAttr("hidden");
        $("#reservaAluno").attr("hidden", true);
        console.log("qwerty")
    }
    
});