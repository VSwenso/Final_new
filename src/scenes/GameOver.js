class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('madpoon', './assets/images/madpoon.png')
    }

    create() {
        // Set the background color
        this.cameras.main.setBackgroundColor('#000000'); // Set to black for example
    
        // Display "Game Over" text
        let gameOverTextConfig = {
            fontFamily: 'Helveta',
            fontSize: '72px',
            color: '#FF0000',  // Red color
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
        };
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'You Were Caught!', gameOverTextConfig)
            .setOrigin(0.5)
            .setDepth(1);
    
        // Display "Press SpaceBar to Play again!" text
        let playAgainTextConfig = {
            fontFamily: 'Helvetica', 
            fontSize: '32px',
            color: '#FFFFFF',  // White color
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
        };
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Press SpaceBar to Play again!', playAgainTextConfig)
            .setOrigin(0.5)
            .setDepth(1);

        // Add the madpoon image
        let madpoonImage = this.add.image(this.scale.width / 2, this.scale.height / 2 + 175 , 'madpoon')
            .setOrigin(0.5)
            .setDepth(1)
            .setScale(0.20)

        let startSound = this.sound.add('start', { volume: 1 });

        this.input.keyboard.on('keydown-SPACE', function () {
            // Transition to the next scene
            startSound.play()
            this.scene.start('menuScene'); // Replace 'NextScene' with the key of the scene you want to transition to
        }, this); 
    }
    
}
