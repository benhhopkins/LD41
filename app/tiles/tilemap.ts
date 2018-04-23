import Tile from '../tiles/tile';
import GameScene from '../scenes/gameScene';
import MarineBase from '../objects/marineBase';
import AlienBase from '../objects/alienBase';

export class Tilemap extends Phaser.GameObjects.GameObject {

    gameScene: GameScene;
    size: Phaser.Math.Vector2;
    mapCollision: Phaser.Physics.Arcade.StaticGroup;
    map: Tile[][];

    constructor(scene: GameScene, worldSize: Phaser.Math.Vector2) {
        super(scene, 'tilemap');
        this.scene.add.existing(this);
        
        this.gameScene = scene;
        this.mapCollision = this.scene.physics.add.staticGroup();

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
                        if(i == 10) {
                            this.gameScene.marineBase = this.gameScene.addUnit(new MarineBase(this.gameScene, i * 16 - 40, j * 16 - 45));
                        }
                        else if(i == this.size.x - 10) {
                            this.gameScene.alienBase = this.gameScene.addUnit(new AlienBase(this.gameScene, i * 16 - 40, j * 16 - 45));
                        }
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