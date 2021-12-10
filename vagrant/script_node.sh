echo "Instalando servidor..."
apk add --update nodejs npm
sed -i '$ a 192.168.1.2 postgre-db' /etc/hosts

echo "Moviendo fichero package.json..."
cp /ficheros_node/package.json /home/vagrant/package.json
cp /ficheros_node/package-lock.json /home/vagrant/package-lock.json
cp /ficheros_node/server.js /home/vagrant/server.js
chown vagrant:vagrant package.json
chown vagrant:vagrant package-lock.json
chown vagrant:vagrant server.js

echo "Instalando plugins..."
npm install pg
npm install express
npm i body-parser
npm install nodemon
echo "Finalizado"
