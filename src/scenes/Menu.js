class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
        // load audio
        this.load.audio('menu_music', './assets/Menu_Music.wav');
        this.load.audio('gunshot', './assets/gunshot.wav');
        this.load.audio('explosion', './assets/explosion.wav');
        this.load.audio('health', './assets/healthIncrease.wav');
        this.load.audio('ineffective', './assets/not_effective.wav');
        this.load.audio('damage', './assets/Damage.wav');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_idle', './assets/playerIdle2.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 4});
        this.load.spritesheet('player_walk', './assets/playerWalk3.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player_jump', './assets/playerJump2.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        this.load.image('bullet1', './assets/bullet1.png');
        this.load.image('bullet2', './assets/bullet2.png');
        this.load.image('bullet3', './assets/bullet3.png');
        this.load.image('bullet4', './assets/bullet4.png');
        this.load.image('bullet5', './assets/bullet5.png');


        this.load.image('chord1', './assets/blueStar.png');
        this.load.image('chord2', './assets/purpleStar.png');
        this.load.image('chord3', './assets/redStar.png');
        this.load.image('chord4', './assets/greenStar.png');
        this.load.image('chord5', './assets/yellowStar.png')

        this.load.spritesheet('enemy', './assets/blueDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy2', './assets/purpleDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy3', './assets/redDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy4', './assets/greenDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy5', './assets/yellowDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});

        this.load.image('title', './assets/Title.png');
    }

    create() {

        this.menu_music = this.sound.add('menu_music', {volume: 0.50});
        this.menu_music.play();
        this.menu_music.loop = true;

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        //animation preload
        //player animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_idle', { 
                start: 0, 
                end: 4, 
                first: 0
            }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player_walk', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 9,
            repeat: -1,
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_walk', { 
                start: 1, 
                end: 1, 
                first: 1
            }),
            frameRate: 5,
            repeat: -1
        });

        //enemy animation
        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle3',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle4',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle5',
            frames: this.anims.generateFrameNumbers('enemy4', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle6',
            frames: this.anims.generateFrameNumbers('enemy5', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        //portal animation
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        //explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

    // show menu text
    this.add.image(0,0, 'title', 0).setOrigin(0,0);
    // define keys
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.menu_music.stop();
            this.scene.start('instructionsScene');
        }
        else if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.menu_music.stop();
            this.scene.start('tutorialScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.menu_music.stop();
            this.scene.start('creditScene');
        }
    }
}