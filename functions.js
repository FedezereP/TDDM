window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(template, page, params) {
  //var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  //content.load(page)
  //  .then(menu.close.bind(menu));
  var nav = document.getElementById("nav");
  nav.options = {animation:"lift",animationOptions:{duration: 1}};
  menu.close();
  for(i=0;i<nav.pages.length;i++){
    if(nav.pages[i]["id"] == page){
        nav.bringPageTop(i,params);
        return;
    }
  }
  nav.pushPage(template, params);
};

function crear_listado_productos(respuesta){
    $("#l_listado").empty();
    var item = "";
    $.each(respuesta, function (k, producto) {
        item = '<ons-list-item modifier="chevron longdivider" tappable tap-background-color="#3ED47A"\
         class="listado_productos" data-id="'+ producto._id + '"><div class="left"><img class="list-item__thumbnail"\
             src="'+ producto.photo + '"></div>\
        <div class="center">\
        <span class="list-item__title">'+ producto.name + '</span>\
        <span class="list-item__subtitle">'+ producto.description + '</span>\
        <span class="list-item__subtitle">$ '+ producto.price + '</span>\
        <span class="list-item__subtitle">Stock en '+ producto.branches.length + ' sucursales</span>\
        </div>\
        </ons-list-item>';
        $("#l_listado").append(item);
    });

}



ons.ready(function () {
    $(document).on("offline",function(){
        ons.notification.toast("No hay Internet!", {"timeout":3000});
        //vibrar
        navigator.vibrate(3000);
    });
    
    $(document).on("online", function(){
        tipo_conexion = navigator.connection.type;
        ons.notification.toast("Hay Internet! "+tipo_conexion, {"timeout":3000});
    });

    $("#ojitoSi").hide();

    $("#btn_iniciar").on("click", function () {

        $("#ojitoSi").hide();
        var ema = $("#l_email").val();
        var pwd = $("#l_password").val();

        var recordar = document.getElementById("recordar");
        
        try {
            if (!ema) {
                throw "Ingrese email para continuar";

            }
            if (!pwd) {
                throw "Ingrese contrase&ntilde;a para continuar";
            }

            // Invocar API POST usuario
            datos = { "email": ema, "password": pwd };

            $("#cargando").show();
            $.ajax({
                url: "https://tiendanatural2020.herokuapp.com/api/user/login",
                type: "POST",
                dateType: "json",
                data: datos,
                success: function (respuesta) {

                    var usuario = respuesta;

                    // ejemplo del ejercicio q mando pero ni idea como seguir dsp en el otro
                    if (recordar.checked) {
                        localStorage.setItem("usuario", usuario);
                    } else {
                        sessionStorage.setItem("usuario", usuario);
                    }    

                    sessionStorage.setItem("usr", usuario);
                    var nav = document.getElementById("nav");
                    nav.pushPage("t_productos");
                },

                error: function (xml, err, status) {
                    ons.notification.toast(xml.responseJSON.name, { "timeout": 3000 });
                },
                complete:function()   {
                    $("#cargando").hide();
                }               
            });

        } catch (e) {
            ons.notification.toast(e, { "timeout": 3000 });
        }

    });

    $(document).on("click", "#ojito", function () {
        var x = document.getElementById("l_password");
        if (x.type === "password") {
            x.type = "text";
            $("#ojito").hide();
            $("#ojitoSi").show();
        } else {
            x.type = "password";
        }
    });

    $(document).on("click", "#ojitoSi", function () {
        var x = document.getElementById("l_password");
        if (x.type === "text") {
            x.type = "password";
            $("#ojito").show();
            $("#ojitoSi").hide();
        } else {
            x.type = "password";
        }
    });

    $("#btn_registrar").on("click", function () {
        
        var nav = document.getElementById("nav");
        nav.pushPage("t_registro");

    });

    /*$("#btn_logout").on("click", function () {
        //elimino session
        sessionStorage.clear();
        //elimino localstorage
        localStorage.clear();
        //muestro mensaje y redirecciono hacia login
        ons.notification.toast("Sesi&oacute;n ha finalizado correctamte", {timeout:3000});
        fn.load("t_inicio", "p_inicio");
        
    });*/

    $(document).on("click", "#btn_logout", function () {
        //elimino session
        sessionStorage.clear();
        //elimino localstorage
        localStorage.clear();
        //muestro mensaje y redirecciono hacia login
        ons.notification.toast("Sesi&oacute;n ha finalizado correctamte", {timeout:3000});
        fn.load("t_inicio", "p_inicio");
    });
    


    // $("#btn_registrarme").on("click", function () {
    //     var ema = $("#email").val();
    //     var pwd = $("#password").val();

    //     try {
    //         if (!ema) {
    //             throw "Ingrese email para continuar";
    //         }
    //         if (!pwd) {
    //             throw "Ingrese contrase&ntilde;a para continuar";
    //         }

    //         // Invocar API POST usuario
    //         datos = { "email": ema, "password": pwd };

    //         $.ajax({
    //             url: "https://tiendanatural2020.herokuapp.com/api/user/register",
    //             type: "POST",
    //             dateType: "json",
    //             data: datos,
    //             success: function (respuesta) {
    //                 ons.notification.toast("El usuario se registro correctamente", { "timeout": 3000 });

    //                 var usuario = respuesta;
    //                 sessionStorage.setItem("usr", usuario);
    //                 var nav = document.getElementById("nav");
    //                 nav.pushPage("t_productos");
    //             },

    //             error: function (xml, err, status) {
    //                 if (xml.responseJSON.data) {
    //                     ons.notification.toast(xml.responseJSON.data.error.errors.email.message, { "timeout": 3000 });
    //                 } else {
    //                     ons.notification.toast(xml.responseJSON.reason, { "timeout": 3000 });
    //                 }
    //             }
    //         });

    //     } catch (e) {
    //         ons.notification.toast(e, { "timeout": 3000 });
    //     }
    // }); 



});