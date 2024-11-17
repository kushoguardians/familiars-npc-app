import {AUTO, Game} from "phaser";
import PreloadScene from "./scenes/preLoadScene";
import MainScene from "./scenes/mainScene";
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';

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
    ],
    plugins: {
        global: [{
            key: 'rexWebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        },
        ]
    }
};

const StartGame = () => {
    return new Game(config);
}

export default StartGame;