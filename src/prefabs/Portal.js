class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, dest) {
        //console.log(x + ", " + y);
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.destination = dest;
        this.setScale(1);
        this.body.allowGravity = false;
    }
}