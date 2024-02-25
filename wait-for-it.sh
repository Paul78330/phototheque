#!/bin/bash
# Ceci est le shebang qui indique au système d'exploitation que ce script doit être exécuté avec /bin/bash.

# wait-for-it.sh
# Ceci est un commentaire décrivant le nom du script.

set -e
# Cette commande arrête le script si une commande échoue.

host="$1"
# Définit une variable 'host' qui est égale au premier argument passé au script.

shift
# Décale tous les arguments de position. $1 devient $0, $2 devient $1, etc.

cmd="$@"
# Définit une variable 'cmd' qui est égale à tous les arguments restants passés au script.

until PING=$(ping -c1 $host 2>&1); do
# Commence une boucle 'until' qui exécute la commande 'ping -c1 $host' et assigne la sortie à la variable 'PING'.
# Si la commande 'ping' échoue (c'est-à-dire si l'hôte n'est pas accessible), la boucle continue.

  echo "Waiting for $host - sleeping"
  # Affiche un message indiquant que le script attend que l'hôte soit accessible.

  sleep 10
  # Fait une pause d'une seconde avant de réessayer la commande 'ping'.

done
# Marque la fin de la boucle 'until'.

>&2 echo "Host is up - executing command"
# Affiche un message indiquant que l'hôte est accessible et que la commande va être exécutée.
# Le '>&2' signifie que le message est envoyé à la sortie d'erreur standard (stderr).

exec $cmd
# Exécute la commande stockée dans la variable 'cmd'.
# L'utilisation de 'exec' signifie que cette commande remplacera le processus du script shell, plutôt que de créer un nouveau processus.