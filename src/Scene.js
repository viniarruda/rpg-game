import kaboom from 'kaboom';

const Scene = () => {
  const {
    loadSprite,
    add,
    sprite,
    rotate,
    area,
    pos,
    origin,
    move,
    cleanup,
    onKeyDown,
    gravity, 
    center,
    body,
    solid,
    RIGHT,
    health,
    width,
    rect,
    outline,
    height,
    isKeyDown,
    onCollide,
    destroy,
    wait,
    onKeyPress,
    onKeyRelease,
    text,
    color,
    layer,
    rgb,
    LEFT,
    scene,
    addLevel,
    rand,
    layers,
    go,
  } = kaboom({
    global: false,
    fullscreen: true, 
    scale: 4,
    debug: true,
    clearColor: [0,0,0],
    canvas: document.querySelector("#mycanvas"),
  });
  loadSprite("arrow", "/assets/arrow.png");

  loadSprite("wall_left", "/assets/wall_left.png");
  loadSprite("wall_mid", "/assets/wall_mid.png");
  loadSprite("wall_right", "/assets/wall_right.png");
  loadSprite("floor", "/assets/floor_1.png");
  loadSprite("floor_2", "/assets/floor_2.png");

  loadSprite("knight", "/assets/knight.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 9,
    sliceY: 6,
    // Define animations
    anims: {
      "idle": {
        // Starts from frame 0, ends at frame 3
        from: 0,
        to: 2,
        // Frame per second
        speed: 5,
        loop: true,
      },
      "run": {
        from: 6,
        to: 8,
        speed: 10,
        loop: true,
      },
      "hurt": {
        from: 41,
        to: 43,
        speed: 10,
        loop: false,
      },
      // This animation only has 1 frame
      "jump": 8,
      "attack": {
        from: 3,
        to: 6,
        speed: 10,
        loop: false,
      },
      "bow": {
        from: 21,
        to: 23,
        speed: 10,
        loop: false,
      },
    },
  })

  loadSprite("orc", "/assets/orc.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 9,
    sliceY: 6,
    // Define animations
    anims: {
      "idle": {
        // Starts from frame 0, ends at frame 3
        from: 0,
        to: 2,
        // Frame per second
        speed: 5,
        loop: true,
      },
      "run": {
        from: 6,
        to: 8,
        speed: 20,
        loop: true,
      },
      "hurt": {
        from: 42,
        to: 44,
        speed: 10,
        loop: false,
      },
      // This animation only has 1 frame
      "jump": 8,
      "attack": {
        from: 3,
        to: 6,
        speed: 10,
        loop: false,
      },
      "die": {
        from: 50,
        to: 52,
        speed: 10,
        loop: false,
      }
    },
  })

  scene('game', () => {
    /*
    * bg = background, obj = hero, chest, ui = text
    */
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
      "tttttttttt",
      "l        r",
      "l        r",
      "l        r",
      "l        r",
      "l        r",
      "l        r",
      "tttttttttt",
    ];

    const levelConfig = {
      width: 16,
      height: 16,
      't': () => [sprite('wall_mid'), solid(), area(), 'wall'],
      'l': () => [sprite('wall_left'), solid(), area(), 'wall'],
      'r': () => [sprite('wall_right'), solid(), area(), 'wall']
    };

    addLevel(map, levelConfig);

    addLevel([
      "xxxxxxxxx",
      "         ",
      "         ",
      "         ",
      "         ",
      "         ",
      "         ",
    ], {
      width: 16,
      height: 16,
      " ": () => [
        sprite("floor"),
      ],
    })

    // add([sprite('floor_2'), layer('bg')]);
  });


  go('game');

  return (
    <div>
      <h1>Game</h1>
    </div>
  )
}


export default Scene;