import makeAnimations from '../animations/animations'

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
        // dropship
        this.load.spritesheet('dropship', 'dropship.png', {frameWidth: 48, frameHeight:16});

        // units
        this.load.spritesheet('marine', 'marine.png', {frameWidth: 16, frameHeight:16});
        this.load.spritesheet('alien', 'alien.png', {frameWidth: 24, frameHeight:24});

        // tiles
        this.load.spritesheet('ground', 'ground.png', {frameWidth: 16, frameHeight:16});

        

        this.load.image('background', 'background.png');
        this.load.image('title', 'title.png');
        this.progressBar = this.add.graphics({x: 0, y: 0});
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    create() {
        makeAnimations(this);
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