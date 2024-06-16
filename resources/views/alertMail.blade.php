<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annonce d'Objet Perdu</title>
    <link rel="stylesheet" href="{{ asset('asset/alert/styles.css') }}">
</head>
<body>
    <div class="alert-container">
        <div class="alert-card">
            <h1>⚠️ Objet Perdu ⚠️</h1>
            <p>Un <strong>{type}</strong> a été perdu dans la zone du <strong>Parc Central</strong> le <strong>12 Juin 2024</strong> vers <strong>14h30</strong>.</p>
            <p>Si vous l'avez trouvé, veuillez contacter <strong>Jean Dupont</strong> au <strong>06 12 34 56 78</strong> ou envoyer un email à <strong>jean.dupont@example.com</strong>.</p>
            <p>Merci pour votre aide !</p>
            <button onclick="closeAlert()">Fermer</button>
        </div>
    </div>

    <script src="{{asset('asset/alert/script.js')}}"></script>
</body>
</html>
