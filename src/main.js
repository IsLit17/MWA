//Zachary Hollaway, Sheel Kulkarni, Louis Lim
//Title: M.W.A.
//Published: 06/07/2022

/*
Mechanics Cohesion
The mechanics cohesion of our game is interaction with objects. In Metroidvania genre, players interact with three objects: enemies, items, and platforms.
Among them, we focused on the interaction between enemies and items. In combat between the player and the enemy, updates to the in-game hitbox are implemented. 
When the player is shot or hit by an enemy, he or she bounces off and cannot move for a while, but during this time, don't get damaged by the enemy. This is because the player can lose a lot of HP in a moment facing many enemies.
The player can change the type of weapon freely by the situation, and there's an interaction that tells players how to use when getting close to it. The mechanic of swapping ammunition was difficult process and took some time to implement.
We also created an enemy AI take can find the distance between the enemy and the player. The enemy can change direction in order to follow the player. It can also move up and down if the player is above or below it.
We also implemented an internal timer that will allow the enemy to fire at the player once detected. This was a very complicated process and took many hours to complete.
We are also really proud of our world transition mechanics. We believed that loading one giant world, would be quite taxing. So we decided to split it up into 3 seperate worlds and have another world that acts as a hub area.
This hub world can go to multiple worlds in order. Meaning that once one world is completed, only then can the player move on to the next.
There is also a feature that allows the player to restart the game for multiple playthroughs, once he or she is finished.

Art Cohesion
We feel that our game is very artistically coherent, ranging from the art, sound, and typography. In terms of our aesthetic/experience, we wanted to do both of the themes that we were
given weeks prior, and after many changes, we decided that color would be the best option. In order to reflect this, we wanted to have one singular enemy type that was different 
colors. To try and fit the fitting theme into our game, we made several bullets different colors as well, with each bullet only being effective against one enemy. For the missing 
theme, we had it to where the player must look for each of their lost bullets, to then add it to their arsenal. Each world is a different theme as well, with different color palettes 
to  reflect the multitude of different colors. World 1 has a night time theme, World 2 has a desert/wild west theme, and World 3 has a volcano based theme. The textures for each world is simplistic to allow the player a much easier time exploring.
This also fits in with our name of our game, as the player goes through diffferent worlds they need to explore. The portals that are used to transport the player also reflect the multiple worlds.
In terms of the sound, we had some music that was  very moody and dark, while others were very bright cheerful, which we feel adheres to the artistic cohesion. For our itch page, our typography wanted to 
reflect the pixel style that we used for our sprites. Our animations also make sense with each other, like with the drones and the explosions that occur when they are defeated.
We also use particle effects when the player hits a heart to show that health was gained.
*/

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug: false
        }
    },
    scene: [Menu, Tutorial, Instructions, Credit, Hub, World1, World2, World3]
}
let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyUP, keySPACE, keyR, keyM, keyT, keyA, keyD, keyW, keyP;

let borderS = game.config.height/10;

let gameOver = false;

let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#000000',
    color: '#b00000',
    align: 'center',
};

let clearConfig = {
    fontFamily: 'Roboto',
    fontSize: '20px',
    backgroundColor: '#00c853',
    color: '#ffffff',
    align: 'center',
};

let ammoConfig = {
    fontSize: '20px',
    backgroundColor: '#455a64',
    color: '#ffffff'
}

let x = game.config.width;
let y = game.config.height;
let borderUISize = game.config.width/15;
let borderPadding = borderUISize / 3;

let chords = [1];

let completed = [0, 0, 0];
