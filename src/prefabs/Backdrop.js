class Backdrop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, reset) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = speed;
        this.resetPoint = reset;
    }

    update() {
        this.x -= this.moveSpeed;
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = this.resetPoint;
    }
}