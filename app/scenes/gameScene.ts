import GameObject from '../objects/gameObject';
import Object1 from '../objects/object1';

class GameScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private objectGroup: GameObject[] = [];

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    init(data) {

    }

    preload() {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.add.sprite(100, 100, "mecha");
        this.objectGroup.push(new Object1(this, 200, 100));
    }

    create() {
    }

    update(time, delta) {
        for(let object of this.objectGroup)
        {
            object.update();
        }

        if (this.startKey.isDown) {
            this.input.stopPropagation();
            this.scene.start('TitleScene');
        }
    }
}

export default GameScene;