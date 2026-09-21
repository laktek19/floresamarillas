const dot = document.getElementById("yellowDot");
const bouquet = document.getElementById("bouquet");
const dedication = document.getElementById("dedication");
const hint = document.getElementById("hint");
const yellowDot = document.getElementById("yellowDot");
const introLine = document.getElementById("introLine");
const heartWrap = document.getElementById("heartWrap");
const yellowDotSpan = document.getElementById("yellowDotSpan");
const heart = document.querySelector(".heart");

yellowDot.addEventListener("click", () => {
  introLine.style.display = "none";
  heartWrap.style.display = "none";
  heart.style.display = "none";
  yellowDot.style.display = "none";
  yellowDotSpan.style.display = "none";
  hint.style.display = "none";
});

// Coordenadas organizadas para formar la silueta de un ramo compacto y limpio
const flowers = [
  { x: 50, y: 19, scale: 0.95, rotate: 0 },
  { x: 35, y: 29, scale: 0.88, rotate: -12 },
  { x: 65, y: 29, scale: 0.88, rotate: 12 },
  { x: 22, y: 42, scale: 0.82, rotate: -20 },
  { x: 50, y: 39, scale: 0.95, rotate: 2 },
  { x: 78, y: 42, scale: 0.82, rotate: 20 },
  { x: 36, y: 48, scale: 0.90, rotate: -8 },
  { x: 64, y: 48, scale: 0.90, rotate: 8 },
  { x: 50, y: 55, scale: 0.98, rotate: -2 },
  { x: 27, y: 58, scale: 0.82, rotate: -15 },
  { x: 73, y: 58, scale: 0.82, rotate: 15 }
];

function createStem(f, index) {
  const stem = document.createElement("div");
  stem.className = "stem";
  
  // Punto de origen exacto en la flor
  stem.style.left = `${f.x}%`;
  stem.style.top = `${f.y}%`;

  // Coordenada de destino común: el centro del lazo (50% en X, 78% en Y)
  const targetX = 50;
  const targetY = 78;
  
  const deltaX = targetX - f.x;
  const deltaY = targetY - f.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

  // Asignamos la altura dinámica para que el tallo llegue exactamente al lazo
  stem.style.height = `${distance}%`;
  stem.style.transform = `rotate(${angle}deg)`;
  stem.style.transformOrigin = "top center";
  stem.style.animationDelay = `${index * 40}ms`;
  
  bouquet.appendChild(stem);
}

function createFlower(f, index) {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.style.left = `${f.x}%`;
  flower.style.top = `${f.y}%`;
  flower.style.transform = `translate(-50%, -50%) scale(${f.scale}) rotate(${f.rotate}deg)`;

  const petals = 12;
  for (let i = 0; i < petals; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const angle = (360 / petals) * i;
    petal.style.setProperty("--angle", `${angle}deg`);
    petal.style.animationDelay = `${index * 80 + 500 + i * 40}ms`;
    flower.appendChild(petal);
  }

  const center = document.createElement("div");
  center.className = "center";
  center.style.animationDelay = `${index * 80 + 500 + petals * 40 + 50}ms`;
  flower.appendChild(center);

  bouquet.appendChild(flower);
}

function buildBouquet() {
  // 1. Primero creamos los tallos al fondo
  flowers.forEach((flower, index) => createStem(flower, index));

  // 2. Hojas traseras que salen del manojo hacia los lados (detrás del lazo)
  const leafData = [
    { left: "42%", bottom: "25%", rotate: "-25deg" , display: "none"},
    { left: "58%", bottom: "25%", rotate: "25deg" , display: "none"},
    { left: "46%", bottom: "22%", rotate: "-10deg" , display: "none"},
    { left: "54%", bottom: "22%", rotate: "10deg" , display: "none"}
  ];

  leafData.forEach(data => {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.style.left = data.left;
    leaf.style.bottom = data.bottom;
    leaf.style.setProperty("--leaf-rotate", data.rotate);
    bouquet.appendChild(leaf);
  });

  // 3. Finalmente colocamos las flores encima de los tallos
  flowers.forEach((flower, index) => createFlower(flower, index));
}

let opened = false;

dot.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  hint.style.opacity = "0";
  dot.disabled = true;
  document.querySelector(".heart-wrap").style.opacity = "0";
  document.querySelector(".intro-line").style.opacity = "0";

  buildBouquet();
  bouquet.classList.add("active");

  setTimeout(() => {
    bouquet.classList.add("shifted");
  }, 3200);

  setTimeout(() => {
    dedication.classList.add("visible");
    dedication.setAttribute("aria-hidden", "false");
  }, 3800);
});