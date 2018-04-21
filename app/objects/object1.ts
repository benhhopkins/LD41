/// <reference path="../../defs/phaser.d.ts"/>
import GameObject from '../objects/gameObject';

export class Object1 extends GameObject {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 'mecha', x, y);
    }

    init(data) {
    }

    preload() {
    }

    create() {
    }

    update() {
        super.update();
    }
}

export default Object1;