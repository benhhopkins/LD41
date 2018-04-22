import Unit from '../objects/unit';
import Tilemap from '../tiles/tilemap';
import Dropship from '../objects/dropship';
import Marine from '../objects/marine';
import Alien from '../objects/alien';

class GameScene extends Phaser.Scene {

    private endKey: Phaser.Input.Keyboard.Key;
    gamepad: Phaser.Input.Gamepad.Gamepad;
    gamepadConfig: object;

    worldSize = Phaser.Math.Vector2;

    dropship: Dropship;
    units: Phaser.GameObjects.Group;
    unitsByTeam: Phaser.GameObjects.Group[];
    tilemap: Tilemap;

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

        this.input.gamepad.on('down', function (pad: any, button: any, value: any, data: any) {
            this.gamepad = pad;   
        });
        this.gamepadConfig = Phaser.Input.Gamepad.Configs.XBOX_360;

        this.units = new Phaser.GameObjects.Group(this);
        this.unitsByTeam = [];
        for(let i: number = 0; i < 2; i++)
            this.unitsByTeam.push(new Phaser.GameObjects.Group(this));
        this.worldSize = new Phaser.Math.Vector2(4000, 500);

        this.tilemap = new Tilemap(this, this.worldSize);

        let dropship = new Dropship(this, 150, 50);
        this.physics.add.collider(dropship, this.tilemap.mapCollision);
        this.dropship = dropship;

        this.cameras.main.startFollow(this.dropship, true);
        this.cameras.main.setBounds(0, 0, this.worldSize.x, this.worldSize.y);

        for(let i: number = 0; i < 5; i++)
        {
            let marine = new Marine(this, 100 + i * 20, 100);
            marine.created();
            this.physics.add.collider(marine, this.tilemap.mapCollision);
            this.units.add(marine);
            this.unitsByTeam[0].add(marine);
        }

        for(let i: number = 0; i < 5; i++)
        {
            let alien = new Alien(this, 700 + i * 20, 100);
            alien.created();
            this.physics.add.collider(alien, this.tilemap.mapCollision);
            //this.physics.add.overlap(alien, this.tilemap.mapCollision, this.testCallback, null, this);
            this.units.add(alien);
            this.unitsByTeam[1].add(alien);
        }
    }

    update(time, delta) {
        
        // would rather do something like this for more control, but can't get it to not jitter the dropship
        //this.cameras.main.scrollX = Math.round(this.dropship.getCenter().x) - this.sys.game.config.width / 2;
        //this.cameras.main.scrollY = Math.round(this.dropship.getCenter().y) - this.sys.game.config.height / 2;
        this.dropship.update();

        for(let object of this.units.getChildren())
        {
            object.update(delta);
        }

        if (this.endKey.isDown) {
            this.input.stopPropagation();
            this.scene.start('TitleScene');
        }
    }
}

export default GameScene;