const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

// Common Declarations
let Gravity = 0.3;
let u,
  d,
  l,
  r = "";
let moveSpeed = 4;
let jumpHeight = 15;
let blockMoving = 3;
let level = 1;

// Character specifications
let characterColor = "red";
let characterX = 200;
let characterY = 150;
let characterWidth = 40;
let characterHeight = 70;
let characterDx = 0;
let characterDy = 0;

// Level1 Ground1
let groundColor = "green";
let groundX1 = 0;
let groundHeight1 = innerHeight + 80;
let groundY = innerHeight - 80;
let groundWidth1 = innerWidth - 150;

// Level1 Ground2
let groundX2 = innerWidth + 50;
let groundHeight2 = 300;
let groundWidth2 = innerWidth - 200;

// Level1 Block1 specification

let blockColor = "blue";
let blockWidth = 200;
let blockHeight = 40;
let blockX1 = 1850;
let blockY1 = 379;

// Level1 Block2 specification

let blockX2 = innerWidth * 2 - 50;
let blockY2 = 389;

// Level1 Block3 specification

let blockX3 = blockX2 + blockWidth + 150;
let blockY3 = 199;

// Level1 Block4(moving)specification

let blockX4 = blockX3 + blockWidth + 250;
let blockY4Min = 199;
let blockY4Max = innerHeight - 80;
let blockY4 = 203;

// Level1 Ground3
let groundX3 = blockX4 + blockWidth + 250;
let groundHeight3 = 300;
let groundWidth3 = innerWidth - 200;

// Level1 Door
let doorColor = "yellow";
let doorWidth = 80;
let doorX = groundX3 + groundWidth3 - doorWidth - 150;
let doorHeight = 100;
let doorY = innerHeight - 80 - doorHeight;

// Level2 Door
let doorColor2 = "yellow";
let doorWidth2 = 80;
let doorX2 = groundX3 + groundWidth3 - doorWidth - 150;
let doorHeight2 = 100;
let doorY2 = -80 - doorHeight;

// Level2 Ground1---4

let groundX4 = blockX4 + blockWidth;
let groundY2 = -80;
let groundHeight4 = 80;
let groundWidth4 = innerWidth + 50;

function runningGame() {
  this.draw = () => {
    // For Level1 Ground1
    Drawing(groundX1, groundY, groundWidth1, groundHeight1, groundColor);

    // For Level1 Ground2
    Drawing(groundX2, groundY, groundWidth2, groundHeight2, groundColor);

    // For Level1 Ground3
    Drawing(groundX3, groundY, groundWidth3, groundHeight3, groundColor);

    // For Level1 block1
    Drawing(blockX1, blockY1, blockWidth, blockHeight, blockColor);

    // For Level1 block2
    Drawing(blockX2, blockY2, blockWidth, blockHeight, blockColor);

    // For Level1 block3
    Drawing(blockX3, blockY3, blockWidth, blockHeight, blockColor);

    // For Level1 block4
    Drawing(blockX4, blockY4, blockWidth, blockHeight, blockColor);

    // For Level1 Door
    Drawing(doorX, doorY, doorWidth, doorHeight, doorColor);

    // For Level2 Door
    Drawing(doorX2, doorY2, doorWidth2, doorHeight2, doorColor2);

    // For Level2 Ground1--4
    Drawing(groundX4, groundY2, groundWidth4, groundHeight4, groundColor);

    // For character
    Drawing(
      characterX,
      characterY,
      characterWidth,
      characterHeight,
      characterColor
    );

    this.update();
  };
  this.update = () => {
    if (blockY4 >= blockY4Max || blockY4 <= blockY4Min) {
      blockMoving = -blockMoving;
    }
    blockY4 += blockMoving;

    if (characterY + characterDy + characterHeight < innerHeight * 2) {
      characterDy += Gravity;
      characterY += characterDy;
    }
    // For ground1 Detection
    CollisionDetection(groundX1, groundY, groundWidth1);

    // For ground1 Detection
    CollisionDetection(groundX2, groundY, groundWidth2);

    // For ground3 Detection
    CollisionDetection(groundX3, groundY, groundWidth3);

    // For Block1 Detection
    CollisionDetection(blockX1, blockY1, blockWidth);

    // For Block2 Detection
    CollisionDetection(blockX2, blockY2, blockWidth);

    // For Block3 Detection
    CollisionDetection(blockX3, blockY3, blockWidth);

    // For Block4 Detection
    CollisionDetection(blockX4, blockY4, blockWidth);

    // For Level2 ground1---4 Detection
    CollisionDetection(groundX4, groundY2, groundWidth4);

    if (u === "up") {
      characterY -= jumpHeight;
    }
    if (r === "right") {
      if (characterX < 400) {
        characterX += moveSpeed;
      } else if (characterX + characterWidth >= groundX3 + groundWidth3 - 120) {
        characterX += 0;
      } else if (characterX > groundX3 + 190) {
        characterX += moveSpeed;
      } else {
        groundX1 -= moveSpeed;
        groundX2 -= moveSpeed;
        blockX1 -= moveSpeed;
        blockX2 -= moveSpeed;
        blockX3 -= moveSpeed;
        blockX4 -= moveSpeed;
        groundX3 -= moveSpeed;
        doorX -= moveSpeed;
        groundX4 -= moveSpeed;
        doorX2 -= moveSpeed;
      }
    }
    if (l === "left") {
      if (characterX > 130) {
        characterX -= moveSpeed;
      } else if (groundX1 != 0) {
        groundX1 += moveSpeed;
        groundX2 += moveSpeed;
        blockX1 += moveSpeed;
        blockX2 += moveSpeed;
        blockX3 += moveSpeed;
        blockX4 += moveSpeed;
        groundX3 += moveSpeed;
        doorX += moveSpeed;
        groundX4 += moveSpeed;
        doorX2 += moveSpeed;
      }
    }
    if (d === "down") {
      if (characterX > doorX && characterX < doorX + doorWidth) {
        if (level === 1) {
          doorColor = "black";
          level = 2;
          groundY += innerHeight;
          blockY1 += innerHeight;
          blockY2 += innerHeight;
          blockY3 += innerHeight;
          blockY4Min += innerHeight;
          blockY4Max += innerHeight;
          blockY4 += innerHeight;
          doorY += innerHeight;
          doorY2 += innerHeight;
          groundY2 += innerHeight;
        }
      }
    }
  };
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  new runningGame().draw();
}
animate();

// Common Functions

function CollisionDetection(a, b, c) {
  if (
    characterY + characterHeight >= b &&
    characterX < a + c &&
    characterY + characterHeight < b + 50 &&
    characterX + characterWidth > a
  ) {
    characterDy = moveSpeed;
    characterY = b - characterHeight;
  }
}

function Drawing(x, y, w, h, color) {
  c.beginPath();
  c.fillStyle = color;
  c.fillRect(x, y, w, h);
  c.fill();
}

// For character controls

addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key === "D") {
    r = "right";
  }
  if (e.key === "a" || e.key === "A") {
    l = "left";
  }
  if (e.key === "w" || e.key === "W") {
    u = "up";
  }
  if (e.key === "s" || e.key === "S") {
    d = "down";
  }
});

addEventListener("keyup", (e) => {
  if (e.key === "d" || e.key === "D") {
    r = "";
  }
  if (e.key === "a" || e.key === "A") {
    l = "";
  }
  if (e.key === "w" || e.key === "W") {
    u = "";
  }
  if (e.key === "s" || e.key === "S") {
    d = "";
  }
});

//  jump issue
// level2
// Secret finish
