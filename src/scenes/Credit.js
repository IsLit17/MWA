class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        this.load.image('credits', './assets/Credits.png');
    }

    create() {
        this.add.image(0,0, 'credits', 0).setOrigin(0,0);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('menuScene');
        }
    }
}