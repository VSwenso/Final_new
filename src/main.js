/*-----------------------------------
Name: Kaylie Lepley
Endless Runner: "No Poon!"
Project time: 35 Hours
*------------------------------------

/*---------------------------------------
//CREATIVE TILT//
This is the first 'official' game that I have made completley on my own and I'm quite content with how it turned out,
especially because I had no prior experience with JavaScript and or Phaser whatsoever. I had a lot of fun making the assets
for my game but should probably work on my art a bit more. The main part of my creative tilt is showcased in the insspiration
behind my game. The fish, "Poon", is based off my youngest sister "Paris" who is a year old and resembles the Studio Ghibli character
quite closely (hence her nickname Ponyo). She has a weird obsession with stealing my granndma's phone and so the game basically
mirrors my younger sister running away from my grandma (who in this game is "Grandma Shark"). The waves of enemy fish, or the
"grand fish" represent my other two siblings, as well as myself. We also, often find our phones getting stolen from baby Ponyo.

The game itself is a basic "avoid the obstacles and survive for as long as you can" type game and I inputted a lot of cool sounds
and a randomly generated terrain of obstacles. The game even has my younger sister's real laugh that plays as a sound effect
everytime the player loses, which I find cute. I do plan on making this game better even after this class is over with. I also want
to learn how to properly use prefabs so that I can clean up my code a bit and possibly even use this project within my resume.

I believe I properly implemented all of the required elements for the assignment in my endless runner and got a lot
of the documentation from Phaser's offcial page itself, as well as from Professor Nathan's git and examples. I'm also
especially pround of the Zigzag swimming pattern I gave to the Grandma Shark Character. Lastly, I would
also like to give a thanks to both TA's as they were also incredibly helpful within the process. 
------------------------------------------*/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu, SceneStart1, Level1, SceneStart2, Level2, BossStart, BossLevel, GameOver ]
}

let cursors
let game = new Phaser.Game(config);

let { height, width } = game.config

// setting UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


//Project Requirements:
// [X] Use multiple Scene classes (dictated by your game's style) (1)
// [X] Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
// [X] Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
// [X] Have some form of player input/control appropriate to your game design (1)
// [X] Include one or more animated characters that use a texture atlas* (1)
// [X] Simulate scrolling with a tileSprite (or equivalent means) (1)
// [X] Implement proper collision detection (via Arcade Physics or a custom routine) (1)
// [X] Have looping background music* (1)
// [X] Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
// [X] Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
// [X] Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
// [X] Be theoretically endless (1)
// [X] Be playable for at least 15 seconds for a new player of low to moderate skill (1)
// [X] Run without significant crashes or errors (1)
// [] Include in-game credits for all roles, assets, music, etc. (1)