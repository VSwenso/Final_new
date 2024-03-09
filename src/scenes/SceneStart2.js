class SceneStart2 extends Phaser.Scene {
    constructor() {
        super("SceneStart2")
    }

preload() {
    this.load.image('TutScreen2', './assets/TutScreen2.png')
}

    create() {
    // Add the lore text
    this.TutScreen2 = this.add.tileSprite(0, 0, 800, 600, 'TutScreen2').setOrigin(0, 0);

    //let loreText = "You acquired grandmas's shellphone and she wants it back! Avoid Grandma Shark, her decorative seaweed, and her grandfish for as long as you can. Stay safe Poon!";
    //this.add.text(50, 50, loreText, {
        //fontFamily: 'Helveta',
        //fontSize: '24px',
        //color: '#FFFFFF',
        //align: 'left',
        //wordWrap: { width: game.config.width - 500, useAdvancedWrap: true },
        //backgroundColor: '#0000FF', // Blue background color
        //padding: { left: 10, right: 10, top: 5, bottom: 5 } // Adjust the width as needed
    //}

    // Add "How to Play" section on the right side
    //let howToPlayText = "How to Play:\n\nUse the ^ (up) and v (down) arrow keys to move Poon.\nAvoid obstacles and Grandma Shark to score points.\nSwim for as long as possible to achieve the highest score!";
    //this.add.text(game.config.width / 2 + 50, 50, howToPlayText, {
            //fontFamily: 'Helveta',
            //fontSize: '24px',
            //color: '#FFFFFF',
            //align: 'left',
            //wordWrap: { width: game.config.width / 2 - 100, useAdvancedWrap: true }, // Adjust the width as needed
            //backgroundColor: '#0000FF', // Blue background color
            //padding: { left: 10, right: 10, top: 5, bottom: 5 } // Adjust the width as needed
        //}

    //let startGameText = "Click spacebar to start game";
    //this.add.text(game.config.width / 2, game.config.height - 150, startGameText, {
        //fontFamily: 'Helveta',
        //fontSize: '50px',
        //color: '#FFFFFF',
        //align: 'center',
        //backgroundColor: '#0000FF', // Blue background color
        //padding: { left: 10, right: 10, top: 5, bottom: 5 }
    //}).setOrigin(0.5);

    let startSound = this.sound.add('start', { volume: 1 });
    // Set up keyboard input for space bar
    this.input.keyboard.on('keydown-SPACE', function () {
    startSound.play()
    // Transition to the next scene
    this.scene.start('Level2'); // Replace 'NextScene' with the key of the scene you want to transition to
    }, this);    

    }

    update() {

    } 
}