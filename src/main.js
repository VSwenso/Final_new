/*-----------------------------------
Name: Kaylie Lepley and Tory Swenson
Make the Fake: Escape Grandma's House
Project time: Way too much (50+)
*------------------------------------*/

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
    scene: [Menu, SceneStart1, Level1, SceneStart2, Level2, BossStart, BossLevel, winner, GameOver ]
}

let cursors
let game = new Phaser.Game(config);

let { height, width } = game.config

// setting UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

/*
Infrastructure: 5
No crashes []
Updated GitHub [X]

Look and Feel: 5
Title Screen [X]
Credits [x]
Means of Completion/Conclusion [X]
Ability to Restart [X]
In-Game Instructions [X]

Artistic Cohesion: 10
Sounds[X]
Art [X]

Technical Execution: 20
What we used: Physics, text objects, animation manager, timers, tilemap [X] 5
Mechanical Cohesion []

Code Legibility: [X] 5

Polish and Style: [X] 5
*/