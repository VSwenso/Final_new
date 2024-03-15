class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
        this.musicPlaying = false;
    }

preload() {
    this.load.image('menuscreen', './assets/MenuGRAN.png')
    this.load.image('kidskate', './assets/KIDskateboard.png')
    this.load.audio('start', './assets/sounds/select.wav')
    this.load.audio('music', './assets/sounds/RunnerLoop.mp3');
    //load Font
    this.load.bitmapFont('gamefont', './assets/gamefont.png', './assets/gamefont.xml')
    //Load sprites
    this.load.spritesheet('allsprites', './assets/allSprites.png', {
        frameWidth: 75,
        frameHeight: 80  
    });


}

    create() {

        this.menuscreen = this.add.tileSprite(0, 0, 800, 600, 'menuscreen').setOrigin(0, 0);

        this.add.bitmapText(game.config.width / 2, game.config.height - 135, 'gamefont', 'PRESS\n[SPACE]\nTO START', 32).setOrigin(0.5)

        // Add start sound
        let startSound = this.sound.add('start', { volume: 1 });
        // Play music if not already playing
        if (!this.musicPlaying) {
            this.music = this.sound.add('music', { loop: true });
            this.music.play();
            this.musicPlaying = true;
        }
    
        // Add the KidSkater image and scale it
        let kidskate = this.add.image(game.config.width / 2, 290, 'kidskate').setOrigin(-0.75, -0.75);
        kidskate.setScale(2);  // Adjust the scale factor as needed

        // Animation from 'allsprites' sprite sheet
        let allSprites = this.add.sprite(game.config.width / 2, 285, 'allsprites').setOrigin(-0.75, -0.5);
        allSprites.setScale(1.25);

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('allsprites', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        allSprites.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, function () {
            allSprites.anims.play('move');
        });

        allSprites.anims.play('move');
        allSprites.setScale(-2, 2); // Set the X-axis scale to -2
    

        // Set up keyboard input for space bar
        this.input.keyboard.on('keydown-SPACE', function () {
            // Transition to the next scene
            //startSound.play()
            this.scene.start('SceneStart1'); // Replace 'NextScene' with the key of the scene you want to transition to
        }, this); 
    }

    update() {
        //reset

    } 
}