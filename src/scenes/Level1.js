class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    init() {
        this.PLAYER_VELOCITY = 350;
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

        // Add the kid sprite and set its initial position
        this.kidskate = this.physics.add.sprite(100, 300, 'kidskate').setOrigin(-1.75, 0.5);

        //make player bigger
        this.kidskate.setScale(1.75);

        // Enable physics for the kid sprite
        this.physics.world.enable(this.kidskate);

        // Set the kid sprite to collide with the world bounds
        this.kidskate.setCollideWorldBounds(true);

        // Add the grandma sprite and set its initial position
        this.grandma = this.add.sprite(100, 300, 'allsprites').setOrigin(0.25, 0.5);

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

    update() {
        // Continuously scroll the background to the left
        this.runnerback.tilePositionX += 4; // Adjust the scrolling speed as needed

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

        // Update grandma position to follow kidskate on the same Y-axis
        this.grandma.y = this.kidskate.y;

    }
}
