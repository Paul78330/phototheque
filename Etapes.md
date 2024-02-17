# CI/CD pipeline Projet NODE.Js

1- initialiser Git

2- remote le ref distant

```
git remote add upstream [URL]
```

2- Monter le ref distant en local

```
git pull upstream main --allow-unrelated-histories
```

3-mettre à jour les dépendances

```
npm install
```

4-tester l'app

```
node index.js
```

5-Créer un nouveau projet dans GitLab et monter notre réf vers celui-ci

```
git remote add origin https://gitlab.com/tms8285805/phototheque_project.git
```

6-Faire un commit des modifications en local puis pousser vers le ref gitLab

```
git push --set-upstream origin main
```

7-Vérifier que nous avons bien docker-compose

```
docker-compose -v
```

8-Editer le fichier de configuration de l'infrastructure docker-compose.yml et un Dockerfile puis commit et pousser vers gitLab

9-Vérifier que docker est bien lancé

```
docker info
```

10- builder docker dans notre projet

```
docker build
```

11- Demarrer vos services avec la commannde

```
docker-compose up -d
```

Cette commande démarrera tous les services définis dans votre fichier `docker-compose.yml` en arrière-plan.

12- Installer Jest pour nos test Js

```
npm install --save-dev jest

```

13-configurer package.json

![1708025819185](image/Etapes/1708025819185.png)

* `npm run test` exécute tous les tests une fois.
* `npm run test:watch` exécute Jest en mode veille, rerun tests sur les fichiers changés.
* `npm run test:unit` exécute tous les tests avec des logs détaillés.

  13- installer supertest

  ```
  npm install --save-dev supertest
  ```

`supertest` est une bibliothèque de test pour Node.js qui permet de tester facilement les applications HTTP. Elle est souvent utilisée pour tester les applications Express.js, mais elle peut être utilisée avec n'importe quel framework HTTP.

14-Installer sinon

 `Sinon` est une bibliothèque de test pour JavaScript qui fournit des fonctionnalités pour les tests unitaires, comme les espions, les stubs et les mocks.

Voici une brève description de ces concepts :

* **Espions (Spies)** : Un espion enregistre des informations sur la fonction qu'il espionne. Il peut enregistrer combien de fois une fonction a été appelée, quels arguments ont été passés, quelle était la valeur de `this` lors de l'appel, et quelle était la valeur de retour.
* **Stubs (Bouchons)** : Un stub est une fonction qui remplace une autre fonction. Il est utilisé pour contrôler le comportement d'une fonction. Vous pouvez dire à un stub quoi retourner ou de lancer une exception à chaque fois qu'il est appelé.
* **Mocks (Simulations)** : Un mock est une fonction qui remplace une autre fonction, tout comme un stub. Cependant, un mock a des attentes préprogrammées. Par exemple, vous pouvez dire à un mock qu'il doit être appelé exactement 3 fois avec des arguments spécifiques, et le test échouera si ces attentes ne sont pas respectées.

`Sinon` est souvent utilisé en combinaison avec d'autres bibliothèques de test, comme `Mocha` ou `Jest`, pour fournir un ensemble complet d'outils pour les tests unitaires en JavaScript.

14- Editer le fichier index.test.js et configurer nos différents tests

15- tester nos fonctions depuis docker-compose

```
docker-compose up --build test
```

ou

```
npm test
```

Pour exécuter vos tests avec Jest, vous pouvez utiliser la commande suivante dans votre terminal

16 - Pour les test d'intégration et E2E (bout à bout)

Un test d'intégration est un type de test qui vérifie si différents modules ou services de votre application fonctionnent correctement ensemble. Contrairement aux tests unitaires, qui testent des parties individuelles de votre code en isolation, les tests d'intégration testent l'interaction entre différentes parties de votre code.

Par exemple, dans une application web, un test d'intégration pourrait tester le processus complet de connexion d'un utilisateur, y compris l'envoi d'une requête HTTP à l'API de l'application, la vérification des informations d'identification de l'utilisateur dans la base de données, et la réponse de l'API avec un jeton de session.

   a) installer portfinder

```
npm install portfinder
```

Le module `portfinder` est une bibliothèque Node.js qui fournit des outils pour rechercher un port réseau ouvert sur votre machine locale. Il est souvent utilisé dans les situations où vous avez besoin de démarrer un serveur sur un port spécifique, mais vous ne savez pas quels ports sont actuellement disponibles.

Dans le contexte de vos tests, `portfinder` est utilisé pour trouver un port ouvert avant de démarrer votre serveur Express. Cela permet d'éviter les conflits de port si vous avez d'autres services en cours d'exécution sur votre machine qui pourraient utiliser le même port.

b) Dans test/albumRoutes.js éditer les tests d'intégrations de nos routes

installer jest-junit

```
npm install --save-dev jest-junit
```

`jest-junit` est un reporter personnalisé pour Jest qui génère des rapports de test au format JUnit. JUnit est un format de rapport standard utilisé par de nombreux outils de CI/CD (Intégration Continue / Déploiement Continu), y compris Jenkins, CircleCI et GitLab CI/CD.

Lorsque vous exécutez vos tests avec Jest, Jest génère un rapport de test qui résume les résultats de vos tests. Par défaut, Jest génère un rapport de test dans un format lisible par l'homme. Cependant, ce format n'est pas idéal pour l'analyse automatisée des résultats des tests.

C'est là qu'intervient `jest-junit`. Lorsque vous utilisez `jest-junit`, Jest génère un rapport de test au format JUnit. Le format JUnit est un format XML standard qui peut être analysé par de nombreux outils de CI/CD. Cela permet à ces outils de comprendre les résultats de vos tests et de fournir des informations détaillées sur les tests qui ont réussi et ceux qui ont échoué.

En résumé, `jest-junit` est utile si vous souhaitez intégrer vos tests Jest dans un pipeline de CI/CD et obtenir des rapports de test détaillés.

c) Ajouter le job test_integration à .gitlab-ci.yml

d) Ajouter le test à script dans package.json

16- Mettons maintenant en place un test E2E

a) Installer cypress

```
npm install --save-dev cypress
```

b) créer un fichier cypress/e2e/test.cy.js

c) éditer le fichier cypress.json

d) tester votre intégration en local

```
npx cypress open
```

Cypress va prendre le relais et faire le test pour nous

(lancer le server node au préalable)

![1708082722544](image/Etapes/1708082722544.png)

e) tester en local 

```
npx cypress run cypress/e2e/test.cy.js
```
