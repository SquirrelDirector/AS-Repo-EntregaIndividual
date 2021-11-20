'use strict';

const express = require('express');
const { Client } = require('pg');
var bodyParser = require('body-parser'); //https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const connectionData = {
  user: 'eufrasio',
  host: 'postgreDB',
  database: 'db_pruebas',
  password: 'abc123.',
  port: 5432,
}


// App
const app = express();


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
if(req.method=="GET"){

  
  var headHTML="<html><head><title>Pruebas desde Node.JS</title></head><body><h1>Introduzca datos en el libro de visitas</h1>";
  var form="<form method='POST' action='modificar'>";
  var inputNombre="<label for='nombre'>Nombre: </label><input type='text' id='nombre' name='nombre'/><br>";
  var inputTexto="<label for='comentario'>Comentario: </label><input type='text' id='comentario' name='comentario'/><br>";
  var botonEnviar="<input type='submit' name='enviar' value='Enviar datos'>";
  var cierreForm="</form>";
  var visitasRealizadas="<h1>Visitas realizadas</h1>";
  var tabla="<table border='1px'><tr><th>Nombre</th><th>Texto</th><th>Eliminar</th><th>Editar</th></tr>";
  var datos="";
  var cierreTabla="</table>"
  var cierre="</body></html>";
  
      const client = new Client(connectionData)
      client.connect();
      const resp = client.query('SELECT nombre, texto, id from visitas').then(response => {
        for(var i=0; i<response.rows.length; i++){
          
          var nombre=response.rows[i].nombre;
          var texto=response.rows[i].texto;
          var id = response.rows[i].id;
          datos+="<tr><td>"+nombre+"</td><td>"+texto+"</td><td><a href='/eliminar?identificador="+id+"'>&times;</a></td><td><a href='/editar?identificador="+id+"'>Editar</a></td></tr>";
        }
        res.send(headHTML+form+inputNombre+inputTexto+botonEnviar+cierreForm+visitasRealizadas+tabla+datos+cierreTabla+cierre);
        client.end();
      })
        .catch(err => {
          console.log(err)
          client.end();
          res.send(headHTML+form+inputNombre+inputTexto+botonEnviar+cierreForm+visitasRealizadas+tabla+cierreTabla+cierre);
        })

  }
  
});

app.post('/modificar', urlencodedParser, (req, res) => {
  if(req.method=="POST"){
        //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
        //console.log(req.body.nombre);
        //console.log(req.body.comentario);
        const client = new Client(connectionData)
        client.connect();
        const resp = client.query("INSERT INTO visitas (nombre, texto) VALUES ('"+req.body.nombre+"', '"+req.body.comentario+"')").then(response => {
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        })
        .catch(err => {
          console.log(err);
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        });

      //https://www.tutorialspoint.com/redirecting-requests-in-node-js
      
  }
});



app.get('/eliminar', urlencodedParser, (req, res) => {
  if(req.method=="GET"){
        //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
        //console.log(req.body.nombre);
        //console.log(req.body.comentario);
        const client = new Client(connectionData)
        client.connect(); //req.body.identificador

        const resp = client.query("DELETE FROM visitas WHERE id="+req.query.identificador).then(response => {
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        })
        .catch(err => {
          console.log(err);
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        });

      //https://www.tutorialspoint.com/redirecting-requests-in-node-js
      
  }
});




app.get('/editar', urlencodedParser, (req, res) => {
  if(req.method=="GET"){
        //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
        //console.log(req.body.nombre);
        //console.log(req.body.comentario);
        const client = new Client(connectionData)
        client.connect(); //req.body.identificador

        const resp = client.query("SELECT id, nombre, texto FROM visitas WHERE id="+req.query.identificador).then(response => {
          var nombre=response.rows[0].nombre;
          var texto=response.rows[0].texto;
          var id = response.rows[0].id;
          //--------------------------------
          var headHTML="<html><head><title>Pruebas desde Node.JS</title></head><body><h1>Modifique datos en el libro de visitas</h1>";
          var form="<form method='POST' action='editar'>";
          var inputNombre="<label for='nombre'>Nombre: </label><input type='text' id='nombre' name='nombre' value='"+nombre+"'/><br>";
          var inputTexto="<label for='comentario'>Comentario: </label><input type='text' id='comentario' name='comentario' value='"+texto+"'/><br>";
          var inputId="<input type='hidden' name='identificador' value='"+id+"'>"
          var botonEnviar="<input type='submit' name='enviar' value='Enviar datos'>";
          var cierreForm="</form></body></html>";

          res.send(headHTML+form+inputNombre+inputTexto+inputId+botonEnviar+cierreForm);
        })
        .catch(err => {
          console.log(err);
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        });

      //https://www.tutorialspoint.com/redirecting-requests-in-node-js
      
  
      }
      

  
});

app.post("/editar", urlencodedParser, (req,res)=>{
    const client = new Client(connectionData);
    client.connect();
    const resp = client.query("UPDATE visitas SET nombre='"+req.body.nombre+"', texto='"+req.body.comentario+"' WHERE id="+req.body.identificador).then(response => {
      res.statusCode=302;
      res.setHeader('Location','/');
      return res.end();
    })
  .catch(err => {
    console.log(err);
    res.statusCode=302;
    res.setHeader('Location','/');
    return res.end();
  });
});

app.listen(PORT, HOST);
