let url = "./backend/estudiantesBack.php"

$('#boton1').on('click', function () {
    if ($('#nombre').val()===''  || $('#documento').val()===''  ||  $('#correo').val()==='') {
        
        alert("todos los campos deben estar llenos")
        
            }else {
                guardarEstudiantes()
            }
    
})

$('#boton2').on('click', function () {
    if ($('#nombre').val()===''  || $('#documento').val()===''  ||  $('#correo').val()==='') {
        
        alert("todos los campos deben estar llenos")
        
            }else {
                actualizarEstudiantes()
            }

})

$(document).ready(function () {
    vistaEstudiantes(2, 1, 5);
})

function guardarEstudiantes() {

    let nombre = $('#nombre').val();
    let documento = $('#documento').val();
    let correo = $('#correo').val();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            ind: '1',
            nombre: nombre,
            documento: documento,
            gmail: correo
        }
    }).done(function (data) {

        if (data.rta === "ok") {

            alert("se ha insertado correctamente")

            $('#nombre').val('');
            $('#documento').val('');
            $('#correo').val('');

            vistaEstudiantes(2, 1, 5);

        }
    }).fail(function (error) {
        alert("ha fallado la inserción")
    });
}

function vistaEstudiantes(ind, inicio, nroreg) {
    let nuevoinicio = (inicio - 1) * parseInt(nroreg);

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            ind: '2',
            nuevoinicio: nuevoinicio,
            nroreg: nroreg
        },
    }).done(function (data) {

        $('#table-estudiantes tbody').empty();
        $('#paginador').empty();

        let htmlTags = '';

        data.rta2.forEach(function (item) {
            htmlTags += ' <tr> ';
            htmlTags += '    <td >' + item.id + '</td>';
            htmlTags += '    <td>' + item.nombre + '</td>';
            htmlTags += '    <td>' + item.documento + '</td>';
            htmlTags += '    <td>' + item.correo_electronico + '</td>';
            htmlTags += '    <td>';
            htmlTags += '         <span onclick="leerEstudiante(' + item.id + ');" style="cursor: pointer;">';
            htmlTags += '             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">';
            htmlTags += '                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />';
            htmlTags += '                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />';
            htmlTags += '             </svg>';
            htmlTags += '         </span>';
            htmlTags += '         <span  onclick="eliminarEstudiantes(' + item.id + ');" style="cursor: pointer;">';
            htmlTags += '             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">';
            htmlTags += '                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />';
            htmlTags += '                 <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />';
            htmlTags += '             </svg>';
            htmlTags += '         </span>';
            htmlTags += '     </td>';
            htmlTags += ' </tr> ';
        });

        $('#table-estudiantes tbody').append(htmlTags);

        let paginador = "";

        paginador = "";

        paginador += '<ul class="pagination justify-content-end">';

        paginador += '<li><span class="label label" style="font-size:13px; font-weight: bolder; background-color:white; color:#1346c9; border-radius:5px; border:solid 1px #1346c9; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);">' + data.rta + ' Registros</li></span>';

        if (inicio > 1) {
            paginador += '<li><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)" onclick="vistaEstudiantes(\'2\', 1, ' + nroreg + ', \'\', \'\', \'\', \'\', \'\', \'\')">&laquo;</a></li>';
            paginador += '<li><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)" onclick="vistaEstudiantes(\'2\', ' + (inicio - 1) + ', ' + nroreg + ', \'\', \'\', \'\', \'\', \'\', \'\')">&lsaquo;</a></li>';

        } else {
            paginador += '<li class="disabled" ><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)">&laquo;</a></li>';
            paginador += '<li class="disabled" ><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)">&lsaquo;</a></li>';
        }
        let limit1 = inicio - nroreg;
        let limit2 = inicio + nroreg;

        if (inicio <= parseInt(nroreg)) {
            limit1 = 1;
        }
        if ((inicio + nroreg) >= Math.ceil(data.rta / parseInt(nroreg))) {
            limit2 = Math.ceil(data.rta / parseInt(nroreg));
        }
        for (let i = limit1; i <= limit2; i++) {
            if (i === inicio) {
                paginador += '<li class="active"><a style="background-color: #E5E5E5; border-color: #DFDFDF; font-size: 13px; font-weight: bold; color: #1346c9; padding: 8px 10px; border-radius: 5px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)">' + i + '</a></li>';
            } else {
                paginador += '<li><a style="font-size: 13px; font-weight: bold; color: #1346c9; background-color: #FFFFFF; border: solid 1px #C0C0C0; padding: 8px 10px; border-radius: 5px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)" onclick="vistaEstudiantes(\'2\', ' + i + ', ' + nroreg + ', \'\', \'\', \'\', \'\', \'\', \'\')">' + i + '</a></li>';
            }

        }
        if (inicio < Math.ceil(data.rta / parseInt(nroreg))) {
            paginador += '<li><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)" onclick="vistaEstudiantes(\'2\', ' + (inicio + 1) + ', ' + nroreg + ',\'\',\'\',\'\',\'\',\'\',\'\')">&rsaquo;</a></li>';
            paginador += '<li><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)" onclick="vistaEstudiantes(\'2\', ' + Math.ceil(data.rta / nroreg) + ', ' + nroreg + ', \'\',\'\',\'\',\'\',\'\',\'\')">&raquo;</a></li>';
        } else {
            paginador += '<li class="disabled"><a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)">&rsaquo;</a></li>';
            paginador += '<li class="disabled"><a a a style="font-size: 13px; font-weight: bolder; color: #1346c9; background-color: white; border-radius: 5px; border: solid 1px #C0C0C0; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" href="javascript:void(0)">&raquo;</a></li>';
        }
        paginador += '<li><span class="label label" style="font-size:13px; font-weight: bolder; background-color:white; color:#1346c9; border-radius:5px; border:solid 1px #1346c9; padding: 8px 10px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);">' + Math.ceil(data.rta / parseInt(nroreg)) + ' Páginas</span></li>';

        paginador += '</ul>';

        $("#paginador").append(paginador);

    }).fail(function (error) {
        alert("error al mostrar los datos")
    });

}

function leerEstudiante(id) {

    $('#boton2').removeClass('d-none')
    $('#boton1').addClass('d-none')

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            ind: '3',
            id: id
        },
    }).done(function (data) {



        $('#estudianteid').val(data.rta.id);
        $('#nombre').val(data.rta.nombre);
        $('#documento').val(data.rta.documento);
        $('#correo').val(data.rta.correo_electronico);


    }).fail(function (error) {
        alert("error al leer los datos")
    })

}

function actualizarEstudiantes() {

    let id = $('#estudianteid').val();
    let nombre = $('#nombre').val();
    let documento = $('#documento').val();
    let correo = $('#correo').val();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            ind: '4',
            id: id,
            nombre: nombre,
            documento: documento,
            gmail: correo

        }
    }).done(function (data) {

        if (data.rta === "ok") {

            alert("se ha actualizado correctamente")

            $('#estudianteid').val('');
            $('#nombre').val('');
            $('#documento').val('');
            $('#correo').val('');

            vistaEstudiantes(2, 1, 5);


            $('#boton2').addClass('d-none')
            $('#boton1').removeClass('d-none')

        }
    }).fail(function (error) {
        alert("ha fallado en la actualizacion")
    });
}

function eliminarEstudiantes(id) {

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            ind: '5',
            id: id
        },
    }).done(function (data) {

        if (data.rta == "ok") {

            alert("se ha eliminado el estudiante")
            vistaEstudiantes(2, 1, 5);

        }



    }).fail(function (error) {

        alert("error al eliminar el estudiante")
    })
}