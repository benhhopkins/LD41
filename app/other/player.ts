import Dropship from "../objects/dropship";
import Base from "../objects/base";

export enum PlayerType {
    Human = 0,
    AI
}

export class Player {

    gameScene: GameScene;
    playerType: PlayerType;
    team: number;
    units: Phaser.GameObjects.Group;

    dropship: Dropship;
    base: Base;

    constructor(gameScene: GameScene, playerType: PlayerType, team: number) {
        this.gameScene = gameScene;
        this.playerType = playerType;
        this.team = team;
        this.units = new Phaser.GameObjects.Group();

        this.dropship = null;
        this.base = null;
    }

    created() {
        if(this.playerType == PlayerType.Human) {
            this.dropship = this.gameScene.addUnit(new Dropship(this.gameScene,
                this.team,
                this.gameScene.tilemap.spawns[this.team].x,
                this.gameScene.tilemap.spawns[this.team].y - 100));
            this.base = this.gameScene.addUnit(new Base(this.gameScene,
                this.team,
                this.gameScene.tilemap.spawns[this.team].x,
                this.gameScene.tilemap.spawns[this.team].y - 45));
        }
    }
}

export default Player;