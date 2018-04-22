import GameScene from '../scenes/gameScene';
import '../other/util';
import { DistanceSq } from '../other/util';

enum UnitState {
    Idle = 0,
    Windup,
    Cooldown,
    Hurt
}

class UnitStats {
    team: number = 0;

    hasGravity: boolean = true;
    moveSpeed: number = 30;
    acceleration: number = 3;
    jumpPower: number = 70;
    jumpInterval: number = 500;
    jumpCountdown: number = 500;
    
    health: number = 100;
    aquireRange: number = 300;
    attackPower: number = 10;
    attackRange: number = 100;
    windupFrames: number = 20;
    cooldownFrames: number = 20;
    hurtFrames: number = 10;
    currentActionFrames: number = 0;
}

class UnitInput {
    inputUp: boolean = false;
    inputDown: boolean = false;
    inputLeft: boolean = false;
    inputRight: boolean = false;
    inputJump: boolean = false;
    inputAttack: boolean = false;    
}

export class Unit extends Phaser.Physics.Arcade.Sprite {

    gameScene: GameScene;
    animName: string;

    unitState: UnitState;
    unitStats: UnitStats;
    unitInput: UnitInput;
    unitTarget: Unit;

    constructor(scene: GameScene, animName: string, x: number, y: number) {
        super(scene, x, y, animName);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.gameScene = scene;
        this.animName = animName;
        
        this.unitState = UnitState.Idle;
        this.unitStats = new UnitStats();
        this.unitInput = new UnitInput();
        this.unitTarget = null;
    }

    created() {

    }
    
    update() {
        if(this.active) {
            this.updateState();
            this.updateAI();
            this.updateControl();
            this.updateAnimations();        
        }
    }

    updateState() {
        if(this.unitState != UnitState.Idle)
        {
            this.unitStats.currentActionFrames++;
            if(this.unitState == UnitState.Hurt)
            {
                if(this.unitStats.currentActionFrames >= this.unitStats.hurtFrames)
                    this.unitState = UnitState.Idle;
            }
            else if(this.unitState == UnitState.Windup)
            {
                if(this.unitStats.currentActionFrames >= this.unitStats.windupFrames)
                {
                    this.unitState = UnitState.Cooldown;
                    this.unitStats.currentActionFrames = 0;
                    this.executeAttack();
                }
            }
            else if(this.unitState == UnitState.Cooldown)
            {
                if(this.unitStats.currentActionFrames >= this.unitStats.cooldownFrames)
                    this.unitState = UnitState.Idle;
            }
        }
    }

    updateAI() {
        this.refreshTarget();

        if(!this.unitTarget)
        {
            if(this.unitStats.team == 0) {
                this.unitInput.inputRight = true;
                this.unitInput.inputLeft = false;
            }
            else {
                this.unitInput.inputRight = false;
                this.unitInput.inputLeft = true;
            }
        }
        else
        {
            if(this.body.position.x < this.unitTarget.body.position.x) {
                this.unitInput.inputRight = true;
                this.unitInput.inputLeft = false;
            }
            else {
                this.unitInput.inputRight = false;
                this.unitInput.inputLeft = true;
            }
            
            if(this.body.position.y - 32 > this.unitTarget.body.position.y) {
                this.unitStats.jumpCountdown -= 5;
            }

            this.tryAttack();
        }
    }

    updateControl() {
        if(this.unitState == UnitState.Idle)
        {
            if(this.unitInput.inputAttack)
            {
                this.unitState = UnitState.Windup;
                this.unitStats.currentActionFrames = 0;
            }
            else
            {
                this.unitStats.jumpCountdown--;
                if((this.unitInput.inputJump ||
                    this.unitStats.jumpCountdown <= 0 ||
                        (this.unitStats.jumpCountdown < this.unitStats.jumpInterval &&
                        (this.unitInput.inputLeft && this.body.touching.left) || (this.unitInput.inputRight && this.body.touching.right))) &&
                    this.body.touching.down && this.body.velocity.y > -this.unitStats.jumpPower / 2)
                {
                    this.jump();
                }

                if(this.unitInput.inputLeft)
                {
                    this.flipX = true;
                    if(this.body.velocity.x > -this.unitStats.moveSpeed)
                    {
                        this.body.velocity.x -= this.unitStats.acceleration;
                        this.body.velocity.x = Math.max(this.body.velocity.x, -this.unitStats.moveSpeed);
                    }
                }
                if(this.unitInput.inputRight)
                {
                    this.flipX = false;
                    if(this.body.velocity.x < this.unitStats.moveSpeed)
                    {
                        this.body.velocity.x += this.unitStats.acceleration;
                        this.body.velocity.x = Math.min(this.body.velocity.x, this.unitStats.moveSpeed);
                    }
                }
                if(this.body.touching.down &&
                    ((!this.unitInput.inputLeft && !this.unitInput.inputRight) ||
                    Math.abs(this.body.velocity.x) > this.unitStats.moveSpeed))
                {
                    this.body.velocity.x -= Math.sign(this.body.velocity.x) * 2;
                    if(Math.abs(this.body.velocity.x) < 2)
                        this.body.velocity.x = 0;
                }
            }
        }
        else if(this.body.touching.down)
        {
            this.body.velocity.x -= Math.sign(this.body.velocity.x);
            if(Math.abs(this.body.velocity.x) < 1)
                this.body.velocity.x = 0;
        }
    }

    updateAnimations() {
        // animation controller
        if(this.unitState == UnitState.Hurt)
        {
            this.playAnimation('Hurt');
        }
        else if(this.unitState == UnitState.Windup)
        {
            this.playAnimation('Windup');
            // broken in phaser
            //this.anims.setProgress(this.unitStats.currentActionFrames / this.unitStats.windupFrames);
        }
        else if(this.unitState == UnitState.Cooldown)
        {
            this.playAnimation('Cooldown');
            // broken in phaser
            //this.anims.setProgress(this.unitStats.currentActionFrames / this.unitStats.cooldownFrames);
            this.anims.setCurrentFrame(this.anims.currentAnim.getFrameByProgress(this.unitStats.currentActionFrames / this.unitStats.cooldownFrames));
        }
        else if(!this.body.touching.down)
        {
            if(this.body.velocity.y < 0) 
                this.playAnimation('AirUp');
            else
                this.playAnimation('AirDown');
        }
        else if(Math.abs(this.body.velocity.x) > 0)
        {
            this.playAnimation('Move');
        }
        else
        {
            this.playAnimation('Idle');
        }
    }

    jump() {
        this.body.velocity.y -= this.unitStats.jumpPower;
        this.unitStats.jumpCountdown = Math.random() * this.unitStats.jumpInterval;
    }

    executeAttack()
    {
        if(this.unitTarget && this.unitTarget.active && this.unitTarget.body)
        {
            if(this.unitTarget.body.position.x < this.body.position.x)
                this.flipX = true;
            else
                this.flipX = false;
            this.attackEffect();

            if(DistanceSq(this.unitTarget.body.position, this.body.position) <= this.unitStats.attackRange * this.unitStats.attackRange)
            {
                this.attackTargetEffect(this.unitTarget);
                this.unitTarget.takeDamage(this.unitStats.attackPower);
            }
        }
    }

    // override for effects
    attackEffect() { }
    // override for effects
    attackTargetEffect(target: Unit) { }

    takeDamage(damage: number)
    {
        this.unitStats.health -= damage;
        if(this.unitStats.health <= 0)
            this.destroy();
    }

    refreshTarget() : boolean
    {
        if(this.unitTarget)
        {
            if(!this.unitTarget.active ||
                !this.unitTarget.body ||
                this.unitTarget.unitStats.health <= 0 ||
                DistanceSq(this.unitTarget.body.position, this.body.position) > this.unitStats.aquireRange *  this.unitStats.aquireRange)
                this.unitTarget = null;
            else
                return true;
        }            

        let targetTeam = this.unitStats.team == 0 ? 1 : 0;
        for(let object of this.gameScene.unitsByTeam[targetTeam].getChildren())
        {
            if(object.active &&
                object.unitStats.health > 0 &&
                object.body &&
                DistanceSq(object.body.position, this.body.position) <= this.unitStats.aquireRange *  this.unitStats.aquireRange)
            {
                this.unitTarget = object;
                return true;
            }
        }

        return false;
    }

    tryAttack()
    {
        if(this.unitState == UnitState.Idle &&
            DistanceSq(this.unitTarget.body.position, this.body.position) < this.unitStats.attackRange *  this.unitStats.attackRange)
        {
            this.unitState = UnitState.Windup;
            this.unitStats.currentActionFrames = 0;

            if(this.unitTarget.body.position.x < this.body.position.x)
                this.flipX = true;
            else
                this.flipX = false;
        }
    }

    // play unit animation only if the same animation is not already playing (so it's not constantly restarted)
    playAnimation(key: string) {
        if(this.anims.getCurrentKey() != this.animName + key)
            this.anims.play(this.animName + key);
    }
}

export default Unit;