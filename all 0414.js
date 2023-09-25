function getRandom(min, max) {
  return Math.floor(fxRandom() * (max - min + 1)) + min;
}
let texture;
function preload() {
  // texture = loadImage("paper_texture.jpg");
}

console.log(fxhash);

let sound;
let printed = 0;
let newbox = [];
let newcircle = [];
let light_switch = 1; //太陽開啟的開關
let sun_done = 0;

//山體主色
let vers = fxRandom(0, 100);
console.log("colorvers:" + vers);

// let baseHue = 0;
let mountain_noiseY = fxRandom(-400, 400);
console.log("mountain_noiseY:" + mountain_noiseY);
let mountain_noiseScale = fxRandom(3, 6) / 1000;
console.log("mountain_noiseScale:" + mountain_noiseScale);

//山的層數
let mountainCounts = [1, 2, 2, 2, 2];
let rand = Math.floor(fxRandom() * mountainCounts.length);
let mountainCount = mountainCounts[rand];
console.log("mountainCount:" + mountainCount);

//畫布寬
// let Canvassettings = [
//   [3600, 2400],
//   [3600, 3600],
//   [2400, 3600],
// ];
let Canvassettings = [
  [3600, 3600],
  [2400, 3600],
];
let Canvassetting_rand = Math.floor(fxRandom() * Canvassettings.length);
let Canvassetting = Canvassettings[Canvassetting_rand];
let CanvasWidth = Canvassetting[0];
let CanvasHeight = Canvassetting[1];
console.log("Canvassetting:" + Canvassetting);

// //畫布高
// let CanvasHeights = [2400, 3000, 3600];
// // let CanvasHeights = [3600];
// let CanvasHeight_rand = Math.floor(fxRandom() * CanvasHeights.length);
// let CanvasHeight = CanvasHeights[CanvasHeight_rand];
// console.log("CanvasHeight:" + CanvasHeight);

//山的高度
let mountainHeight = CanvasHeight / mountainCount;
console.log("mountainHeight:" + Math.floor(mountainHeight) + "px");

//畫布背景底色版本
let bgcs = [255, "originbc-colored", "originbc-none-colored"];
// let bgcs = ["originbc-colored", "originbc-none-colored"];
// let bgcs = ["origin"];
let bgcs_rand = Math.floor(fxRandom() * bgcs.length);
let bgc = bgcs[bgcs_rand];
console.log("bgc:" + bgc);

//漸層顏色版本
// let bgccolorvers = ["yellow", "skyblue", "pink", "green", "random"];
let bgccolorvers = ["random"];
let bgccolorvers_rand = Math.floor(fxRandom() * bgccolorvers.length);
let bgccolorver = bgccolorvers[bgccolorvers_rand];
console.log("bgccolorver:" + bgccolorver);

// let bgccolorvers = ["yellow", "skyblue", "pink", "green", "random"];
let sun_maxHeights = [300, 600, 1000];
let sun_maxHeight_rand = Math.floor(fxRandom() * sun_maxHeights.length);
let sun_maxHeight = sun_maxHeights[sun_maxHeight_rand];
console.log("sun_maxHeight:" + sun_maxHeight);

//控制光強度版本
let whitehues = ["midnight", "daytime"];
// let whitehues = ["midnight"];
let whitehues_rand = Math.floor(fxRandom() * whitehues.length);
let whitehue = whitehues[whitehues_rand];
console.log("whitehue:" + whitehue);

//控制長條線
let sky_lines = [0, 1];
// let whitehues = ["midnight"];
let sky_lines_rand = Math.floor(fxRandom() * sky_lines.length);
let sky_line = sky_lines[sky_lines_rand];
console.log("sky_lines:" + sky_line);

//山的版本
// let mountainvers = [2, 3, 4, 14];
let mountainvers = [2];
let mountainvers_rand = Math.floor(fxRandom() * mountainvers.length);
let mountainver = mountainvers[mountainvers_rand];
console.log("mountainver:" + mountainver);

let bokens = [0, 1];
let bokens_rand = Math.floor(fxRandom() * bokens.length);
let boken = bokens[bokens_rand];
console.log("boken:" + boken);
//光型態版本
// let lightshapes = [1];
let lightshapes = [1, 2, 3];
let lightshapes_rand = Math.floor(fxRandom() * lightshapes.length);
let lightshape = lightshapes[lightshapes_rand];
console.log("lightshape:" + lightshape);
//光的強度

let whitestrongs = [1, 2];
let whitestrongs_rand = Math.floor(fxRandom() * whitestrongs.length);
let whitestrong = whitestrongs[whitestrongs_rand];
console.log(" whitestrong:" + whitestrong);

//光顏色版本

let lightcolorvers = ["basic", "random"];
let lightcolorvers_rand = Math.floor(fxRandom() * lightcolorvers.length);
let lightcolorver = lightcolorvers[lightcolorvers_rand];
console.log("lightcolorver:" + lightcolorver);
//光的位置
// let lightlocs = [
//   [2, 2],
//   [2, 3],
//   [4 / 3, 4 / 1],
//   [4 / 1, 4 / 1],
// ];
let white = 0;
let lightlocs = [[2, 2]];
let lightlocs_rand = Math.floor(fxRandom() * lightlocs.length);
let lightloc = lightlocs[lightlocs_rand];
console.log("lightloc:" + lightloc);

let h;
let j;

let _c1;
let _c2;
let _c3;

function getFeature_lightshape(lightshape) {
  if (lightshape == 1) return "Skyward Foliage";
  if (lightshape == 2) return "Galactic Rings";
  if (lightshape == 3 && bgc == 0) return "Starry Embrace";
  if (lightshape == 3 && bgc != 0) return "Melted Sky Dreams";
  else return "else";
}

function getFeature_bgc(bgc) {
  if (bgc == 255 || mountainver == 3) return "White Horizon";
  if (bgc == 0 && mountainver != 3) return "Blackness";
  if (bgc == "origin") return "Vibrant";
  else return "else";
}

function getFeature_mountainver(mountainver) {
  if (mountainver == 2) return "Layered Peaks";
  if (mountainver == 3) return "Nature in Ink";
  if (mountainver == 4) return "Veiled Winter";
  if (mountainver == 14) return "Mountain Mirages";
  else return "else";
}

function getFeature_colorver(vers) {
  if (vers > 0 && vers <= 10) return "白緑 / びゃくろく / Byakuroku";
  if (vers > 10 && vers <= 20) return "青磁色 / せいじいろ / Seiji-iro ";
  if (vers > 20 && vers <= 30) return "鶸 / ひわいろ / Hiwa-iro";
  if (vers > 30 && vers <= 40) return "楝色 / おうちいろ / Ouchi-iro";
  if (vers > 40 && vers <= 50) return "Ethereal";
  if (vers > 50 && vers <= 60) return "Serene Tones";
  else return "else";
}
window.$fxhashFeatures = {
  // feature can only be "low", "medium" or "high"
  "Celestial Body": getFeature_lightshape(lightshape),
  Background: getFeature_bgc(bgc),
  Landscape: getFeature_mountainver(mountainver),
  "Color Palette": getFeature_colorver(vers),
};
if (vers > 0 && vers <= 10) {
  _c1 = fxRandom(0, 255);
  _c2 = fxRandom(160, 255);
  _c3 = fxRandom(0, 220);
  white = 1;
} else if (vers > 10 && vers <= 20) {
  _c1 = fxRandom(0, 120);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220);
  white = 1;
} else if (vers > 20 && vers <= 30) {
  //version 3
  _c1 = fxRandom(0, 255);
  _c2 = 160;
  _c3 = 20;
  white = 1;
} else if (vers > 30 && vers <= 40) {
  //version 12
  _c1 = fxRandom(0, 20);
  _c2 = fxRandom(0, 20);
  _c3 = fxRandom(0, 220);
  white = 1;
} else if (vers > 40 && vers <= 50) {
  //version 14
  _c1 = fxRandom(0, 255);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220) + fxRandom(0, 30);
} else if (vers > 50 && vers <= 60) {
  //version 15
  _c1 = fxRandom(0, 255);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220) + fxRandom(0, 90);
} else if (vers > 60 && vers <= 70) {
  //version 16
  _c1 = fxRandom(0, 255);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220) + fxRandom(0, 1600);
} else if (vers > 70 && vers <= 75) {
  //version 17
  _c1 = fxRandom(0, 255) + fxRandom(0, 1600);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220);
} else if (vers > 75 && vers <= 80) {
  //version 18
  _c1 = fxRandom(220, 255);
  _c2 = fxRandom(230, 240);
  _c3 = fxRandom(70, 100);
} else if (vers > 80 && vers < 90) {
  //version 19
  _c1 = fxRandom(0, 255);
  _c2 = fxRandom(0, 255);
  _c3 = fxRandom(0, 220);
} else if (vers > 90 && vers < 95) {
  //version 20
  white = 1;
  _c1 = 0 + fxRandom(0, 20);
  _c2 = 92 + fxRandom(0, 20);
  _c3 = 175 + fxRandom(0, 20);
} else {
  white = 1;
  _c1 = fxRandom(0, 0);
  _c2 = fxRandom(0, 0);
  _c3 = fxRandom(0, 0);
}

//設定畫布大小比例
//希望大小
let OriginalCanvasWidth = CanvasWidth;
let OriginalCanvasHeight = CanvasHeight;
//最終大小
let canvasRatio = 1.0;
function setupCanvasRatio() {
  let originRatio = OriginalCanvasWidth / OriginalCanvasHeight;
  let screenRatio = windowWidth / windowHeight;
  console.log(originRatio);
  console.log(screenRatio);

  if (screenRatio > originRatio) {
    CanvasHeight = windowHeight;
    CanvasWidth = CanvasHeight * originRatio;
  } else {
    CanvasWidth = windowWidth;
    CanvasHeight = CanvasWidth / originRatio;
  }
  canvasRatio = CanvasWidth / OriginalCanvasWidth;
}
//?fxhash=ooGAGLzbUN7mNBUvh2Zsf7RaWsw1NgVNK7j3zdw9yYgUWMybJR6

//音樂

// let music = document.getElementsByTagName("canvas");
// function playMusic() {
//   let audio = new Audio("dark_empty_void.mp3");
//   audio.play();
// }
// music.addEventListener("click", playMusic());
function loaded() {
  sound.play();
}

function setup() {
  noiseSeed(fxRandom(-10000, 10000));
  sound = loadSound("dark_empty_void.mp3");
  setupCanvasRatio();
  console.log("++++++++++++++++" + canvasRatio);
  createCanvas(CanvasWidth, CanvasHeight);
  // drawbc();
  //畫山

  angleMode(DEGREES);
  for (let i = 0; i < 5; i++) {
    newbox[i] = new klbox();
  }
  for (let q = 0; q < 1; q++) {
    newcircle[q] = new klcircle();
  }
}
function textureOverlay(texture, mode) {
  let textureX = 0;
  let textureY = 0;
  blendMode(mode || BURN);
  while (textureY < height) {
    while (textureX < width) {
      image(texture, textureX, textureY);
      textureX += texture.width;
      if (textureX >= width) {
        textureX = 0;
        textureY += texture.height;
        break;
      }
    }
  }
}
function keyPressed() {
  // Press [S] to save canvas
  if (keyCode === 83) {
    saveCanvas(fxhash + ".png");
  }
}
let drawed = 0;
//背景漸層
function drawbc() {
  const m = 10;

  let topR = 255 * noise(frameCount / m);
  let topG = 255 * noise(1000 + frameCount / m);
  let topB = 255 * noise(2000 + frameCount / m);
  let bottomR = 255 * noise(3000 + frameCount / m);
  let bottomG = 255 * noise(4000 + frameCount / m);
  let bottomB = 255 * noise(5000 + frameCount / m);
  if (bgccolorver == "yellow") {
    topR = 255;
    topG = 700;
    topB = 165;
  } else if (bgccolorver == "skyblue") {
    topR = 192;
    topG = 237;
    topB = 255;
  } else if (bgccolorver == "pink") {
    topR = 235;
    topG = 174;
    topB = 202;
  } else if (bgccolorver == "green") {
    topR = 124;
    topG = 255;
    topB = 168;
  } else if (bgc == "originbc-colored" && bgccolorver == "random") {
    topR = _c1;
    topG = _c2;
    topB = _c3;
  }

  // const bottomColor = color(bottomR, bottomG, bottomB, 100);
  //
  // const topColor = color(topR, topG, topB, 100);

  const topColor = color(topR, topG, topB, 100);
  const bottomColor = color(bottomR, bottomG, bottomB, 100);
  console.log("topColor:", topR, topG, topB);
  console.log("bottomColor:", bottomR, bottomG, bottomB);

  for (let y = 0; y < CanvasHeight; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y / CanvasHeight);
    stroke(lineColor);
    // noFill();
    line(0, y, CanvasWidth, y);
    if ((y % 3) * canvasRatio == 0 || (y % 2) * canvasRatio == 0) {
      // rect(fxRandom(0, CanvasWidth), y, 4 * canvasRatio, 2 * canvasRatio);

      stroke(255);

      circle(fxRandom(0, CanvasWidth), y, fxRandom(0, 3) * canvasRatio);
    }
  }
  drawed = 1;
  if (sun_done == 1) {
    sun_done == 3;
  }
}
sun_maxHeight = sun_maxHeight * canvasRatio;
function draw() {
  if (drawed == 0) {
    if (bgc == 0 || bgc == 255) {
      background(bgc);
      drawed = 1;
    } else if (bgc == "originbc-colored" && whitehue == "daytime") {
      background(255);
      //畫漸層背景
      drawbc();
      console.log(_c1, _c2, _c3);
    } else if (bgc == "originbc-none-colored" && whitehue == "daytime") {
      background(255);
      //畫漸層背景
      drawbc();
    } else if (whitehue == "midnight") {
      background(0);
      //畫漸層背景
      drawbc();
    }
  }
  for (let i = 0; i < 5; i++) {
    newbox[i].draw();
  }
  //畫太陽
  for (let q = 0; q < 1; q++) {
    translate(width / lightloc[0], height / lightloc[1]);
    newcircle[q].draw();
  }
}

class klcircle {
  constructor() {
    this._i = 0;
    this.space = 0.1;
    this.xoff = map(cos(this.i), -1, 1, 0, 3);
    this.yoff = map(sin(this.i), -1, 1, 0, 3);
    this.n = noise(this.xoff, this.yoff + 900 * canvasRatio);
    this._h = 0;
    this.h = map(this.n, 0, 1, -sun_maxHeight, 0);
    this.j = 0;
    this.life = 2;
    this.c1 = _c1;
    this.c2 = _c2;
    this.c3 = _c3;
  }
  draw() {
    if (this._i < 360 && this.life == 2 && light_switch == 1) {
      this.xoff = map(cos(this._i), -1, 1, 0, 1);
      this.yoff = map(sin(this._i), -1, 1, 0, 1);
      this.n = noise(this.xoff, this.yoff);
      // 使永if i 對特定角度範圍控制日暈長度(-200,1000)
      this.h = map(this.n, 0, 1, -sun_maxHeight, 0);
      rotate(this._i);
      stroke(255, 255, 255, 40);
      fill(
        this.c1 + fxRandom(0, 255),
        this.c2 + fxRandom(0, 140),
        this.c3 + fxRandom(0, 90),
        15
      );
      if (mountainver == 3 || bgc == 255) {
        stroke(255, 255, 255, 80);
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 250),
          this.c3 + fxRandom(0, 220),
          50
        );
      }
      //http://127.0.0.1:5500/index.html?fxhash=ooLFBAxdVXbktg81kVYVG9B726AtcJXSATitJeQWsvs5kmzW8gp
      if (mountainver != 3 && lightshape != 3) {
        stroke(255, 255, 255, 40);
        rect(
          sun_maxHeight * canvasRatio,
          0,
          -1 * sun_maxHeight * canvasRatio,
          1 * canvasRatio
        );
        rect(
          -sun_maxHeight * canvasRatio,
          0,
          1 * sun_maxHeight * canvasRatio,
          1 * canvasRatio
        );
      }
      if (lightshape == 1) {
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          15
        );
        rect(
          0,
          (this.h / 2) * 4 * canvasRatio,
          1,
          fxRandom(0, 300) * canvasRatio
        );
        rect(0, this.h * 4 * canvasRatio, 1, fxRandom(0, 300) * canvasRatio);

        rect(
          0,
          this.h * 2 * 4 * canvasRatio,
          1,
          fxRandom(0, 300) * canvasRatio
        );
      } else if (lightshape == 2) {
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          15
        );
        rect(
          0,
          (sun_maxHeight / 2) * canvasRatio,
          1,
          fxRandom(0, 300) * canvasRatio
        );
        rect(
          0,
          (sun_maxHeight / 3) * canvasRatio,
          1,
          fxRandom(0, 300) * canvasRatio
        );
        rect(0, sun_maxHeight * canvasRatio, 1, sun_maxHeight * canvasRatio);
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 250),
          this.c3 + fxRandom(0, 220),
          10
        );
        rect(
          0,
          sun_maxHeight * 1.5 * canvasRatio,
          -1,
          fxRandom(0, 950) * canvasRatio
        );
        rect(
          0,
          sun_maxHeight * 2 * canvasRatio,
          1,
          fxRandom(0, 1000) * canvasRatio
        );
      } else if (lightshape == 3 && bgc == 0) {
        strokeWeight(0.1 * canvasRatio);
        stroke(0, 0, this.c3, fxRandom(60, 100));
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          30
        );

        // rect(sun_maxHeight, 0, -1 * sun_maxHeight, 1);
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          10
        );
        rect(
          (-this.h / 2) * canvasRatio,
          (this.h / 2) * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          -this.h * canvasRatio,
          5 * canvasRatio,
          this.h * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          -this.h * 2 * canvasRatio,
          this.h * 2 * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 500) * canvasRatio
        );
        fill(255, 10);
        rect(
          (-this.h / 2) * canvasRatio,
          (this.h / 2) * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          -this.h * canvasRatio,
          this.h * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          -this.h * 2 * canvasRatio,
          this.h * 2 * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 600) * canvasRatio
        );
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          10
        );
        rect(
          1 * canvasRatio,
          (this.h / 2) * canvasRatio,
          10 * canvasRatio,
          1 * canvasRatio
        );
        rect(
          1 * canvasRatio,
          this.h * canvasRatio,
          10 * canvasRatio,
          1 * canvasRatio
        );
        rect(
          1 * canvasRatio,
          this.h * 2 * canvasRatio,
          10 * canvasRatio,
          1 * canvasRatio
        );

        rect(
          1 * canvasRatio,
          -this.h * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          1 * canvasRatio,
          -this.h * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          1 * canvasRatio,
          -this.h * 2 * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        fill(255, 10);
        rect(
          1 * canvasRatio,
          (-this.h / 2) * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          1 * canvasRatio,
          -this.h * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        rect(
          1 * canvasRatio,
          -this.h * 2 * canvasRatio,
          5 * canvasRatio,
          fxRandom(0, 200) * canvasRatio
        );
        fill(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          10
        );
        rect(0, (this.h / 2) * canvasRatio, 10 * canvasRatio, 1 * canvasRatio);
        rect(0, this.h * 2 * canvasRatio, 10 * canvasRatio, 1 * canvasRatio);
      } else {
        if (this._i < 360) {
          strokeWeight(0.17 * canvasRatio);
          if (white == 1 && bgc != 255) {
            blendMode(DODGE);
            // console.log("white:", white);
          } else {
            blendMode(BLEND);
          }

          if (
            lightcolorver == "basic" ||
            whitehue != "midnight" ||
            bgc == 255
          ) {
            fill(225, 230, 90, 1);
          } else if (lightcolorver == "random") {
            fill(_c1, _c2, _c3, 1);
          }

          noStroke();
          circle(
            0,
            fxRandom(0, sun_maxHeight) * canvasRatio,
            fxRandom(500 * canvasRatio, 540 * canvasRatio)
          );

          circle(
            0,
            fxRandom(0, sun_maxHeight) * canvasRatio,
            fxRandom(700 * canvasRatio, 720 * canvasRatio)
          );

          if (whitehue == "midnight" && white == 1 && bgc != 255) {
            fill(225, 255, 255, whitestrong);
          }

          // console.log("whitestrong:", whitestrong);
          // } else {
          //   fill(_c1, _c2, _c3, whitestrong);
          // }

          circle(
            0,
            fxRandom(0, sun_maxHeight) * canvasRatio,
            fxRandom(700 * canvasRatio, 720 * canvasRatio)
          );

          circle(
            0,
            fxRandom(0, sun_maxHeight / 3) * canvasRatio,
            fxRandom(0, 3 * canvasRatio)
          );
          noFill();
          blendMode(BLEND);
          strokeWeight(0.17 * canvasRatio);
          stroke(255, fxRandom(50, 100));
          circle(
            0,
            fxRandom(0, sun_maxHeight) * canvasRatio,
            fxRandom(0, sun_maxHeight - 50 * canvasRatio) * canvasRatio
          );
          // circle(
          //   0,
          //   fxRandom(0, sun_maxHeight) * canvasRatio,
          //   fxRandom(0, sun_maxHeight - 50 * canvasRatio) * canvasRatio
          // );
          // circle(
          //   0,
          //   fxRandom(0, sun_maxHeight) * canvasRatio,
          //   fxRandom(0, sun_maxHeight - 50 * canvasRatio) * canvasRatio
          // );

          circle(
            0,
            fxRandom(0, sun_maxHeight * 1.5) * canvasRatio,
            fxRandom(0, sun_maxHeight - 100 * canvasRatio) * canvasRatio
          );
          strokeWeight(0.13 * canvasRatio);
          circle(
            0,
            fxRandom(0, sun_maxHeight * 1.5) * canvasRatio,
            fxRandom(0, sun_maxHeight) * canvasRatio
          );

          strokeWeight(0.1 * canvasRatio);
          stroke(255, fxRandom(0, 40));
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 2) * canvasRatio,
            fxRandom(0, sun_maxHeight - 100 * canvasRatio) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 2) * canvasRatio,
            fxRandom(0, sun_maxHeight) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 3) * canvasRatio,
            fxRandom(0, sun_maxHeight - 150 * canvasRatio) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 2.5, sun_maxHeight * 3) * canvasRatio,
            fxRandom(0, sun_maxHeight - 150 * canvasRatio) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 2.5, sun_maxHeight * 3) * canvasRatio,
            fxRandom(0, sun_maxHeight - 150 * canvasRatio) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 3) * canvasRatio,
            fxRandom(0, sun_maxHeight - 100 * canvasRatio) * canvasRatio
          );

          circle(
            0,
            fxRandom(0, sun_maxHeight * 1.5) * canvasRatio,
            fxRandom(0, sun_maxHeight * 2) * canvasRatio
          );

          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 2) * canvasRatio,
            fxRandom(0, sun_maxHeight * 2 - 100 * canvasRatio) * canvasRatio
          );
          // circle(
          //   0,
          //   fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 3) * canvasRatio,
          //   fxRandom(0, sun_maxHeight * 2) * canvasRatio
          // );
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 4) * canvasRatio,
            fxRandom(0, sun_maxHeight * 2) * canvasRatio
          );

          // circle(
          //   0,
          //   fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 2) * canvasRatio,
          //   fxRandom(0, sun_maxHeight - 100 * canvasRatio) * canvasRatio
          // );
          // circle(
          //   0,
          //   fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 3) * canvasRatio,
          //   fxRandom(0, sun_maxHeight * 2) * canvasRatio
          // );
          circle(
            0,
            fxRandom(0, sun_maxHeight * 4) * canvasRatio,
            fxRandom(0, sun_maxHeight * 2) * canvasRatio
          );
          // circle(
          //   0,
          //   fxRandom(0, sun_maxHeight * 4) * canvasRatio,
          //   fxRandom(0, sun_maxHeight * 2) * canvasRatio
          // );
          // circle(
          //   0,
          //   fxRandom(0, sun_maxHeight * 4) * canvasRatio,
          //   fxRandom(0, sun_maxHeight * 2) * canvasRatio
          // );

          stroke(255, 20);
          circle(
            0,
            fxRandom(0, sun_maxHeight / 2) * canvasRatio,
            fxRandom(700 * canvasRatio, 750 * canvasRatio)
          );
          strokeWeight(0.1 * canvasRatio);
          stroke(255, fxRandom(50, 70));
          circle(
            0,
            fxRandom(sun_maxHeight, sun_maxHeight * 3) * canvasRatio,
            fxRandom(0, sun_maxHeight / 1.5) * canvasRatio
          );
          circle(
            0,
            fxRandom(sun_maxHeight * 1.5, sun_maxHeight * 2) * canvasRatio,
            fxRandom(0, sun_maxHeight * 2) * canvasRatio
          );
        }
        strokeWeight(0.1 * canvasRatio);
      }
      if (boken == 1) {
        circle(
          0,
          fxRandom(0, 900) * canvasRatio,
          fxRandom(0, 10) * canvasRatio
        );
      }

      this._i += this.space;
    } else if (this._i >= 360 && boken != 1) {
      sun_done = 1;
    }
    if (this._i >= 360) {
      this.life -= 1;
      this._i = 0;
    }
    if (this._i < 360 && this.life == 1) {
      this.xoff = map(cos(this._i), -1, 1, 0, 1);
      this.yoff = map(sin(this._i), -1, 1, 0, 1);
      this.n = noise(this.xoff, this.yoff);
      // 使永if i 對特定角度範圍控制日暈長度(-200,1000)
      this.h = map(this.n, 0, 1, -sun_maxHeight, 0);
      rotate(this._i);

      fill(
        this.c1 + fxRandom(0, 255),
        this.c2 + fxRandom(0, 140),
        this.c3 + fxRandom(0, 90),
        30
      );

      if (boken == 1 && mountainver != 3 && this._i < 90) {
        circle(
          0,
          fxRandom(0, 2000) * canvasRatio,
          fxRandom(0, 100) * canvasRatio
        );
      }
      // rect(sun_maxHeight, this.h, -1 * sun_maxHeight, 1);
      // fill(255, 100);
      // noFill();
      // stroke(255);

      // rect(sun_maxHeight / 2 + 300, this.h, 0.1, fxRandom(0, 300));
      // fill(255, 10);
      // rect(sun_maxHeight / 2, 0, 1, random(0, 2000));
      // fill(255, 40);
      // rect(sun_maxHeight / 2, 0, 1, -random(0, 2000));
      // rect(-sun_maxHeight, 0, 1, random(0, 2000));

      // rect(sun_maxHeight / 2, 0, random(0, 2000), 1);

      this._i += this.space * 100;
      if (this._i >= 360) {
        sun_done = 1;
      }
    }
  }
}

class klbox {
  constructor() {
    // setupCanvasRatio();
    console.log("++++++++++++++++" + canvasRatio);
    this.xPos = 0;
    this.yPos = 1300 * canvasRatio;

    this.posDegree = 0;
    this.posMoveRange = 100;
    this.mountain_noiseY = fxRandom(-1000, 1000);
    this.mountain_noiseScale = fxRandom(0.001, 0.003);

    this.mountain_yPos =
      this.yPos +
      noise(this.xPos * this.mountain_noiseScale, this.mountain_noiseY) *
        this.yPos;
    this.mountain2_yPos =
      this.yPos +
      noise(this.xPos * this.mountain_noiseScale, this.mountain_noiseY) *
        this.yPos;
    this.life = width * 2;
    //顏色
    if (vers > 0 && vers <= 10) {
      this.c1 = fxRandom(0, 255);
      this.c2 = fxRandom(160, 255);
      this.c3 = fxRandom(0, 220);
    } else if (vers > 10 && vers <= 20) {
      this.c1 = fxRandom(0, 120);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220);
    } else if (vers > 20 && vers <= 30) {
      //version 3
      this.c1 = fxRandom(0, 255);
      this.c2 = 160;
      this.c3 = 20;
    } else if (vers > 30 && vers <= 40) {
      //version 12
      this.c1 = fxRandom(0, 20);
      this.c2 = fxRandom(0, 20);
      this.c3 = fxRandom(0, 220);
    } else if (vers > 40 && vers <= 50) {
      //version 14
      this.c1 = fxRandom(0, 255);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220) + fxRandom(0, 30);
    } else if (vers > 50 && vers <= 60) {
      //version 15
      this.c1 = fxRandom(0, 255);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220) + fxRandom(0, 90);
    } else if (vers > 60 && vers <= 70) {
      //version 16
      this.c1 = fxRandom(0, 255);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220) + fxRandom(0, 1600);
    } else if (vers > 70 && vers <= 75) {
      //version 17
      this.c1 = fxRandom(0, 255) + fxRandom(0, 1600);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220);
    } else if (vers > 75 && vers <= 80) {
      //version 18
      this.c1 = fxRandom(220, 255);
      this.c2 = fxRandom(230, 240);
      this.c3 = fxRandom(30, 100);
    } else if (vers > 80 && vers < 90) {
      //version 19
      this.c1 = fxRandom(0, 255);
      this.c2 = fxRandom(0, 255);
      this.c3 = fxRandom(0, 220);
    } else if (vers > 90 && vers < 95) {
      //version 19
      this.c1 = 0 + fxRandom(0, 50);
      this.c2 = 92 + fxRandom(0, 255);
      this.c3 = 175 + fxRandom(0, 100);
    } else {
      this.c1 = fxRandom(0, 0);
      this.c2 = fxRandom(0, 0);
      this.c3 = fxRandom(0, 0);
    }
    // if (bgc == 0 || bgc == 255) {
    //   this.bc = bgc;
    //   background(this.bc);
    // } else if (bgc == "originbc-colored") {
    //   background(this.c1, this.c2, this.c3, fxRandom(0, 20));
    //   console.log(this.c1, this.c2, this.c3);
    // }

    this._i = 0;
    this.space = 0.05;
    this.xoff = map(cos(this.i), -1, 1, 0, 3);
    this.yoff = map(sin(this.i), -1, 1, 0, 3);
    this.n = noise(this.xoff, this.yoff + 900);
    this._h = 0;
    this.j = 0;
  }

  draw() {
    let xPosRatio = this.xPos / width;
    let yPosRatio = this.yPos / height;
    let steps = 1 / width;
    this.posMoveRange -= 0.01;

    this.mountain_yPos =
      this.yPos +
      noise(this.xPos * mountain_noiseScale, mountain_noiseY) * this.yPos;
    this.mountain2_yPos =
      this.yPos +
      300 * canvasRatio +
      noise(this.xPos * this.mountain_noiseScale, this.mountain_noiseY) *
        this.yPos;

    this.mountain_yPos =
      this.yPos +
      noise(
        (xPosRatio * 4000 * this.mountain_noiseScale) / 2,
        this.mountain_noiseY
      ) *
        this.yPos;
    strokeWeight(0.17 * canvasRatio);

    if (this.life > width) {
      light_switch = 0;
      if (mountainver == 14) {
        noFill();
        stroke(this.c1, this.c2, this.c3, 100);
        // rect(this.xPos, this.mountain_yPos, fxRandom(0, 2), fxRandom(0, 300));
        //第一座山
        rect(this.xPos, this.mountain_yPos, 0.1, mountainHeight);
        rect(width - this.xPos, this.mountain_yPos, 0.1, mountainHeight);
        //第二座山
        rect(this.xPos, this.mountain2_yPos - 300, 0.1, mountainHeight);
        rect(width - this.xPos, this.mountain2_yPos - 300, 0.1, mountainHeight);
        //第一座山白雪
        stroke(255, 255, 255, 80);
        let minus = mountainHeight / 3;
        rect(this.xPos, this.mountain_yPos, 0.1, fxRandom(300, minus));
        rect(width - this.xPos, this.mountain_yPos, 0.1, fxRandom(300, minus));
        //第二座山白雪
        rect(this.xPos, this.mountain2_yPos - 300, 0.1, fxRandom(300, minus));
        rect(
          width - this.xPos,
          this.mountain2_yPos - 300,
          0.1,
          fxRandom(300, minus)
        );
        // rect(this.xPos, this.mountain_yPos, 0.1, 0.1);
      } else if (mountainver == 2) {
        strokeWeight(0.035 * canvasRatio);
        this.mountain_noiseScale = getRandom(0.003, 0.012);

        this.mountain_yPos =
          this.yPos +
          noise(
            (xPosRatio * 4000 * this.mountain_noiseScale) / 2,
            this.mountain_noiseY
          ) *
            this.yPos;
        this.mountain2_yPos =
          this.yPos +
          500 * canvasRatio +
          noise(
            xPosRatio * 1000 * this.mountain_noiseScale,
            this.mountain_noiseY
          ) *
            this.yPos;

        stroke(255, fxRandom(0, 70));

        stroke(this.c1, this.c2, this.c3 + fxRandom(0, 80));
        noFill();
        rect(
          this.xPos,
          this.yPos +
            noise(
              xPosRatio * 1500 * this.mountain_noiseScale,
              this.mountain_noiseY
            ) *
              this.yPos,
          (fxRandom(1, 10) / 10) * canvasRatio,
          10000 * canvasRatio
        );
        // stroke(255, fxRandom(0, 80));
        // rect(
        //   this.xPos,
        //   this.yPos +
        //     noise(
        //       xPosRatio * 1500 * this.mountain_noiseScale,
        //       this.mountain_noiseY
        //     ) *
        //       this.yPos,
        //   0.1 * canvasRatio,
        //   400 * canvasRatio
        // );

        //畫長線
        let long_line;
        if (sky_line == 1) {
          if (fxRandom(0, 100) < 1) {
            long_line = -2000 * canvasRatio;
            stroke(this.c1, this.c2, this.c3, fxRandom(70, 90));
            strokeWeight(2 * canvasRatio);
          } else {
            long_line = 100 * canvasRatio;
            stroke(255, fxRandom(0, 50));
            strokeWeight(0.035 * canvasRatio);
          }
        }

        // blendMode(SCREEN);
        rect(
          this.xPos,
          this.mountain_yPos,
          (fxRandom(1, 10) / 10) * canvasRatio,
          100 * canvasRatio + fxRandom(long_line, 200 * canvasRatio)
        );
        blendMode(BLEND);
        strokeWeight(0.035 * canvasRatio);
        for (let starnum = 0; starnum < 1; starnum++) {
          fill(255, 10);
          circle(this.xPos, fxRandom(0, 10000 * canvasRatio), fxRandom(0, 1));
          fill(this.c1, this.c2, this.c3, fxRandom(0, 2));
          circle(
            this.xPos,
            fxRandom(0, 4000 * canvasRatio),
            fxRandom(0, 5 * canvasRatio)
          );
          fill(this.c1, this.c2, this.c3, fxRandom(90, 100));
          circle(
            this.xPos,
            fxRandom(0 * canvasRatio, 10000 * canvasRatio),
            fxRandom(0, 5 * canvasRatio)
          );
          fill(this.c1, this.c2, this.c3, fxRandom(90, 100));
          circle(
            this.xPos,
            fxRandom(0 * canvasRatio, 2000 * canvasRatio),
            fxRandom(0, 5 * canvasRatio)
          );
          fill(this.c1, this.c2, this.c3, fxRandom(90, 100));
          circle(
            this.xPos,
            fxRandom(0 * canvasRatio, 2900 * canvasRatio),
            fxRandom(0, 5 * canvasRatio)
          );
        }
        noFill();
        blendMode(BLEND);
        strokeWeight(0.035 * canvasRatio);
        // stroke(255);
        // rect(this.xPos, this.mountain_yPos, 0.1, getRandom(0, 300));

        rect(
          this.xPos,
          this.mountain2_yPos,
          (fxRandom(1, 10) / 10) * canvasRatio,
          fxRandom(0, 400) * canvasRatio
        );
        stroke(255, fxRandom(50, 100));

        rect(
          this.xPos,
          this.mountain2_yPos + fxRandom(0, 400) * canvasRatio,
          (fxRandom(1, 10) / 10) * canvasRatio,
          fxRandom(0, 100) * canvasRatio
        );
        stroke(255);
        rect(
          this.xPos,
          this.mountain2_yPos,
          (fxRandom(1, 10) / 10) * canvasRatio,
          fxRandom(0, 300) * canvasRatio
        );
        //跌在第一層山後面

        if (CanvasHeight > 3000 * canvasRatio && mountainCount != 1) {
          stroke(this.c1, this.c2 - 20, this.c3 - 30);
          rect(
            this.xPos,
            this.mountain_yPos + 1000 * canvasRatio,
            (fxRandom(1, 10) / 10) * canvasRatio,
            fxRandom(0, 400) * canvasRatio
          );

          rect(
            this.xPos,
            this.mountain_yPos + 1000 * canvasRatio,
            (fxRandom(1, 10) / 10) * canvasRatio,
            fxRandom(0, 300) * canvasRatio
          );
          stroke(255, fxRandom(0, 100));
          rect(
            this.xPos,
            this.mountain_yPos + 1000 * canvasRatio,
            (fxRandom(1, 10) / 10) * canvasRatio,
            fxRandom(0, 100) * canvasRatio
          );
          stroke(255);
          rect(this.xPos, this.mountain_yPos, 0.1, fxRandom(0, 300));

          // rect(
          //   this.xPos,
          //   this.mountain_yPos + 1500 * canvasRatio,
          //   fxRandom(0.1, 0.6) * canvasRatio,
          //   fxRandom(0, 300) * canvasRatio * canvasRatio
          // );
          // stroke(255, fxRandom(0, 100));
          // rect(
          //   this.xPos,
          //   this.mountain_yPos + 1500 * canvasRatio,
          //   (fxRandom(1, 10) / 10) * canvasRatio,
          //   fxRandom(0, 30) * canvasRatio
          // );
          // stroke(255);
          // rect(
          //   this.xPos,
          //   this.mountain_yPos + 1500 * canvasRatio,
          //   (fxRandom(1, 10) / 10) * canvasRatio,
          //   fxRandom(0, 300) * canvasRatio
          // );
          // fill(155, fxRandom(0, 20));
          // stroke(255, fxRandom(0, 100));
          // rect(
          //   this.xPos,
          //   this.mountain2_yPos + 300 * canvasRatio,
          //   (fxRandom(1, 10) / 10) * canvasRatio,
          //   fxRandom(0, 500) * canvasRatio
          // );
        }
        if (CanvasHeight > 3000 * canvasRatio && mountainCount != 1) {
        }
      } else if (mountainver == 3) {
        light_switch = 0;
        stroke(255);
        fill(
          this.c1 + random(0, 255),
          this.c2 + random(0, 140),
          this.c3 + random(0, 90),
          30
        );
        rect(
          this.xPos,
          0,
          0.1,
          fxRandom(
            CanvasHeight / 2 + 400 * canvasRatio,
            CanvasHeight / 2 + 500 * canvasRatio
          ) * canvasRatio
        );
        stroke(this.c1, this.c2, this.c3, 70);
        rect(this.xPos, this.mountain_yPos, 0.1, mountainHeight);

        stroke(255, fxRandom(0, 100));
        rect(this.xPos, this.mountain_yPos, 0.1, mountainHeight);

        // stroke(255);
        // rect(this.xPos, this.mountain_yPos, 0.1, fxRandom(0, 300));

        rect(this.xPos, this.mountain2_yPos, 0.5, 400 * canvasRatio);
        stroke(255, fxRandom(0, 100));
        rect(
          this.xPos,
          this.mountain2_yPos + fxRandom(0, 400 * canvasRatio),
          0.1,
          20 * canvasRatio
        );
        stroke(255);
        rect(
          this.xPos,
          this.mountain2_yPos,
          0.1,
          fxRandom(0, 300 * canvasRatio) * canvasRatio
        );
      } else if (mountainver == 4) {
        // this.mountain_yPos =
        //   this.yPos +
        //   noise(this.xPos * this.mountain_noiseScale, this.mountain_noiseY) *
        //     this.yPos;
        // this.mountain2_yPos =
        //   this.yPos +
        //   300 +
        //   noise(this.xPos * this.mountain_noiseScale, this.mountain_noiseY) *
        //     this.yPos;
        // this.yPos = sin(radians(this.posDegree)) * this.posMoveRange;
        strokeWeight(0.05 * canvasRatio);
        stroke(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          90
        );
        rect(
          this.xPos,
          this.yPos +
            noise(this.xPos * mountain_noiseScale, mountain_noiseY) * this.yPos,
          0.1,
          mountainHeight
        );
        stroke(0, 40);
        rect(
          this.xPos,
          this.yPos +
            noise(this.xPos * mountain_noiseScale, mountain_noiseY) * this.yPos,
          0.1,
          300
        );
        stroke(
          this.c1 + fxRandom(0, 255),
          this.c2 + fxRandom(0, 140),
          this.c3 + fxRandom(0, 90),
          90
        );
        rect(this.xPos, this.mountain_yPos, 0.1, mountainHeight);
        fill(255, 100);
        circle(this.xPos, this.mountain_yPos, fxRandom(0, 3));
        // stroke(255, fxRandom(0, 100));
        // rect(this.xPos, this.mountain_yPos, 0.1, mountainHeight);

        // stroke(255);
        // rect(this.xPos, this.mountain_yPos, 0.1, fxRandom(0, 300));

        rect(this.xPos, this.mountain2_yPos, 0.5, 400);
        stroke(255, fxRandom(0, 100));
        rect(this.xPos, this.mountain2_yPos + fxRandom(0, 400), 0.1, 20);
        stroke(255);
        rect(this.xPos, this.mountain2_yPos, 0.1, fxRandom(0, 300));
      }
    } else if (this.life > 0 && this.life <= width) {
      //開啟太陽
      light_switch = 1;
      //白霧設定
      if (mountainver == 14) {
        stroke(255, 255, 255, 80);
        fill(155, fxRandom(0, 70));
        rect(this.xPos, this.mountain2_yPos, 0.1, fxRandom(0, 300));
      } else if (mountainver == 2) {
      }
    } else if (this.life <= width && printed == 0 && sun_done == 1) {
      print_end();
    } else if (
      this.life <= width &&
      printed == 0 &&
      sun_done == 1 &&
      mountainver != 14
    ) {
      print_end();
    }

    let w = fxRandom(0, 400);
    let h = fxRandom(0, 600);
    //畫第二層的設定
    if (this.xPos >= width) {
      this.xPos = 0;
      this.yPos = this.yPos + 10 * canvasRatio;
    }
    this.life -= 1 * canvasRatio;
    this.xPos += 1 * canvasRatio;
  }
}

// document.getElementsByTagName("canvas").addEventListener("click", loaded());
function print_end() {
  granulate(10);
  // textureOverlay(texture);

  const link = document.createElement("a");
  link.download = vers + "_" + fxhash + ".png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  printed = 1;

  fxpreview();
  location.reload();
  console.log(
    "________________________________" + "\n\n\n" + "Final art printing..."
  );
}

function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
    // comment in, if you want to granulate the alpha value
    // pixels[i+3] = pixels[i+3] + grainAmount;
  }
  updatePixels();
}
