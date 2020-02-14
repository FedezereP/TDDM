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

            // Invocar API POST usuario
            datos = { "email": ema, "password": pwd };
            datos = JSON.parse(datos); // parse en vez de stringify ??
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
                    ons.notification.toast(xml.responseJSON.data.error.errors.message, { "timeout": 3000 });
                }
            });

        } catch (e) {
            ons.notification.toast(e, { "timeout": 3000 });
        }

    });
});