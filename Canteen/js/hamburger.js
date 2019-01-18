$(document).ready(function () {
    $("#hamburger").click(function () {
        $("#navbar2SupportedContent").slideToggle("slow", function () {
            $("#hamburger").hide();
            $(".cross").removeAttr("hidden");
        })
    })

    $(".cross").click(function () {
        $("#navbar2SupportedContent").slideToggle("slow", function () {
            $(".cross").attr("hidden",true);
            // $(".cross").hide();
            $("#hamburger").show();
        });
    });
});