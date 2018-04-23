/// <reference path="../defs/phaser.d.ts"/>

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
        this.load.spritesheet('dropship', 'dropship.png', {frameWidth: 48, frameHeight: 16});

        // units
        this.load.spritesheet('marine', 'marine.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('alien', 'alien.png', {frameWidth: 24, frameHeight: 24});

        // effects
        this.load.spritesheet('effect', 'effect.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('pull', 'pull.png', {frameWidth: 64, frameHeight: 128});

        // buildings
        this.load.spritesheet('base', 'base.png', {frameWidth: 80, frameHeight: 80});

        // tiles
        this.load.spritesheet('ground', 'ground.png', {frameWidth: 16, frameHeight: 16});

        // titles
        this.load.spritesheet('title', 'title.png', {frameWidth: 160, frameHeight: 64});
        this.load.spritesheet('subtitle', 'subtitle.png', {frameWidth: 156, frameHeight: 18});

        // titles
        this.load.spritesheet('text', 'text.png', {frameWidth: 128, frameHeight: 16});

        this.load.image('background', 'background.png');
        this.load.image('directions', 'directions.png');

        // audio
        this.load.audio('pull', ['pull.wav']);
        this.load.audio('pickup', ['pickup.wav']);
        this.load.audio('dropoff', ['dropoff.wav']);
        this.load.audio('sword', ['sword.wav']);
        this.load.audio('rifle', ['rifle.wav']);
        this.load.audio('marinedeath', ['marinedeath.wav']);
        this.load.audio('orcdeath', ['orcdeath.wav']);


        /*
var music = this.sound.add('theme');

    music.play()
        */

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