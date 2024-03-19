class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
        this.backgroundScrolling = true;
        this.allowPlayerMovement = true;

        this.allowedArea = {
            x: { min: -300, max: 850  }, // Adjust these values based on your allowed area
            y: { min: 250 , max: 455  }  // Adjust these values based on your allowed area
        };
        this.timer = null; // Add this line to initialize the timer property
    }

    init() {
        this.PLAYER_VELOCITY = 500;
        this.gameOver = false
    }

    preload() {
        // Load background
        this.load.image('runnerback', './assets/runnerback.png');
        // Load kid
        this.load.image('kidskate', './assets/KIDskateboard.png');
        //Load Obstacles
        //this.load.image('tempobstacle', './assets/tempobstacle.png')
        this.load.image('GrannyCat', './assets/GrannyCat.png')
        this.load.image('aroundObs', './assets/Obstacle1.png')

        //Load Spritesheets
        this.load.spritesheet('allsprites', './assets/allSprites.png', {
            frameWidth: 75,
            frameHeight: 80  
        });

        this.load.spritesheet('crash', './assets/kidcrash.png', {
            frameWidth: 80,
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
            key: 'move-play-2',
            frames: this.anims.generateFrameNumbers('allsprites', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1,
        });

        this.grandma.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, function () {
            this.grandma.anims.play('move-play-2');
        });

       this.grandma.anims.play('move-play-2');
       this.grandma.setScale(-1.5, 2); // Set the X-axis scale to -2
       
        // Add collision event
        this.physics.add.collider(this.kidskate, this.grandma, this.handleCollision, null, this);

        this.physics.add.collider(this.kidskate, this.GrannyCat, this.handlecatCollision, null, this)

        // Create a group for obstacles
        this.obstaclesGroup = this.physics.add.group();

        // Start spawning obstacles at a regular interval
        this.spawnObstacleTimer = this.time.addEvent({
            delay: 1500, // Adjust the delay as needed
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true,
        });

        // Add the kid crash animation
        this.anims.create({
            key: 'kidCrash2',
            frames: this.anims.generateFrameNumbers('crash', { start: 0, end: 1 }),
            frameRate: 9,
            repeat: 0, // Play the animation only once
        });

        // Add collision event between kidskate and tempobstacle
        this.physics.add.collider(this.kidskate, this.obstaclesGroup, this.handleObstacleCollision, null, this);
    }

    startTimer() {
        // Check if the gameover condition is met
        this.timer = setTimeout(() => {
            if (!this.gameOver) {
                this.scene.start('BossStart'); // Replace 'SceneStart2' with the actual key of your next scene
            }
        }, 45000); // 45(45000) seconds in milliseconds
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
        this.grandma.anims.play('move-play-2');

        // Reset flags and variables
        this.allowPlayerMovement = true;
        this.backgroundScrolling = true;

        clearTimeout(this.timer); // Clear the timer using the stored timeout ID
    }

    spawnObstacle() {
        // Define x and y outside of the if conditions
        let x, y;
    
        const obstacleType = Phaser.Math.RND.pick(['aroundObs', 'underObs', 'GrannyCat']);
    
    // Adjust the size of the physics body based on the obstacle type
    if (obstacleType === 'aroundObs') {
        x = this.allowedArea.x.max;
        y = Phaser.Math.Between(this.allowedArea.y.min, this.allowedArea.y.max - 100);
    } else if (obstacleType === 'underObs') {
        x = this.allowedArea.x.max;
        y = this.allowedArea.y.min + (this.allowedArea.y.max - this.allowedArea.y.min) / 2;
    } else if (obstacleType === 'GrannyCat') {
        x = this.allowedArea.x.max;
        y = Phaser.Math.Between(this.allowedArea.y.min, this.allowedArea.y.max - 100);
     }

    const obstacle = this.obstaclesGroup.create(x, y, obstacleType);

    if (obstacleType === 'aroundObs') {
        obstacle.setScale(0.8);
        obstacle.body.setSize(25, 150);
        obstacle.body.setOffset(276 , 70); // Adjust OffsetX as needed
    } else if (obstacleType === 'underObs') {
        obstacle.setScale(1.25);
        obstacle.body.setSize(10, 10);
        obstacle.body.setOffset(375, 600); // Adjust OffsetX as needed
    } else if (obstacleType === 'GrannyCat') {
        obstacle.setScale(3.2); // Adjust scale as needed
        obstacle.body.setSize(10, 10); // Adjust size as needed
        obstacle.body.setOffset(8, 8); // Adjust OffsetX as needed
    }
    
        obstacle.setVelocityX(-this.PLAYER_VELOCITY); // Adjust the velocity as needed
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

            // Check if the kid is outside the allowed area on the X-axis
            if (this.kidskate.x < this.allowedArea.x.min) {
                this.kidskate.x = this.allowedArea.x.min;
            } else if (this.kidskate.x > this.allowedArea.x.max) {
                this.kidskate.x = this.allowedArea.x.max;
            }

            // Check if the kid is outside the allowed area on the Y-axis
            if (this.kidskate.y < this.allowedArea.y.min) {
                this.kidskate.y = this.allowedArea.y.min;
            } else if (this.kidskate.y > this.allowedArea.y.max) {
                this.kidskate.y = this.allowedArea.y.max;
            }
        } else {
            // If player movement is not allowed, set velocity to zero
            this.kidskate.setVelocity(0, 0);
        }

        // Update grandma position to follow kidskate on the same Y-axis
        this.grandma.y = this.kidskate.y;

        // Continue scrolling the background only if background scrolling is allowed
        if (this.backgroundScrolling) {
            this.runnerback.tilePositionX += 7; // Adjust the scrolling speed as needed
        }

        // Check if it's time to spawn a new obstacle
        const spawnInterval = Phaser.Math.Between(1000, 5000); // Set the interval as needed
        if (Phaser.Time.TimerEvent.SECOND * this.time.now % spawnInterval === 0) {
            this.spawnObstacle();
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

        this.sound.play('kissy', { rate: 3 });

        // After the collision animation is done, transition to the GameOver scene
        this.grandma.once('animationcomplete', () => {

            // Reset the game state
            this.resetGame();


            // Transition to the GameOver scene
            this.scene.start('GameOver');
        });
    }

    handleObstacleCollision(kid, obstacle) {
        if (obstacle.texture.key === 'GrannyCat') {
            // Stop the existing animations for both kidskate and grandma
            this.grandma.anims.stop();
        
            this.allowPlayerMovement = false;
            this.gameOver = true;
            this.backgroundScrolling = false;
        
            // Reset the game state
            this.resetGame();
        
            // Transition to the GameOver scene
            this.scene.start('GameOver');
        //} else {
            // If the obstacle is not a GrannyCat, play the kid's crash animation
            //this.kidskate.play('kidCrash');
        
            // After the crash animation is done, transition to the GameOver scene
            //this.kidskate.once('animationcomplete', () => {
                // Reset the game state
            this.resetGame();
        
                // Transition to the GameOver scene
            this.scene.start('GameOver');
            //});
        }
    }
}