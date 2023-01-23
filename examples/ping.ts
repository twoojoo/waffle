import { Waffle } from "../src"

//default address: 0.0.0.0:80
Waffle().GET("/ping").handler(async (_, rep) => rep.send("pong")).listen()