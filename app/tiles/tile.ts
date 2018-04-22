import GameScene from './tilemap';

export class Tile extends Phaser.GameObjects.Sprite {

    baseTile: string;
    tileVariation: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ground');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        
    }

    setFloor(floor: boolean) {
        if(floor)
            this.baseTile = 'floor';
        else
            this.baseTile = 'fill';
            
        this.tileVariation = Math.floor(Math.random() * 3);

        this.anims.play(this.baseTile + String(this.tileVariation));
    }



    update() {
    }
}

export default Tile;