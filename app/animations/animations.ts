/// <reference path="../../defs/phaser.d.ts"/>

export default function makeAnimations(scene : Phaser.Scene) {
    // DROPSHIP
    let config = {
        key: 'dropshipIdle',
        frames: scene.anims.generateFrameNumbers('dropship', {start: 0, end: 0}),
        frameRate: 0,
        repeat: Phaser.FOREVER
    };
    scene.anims.create(config);

    // UNITS
    // MARINE
    {
        let name = 'marine';
        config = {
            key: name + 'Idle',
            frames: scene.anims.generateFrameNumbers(name, {start: 0, end: 7}),
            frameRate: 5,
            repeat: Phaser.FOREVER,
            repeatDelay: 1000
        };
        scene.anims.create(config);

        config = {
            key: name + 'Move',
            frames: scene.anims.generateFrameNumbers(name, {start: 8, end: 15}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'AirUp',
            frames: scene.anims.generateFrameNumbers(name, {start: 16, end: 16}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'AirDown',
            frames: scene.anims.generateFrameNumbers(name, {start: 24, end: 24}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'Hurt',
            frames: scene.anims.generateFrameNumbers(name, {start: 32, end: 32}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'Windup',
            frames: scene.anims.generateFrameNumbers(name, {start: 40, end: 40}),
            frameRate: 10,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'Cooldown',
            frames: scene.anims.generateFrameNumbers(name, {start: 48, end: 51}),
            frameRate: 10,
            repeat: 0
        };
        scene.anims.create(config);
    }

    // ALIEN
    {
        let name = 'alien';
        config = {
            key: name + 'Idle',
            frames: scene.anims.generateFrameNumbers(name, {start: 0, end: 7}),
            frameRate: 5,
            repeat: Phaser.FOREVER,
            repeatDelay: 1000
        };
        scene.anims.create(config);
    
        config = {
            key: name + 'Move',
            frames: scene.anims.generateFrameNumbers(name, {start: 8, end: 15}),
            frameRate: 12,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    
        config = {
            key: name + 'AirUp',
            frames: scene.anims.generateFrameNumbers(name, {start: 16, end: 16}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'AirDown',
            frames: scene.anims.generateFrameNumbers(name, {start: 24, end: 24}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'Hurt',
            frames: scene.anims.generateFrameNumbers(name, {start: 32, end: 32}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'Windup',
            frames: scene.anims.generateFrameNumbers(name, {start: 40, end: 43}),
            frameRate: 10,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'Cooldown',
            frames: scene.anims.generateFrameNumbers(name, {start: 48, end: 52}),
            frameRate: 10,
            repeat: 0
        };
        scene.anims.create(config);
    }

    // TILES
    tileConfig(scene, 'fill', 0, 3);
    tileConfig(scene, 'floor', 8, 3);
}

function tileConfig(scene : Phaser.Scene, keyName: string, start: number, amount: number)
{
    for(var i: number = start; i < start + amount; i++)
    {
        let config = {
            key: keyName + String(i - start),
            frames: scene.anims.generateFrameNumbers('ground', {start: i, end: i}),
            frameRate: 0,
            repeat: 0
        };
        scene.anims.create(config);
    }
}