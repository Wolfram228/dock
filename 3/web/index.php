<?php
echo "<h1>Версии БД</h1>";


$my = @new mysqli('mysql', 'appuser', 'apppass', 'appdb');
if ($my->connect_errno) {
    echo "<p>MySQL: ошибка - " . $my->connect_error . "</p>";
} else {
    echo "<p>MySQL: " . $my->server_info . "</p>";
}


$pg = @pg_connect("host=pgsql dbname=appdb user=appuser password=apppass");
if ($pg) {
    echo "<p>PostgreSQL: " . pg_version($pg)['server'] . "</p>";
} else {
    echo "<p>PostgreSQL: ошибка подключения</p>";
}


$sock = @fsockopen('redis', 6379, $errno, $errstr, 3);
if ($sock) {
    fwrite($sock, "INFO server\r\n");
    $answer = fread($sock, 4096);
    fclose($sock);
    preg_match('/redis_version:(\S+)/', $answer, $m);
    echo "<p>Redis: " . ($m[1] ?? 'версия не найдена') . "</p>";
} else {
    echo "<p>Redis: ошибка - $errstr</p>";
}
