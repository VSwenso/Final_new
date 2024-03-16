class SceneStart1 extends Phaser.Scene {
    constructor() {
        super("SceneStart1")
    }

preload() {
    this.load.image('TutScreen1', './assets/TutScreen1.png')
    this.load.audio('music', './assets/sounds/RunnerLoop.mp3');
}

    create() {
        console.log("SceneStart1 created");
    
        // Check if this is one of the first five scenes
        if (game.scene.scenes.length <= 5) {
            console.log("Playing music...");
            var music = this.sound.add('music');
            music.play({ loop: true });
        }

    // Add the lore text
    this.TutScreen1 = this.add.tileSprite(0, 0, 800, 600, 'TutScreen1').setOrigin(0, 0);

    let startSound = this.sound.add('start', { volume: 1 });
    // Set up keyboard input for space bar
    this.input.keyboard.on('keydown-SPACE', function () {
    startSound.play()
    // Transition to the next scene
    this.scene.start('Level1'); // Replace 'NextScene' with the key of the scene you want to transition to
    }, this);    

    }

    update() {

    } 
}