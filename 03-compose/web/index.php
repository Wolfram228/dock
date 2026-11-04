<?php
header('Content-Type: text/html; charset=utf-8');
echo "<h1>Проверка подключения к БД</h1>";

function check(string $name, callable $fn): void {
    try {
        $result = $fn();
        echo "<p style='color:green'>✔ $name: $result</p>";
    } catch (Throwable $e) {
        echo "<p style='color:red'>✘ $name: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}

check('MariaDB', function () {
    $pdo = new PDO('mysql:host=mariadb;dbname=appdb', 'appuser', 'apppass',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    return 'версия ' . $pdo->query('SELECT VERSION()')->fetchColumn();
});

check('PostgreSQL', function () {
    $pdo = new PDO('pgsql:host=postgres;dbname=appdb', 'appuser', 'apppass',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    return $pdo->query('SELECT version()')->fetchColumn();
});

check('Redis', function () {
    $redis = new Redis();
    $redis->connect('redis', 6379);
    $redis->incr('visits');
    return 'счётчик посещений = ' . $redis->get('visits');
});