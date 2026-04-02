const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

// 1. CAPTURAR DATOS QUE VIENEN DEL BOT (Link)
const urlParams = new URLSearchParams(window.location.search);
const apodoDelBot = urlParams.get('apodo');
const bankDelBot = urlParams.get('bank');

// 2. FUNCIÓN PRINCIPAL (Tu lógica original + Datos dinámicos)
function cargarTarjeta() {
    // A. Ponemos el Apodo del JSON o el de Telegram si no hay
    const elementoApodo = document.getElementById('apodo');
    if (apodoDelBot) {
        elementoApodo.innerText = apodoDelBot;
    } else {
        elementoApodo.innerText = user?.first_name || "LOBO";
    }

    // B. Ponemos el Bank Inicial del JSON
    if (bankDelBot) {
        document.getElementById('val-bank-ini').innerText = `$${bankDelBot}`;
    }

    // C. Foto de Perfil (Telegram o Default)
    if (user && user.photo_url) {
        document.getElementById('foto-perfil').src = user.photo_url;
    } else {
        document.getElementById('foto-perfil').src = "https://img.icons8.com/ios-filled/100/ffffff/wolf.png";
    }

    // D. LÓGICA DE NIVELES Y BARRAS (Tu código original que no debí borrar)
    // Aquí usamos datos de ejemplo que luego podrás conectar igual que el Apodo
    const datosStats = {
        ganadas: 15,
        perdidas: 5,
        individuales: 12,
        parlays: 8,
        efectividad: 75,
        nivel: "experto" // Esto define el marco dorado
    };

    // Aplicar el nivel al cuerpo de la tarjeta
    const card = document.getElementById('card');
    card.className = `nivel-${datosStats.nivel}`; 

    // Animación de las barras
    setTimeout(() => {
        const totalApuestas = datosStats.ganadas + datosStats.perdidas;
        const totalTipos = datosStats.individuales + datosStats.parlays;

        document.getElementById('bar-efectividad').style.width = `${datosStats.efectividad}%`;
        document.getElementById('bar-ganadas').style.width = `${(datosStats.ganadas/totalApuestas)*100}%`;
        document.getElementById('bar-perdidas').style.width = `${(datosStats.perdidas/totalApuestas)*100}%`;
        document.getElementById('bar-indiv').style.width = `${(datosStats.individuales/totalTipos)*100}%`;
        document.getElementById('bar-parlays').style.width = `${(datosStats.parlays/totalTipos)*100}%`;
    }, 500);
}

// 3. EJECUTAR AL CARGAR
window.onload = cargarTarjeta;
