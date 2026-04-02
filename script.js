const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

// 1. CAPTURAR DATOS DEL LINK (Vienen del Bot.py)
const urlParams = new URLSearchParams(window.location.search);
const apodoReal = urlParams.get('apodo');
const bankReal = urlParams.get('bank');

function cargarTarjeta() {
    // A. PONER EL APODO Y BANK DEL JSON
    if (apodoReal) {
        document.getElementById('apodo').innerText = apodoReal;
    }
    if (bankReal) {
        document.getElementById('val-bank-ini').innerText = `$${bankReal}`;
    }

    // B. JALAR LA FOTO REAL DE TELEGRAM
    const fotoPerfil = document.getElementById('foto-perfil');
    if (user && user.photo_url) {
        fotoPerfil.src = user.photo_url;
    } else {
        // Logo de lobo blanco por defecto si no tiene foto
        fotoPerfil.src = "https://img.icons8.com/ios-filled/100/ffffff/wolf.png";
    }

    // C. ACTIVAR ANIMACIÓN DE BARRAS (Con datos de ejemplo por ahora)
    // Cuando quieras que estas barras también vengan del bot, se hace igual que el apodo
    setTimeout(() => {
        document.getElementById('bar-bank-ini').style.width = "100%";
        document.getElementById('bar-efectividad').style.width = "75%"; // Ejemplo
    }, 500);

    // D. ASEGURAR NIVEL EXPERTO (Tu aura dorada)
    const card = document.getElementById('card');
    card.className = "nivel-experto"; 
}

// Ejecutar todo al abrir
window.onload = cargarTarjeta;
