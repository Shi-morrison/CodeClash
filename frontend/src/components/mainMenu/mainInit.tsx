let menuSelected = 0;

const twoPi = Math.PI * 2;


const menuText = [
  ["Find a Match", "Coming Soon", "Config", "About"],
  ["Audio", "Gameplay", "Keyboard Controls", "Credits"],
  ["Local VS", "Spectate", "P2P", "Server"],
  ["Controller", "Keyboard"]
];
const menuExplanation = [
  ["Multiplayer Battles!", "Smash ten targets!", "Build target test stages!", "Game setup."],
  ["Select audio levels.", "Change gameplay settings.", "Customize & calibrate controls.", "Who did this?"],
  ["One box this screen.", "Ranked Mode", "Hostless Muliplayer", "Hosted Multiplayer"],
  ["Customize & calibrate controller.", "Customize keyboard controls."]
];
const menuCount = [4, 4, 4,2];
const menuTitle = ["CodeClash", "Options", "Battle Mode", "Controls"];
let menuColourOffset = 0;
const menuColours = [238, 358, 117, 55];
let menuCurColour = 238;
//hsl(55, 100%, 50%)
let menuCycle = 0;
let menuTimer = 0;
let menuMode = 0;
let menuGlobalTimer = 0;
let menuAngle = 0;
let menuRandomBox = [Math.random(), Math.random(), Math.random(), Math.random()];

const layerSwitches = {
  BG1 : true,
  BG2 : true,
  FG1 : true,
  FG2 : true,
  UI : true
};

function clearScreen(uiCanvas: HTMLCanvasElement, fg2Canvas: HTMLCanvasElement, bg2Canvas: HTMLCanvasElement, bg1: CanvasRenderingContext2D, bg2: CanvasRenderingContext2D, fg1: CanvasRenderingContext2D, fg2: CanvasRenderingContext2D, ui: CanvasRenderingContext2D) {
  bg1.fillStyle = "rgb(0, 0, 0)";
  //bg1.fillRect(0,0,layers.BG1.width,layers.BG1.height);
  bg2.clearRect(0, 0, bg2Canvas.width, bg2Canvas.height);
  //fg1.clearRect(0,0,layers.FG1.width,layers.FG1.height);
  fg2.clearRect(0, 0, fg2Canvas.width, fg2Canvas.height);
  ui.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
}

export function drawMainMenuInit(bg1Canvas: HTMLCanvasElement, bg1: CanvasRenderingContext2D, bg2: CanvasRenderingContext2D, fg1: CanvasRenderingContext2D, fg2: CanvasRenderingContext2D, ui: CanvasRenderingContext2D) {
  var bgGrad = bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgba(12, 11, 54, 1)");
  bgGrad.addColorStop(1, "rgba(1, 2, 15, 1)");
  bg1.fillStyle = bgGrad;
  bg1.fillRect(0, 0, bg1Canvas.width, bg1Canvas.height);

  fg1.lineWidth = 5;
  fg1.strokeStyle = "rgba(3, 31, 219,0.5)";
  fg1.fillStyle = "hsla(" + menuCurColour + ",100%,50%,0.5)";
  fg1.save();
  fg1.translate(800, 400);
  fg1.rotate(0.7);
  fg1.scale(0.4, 1);
  fg1.beginPath();
  fg1.arc(0, 0, 400, 0, twoPi);
  fg1.closePath();
  fg1.stroke();
  fg1.restore();
  fg1.save();
  fg1.translate(800, 400);
  fg1.rotate(0.8);
  fg1.scale(0.4, 1);
  fg1.beginPath();
  fg1.arc(0, 0, 400, 0, twoPi);
  fg1.closePath();
  fg1.stroke();
  fg1.restore();

  fg1.lineWidth = 3;
  fg1.strokeStyle = "rgba(255,255,255,0.13)";
  fg1.beginPath();
  for (var i = 0; i < 60; i++) {
    fg1.moveTo(0 + (i * 30), 0);
    fg1.lineTo(0 + (i * 30), 750);
    fg1.moveTo(0, 0 + (i * 30));
    fg1.lineTo(1200, 0 + (i * 30));
  }
  fg1.stroke();
}

export function drawMainMenu(uiCanvas: HTMLCanvasElement, fg2Canvas: HTMLCanvasElement, bg2Canvas: HTMLCanvasElement, bg1: CanvasRenderingContext2D, bg2: CanvasRenderingContext2D, fg1: CanvasRenderingContext2D, fg2: CanvasRenderingContext2D, ui: CanvasRenderingContext2D) {
  clearScreen(uiCanvas, fg2Canvas, bg2Canvas, bg1, bg2, fg1, fg2, ui);
    menuGlobalTimer++;
    if (menuGlobalTimer > 600) {
      menuGlobalTimer = 0;
    }
    bg2.save();
    bg2.fillStyle = "rgba(18, 16, 85, 0.4)";
    bg2.translate(400, 400);
    bg2.rotate(0.7);
    bg2.fillRect(-150, 800 - menuGlobalTimer * 10, 40, 70);
    bg2.fillRect(-350, 1200 - menuGlobalTimer * 9, 30, 170);
    bg2.fillRect(-320, 1900 - menuGlobalTimer * 10, 40, 120);
    bg2.fillRect(-420, 1000 - menuGlobalTimer * 5, 90, 210);
    bg2.fillRect(-100, 1600 - menuGlobalTimer * 6, 95, 200);
    bg2.fillRect(-80, 2100 - menuGlobalTimer * 6, 65, 260);
    bg2.fillRect(-170, 2200 - menuGlobalTimer * 8, 65, 80);
    bg2.fillRect(-400, 2700 - menuGlobalTimer * 10, 30, 130);
    bg2.fillRect(-300, 3000 - menuGlobalTimer * 7, 40, 90);
    bg2.fillRect(-50, 4400 - menuGlobalTimer * 10, 80, 90);
    bg2.fillRect(-220, 4500 - menuGlobalTimer * 9, 50, 180);
    bg2.fillRect(-500, 4900 - menuGlobalTimer * 10, 20, 220);
    bg2.fillRect(-480, 5100 - menuGlobalTimer * 15, 50, 80);
    bg2.fillRect(-300, 5500 - menuGlobalTimer * 10, 30, 90);
    bg2.fillRect(-50, 5900 - menuGlobalTimer * 12, 40, 110);
  
    if (menuGlobalTimer % 130 == 0) {
      menuRandomBox = [Math.random(), Math.random(), Math.random(), Math.random()];
    }
    if (menuGlobalTimer % 130 < 50) {
      bg2.fillStyle = "rgba(118, 113, 255," + Math.max(0.5 - (menuGlobalTimer % 130) * 0.01, 0) + ")"
      bg2.fillRect(menuRandomBox[0] * -450, menuRandomBox[1] * 800 - 400, menuRandomBox[2] * 50 + 30, menuRandomBox[3] *
          60 + 30);
    }
    bg2.restore();
    fg2.fillStyle = "hsla(" + menuCurColour + ", 60%, 41%,0.75)";
    fg2.save();
    fg2.translate(800, 400);
    fg2.rotate(0.7);
    menuAngle += 0.015;
    if (menuAngle >= twoPi) {
      menuAngle = 0;
    }
    fg2.beginPath();
    fg2.arc(400 * Math.cos(menuAngle) * 0.4, 400 * Math.sin(menuAngle), 15, 0, twoPi);
    fg2.closePath();
    fg2.fill();
    fg2.restore();
  
    if (menuCurColour != menuColours[menuSelected]) {
      menuCurColour += menuColourOffset * 0.05;
      if (menuTimer == 19) {
        menuCurColour = Math.round(menuCurColour);
      }
    }
    ui.lineWidth = 3;
    ui.fillStyle = "hsla(" + menuCurColour + ", 60%, 41%,0.75)";
    ui.strokeStyle = "hsl(" + menuCurColour + ", 60%, 41%)";
    ui.beginPath();
    ui.moveTo(300, 620);
    ui.lineTo(180, 620);
    ui.bezierCurveTo(130, 620, 130, 620, 130, 570);
    ui.lineTo(130, 200);
    ui.bezierCurveTo(130, 150, 130, 150, 180, 150);
    ui.lineTo(550, 150);
    ui.lineTo(600, 80);
    ui.lineTo(1020, 80);
    ui.bezierCurveTo(1070, 80, 1070, 80, 1070, 130);
    ui.lineTo(1070, 570);
    ui.bezierCurveTo(1070, 620, 1070, 620, 1020, 620);
    ui.lineTo(900, 620);
    ui.lineTo(900, 680);
    ui.lineTo(1050, 680);
    ui.bezierCurveTo(1100, 680, 1100, 680, 1100, 630);
    ui.lineTo(1100, 110);
    ui.bezierCurveTo(1100, 60, 1100, 60, 1050, 60);
    ui.lineTo(590, 60);
    ui.lineTo(540, 130);
    ui.lineTo(150, 130);
    ui.bezierCurveTo(100, 130, 100, 130, 100, 180);
    ui.lineTo(100, 630);
    ui.bezierCurveTo(100, 680, 100, 680, 150, 680);
    ui.lineTo(300, 680);
    ui.closePath();
    ui.fill();
    ui.stroke();
    ui.beginPath();
    ui.moveTo(590, 60);
    ui.lineTo(570, 60);
    ui.lineTo(520, 130);
    ui.lineTo(540, 130);
    ui.closePath();
    ui.fill();
    ui.stroke();
    ui.beginPath();
    ui.moveTo(570, 60);
    ui.lineTo(550, 60);
    ui.lineTo(500, 130);
    ui.lineTo(520, 130);
    ui.closePath();
    ui.fill();
    ui.stroke();
    ui.beginPath();
    ui.moveTo(550, 60);
    ui.lineTo(530, 60);
    ui.lineTo(480, 130);
    ui.lineTo(500, 130);
    ui.closePath();
    ui.fill();
    ui.stroke();
    ui.fillStyle = "rgba(0,0,0,0.7)";
    ui.strokeStyle = "white";
    ui.beginPath();
    ui.moveTo(330, 610);
    ui.lineTo(870, 610);
    ui.bezierCurveTo(890, 610, 890, 610, 890, 630);
    ui.lineTo(890, 670);
    ui.bezierCurveTo(890, 690, 890, 690, 870, 690);
    ui.lineTo(330, 690);
    ui.bezierCurveTo(310, 690, 310, 690, 310, 670);
    ui.lineTo(310, 630);
    ui.bezierCurveTo(310, 610, 310, 610, 330, 610);
    ui.closePath();
    ui.fill();
    ui.stroke();
    ui.save();
    ui.textAlign = "center";
    ui.fillStyle = "rgba(255, 255, 255, 0.8)";
    ui.font = "700 35px Arial";
    ui.fillText(menuExplanation[menuMode][menuSelected], 600, 660);
    ui.fillStyle = "rgba(255, 255, 255, 0.5)";
    ui.font = "italic 900 48px Arial";
    ui.fillText(menuTitle[menuMode], 300, 120);
  
    ui.fillStyle = "rgba(0, 0, 0, 0.76)";
    ui.lineWidth = 5;
    ui.strokeStyle = "rgba(255, 214, 0, 0.95)";
    for (var i = 0; i < menuCount[menuMode]; i++) {
      ui.beginPath();
      ui.moveTo(420 - i * 65, 200 + i * 100);
      ui.lineTo(970 - i * 65, 200 + i * 100);
      ui.arc(970 - i * 65, 235 + i * 100, 35, Math.PI * 1.5, Math.PI * 0.5);
      ui.lineTo(970 - i * 65, 262 + i * 100);
      ui.arc(970 - i * 65, 235 + i * 100, 20, Math.PI * 0.5, Math.PI * 1.5, true);
      ui.lineTo(970 - i * 65, 225 + i * 100);
      ui.arc(970 - i * 65, 235 + i * 100, 10, Math.PI * 1.5, Math.PI * 0.5);
      ui.lineTo(970 - i * 65, 270 + i * 100);
      ui.lineTo(415 - i * 65, 270 + i * 100);
      ui.lineTo(405 - i * 65, 250 + i * 100);
      ui.closePath();
      ui.fill();
      ui.stroke();
    }
    ui.fillStyle = "rgb(254, 238, 27)";
    for (var i = 0; i < menuCount[menuMode]; i++) {
      var x = 1000;
      if (menuSelected == i) {
        x = 0;
      }
      ui.beginPath();
      ui.moveTo(420 - i * 65 + x, 200 + i * 100);
      ui.lineTo(970 - i * 65 + x, 200 + i * 100);
      ui.arc(970 - i * 65 + x, 235 + i * 100, 35, Math.PI * 1.5, Math.PI * 0.5);
      ui.lineTo(970 - i * 65 + x, 262 + i * 100);
      ui.arc(970 - i * 65 + x, 235 + i * 100, 20, Math.PI * 0.5, Math.PI * 1.5, true);
      ui.lineTo(970 - i * 65 + x, 225 + i * 100);
      ui.arc(970 - i * 65 + x, 235 + i * 100, 10, Math.PI * 1.5, Math.PI * 0.5);
      ui.lineTo(970 - i * 65 + x, 270 + i * 100);
      ui.lineTo(415 - i * 65 + x, 270 + i * 100);
      ui.lineTo(405 - i * 65 + x, 250 + i * 100);
      ui.closePath();
      ui.fill();
      ui.stroke();
      if (menuSelected == i) {
        ui.save();
        ui.fillStyle = "black";
        ui.textAlign = "center";
        ui.fillText(menuText[menuMode][i], 680 - i * 65, 250 + i * 100);
        ui.globalAlpha = 0.7;
        ui.strokeStyle = "rgb(255, 247, 144)";
        ui.lineWidth = 8;
        ui.beginPath();
        ui.arc(970 - i * 65, 235 + i * 100, 35, 0, twoPi);
        ui.closePath();
        ui.stroke();
        ui.lineWidth = 15;
        ui.beginPath();
        ui.arc(970 - i * 65, 235 + i * 100, 13, 0, twoPi);
        ui.closePath();
        ui.stroke();
        menuTimer++;
        if (menuTimer > 60) {
          menuTimer = 0;
          menuCycle = 1 - menuCycle;
        }
        ui.fillStyle = "rgb(255, 247, 144)";
        ui.globalAlpha = Math.abs(1 - menuTimer * 0.033);
        ui.beginPath();
        ui.arc(970 - i * 65, 235 + i * 100, 25, 0, twoPi);
        ui.closePath();
        ui.fill();
        ui.lineWidth = 3;
        ui.globalAlpha = 0.5;
        ui.beginPath();
        ui.arc(970 - i * 65, 235 + i * 100, Math.max(13, 100 - menuTimer * 2), 0, twoPi);
        ui.closePath();
        ui.stroke();
        if (menuCycle == 1 && menuTimer > 10) {
          ui.beginPath();
          ui.arc(970 - i * 65, 235 + i * 100, Math.max(13, 130 - menuTimer * 2), 0, twoPi);
          ui.closePath();
          ui.stroke();
        }
        ui.restore();
        ui.fillStyle = "rgb(254, 238, 27)";
  
      } else {
        ui.fillText(menuText[menuMode][i], 680 - i * 65, 250 + i * 100);
      }
    }
    ui.restore();
  }