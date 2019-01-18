$(document).ready(function () {
  
    var dica = []

    var novoTitulo = ""
    var novoTag = ""
    var novoDesc = ""
    var novoImagem = ""

    // se já existir mail em localStorage
    if (getDica()) {
        dica = getDica();
    };

    //IR BUSCAR O URL DA IMAGEM   

    $("#btnUpload").click(function () {

        var imagem = "";

        if (!$('#filechooser')[0].files[0]) {
            $("#txtErro").html("Escolha o seu arquivo!").css("color", "rgb(233, 177, 177)");
        } else {
            $("#txtErro").html("");
            var file = $('#filechooser')[0].files[0];
            console.log($('#filechooser')[0].files[0])

            formData = new FormData();
            formData.append("access_token", "d3098cc89ee2e49d5a31aac86cf6cf5d224697395a22ddf665549d692f34702a");
            formData.append("imagedata", file);




            $.ajax({
                type: "post",
                url: "https://upload.gyazo.com/api/upload",
                data: formData,
                processData: false,
                contentType: false,
            })
                .done(function (json) {
                    console.log(json)
                    imagem = json.url
                    novaDica(imagem);
                })

                .fail(function (xhr, status, errorThrown) {
                    console.log("Erro: " + errorThrown);
                    console.log("Estado: " + status);
                    console.dir(xhr);
                })
        }






    });

    function novaDica(imagem) {
        if ($("#txtTitulo").val() == "" || $("#txtAreaDesc").val() == "") {
            $("#txtErro").html("Preencha os campos!!").css("color", "rgb(233, 177, 177)");
        } else {


            // ir buscar os dados
            Date.prototype.yyyymmdd = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() é zero-based
                var dd = this.getDate().toString();
            };

            var date = new Date();
            var novoTitulo = $("#txtTitulo").val();
            var novoTag = $("#selectTag").val();
            var novoDesc = $("#txtAreaDesc").val();
            var novoImagem = imagem;

            var novaDica = {
                data: date,
                titulo: novoTitulo,
                tag: novoTag,
                desc: novoDesc,
                imagem: novoImagem
            }

            console.log(novaDica);

            dica.push(novaDica);
            saveDica();

            $("#txtErro").html("Publicado com sucesso!").css("color", "white");
        }
    }

    function saveDica() {
        localStorage.setItem("dica", JSON.stringify(dica));
        console.log(JSON.parse(localStorage.getItem("dica")));
    }

    function getDica() {
        if (localStorage.getItem("dica")) {
            return JSON.parse(localStorage.getItem("dica"));
        }
        else {
            return false;
        };
    }


    //VAI BUSCAR A INFORMAÇÃO DE LOCAL STORAGE E COLA NA PAGINA (ULTIMAS MENSAGENS RECEBIDAS FICAM NO INICIO)-------
    var dicas = JSON.parse(localStorage.getItem('dica'));
    console.log("working...");
    if (dicas) {
        for (i = 0; i < dicas.length; i++) {

            $("ol").prepend(
                "<li>"
                + "<div class='row'>"
                + "<div class='col-md'>"
                + "<p>"
                + dicas[i].data
                + "</p>"
                + "<p style='font-size:20pt'>"
                + dicas[i].titulo
                + "</p>"
                + "<p><strong>tag: #</strong>"
                + dicas[i].tag
                + "</p>"
                + "</div>"
                + "</div>"
                + "<div class='row'>"

                + "<div class=col-md>"
                + "<img src="
                + dicas[i].imagem
                + " alt='imagem' id='imgDica' style='float:left; max-width:360px;max-height:350px; margin-right:5px'/>"
                + "</div>"
                + "<div class=col-md-7>"
                + "<text id='descDica' style='float:left;padding-right:40px;'>"
                + dicas[i].desc
                + "</text>"
                + "</div>"
                + "</div>"
                + "</li>"
                + "<br>"
                + "<hr>"
                + "<br>"

            );
            $(".list-group").prepend(
                "<button type='button' style='color:black' id='deleteMess_" + i + "' class='list-group-item list-group-item-action'>"
                + dicas[i].titulo
                + "</button>"
            )

            console.log(dicas[i].data)
        }
        
    $(".list-group-item").click(function () {
            // Obtém o índice alojado como sufixo no id do botão
            var pos = this.id.indexOf("_") + 1;
            var i = this.id.substr(pos, pos + 1);
            // Remove do array
            dicas.splice(i, 1);
            
            // Guarda o novo array no localStorage
            localStorage.setItem("dica", JSON.stringify(dicas));
            console.log(pos)
            window.location.reload();       
        })

        $("#img1").append(
            "<img src="
            + dicas[0].imagem
            + " alt='slide' class='d-block img-fluid w-100'>"
            + "<div class='carousel-caption'>"
            + "<h3>"
            + dicas[0].titulo
            + "</h3>"
            + "</div>"
        );
        $("#img2").append(
            "<img src="
            + dicas[1].imagem
            + " alt='slide' class='d-block img-fluid w-100'>"
            + "<div class='carousel-caption'>"
            + "<h3>"
            + dicas[1].titulo
            + "</h3>"
            + "</div>"
        );
        $("#img3").append(
            "<img src="
            + dicas[2].imagem
            + " alt='slide' class='d-block img-fluid w-100'>"
            + "<div class='carousel-caption'>"
            + "<h3>"
            + dicas[2].titulo
            + "</h3>"
            + "</div>"
        );
    }
    $(".list-group-item").hover(function(){
        $(this).css("color", "red");
        }, function(){
        $(this).css("color", "black");
    });


});