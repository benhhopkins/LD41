/// <reference path="../../defs/phaser.d.ts"/>
import GameScene from '../scenes/gameScene';
import Unit from '../objects/unit';

export class Marine extends Unit {

    private startKey: Phaser.Input.Keyboard.Key;
    private jumpKey: Phaser.Input.Keyboard.Key;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, 'marine', x, y);

        this.startKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        
    }

    created() {
        this.body.setSize(10, 10, true);

        this.unitStats.attackRange = 200;
        this.unitStats.attackPower = 5;
    }

    update() {
        super.update();
    }
}

export default Marine;