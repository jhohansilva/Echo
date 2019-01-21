<?php

error_reporting(0);
date_default_timezone_set('America/Bogota');

$ftp_server = "www.sc-prosoft.com";
$ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");
$login = ftp_login($ftp_conn, 'descargas@sc-prosoft.com', 'prosoft12345');
ftp_set_option($ftp_conn, FTP_USEPASVADDRESS, false); 
ftp_pasv($ftp_conn, true); 

$list_files = listDetailed($ftp_conn);
// print_r($list_files);

$elementos = [];
$i = 0;

foreach ($list_files as $item => $valor) {   

    $url = 'http://sc-prosoft.com/descargas/' . $item;
    $info_file = pathinfo($url);
    
    $size = formatSizeUnits($valor['size']);
    $modificacion = $valor['day'] . ' ' . $valor['month'] . ' , ' . $valor['time'];       

    $elementos[] = [
        'id' => $i,
        'nombre' => $info_file['filename'],
        'extension' => $info_file['extension'],
        'basename' => $info_file['basename'],
        'peso' => $size,
        'modificacion' => $modificacion,
        'direccion' => $url
    ];         

    $i++;

}

ftp_close($ftp_conn);
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

function listDetailed($resource, $directory = '.') { 
    if (is_array($children = @ftp_rawlist($resource, $directory))) {         
        $childrenFilter = preg_grep( '/\.exe$/i', $children );
        $items = array(); 

        foreach ($childrenFilter as $child) { 
            $chunks = preg_split("/\s+/", $child); 
            list($item['rights'], $item['number'], $item['user'], $item['group'], $item['size'], $item['month'], $item['day'], $item['time']) = $chunks; 
            $item['type'] = $chunks[0]{0} === 'd' ? 'directory' : 'file'; 
            array_splice($chunks, 0, 8); 
            $items[implode(" ", $chunks)] = $item; 
        } 

        return $items; 
    } 
}