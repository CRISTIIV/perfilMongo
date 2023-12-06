// Importar las dependencias
import express from 'express';
import { connect, connection, Schema, model } from 'mongoose';
import { json } from 'body-parser';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Crear una instancia de Express
const app = express();
const port = 3000;

// Conectar a MongoDB
connect('mongodb://localhost:27017/streaming');//, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//});


// Manejar eventos de conexión de MongoDB
const db = connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Definir el esquema del perfil
const profileSchema = new Schema({
  email_cuenta: String,
  nombre_cuenta: String,
});

// Crear un modelo de perfil
const Profile = model('Profile', profileSchema);

// Middleware para analizar solicitudes en formato JSON
app.use(json());

// Rutas
app.post('/profiles', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { email_cuenta, nombre_cuenta } = req.body;
    
    // Crear una nueva instancia del modelo Profile
    const profile = new Profile({ email_cuenta, nombre_cuenta });

    // Guardar el perfil en la base de datos
    await profile.save();

    // Responder con el perfil creado
    res.status(201).json(profile);
  } catch (error) {
    // Manejar errores y responder con un código 500 si es necesario
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
