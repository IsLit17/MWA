class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, chord) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        this.name = chord;
        this.body.allowGravity = false;
    }
    addToItems(items) {
        if (!items.includes(this.name)) {
            items.push(this.name);
        }
    }
}