const tg = window.Telegram.WebApp;
tg.expand(); // Abre la Mini App a pantalla completa

// Función para simular la carga de datos (luego la conectaremos a tu bot)
function cargarDatosPrueba() {
    // Estos datos vendrán de tu usuarios.json
    const datos = {
        apodo: "LOBO",
        bank_inicial: 1000,
        bank_actual: 1250,
        ganadas: 12,
        perdidas: 4,
        nivel: "Experto", // Novato, Medio, Superior, Experto
        equipos: ["Spurs", "Astros", "Mets"] // El podio de siluetas
    };

    actualizarTarjeta(datos);
}

function actualizarTarjeta(d) {
    // 1. Datos de texto
    document.getElementById('apodo').innerText = d.apodo;
    document.getElementById('val-bank-ini').innerText = `$${d.bank_inicial}`;
    document.getElementById('val-bank-act').innerText = `$${d.bank_actual}`;
    document.getElementById('val-ganadas').innerText = d.ganadas;
    document.getElementById('val-perdidas').innerText = d.perdidas;
    document.getElementById('nivel-texto').innerText = `NIVEL: ${d.nivel.toUpperCase()}`;

    // 2. Lógica de Barras (Cálculo de porcentajes)
    const total = d.ganadas + d.perdidas;
    const efecGanadas = total > 0 ? (d.ganadas / total) * 100 : 0;
    const efecPerdidas = total > 0 ? (d.perdidas / total) * 100 : 0;
    
    // El bank actual lo comparamos con el inicial para la barra
    const porcBank = (d.bank_actual / d.bank_inicial) * 100;

    // Aplicar anmación a las barras
    setTimeout(() => {
        document.getElementById('bar-bank-act').style.width = `${Math.min(porcBank, 100)}%`;
        document.getElementById('bar-ganadas').style.width = `${efecGanadas}%`;
        document.getElementById('bar-perdidas').style.width = `${efecPerdidas}%`;
    }, 500);

    // 3. Cambio de Clase por Nivel (Marcos y Colores)
    const card = document.getElementById('card');
    card.className = ''; // Limpia clases
    card.classList.add(`nivel-${d.nivel.toLowerCase()}`);

    // 4. Siluetas (Podio)
    // Aquí podrías poner lógica para cargar logos reales si los tienes
    console.log("Podio de equipos listo:", d.equipos);
}

// Inicializar
window.onload = cargarDatosPrueba;
