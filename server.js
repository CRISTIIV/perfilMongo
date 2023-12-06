const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Importar el modelo de datos
const Profile = require("./models/Profile");

// Rutas
app.get("/profiles", async (req, res) => {
  // Obtener todos los perfiles
  const profiles = await Profile.find();

  // Responer con los perfiles
  res.send(profiles);
});

app.post("/profiles", async (req, res) => {
  // Crear un nuevo perfil
  const profile = new Profile({
    id: req.body.id,
    account_email: req.body.account_email,
    account_name: req.body.account_name,
  });

  // Guardar el perfil
  await profile.save();

  // Responer con el perfil creado
  res.send(profile);
});

// Escuchar el puerto 3000
app.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"));
