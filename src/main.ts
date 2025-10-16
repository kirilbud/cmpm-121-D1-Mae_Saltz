import "./style.css";

let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Destruction of the earth!</h1>
  <p>Wood: <span id="wood_counter">0</span></p>
  <button id="wood_increment">Chop Wood!</button>
`;

// Add click handler
const woodButton = document.getElementById("wood_increment")!;
const woodCounterElement = document.getElementById("wood_counter")!;

woodButton.addEventListener("click", () => {
  counter = counter + 1;
  woodCounterElement.textContent = String(counter);
});

console.log("Mae was here");
console.log("Shawn was here");
