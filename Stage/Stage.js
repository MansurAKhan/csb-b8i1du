/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      }),
      new Costume("Space City 1", "./Stage/costumes/Space City 1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.myVariable = 0;
    this.vars.player1 = 109;
    this.vars.player2 = 0;
    this.vars.Player1Check = 446;
    this.vars.Player2Check = 0;
    this.vars.playerId = 1;
    this.vars.X1 = -100;
    this.vars.X2 = 30;
    this.vars.Y1 = 0;
    this.vars.Y2 = -20;
    this.vars.speedOfWalking = 0.05;
    this.vars.steps = 10;
  }
}
