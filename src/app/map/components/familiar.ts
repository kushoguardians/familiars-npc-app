export default class Familiar extends Phaser.GameObjects.Sprite {
    base; scene; xOffset; yOffset;
    constructor(scene:Phaser.Scene, xOffset:number, yOffset:number, texture:string, base:string) {
        super(scene, scene.cameras.main.width * 0.5 + xOffset, scene.cameras.main.height * 0.5 + yOffset, texture)
        this.base = base;
        this.scene = scene;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        scene.add.existing(this);
        this.setScale(0.35)
        this.anims.play(`${base}_idle`);
    }

    goTo(location:String) {
        switch(location) {
            case "Karmic Tower":
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.5 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.5 + this.yOffset,
                    duration: 500
                });
                break;
            case "Karmic Wellspring":
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.25 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.75 + this.yOffset,
                    duration: 500
                });
                break;
            case "Home":
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.75 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.25 + this.yOffset,
                    duration: 500
                });
                break;
            case "Marketplace":
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.75 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.75 + this.yOffset,
                    duration: 500
                });
                break;
            case "Gathering Area":
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.25 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.25 + this.yOffset,
                    duration: 500
                });
                break;
            default:
                this.scene.tweens.add({
                    targets: this,
                    x: this.scene.cameras.main.width * 0.5 + this.xOffset,
                    y: this.scene.cameras.main.height * 0.5 + this.yOffset,
                    duration: 500
                });
                break;
        }
    }

}