/// <reference path="../../defs/phaser.d.ts"/>
import GameObject from '../objects/gameObject';

export class Object1 extends GameObject {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 'sprites', 'flag', x, y);
    }

    init(data) {
    }

    preload() {
    }

    create() {
    }

    update() {
    }
}

export default Object1;