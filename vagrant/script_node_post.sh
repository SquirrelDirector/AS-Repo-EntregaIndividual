if [ ! -f server.js ]; then
    echo "Copiando ficheros"
    cp /ficheros_node/server.js /home/vagrant/server.js
   # cp /ficheros_node/package-lock.json /home/vagrant/package-lock.json
   # cp /ficheros_node/package.json /home/vagrant/package.json
    chown vagrant:vagrant server.js
   # chown vagrant:vagrant package-lock.json
   # chown vagrant:vagrant package.json
fi
echo "Iniciando servidor..."
node server.js
