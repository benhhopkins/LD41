/// <reference path="../../defs/phaser.d.ts"/>
import Unit from './unit';
import Alien from './alien';

export class AlienBase extends Unit {

    alienSpawnInterval: number = 30;
    alienCounter: number = 0;
    aliensToSpawn: number = 2;

    constructor(scene: GameScene, team: number, x: number, y: number) {
        super(scene, 'base', team, x, y, true);
        
    }

    created() {
        //this.body.setSize(10, 10, true);
        this.anims.play('alienBase');
        this.unitStats.health = 100;
    }

    update() {
        super.update();

        if(this.aliensToSpawn > 0) {
            this.alienCounter++;
            if(this.alienCounter > this.alienSpawnInterval) {
                this.gameScene.addUnit(new Alien(this.gameScene, this.unitStats.team, this.getCenter().x, this.getCenter().y + 30));
                this.alienCounter = 0;
                this.aliensToSpawn--;
            }
        }
    }

    dieEffect() {
        this.gameScene.victory();
    }
}

export default AlienBase;