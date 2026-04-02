const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

// 2. Función para mostrar el nombre
function cargarNombre() {
    const elementoApodo = document.getElementById('apodo');
    
if (user && user.photo_url) {
    document.getElementById('foto-perfil').src = user.photo_url;
} else {
    // Foto por defecto de Lobo si no hay foto en Telegram
    document.getElementById('foto-perfil').src = "https://img.icons8.com/ios-filled/100/ffffff/wolf.png"; 
}
// 1. Obtener datos del usuario desde Telegram
const user = tg.initDataUnsafe?.user;

async function cargarDatosReales() {
    if (!user) {
        console.error("No se detectó usuario de Telegram");
        return;
    }

    try {
        // Esta URL será la de tu bot (la configuraremos después)
        // Por ahora, simulamos que el bot le responde a la Mini App
        const respuesta = await fetch(`https://tu-servidor.com/api/user/${user.id}`);
        const d = await respuesta.json();
        actualizarTarjeta(d);
    } catch (e) {
        console.log("Usando modo local/prueba hasta conectar el backend");
        // Datos de prueba pero con la estructura completa
        actualizarTarjeta({
            apodo: user?.first_name || "LOBO",
            bank_inicial: 1000,
            bank_actual: 1250,
            ganadas: 15,
            perdidas: 5,
            individuales: 12,
            parlays: 8,
            efectividad: 75,
            nivel: "Superior",
            foto: user?.photo_url
        });
    }
}

function actualizarTarjeta(d) {
    document.getElementById('apodo').innerText = d.apodo;
    document.getElementById('val-bank-ini').innerText = `$${d.bank_inicial}`;
    document.getElementById('val-bank-act').innerText = `$${d.bank_actual}`;
    document.getElementById('val-ganadas').innerText = d.ganadas;
    document.getElementById('val-perdidas').innerText = d.perdidas;
    document.getElementById('val-indiv').innerText = d.individuales;
    document.getElementById('val-parlays').innerText = d.parlays;
    document.getElementById('val-efectividad').innerText = `${d.efectividad}%`;
    document.getElementById('nivel-texto').innerText = `NIVEL: ${d.nivel.toUpperCase()}`;

    if(d.foto) document.getElementById('foto-perfil').src = d.foto;

    // Animación de barras
    setTimeout(() => {
        const totalApuestas = d.ganadas + d.perdidas;
        const totalTipos = d.individuales + d.parlays;

        document.getElementById('bar-efectividad').style.width = `${d.efectividad}%`;
        document.getElementById('bar-ganadas').style.width = `${(d.ganadas/totalApuestas)*100}%`;
        document.getElementById('bar-perdidas').style.width = `${(d.perdidas/totalApuestas)*100}%`;
        document.getElementById('bar-indiv').style.width = `${(d.individuales/totalTipos)*100}%`;
        document.getElementById('bar-parlays').style.width = `${(d.parlays/totalTipos)*100}%`;
    }, 500);

    const card = document.getElementById('card');
    card.className = `nivel-${d.nivel.toLowerCase()}`;
}

window.onload = cargarDatosReales;
