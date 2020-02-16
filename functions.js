ons.ready(function () {
    $("#btn_registrar").on("click", function () {
        var ema = $("#email").val();
        var pwd = $("#password").val();

        try {
            if (!ema) {
                throw "Ingrese email para continuar";
            }
            if (!pwd) {
                throw "Ingrese contrase&ntilde;a para continuar";
            }
            if (pwd.length < 8){
                throw "La contrase&ntilde;a debe contener 8 caracteres como m&iacute;nimo";
            }

            // Invocar API POST usuario
            datos = { "email": ema, "password": pwd };
            //datos = JSON.stringify(datos); iba sin el stringify!!!!!!!!!!!!!! :D
            $.ajax({
                url: "https://tiendanatural2020.herokuapp.com/api/user/register",
                type: "POST",
                dateType: "json",
                data: datos,
                success: function (respuesta) {
                    ons.notification.toast("El usuario se registro correctamente", { "timeout": 3000 });


                    /*var usuario = JSON.stringify(respuesta.descripcion);
                    sessionStorage.setItem("ema", usuario);
                    var nav = document.getElementById("nav");
                    nav.pushPage("t_listado");*/
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
});