import {AUTO, Game} from 'phaser'
import PreloadScene from './scenes/preLoadScene'
import MainScene from './scenes/mainScene'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js'

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  parent: 'game-container',
  transparent: true,
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 768,
  },
  scene: [PreloadScene, MainScene],
  plugins: {
    global: [
      {
        key: 'rexWebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StartGame = (data: any) => {
  const callbacks = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preBoot: (game: any) => {
      // Add custom data to game instance
      game.locationData = data
    },
  }
  return new Game({...config, callbacks})
}

export default StartGame
