// got fishing idea from: https://fractalizes.github.io/cmpm-121-f25-d1/
//got emmisions idea from: https://trueappleoperation.github.io/D1-Incremental-Game-Development-Lizbeth-De-Leon/ 

import "./style.css";


// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  
  <button id="wood_increment">Chop Wood!🌳</button>
  <button id="stone_increment">Mine Stone!⛰️</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
  <div><p>Stone: <span id="stone_counter">0</span></p></div>
  <div><p>Emissions: <span id="emission_counter">0</span></p></div>
  <div><p>Fish left in the world: <span id="fish_counter">3500000000000</span> out of 3500000000000</p></div>
  <div><p>Your buildings are giving you <span id="wood_persec">0</span> wood per second, <span id="stone_persec">0</span> stone per second and catching <span id="fish_persec">0</span> fish per second </p></div>
  <div id="every-fish"></div>
`;
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
    costType: "wood",
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
  {
    name: "fishing rod",
    cost: 10,
    costType: "emissions",
    rate: 1.5,
    amount: 0,
    button: tempButton,
    productionType: "fish",
    production: 10,
    description: "",
    buttonPrompt: "humble fishing rod giving you 10 fish per second",
    descriptionElement: tempPElem,
  },
  {
    name: "fishing boat",
    cost: 100,
    costType: "emissions",
    rate: 1.5,
    amount: 0,
    button: tempButton,
    productionType: "fish",
    production: 100,
    description: "",
    buttonPrompt:
      "boats of fisherman fishing away giving you 100 fish per second",
    descriptionElement: tempPElem,
  },
  {
    name: "auto fisher 9000",
    cost: 1000,
    costType: "emissions",
    rate: 1.5,
    amount: 0,
    button: tempButton,
    productionType: "fish",
    production: 1000,
    description: "",
    buttonPrompt:
      "the newest in fishing technology guaranteed to kill every fish eventually giving you 1000 fish per second",
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

const fishCounterElement = document.getElementById("fish_counter")!;
const fishPerSec = document.getElementById("fish_persec")!;

const emissionsCounterElement = document.getElementById("emission_counter")!;

const everyFish = document.getElementById("every-fish")!;

//time passed from last frame
let delta_update: number = performance.now() / 1000.0;
let delta_time: number = 0;

//acording to https://www.worldatlas.com/articles/how-many-fish-are-there-in-the-ocean.html
const maxFish: number = 3500000000000;

//resources available
let woodCounter: number = 0;
let stoneCounter: number = 0;
let emissionsCounter: number = 0;
let fishCounter: number = maxFish;

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

let win: boolean = false;
function increment_fish(amount: number) {
  fishCounter = fishCounter + amount * delta_time;
  if (fishCounter < 0 && !win) {
    fishCounter = 0;
    win = true;
    //<iframe width="560" height="235" src="https://www.youtube.com/embed/aWBpBjdp8Hg?si=Efnj3rZiszl_k2ws&amp;start=107" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    const video = document.createElement("iframe");
    video.setAttribute("width", "560");
    video.setAttribute("height", "235");
    video.setAttribute(
      "src",
      "https://www.youtube.com/embed/aWBpBjdp8Hg?start=107&si=Efnj3rZiszl_k2ws",
    );
    video.setAttribute("frameborder", "0");
    video.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    );
    video.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    video.setAttribute("allowfullscreen", "");
    everyFish.appendChild(video);
  } else if (fishCounter < 0) {
    fishCounter = 0;
  }
  fishCounterElement.textContent = String(Math.floor(fishCounter));
}

function increment_emmisions(amount: number) {
  emissionsCounter = emissionsCounter + amount * delta_time;
  emissionsCounterElement.textContent = String(Math.floor(emissionsCounter));
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
    if (upgrade.costType == "emissions") {
      item.textContent = "buy a " + upgrade.name + " at " + upgrade.cost +
        " " + upgrade.costType + "!";
    }
    item.id = upgrade.name;
    upgrade.descriptionElement = itemDescription;
    item.title = upgrade.buttonPrompt;
    document.body.appendChild(itemDescription);
    document.body.appendChild(item);

    item.addEventListener("click", () => {
      upgrade.amount = upgrade.amount + 1;
      if (upgrade.costType == "wood") {
        woodCounter = woodCounter - upgrade.cost;
      } else if (upgrade.costType == "stone") {
        stoneCounter = stoneCounter - upgrade.cost;
      }
      upgrade.cost = Math.floor(upgrade.cost * upgrade.rate);
      item.textContent = "buy a " + upgrade.name + " for " + upgrade.cost +
        " " + upgrade.costType + "!";

      if (upgrade.costType == "emissions") {
        item.textContent = "buy a " + upgrade.name + " at " + upgrade.cost +
          " " + upgrade.costType + "!";
      }

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

  let toatalBuildings = 0;
  let woodPerSecs = 0;
  let stonePerSecs = 0;
  let fishPerSecs = 0;
  for (const upgrade of availableItems) {
    if (upgrade.costType == "wood") {
      upgrade.button.disabled = upgrade.cost > woodCounter;
    } else if (upgrade.costType == "stone") {
      upgrade.button.disabled = upgrade.cost > stoneCounter;
    } else {
      upgrade.button.disabled = upgrade.cost > emissionsCounter;
    }
    if (upgrade.productionType == "wood") {
      woodPerSecs = woodPerSecs + upgrade.amount * upgrade.production;
    } else if (upgrade.productionType == "stone") {
      stonePerSecs = stonePerSecs + upgrade.amount * upgrade.production;
    } else {
      fishPerSecs = fishPerSecs + upgrade.amount * upgrade.production;
    }
    toatalBuildings = toatalBuildings + upgrade.amount;
  }
  increment_stone(stonePerSecs);
  increment_wood(woodPerSecs);
  increment_emmisions(toatalBuildings);
  increment_fish(-fishPerSecs);
  woodPerSec.textContent = String(woodPerSecs);
  stonePerSec.textContent = String(stonePerSecs);
  fishPerSec.textContent = String(fishPerSecs);
  requestAnimationFrame(tick);
}
