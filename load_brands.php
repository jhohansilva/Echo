<?php

$path    = 'images/logos';
$files = array_diff(scandir($path), array('.', '..'));

print_r(json_encode($files));