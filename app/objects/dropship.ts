import GameScene from '../scenes/gameScene';

export class Dropship extends Phaser.GameObjects.Sprite {

    gameScene: GameScene;

    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    pickup: Phaser.Input.Keyboard.Key;
    dropoff: Phaser.Input.Keyboard.Key;
    munitions: Phaser.Input.Keyboard.Key;

    maxUpVel: number = -150;
    maxDownVel: number = 200;
    maxSpeed: number = 200;

    health: number = 100;
    cargoBaySize: number = 3;
    cargoBay: Unit[];
    dropInterval: number = 0;

    glideInterval : number = 20;
    glideCounter : number = 0;

    pullSound: Phaser.Sound.BaseSound;
    pickupSound: Phaser.Sound.BaseSound;
    dropSound: Phaser.Sound.BaseSound;
    pullEffect: Phaser.GameObjects.Sprite;
    cargoText: Phaser.GameObjects.Sprite;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "dropship");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.gameScene = scene;

        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.pickup = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.dropoff = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.munitions = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);    

        this.cargoBay = [];

        this.pullSound = scene.sound.add('pull');
        this.pickupSound = scene.sound.add('pickup');
        this.dropSound = scene.sound.add('dropoff');
        this.pullEffect = scene.add.sprite(0, 0, 'pull');
        this.pullEffect.setAlpha(0.3, 0.3, 0.02, 0.02);
        this.pullEffect.play('effectpull');
        this.pullEffect.setVisible(false);

        this.cargoText = scene.add.sprite(this.scene.sys.game.config.width / 2, 100, 'text');
        this.cargoText.play('textcargoFull');
        this.cargoText.setVisible(false);
        this.cargoText.setScrollFactor(0, 0);
    }
    
    update() {
        if(!this.anims.currentAnim)
        {
            this.anims.play('dropshipIdle');
            this.body.allowGravity = false;
        }

        this.updateControl();
        
    }

    updateControl() {
        this.glideCounter++;

        if(this.up.isDown || 
            (this.gameScene.gamepad && this.gameScene.gamepad.buttons[this.gameScene.gamepadConfig.UP].pressed)) {
            this.body.velocity.y -= 2;
            if(this.glideCounter > this.glideInterval) {
                this.glideCounter = 0;
                this.gameScene.addEffect('dropshipGlide', this.getCenter().x - 12, this.getCenter().y + 8, false);
                this.gameScene.addEffect('dropshipGlide', this.getCenter().x + 12, this.getCenter().y + 8, false);
            }
        }
        else {
            this.body.velocity.y += 0.5;
        }
        if(this.down.isDown) {
            this.body.velocity.y += 2;        
            if(this.glideCounter > this.glideInterval) {
                this.glideCounter = 0;
                this.gameScene.addEffect('dropshipGlide', this.getCenter().x, this.getCenter().y - 8, false, 180);
            }
        }
        this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y, this.maxUpVel, this.maxDownVel);
        if(this.body.velocity.y > this.maxUpVel && Phaser.Input.Keyboard.JustDown(this.up)) {
            if(this.body.touching.down)
                this.body.velocity.y -= 60;
            else
                this.body.velocity.y -= 30;

            this.gameScene.addEffect('dropshipThrust', this.getCenter().x - 12, this.getCenter().y + 8, false);
            this.gameScene.addEffect('dropshipThrust', this.getCenter().x + 12, this.getCenter().y + 8, false);
        }
        else if(this.body.velocity.y < this.maxDownVel && Phaser.Input.Keyboard.JustDown(this.down)) {
            this.body.velocity.y += 30;

            this.gameScene.addEffect('dropshipThrust', this.getCenter().x, this.getCenter().y - 8, false, 180);
        }
        this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y, this.maxUpVel, this.maxDownVel);


        if(this.left.isDown) {
            this.body.velocity.x -= 3;
            this.flipX = true;
            if(this.glideCounter > this.glideInterval) {
                this.glideCounter = 0;
                this.gameScene.addEffect('dropshipGlide', this.getCenter().x + 26, this.getCenter().y, false, -90);
            }
        }
        if(this.right.isDown) {
            this.body.velocity.x += 3;
            this.flipX = false;
            if(this.glideCounter > this.glideInterval) {
                this.glideCounter = 0;
                this.gameScene.addEffect('dropshipGlide', this.getCenter().x - 26, this.getCenter().y, false, 90);
            }
        }
        if(!this.left.isDown && !this.right.isDown) {
            this.body.velocity.x -= Math.sign(this.body.velocity.x) * 2;
            if(Math.abs(this.body.velocity.x) < 2)
                this.body.velocity.x = 0;
        }
        this.body.velocity.x = Phaser.Math.Clamp(this.body.velocity.x, -this.maxSpeed, this.maxSpeed);
        if(this.body.velocity.x > -this.maxSpeed && Phaser.Input.Keyboard.JustDown(this.left)) {
            this.body.velocity.x -= 30;
            this.gameScene.addEffect('dropshipThrust', this.getCenter().x + 26, this.getCenter().y, false, -90);
        }
        else if(this.body.velocity.x < this.maxSpeed && Phaser.Input.Keyboard.JustDown(this.right)) {
            this.body.velocity.x += 30;
            this.gameScene.addEffect('dropshipThrust', this.getCenter().x - 26, this.getCenter().y, false, 90);
        }
        this.body.velocity.x = Phaser.Math.Clamp(this.body.velocity.x, -this.maxSpeed, this.maxSpeed);

        if(this.body.position.y < Math.abs(this.maxUpVel / 2)) {
            this.body.velocity.y = Math.max(-2 * this.body.position.y, this.body.velocity.y);
        }
        if(this.body.position.x < Math.abs(this.maxSpeed / 4)) {
            this.body.velocity.x = Math.max(-4 * this.body.position.x, this.body.velocity.x);
        }
        if(this.body.position.x + this.width > this.gameScene.worldSize.x - Math.abs(this.maxSpeed / 4)) {
            this.body.velocity.x = Math.min(4 * (this.gameScene.worldSize.x - this.width - this.body.position.x), this.body.velocity.x);
        }

        if(this.body.touching.down) {
            this.body.velocity.x -= Math.sign(this.body.velocity.x) * 5;
            if(Math.abs(this.body.velocity.x) < 5)
                this.body.velocity.x = 0;
        }

        if(this.pickup.isDown) {
            if(this.cargoBay.length < this.cargoBaySize) {
                this.pickingUp();
                if(!this.pullSound.isPlaying)
                    this.pullSound.play();
                this.pullEffect.setVisible(true);
                this.pullEffect.setPosition(this.getCenter().x, this.getCenter().y + 70);

                this.cargoText.setVisible(false);
            }
            else {
                this.cargoText.setVisible(true);
                this.pullEffect.setVisible(false);                
            }
        }
        else {
            if(this.pullSound.isPlaying)
                this.pullSound.stop();
            this.pullEffect.setVisible(false);            
            this.cargoText.setVisible(false);

            if(Phaser.Input.Keyboard.JustDown(this.dropoff) ||
                    (this.dropoff.isDown && this.dropInterval <= 0)) {
                this.droppingOff();
            }
        }

        if(this.dropInterval > 0)
            this.dropInterval--;
    }

    pickingUp() {
        for(let object of this.gameScene.unitsByTeam[0].getChildren()) {
            if(object.active &&
                object.unitStats.health > 0 &&
                object.body &&
                object.getCenter().y - this.getCenter().y > -10 &&
                object.getCenter().y - this.getCenter().y < 250 &&
                Math.abs(object.getCenter().x - this.getCenter().x) < 32)
            {
                if(object.getCenter().y - this.getCenter().y < 10) {
                    
                    object.setActive(false);
                    object.setVisible(false);
                    this.cargoBay.push(object);

                    this.pickupSound.play();
                }
                else {
                    object.body.velocity.y -= Math.min(30, 500 / (object.getCenter().y - this.getCenter().y));
                }
            }
        }
    }

    droppingOff() {
        if(this.cargoBay.length > 0) {
            this.dropInterval = 20;

            let object = this.cargoBay.pop();
            object.setActive(true);
            object.setVisible(true);
            object.body.position = new Phaser.Math.Vector2(this.getCenter().x, this.getCenter().y - 3);
            let addXVel = (this.left.isDown ? -10 : 0) + (this.right.isDown ? 10 : 0);
            let addYVel = (this.up.isDown ? -40 : 0) + (this.down.isDown ? 5 : 0);
            object.body.velocity = new Phaser.Math.Vector2(this.body.velocity.x / 1.3 + addXVel, this.body.velocity.y - 10 + addYVel);

            this.dropSound.play();
        }
    }
}

export default Dropship;