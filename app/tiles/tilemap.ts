import Tile from '../tiles/tile';
import GameScene from '../scenes/gameScene';
import MarineBase from '../objects/marineBase';
import AlienBase from '../objects/alienBase';

export class Tilemap extends Phaser.GameObjects.GameObject {

    gameScene: GameScene;
    size: Phaser.Math.Vector2;
    mapCollision: Phaser.Physics.Arcade.StaticGroup;
    map: Tile[][];

    spawns: Phaser.Math.Vector2[];

    constructor(scene: GameScene, worldSize: Phaser.Math.Vector2) {
        super(scene, 'tilemap');
        this.scene.add.existing(this);
        
        this.gameScene = scene;
        this.mapCollision = this.scene.physics.add.staticGroup();
        this.spawns = [];

        this.size = new Phaser.Math.Vector2(Math.ceil(worldSize.x / 16), Math.ceil(worldSize.y / 16));
        this.map = [];
        let currentGroundHeight = this.size.y / 2;

        for(var i: number = 0; i < this.size.x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j < this.size.y; j++) {
                if(j > currentGroundHeight) {
                    this.map[i][j] = new Tile(scene, i * 16, j * 16);

                    if(!this.map[i][j-1]) {
                        this.map[i][j].setFloor(true);
                        
                        if(i == 1)
                            this.spawns.push(new Phaser.Math.Vector2(i * 16, j * 16));
                        else if(i == this.size.x - 10)
                            this.spawns.push(new Phaser.Math.Vector2(i * 16, j * 16));
                    }
                    
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

    
}

export default Tilemap;