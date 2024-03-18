class BossStart extends Phaser.Scene {
    constructor() {
        super("BossStart");
        //this.bossmusicPlaying = false;
    }

preload() {
    this.load.image('TutBoss', './assets/TutScreenBoss.png')
    this.load.audio('bossmusic', './assets/sounds/BossBattleLoop.mp3')
}

create() {
    // Add the lore text
    this.starfield = this.add.tileSprite(0, 0, 800, 600, 'TutBoss').setOrigin(0, 0);
        
    // Stop any previously playing music
    this.sound.stopAll();

    // Play boss music if not already playing
    //if (!this.bossmusicPlaying) {
    this.bossmusic = this.sound.add('bossmusic', { loop: true });
    this.bossmusic.play();
    this.bossmusicPlaying = true;
    //}

    let startSound = this.sound.add('start', { volume: 1 });
    // Set up keyboard input for space bar
    this.input.keyboard.on('keydown-SPACE', function () {
    startSound.play()
    // Transition to the next scene
    this.scene.start('BossLevel'); // Replace 'NextScene' with the key of the scene you want to transition to
    }, this);    

    }

update() {

    } 
}