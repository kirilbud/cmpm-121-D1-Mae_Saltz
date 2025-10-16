import "./style.css";

//engine stuff
let delta_update: number = performance.now() / 1000.0;
let delta_time: number = 0;

let woodCounter: number = 0;
//let _woodCutters: number = 0;
//let _woodPerSec: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  <button id="wood_increment">Chop Wood!</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
  
  <div><p>You currently own: <span id="wood_cutters">0</span> automatic wood cutters giving you <span id="woodPerSec">0</span> wood per sec </p></div>
  <button id="wood_increment">buy a wood cutter for <span id="wood_counters">10</span> wood!</button>
`;

// Add click handler
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

woodButton.addEventListener("click", () => {
  woodCounter = woodCounter + 1;
  woodCounterElement.textContent = String(woodCounter);
});

function increment_wood(amount: number) {
  woodCounter = woodCounter + amount * delta_time;
  woodCounterElement.textContent = String(Math.floor(woodCounter));
}

setInterval(increment_wood, 1000, 1);

function tick() {
  delta_time = performance.now() / 1000.0 - delta_update;
  delta_update = performance.now() / 1000.0;

  increment_wood(1);

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

console.log("Mae was here");
console.log("Shawn was here");
