//alert("1 EL SCRIPT ESTA VIVO EN GITHUB");
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
    //alert("2 CONTENIDO DEL LINK: " + window.location.search); 

    // A. Mostrar Apodo y Banks
    document.getElementById('apodo').innerText = apodo;
    document.getElementById('val-bank-ini').innerText = `$${bankIni}`;
    document.getElementById('val-bank-act').innerText = `$${bankAct}`;
    document.getElementById('val-indiv').innerText = indiv;
    document.getElementById('val-parlays').innerText = parlays;

    // AQUÍ ESTABA EL ERROR (Ya le puse las comillas ` ` )
    if (totalTipos > 0) {
        document.getElementById('bar-indiv').style.width = `${(indiv/totalTipos)*100}%`;
        document.getElementById('bar-parlays').style.width = `${(parlays/totalTipos)*100}%`;
    }
    
    // B. Foto de Perfil
    // 1. Extraer el user_id de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// 2. Referencia al elemento de la foto en el HTML
const fotoPerfil = document.getElementById('foto-perfil');

if (userId) {
    // Intentamos cargar la foto que guardó el bot en la misma carpeta
    fotoPerfil.src = `perfil_${userId}.jpg`;
    
    // Si la foto no existe o no carga, ponemos el logo del lobo por defecto
    fotoPerfil.onerror = function() {
        this.src = "https://img.icons8.com/ios-filled/100/ffffff/wolf.png";
    };
}

    // C. Lógica de Efectividad
    const total = ganadas + perdidas;
    const efectividad = total > 0 ? Math.round((ganadas / total) * 100) : 0;
    
    document.getElementById('val-efectividad').innerText = `${efectividad}%`;
    document.getElementById('val-ganadas').innerText = ganadas;
    document.getElementById('val-perdidas').innerText = perdidas;

    // D. Determinar Rango
    let nivelClase = "nivel-novato";
    let nivelTexto = "NIVEL: NOVATO 🐾";

    if (total >= 5) {
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

    const card = document.getElementById('card');
    if (card) card.className = nivelClase; 
    document.getElementById('nivel-texto').innerText = nivelTexto;

    // E. Animación de Barras
    setTimeout(() => {
        document.getElementById('bar-efectividad').style.width = `${efectividad}%`;
        if (total > 0) {
            document.getElementById('bar-ganadas').style.width = `${(ganadas/total)*100}%`;
            document.getElementById('bar-perdidas').style.width = `${(perdidas/total)*100}%`;
        }
        const progresoBank = bankIni > 0 ? (bankAct / bankIni) * 100 : 0;
        document.getElementById('bar-bank-act').style.width = `${Math.min(progresoBank, 100)}%`;
    }, 500);
}

window.onload = cargarTarjeta;
