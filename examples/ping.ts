import { Server } from "../src"

//default address: localhost:3000
Server().get("/ping").handler(async (_, rep) => rep.send("pong")).listen()