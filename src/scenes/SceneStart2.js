class SceneStart2 extends Phaser.Scene {
    constructor() {
        super("SceneStart2")
    }

preload() {
    this.load.image('TutScreen2', './assets/TutScreen2.png')
}

    create() {
    // Add the lore text
    this.TutScreen2 = this.add.tileSprite(0, 0, 800, 600, 'TutScreen2').setOrigin(0, 0);

    let startSound = this.sound.add('start', { volume: 1 });
    // Set up keyboard input for space bar
    this.input.keyboard.on('keydown-SPACE', function () {
    startSound.play()
    // Transition to the next scene
    this.scene.start('Level2'); // Replace 'NextScene' with the key of the scene you want to transition to
    }, this);    

    }

    update() {

    } 
}