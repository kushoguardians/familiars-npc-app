import {AUTO, Game} from "phaser";
import PreloadScene from "./scenes/preLoadScene";
import MainScene from "./scenes/mainScene";

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: 'game-container',
    transparent: true,
    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768
    },
    scene: [
        PreloadScene,
        MainScene
    ]
};

const StartGame = () => {
    return new Game(config);
}

export default StartGame;