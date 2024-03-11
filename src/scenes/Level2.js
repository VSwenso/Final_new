class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
        this.backgroundScrolling = true;
        this.allowPlayerMovement = true;
    }

    init() {
        this.PLAYER_VELOCITY = 350;
        this.gameOver = false
    }

    preload() {
        // Load background
        this.load.image('runnerback', './assets/runnerback.png');
        // Load kid
        this.load.image('kidskate', './assets/KIDskateboard.png');

        //Load Spritesheets
        this.load.spritesheet('allsprites', './assets/allSprites.png', {
            frameWidth: 75,
            frameHeight: 80  
        });
    }

    create() {

        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'runnerback').setOrigin(0, 0);

        this.startTimer(); 

        // Add the kid sprite and set its initial position
        this.kidskate = this.physics.add.sprite(100, 300, 'kidskate').setOrigin(-1.75, 0.5);

        //make player bigger
        this.kidskate.setScale(1.75);

        // Enable physics for the kid sprite
        this.physics.world.enable(this.kidskate);

        // Set the kid sprite to collide with the world bounds
        this.kidskate.setCollideWorldBounds(true);

       // Customize the size of the physics body
       this.kidskate.body.setSize(25, 30); // Adjust the width and height as needed

        // Add the grandma sprite and set its initial position
        this.grandma = this.add.sprite(100, 300, 'allsprites').setOrigin(0.25, 0.5);

        // Enable phsyics for the grandma sprite
        this.physics.world.enable(this.grandma);

       // Set the offset to align the collision box better with the sprite
       this.grandma.body.setSize(40, 50); // Adjust the width and height as needed
       this.grandma.body.setOffset(60, 18);

        // Animation for the grandma sprite
        this.anims.create({
            key: 'move-play',
            frames: this.anims.generateFrameNumbers('allsprites', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1,
        });

        this.grandma.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, function () {
            this.grandma.anims.play('move-play');
        });

       this.grandma.anims.play('move-play');
       this.grandma.setScale(-1.5, 2); // Set the X-axis scale to -2
       
        // Add collision event
        this.physics.add.collider(this.kidskate, this.grandma, this.handleCollision, null, this);
    }

    // New method to start the timer
    startTimer() {
        // Check if the gameover condition is met
        setTimeout(() => {
            if (!this.gameOver) {
                this.scene.start('BossStart'); // Replace 'SceneStart2' with the actual key of your next scene
            }
            }, 10000); // 15 seconds in milliseconds
    }

    // New method to handle game reset
    resetGame() {
        // Reset player and grandma positions
        this.kidskate.setPosition(100, 300);
        this.grandma.setPosition(100, 300);

        // Show the kidskate sprite
        this.kidskate.setVisible(true);

        // Reset player and grandma animations
        //this.kidskate.anims.play('move');
        this.grandma.anims.play('move-play');

        // Reset flags and variables
        this.allowPlayerMovement = true;
        this.backgroundScrolling = true;

        // Start the timer for 15 seconds
        //this.startTimer();
    }

    update() {
        // Check if player movement is allowed
        if (this.allowPlayerMovement) {
            // Get keyboard input
            const cursors = this.input.keyboard.createCursorKeys();

            // Update player movement based on arrow keys
            if (cursors.left.isDown) {
                this.kidskate.setVelocityX(-this.PLAYER_VELOCITY);
            } else if (cursors.right.isDown) {
                this.kidskate.setVelocityX(this.PLAYER_VELOCITY);
            } else {
                this.kidskate.setVelocityX(0);
            }

            if (cursors.up.isDown) {
                this.kidskate.setVelocityY(-this.PLAYER_VELOCITY);
            } else if (cursors.down.isDown) {
                this.kidskate.setVelocityY(this.PLAYER_VELOCITY);
            } else {
                this.kidskate.setVelocityY(0);
            }
        } else {
            // If player movement is not allowed, set velocity to zero
            this.kidskate.setVelocity(0, 0);
        }

        // Update grandma position to follow kidskate on the same Y-axis
        this.grandma.y = this.kidskate.y;

         // Continue scrolling the background only if background scrolling is allowed
            if (this.backgroundScrolling) {
                this.runnerback.tilePositionX += 4; // Adjust the scrolling speed as needed
            }
    }

    handleCollision() {
        // Stop the existing animations for both kidskate and grandma
        //this.kidskate.anims.stop();
        this.grandma.anims.stop();

        // Hide the kidskate sprite
        this.kidskate.setVisible(false);

        this.allowPlayerMovement = false;
        this.gameOver = true;

        // Check if the animation with the key 'collisionGrandma' exists
        if (!this.anims.exists('collisionGrandma')) {
            // Create a new animation for grandma after collision
            this.anims.create({
                key: 'collisionGrandma',
                frames: this.anims.generateFrameNumbers('allsprites', { start: 6, end: 7 }),
                frameRate: 5,
                repeat: 0, // Play the animation only once
            });
        }

        // Stop the Background from scrolling
        this.backgroundScrolling = false;

        // Play the new animation for grandma
        this.grandma.anims.play('collisionGrandma');

        // After the collision animation is done, transition to the GameOver scene
        this.grandma.once('animationcomplete', () => {

            // Reset the game state
            this.resetGame();


            // Transition to the GameOver scene
            this.scene.start('GameOver');
        });
    }
}  
