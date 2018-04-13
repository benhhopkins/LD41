/// <reference path="../../defs/phaser.d.ts"/>

export class GameObject extends Phaser.GameObjects.Sprite {

    private startKey: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, spriteAtlas: string, animName: string, x: number, y: number) {
        super(scene, x, y, spriteAtlas);
        this.scene.add.existing(this);
        //this.anims.play(animName);
        this.startKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }

    init(data) {
        
    }

    preload() {
    }

    create() {
    }

    update() {
        if (this.startKey.isDown) {
            this.anims.play("flag");
        }
    }
}

export default GameObject;