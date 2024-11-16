import Familiar from "../components/familiar";
import {EventBus} from "../EventBus";

export default class MainScene extends Phaser.Scene {
    adarna:Familiar | undefined; sundo:Familiar | undefined; duwende:Familiar | undefined;  diwata:Familiar | undefined; 
    constructor() {
      super({ key: 'MainScene' })
    }
  
    preload() {

    }
  
    create() {
        this.anims.create({
            key:'adarna_idle',
            frames: [
              {key: 'adarna_float_1', duration: 150},
              {key: 'adarna_float_2', duration: 150},
              {key: 'adarna_float_3', duration: 150},
              {key: 'adarna_float_4', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });
        this.anims.create({
            key:'sundo_idle',
            frames: [
              {key: 'sundo_float_1', duration: 150},
              {key: 'sundo_float_2', duration: 150},
              {key: 'sundo_float_3', duration: 150},
              {key: 'sundo_float_4', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });
        this.anims.create({
            key:'diwata_idle',
            frames: [
              {key: 'diwata_float_1', duration: 150},
              {key: 'diwata_float_2', duration: 150},
              {key: 'diwata_float_3', duration: 150},
              {key: 'diwata_float_4', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });
        this.anims.create({
            key:'duwende_idle',
            frames: [
              {key: 'duwende_float_1', duration: 150},
              {key: 'duwende_float_2', duration: 150},
              {key: 'duwende_float_3', duration: 150},
              {key: 'duwende_float_4', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, "tower").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.25, "home").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.75, "market").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.75, "wellspring").setOrigin(0.5).setScale(0.25);
        this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.25, "area").setOrigin(0.5).setScale(0.25);
        this.adarna = new Familiar(this, -50, -40, "adarna_float_1", "adarna");
        this.diwata = new Familiar(this, 50, -40, "diwata_float_1", "diwata");
        this.sundo = new Familiar(this, -50, 40, "sundo_float_1", "sundo");
        this.duwende = new Familiar(this, 50, 40, "duwende_float_1", "duwende");

        EventBus.on("changeLoc", (data:any) => {
            switch(data.familiar) {
                case "duwende":
                    this.duwende?.goTo(data.location);
                    break;
                case "diwata":
                    this.diwata?.goTo(data.location);
                    break;
                case "sundo":
                    this.sundo?.goTo(data.location);
                    break;
                case "adarna":
                    this.adarna?.goTo(data.location);
                    break;
            }
        });
    }
  }
  