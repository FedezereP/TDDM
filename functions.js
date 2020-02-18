ons.ready(function () {
    $("#btn_iniciar").on("click", function () {
        var ema = $("#l_email").val();
        var pwd = $("#l_password").val();
        $("#cargando").show();

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


});