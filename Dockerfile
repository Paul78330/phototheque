# Utilisez une image de base. Cela peut être n'importe quelle image contenant Node.js
FROM node:14

# Créez un répertoire pour l'application
WORKDIR /usr/src/app

# Installez les dépendances de l'application
COPY package*.json ./
RUN npm install

# Ajoutez cette ligne pour installer sinon
RUN npm install --save-dev sinon

# Installer ESLint et les plugins Jest et Cypress
RUN npm install --save-dev eslint eslint-plugin-jest eslint-plugin-cypress

# Copiez le reste du code de l'application
COPY . .

# Mettez à jour la liste des paquets
RUN apt-get update

# Installez les dépendances nécessaires pour Cypress et Xvfb
RUN apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth

# Installez Cypress
RUN npm install cypress --save-dev

# Installez dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && chmod +x /usr/local/bin/dockerize \
  && echo $PATH

# Exposez le port sur lequel votre application s'exécute
EXPOSE 8080

# Démarrez l'application
CMD [ "node", "index.js" ]