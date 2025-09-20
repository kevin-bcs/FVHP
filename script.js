const heartBtn = document.getElementById("heartButton");
const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("song");
const rainLayer = document.getElementById("rainLayer");

let isPlaying = false;

// SOLO “Te quiero” en 100 idiomas
const mensajes = [
  "Te quiero", "I love you", "Je t’aime", "Ti amo", "Ich liebe dich", "Eu te amo",
  "愛してる", "사랑해", "Я люблю тебя", "أحبك", "我爱你", "Jeg elsker dig",
  "Ik hou van jou", "Jag älskar dig", "Σ’ αγαπώ", "Aku cinta kamu", "Mahal kita",
  "Ngiyakuthanda", "Kocham cię", "Te iubesc", "T’estimo", "Seni seviyorum",
  "Nakupenda", "אני אוהב אותך", "Mon amour", "Minha vida", "Lubim ťa",
  "Obicham te", "Ljubit te", "Eg elska teg", "Jeg elsker deg",
  "Amo-te", "Volim te", "Szeretlek", "Tôi yêu bạn", "Chan rak khun", "Wo ai ni",
  "Ngo oi ney", "Kuv hlub koj", "Ndagukunda", "Ndiyakuthanda", "Anata o aishiteimasu",
  "Wa ai nei", "Ti amo tanto", "Te sakam",
  "Ya tebya obozhayu", "Kimi o ai shiteru", "S’agapo", "Ich mag dich sehr",
  "Mi amas vin", "T’estimo molt", "Eg elska teg", "Jag älskar dig",
  "Saya cinta padamu", "Ana behibek", "Mo nifẹ rẹ", "Ek het jou lief",
  "Ya tebya lyublyu", "Mi corazon", "Lubim ta", "Σ’ αγαπώ", "T’estimo"
];

// Función para reproducir música
function playMusic() {
  if (!isPlaying) {
    song.currentTime = 30; // empieza desde 30s
    song.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = "🔊";
    }).catch(() => {
      console.log("Reproducción bloqueada hasta interacción.");
    });
  }
}

// 🎶 Iniciar música al hacer clic en cualquier parte de la página
document.body.addEventListener("click", function initMusic() {
  playMusic();
  // 🔥 Quitar el listener después de la primera interacción
  document.body.removeEventListener("click", initMusic);
});

// Botón pequeño → pausar/reanudar
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    song.pause();
    isPlaying = false;
    musicBtn.textContent = "🔇";
  } else {
    song.play();
    isPlaying = true;
    musicBtn.textContent = "🔊";
  }
});

// Explosión desde el corazón
function explosion(cx, cy) {
  for (let i = 0; i < 15; i++) { // más frases por explosión
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    chip.style.left = cx + "px";
    chip.style.top = cy + "px";

    const ang = Math.random() * 2 * Math.PI;
    const dist = 100 + Math.random() * 180;
    const tx = Math.cos(ang) * dist;
    const ty = Math.sin(ang) * dist;

    chip.style.transform = `translate(${tx}px, ${ty}px)`;
    document.body.appendChild(chip);
    setTimeout(() => chip.remove(), 2500);
  }
}

// Clic en el corazón → solo explosión + animación
heartBtn.addEventListener("click", () => {
  const rect = heartBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  explosion(cx, cy);

  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 600);
});

// Explosiones automáticas cada 2s
setInterval(() => {
  const rect = heartBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  explosion(cx, cy);
}, 2000);

// Lluvia más abundante
function lluvia() {
  const chip = document.createElement("div");
  chip.className = "chip rain";
  chip.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
  chip.style.left = Math.random() * 100 + "vw";
  chip.style.top = "-5vh";
  chip.style.animationDuration = (4 + Math.random() * 3) + "s, 3s";
  rainLayer.appendChild(chip);
  setTimeout(() => chip.remove(), 8000);
}
setInterval(lluvia, 600); // más frases por segundo
