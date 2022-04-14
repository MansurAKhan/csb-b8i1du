/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dot-a", "./Player2/costumes/dot-a.svg", {
        x: 51.74422418845441,
        y: 66.71217683226618
      }),
      new Costume("dot-b", "./Player2/costumes/dot-b.svg", {
        x: 64.07274289802126,
        y: 67.00011373459058
      }),
      new Costume("dot-c", "./Player2/costumes/dot-c.svg", {
        x: 50.539076499816616,
        y: 68.96764989968612
      }),
      new Costume("dot-d", "./Player2/costumes/dot-d.svg", {
        x: 56.58074894930317,
        y: 66.76919084395037
      })
    ];

    this.sounds = [new Sound("bark", "./Player2/sounds/bark.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "player 2" },
        this.whenIReceivePlayer2
      ),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin2),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin3),
      new Trigger(Trigger.BROADCAST, { name: "join" }, this.whenIReceiveJoin4)
    ];
  }

  *whenIReceiveJoin() {
    this.visible = true;
    while (true) {
      if (this.stage.vars.playerId == 2) {
        while (true) {
          this.stage.vars.Player2Check += 1;
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
  }

  *p2f() {
    this.costume = "dot-d";
    yield* this.wait(2);
    this.costume = "dot-a";
  }

  *walking() {
    this.costume = "dot-b";
    yield* this.wait(this.stage.vars.speedOfWalking);
    this.costume = "dot-c";
    yield* this.wait(this.stage.vars.speedOfWalking);
    this.costume = "dot-a";
  }

  *whenIReceivePlayer2() {
    this.stage.vars.speedOfWalking = 0.05;
    this.stage.vars.steps = 10;
    while (true) {
      if (this.keyPressed("up arrow")) {
        yield* this.walking();
        this.stage.vars.Y2 += this.stage.vars.steps;
      }
      if (this.keyPressed("down arrow")) {
        yield* this.walking();
        this.stage.vars.Y2 += -1 * this.stage.vars.steps;
      }
      if (this.keyPressed("left arrow")) {
        yield* this.walking();
        this.stage.vars.X2 += -1 * this.stage.vars.steps;
      }
      if (this.keyPressed("right arrow")) {
        yield* this.walking();
        this.stage.vars.X2 += this.stage.vars.steps;
      }
      yield;
    }
  }

  *whenIReceiveJoin2() {
    while (true) {
      this.goto(this.stage.vars.X2, this.stage.vars.Y2);
      yield;
    }
  }

  *whenIReceiveJoin3() {
    while (true) {
      if (this.keyPressed("r")) {
        yield* this.wait(1);
        yield* this.askAndWait("Enter Text");
        yield* this.sayAndWait(this.answer, 2);
      }
      yield;
    }
  }

  *whenIReceiveJoin4() {
    while (true) {
      if (this.keyPressed("g")) {
        yield* this.p2f();
      }
      yield;
    }
  }
}
