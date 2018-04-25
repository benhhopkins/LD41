/// <reference path="../../defs/phaser.d.ts"/>
import GameScene from '../scenes/gameScene';
import Unit from '../objects/unit';

export class Sniper extends Unit {

    constructor(scene: GameScene, team: number, x: number, y: number) {
        super(scene, 'sniper', team, x, y);
        
    }

    created() {
        this.body.setSize(10, 10, true);

        this.unitStats.attackRange = 200;
        this.unitStats.attackPower = 50;
        this.unitStats.windupFrames = 120;
        this.unitStats.cooldownFrames = 120;
    }

    update() {
        super.update();
    }

    attackEffect() {
        this.gameScene.addEffect('sniperFire', 
            this.getCenter().x + (this.flipX ? -20 : 20),
            this.getCenter().y, this.flipX);
        
        var sound = this.scene.sound.add('sniperFire');
        sound.play();
    }

    attackTargetEffect(target: Unit) {
        this.gameScene.addEffect('sniperHit',
            target.getCenter().x,
            target.getCenter().y);
    }

    dieEffect() {
        var sound = this.scene.sound.add('marinedeath');
        sound.play();
    }
}

export default Sniper;