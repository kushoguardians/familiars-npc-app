export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' })
    }
  
    preload() {

    }
  
    create() {
        this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, "tower").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.25, "home").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.75, "market").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.75, "wellspring").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.25, "area").setOrigin(0.5).setScale(0.25);
    }
  }
  