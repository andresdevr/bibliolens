$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

// Añade animación a la secciones 
$("section").addClass("wow fadeIn");

new WOW().init();