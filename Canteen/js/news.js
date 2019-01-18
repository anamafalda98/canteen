$(document).ready(function () {
    var noticia = "";


    $("#btnUploadNoticia").click(function () { 
        if ($("#txtAreaDesc1").val() == "") {
            alert("Preencha os campos!!");
        } else {
            var noticia = $("#txtAreaDesc1").val();
            localStorage.setItem("noticia", JSON.stringify(noticia));   
            alert("Publicado com sucesso!")       
        }           
    });

    console.log(getNoticia());
    if(!getNoticia){
        return;
    }
    else{


        console.log($("#noticia2").text())
        
        $("#noticia2").html(getNoticia());
        
    }
    
    function getNoticia() {
        var resultado = false;
        if (localStorage.getItem("noticia")) {
            resultado =  JSON.parse(localStorage.getItem("noticia"));
        }

        return resultado;
    }
});