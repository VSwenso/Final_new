class BossLevel extends Phaser.Scene {
    constructor() {
        super('BossLevel');
        this.backgroundScrolling = true;
        this.allowPlayerMovement = true;

        this.allowedArea = {
            x: { min: -300, max: 850  }, // Adjust these values based on your allowed area
            y: { min: 250 , max: 455  }  // Adjust these values based on your allowed area
        };
    }

    init() {
        this.PLAYER_VELOCITY = 350;
        this.gameOver = false
    }

    preload() {
        // Load background
        this.load.image('BossBack', './assets/BossBack.png');
        // Load kid
        this.load.image('kidskate', './assets/KIDskateboard.png');
        //Load Obstacles
        this.load.image('tempobstacle', './assets/tempobstacle.png')

        //Load Spritesheets
        this.load.spritesheet('allsprites', './assets/allSprites.png', {
            frameWidth: 75,
            frameHeight: 80  
        });
    }

    create() {

        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'BossBack').setOrigin(0, 0);

     // Add the kid sprite and set its initial position
     this.kidskate = this.physics.add.sprite(100, 300, 'kidskate').setOrigin(-1.75, 0.5);
     this.kidskate.setScale(1.75);
     this.physics.world.enable(this.kidskate);
     this.kidskate.setCollideWorldBounds(true);
     this.kidskate.body.setSize(25, 30); // Adjust the width and height as needed
 
     // Add the grandma sprite and set its initial position on the right side
     this.grandma = this.physics.add.sprite(700, 300, 'allsprites').setOrigin(0.25, 0.5);
     this.physics.world.enable(this.grandma);
     this.grandma.body.setSize(40, 50); // Adjust the width and height as needed
     this.grandma.body.setOffset(60, 18);
 
     // Animation and scaling for the grandma sprite
     this.anims.create({
         key: 'move-play',
         frames: this.anims.generateFrameNumbers('allsprites', { start: 0, end: 1 }),
         frameRate: 5,
         repeat: -1,
     });
 
     this.grandma.anims.play('move-play');
     this.grandma.setScale(-1.5, 2); // Set the X-axis scale to -2
     this.grandma.setVelocityX(-50); // Set initial velocity towards the kid sprite
 
     // Add collision event
     this.physics.add.collider(this.kidskate, this.grandma, this.handleCollision, null, this);
 }


    // New method to handle game reset
    resetGame() {
        // Reset player and grandma positions
        this.kidskate.setPosition(100, 300);
        this.grandma.setPosition(100, 300);

        // Show the kidskate sprite
        this.kidskate.setVisible(true);

        // Reset player and grandma animations
        this.grandma.anims.play('move-play');

        // Reset flags and variables
        this.allowPlayerMovement = true;
        this.backgroundScrolling = true;

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
    
            // Check for collision
            this.physics.world.overlap(this.kidskate, this.grandma, this.handleCollision, null, this);
        } else {
            // If player movement is not allowed, set velocity to zero
            this.kidskate.setVelocity(0, 0);
        }
    
        // Move the grandma towards the kid
        const grandmaSpeed = 50; // You can adjust the speed as needed
    
        const deltaX = this.kidskate.x - this.grandma.x;
        const deltaY = this.kidskate.y - this.grandma.y;
    
        // Calculate the angle between the grandma and kid
        const angle = Math.atan2(deltaY, deltaX);
    
        // Set grandma velocity based on the angle
        this.grandma.setVelocityX(Math.cos(angle) * grandmaSpeed);
        this.grandma.setVelocityY(Math.sin(angle) * grandmaSpeed);
    
        // Face the grandma in the direction of movement
        if (this.kidskate.x > this.grandma.x) {
            this.grandma.setFlipX(false); // Face right
        } else {
            this.grandma.setFlipX(true); // Face left
        }
    }
    
    handleCollision() {
        if (!this.gameOver) {
            // Stop the existing animations for both kidskate and grandma
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
}
