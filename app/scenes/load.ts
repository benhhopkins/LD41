/// <reference path="../../defs/phaser.d.ts"/>

class LoadScene extends Phaser.Scene {

    private progressBar: Phaser.GameObjects.Graphics;

    constructor(test) {
        super({
            key: 'LoadScene'
        });
    }

    init(data) {
        console.log('init', data, this);
    }

    preload() {
        this.load.spritesheet('sprite1', 'sprites.png', {frameWidth: 32, frameHeight:32});
        this.load.image('background', 'background.png');
        this.load.image('title', 'title.png');
        this.progressBar = this.add.graphics({x: 0, y: 0});
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    create() {
    }

    update(time, delta) {
    }

    onLoadComplete() {
        this.scene.start('TitleScene');
    }

    onLoadProgress(progress) {
        this.progressBar
            .clear()
            .fillStyle(0xffffff, 0.75)
            .fillRect(0, 0, 800 * progress, 50);
        console.log('progress', progress);
    }
}

export default LoadScene;