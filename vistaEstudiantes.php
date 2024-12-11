<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Estudiantes</title>

</head>
<body>

<div class="container mt-5">
    <h2 class="text-center">Formulario de Registro de Estudiantes</h2>

        <div class="mb-3"> 
            <input type="text" class="form-control d-none" id="estudianteid">
            <label class="form-label">Nombre:</label>
            <input type="text" id="nombre" class="form-control">
        </div>

        <div class="mb-3">
            <label class="form-label">Documento:</label>
            <input type="text" id="documento"  class="form-control">
        </div>

        <div class="mb-3">
            <label class="form-label">Correo:</label>
            <input type="email" id="correo" class="form-control">
        </div>

        <button class="btn btn-primary" id="boton1">Guardar</button>
        
        <button class="btn btn-success d-none" id="boton2">Actualizar</button>

    <h2 class="mt-5">Estudiantes Registrados</h2>

 
    <table class="table table-bordered mt-3" id="table-estudiantes">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Correo</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <div id="paginador"></div>
</div>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
<script src="assets/estudiantes.js"></script>


</body>
</html>