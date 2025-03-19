export default class Familiar extends Phaser.GameObjects.Sprite {
  base
  scene
  xOffset
  yOffset
  constructor(
    scene: Phaser.Scene,
    xOffset: number,
    yOffset: number,
    texture: string,
    base: string,
    location: string
  ) {
    super(
      scene,
      scene.cameras.main.width * 0.5 + xOffset,
      scene.cameras.main.height * 0.5 + yOffset,
      texture
    )
    this.base = base
    this.scene = scene
    this.xOffset = xOffset
    this.yOffset = yOffset
    scene.add.existing(this)
    this.setScale(0.35)
    this.anims.play(`${base}_idle`)

    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(0, 0, this.width, this.height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    })

    this.on('pointerdown', () => {
      window.location.href = window.location.origin + '/npc/' + base
    })

    this.on('pointerover', () => {
      scene.input.setDefaultCursor('pointer')
    })

    this.on('pointerout', () => {
      scene.input.setDefaultCursor('default')
    })

    this.goTo(location)
  }

  goTo(location: string) {
    let targetX
    let targetY
    switch (location) {
      case 'Karmic Tower':
        targetX = this.scene.cameras.main.width * 0.5 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.5 + this.yOffset
        break
      case 'Karmic Wellspring':
        targetX = this.scene.cameras.main.width * 0.25 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.75 + this.yOffset
        break
      case 'Home':
        targetX = this.scene.cameras.main.width * 0.75 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.25 + this.yOffset
        break
      case 'Marketplace':
        targetX = this.scene.cameras.main.width * 0.75 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.75 + this.yOffset
        break
      case 'Gathering Area':
        targetX = this.scene.cameras.main.width * 0.25 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.25 + this.yOffset
        break
      default:
        targetX = this.scene.cameras.main.width * 0.5 + this.xOffset
        targetY = this.scene.cameras.main.height * 0.5 + this.yOffset
        break
    }
    if (this.x < targetX) {
      this.anims.play(`${this.base}_walk_right`)
    } else {
      this.anims.play(`${this.base}_walk_left`)
    }
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 500,
    })
    setTimeout(() => this.anims.play(`${this.base}_idle`), 500)
  }
}
