/// <reference path="../../defs/phaser.d.ts"/>
import GameScene from '../scenes/gameScene';
import Unit from '../objects/unit';

export class Alien extends Unit {

    constructor(scene: GameScene, team: number, x: number, y: number) {
        super(scene, 'alien', team, x, y);
    }

    created() {
        this.body.setSize(14, 14, true);

        this.unitStats.moveSpeed = 40;
        this.unitStats.jumpPower = 180;

        this.unitStats.attackRange = 6;
        this.unitStats.attackPower = 20;

        this.unitAI.jumpInterval = 200;
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

    attackEffect() {
        var sound = this.scene.sound.add('sword');
        sound.play();
    }

    attackTargetEffect(target: Unit) {
        this.gameScene.addEffect('alienHit', target.getCenter().x, target.getCenter().y);
    }

    dieEffect() {
        var sound = this.scene.sound.add('orcdeath');
        sound.play();
    }
}

export default Alien;