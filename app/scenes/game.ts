import GameObject from '../objects/gameObject';
import Object1 from '../objects/object1';
import makeAnimations from '../animations/animations'

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
        makeAnimations(this);

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.add.sprite(100, 100, "sprite1");
        this.objectGroup.push(new Object1(this, 400, 100));
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