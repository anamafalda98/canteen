$(document).ready(function () {

    var message = []

    var novoNome = ""
    var novoEmail = ""
    var novoAssunto = ""
    var novoDesc = ""

    //se já existir mail em localStorage
    if (getMessage()) {
        message = getMessage();
    };

    $("#btnEmailTo").click(function (e) {

        if ($("#txtNome").val() == '' || $("#txtEmail").val() == '' || $("#txtAssunto").val() == '' || $("#txtDesc").val() == '') {
            $("#txtEnviado").html("Preencha os campos!!").css("color", "rgb(233, 177, 177)");
        } else {
            // ir buscar os dados
            Date.prototype.yyyymmdd = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() é zero-based
                var dd = this.getDate().toString();
            };

            var date = new Date();
            var novoNome = $("#txtNome").val();
            var novoEmail = $("#txtEmail").val();
            var novoAssunto = $("#txtAssunto").val();
            var novoDesc = $("#txtDesc").val();

            var novoMail = {
                data: date,
                nome: novoNome,
                email: novoEmail,
                assunto: novoAssunto,
                desc: novoDesc,
            }

            console.log(novoMail);

            message.push(novoMail);
            saveMessage();

            $("#txtEnviado").html("Mensagem enviada com sucesso!").css("color", "white");
        }


    });

    function saveMessage() {
        localStorage.setItem("mensagem", JSON.stringify(message));
        console.log(JSON.parse(localStorage.getItem("mensagem")));
    }

    function getMessage() {
        if (localStorage.getItem("mensagem")) {
            return JSON.parse(localStorage.getItem("mensagem"));
        }
        else {
            return false;
        };
    }

    //VAI BUSCAR A INFORMAÇÃO DE LOCAL STORAGE E COLA NA PAGINA (ULTIMAS MENSAGENS RECEBIDAS FICAM NO INICIO)-------
    var info = JSON.parse(localStorage.getItem('mensagem'));
    console.log("working...");
    if (info) {
        for (let i = 0; i < info.length; i++) {

            $("ol").prepend(
                "<li>"
                + "<p>"
                + info[i].data
                + "</p>"
                + "<h6><strong>Nome: </strong></h6>"
                + "<p>"
                + info[i].nome
                + "</p>"
                + "<h6><strong>E-mail: </strong></h6>"
                + "<p>"
                + info[i].email
                + "</p>"
                + "<h6><strong>Assunto: </strong></h6>"
                + "<p>"
                + info[i].assunto
                + "</p>"
                + "<h6><strong>Descrição: </strong></h6>"
                + "<p>"
                + info[i].desc
                + "</p>"
                + "<a class='btn btn-danger m-2' id='deleteMess_" + i + "' style='float:right'><i class='fa fa-times'></i> Apagar</a>"
                + "<a class='btn btn-info m-2' id='respMess_" + i + "' style='float:right'><i class='fa fa-envelope'></i> Responder</a>"
                + "</li>"
                + "<br><br>"
                + "<hr>"
            );
            console.log(info[i].data)
            //quando carrefar no botao apagar, ele apaga a mensagem selecionada
        }

    }
    $(".btn-danger").click(function () {
        console.log($(this).attr("id"));
        // Obtém o índice alojado como sufixo no id do botão
        var pos = this.id.indexOf("_") + 1;
        var i = this.id.substr(pos, pos + 1);
        // Remove do array
        info.splice(i, 1);
        console.log(i)
        // Guarda o novo array no localStorage
        localStorage.setItem("mensagem", JSON.stringify(info));
        window.location.reload();
    })
    $('.btn-info').click(function () {
        // Obtém o índice alojado como sufixo no id do botão
        console.log("working...mail")
        var pos = this.id.indexOf("_") + 1;
        var i = this.id.substr(pos, pos + 1);

        var body_message = info[i].desc;
        var email = info[i].email;
        var subject = info[i].assunto;

        var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

        win = window.open(mailto_link, 'emailWindow');


        
        if (win && win.open && !win.closed) win.close();
    })

    

    //----------------------------------------------------------------
});


