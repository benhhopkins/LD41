/// <reference path="../../defs/phaser.d.ts"/>

export default function makeAnimations(scene : Phaser.Scene) {
    // TITLE
    {
        let config = {
            key: 'titleIdle',
            frames: scene.anims.generateFrameNumbers('title', {start: 0, end: 0}),
            frameRate: 0,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: 'titleFlash',
            frames: scene.anims.generateFrameNumbers('title', {start: 4, end: 7}),
            frameRate: 30,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: 'subtitleIdle',
            frames: scene.anims.generateFrameNumbers('subtitle', {start: 0, end: 1}),
            frameRate: 2,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    }

    // DROPSHIP
    {
        let config = {
            key: 'dropshipIdle',
            frames: scene.anims.generateFrameNumbers('dropship', {start: 0, end: 0}),
            frameRate: 0,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    }

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

        config = {
            key: name + 'Die',
            frames: scene.anims.generateFrameNumbers(name, {start: 56, end: 60}),
            frameRate: 20,
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

        config = {
            key: name + 'Die',
            frames: scene.anims.generateFrameNumbers(name, {start: 56, end: 60}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);
    }

    // EFFECTS
    {
        let name = 'effect';
        config = {
            key: name + 'marineHit',
            frames: scene.anims.generateFrameNumbers(name, {start: 0, end: 8}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'marineFire',
            frames: scene.anims.generateFrameNumbers(name, {start: 10, end: 16}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'alienHit',
            frames: scene.anims.generateFrameNumbers(name, {start: 20, end: 27}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'dropshipThrust',
            frames: scene.anims.generateFrameNumbers(name, {start: 30, end: 37}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'dropshipGlide',
            frames: scene.anims.generateFrameNumbers(name, {start: 40, end: 46}),
            frameRate: 20,
            repeat: 0
        };
        scene.anims.create(config);

        config = {
            key: name + 'pull',
            frames: scene.anims.generateFrameNumbers('pull', {start: 0, end: 1}),
            frameRate: 20,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    }

    // BUILDINGS
    // MARINE BASE
    {
        let config = {
            key: 'marineBase',
            frames: scene.anims.generateFrameNumbers('base', {start: 0, end: 0}),
            frameRate: 0,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    }

    // ALIEN BASE
    {
        let config = {
            key: 'alienBase',
            frames: scene.anims.generateFrameNumbers('base', {start: 1, end: 1}),
            frameRate: 0,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);
    }

    // TEXT
    {
        let name = 'text';
        config = {
            key: name + 'cargoFull',
            frames: scene.anims.generateFrameNumbers(name, {start: 0, end: 1}),
            frameRate: 2,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'defeat',
            frames: scene.anims.generateFrameNumbers(name, {start: 2, end: 3}),
            frameRate: 1.5,
            repeat: Phaser.FOREVER
        };
        scene.anims.create(config);

        config = {
            key: name + 'victory',
            frames: scene.anims.generateFrameNumbers(name, {start: 4, end: 5}),
            frameRate: 1.5,
            repeat: Phaser.FOREVER
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