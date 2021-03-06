/// <reference path="../../defs/phaser.d.ts"/>
import Unit from './unit';
import Marine from './marine';
import Sniper from './sniper';
import Alien from './alien';

export class Base extends Unit {

    marineSpawnInterval: number = 40;
    marineCounter: number = 0;
    marinesToSpawn: number = 8;

    constructor(scene: GameScene, team: number, x: number, y: number) {
        super(scene, 'base', team, x, y, true);
        
    }

    created() {
        //this.body.setSize(10, 10, true);
        this.playAnimation('marineBase');

        this.unitStats.health = 300;
        this.unitStats.maxHealth = 300;

        this.unitAI.targetPriority = 1;
    }

    update() {
        super.update();

        if(this.marinesToSpawn > 0) {
            this.marineCounter++;
            if(this.marineCounter > this.marineSpawnInterval) {

                if(this.marinesToSpawn == 1)
                    this.gameScene.addUnit(new Sniper(this.gameScene, this.unitStats.team, this.getCenter().x, this.getCenter().y + 30));
                else if(this.marinesToSpawn > 5)
                    this.gameScene.addUnit(new Alien(this.gameScene, this.unitStats.team, this.getCenter().x, this.getCenter().y + 30));
                else
                    this.gameScene.addUnit(new Marine(this.gameScene, this.unitStats.team, this.getCenter().x, this.getCenter().y + 30));

                this.marineCounter = 0;
                this.marinesToSpawn--;
            }
        }
    }

    dieEffect() {
        this.gameScene.defeat();
    }
}

export default Base;