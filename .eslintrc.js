module.exports = {
    // "env" définit les environnements globaux qui sont activés.
    "env": {
        "node": true, // Active l'environnement Node.js, qui définit les variables globales disponibles dans les scripts Node.js.
        "es2021": true, // Active toutes les fonctionnalités ECMAScript 2021.
        "jest": true // Active l'environnement Jest, qui définit les variables globales disponibles dans les tests Jest.
    },
    // "overrides" permet de spécifier la configuration pour des fichiers spécifiques.
    "overrides": [
        {
            "env": {
                "node": true // Active l'environnement Node.js pour les fichiers spécifiés.
            },
            "files": [
                ".eslintrc.{js,cjs}" // Applique cette configuration aux fichiers .eslintrc.js et .eslintrc.cjs.
            ],
            "parserOptions": {
                "sourceType": "script" // Indique que les fichiers spécifiés sont des scripts et non des modules.
            }
        }
    ],
    // "parserOptions" définit les options pour le parseur.
    "parserOptions": {
        "ecmaVersion": "latest", // Utilise la dernière version d'ECMAScript.
        "sourceType": "module" // Indique que le code source est un module ECMAScript.
    },
    // "rules" définit les règles ESLint à utiliser.
    "rules": {
        // Ici, vous pouvez ajouter vos propres règles.
    }
}