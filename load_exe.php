<?php

error_reporting(0);
date_default_timezone_set('America/Bogota');
$path = 'descargas/';
$files = array_diff(scandir($path), array('.', '..'));
// print_r($files);

$elementos = array();
$i = 0;
foreach ($files as $item => $valor) {

    $info_file = pathinfo($valor);

    $file = $path . $info_file['basename'];
    if(filetype($file) != 'dir'){
        $ruta = "http://$_SERVER[HTTP_HOST]/echo/descargas/" . $info_file['basename'];
        $size = formatSizeUnits(filesize($file));
        
        echo $ruta;
    
        $elementos[] = [
            'id' => $i,
            'nombre' => $info_file['filename'],
            'extension' => $info_file['extension'] ?: null,
            'basename' => $info_file['basename'],
            'url' => $ruta,
            'size' => $size,
            'modificacion' => date ("d F, Y H:i:s.", filemtime($file)),
            'tipo' => filetype($file)
        ];
    }
}
$i++;

print_r(json_encode($elementos));

function formatSizeUnits($bytes){
    if ($bytes >= 1073741824) {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    } elseif ($bytes > 1) {
        $bytes = $bytes . ' bytes';
    } elseif ($bytes == 1) {
        $bytes = $bytes . ' byte';
    } else {
        $bytes = '0 bytes';
    }
    return $bytes;
}
