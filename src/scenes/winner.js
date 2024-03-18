class winner extends Phaser.Scene {
    constructor() {
        super("winner");
        this.GOmusicPlaying = false;
    }

    preload() {
        this.load.image('winnerback', './assets/winscreen.png')
        //Load sprites
        this.load.audio('GOmusic', './assets/sounds/GameOver.mp3')
    }

    create() {    

        this.sound.stopAll();
        
        //set background 
        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'winnerback').setOrigin(0, 0);

        this.GOmusic = this.sound.add('GOmusic', { loop: true });
        this.GOmusic.play();
        this.GOmusicPlaying = true;

        // Display "Game Over" text
        let gameOverTextConfig = {
            fontFamily: 'Helveta',
            fontSize: '72px',
            color: '#FFFFFF',  // Red color
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
        };
        
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

        // Animation from 'allsprites' sprite sheet
        let allSprites = this.physics.add.sprite(100, this.scale.height / 2, 'allSprites');
        allSprites.setVelocityX(44); // Set initial velocity along X-axis


        allSprites.anims.play('move');
        allSprites.setScale(-2, 2); // Set the X-axis scale to -2

        // Wrap around the screen
        this.physics.world.wrap(allSprites); 
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 225, 'Press [R] to Play again!', playAgainTextConfig)
            .setOrigin(0.5)
            .setDepth(1);

        let startSound = this.sound.add('start', { volume: 1 });

        this.input.keyboard.on('keydown-R', function () {
            // Transition to the next scene
            startSound.play()
            this.scene.start('menuScene'); // Replace 'NextScene' with the key of the scene you want to transition to
        }, this); 
    }

    update() {
        // Check if the allSprites sprite exists and is out of the screen
        if (this.allSprites && this.allSprites.x !== undefined) {
            if (this.allSprites.x < 0) {
                this.allSprites.x = this.scale.width; // Move the allSprites sprite to the right edge of the screen
            } else if (this.allSprites.x > this.scale.width) {
                this.allSprites.x = 0; // Move the allSprites sprite to the left edge of the screen
            }
        }
    }    
}
