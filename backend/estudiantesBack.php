<?php
include '../assets/config.php';

$indicador = $_POST['ind'];

// este es el indicador para insertar en la base de datos
if($indicador == '1') {

    $nombre =  $_POST['nombre'];
    $documento = $_POST['documento'];
    $correo = $_POST['gmail'];

    $query = "INSERT INTO estudiantes (nombre, documento, correo_electronico) 
                VALUES (:nombre, :documento, :correo_electronico)";

    $qry= $estudiantesdb ->prepare($query);

    $qry -> bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $qry -> bindParam(':documento', $documento, PDO::PARAM_INT);
    $qry -> bindParam(':correo_electronico', $correo, PDO::PARAM_STR);

    if ($qry->execute()) {
       $rta = "ok";
    }else{
        $rta = "error";
    }

    header('Content-Type: application/json');
    echo json_encode(Array('rta' => $rta));
}

if ($indicador == '2') {

    $nuevoinicio = isset($_POST['nuevoinicio']) ? $_POST['nuevoinicio'] : "";
    $nroreg = isset($_POST['nroreg']) ? $_POST['nroreg'] : "";

    $query = "SELECT COUNT(id) AS count from estudiantes ORDER BY id ASC LIMIT :nuevoinicio, :nroreg";
  
    $qry = $estudiantesdb->prepare($query);
    $qry->bindParam(":nuevoinicio", $nuevoinicio, PDO::PARAM_INT);
    $qry->bindParam(":nroreg", $nroreg, PDO::PARAM_INT);
    $qry->execute();
    $count = $qry->fetch(PDO::FETCH_ASSOC)['count'];

    $query2 = "SELECT * FROM estudiantes ORDER BY id ASC LIMIT :nuevoinicio, :nroreg";

    $qry2 = $estudiantesdb->prepare($query2);
    $qry2->bindParam(":nuevoinicio", $nuevoinicio, PDO::PARAM_INT);
    $qry2->bindParam(":nroreg", $nroreg, PDO::PARAM_INT);
    $qry2->execute();
    $rta2 = $qry2->fetchAll(PDO::FETCH_OBJ);

    $response = array('rta' => $count, 'rta2' => $rta2);
    header('Content-Type: application/json');
    echo json_encode($response);
}

if ($indicador == '3') {

    $id = $_POST['id'];

    $query = "SELECT * FROM estudiantes WHERE id = :id";

    $qry = $estudiantesdb->prepare($query);
    $qry->bindParam(":id", $id, PDO::PARAM_INT);
    
    if ($qry->execute()) {
        $rta = $qry->fetch(PDO::FETCH_OBJ);
    }else{
        $rta = "error";
    }

    header('Content-Type: application/json');
    echo json_encode(Array('rta' => $rta));
}

if($indicador == '4') {

    $id = $_POST['id'];
    $nombre =  $_POST['nombre'];
    $documento = $_POST['documento'];
    $correo = $_POST['gmail'];

    $query = "UPDATE estudiantes SET nombre = :nombre, documento = :documento, correo_electronico = :correo_electronico WHERE id = :id";

    $qry= $estudiantesdb ->prepare($query);

    $qry -> bindParam(':id', $id, PDO::PARAM_INT);
    $qry -> bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $qry -> bindParam(':documento', $documento, PDO::PARAM_INT);
    $qry -> bindParam(':correo_electronico', $correo, PDO::PARAM_STR);

    if ($qry->execute()) {
       $rta = "ok";
    }else{
        $rta = "error";
    }

    header('Content-Type: application/json');
    echo json_encode(Array('rta' => $rta));
}

if ($indicador == '5') {
    
    $id = $_POST['id'];

    $query = "DELETE  FROM estudiantes WHERE id = :id";

    $qry = $estudiantesdb->prepare($query);
    $qry->bindParam(":id", $id, PDO::PARAM_INT);
    
    if ($qry->execute()) {
       $rta = "ok";
    }else{
        $rta = "error";
    }

    header('Content-Type: application/json');
    echo json_encode(Array('rta' => $rta));

}