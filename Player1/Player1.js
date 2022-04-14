/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dot-a", "./Player1/costumes/dot-a.svg", { x: 52, y: 67 }),
      new Costume("dot-b", "./Player1/costumes/dot-b.svg", { x: 65, y: 67 }),
      new Costume("dot-c", "./Player1/costumes/dot-c.svg", {
        x: 50.53907324990831,
        y: 68.96764494984302
      }),
      new Costume("dot-d", "./Player1/costumes/dot-d.svg", {
        x: 56.58074394930321,
        y: 66.76919584395038
      })
    ];

    this.sounds = [new Sound("bark", "./Player1/sounds/bark.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "player 1" },
        this.whenIReceivePlayer1
      ),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin3),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin4)
    ];
  }

  *whenIReceiveJoin() {
    this.visible = true;
    while (true) {
      if (this.stage.vars.playerId == 1) {
        while (true) {
          this.stage.vars.Player1Check += 1;
          yield* this.wait(1);
          yield;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.costume = "dot-a";
    this.visible = false;
    this.stage.vars.X1 = -100;
    this.stage.vars.X2 = 100;
    this.stage.vars.Y1 = -20;
    this.stage.vars.Y2 = -20;
  }

  *p1f() {
    this.costume = "dot-d";
    yield* this.wait(2);
    this.costume = "dot-a";
  }

  *whenIReceiveJoin2() {
    while (true) {
      this.goto(this.stage.vars.X1, this.stage.vars.Y1);
      yield;
    }
  }

  *whenIReceivePlayer1() {
    this.stage.vars.speedOfWalking = 0.05;
    this.stage.vars.steps = 10;
    while (true) {
      if (this.keyPressed("up arrow")) {
        yield* this.walking();
        this.stage.vars.Y1 += this.stage.vars.steps;
      }
      if (this.keyPressed("down arrow")) {
        yield* this.walking();
        this.stage.vars.Y1 += -1 * this.stage.vars.steps;
      }
      if (this.keyPressed("left arrow")) {
        yield* this.walking();
        this.stage.vars.X1 += -1 * this.stage.vars.steps;
      }
      if (this.keyPressed("right arrow")) {
        yield* this.walking();
        this.stage.vars.X1 += this.stage.vars.steps;
      }
      yield;
    }
  }

  *walking() {
    this.costume = "dot-b";
    yield* this.wait(this.stage.vars.speedOfWalking);
    this.costume = "dot-c";
    yield* this.wait(this.stage.vars.speedOfWalking);
    this.costume = "dot-a";
  }

  *whenIReceiveJoin3() {
    while (true) {
      if (
        this.keyPressed("t") &&
        /* no username */ "" == this.stage.vars.player1
      ) {
        yield* this.wait(1);
        yield* this.askAndWait("Enter Text");
        yield* this.sayAndWait(this.answer, 2);
      }
      yield;
    }
  }

  *whenIReceiveJoin4() {
    while (true) {
      if (this.keyPressed("f")) {
        yield* this.p1f();
      }
      yield;
    }
  }
}
