import "./style.css";

let woodCounter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  <button id="wood_increment">Chop Wood!</button>
  <div><p>Wood: <span id="wood_counter">0</span></p></div>
`;

// Add click handler
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

woodButton.addEventListener("click", () => {
  woodCounter = woodCounter + 1;
  woodCounterElement.textContent = String(woodCounter);
});

function increment_wood(amount: number) {
  woodCounter = woodCounter + amount;
  woodCounterElement.textContent = String(woodCounter);
}

setInterval(increment_wood, 1000, 1);

console.log("Mae was here");
console.log("Shawn was here");
