/// <reference path="../../defs/phaser.d.ts"/>
import GameScene from '../scenes/gameScene';
import Unit from '../objects/unit';

export class Alien extends Unit {

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, 'alien', x, y);
    }

    created() {
        this.body.setSize(14, 14, true);

        this.unitStats.team = 1;

        this.unitStats.moveSpeed = 40;
        this.unitStats.jumpPower = 150;
        this.unitStats.jumpInterval = 200;

        this.unitStats.attackRange = 22;
        this.unitStats.attackPower = 20;
    }

    update() {
        super.update();
    }

    jump() {
        super.jump();
        if(this.unitInput.inputLeft)
            this.body.velocity.x -= 40;
        else if(this.unitInput.inputRight)
            this.body.velocity.x += 40;
    }
}

export default Alien;