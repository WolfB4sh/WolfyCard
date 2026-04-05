const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

// 1. CAPTURAR DATOS DEL LINK (Vienen del bot.py)
const urlParams = new URLSearchParams(window.location.search);
const apodo = urlParams.get('apodo') || "USUARIOjs";
const bankIni = parseFloat(urlParams.get('bank_ini')) || 0;
const bankAct = parseFloat(urlParams.get('bank_act')) || 0;
const ganadas = parseInt(urlParams.get('g')) || 0;
const perdidas = parseInt(urlParams.get('p')) || 0;
const indiv = parseInt(urlParams.get('ind')) || 0;
const parlays = parseInt(urlParams.get('par')) || 0;
const totalTipos = indiv + parlays;

function cargarTarjeta() {
    alert("CONTENIDO DEL LINK: " + window.location.search); 

    const urlParams = new URLSearchParams(window.location.search);
    // A. Mostrar Apodo y Banks
    document.getElementById('apodo').innerText = apodo;
    document.getElementById('val-bank-ini').innerText = `$${bankIni}`;
    document.getElementById('val-bank-act').innerText = `$${bankAct}`;
    document.getElementById('val-indiv').innerText = indiv;
    document.getElementById('val-parlays').innerText = parlays;

    if (totalTipos > 0) {
        document.getElementById('bar-indiv').style.width = ${(indiv/totalTipos)*100}%;
        document.getElementById('bar-parlays').style.width = ${(parlays/totalTipos)*100}%;
}
    // B. Foto de Perfil Real de Telegram
    // tg.initDataUnsafe.user.photo_url es la clave
    if (user && user.photo_url) {
        document.getElementById('foto-perfil').src = user.photo_url;
    } else {
        document.getElementById('foto-perfil').src = "https://img.icons8.com/ios-filled/100/ffffff/wolf.png";
    }

    // C. Lógica de Efectividad y Niveles
    const total = ganadas + perdidas;
    const efectividad = total > 0 ? Math.round((ganadas / total) * 100) : 0;
    
    document.getElementById('val-efectividad').innerText = `${efectividad}%`;
    document.getElementById('val-ganadas').innerText = ganadas;
    document.getElementById('val-perdidas').innerText = perdidas;

    // D. Determinar Rango (Novato, Intermedio, Experto, Leyenda)
    let nivelClase = "nivel-novato";
    let nivelTexto = "NIVEL: NOVATO 🐾";

    if (total >= 5) { // Solo sube de nivel si tiene al menos 5 apuestas
        if (efectividad >= 85) {
            nivelClase = "nivel-leyenda";
            nivelTexto = "NIVEL: LEYENDA 👑";
        } else if (efectividad >= 70) {
            nivelClase = "nivel-experto";
            nivelTexto = "NIVEL: EXPERTO 🔥";
        } else if (efectividad >= 50) {
            nivelClase = "nivel-medio";
            nivelTexto = "NIVEL: INTERMEDIO 🐺";
        }
    }

    // Aplicar nivel visualmente
    const card = document.getElementById('card');
    card.className = nivelClase; 
    document.getElementById('nivel-texto').innerText = nivelTexto;

    // E. Animación de Barras
    setTimeout(() => {
        document.getElementById('bar-efectividad').style.width = `${efectividad}%`;
        if (total > 0) {
            document.getElementById('bar-ganadas').style.width = `${(ganadas/total)*100}%`;
            document.getElementById('bar-perdidas').style.width = `${(perdidas/total)*100}%`;
        }
        // Barra de bank actual comparada con el inicial
        const progresoBank = bankIni > 0 ? (bankAct / bankIni) * 100 : 0;
        document.getElementById('bar-bank-act').style.width = `${Math.min(progresoBank, 100)}%`;
    }, 500);
}

window.onload = cargarTarjeta;
