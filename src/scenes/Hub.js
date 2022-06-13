class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }
    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Take_Damage', './assets/Damage.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');
        this.load.audio('Hub_World', './assets/Hub_World.wav');
        this.load.audio('gunshot', './assets/gunshot.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tilesH', './assets/tilesheet0.png');
        this.load.tilemapTiledJSON('mapH', './assets/worldHub.json');
    }

    create() {
        // Hub World music

        this.hub_music = this.sound.add('Hub_World', {volume: 0.50});
        this.hub_music.play();
        this.hub_music.loop = true;

        // base settings for this scene
        gameOver = false;
        this.length = 40*32;
        this.height = 15*32;
        this.count = 0;
        this.physics.world.gravity.y = 2000;
        
        // Game Over music plays when player dies
        this.Game_over = this.sound.add('Game_over', {volume: 0.5});

        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.enabled = false;
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //this.add.text(20, 20, "Main Hub").setScrollFactor(0);
        this.add.text(84, 84, 'Press M for Menu', clearConfig).setScrollFactor(0);
        this.gameclear = this.add.text(360, 520, "Thanks for playing!", clearConfig).setScale(2).setScrollFactor(0.5).setVisible(false);
        this.gameclear2 = this.add.text(84, 104, "Press (R) to reset", clearConfig).setScale(1).setScrollFactor(0).setVisible(false);
        


        // map
        const map = this.make.tilemap({ key: 'mapH' });
        const tileSet = map.addTilesetImage('tile_sheet_0', 'tilesH');
        const backgroundLayer = map.createLayer("Background", tileSet, 0, 96).setScrollFactor(0.25); // background layer
        const groundLayer = map.createLayer("Ground", tileSet, 0, 96); // background layer
        const platforms = map.createLayer('Platforms', tileSet, 0, 96);
        platforms.setCollisionByExclusion(-1, true);

        // player
        let playerPos  = map.findObject("Player", obj => obj.name === "player");
        this.player = new Player(this, playerPos.x, playerPos.y, 'player', 0, keyA, keyD, keyW, keySPACE, keyLEFT, keyRIGHT, this.length, this.height).setOrigin(0,0);
        this.player.setMaxVelocity(1000, 900);

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,map.widthInPixels, map.heightInPixels + 96);
        this.cam.startFollow(this.player);
        this.cam.setBackgroundColor('#cfd8dc');

        // collision
        this.physics.add.collider(this.player, platforms);

        // portals
        let portalPos  = map.findObject("Portals", obj => obj.name === "portal1");
        this.portal = new Portal(this, portalPos.x, portalPos.y + 43, 'portal', 0, 'world1Scene').setOrigin(0);
        this.clear1 = this.add.text(portalPos.x, portalPos.y + 135, 'Cleared', clearConfig).setVisible(false);

        portalPos  = map.findObject("Portals", obj => obj.name === "portal2");
        this.portal2 = new Portal(this, portalPos.x, portalPos.y + 43, 'portal', 0, 'world2Scene').setOrigin(0);
        this.clear2 = this.add.text(portalPos.x, portalPos.y + 135, 'Cleared', clearConfig).setVisible(false);

        portalPos  = map.findObject("Portals", obj => obj.name === "portal3");
        this.portal3 = new Portal(this, portalPos.x, portalPos.y + 43, 'portal', 0, 'world3Scene').setOrigin(0);
        this.clear3 = this.add.text(portalPos.x, portalPos.y + 135, 'Cleared', clearConfig).setVisible(false);

        this.portal.play('portal');
        this.portal2.play('portal');
        this.portal3.play('portal');
        this.portal1Collides = this.physics.add.collider(this.player, this.portal, (obj1, obj2) => {
            this.scene.start(obj2.destination);
            this.hub_music.stop();
        }, null, this);
        
        this.portal2Collides = this.physics.add.collider(this.player, this.portal2, (obj1, obj2) => {
            this.scene.start(obj2.destination);
            this.hub_music.stop();
        }, null, this);
        this.portal2Collides.active = false;
        this.portal2.visible = false;

        this.portal3Collides = this.physics.add.collider(this.player, this.portal3, (obj1, obj2) => {
            this.scene.start(obj2.destination);
            this.hub_music.stop();
        }, null, this);
         this.portal3Collides.active = false;
         this.portal3.visible = false;
    }

    update() {
        if (completed[0] == 1) {
            this.portal2Collides.active = true;
            this.portal2.visible = true;
            this.clear1.setVisible(true);
        }
        if(completed[1] == 1){
            this.portal3Collides.active = true;
            this.portal3.visible = true;
            this.clear2.setVisible(true);
        }
        if(completed[2] == 1){
            this.clear3.setVisible(true);
        }

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.hub_music.stop();
            this.scene.start('menuScene');
        }

        if(completed[0] == 1 && completed[1] == 1 && completed[2] == 1){
            this.portal3Collides.active = false;
            this.portal2Collides.active = false;
            this.portal1Collides.active = false;
            this.gameclear.setVisible(true);
            this.gameclear2.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                completed[0] = 0;
                completed[1] = 0;
                completed[2] = 0;
                chords = [1];
                this.scene.start('menuScene');
            }
        }
        this.player.update();
    }
}