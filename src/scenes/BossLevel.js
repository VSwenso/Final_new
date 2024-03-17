class BossLevel extends Phaser.Scene {
    constructor() {
        super('BossLevel');
        //this.backgroundScrolling = true;
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
        this.load.image('projectileKey', './assets/projectile.png'); // Adjust the key and file path accordingly


        //Load Spritesheets
        this.load.spritesheet('bosskid', './assets/bosskid.png', {
            frameWidth: 80,
            frameHeight: 80
        });

        this.load.spritesheet('allsprites', './assets/allSprites.png', {
            frameWidth: 75,
            frameHeight: 80  
        });
    }

    shootProjectile() {
        const projectile = this.physics.add.sprite(this.bosskid.x, this.bosskid.y, 'projectileKey'); // Adjust 'projectileKey' to your actual key
        projectile.setScale(1); // Adjust the scale as needed
        this.physics.world.enable(projectile);
        projectile.setVelocityX(1000); // Adjust the projectile speed
        projectile.setCollideWorldBounds(true);
    
        // Add collision event for the projectile
        this.physics.add.collider(projectile, this.grandma, this.handleProjectileCollision, null, this);
    
        // Add projectile to the group
        this.projectiles.add(projectile);
    }

    create() {

    this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'BossBack').setOrigin(0, 0);


    // Add the bosskid sprite and set its initial position
    this.bosskid = this.physics.add.sprite(-700, 450, 'bosskid').setOrigin(-1.75, 0.5);
    this.bosskid.setScale(3.5);
    this.physics.world.enable(this.bosskid); // Make sure to enable physics for bosskid
    this.bosskid.setCollideWorldBounds(true);
    this.bosskid.body.setSize(25, 30); // Adjust the width and height as needed

     // Add the grandma sprite and set its initial position on the right side
     this.grandma = this.physics.add.sprite(700, 450, 'allsprites').setOrigin(0.25, 0.5);
     this.physics.world.enable(this.grandma);
     this.grandma.body.setSize(40, 50); // Adjust the width and height as needed
     this.grandma.body.setOffset(50, 20);
 
     // Animation and scaling for the grandma sprite
     this.anims.create({
         key: 'move-play',
         frames: this.anims.generateFrameNumbers('allsprites', { start: 0, end: 1 }),
         frameRate: 5,
         repeat: -1,
     });

    // Add animation for bosskid moving left
    this.anims.create({
        key: 'bosskid-left',
        frames: this.anims.generateFrameNumbers('bosskid', { start: 0, end: 3 }),
        frameRate: 15 ,
        repeat: -1,
    });

    // Add animation for bosskid moving right
    this.anims.create({
        key: 'bosskid-right',
        frames: this.anims.generateFrameNumbers('bosskid', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: -1,
    });
 
     this.grandma.anims.play('move-play');
     this.grandma.setScale(-3.25 , 3.25); // Set the X-axis scale to -2
     this.grandma.setVelocityX(-50); // Set initial velocity towards the kid sprite
 
     // Add collision event
     this.physics.add.collider(this.bosskid, this.grandma, this.handleCollision, null, this);

    // Create a group for projectiles
    this.projectiles = this.physics.add.group();

 }


    // New method to handle game reset
    resetGame() {
        // Reset player and grandma positions
        this.bosskid.setPosition(100, 300);
        this.grandma.setPosition(100, 300);

        // Show the kidskate sprite
        this.bosskid.setVisible(true);

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
                this.bosskid.setVelocityX(-this.PLAYER_VELOCITY);
                this.bosskid.anims.play('bosskid-left', true); // Play left animation
                this.bosskid.setFlipX(true); // Flip the sprite horizontally
            } else if (cursors.right.isDown) {
                this.bosskid.setVelocityX(this.PLAYER_VELOCITY);
                this.bosskid.anims.play('bosskid-right', true); // Play right animation
                this.bosskid.setFlipX(false); // Reset the sprite orientation
            } else {
                this.bosskid.setVelocityX(0);
                this.bosskid.anims.stop(); // Stop animation when not moving
            }

            // Checking up arrow key press to make the bosskid jump
            if (cursors.up.isDown && this.bosskid.body.onFloor()) {
                // Set vertical velocity to make the bosskid jump
                this.bosskid.setVelocityY(-800); // Adjust the value based on your needs
            }

            // Check for shooting when spacebar is pressed
            if (cursors.space.isDown) {
                this.shootProjectile();
            }
 
            // Check for collision
            this.physics.world.overlap(this.bosskid, this.grandma, this.handleCollision, null, this);
        } else {
            // If player movement is not allowed, set velocity to zero
            this.bosskid.setVelocity(0, 0);
        }
    
        // Move the grandma towards the kid
        const grandmaSpeed = 50; // You can adjust the speed as needed
    
        const deltaX = this.bosskid.x - this.grandma.x;
        const deltaY = this.bosskid.y - this.grandma.y;
    
        // Calculate the angle between the grandma and kid
        const angle = Math.atan2(deltaY, deltaX);
    
        // Set grandma velocity based on the angle
        this.grandma.setVelocityX(Math.cos(angle) * grandmaSpeed);
        this.grandma.setVelocityY(Math.sin(angle) * grandmaSpeed);
    
        // Face the grandma in the direction of movement
        if (this.bosskid.x > this.grandma.x) {
            this.grandma.setFlipX(false); // Face right
        } else {
            this.grandma.setFlipX(true); // Face left
        }
    }

    handleProjectileCollision(projectile, grandma) {
        // Add logic for what happens when a projectile collides with another sprite
        projectile.destroy(); // Destroy the projectile on collision
    }
    
    handleCollision() {
        if (!this.gameOver) {
            // Stop the existing animations for both kidskate and grandma
            this.grandma.anims.stop();
    
            // Hide the kidskate sprite
            this.bosskid.setVisible(false);

            this.sound.play('kissy', { rate: 3 });
    
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
