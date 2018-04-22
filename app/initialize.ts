/// <reference path="../defs/phaser.d.ts"/>

import LoadScene from './scenes/loadScene';
import TitleScene from './scenes/titleScene';
import GameScene from './scenes/gameScene';

const game = new Phaser.Game({

    // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>

    width: 450,
    height: 250,
    zoom: 3,
    // resolution: 1,
    type: Phaser.AUTO,
    // parent: null,
    // canvas: null,
    // canvasStyle: null,
    // seed: null,
    title: 'LD41 Game',
    url: '',
    version: '0.0.1',
     input: {
       keyboard: true,
       mouse: false,
       touch: false,
       gamepad: true
    },
    // disableContextMenu: false,
    // banner: false
    banner: {
        // hidePhaser: false,
        // text: 'white',
        background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
    },
    // fps: {
    //   min: 10,
    //   target: 60,
    //   forceSetTimeout: false,
    // },
    pixelArt: true,
    // transparent: false,
    // clearBeforeRender: true,
    // backgroundColor: 0x000000, // black
    loader: {
        // baseURL: '',
        path: 'assets/',
        maxParallelDownloads: 6,
        // crossOrigin: 'anonymous',
        // timeout: 0
    },
    physics: {
       default: 'arcade',
       arcade: {
           gravity: { y: 350 },
           debug: false
       }
    },
    scene: [
        LoadScene,
        TitleScene,
        GameScene
    ]
});
