import "./style.css";

//represents a building and or upgrade
interface Item {
  name: string;
  cost: number;
  costType: string;
  rate: number;
  amount: number;
  button: HTMLButtonElement;
  productionType: string;
  production: number;
  description: string;
  buttonPrompt: string;
  descriptionElement: HTMLParagraphElement;
}

//so the compiler doesnt complain that they are not set but will be replaced later
const tempButton = document.createElement("button");
const tempPElem = document.createElement("p");

//upgrades and upgrades available to the player
const availableItems: Item[] = [
  {
    name: "wood cutter",
    cost: 10,
    costType: "stone",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "wood",
    production: 1,
    description: "",
    buttonPrompt: "cuts 1 wood per second what else is there too say",
    descriptionElement: tempPElem,
  },
  {
    name: "tree farm",
    cost: 100,
    costType: "stone",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "wood",
    production: 10,
    description: "",
    buttonPrompt: "a small little patch of land giving you 10 wood per second",
    descriptionElement: tempPElem,
  },
  {
    name: "lumber mill",
    cost: 1000,
    costType: "stone",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "wood",
    production: 100,
    description: "",
    buttonPrompt: "big wood factory giving 1000 wood per second",
    descriptionElement: tempPElem,
  },
  {
    name: "drill",
    cost: 10,
    costType: "wood",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "stone",
    production: 1,
    description: "",
    buttonPrompt: "small drill making 1 stone per second",
    descriptionElement: tempPElem,
  },
  {
    name: "small cave",
    cost: 100,
    costType: "",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "stone",
    production: 10,
    description: "",
    buttonPrompt:
      "caves have lots of rocks and these give you 10 stone per second",
    descriptionElement: tempPElem,
  },
  {
    name: "mining quarry",
    cost: 1000,
    costType: "wood",
    rate: 1.25,
    amount: 0,
    button: tempButton,
    productionType: "stone",
    production: 100,
    description: "",
    buttonPrompt:
      "not mining for gemstones or rare metals no you are here for 100 stone per second",
    descriptionElement: tempPElem,
  },
];

//GLOBALS
// wood variables
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

const woodPerSec = document.getElementById("wood_persec")!;

// Stone variables
const stoneButton = document.getElementById("stone_increment")!;
const stoneCounterElement = document.getElementById("stone_counter")!;

const stonePerSec = document.getElementById("stone_persec")!;

//time passed from last frame
let delta_update: number = performance.now() / 1000.0;
let delta_time: number = 0;

//resources available
let woodCounter: number = 0;
let stoneCounter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  
  <button id="wood_increment">Chop Wood!🌳</button>
  <button id="stone_increment">Mine Stone!⛰️</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
  <div><p>Stone: <span id="stone_counter">0</span></p></div>
  <div><p>Your buildings are giving you <span id="wood_persec">0</span> wood per second and <span id="stone_persec">0</span> stone per second </p></div>
  


`;

//button functions
woodButton.addEventListener("click", () => {
  woodCounter = woodCounter + 1;
  woodCounterElement.textContent = String(woodCounter);
});

stoneButton.addEventListener("click", () => {
  stoneCounter = stoneCounter + 1;
  stoneCounterElement.textContent = String(stoneCounter);
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

//setup the game
start();
function start() {
  //set up all the buttons and upgrades
  for (const upgrade of availableItems) {
    const itemDescription = document.createElement("p");
    itemDescription.textContent = "you currently own " + upgrade.amount + " " +
      upgrade.name + "s";

    const item = document.createElement("button");
    item.textContent = "buy a " + upgrade.name + " for " + upgrade.cost + " " +
      upgrade.costType + "!";
    item.id = upgrade.name;
    upgrade.descriptionElement = itemDescription;
    item.title = upgrade.buttonPrompt;
    document.body.appendChild(itemDescription);
    document.body.appendChild(item);

    item.addEventListener("click", () => {
      upgrade.amount = upgrade.amount + 1;
      if (upgrade.costType == "wood") {
        woodCounter = woodCounter - upgrade.cost;
      } else {
        stoneCounter = stoneCounter - upgrade.cost;
      }
      upgrade.cost = Math.floor(upgrade.cost * upgrade.rate);
      item.textContent = "buy a " + upgrade.name + " for " + upgrade.cost +
        " " + upgrade.costType + "!";
      upgrade.descriptionElement.textContent = "you currently own " +
        upgrade.amount + " " +
        upgrade.name + "s";
    });
    upgrade.button = item;
  }
  requestAnimationFrame(tick);
}

//this runs every animation frame
function tick() {
  delta_time = performance.now() / 1000.0 - delta_update;
  delta_update = performance.now() / 1000.0;

  let woodPerSecs = 0;
  let stonePerSecs = 0;
  for (const upgrade of availableItems) {
    if (upgrade.costType == "wood") {
      upgrade.button.disabled = upgrade.cost > woodCounter;
    } else {
      upgrade.button.disabled = upgrade.cost > stoneCounter;
    }
    if (upgrade.productionType == "wood") {
      woodPerSecs = woodPerSecs + upgrade.amount * upgrade.production;
    } else {
      stonePerSecs = stonePerSecs + upgrade.amount * upgrade.production;
    }
  }
  increment_stone(stonePerSecs);
  increment_wood(woodPerSecs);
  woodPerSec.textContent = String(woodPerSecs);
  stonePerSec.textContent = String(stonePerSecs);
  requestAnimationFrame(tick);
}
