/// <reference path="../../defs/phaser.d.ts"/>

export default function makeAnimations(scene : Phaser.Scene) {
    let config = {
        key: 'sprite1',
        frames: scene.anims.generateFrameNumbers('sprite1', {start: 0, first: 0, end: 4}),
        frameRate: 10,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);
}