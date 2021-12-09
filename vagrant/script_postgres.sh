#apk update
#apk add postgresql
#mkdir /run/postgresql
#chown postgres:postgres /run/postgresql/
#su postgres -
#cd
#runuser -l postgres -c 'mkdir /var/lib/postgresql/data'
#runuser -l postgres -c 'chmod 0700 /var/lib/postgresql/data'
#runuser -l postgres -c 'initdb -D /var/lib/postgresql/data'
#runuser -l postgres -c 'pg_ctl start -D /var/lib/postgresql/data'

echo "Setting up PostgreSQL database"
sudo apk add --no-cache postgresql
sudo su -c "if [ -d /var/lib/postgresql/data ]; then rm -rf /var/lib/postgresql/data; fi" postgres
sudo su -c "mkdir /var/lib/postgresql/data" postgres
sudo su -c "initdb /var/lib/postgresql/data" postgres
sudo su -c "echo host all all 0.0.0.0/0 md5 >> /var/lib/postgresql/data/pg_hba.conf" postgres
sudo su -c "echo listen_addresses=\'*\' >> /var/lib/postgresql/data/postgresql.conf" postgres
sudo sed -i 's/\/run\/postgresql,\/tmp/\/tmp/' /var/lib/postgresql/data/postgresql.conf

sudo su -c "echo -e '\x23\x21/bin/bash' > /etc/local.d/postgres-custom.start"
sudo su -c "echo sudo su -c \'pg_ctl start -D /var/lib/postgresql/data\' postgres >> /etc/local.d/postgres-custom.start"
sudo su -c "echo -e '\x23\x21/bin/bash' > /etc/local.d/postgres-custom.stop"
sudo su -c "echo sudo su -c \'pg_ctl stop -D /var/lib/postgresql/data\' postgres >> /etc/local.d/postgres-custom.stop"
sudo chmod +x /etc/local.d/postgres-custom.start
sudo chmod +x /etc/local.d/postgres-custom.stop
sudo rc-update add local default
sudo openrc
sudo -u postgres createuser eufrasio
sudo -u postgres createdb db_pruebas
sudo -u postgres psql -U postgres -d postgres -c "alter user eufrasio with password 'abc123.';"
sudo -u postgres psql -U postgres -d postgres -c "grant all privileges on database db_pruebas to eufrasio;"
sudo -u postgres psql -U eufrasio -d db_pruebas -c "CREATE TABLE visitas (id SERIAL, nombre VARCHAR(45), texto VARCHAR(45), PRIMARY KEY(id));"
sudo -u postgres psql -U eufrasio -d db_pruebas -c "INSERT INTO visitas (nombre, texto) VALUES ('Unai', 'Probando entrada desde K8S');"
#sudo -u postgres psql -U postgres -d postgres -c "grant all privileges on database db_pruebas to eufrasio;"
