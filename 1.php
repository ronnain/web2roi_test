<?php
// Si c'est un fichier pour tester en local c'est ok
// C'est un controller, on pourrait utiliser un framework pour gagner en lisibilité/sécurité.
// J'ai pas fait de class, mais c'est une bonne idée de le faire pour encapsuler la logique.
// Avec ce que j'ai fait, ce n'est pas simple de changer le code

function getAndValidateIds() {
    $ids = isset($_GET['ids']) ? $_GET['ids'] : [];
    if (!is_array($ids)) {
        die("IDs invalide.");
    }
    // on vérifie que tous les éléments sont numériques
    $areAllIdValid = array_reduce($ids, function($carry, $item) {
        return $carry && is_numeric($item);
    }, true);

    if (!$areAllIdValid) {
        die("IDs invalide.");
    }
    return $ids;
}

// $ids = $_GET['ids']; // il faut valider ce qui est passé dans $_GET['ids'], sinon cela peut casser le code ou ouvrir la porte à des injection sql.
$ids = getAndValidateIds();


// Exposer directement les identifiants de connexion à la base de données n'est pas une bonne idée.
// Je ne suis pas certain, mais je pense qu'il vaut mieux les récupérer autrement
try {
   $mysqlClient = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', 'azerty');
} catch (Exception $e) {
    // Je ne suis pas certain, mais en production, ce n'est pas une bonne idée d'exposer les erreurs de connexion à la base de données. Plutôt la logger et afficher un message d'erreur.
   Logger.error('Erreur : ' . $e->getMessage());
   die('Erreur : Un problème est survenue');
}

// $result = [];

// foreach ($ids as $id) {
//    $sqlQuery = 'SELECT id FROM test where id = ' . $id . ' LIMIT 1'; // Injection SQL possible
//    $resStatement = $mysqlClient->prepare($sqlQuery);
//    $resStatement->execute();
//    $recipes = $resStatement->fetch();
//    array_push($result, $recipes['id']);
// }

// Je ne suis pas certain de la syntaxe, mais je crois qu'on peut simplifier de cette façon
$sqlQuery = $mysqlClient->prepare('SELECT id FROM test where id = ?', ['(' . implode(',', $ids) .')']); // je ne suis pas sûr de la syntaxe
$sqlQuery->execute();
$result = $sqlQuery->fetchAll(\PDO::FETCH_ASSOC);

header("Content-Type: application/json");
http_response_code(200);
var_dump($result);