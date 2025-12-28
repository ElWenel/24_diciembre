// Copos de nieve animados
const targetDate = new Date(Date.UTC(2025, 11, 29, 6, 0, 0)); // 24 de diciembre 2025, 01:00 hora peruana (UTC-5)
function crearCoposNieve() {
  const snowContainer = document.querySelector(".snow");
  if (!snowContainer) return;
  // respetar preferencia de reducir movimiento
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  const width = window.innerWidth || document.documentElement.clientWidth;
  let snowflakes = 40;
  if (width <= 420) snowflakes = 12;
  else if (width <= 768) snowflakes = 20;

  for (let i = 0; i < snowflakes; i++) {
    const snowflake = document.createElement("span");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";
    const size =
      Math.random() * (width <= 420 ? 8 : width <= 768 ? 12 : 18) +
      (width <= 420 ? 8 : 12);
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = size + "px";
    const baseDur = width <= 420 ? 5 : width <= 768 ? 4 : 3;
    snowflake.style.animationDuration =
      (Math.random() * 3 + baseDur).toFixed(2) + "s";
    snowflake.style.opacity = (
      Math.random() * 0.4 +
      (width <= 420 ? 0.6 : 0.5)
    ).toFixed(2);
    snowflake.style.animationDelay =
      Math.random() * (width <= 420 ? 3 : 4) + "s";
    snowContainer.appendChild(snowflake);
  }
}

crearCoposNieve();

// Monos cayendo
function crearMonos() {
  const snowContainer = document.querySelector(".snow");
  if (!snowContainer) return;
  // respetar preferencia de reducir movimiento
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  const width = window.innerWidth || document.documentElement.clientWidth;
  let monos = 30;
  if (width <= 420) monos = 20;
  else if (width <= 768) monos = 25;

  for (let i = 0; i < monos; i++) {
    const mono = document.createElement("img");
    mono.className = "mono";
    const num = Math.floor(Math.random() * 20) + 1;
    mono.src = "monos/mono" + num + ".png";
    mono.style.left = Math.random() * 100 + "vw";
    const size =
      Math.random() * (width <= 420 ? 50 : width <= 768 ? 50 : 60) +
      (width <= 420 ? 50 : width <= 768 ? 40 : 45);
    mono.style.width = size + "px";
    const baseDur = width <= 420 ? 6 : width <= 768 ? 6 : 5;
    mono.style.animationDuration =
      (Math.random() * 4 + baseDur).toFixed(2) + "s";
    mono.style.opacity = (Math.random() * 0.3 + 0.7).toFixed(2);
    mono.style.animationDelay = -Math.random() * 10 + "s";
    snowContainer.appendChild(mono);
  }
}

crearMonos();

// Evento para el botón
var isReady = false;
document.getElementById("regaloBtn").addEventListener("click", function () {
  // Animación de presión
  this.style.transform = "scale(0.95)";
  setTimeout(() => {
    this.style.transform = "scale(1)";
  }, 100);

  if (!isReady) {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 10);
    setTimeout(() => {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    }, 2000);
  } else {
    window.open("tu_mi_24.html", "_blank");
  }
});

function updateCountdown() {
  const now = new Date();
  const target = targetDate; // Usar la fecha fija
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    isReady = true;
    const btn = document.getElementById("regaloBtn");
    btn.style.cursor = "pointer";
    btn.style.opacity = "1";
    btn.textContent = "Abrir ya";
    return;
  } else {
    isReady = false;
    const btn = document.getElementById("regaloBtn");
    btn.style.cursor = "not-allowed";
    btn.style.opacity = "0.6";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
