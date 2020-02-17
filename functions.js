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
                    ons.notification.toast(xml.responseJSON.data.error.errors.email.message, { "timeout": 3000 });
                    // Este msj nos comunica si se repite el mail, o si el formato no es el correcto
                    // ons.notification.toast(xml.responseJSON.reason, { "timeout": 3000 });  
                    // Este error segun la API nos avisa que la contraseña deberia tener 8 caracteres como minimo
                    // genere una validacion al principio del try, ver si se puede usar el mensaje mismo de la API
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


});