/// <reference path="../../defs/phaser.d.ts"/>

class TitleScene extends Phaser.Scene {

    private progressBar: null;
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
        this.load.atlas('sprites', 'sprites.png', 'sprites.json');
        this.load.image('background', 'background.png');
        this.load.image('title', 'title.png');
        this.progressBar = this.add.graphics(0, 0);
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);

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

    onLoadComplete() {
        console.log('onLoadComplete');
        this.progressBar.destroy();
    }

    onLoadProgress(progress) {
        this.progressBar
            .clear()
            .fillStyle(0xffffff, 0.75)
            .fillRect(0, 0, 800 * progress, 50);
        console.log('progress', progress);
    }
}

export default TitleScene;