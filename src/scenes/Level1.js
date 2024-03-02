class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }
    
    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {

        
        //Load background
        this.load.image('runnerback', './assets/runnerback.png')

        //Load kid
        this.load.image('kidskate', './assets/KIDskateboard.png')

    
    }
    create() {

        this.runnerback = this.add.tileSprite(0, 0, 800, 600, 'runnerback').setOrigin(0, 0);

}

   update() {

        // Continuously scroll the background to the left
        this.runnerback.tilePositionX += 4; // Adjust the scrolling speed as needed

    }
}

//     gameOver() {
//         // Custom game over logic
//         const deathSound = this.sound.add('death');
//         deathSound.play();        // You can add any game over logic here, such as displaying a game over message or restarting the game.
//         this.scene.start('GameOver');
//         // Add your custom game over logic here
//     }

//     speedUpEverything() {
//         // Increase the velocity of the player
//         this.PLAYER_VELOCITY *= 1.2;  // You can adjust the factor as needed
    
//         // Increase the velocity of enemies
//         this.enemies.children.iterate((enemy) => {
//             enemy.body.velocity.x *= 1.2;  // You can adjust the factor as needed
//         });
    
//         // Increase the velocity of seaweeds
//         this.topSeaweeds.children.iterate((seaweed) => {
//             seaweed.body.velocity.x *= 1.2;  // You can adjust the factor as needed
//         });
    
//         this.bottomSeaweeds.children.iterate((seaweed) => {
//             seaweed.body.velocity.x *= 1.2;  // You can adjust the factor as needed
//         });
    
//         // You can add other elements that you want to speed up
//     }

// }