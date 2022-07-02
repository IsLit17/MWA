class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Take_Damage', './assets/Damage.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');
        this.load.audio('tutorial_music', './assets/Tutorial_Music.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tiles', './assets/tilesheet.png');
        this.load.tilemapTiledJSON('map', './assets/tutorial_level.json');
        this.load.image('spike', './assets/spike.png');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.image('bullet', './assets/bullet.png');

        this.load.spritesheet('enemy', './assets/blueDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet("healthBar", "./assets/healthBar.png", {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 3});
        //bullet image
        this.load.image('bullet1', './assets/bullet1.png');
        this.load.image('bullet2', './assets/bullet2.png');
    }

    create() {
        // Tutorial level music
        this.tutorial_music = this.sound.add('menu_music', {volume: 0.50});
        this.tutorial_music.play();
        this.tutorial_music.loop = true;

        // SFX
        this.damageFX = this.sound.add('Take_Damage', {volume: 0.80});

        // base settings for this scene
        gameOver = false;
        this.length = 55*64;
        this.height = 8*64;
        this.count = 0;
        this.physics.world.gravity.y = 2000;
        this.physics.world.setBounds(0, 0, this.length, this.height*2);
        
        // Game Over music plays when player dies
        this.Game_over = this.sound.add('Game_over', {volume: 0.5});

        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.enabled = false;
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.add.text(20, 20, "Tutorial Level").setScrollFactor(0);
        this.healthBar = this.add.image(710, 30, 'healthBar', 3).setScrollFactor(0);
        this.add.text(84, 84, "Pick up the musical chord while avoiding the spikes").setScrollFactor(0); //UI scroll
        this.moveTuto = this.add.text(120, 540, "Press A D to Move");
        this.jumpTuto = this.add.text(600, 470, "Press W to Jump").setVisible(false);
        this.dangerTuto = this.add.text(1500, 400, "CAUTION ↓").setScale(2).setVisible(false);
        this.enemyTuto = this.add.text(2500, 470, "DANGER! →").setScale(2).setVisible(false);
        this.shootTuto = this.add.text(3200, 5*64, "Press SPACE to Shoot").setVisible(false);

        // map
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('simple_tileset', 'tiles');
        this.platforms = map.createLayer('Platforms', tileSet, 0, 200);
        this.platforms.setCollisionByExclusion(-1, true);

        // player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.player = new Player(this, 0, 130, 'player', 0, keyA, keyD, keyW, keySPACE, keyLEFT, keyRIGHT, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');
        this.player.setMaxVelocity(1000, 900);
        this.player.body.setCollideWorldBounds();

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,this.length, this.height);
        this.cam.setBackgroundColor('#275D74');
        this.cam.startFollow(this.player);

        // collision
        this.physics.add.collider(this.player, this.platforms);

        // spikes
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            let sSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
            sSprite.body.setSize(spike.width, spike.height - 32).setOffset(0, 32);
        });
        this.collider = this.physics.add.overlap(this.player, this.spikes, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.collider.active = false;
            this.overlap.active = false;
            this.overlap2.active = false;
            this.player.hitted = true;
            this.player.shadow = true;
            this.looseHealth();
            this.damageFX.play();
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });

        // portal
        this.portal = new Portal(this, this.length - 64, 5*64, 'portal', 0, 'instructionsScene').setOrigin(0).setActive(false).setVisible(false);
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        this.portal.play('portal');
        this.portalSwitch = this.physics.add.collider(this.player, this.portal, this.switchScene, null, this);
        this.portalSwitch.active = false;

        //item
        this.item = new Item(this, this.length - 256, 5*64, 'chord1', 0, 1).setOrigin(0);
        this.physics.add.overlap(this.player, this.item, this.collectChord, ()=>{
            keySPACE.enabled = true;
            this.shootTuto.setVisible(true);
        }, this);

        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.enemy = new Enemy(this, 3200, 400, 'enemy', 0, this.length, this.height, 1).setOrigin(0,0).setImmovable(true);
        this.enemy.play('idle2');
        this.physics.add.collider(this.enemy, this.platforms);

        this.overlap = this.physics.add.overlap(this.player, this.enemy, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.collider.active = false;
            this.overlap.active = false;
            this.overlap2.active = false;
            this.player.hitted = true;
            this.looseHealth();
            this.damageFX.play();
            this.player.shadow = true;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });

        this.bullets = this.add.group();
        this.overlap2 = this.physics.add.overlap(this.player, this.bullets, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.overlap2.active = false;
            this.overlap.active = false;
            this.collider.active = false;
            this.player.hitted = true;
            this.looseHealth();
            this.damageFX.play();
            this.player.shadow = true;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });
    }

    update() {
        if (!gameOver) {
            this.player.update(this.enemy, this.platforms);
            this.enemy.update(this.player, this.platforms);
            if (this.player.y >= this.height) { // falling off a ledge
                gameOver = true;
            }
        } else {
            if (this.count < 1) {
                this.tutorial_music.stop();
                this.Game_over.play();
                x = this.player.x;
                y = game.config.height/2;
                this.count += 1;
            }
            this.physics.pause();
            this.add.text(this.cameras.main.worldView.x + this.cameras.main.worldView.width/2, this.cameras.main.worldView.y + this.cameras.main.worldView.height/2, 'Game Over', scoreConfig).setOrigin(0.5);
            this.add.text(this.cameras.main.worldView.x + this.cameras.main.worldView.width/2, this.cameras.main.worldView.y + this.cameras.main.worldView.height/2 + 32, 'Press (P) to Restart or ← to return to menu', scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyP)) {
                this.tutorial_music.stop();
                this.Game_over.stop();
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.tutorial_music.stop();
                this.Game_over.stop();
                this.scene.start('menuScene');
            }
        }
        
        if(this.enemy.y >=this.height){
            if(this.enemy.shooterEvent)
                this.enemy.shooterEvent.destroy();
            this.enemy.destroy();
        }
        

        if(this.player.x > 460){
            this.jumpTuto.setVisible(true);
        }

        if(this.player.x > 1400){
            this.dangerTuto.setVisible(true);
        }

        if(this.player.x > 2400){
            this.enemyTuto.setVisible(true);
        }

        if(!this.enemy.body){
            this.time.addEvent({
                delay: 2000,
                callback: ()=>{
                    this.portalSwitch.active = true;
                    this.portal.setActive(true).setVisible(true);
                },
                loop: false
            })
        }

        
    }

    switchScene() {
        this.scene.start(this.portal.destination);
        this.tutorial_music.stop();
    }
    collectChord() {
        this.item.destroy();
    }
    looseHealth() {
        this.player.life -= 1;
        if (this.player.life >= 3) {
            this.healthBar.setFrame(3);
        }
        else if (this.player.life <= 0) {
            this.player.life = 0;
            gameOver = true;
            this.healthBar.setFrame(0);
        } else {
            this.healthBar.setFrame(this.player.life);
        }
    }
}