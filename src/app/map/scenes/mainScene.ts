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

        this.anims.create({
            key:'adarna_walk_left',
            frames: [
              {key: 'adarna_walk_left_1', duration: 150},
              {key: 'adarna_walk_left_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'adarna_walk_right',
            frames: [
              {key: 'adarna_walk_right_1', duration: 150},
              {key: 'adarna_walk_right_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'sundo_walk_left',
            frames: [
              {key: 'sundo_walk_left_1', duration: 150},
              {key: 'sundo_walk_left_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'sundo_walk_right',
            frames: [
              {key: 'sundo_walk_right_1', duration: 150},
              {key: 'sundo_walk_right_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'diwata_walk_left',
            frames: [
              {key: 'diwata_walk_left_1', duration: 150},
              {key: 'diwata_walk_left_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'diwata_walk_right',
            frames: [
              {key: 'diwata_walk_right_1', duration: 150},
              {key: 'diwata_walk_right_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'duwende_walk_left',
            frames: [
              {key: 'duwende_walk_left_1', duration: 150},
              {key: 'duwende_walk_left_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        this.anims.create({
            key:'duwende_walk_right',
            frames: [
              {key: 'duwende_walk_right_1', duration: 150},
              {key: 'duwende_walk_right_2', duration: 150},
            ],
            randomFrame: true,
            repeat: -1
        });

        

        let tower = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, "tower").setOrigin(0.5)
        let towerName = this.add.image(tower.x, tower.y + tower.height * 0.6, "blank-label").setOrigin(0.5);
        towerName.setInteractive();
        this.add.text(tower.x, tower.y + tower.height * 0.6, "Karmic Tower", {
            color: "#FFF"
        }).setOrigin(0.5);
        let home = this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.25, "home").setOrigin(0.5)
        let homeName =this.add.image(home.x, home.y + home.height * 0.5, "blank-label").setOrigin(0.5);
        homeName.setInteractive();
        this.add.text(home.x, home.y + home.height * 0.5, "Home", {
            color: "#FFF"
        }).setOrigin(0.5);
        let market = this.add.image(this.cameras.main.width * 0.75, this.cameras.main.height * 0.75, "market").setOrigin(0.5)
        let marketName =this.add.image(market.x, market.y + market.height * 0.5, "blank-label").setOrigin(0.5);
        marketName.setInteractive();
        this.add.text(market.x, market.y + market.height * 0.5, "Marketplace", {
            color: "#FFF"
        }).setOrigin(0.5);
        let wellspring = this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.75, "wellspring").setOrigin(0.5)
        let wellspringName =this.add.image(wellspring.x, wellspring.y + wellspring.height * 0.5, "blank-label").setOrigin(0.5);
        wellspringName.setInteractive();

        this.add.text(wellspring.x, wellspring.y + wellspring.height * 0.5, "Karmic Wellspring", {
            color: "#FFF"
        }).setOrigin(0.5);
        let area = this.add.image(this.cameras.main.width * 0.25, this.cameras.main.height * 0.25, "area").setOrigin(0.5)
        let areaName  =this.add.image(area.x, area.y + area.height * 0.5, "blank-label").setOrigin(0.5);
        areaName.setInteractive();
        this.add.text(area.x, area.y + area.height * 0.5, "Gathering Area", {
            color: "#FFF"
        }).setOrigin(0.5);
        this.adarna = new Familiar(this, -50, -60, "adarna_float_1", "adarna");
        this.diwata = new Familiar(this, 50, -60, "diwata_float_1", "diwata");
        this.sundo = new Familiar(this, -50, 20, "sundo_float_1", "sundo");
        this.duwende = new Familiar(this, 50, 20, "duwende_float_1", "duwende");

        let descriptionContainer = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, "description-box").setVisible(false);
        let descriptionText = this.add.text(descriptionContainer.x, descriptionContainer.y, "Karmic Wellspring", {
            color: "#FFF",
            align: "center",
            fontSize: "16px"
        }).setOrigin(0.5).setWordWrapWidth(descriptionContainer.width * 0.8).setVisible(false);

        towerName.on("pointerover", () => {
            descriptionText.text = "A place to gather karmic energy, increasing it by 1-3 points per visit. Visiting the Karmic Tower reduces health by 1, encouraging familiars to rest afterward. Cannot visit if already at the Karmic Tower.";
            descriptionContainer.visible = true;
            descriptionText.visible = true;
        });
        towerName.on("pointerout", () => {
            descriptionContainer.visible = false;
            descriptionText.visible = false;
        });

        homeName.on("pointerover", () => {
            descriptionText.text = "The place for familiars to rest and recuperate. Increases health by 2 but decreases food by 2. Familiars cannot choose to go here if they're already at Home.";
            descriptionContainer.visible = true;
            descriptionText.visible = true;
        });
        homeName.on("pointerout", () => {
            descriptionContainer.visible = false;
            descriptionText.visible = false;
        });

        marketName.on("pointerover", () => {
            descriptionText.text = "Familiars can buy a treasure box for 5 coins, which may contain 1-20 coins. This is a chance-based purchase that could result in more resources than initially spent. Cannot visit if already at the Marketplace.";
            descriptionContainer.visible = true;
            descriptionText.visible = true;
        });
        marketName.on("pointerout", () => {
            descriptionContainer.visible = false;
            descriptionText.visible = false;
        });

        wellspringName.on("pointerover", () => {
            descriptionText.text = "Allows familiars to exchange 5 karmic energy for 3 coins and 3 food. A place to trade karmic energy for resources. Cannot visit if already at the Karmic Wellspring.";
            descriptionContainer.visible = true;
            descriptionText.visible = true;
        });
        wellspringName.on("pointerout", () => {
            descriptionContainer.visible = false;
            descriptionText.visible = false;
        });

        areaName.on("pointerover", () => {
            descriptionText.text = "A socialization point where familiars can interact, develop personality, and learn what other familiars are up to. Reduces health by 2 but grants 0-1 karmic energy. Cannot visit if already at the Gathering Area.";
            descriptionContainer.visible = true;
            descriptionText.visible = true;
        });
        areaName.on("pointerout", () => {
            descriptionContainer.visible = false;
            descriptionText.visible = false;
        });

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
  