const express = require("express");
const app = express();
const PORT = 3000;

const characters = require("../express-servidor/database");

// devolvemos los pj (en json) dentro de un objeto llamado items
app.get("/api/characters", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ items: characters });
});

//devuelve los pjs por id, si el id es incorrecto arroja error
app.get("/api/characters/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid parameter: ID must be a number",
      error: "Bad Request",
      statusCode: 400,
    });
  }

  const character = characters.find((char) => char.id === parseInt(id));

  if (!character) {
    return res.status(400).json({
      message: "Character ID not found",
      error: "Bad Request",
      statusCode: 400,
    });
  }

  res.setHeader("Content-Type", "application/json");
  res.json(character);
});

// error 404 si la ruta no existe
app.use((req, res) => {
  res.status(404).json({
    message: "No such file or directory'",
    error: "Not Found",
    statusCode: 404,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
