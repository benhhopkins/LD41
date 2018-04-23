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
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    }

    create() {
        var background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        var directions = this.add.image(this.sys.game.config.width / 2, 180, 'directions');
        var title = this.add.sprite(this.sys.game.config.width / 2, 40, 'title');
        title.play('titleFlash');
        var subtitle = this.add.sprite(this.sys.game.config.width / 2, 70, 'subtitle');
        subtitle.play('subtitleIdle');

        this.cameras.main.fadeIn(2000);
    }

    update(time, delta) {
        if (this.startKey.isDown) {
            //var sound = this.sound.add('sword');
            //sound.play();
            this.input.stopPropagation();
            this.scene.start('GameScene');
        }
    }
}

export default TitleScene;