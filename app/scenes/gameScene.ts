import Unit from '../objects/unit';
import Tilemap from '../tiles/tilemap';
import Dropship from '../objects/dropship';
import { Player, PlayerType } from '../other/player';


class GameScene extends Phaser.Scene {

    private endKey: Phaser.Input.Keyboard.Key;
    gamepad: Phaser.Input.Gamepad.Gamepad;
    gamepadConfig: object;

    worldSize = Phaser.Math.Vector2;

    units: Phaser.GameObjects.Group;
    unitsByTeam: Phaser.GameObjects.Group[];
    tilemap: Tilemap;

    multiplayer: true;
    arcadeCab: true;
    players: Player[];

    effects: Phaser.GameObjects.Sprite.Group;

    centerText: Phaser.GameObjects.Sprite;
    timedEvent: Phaser.Time.TimerEvent;
    readyToLeave: number = 0;

    level: number = 1;
    levelText: Phaser.GameObjects.Text;

    hpBars: Phaser.GameObjects.Graphics;

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    init(data) {
    }

    preload() {
    }

    create() {
        this.endKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.readyToLeave = 0;

        let bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setScrollFactor(0, 0);

        this.effects = new Phaser.GameObjects.Group(this);

        this.input.gamepad.on('down', function (pad: any, button: any, value: any, data: any) {
            this.gamepad = pad;   
        });
        this.gamepadConfig = Phaser.Input.Gamepad.Configs.XBOX_360;

        this.units = new Phaser.GameObjects.Group(this);
        this.worldSize = new Phaser.Math.Vector2(1000, 500);

        // this also sets the bases
        this.tilemap = new Tilemap(this, this.worldSize);

        this.players = [];
        this.players.push(new Player(this, PlayerType.Human, 0));
        this.players.push(new Player(this, PlayerType.Human, 1));
        this.players[0].created();
        this.players[1].created();

        //this.cameras.main.startFollow(dropship, true);
        this.cameras.main.setBounds(0, 0, this.worldSize.x, this.worldSize.y);
        //this.cameras.main.fadeIn(1000);

        this.centerText = this.add.sprite(this.sys.game.config.width / 2, 60, 'text');
        this.centerText.play('textvictory');
        this.centerText.setVisible(false);
        this.centerText.setScrollFactor(0, 0);

        this.hpBars = this.add.graphics();

        this.loadLevelParams();
    }

    update(time, delta) {
        if(this.readyToLeave == 1) {
            this.scene.start('TitleScene');
            return;
        }
        else if(this.readyToLeave == 2) {
            this.scene.start('GameScene');
            return;
        }

        // would rather do something like this for more control, but can't get it to not jitter the dropship
        //this.cameras.main.scrollX = Math.round(this.dropship.getCenter().x) - this.sys.game.config.width / 2;
        //this.cameras.main.scrollY = Math.round(this.dropship.getCenter().y) - this.sys.game.config.height / 2;

        this.hpBars.clear();
        for(let object of this.units.getChildren()) {
            object.update(delta);
            if(object.body && object.active && object.unitAI.targetPriority > 0) {
                if(object.unitStats.team == 0)
                    this.hpBars.fillStyle(Phaser.Display.Color.GetColor(8, 137, 210));
                else
                    this.hpBars.fillStyle(Phaser.Display.Color.GetColor(179, 7, 45));
                this.hpBars.fillRect(object.body.left, object.body.bottom + 5, object.body.width * (object.unitStats.health / object.unitStats.maxHealth), 5);
            }
        }

        for(let effect of this.effects.getChildren()) {
            if(effect.anims.getProgress() == 1)
                effect.destroy();
        }

        if (this.endKey.isDown) {
            this.defeat();
        }
    }

    addUnit(unit: Unit): Unit {
        unit.created();
        if(!unit.isBuilding)
            this.physics.add.collider(unit, this.tilemap.mapCollision);
        this.units.add(unit);
        this.players[unit.unitStats.team].units.add(unit);

        return unit;
    }

    addEffect(name: string, effectX: number, effectY: number, flippedX?: boolean, angle?: number) {
        if(flippedX === undefined)
            flippedX = Math.random() < 0.5;
        if(angle === undefined)
            angle = 0;

        let effect = this.add.sprite(effectX, effectY, 'effect');
        effect.play('effect' + name);
        effect.flipX = flippedX;
        effect.setAngle(angle);
        this.effects.add(effect);
    }

    victory() {
        this.centerText.play('textvictory');
        this.centerText.setVisible(true);
        this.cameras.main.fadeOut(3500);
        this.timedEvent = this.time.delayedCall(3500, this.continue, [], this);
    }

    defeat() {
        this.centerText.play('textdefeat');
        this.centerText.setVisible(true);
        this.cameras.main.fadeOut(3500);
        this.timedEvent = this.time.delayedCall(3500, this.backToTitle, [], this);
    }

    backToTitle() {
        this.readyToLeave = 1;
    }

    continue() {
        this.readyToLeave = 2;
        this.level++;
    }

    loadLevelParams() {
        this.levelText = this.add.text(this.sys.game.config.width / 2, 60, 'Level ' + String(this.level)).setFontFamily('Impact').setFontSize(16).setColor('#dd1200');
        this.levelText.setScrollFactor(0, 0);
        this.timedEvent = this.time.delayedCall(3000, this.clearLevelText, [], this);
    }

    clearLevelText() {
        this.levelText.destroy();
    }
}

export default GameScene;