import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Giga from "./Giga/Giga.js";
import Player1 from "./Player1/Player1.js";
import Player2 from "./Player2/Player2.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Giga: new Giga({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Player1: new Player1({
    x: -100,
    y: -20,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Player2: new Player2({
    x: 100,
    y: -20,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  })
};

const project = new Project(stage, sprites);
export default project;
