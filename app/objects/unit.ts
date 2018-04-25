import GameScene from '../scenes/gameScene';
import { DistanceSqRects } from '../other/util';
import { DistanceSq } from '../other/util';

export enum UnitState {
    Idle = 0,
    Windup,
    Cooldown,
    Hurt,
    Dead
}

class UnitStats {
    team: number = 0;

    moveSpeed: number = 30;
    acceleration: number = 3;
    jumpPower: number = 120;
    jumpCountdown: number = 500;
    flying: boolean = false;
    
    health: number = 100;
    maxHealth: number = 100;
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

class UnitAIValues {
    jumpInterval: number = 500;
    aquireRange: number = 300;
    targetPriority: number = 5;
}

export class Unit extends Phaser.Physics.Arcade.Sprite {

    gameScene: GameScene;
    animName: string;

    isBuilding: boolean;
    unitState: UnitState;
    unitStats: UnitStats;
    unitInput: UnitInput;
    unitAI: UnitAIValues;

    unitTarget: Unit;
    targetEvalCounter: number = 0;

    constructor(scene: GameScene, animName: string, team: number, x: number, y: number, isBuilding?: boolean) {
        super(scene, x, y, (team == 0 ? 'blue' : 'red') + animName);
        
        if(isBuilding === undefined)
            isBuilding = false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, isBuilding);
        this.setCollideWorldBounds(true);

        this.gameScene = scene;
        this.animName = (team == 0 ? 'blue' : 'red') + animName;
        
        this.isBuilding = isBuilding;
        this.unitState = UnitState.Idle;
        this.unitStats = new UnitStats();
        this.unitStats.team = team;
        this.unitInput = new UnitInput();
        this.unitAI = new UnitAIValues();
        this.unitTarget = null;
    }

    created() {

    }
    
    update() {
        if(this.active && !this.isBuilding) {
            this.updateState();
            if(this.active) {
                this.updateAI();
                this.updateControl();
                this.updateAnimations();
            }
        }

        if(this.isBuilding && this.unitState == UnitState.Dead)
            this.destroy();
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
            else if(this.unitState == UnitState.Dead)
            {
                if(this.unitStats.currentActionFrames >= 30)
                    this.destroy();
            }
        }
    }

    updateAI() {
        if(this.unitState == UnitState.Dead)
            return;

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
            if(this.getCenter().x < this.unitTarget.getCenter().x) {
                this.unitInput.inputRight = true;
                this.unitInput.inputLeft = false;
            }
            else {
                this.unitInput.inputRight = false;
                this.unitInput.inputLeft = true;
            }
            
            if(this.getCenter().y - 32 > this.unitTarget.getCenter().y) {
                this.unitStats.jumpCountdown -= 5;
            }

            this.tryAttack();
        }
    }

    updateControl() {
        if(!this.body)
            return;

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
                        (this.unitStats.jumpCountdown < 1000 &&
                        (this.unitInput.inputLeft && this.body.touching.left) || (this.unitInput.inputRight && this.body.touching.right))) &&
                    (this.body.touching.down || this.unitStats.flying))
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
        if(this.unitState == UnitState.Dead)
        {
            this.playAnimation('Die');
            this.anims.setCurrentFrame(this.anims.currentAnim.getFrameByProgress(this.unitStats.currentActionFrames / 30));
        }
        else if(this.unitState == UnitState.Hurt)
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
        else if(!this.unitStats.flying) {
            if(!this.body.touching.down)
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
        else if(this.unitStats.flying){
            if(Math.abs(this.body.velocity.x) > 50)
            {
                this.playAnimation('Move');
            }
            else if(Math.abs(this.body.velocity.y) > 30)
            {
                if(this.body.velocity.y < 0) 
                    this.playAnimation('AirUp');
                else
                    this.playAnimation('AirDown');
            }
            else
            {
                this.playAnimation('Idle');
            }
        }
    }

    jump() {
        this.body.velocity.y -= this.unitStats.jumpPower;
        this.unitStats.jumpCountdown = Math.random() * this.unitAI.jumpInterval;
    }

    executeAttack()
    {
        if(this.unitTarget && this.unitTarget.active && this.unitTarget.body && this.body)
        {
            if(this.unitTarget.getCenter().x < this.getCenter().x)
                this.flipX = true;
            else
                this.flipX = false;
            this.attackEffect();

            if(DistanceSqRects(this.unitTarget.body, this.body) <= this.unitStats.attackRange * this.unitStats.attackRange)
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

    takeDamage(damage: number, stun?: number)
    {
        if(stun === undefined)
            stun = 0;

        this.unitStats.health -= damage;
        this.hitEffect();
        if(this.unitStats.health <= 0) {
            this.dieEffect();
            this.unitState = UnitState.Dead;
            this.unitStats.currentActionFrames = 0;
        }
        else if(stun > 0) {
            this.unitState = UnitState.Hurt;
            this.unitStats.currentActionFrames = stun;
        }
    }

    // override for effects
    hitEffect() {}
    // override for effects
    dieEffect() {}

    refreshTarget() : boolean
    {
        this.targetEvalCounter--;
        if(this.unitTarget && this.targetEvalCounter >= 0)
        {
            if(!this.unitTarget.active ||
                !this.unitTarget.body ||
                this.unitTarget.unitStats.health <= 0 ||
                DistanceSqRects(this.unitTarget.body, this.body) > this.unitAI.aquireRange *  this.unitAI.aquireRange)
                this.unitTarget = null;
            else
                return true;
        }

        let targetTeam = this.unitStats.team == 0 ? 1 : 0;
        let minDistance = this.unitAI.aquireRange *  this.unitAI.aquireRange;
        let topTargetPriority = 1;
        for(let object of this.gameScene.players[targetTeam].units.getChildren())
        {
            if(object.active && object.unitStats.health > 0 && object.body) {
                let distance = DistanceSq(object.getCenter(), this.getCenter());
                if(distance < minDistance && object.unitAI.targetPriority >= topTargetPriority) { // prioritize closest unit
                    this.unitTarget = object;
                    minDistance = distance;
                    topTargetPriority = object.unitAI.targetPriority;
                }
            }
        }

        if(this.unitTarget)
        {
            this.targetEvalCounter = Math.random() * 60 + 30;
            return true;
        }

        return false;
    }

    tryAttack()
    {
        if(this.unitState == UnitState.Idle &&
            DistanceSqRects(this.unitTarget.body, this.body) < this.unitStats.attackRange *  this.unitStats.attackRange)
        {
            this.unitState = UnitState.Windup;
            this.unitStats.currentActionFrames = 0;

            if(this.unitTarget.getCenter().x < this.getCenter().x)
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