ons.ready(function () {
    $("#btn_iniciar").on("click", function () {
        var ema = $("#l_email").val();
        var pwd = $("#l_password").val();
        
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

    $("#btn_registrar").on("click", function () {
        
        var nav = document.getElementById("nav");
        nav.pushPage("t_registro");

    });

    $("#btn_registrarme").on("click", function () {
        var ema = $("#email").val();
        var pwd = $("#password").val();

        try {
            if (!ema) {
                throw "Ingrese email para continuar";
            }
            if (!pwd) {
                throw "Ingrese contrase&ntilde;a para continuar";
            }

            // Invocar API POST usuario
            datos = { "email": ema, "password": pwd };

            $.ajax({
                url: "https://tiendanatural2020.herokuapp.com/api/user/register",
                type: "POST",
                dateType: "json",
                data: datos,
                success: function (respuesta) {
                    ons.notification.toast("El usuario se registro correctamente", { "timeout": 3000 });

                    var usuario = respuesta;
                    sessionStorage.setItem("usr", usuario);
                    var nav = document.getElementById("nav");
                    nav.pushPage("t_productos");
                },

                error: function (xml, err, status) {
                    if (xml.responseJSON.data) {
                        ons.notification.toast(xml.responseJSON.data.error.errors.email.message, { "timeout": 3000 });
                    } else {
                        ons.notification.toast(xml.responseJSON.reason, { "timeout": 3000 });
                    }
                }
            });

        } catch (e) {
            ons.notification.toast(e, { "timeout": 3000 });
        }
    }); 



});