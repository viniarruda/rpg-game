import kaboom from 'kaboom';

import { Box } from './components/Box'

function App() {
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
    scale,
    layers,
    go,
    vec2,
    follow,
    every,
  } = kaboom({
    global: false,
    scale: 7,
    debug: true,
    clearColor: [0,0,0],
  });
  loadSprite("arrow", "/assets/arrow.png");

  loadSprite("wall_left", "/assets/wall_left.png");
  loadSprite("wall_mid", "/assets/wall_mid.png");
  loadSprite("wall_right", "/assets/wall_right.png");
  loadSprite("floor", "/assets/floor_1.png");
  loadSprite("floor_2", "/assets/floor_2.png");
  loadSprite("chest", "/assets/chest_close.png");
  loadSprite("chest_open_2", "/assets/chest_open_2.png");

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
        speed: 5,
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
      "ttttttttttt",
      "l         r",
      "l      $  r",
      "l         r",
      "l         r",
      "l         r",
      "l         r",
      "bbbbbbbbbbb",
    ];

    const levelConfig = {
      width: 16,
      height: 16,
      't': () => [sprite('wall_mid'), solid(), area({ height: 4, offset: vec2(0, 10) }), 'wall'],
      'l': () => [sprite('wall_left'), solid(), area({ width: 4 }), 'wall'],
      'r': () => [sprite('wall_right'), solid(), area({ width: 4, offset: vec2(0, 0) }), 'wall'],
      'b': () => [sprite('wall_mid'), solid(), area({ height: 4, offset: vec2(0, -2) }), 'wall'],
      '$': () => [sprite('chest'), solid(), area(), { opened: false }, 'chest'],
    };

    const level = addLevel(map, levelConfig);

    addLevel([
      "xxxxxxxxxx",
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
    ], {
      width: 16,
      height: 16,
      " ": () => [
        sprite("floor"),
        layer("bg")
      ],
    })

    // add([sprite('floor_2'), layer('bg')]);

    function spawnArrow(p) {
      add([
        sprite("arrow"),
        scale(0.3),
        rotate(90),
        area({ width: 20 }),
        pos(p),
        origin("center"),
        move(RIGHT, 200),
        cleanup(),
        "arrow",
      ])
    }
  
    
    const SPEED = 120
    const JUMP_FORCE = 240
    
    gravity(640)
    
    // Add our player character
    const player = add([
      sprite("knight", { anim: 'idle', flipX: true, width: 40 }),
      pos(level.getPos(2, 2)),
      origin("center"),
      area({ width: 12, height: 12, offset: vec2(0, 6) }),
      // body(),
      solid(),
      health(100),
      "knight"
    ])
  
    const enemy = add([
      sprite("orc", { anim: 'idle', width: 40}),
      pos(level.getPos(9.5, 6)),
      origin("right"),
      area({ scale: 0.5 }),
      solid(),
      health(100),
      "orc"
    ])
    
    // // Add a platform
    // add([
    //   // sprite("scene"),
    //   rect(width(), 40),
    //   color(rgb(0, 255, 0)),
    //   area(),
    //   outline(1),
    //   pos(0, height() - 24),
    //   // scale(height(), width()),
    //   solid(),
    // ])
    
    // Switch to "idle" or "run" animation when player hits ground
    // player.onGround(() => {
    //   if (!isKeyDown("left") && !isKeyDown("right")) {
    //     player.play("idle")
    //   } else {
    //     player.play("run")
    //   }
    // })
    
    player.onAnimEnd("idle", () => {
      // You can also register an event that runs when certain anim ends
    })
  
    onCollide("knight", "orc", (player, enemy) => {
      // enemy.play("attack");
      enemy.hurt(3);
    })
  
    onCollide("arrow", "orc", (arrow, orc) => {
      destroy(arrow);
  
      enemy.hurt(20);   
    })
  
    // enemy.on("hurt", () => {
    // })
  
    enemy.onHurt(() => {
      enemy.play("hurt");
  
      if (enemy.hp() <= 0) {
        enemy.play("die");
        healthbar.destroy();
        wait(3, () => {
          enemy.destroy();
        })
      } else {
        healthbar.set(enemy.hp())
        wait(0.5, () => {
          enemy.play("idle");
        })
      }
    });
  
    // enemy.hurt(() => {
    //   enemy.play("hurt");
    // })
  
    onKeyPress("x", () => {
      player.play("bow");
  
      wait(0.5, () => {
        player.play("idle");
      })
  
      spawnArrow(player.pos.sub(16, 0));
      // spawnArrow(player.pos.add(16, 0))
    })
    
    onKeyPress("space", () => {
      player.jump(JUMP_FORCE)
      player.play("jump")
    })

    onKeyPress("f", () => {
      const actions = {
        interacted: false,
      }

      every("chest", (chest) => {
        if (player.isTouching(chest)) {
          if (chest.opened) {
            chest.play("chest")
            chest.opened = false
          } else {
            chest.play("chest_open_2")
            chest.opened = true
          }
          actions.interacted = true
        }
      })
    })
    
    onKeyDown("left", () => {
      player.move(-SPEED, 0)
      player.flipX(false)
      // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    })
    
    onKeyDown("right", () => {
      player.move(SPEED, 0)
      player.flipX(true)
    })

    onKeyDown("up", () => {
      player.move(0, -SPEED)
    })
    
    onKeyDown("down", () => {
      player.move(0, SPEED)
    })
    
    onKeyRelease(["left", "right"], () => {
      // Only reset to "idle" if player is not holding any of these keys
      if (!isKeyDown("left") && !isKeyDown("right")) {
        player.play("idle")
      }
    })

    onKeyPress(["left", "right", "up", "down"], () => {
      if (player.curAnim() !== "run") {
        player.play("run")
      }
    })

    onKeyRelease(["left", "right", "up", "down"], () => {
      if (
        !isKeyDown("left")
        && !isKeyDown("right")
        && !isKeyDown("up")
        && !isKeyDown("down")
      ) {
        player.play("idle")
      }
    })
    
    // const getInfo = () => `
    // Anim: ${player.curAnim()}
    // Frame: ${player.frame}
    // Enemy HP: ${enemy.hp()}
    // `.trim()
    
    // // Add some text to show the current animation
    // const label = add([
    //   text(getInfo()),
    //   pos(4),
    // ])
    
    // label.onUpdate(() => {
    //   label.text = getInfo()
    // })
  
    const healthbar = add([
      rect(15, 2),
      pos(width() - 40, height() - 125),
      origin("right"),
      color(127, 255, 127),
      layer("ui"),
      follow(enemy, vec2(-12, -8)),
      {
        max: 100,
        set(hp) {
          this.width = hp / 6
          this.flash = true
        },
      },
    ])

    const healthbarPlayer = add([
      rect(15, 2),
      pos(width() - 40, height() - 125),
      origin("right"),
      color(127, 255, 127),
      layer("ui"),
      follow(player, vec2(9, -10)),
      {
        max: 100,
        set(hp) {
          this.width = hp / 6
          this.flash = true
        },
      },
    ])
  
    healthbar.onUpdate(() => {
      if (enemy.hp() <= 40) {
        healthbar.color = rgb(255, 100, 150)
        healthbar.flash = false
      } else {
        healthbar.color = rgb(127, 255, 127)
      }
    })

    healthbarPlayer.onUpdate(() => {
      if (enemy.hp() <= 40) {
        healthbar.color = rgb(255, 100, 150)
        healthbar.flash = false
      } else {
        healthbar.color = rgb(127, 255, 127)
      }
    })
  });

  function start() {
    go("game")
  }

  start();

  return (
    <div className="App">
      <h1>Game</h1>
      <Box>
        <div id="mycanvas" />
      </Box>
    </div>
  );
}

export default App;
