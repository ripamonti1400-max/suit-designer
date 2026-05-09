const suit = document.getElementById("suit");
const leftArm = document.getElementById("leftArm");
const rightArm = document.getElementById("rightArm");
const buttonsContainer = document.getElementById("buttons");

const colorButtons = document.querySelectorAll(".color");
const collarSelect = document.getElementById("collarSelect");
const buttonSelect = document.getElementById("buttonSelect");
const fitSelect = document.getElementById("fitSelect");
const sleeveSelect = document.getElementById("sleeveSelect");

function createButtons(count) {
  buttonsContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add("button-dot");
    buttonsContainer.appendChild(dot);
  }
}

createButtons(2);

colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;

    suit.style.background = color;
    leftArm.style.background = color;
    rightArm.style.background = color;
  });
});

collarSelect.addEventListener("change", () => {
  const left = document.getElementById("leftLapel");
  const right = document.getElementById("rightLapel");

  if (collarSelect.value === "peak") {
    left.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
    right.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
  }

  else if (collarSelect.value === "shawl") {
    left.style.borderRadius = "50px";
    right.style.borderRadius = "50px";
  }

  else {
    left.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
    right.style.clipPath = "polygon(100% 0, 100% 100%, 0 0)";
    left.style.borderRadius = "0";
    right.style.borderRadius = "0";
  }
});

buttonSelect.addEventListener("change", () => {
  createButtons(buttonSelect.value);
});

fitSelect.addEventListener("change", () => {

  if (fitSelect.value === "slim") {
    suit.style.width = "150px";
  }

  else if (fitSelect.value === "oversized") {
    suit.style.width = "190px";
  }

  else {
    suit.style.width = "170px";
  }
});

sleeveSelect.addEventListener("change", () => {

  if (sleeveSelect.value === "short") {
    leftArm.style.height = "150px";
    rightArm.style.height = "150px";
  }

  else if (sleeveSelect.value === "long") {
    leftArm.style.height = "260px";
    rightArm.style.height = "260px";
  }

  else {
    leftArm.style.height = "220px";
    rightArm.style.height = "220px";
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {

  const design = {
    color: suit.style.background,
    collar: collarSelect.value,
    buttons: buttonSelect.value,
    fit: fitSelect.value,
    sleeves: sleeveSelect.value
  };

  localStorage.setItem("suitDesign", JSON.stringify(design));

  alert("Suit Design Saved!");
});

window.onload = () => {

  const saved = JSON.parse(localStorage.getItem("suitDesign"));

  if (saved) {

    suit.style.background = saved.color;
    leftArm.style.background = saved.color;
    rightArm.style.background = saved.color;

    collarSelect.value = saved.collar;
    buttonSelect.value = saved.buttons;
    fitSelect.value = saved.fit;
    sleeveSelect.value = saved.sleeves;

    createButtons(saved.buttons);
  }
};