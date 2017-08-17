//falto optimizar código

function registrar() {
    var persona = [{
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        correo: $("#correo").val(),
        clave: $("#clave").val(),
    }

    ];

    var guardado = JSON.parse(localStorage.getItem("persona"));

    if (guardado == null) {
        localStorage.setItem("persona", JSON.stringify(persona));
    } else {
        localStorage.setItem("persona", JSON.stringify(guardado.concat(persona)));
    }

    localStorage.setItem("nombre", $("#nombre").val());
    localStorage.setItem("persona_online", $("#correo").val());
}


function iniciarSesion() {

    var personas = JSON.parse(localStorage.getItem("persona"));

    var correo = $("#up_correo").val();
    var clave = $("#up_clave").val();

    $.each(personas, function (key, value) {
        if (correo == value.correo && clave == value.clave) {
            indexPost();
            localStorage.setItem("nombre", value.nombre);
            localStorage.setItem("persona_online", correo);
            $('#name').text("Hola " + value.nombre);
            reemplazo();
        } else {
        }
    });
}

function reemplazo() {
    $('#lado_derecho').html($('#reemplazo').html());
}

function indexPost() {
    document.location.href = "http://localhost/examen2/Views/Home/Articles.html";
}

function verificarSesion() {
    var online = localStorage.getItem("persona_online");
    var link = "http://localhost/examen2/Views/Home/Articles.html";

    if (online == 0 || online == null) {
        return;
    }
    $('#lado_derecho').html($('#reemplazo').html());
    $('#name').text("Hola " + localStorage.getItem("nombre"));
    if (window.location.href != link) {
        indexPost();
    }

}

function cerrarSesion() {
    localStorage.setItem("persona_online", "0");
    localStorage.setItem("nombre", "0");
    window.location.href = "http://localhost/examen2/Views/Home/Index.html";
}

function postear() {
    var texto = $("#post").val();
    var id = localStorage.getItem("id");
    if (id == 0 || id == null) {
        id = 1;
    } else {
        id += 1;
        localStorage.setItem("id", id);
    }
    var post = [{
        dueno: localStorage.getItem("persona_online"),
        texto: texto,
        id: id
    }
    ];

    var guardado = JSON.parse(localStorage.getItem("post"));

    if (guardado == null) {
        localStorage.setItem("post", JSON.stringify(post));
    } else {
        localStorage.setItem("post", JSON.stringify(guardado.concat(post)));
    }

}

function getPost() {
    var posts = JSON.parse(localStorage.getItem("post"));

    $.each(posts, function (key, value) {
        var html = '<div class="col-md-4" id="' + value.id + '"><div class="panel panel-default"><div class="panel-body"><section class="post-heading"><div class="row"><div class="col-md-12"><div class="media"><div class="media-left"></div><div class="media-body"><a class="anchor-username"><h4 class="media-heading">' + value.dueno + '</h4></a></div></div></div></div></section><section class="post-body"><p>' + value.texto + '</p> </section><section class="post-footer"><hr>';

        if (value.dueno == localStorage.getItem("persona_online")) {
            html += '<a> Editar</a><a> Eliminar</a></div></section></div></div>';
        } else {
            html += '</div></section></div></div>';
        }
        $("#main").append(html);
    });

}






