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
    }

    create() {
        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'runnerback').setOrigin(0, 0);

        // Add the kid sprite and set its initial position
        this.kidskate = this.physics.add.sprite(100, 300, 'kidskate').setOrigin(0.5, 0.5);

        // Enable physics for the kid sprite
        this.physics.world.enable(this.kidskate);

        // Set the kid sprite to collide with the world bounds
        this.kidskate.setCollideWorldBounds(true);
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
    }
}
