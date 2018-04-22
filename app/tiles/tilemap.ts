import Tile from '../tiles/tile';

export class Tilemap extends Phaser.GameObjects.GameObject {

    size: Phaser.Math.Vector2;
    mapCollision: Phaser.Physics.Arcade.StaticGroup;
    map: Tile[][];

    constructor(scene: Phaser.Scene, worldSize: Phaser.Math.Vector2) {
        super(scene, 'tilemap');
        this.scene.add.existing(this);
        
        this.mapCollision = this.scene.physics.add.staticGroup();

        this.size = new Phaser.Math.Vector2(Math.ceil(worldSize.x / 16), Math.ceil(worldSize.y / 16));
        this.map = [];
        let currentGroundHeight = this.size.y / 2;

        for(var i: number = 0; i < this.size.x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j < this.size.y; j++) {
                if(j > currentGroundHeight) {
                    this.map[i][j] = new Tile(scene, i * 16, j * 16);
                    this.map[i][j].setFloor(!this.map[i][j-1]);
                    this.mapCollision.add(this.map[i][j]);
                }
            }

            let variation = Math.random();
            if(i > 20 && i < this.size.x - 20) {
                if(variation > 0.8 && currentGroundHeight > 8) {
                    currentGroundHeight--;
                }
                else if(variation < 0.2 && currentGroundHeight < this.size.y - 8) {
                    currentGroundHeight++;
                }
            }
        }
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

export default Tilemap;