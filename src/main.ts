import "./style.css";

//engine stuff
let delta_update: number = performance.now() / 1000.0;
let delta_time: number = 0;

let woodCounter: number = 0;
let woodCutters: number = 0;
//let _woodPerSec: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  <button id="wood_increment">Chop Wood!</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
  
  <div><p>You currently own: <span id="wood_cutters">0</span> automatic wood cutters giving you <span id="wood_persec">0</span> wood per sec </p></div>
  <button id="wood_cutter_button">buy a wood cutter for <span id="price">10</span> wood!</button>
`;

// Add click handler
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

const woodCutterButton = document.getElementById(
  "wood_cutter_button",
) as HTMLButtonElement;
const woodCutterElement = document.getElementById("wood_cutters")!;
const woodPerSec = document.getElementById("wood_persec")!;

woodButton.addEventListener("click", () => {
  woodCounter = woodCounter + 1;
  woodCounterElement.textContent = String(woodCounter);
});

woodCutterButton.addEventListener("click", () => {
  woodCutters = woodCutters + 1;
  woodCounter = woodCounter - 10;
  woodCutterElement.textContent = String(woodCutters);
  woodPerSec.textContent = String(woodCutters);
});

function increment_wood(amount: number) {
  woodCounter = woodCounter + amount * delta_time;
  woodCounterElement.textContent = String(Math.floor(woodCounter));
}

setInterval(increment_wood, 1000, 1);

function tick() {
  delta_time = performance.now() / 1000.0 - delta_update;
  delta_update = performance.now() / 1000.0;

  increment_wood(1 * woodCutters);

  //disable button if its not in use
  woodCutterButton.disabled = woodCounter < 10;

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

console.log("Mae was here");
console.log("Shawn was here");
