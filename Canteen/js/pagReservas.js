$(document).ready(function() {
    
    
    //variáveis para inserção de dados

    var semanaAtual = [];       //variável com as opçoes da semana
    var semanaAnterior = [];    //variável para semana anterior
    var semanaSeguinte = [];    //variável para a semana seguinte
    var uploading = false;      //variável para saber se estamos a fazer upload de imagens
    var seFecho = false;        //variável para saber se se está no período entre dia de fecho de votações e dia de update
    var seUpdated = false;      //var para saber se já se fez atualiozação neste dia
    var email = sessionStorage.getItem("auth"); 
    var imagens = new Array();

    const POS_CARNE = 0;        //const para posição da carne nas semanas
    const POS_PEIXE = 1;        //const para posição do peixe nas semanas
    const POS_VEGGIE = 2;       //const para posição da vegetariana nas semanas
    const POS_DIETA = 3;        //const para posição da dieta as semanas
    const POS_VOTADORES = 4;    //const para posição dos votadores na semana
    const POS_RESERVAS = 3;     //const para posição das reservas

    //consts para intervalo em que votações fecham e update que passa a semana seguinte para semana atual
    const DIA_UPDATE = 2;       //const para dia de update, 2 é terça feira
    const DIA_FECHO = 6;        //const para dia de fecho

    function saveState(){
        console.log("Ao guardar: " + seUpdated + "|" + seFecho)
        localStorage.setItem("seUpdated", JSON.stringify(seUpdated));
        localStorage.setItem("seFecho", JSON.stringify(seFecho));
    }

    function getState(){
        seUpdated = JSON.parse(localStorage.getItem("seUpdated"))
        seFecho = JSON.parse(localStorage.getItem("seFecho"))
        console.log(seUpdated + "|" + seFecho)
    }
    getState();
    
    //prototipo actualizar semanas
    function handleDiaDeSemana(){
        var day = new Date();
        day = day.getDay();

        if(day>=DIA_FECHO || day<DIA_UPDATE)            console.log("não se pode votar!"), seFecho = true, seUpdated = false;
        else if(day==DIA_UPDATE && seUpdated==false)    console.log("dia para fazer update!"), updateSemanas(), seUpdated  = true, seFecho=false;
        else if (day>DIA_UPDATE && day<DIA_FECHO)       console.log("nada de especial!"), seUpdated = false, seFecho = false;
        console.log("Ao verificar que dias são: " + seUpdated + "|" + seFecho)
        
        getSemanas();

        saveState();
    }   
    

    //buscar url para uso geral
    var url = location.pathname.split("/").slice(-1);

    //se estamos na página de reservas, atualizar conteúdo
    if (url[0]=="pagReservas.html"){
        fillReservas();
        console.log("if sucesso")
        somarReservas();
    }

    //função para somar e apresentar reservas
    function somarReservas(){

        if(!getSemana("semanaAtual")) {
            alert("Não existe registo para mostrar!")
            return;
        }

        reservasCarne = 0;
        reservasPeixe = 0;
        reservasVeggie = 0;
        reservasDieta = 0;
        

        for (var x = 0; x < semanaAtual[0][3].length; x++) {
            reservasCarne += parseInt(semanaAtual[0][3][x].nPessoasReserva);
        }

        for (var x = 0; x < semanaAtual[1][3].length; x++) {
            reservasPeixe += parseInt(semanaAtual[1][3][x].nPessoasReserva);
        }

        for (var x = 0; x < semanaAtual[2][3].length; x++) {
            reservasVeggie += parseInt(semanaAtual[2][3][x].nPessoasReserva);
        }

        for (var x = 0; x < semanaAtual[3][3].length; x++) {
            reservasDieta += parseInt(semanaAtual[3][3][x].nPessoasReserva) ;
        }

        $("#tdCarne").html(reservasCarne);
        $("#tdPeixe").html(reservasPeixe);
        $("#tdVeggie").html(reservasVeggie);
        $("#tdDieta").html(reservasDieta);


    }

    //função para encher reservas
    function fillReservas(){

        getSemanas();

        if(!getSemana("semanaAtual")) {
            alert("Não existe registo para mostrar! Vai ser usado conteúdo por defeito!")
            return;
        }


        $("#txtCarne1").html(semanaAtual[0][0].nome);
        if (semanaAtual[0][0].foto)$(".cardVote_circle").css("background-image", "url(" + semanaAtual[0][0].foto + ")");
        $("#txtCarne2").html(semanaAtual[0][1].nome);
        if (semanaAtual[0][1].foto) $(".cardVote_circle1").css("background-image", "url(" + semanaAtual[0][1].foto + ")");
        $("#txtCarne3").html(semanaAtual[0][2].nome);
        if (semanaAtual[0][2].foto) $(".cardVote_circle2").css("background-image", "url(" + semanaAtual[0][2].foto + ")");

        $("#txtPeixe1").html(semanaAtual[1][0].nome);
        if (semanaAtual[1][0].foto) $(".cardVote_circle3").css("background-image", "url(" + semanaAtual[1][0].foto + ")");
        $("#txtPeixe2").html(semanaAtual[1][1].nome);
        if (semanaAtual[1][1].foto) $(".cardVote_circle4").css("background-image", "url(" + semanaAtual[1][1].foto + ")");
        $("#txtPeixe3").html(semanaAtual[1][2].nome);
        if (semanaAtual[1][2].foto) $(".cardVote_circle5").css("background-image", "url(" + semanaAtual[1][2].foto + ")");

        $("#txtVeggie1").html(semanaAtual[2][0].nome);
        if (semanaAtual[2][0].foto) $(".cardVote_circle6").css("background-image", "url(" + semanaAtual[2][0].foto + ")");
        $("#txtVeggie2").html(semanaAtual[2][1].nome);
        if (semanaAtual[2][1].foto) $(".cardVote_circle7").css("background-image", "url(" + semanaAtual[2][1].foto + ")");
        $("#txtVeggie3").html(semanaAtual[2][2].nome);
        if (semanaAtual[2][2].foto) $(".cardVote_circle8").css("background-image", "url(" + semanaAtual[2][2].foto + ")");

        $("#txtDieta1").html(semanaAtual[3][0].nome);
        if (semanaAtual[3][0].foto) $(".cardVote_circle9").css("background-image", "url(" + semanaAtual[3][0].foto + ")");
        $("#txtDieta2").html(semanaAtual[3][1].nome);
        if (semanaAtual[3][1].foto) $(".cardVote_circle10").css("background-image", "url(" + semanaAtual[3][1].foto + ")");
        $("#txtDieta3").html(semanaAtual[3][2].nome);
        if (semanaAtual[0][2].foto) $(".cardVote_circle11").css("background-image", "url(" + semanaAtual[3][2].foto + ")");

        //se já votou nesta semana, trocar votar por votos!
        if (seVotador() || seFecho || email == '"admin@esmad.ipp.pt"'){
            fillVotos();
        }
        
        
    }

    //função para somar reservas
    $("#btnReservar").click(function () { 

        if(!getSemana("semanaAtual")) {
            alert("Não existe registo para guardar!")
            return;
        }

        var option = $("#slctPrato").val();
        var email = JSON.parse(sessionStorage.getItem("auth"));
        var nPessoas = $("#slctNumero").val();

        var reserva = {
            emailReserva:  email,
            nPessoasReserva: nPessoas
        }
        console.log(reserva)

        //switch que escolhe onde adicionar as reservas
        //atenção:
        //quando se passa um array vazio para localStorage, ao fazer o JSON.parse() não vai voltar como array, mas null/0
        //o que é um stress porque queremos poder fazer push a uma cena que era array antes de guardar e deste lado já não é
        //por isso é preciso verificar se tal e tal == 0, porque é assim que aparece se ainda não for array
        //Array.from() transforma-o num array, e depois já podemos usar push!
        switch (option){
            case "carne":
                if (semanaAtual[POS_CARNE][POS_RESERVAS] == 0) {
                    semanaAtual[POS_CARNE][POS_RESERVAS] = Array.from(semanaAtual[POS_CARNE][POS_RESERVAS]);
                }
                semanaAtual[POS_CARNE][POS_RESERVAS].push(reserva);
                break;
            case "peixe":
            if (semanaAtual[POS_PEIXE][POS_RESERVAS] == 0) {
                semanaAtual[POS_PEIXE][POS_RESERVAS] = Array.from(semanaAtual[POS_PEIXE][POS_RESERVAS]);
            }
                semanaAtual[POS_PEIXE][POS_RESERVAS].push(reserva);
                break;
            case "veggie":
            if (semanaAtual[POS_VEGGIE][POS_RESERVAS] == 0) {
                semanaAtual[POS_VEGGIE][POS_RESERVAS] = Array.from(semanaAtual[POS_VEGGIE][POS_RESERVAS]);
            }
                semanaAtual[POS_VEGGIE][POS_RESERVAS].push(reserva);
                break;
            case "dieta":
            if (semanaAtual[POS_DIETA][POS_RESERVAS] == 0) {
                semanaAtual[POS_DIETA][POS_RESERVAS] = Array.from(semanaAtual[POS_DIETA][POS_RESERVAS]);
            }
                semanaAtual[POS_DIETA][POS_RESERVAS].push(reserva);
                break;

        }

        saveSemanaAtual();
        
    });

    //função para votar, esta função acontece sempre que um input button é clicado, e muda a ação dependendo do seu id!
    $("a.cta").click(function () {

        if(!getSemana("semanaAtual")) {
            alert("Não existe registo para votar!")
            return;
        }


        var btnVoto = false; //esta va é para termos a certeza que carregamos num botão para votar!
        var id = $(this).attr("id");
        console.log(id)

        //se já votou, não votar mais!
        if (seVotador()){
            return;
        }

        //se é admin, não votar!
        
        if (email == '"admin@esmad.ipp.pt"') {
            return;
        }

        //se é dia de fecho, não votar!
        if(seFecho){
            return;
        }

        //switch para descobrir qual o botão que foi clicado por id!
        switch(id) {
            case "btnCarne1":
                semanaAtual[0][0].votos++;
                btnVoto = true;
                break;
            case "btnCarne2":
                semanaAtual[0][1].votos++;
                btnVoto = true;
                break;
            case "btnCarne3":
                semanaAtual[0][2].votos++;
                btnVoto = true;
                break;

            case "btnPeixe1":
                semanaAtual[1][0].votos++;
                btnVoto = true;
                break;
            case "btnPeixe2":
                semanaAtual[1][1].votos++;
                btnVoto = true;
                break;
            case "btnPeixe3":
                semanaAtual[1][2].votos++;
                btnVoto = true;
                break;

            case "btnVeggie1":
                semanaAtual[2][0].votos++;
                btnVoto = true;
                
                break;
            case "btnVeggie2":
                semanaAtual[2][1].votos++;
                btnVoto = true;
                break;
            case "btnVeggie3":
                semanaAtual[2][2].votos++;
                btnVoto = true;
                break;

            case "btnDieta1":
                semanaAtual[3][0].votos++;
                btnVoto = true;
                break;
            case "btnDieta2":
                semanaAtual[3][1].votos++;
                btnVoto = true;
                break;
            case "btnDieta3":
                semanaAtual[3][2].votos++;
                btnVoto = true;
                break;

        }

        //só fazer estas cenas se tivermos carregado num botão de votar!
        //!!!
        if(btnVoto) addVotador(), saveSemanaAtual(), fillVotos(), console.log("btnVoto");


    });

    //função para prêencher votos
    function fillVotos(){

        $("#btnCarne1").html(semanaAtual[POS_CARNE][0].votos + " votos");
        $("#btnCarne2").html(semanaAtual[POS_CARNE][1].votos + " votos");
        $("#btnCarne3").html(semanaAtual[POS_CARNE][2].votos + " votos");

        $("#btnPeixe1").html(semanaAtual[POS_PEIXE][0].votos + " votos");
        $("#btnPeixe2").html(semanaAtual[POS_PEIXE][1].votos + " votos");
        $("#btnPeixe3").html(semanaAtual[POS_PEIXE][2].votos + " votos");

        $("#btnVeggie1").html(semanaAtual[POS_VEGGIE][0].votos + " votos");
        $("#btnVeggie2").html(semanaAtual[POS_VEGGIE][1].votos + " votos");
        $("#btnVeggie3").html(semanaAtual[POS_VEGGIE][2].votos + " votos");

        $("#btnDieta1").html(semanaAtual[POS_DIETA][0].votos + " votos");
        $("#btnDieta2").html(semanaAtual[POS_DIETA][1].votos + " votos");
        $("#btnDieta3").html(semanaAtual[POS_DIETA][2].votos + " votos");
    }

    //buscar semanas ao carreguar página
    function getSemanas(){
        if(JSON.parse(localStorage.getItem("semanaAtual")))     semanaAtual = JSON.parse(localStorage.getItem("semanaAtual")), console.log("semanaAtual sucesso");
        if(JSON.parse(localStorage.getItem("semanaAnterior")))  semanaAnterior = JSON.parse(localStorage.getItem("semanaAnterior")), console.log("semanaAnterior sucesso");
        if(JSON.parse(localStorage.getItem("semanaSeguinte")))  semanaSeguinte = JSON.parse(localStorage.getItem("semanaSeguinte")), console.log("semanaSeguinte sucesso");
    }

    getSemanas();
    handleDiaDeSemana();

    //function avançar semanas
    function updateSemanas(){
        
        if(!getSemana("semanaSeguinte")){
            alert("Não há semana para atualizar!");
            return;
        }

        if(seUpdated){
            alert("já se atualizou!")
            return;
        }

        semanaAnterior=semanaAtual;
        semanaAtual=semanaSeguinte;
        semanaSeguinte=[];
        saveAllSemanas()

        getSemanas();
        
    }

    //evento para guardar
    $("#adicionarOpcoes").click(function(){
        adicionarSemana()
    });

    //função para guarantir que só se pode votar uma vez
    //não sei como se chama a algúem que vota..... votante? Eleitor? Sei lá
    function addVotador(){
        semanaAtual[4].push(sessionStorage.getItem("auth"))
        console.log("sucesso");
    }

    //desligar uplpoad de imagens
    //recebe true para disable, false para enable
    function disableUploadImagens(disable){
        if(disable){
            $("button").each(function(){
                $(this).attr("disabled", true)
                console.log($(this).attr("disabled"))
            })}

        else{
            $("button").each(function(){
                $(this).prop("disabled", false)
                console.log($(this).attr("disabled"))
            })
        }
    }

    //função para fazer upload de imagens
    function uploadImage(file, position, id){
        var img = file;
        
        
        formData = new FormData();
        formData.append("access_token", "d3098cc89ee2e49d5a31aac86cf6cf5d224697395a22ddf665549d692f34702a");
        formData.append("imagedata", img);
        

        $.ajax({
            type: "post",
            url: "https://upload.gyazo.com/api/upload",
            data: formData,
            processData: false,
            contentType: false
        })
        .done(function(json){
            imagens[position] = json.url;
            disableUploadImagens(false);
            uploading = false;
            $(id).html(img.name)
        })

        .fail(function(xhr, status, errorThrown){
            console.log("Erro: " + errorThrown);
            console.log("Estado: " + status);
            console.dir(xhr);
            disableUploadImagens(false);
        })
    }

    //função para pedir o upload de imagens
    $(function (){
        $("input[type='file']").change(function () { 

            var imgID = $(this).attr("id")
            var id = "#btn" + imgID.slice(3);
            console.log(id);

            switch(imgID){
                case "imgCarne1":
                disableUploadImagens(true);
                uploadImage($('#imgCarne1')[0].files[0], 0, id)
                uploading = true;          
                break;
            case "imgCarne2":
                disableUploadImagens(true);
                uploadImage($('#imgCarne2')[0].files[0], 1, id)
                uploading = true;
                break;
            case "imgCarne3":
                disableUploadImagens(true);
                uploadImage($('#imgCarne3')[0].files[0], 2, id)
                uploading = true;   
                break;

            case "imgPeixe1":
                disableUploadImagens(true);
                uploadImage($('#imgPeixe1')[0].files[0], 3, id)
                uploading = true;   
                break;
            case "imgPeixe2":
                disableUploadImagens(true);
                uploadImage($('#imgPeixe2')[0].files[0], 4, id)
                uploading = true;   
                    break;
            case "imgPeixe3":
                disableUploadImagens(true);
                uploadImage($('#imgPeixe3')[0].files[0], 5, id)
                uploading = true;   
                    break;

            case "imgVeggie1":
                disableUploadImagens(true);
                uploadImage($('#imgVeggie1')[0].files[0], 6, id)
                uploading = true;   
                    
                break;
            case "imgVeggie2":
                disableUploadImagens(true);
                uploadImage($('#imgVeggie2')[0].files[0], 7, id)
                uploading = true;   
                    break;
            case "imgVeggie3":
                disableUploadImagens(true);
                uploadImage($('#imgVeggie3')[0].files[0], 8, id)
                uploading = true;   
                break;

            case "imgDieta1":
                disableUploadImagens(true);
                uploadImage($('#imgDieta1')[0].files[0], 9, id)
                uploading = true;   
                break;
            case "imgDieta2":
                disableUploadImagens(true);
                uploadImage($('#imgDieta2')[0].files[0], 10, id)
                uploading = true;   
                break;
            case "imgDieta3":
                disableUploadImagens(true);
                uploadImage($('#imgDieta3')[0].files[0], 11, id)
                uploading = true;   
            }
            
        });
    })

    //função para adicionar opções a semana
    function addOpcoes(){

        //validar
        if (!$("#txtCarne1").val()
        || !$("#txtCarne2").val()
        || !$("#txtCarne3").val()
        || !$("#txtPeixe1").val()
        || !$("#txtPeixe2").val()
        || !$("#txtPeixe3").val()
        || !$("#txtVeggie1").val()
        || !$("#txtVeggie2").val()
        || !$("#txtVeggie3").val()
        || !$("#txtDieta1").val()
        || !$("#txtDieta2").val()
        || !$("#txtDieta3").val())  
        {
            alert("Todos os campos têm de estar prêenchidos!")
            return false;
        }


        var reservas = new Array();

        //inserir
        var carne1 = {
            nome:$("#txtCarne1").val(),
            votos: 0,
            foto: imagens[0]
        }

        var carne2 = {
            nome:$("#txtCarne2").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[1]
        }

        var carne3 = {
            nome:$("#txtCarne3").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[2]
        }

        var carne = new Array();
        carne.push(carne1, carne2, carne3, reservas);

        var peixe1 = {
            nome:$("#txtPeixe1").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[3]
        }

        var peixe2 = {
            nome:$("#txtPeixe2").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[4]
        }

        var peixe3 = {
            nome:$("#txtPeixe3").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[5]
        }

        var peixe = new Array();
        peixe.push(peixe1, peixe2, peixe3, reservas);

        var veggie1 = {
            nome:$("#txtVeggie1").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[6]
        }

        var veggie2 = {
            nome:$("#txtVeggie2").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[7]
        }

        var veggie3 = {
            nome:$("#txtVeggie3").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[8]
        }

        var veggie = new Array();
        veggie.push(veggie1, veggie2, veggie3, reservas);

        var dieta1 = {
            nome:$("#txtDieta1").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[9]
        }

        var dieta2 = {
            nome:$("#txtDieta2").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[10]
        }

        var dieta3 = {
            nome:$("#txtDieta3").val(), //buscar nome da opção
            votos: 0,
            foto: imagens[11]
        }

        var dieta = new Array();
        dieta.push(dieta1, dieta2, dieta3, reservas);

        var novaSemana = new Array();
        novaSemana[POS_CARNE] = carne;
        novaSemana[POS_PEIXE] = peixe;
        novaSemana[POS_VEGGIE] = veggie;
        novaSemana[POS_DIETA] = dieta;
        novaSemana[4] = [];

        console.log(novaSemana);
        return novaSemana;

    }

    // funcão para procurar o email de auth nos que já votaram
    function seVotador(){
        
        votou = false;
        
        if(!getSemana("semanaAtual")) return;

        for (var x = 0; x < semanaAtual[4].length; x++) {
            if (semanaAtual[4][x] == sessionStorage.getItem("auth")){
                votou = true;
            }
        }
        
        return votou;
    }

    //ao adicionar semana
    function adicionarSemana(){
        semanaSeguinte = addOpcoes();
        if(semanaSeguinte) saveSemanaSeguinte();
    }

    //guardar em localstorage
    function saveSemanaAtual(){
        localStorage.setItem("semanaAtual", JSON.stringify(semanaAtual));
        console.log("semana atual gravada");
        console.log(JSON.parse(localStorage.getItem("semanaAtual")))
    }

    //gravar semana seguinte
    function saveSemanaSeguinte(){
        localStorage.setItem("semanaSeguinte", JSON.stringify(semanaSeguinte));
    }

    //gravar semana antiga
    function saveSemanaAnterior(){
        localStorage.setItem("semanaAnterior", JSON.stringify(semanaAnterior));
    }

    //função apra gravar todas as semanas
    function saveAllSemanas(){
        saveSemanaAnterior();
        saveSemanaAtual();
        saveSemanaSeguinte();
    }

    //ao carregar página
    //opções podem ser:
    //semanaAtual
    //semanaSeguinte
    //semanaAnterior
    function getSemana(opt){
        var semana = "";
        if(localStorage.getItem(opt)) {
            semana = JSON.parse(localStorage.getItem(opt));
        }
        else {
            semana = false;
        };

        return semana;
    }

    //mudar cards e cores ao carregar nos botões
    $("#btnCarne").click(function() {
        $('#cardCarne').removeAttr("hidden");
        $("#cardPeixe").attr("hidden", true);
        $('#cardVeggie').attr("hidden", true);
        $('#cardDieta').attr("hidden", true);
        $(".cardVote").css("background-color", "#C82333");
        // $(".cardVote:hover h2").css("background", "#C82333");
        
    });

    $("#btnPeixe").click(function() {
        $('#cardCarne').attr("hidden", true);
        $("#cardPeixe").removeAttr("hidden");
        $('#cardVeggie').attr("hidden", true);
        $('#cardDieta').attr("hidden", true);
        $(".cardVote").css("background-color", "#17A2B8");
        // $(".cardVote:hover h2").css("background", "#17A2B8");
    });

    $("#btnVeggie").click(function() {
        $('#cardCarne').attr("hidden", true);
        $("#cardPeixe").attr("hidden", true);
        $('#cardVeggie').removeAttr("hidden");
        $('#cardDieta').attr("hidden", true);
        $(".cardVote").css("background-color", "#28A745");
    });

    $("#btnDieta").click(function() {
        $('#cardCarne').attr("hidden", true);
        $("#cardPeixe").attr("hidden", true);
        $('#cardVeggie').attr("hidden", true);
        $('#cardDieta').removeAttr("hidden");
        $(".cardVote").css("background-color", "#E0A800");
    });
});


