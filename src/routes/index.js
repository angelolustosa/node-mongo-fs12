import express from "express";
import routerUsuario from "./usuarioRoute.js";

const routes = (app) => {
  // endpoint inicial
  app.get("/", (req, res) => {
    res.send({ msg: "Servidor rodando!", codigo: 200 });
  });

  app.use(express.json(), routerUsuario);
};

export default routes;
