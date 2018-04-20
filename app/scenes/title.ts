/// <reference path="../../defs/phaser.d.ts"/>

class TitleScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;

    constructor(test) {
        super({
            key: 'TitleScene'
        });
    }

    init(data) {
        console.log('init', data, this);
    }

    preload() {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    create() {
        var background = this.add.image(400, 300, 'background');
        background.alpha = 0.5;
        var title = this.add.image(400, 100, 'title');
    }

    update(time, delta) {
        if (this.startKey.isDown) {
            this.input.stopPropagation();
            this.scene.start('GameScene');
        }
    }
}

export default TitleScene;