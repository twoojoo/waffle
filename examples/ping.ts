import { Server } from "../src"

//default address: 0.0.0.0:80
Server().get("/ping").handler(async (_, rep) => rep.send("pong")).listen()