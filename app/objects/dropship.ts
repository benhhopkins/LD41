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
        if(this.up.isDown || 
            (this.gameScene.gamepad && this.gameScene.gamepad.buttons[this.gameScene.gamepadConfig.UP].pressed)) {
            this.body.velocity.y -= 2;        
        }
        else {
            this.body.velocity.y += 0.5;
        }
        if(this.down.isDown) {
            this.body.velocity.y += 2;        
        }
        this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y, this.maxUpVel, this.maxDownVel);
        if(this.body.velocity.y > this.maxUpVel && Phaser.Input.Keyboard.JustDown(this.up)) {
            if(this.body.touching.down)
                this.body.velocity.y -= 60;
            else
                this.body.velocity.y -= 30;
        }
        else if(this.body.velocity.y < this.maxDownVel && Phaser.Input.Keyboard.JustDown(this.down)) {
            this.body.velocity.y += 30;
        }
        this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y, this.maxUpVel, this.maxDownVel);


        if(this.left.isDown) {
            this.body.velocity.x -= 3;
            this.flipX = true;
        }
        if(this.right.isDown) {
            this.body.velocity.x += 3;
            this.flipX = false;
        }
        if(!this.left.isDown && !this.right.isDown) {
            this.body.velocity.x -= Math.sign(this.body.velocity.x) * 2;
            if(Math.abs(this.body.velocity.x) < 2)
                this.body.velocity.x = 0;
        }
        this.body.velocity.x = Phaser.Math.Clamp(this.body.velocity.x, -this.maxSpeed, this.maxSpeed);
        if(this.body.velocity.x > -this.maxSpeed && Phaser.Input.Keyboard.JustDown(this.left)) {
            this.body.velocity.x -= 30;
        }
        else if(this.body.velocity.x < this.maxSpeed && Phaser.Input.Keyboard.JustDown(this.right)) {
            this.body.velocity.x += 30;
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
            this.pickingUp();
        }
        else if(Phaser.Input.Keyboard.JustDown(this.dropoff) ||
                (this.dropoff.isDown && this.dropInterval <= 0)) {
            this.droppingOff();
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
                Math.abs(object.getCenter().x - this.getCenter().x) < 50 - (object.getCenter().y - this.getCenter().y) / 3)
            {
                if(object.getCenter().y - this.getCenter().y < 10) {
                    
                    object.setActive(false);
                    object.setVisible(false);
                    this.cargoBay.push(object);
                }
                else {
                    object.body.velocity.y -= Math.min(25, 500 / (object.getCenter().y - this.getCenter().y));
                }
            }
        }
    }

    droppingOff() {
        if(this.cargoBay.length > 0) {
            this.dropInterval = 40;

            let object = this.cargoBay.pop();
            object.setActive(true);
            object.setVisible(true);
            object.body.position = new Phaser.Math.Vector2(this.getCenter().x, this.getCenter().y + 3);
            object.body.velocity = new Phaser.Math.Vector2(this.body.velocity.x / 1.3, this.body.velocity.y / 1.3 - 10);
        }
    }
}

export default Dropship;