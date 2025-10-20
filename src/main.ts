import "./style.css";

//engine stuff
let delta_update: number = performance.now() / 1000.0;
let delta_time: number = 0;

let woodCounter: number = 0;
let woodCutters: number = 0;
let lumberMills: number = 0;

let stoneCounter: number = 0;
let drillCounter: number = 0;
//let woodCutterUpgrades: number = 0;
//let _woodPerSec: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  
  <button id="wood_increment">Chop Wood!🌳</button>
  <button id="stone_increment">Mine Stone!⛰️</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
  <div><p>Stone: <span id="stone_counter">0</span></p></div>
   <div><p>Your buildings are giving you <span id="wood_persec">0</span> wood per second and <span id="stone_persec">0</span> stone per second </p></div>
  
  <div><p>You currently own: <span id="wood_cutters">0</span> automatic wood cutters.</div>
  <button id="wood_cutter_button">buy an automatic wood cutter for <span id="price">10</span> stone!</button>

  <div><p>You currently own: <span id="stone_cutters">0</span> drills.</div>
  <button id="stone_cutter_button">buy a drill for <span id="price">10</span> stone!</button>
  
  <div><p>You currently own: <span id="lumber_mills">0</span> lumber mills.</div>
  <button id="lumber_mill_button">buy a drill for <span id="price">100</span> stone!</button>
`;

// wood variables
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

const woodCutterButton = document.getElementById(
  "wood_cutter_button",
) as HTMLButtonElement;

const lumberMillButton = document.getElementById(
  "lumber_mill_button",
) as HTMLButtonElement;

const woodCutterElement = document.getElementById("wood_cutters")!;
const lumberMillsElement = document.getElementById("lumber_mills")!;
const woodPerSec = document.getElementById("wood_persec")!;

// Stone variables
const stoneButton = document.getElementById("stone_increment")!;
const stoneCounterElement = document.getElementById("stone_counter")!;
const stoneCutterButton = document.getElementById(
  "stone_cutter_button",
) as HTMLButtonElement;
const stoneCutterElement = document.getElementById("stone_cutters")!;
const stonePerSec = document.getElementById("stone_persec")!;

//button functions
woodButton.addEventListener("click", () => {
  woodCounter = woodCounter + 1;
  woodCounterElement.textContent = String(woodCounter);
});

lumberMillButton.addEventListener("click", () => {
  lumberMills = lumberMills + 1;
  stoneCounter = stoneCounter - 100;
  lumberMillsElement.textContent = String(lumberMills);
  woodPerSec.textContent = String(woodCutters);
});

woodCutterButton.addEventListener("click", () => {
  woodCutters = woodCutters + 1;
  stoneCounter = stoneCounter - 10;
  woodCutterElement.textContent = String(woodCutters);
});

stoneButton.addEventListener("click", () => {
  stoneCounter = stoneCounter + 1;
  stoneCounterElement.textContent = String(stoneCounter);
});

stoneCutterButton.addEventListener("click", () => {
  drillCounter = drillCounter + 1;
  woodCounter = woodCounter - 10;
  stoneCutterElement.textContent = String(drillCounter);
});

//increment functions
function increment_wood(amount: number) {
  woodCounter = woodCounter + amount * delta_time;
  woodCounterElement.textContent = String(Math.floor(woodCounter));
}

function increment_stone(amount: number) {
  stoneCounter = stoneCounter + amount * delta_time;
  stoneCounterElement.textContent = String(Math.floor(stoneCounter));
}

setInterval(increment_wood, 1000, 1);

function tick() {
  delta_time = performance.now() / 1000.0 - delta_update;
  delta_update = performance.now() / 1000.0;

  increment_wood(1 * woodCutters + lumberMills * 10);
  increment_stone(1 * drillCounter);

  //disable button if its not in use
  woodCutterButton.disabled = stoneCounter < 10;
  lumberMillButton.disabled = stoneCounter < 100;
  stoneCutterButton.disabled = woodCounter < 10;

  woodPerSec.textContent = String(woodCutters + lumberMills * 10);
  stonePerSec.textContent = String(drillCounter);

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

console.log("Mae was here");
console.log("Shawn was here");
