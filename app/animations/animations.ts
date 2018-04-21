/// <reference path="../../defs/phaser.d.ts"/>

export default function makeAnimations(scene : Phaser.Scene) {
    let config = {
        key: 'mechaStand',
        frames: scene.anims.generateFrameNumbers('mecha', {start: 0, end: 0}),
        frameRate: 10,
        repeat: Phaser.FOREVER
    };
    scene.anims.create(config);

    config = {
        key: 'mechaAttack',
        frames: scene.anims.generateFrameNumbers('mecha', {start: 12, end: 19}),
        frameRate: 10,
        repeat: 0
    };
    scene.anims.create(config);
}