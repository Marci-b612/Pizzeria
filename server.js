
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Middleware para parsear JSON
app.use(bodyParser.json());

// URL y nombre de la base de datos
const url = 'mongodb://localhost:27017';
const dbName = 'pizzeriaDB';

let db;

// Conexión a la base de datos
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  console.log('Conectado a MongoDB');
});

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  db.collection('productos').find().toArray((err, productos) => {
    if (err) throw err;
    res.json(productos);
  });
});

// Endpoint para crear un nuevo producto
app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  db.collection('productos').insertOne(nuevoProducto, (err, result) => {
    if (err) throw err;
    res.status(201).send(result.ops[0]);
  });
});

// Endpoint para actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  db.collection('productos').updateOne({ _id: new MongoClient.ObjectID(id) }, { $set: datosActualizados }, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  db.collection('productos').deleteOne({ _id: new MongoClient.ObjectID(id) }, (err, result) => {
    if (err) throw err;
    res.status(204).send();
  });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
