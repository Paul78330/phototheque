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