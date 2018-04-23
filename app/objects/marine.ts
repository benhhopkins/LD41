/// <reference path="../../defs/phaser.d.ts"/>
import GameScene from '../scenes/gameScene';
import Unit from '../objects/unit';

export class Marine extends Unit {

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, 'marine', x, y);
        
    }

    created() {
        this.body.setSize(10, 10, true);

        this.unitStats.attackRange = 160;
        this.unitStats.attackPower = 5;
    }

    update() {
        super.update();
    }

    attackEffect() {
        this.gameScene.addEffect('marineFire', 
            this.getCenter().x + (this.flipX ? -10 : 10),
            this.getCenter().y, this.flipX);
        
        var sound = this.scene.sound.add('rifle');
        sound.play();
    }

    attackTargetEffect(target: Unit) {
        this.gameScene.addEffect('marineHit',
            target.getCenter().x,
            target.getCenter().y);
    }

    dieEffect() {
        var sound = this.scene.sound.add('marinedeath');
        sound.play();
    }
}

export default Marine;