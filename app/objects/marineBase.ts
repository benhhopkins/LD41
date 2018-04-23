/// <reference path="../../defs/phaser.d.ts"/>
import Unit from './unit';
import Marine from './marine';

export class MarineBase extends Unit {

    marineSpawnInterval: number = 20;
    marineCounter: number = 0;
    marinesToSpawn: number = 3;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, 'base', x, y, true);
        
    }

    created() {
        //this.body.setSize(10, 10, true);
        this.anims.play('marineBase');

        this.unitStats.health = 100;
    }

    update() {
        super.update();

        if(this.marinesToSpawn > 0) {
            this.marineCounter++;
            if(this.marineCounter > this.marineSpawnInterval) {
                this.gameScene.addUnit(new Marine(this.gameScene, this.getCenter().x, this.getCenter().y + 30));
                this.marineCounter = 0;
                this.marinesToSpawn--;
            }
        }
    }

    dieEffect() {
        this.gameScene.defeat();
    }
}

export default MarineBase;