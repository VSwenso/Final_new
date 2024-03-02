class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }
    
    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {

        //Load Sprite Atlas
        this.load.atlas('fish', './assets/realpoonfish2.png', 'sprites.json')
        
        //Load background
        this.load.image('runnerback', './assets/runnerback.png')

        //Load kid
        this.load.image('kidskate', './assets/KIDskateboard.png')

        //load
        this.load.image('seaweed', './assets/images/seaweed.png')
        this.load.image('floor', './assets/images/pebblefloor.png')
        this.load.image('enemy', './assets/images/kajfish.png')

        //Load Audio
        this.load.audio('death', './assets/sounds/Ponyo_death.mp3')
        this.load.audio('weedeath', './assets/sounds/big-bubble.mp3')
        this.load.audio('fishdeath', './assets/sounds/waterdrop.mp3')
        this.load.audio('woosh', './assets/sounds/woosh.mp3')
        this.load.audio('sharkdeath', './assets/sounds/sharkdeath.mp3')

        //Load sprites
        this.load.spritesheet('fish1', './assets/realpoonfish2.png', {
            frameWidth: 46,
            frameHeight: 100  
        });

        this.load.spritesheet('GrandmaShark', './assets/realGrandmaShark.png', {
            frameWidth: 85,
            frameHeight: 50
        })
    
    }
    create() {

        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'runnerback').setOrigin(0, 0);


        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '28px',
             backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(
            this.scale.width - borderUISize - borderPadding - scoreConfig.fixedWidth,
            borderUISize + borderPadding -45 , // Adjust the y value for higher position
            this.p1Score,
            scoreConfig
        );
        this.scoreLeft.setDepth(1);

        let scoreLabelConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 100
        }
        this.scoreLabel = this.add.text(
            this.scale.width - borderUISize - borderPadding - scoreLabelConfig.fixedWidth - 70 ,
            borderUISize + borderPadding - 45  ,
            'Score :',
            scoreLabelConfig
        );
        this.scoreLabel.setDepth(1);

        this.scoreTimer = this.time.addEvent({
            delay: 1000,  // 1000 milliseconds (1 second)
            callback: this.updateScore,
            callbackScope: this,
            loop: true
        });

    
        //this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Create the ground and ceiling sprite and a corresponding physics body
        this.ground = this.add.tileSprite(0, this.scale.height - 60, this.scale.width, 60, 'floor').setOrigin(0);
        this.physics.world.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.ceiling = this.add.tileSprite(0, 0, this.scale.width, 60, 'floor').setOrigin(0);
        this.physics.world.enable(this.ceiling);
        this.ceiling.body.allowGravity = false;
        this.ceiling.body.immovable = true;

        // Set up a timer to spawn Grandma Shark every 10 seconds
        this.spawnGrandmaTimer = this.time.addEvent({
            delay: 5000 , // 10 seconds
            callback: this.spawnGrandmaShark,
            callbackScope: this,
            loop: true
        });

        // Create a group for seaweed at the top
        this.topSeaweeds = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'seaweed', // Replace 'seaweed' with the key of your seaweed image
            repeat: 1 , // Adjust the number of seaweeds as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: 122, // Initial Y position for the top seaweed
                stepX: 10000, // Horizontal spacing between seaweeds
            },
        });

        // Create a group for seaweed at the bottom
        this.bottomSeaweeds = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'seaweed', // Replace 'seaweed' with the key of your seaweed image
            repeat: 1 , // Adjust the number of seaweeds as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: game.config.height - 122, // Initial Y position for the bottom seaweed
                stepX: 500  , // Horizontal spacing between seaweeds
            },
        }); 

        // Set up movement and flipping for top seaweed
        this.topSeaweeds.children.iterate((seaweed) => {
            seaweed.setScale(.35); // Adjust the scale factor
            this.physics.world.enable(seaweed); // Enable physics for the seaweed

            // Set up velocity on the body of the seaweed
            seaweed.body.setVelocityX(-150); // Adjust the speed as needed

            // Flip the seaweed upside down
            seaweed.setFlipY(true);

            // Adjust collider box size and offset
            seaweed.body.setSize(seaweed.width * .5, seaweed.height * .8  ).setOffset(seaweed.width * .2 , seaweed.height * .01   );


            // Add collision between seaweed and ceiling
            this.physics.add.collider(seaweed, this.ceiling, this.adjustSeaweedPosition, null, this);
        });

        // Set up movement and flipping for bottom seaweed
        this.bottomSeaweeds.children.iterate((seaweed) => {
            seaweed.setScale(0.35); // Adjust the scale factor
            this.physics.world.enable(seaweed); // Enable physics for the seaweed

            // Set up velocity on the body of the seaweed
            seaweed.body.setVelocityX(-250 ); // Adjust the speed as needed

            // Adjust collider box size and offset
            seaweed.body.setSize(seaweed.width * .5, seaweed.height * .8  ).setOffset(seaweed.width * .2 , seaweed.height * .01   );

            // Add collision between seaweed and ground
            this.physics.add.collider(seaweed, this.ground, this.adjustSeaweedPosition, null, this);
        });


        // Create a group to hold multiple enemies
        this.enemies = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'enemy',
            repeat: 2, // Adjust the number of enemies as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: Phaser.Math.Between(game.config.height / 3, (2 * game.config.height) / 3), // Initial Y position within the middle third
                stepX: 100, // Horizontal spacing between enemies
            }
        });

        // Set up movement for each enemy
        this.enemies.children.iterate((enemy) => {
            enemy.setScale(.5); // Adjust the scale factor
            this.physics.world.enable(enemy); // Enable physics for the enemy

            // Set up velocity on the body of the enemy
            enemy.body.setVelocityX(-500); // Adjust the speed as needed
        });

        // Set up player sprite with physics
        this.player = this.physics.add.sprite(100, game.config.height / 2, 'fish1', 1).setScale(1.5 );
        this.physics.world.enable(this.player); // Make sure this line is executed before setting up collisions

        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(25 , 25 ).setOffset(8, 35);

        cursors = this.input.keyboard.createCursorKeys();

        // Start the Enemy scene
        //this.scene.launch('enemyScene');

        // Set up collision between fish1 and ground/ceiling with callback
        this.physics.add.collider(this.player, this.ground, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.ceiling, this.gameOver, null, this);

        // Set up collisions
        this.checkCollision(this.player, this.enemies)
        this.checkBotWeedCollision(this.player, this.bottomSeaweeds)
        this.checkTopWeedCollision(this.player, this.topSeaweeds)
        //this.physics.add.collider(this.player, this.topSeaweeds, this.gameOver, null, this);
        //this.physics.add.collider(this.player, this.bottomSeaweeds, this.gameOver, null, this);
            

    
    if (!this.anims.exists('idle-down')) {
        this.anims.create({
            key: 'idle-down',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fish1', {
                start: 0,
                end: 3
            })
        });
    }

    if (!this.anims.exists('walk-down')) {
        this.anims.create({
            key: 'walk-down',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fish1', {
                start: 0,
                end: 3
            })
        });
    }

    if (!this.anims.exists('walk-up')) {
        this.anims.create({
            key: 'walk-up',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fish1', {
                start: 0,
                end: 3
            })
        });
    }

    this.speedUpTimer = this.time.addEvent({
        delay: 10000 ,  // 10 seconds 
        callback: this.speedUpEverything,
        callbackScope: this,
        loop: true
    });


    }


    update() {


        // Check if any top seaweed is off the left side of the screen
        this.topSeaweeds.children.iterate((seaweed) => {
            if (seaweed.x < 0) {
                // Respawn the seaweed on the right side
                seaweed.x = game.config.width + 50;
                seaweed.y = 122; // Adjust the initial Y position for the top seaweed
            }
        });

        // Check if any bottom seaweed is off the left side of the screen
        this.bottomSeaweeds.children.iterate((seaweed) => {
            if (seaweed.x < 0) {
                // Respawn the seaweed on the right side
                seaweed.x = game.config.width + 50;
                seaweed.y = game.config.height - 122; // Adjust the initial Y position for the bottom seaweed
            }
        });

        // Continuously scroll the background to the left
        this.runnerback.tilePositionX += 4; // Adjust the scrolling speed as needed

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        //handle up/down
        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if(cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        // Flip the sprite based on the direction
        this.player.setFlipX(true);

        
            //playerVector.normalize()

            playerVector.normalize()

            this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    
            let playerMovement
            playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
            this.player.play(playerMovement + '-' + playerDirection, true)
    
        // Check if any enemy is off the left side of the screen
        this.enemies.children.iterate((enemy) => {
            if (enemy.x < 0) {
                // Respawn the enemy on the right side with a new random vertical position
                enemy.x = game.config.width + 50; // Initial X position off the right side of the screen
                enemy.y = Phaser.Math.Between(game.config.height / 3, (2 * game.config.height) / 3); // Initial Y position within the middle third
            }
        });
}

    // Function to spawn Grandma Shark
    spawnGrandmaShark() {
        // Create Grandma Shark sprite
        // Calculate a random vertical position for Grandma Shark within a safe range
        const safeVerticalPosition = Phaser.Math.Between(100, this.scale.height - 100);

        // Create Grandma Shark sprite
        const grandmaShark = this.physics.add.sprite(this.scale.width + 50, safeVerticalPosition, 'GrandmaShark').setScale(1.5);

        // Enable physics for Grandma Shark
        this.physics.world.enable(grandmaShark);

        // Set up velocity to move Grandma Shark from right to left
        grandmaShark.body.setVelocityX(-800); // Adjust the speed as needed

        // Adjust collider box size and offset
        grandmaShark.body.setSize(grandmaShark.width * 0.25, grandmaShark.height * 0.5).setOffset(grandmaShark.width * 0.2, grandmaShark.height * 0.2);

        // Flip Grandma Shark to face the left
        grandmaShark.setFlipX(true);

        // Create the animation
        if (!this.anims.exists('grandmaSharkAnimation')) {
            this.anims.create({
                key: 'grandmaSharkAnimation',
                frameRate: 5, // Adjust the frame rate as needed
                repeat: -1,
                frames: this.anims.generateFrameNumbers('GrandmaShark', { start: 6 , end: 8}) // Adjust the frame range based on your spritesheet
            });
        }

        // Play the animation
        grandmaShark.play('grandmaSharkAnimation', true);


        // Destroy Grandma Shark when it goes off the left side of the screen
        grandmaShark.setOrigin(0, 0.5);
        grandmaShark.setDepth(2);

        const wooshSound = this.sound.add('woosh');

        // Set up zigzag movement using tweens
        this.tweens.add({
            targets: grandmaShark,
            x: '-=200', // Move left by 200 pixels
            y: '+=100', // Move down by 100 pixels
            ease: 'Linear',
            duration: 1000, // Adjust the duration as needed
            onComplete: () => {
                wooshSound.play()
            }
        }); 

        // Set up collision with the player
        this.physics.add.collider(grandmaShark, this.player, this.gameOver, null, this );


        //this.physics.add.collider(grandmaShark, this.ground, this.destroyGrandmaShark, null, this);
        this.physics.add.collider(grandmaShark, this.ceiling, this.destroyGrandmaShark, null, this);
    }

    // Function to destroy Grandma Shark when it goes off the left side of the screen
    destroyGrandmaShark(grandmaShark) {
        grandmaShark.destroy();
    }

    updateScore() {
        this.p1Score += 200;
        this.scoreLeft.text = this.p1Score;
    }

    adjustSeaweedPosition(seaweed) {
        if (seaweed.y < game.config.height / 2) {
            // If top seaweed collides with ceiling, adjust its Y position
            seaweed.y = 125 ;
        } else {
            // If bottom seaweed collides with ground, adjust its Y position
            seaweed.y = game.config.height - 125 ;
        }
    }

    checkTopWeedCollision(player, topSeaweeds) {
        this.physics.add.collider(player, topSeaweeds, (player, seaweed) => {
            // Play 'weedeath' sound only when player collides with topSeaweeds
            const weedeath = this.sound.add('weedeath');
            weedeath.play();

            // Handle any other logic related to the collision
            this.gameOver();
        }, null, this);
    }

    checkBotWeedCollision(player, bottomSeaweeds) {
        this.physics.add.collider(player, bottomSeaweeds, (player, seaweed) => {
            // Play 'weedeath' sound only when player collides with topSeaweeds
            const weedeath = this.sound.add('weedeath');
            weedeath.play();

            // Handle any other logic related to the collision
            this.gameOver();
        }, null, this);
    }

    checkCollision(player, enemies) {
        this.physics.add.collider(player, enemies, (player, enemies) => {
            const fishdeath = this.sound.add('fishdeath');
            fishdeath.play()

            this.gameOver()
        }, null, this)
    }
    

    gameOver() {
        // Custom game over logic
        const deathSound = this.sound.add('death');
        deathSound.play();        // You can add any game over logic here, such as displaying a game over message or restarting the game.
        this.scene.start('GameOver');
        // Add your custom game over logic here
    }

    speedUpEverything() {
        // Increase the velocity of the player
        this.PLAYER_VELOCITY *= 1.2;  // You can adjust the factor as needed
    
        // Increase the velocity of enemies
        this.enemies.children.iterate((enemy) => {
            enemy.body.velocity.x *= 1.2;  // You can adjust the factor as needed
        });
    
        // Increase the velocity of seaweeds
        this.topSeaweeds.children.iterate((seaweed) => {
            seaweed.body.velocity.x *= 1.2;  // You can adjust the factor as needed
        });
    
        this.bottomSeaweeds.children.iterate((seaweed) => {
            seaweed.body.velocity.x *= 1.2;  // You can adjust the factor as needed
        });
    
        // You can add other elements that you want to speed up
    }

}