# Utilisez une image de base. Cela peut être n'importe quelle image contenant Node.js
FROM node:14

# Créez un répertoire pour l'application
WORKDIR /usr/src/app

# Installez les dépendances de l'application
COPY package*.json ./
RUN npm install

# Ajoutez cette ligne pour installer sinon
RUN npm install --save-dev sinon

# Copiez le reste du code de l'application
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 8080

# Démarrez l'application
CMD [ "node", "index.js" ]