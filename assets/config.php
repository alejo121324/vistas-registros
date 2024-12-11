
<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'estudiantes'); //Nombre de la base de datos


// !configuracion de dsn para las diferentes bases de datos
$DSNcredimas = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
// !creacion de instancias
// si tenemos un error en credimas bases de datos
try {
	$estudiantesdb = new PDO($DSNcredimas, DB_USER, DB_PASS);
} catch (PDOException $error) {
	echo "<p style= 'font-family: system-ui;'>Error en la conexion de bases de datos de estudiantes <strong style='color : red;'> " . $error->getMessage() . " </strong> Revisa la configuración</p>";
	echo "<br>";
}
?>