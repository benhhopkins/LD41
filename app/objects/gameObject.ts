export class GameObject extends Phaser.GameObjects.Sprite {

    private startKey: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, animName: string, x: number, y: number) {
        super(scene, x, y, animName);
        this.scene.add.existing(this);
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
            this.anims.play("mechaAttack");
        }
    }
}

export default GameObject;