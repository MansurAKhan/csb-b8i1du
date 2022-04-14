/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Giga extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("giga-a", "./Giga/costumes/giga-a.svg", { x: 72, y: 96 }),
      new Costume("giga-b", "./Giga/costumes/giga-b.svg", { x: 72, y: 96 }),
      new Costume("giga-c", "./Giga/costumes/giga-c.svg", { x: 73, y: 96 }),
      new Costume("giga-d", "./Giga/costumes/giga-d.svg", { x: 73, y: 96 })
    ];

    this.sounds = [new Sound("pop", "./Giga/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.say("Loading...");
    this.goto(0, 0);
    this.visible = true;
    this.stage.vars.player1 = this.stage.vars.Player1Check;
    this.stage.vars.player2 = this.stage.vars.Player2Check;
    yield* this.wait(5);
    if (this.stage.vars.Player1Check == this.stage.vars.player1) {
      this.stage.vars.playerId = 1;
      this.stage.vars.Player1Check = 0;
      yield* this.sayAndWait("You are Orange Dog", 2);
      this.broadcast("join");
      this.broadcast("player 1");
      this.visible = false;
    } else {
      if (this.stage.vars.Player2Check == this.stage.vars.player2) {
        this.stage.vars.playerId = 1;
        this.stage.vars.Player2Check = 0;
        yield* this.sayAndWait("You are Grey Dog", 2);
        this.broadcast("join");
        this.broadcast("player 2");
        this.visible = false;
      } else {
        yield* this.sayAndWait("Sever Full!", 2);
        /* TODO: Implement stop all */ null;
      }
    }
  }
}
