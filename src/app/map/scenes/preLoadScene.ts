export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' })
    }
  
    preload() {
        this.load.image('area', 'assets/area.png');
        this.load.image('home', 'assets/home.png');
        this.load.image('market', 'assets/market.png');
        this.load.image('tower', 'assets/tower.png');
        this.load.image('wellspring', 'assets/wellspring.png');

        this.load.image('adarna_float_1', 'assets/familiars/adarna_float_1.png');
        this.load.image('adarna_float_2', 'assets/familiars/adarna_float_2.png');
        this.load.image('adarna_float_3', 'assets/familiars/adarna_float_3.png');
        this.load.image('adarna_float_4', 'assets/familiars/adarna_float_4.png');
        this.load.image('diwata_float_1', 'assets/familiars/diwata_float_1.png');
        this.load.image('diwata_float_2', 'assets/familiars/diwata_float_2.png');
        this.load.image('diwata_float_3', 'assets/familiars/diwata_float_3.png');
        this.load.image('diwata_float_4', 'assets/familiars/diwata_float_4.png');
        this.load.image('duwende_float_1', 'assets/familiars/duwende_float_1.png');
        this.load.image('duwende_float_2', 'assets/familiars/duwende_float_2.png');
        this.load.image('duwende_float_3', 'assets/familiars/duwende_float_3.png');
        this.load.image('duwende_float_4', 'assets/familiars/duwende_float_4.png');
        this.load.image('sundo_float_1', 'assets/familiars/sundo_float_1.png');
        this.load.image('sundo_float_2', 'assets/familiars/sundo_float_2.png');
        this.load.image('sundo_float_3', 'assets/familiars/sundo_float_3.png');
        this.load.image('sundo_float_4', 'assets/familiars/sundo_float_4.png');
        
        this.load.image('adarna_walk_left_1', 'assets/familiars/adarna_walk_left_1.png');
        this.load.image('adarna_walk_left_2', 'assets/familiars/adarna_walk_left_2.png');
        this.load.image('adarna_walk_right_1', 'assets/familiars/adarna_walk_right_1.png');
        this.load.image('adarna_walk_right_2', 'assets/familiars/adarna_walk_right_2.png');
        this.load.image('diwata_walk_left_1', 'assets/familiars/diwata_walk_left_1.png');
        this.load.image('diwata_walk_left_2', 'assets/familiars/diwata_walk_left_2.png');
        this.load.image('diwata_walk_right_1', 'assets/familiars/diwata_walk_right_1.png');
        this.load.image('diwata_walk_right_2', 'assets/familiars/diwata_walk_right_2.png');
        this.load.image('duwende_walk_left_1', 'assets/familiars/duwende_walk_left_1.png');
        this.load.image('duwende_walk_left_2', 'assets/familiars/duwende_walk_left_2.png');
        this.load.image('duwende_walk_right_1', 'assets/familiars/duwende_walk_right_1.png');
        this.load.image('duwende_walk_right_2', 'assets/familiars/duwende_walk_right_2.png');
        this.load.image('sundo_walk_left_1', 'assets/familiars/sundo_walk_left_1.png');
        this.load.image('sundo_walk_left_2', 'assets/familiars/sundo_walk_left_2.png');
        this.load.image('sundo_walk_right_1', 'assets/familiars/sundo_walk_right_1.png');
        this.load.image('sundo_walk_right_2', 'assets/familiars/sundo_walk_right_2.png');

    }
  
    create() {
        this.add
        .text(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, ``, {
          color: '#FFFFFF',
          align: "center",
        })
        .setOrigin(0.5, 0.5).setWordWrapWidth(this.cameras.main.width)
    
        // this.add
        //   .text(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, ``, {
        //     color: '#FFFFFF',
        //     fontFamily: "Cabin Condensed",
        //     fontSize: 40,
        //     align: "center",
        //   })
        //   .setOrigin(0.5, 0.5).setWordWrapWidth(this.cameras.main.width)
     
      this.scene.start('MainScene')
  
      /**
       * This is how you would dynamically import the mainScene class (with code splitting),
       * add the mainScene to the Scene Manager
       * and start the scene.
       * The name of the chunk would be 'mainScene.chunk.js
       * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
       */
      // let someCondition = true
      // if (someCondition)
      //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
      //     this.scene.add('MainScene', mainScene.default, true)
      //   })
      // else console.log('The mainScene class will not even be loaded by the browser')
    }
  }
  