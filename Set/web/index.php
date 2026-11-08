<?php

header('Content-Type: text/html; charset=utf-8');

function render(string $db, string $value): void
{
    echo "<li><b>{$db}:</b> {$value}</li>";
}

function mysqlVersion(): string
{
    $link = @new mysqli('mysql', 'appuser', 'apppass', 'appdb');
    if ($link->connect_errno) {
        return 'ошибка — ' . $link->connect_error;
    }
    $ver = $link->server_info;
    $link->close();
    return $ver;
}

function pgsqlVersion(): string
{
    $conn = @pg_connect('host=pgsql dbname=appdb user=appuser password=apppass');
    if (!$conn) {
        return 'ошибка подключения';
    }
    $info = pg_version($conn);
    pg_close($conn);
    return $info['server'] ?? 'неизвестно';
}

function redisVersion(): string
{
    $fp = @fsockopen('redis', 6379, $code, $text, 3);
    if (!$fp) {
        return 'ошибка — ' . $text;
    }
    fwrite($fp, "INFO server\r\n");
    $raw = '';
    while (!feof($fp)) {
        $chunk = fread($fp, 1024);
        if ($chunk === '' || $chunk === false) {
            break;
        }
        $raw .= $chunk;
        if (str_contains($raw, 'redis_version:')) {
            break;
        }
    }
    fclose($fp);
    return preg_match('/redis_version:(\S+)/', $raw, $hit) ? $hit[1] : 'версия не найдена';
}

$checks = [
    'MySQL'      => 'mysqlVersion',
    'PostgreSQL' => 'pgsqlVersion',
    'Redis'      => 'redisVersion',
];
?>
<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"><title>Версии БД</title></head>
<body>
    <h1>Версии БД</h1>
    <ul>
        <?php foreach ($checks as $label => $fn): ?>
            <?php render($label, $fn()); ?>
        <?php endforeach; ?>
    </ul>
</body>
</html>