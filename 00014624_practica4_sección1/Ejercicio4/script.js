const actividades = {
  lunes: 'Atender un cliente específico.',
  martes: 'Visitar una agencia fuera de la ciudad.',
  miercoles: 'Llevar a mi hija al ballet.',
  jueves: 'Priorizar entregas de desarrollo.',
  viernes: 'Atender problemas de manera remota.',
  sabado: 'Hacer lo que mi esposa quiera.',
  domingo: null
};

function normalizarDia(dia) {
  if (!dia) return '';
  return dia.toString().toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i')
    .replace(/ó/g,'o').replace(/ú/g,'u')
    .replace(/ñ/g,'n');
}

function recordarActividad(diaStr) {
  const out = document.getElementById('output');
  if (!diaStr || typeof diaStr !== 'string') {
    out.innerHTML = '<span class="error">Por favor ingresa un día de la semana válido.</span>';
    return false;
  }

  const original = diaStr.trim();
  const key = normalizarDia(original);
  const known = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
  if (!known.includes(key)) {
    out.innerHTML = '<span class="error">Día no reconocido. Usa: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.</span>';
    return false;
  }

  const actividad = actividades[key] ?? null;
  const hasActividad = Boolean(actividad);

  let html = `<strong>Día:</strong> ${original} <span class="badge">${hasActividad ? 'Actividad programada' : 'Sin actividad'}</span><br/>`;
  if (hasActividad) {
    html += `<strong>Actividad:</strong> ${actividad}`;
  } else {
    html += `<strong>Actividad:</strong> No hay actividad programada.`;
  }

  out.innerHTML = html;
  return { dia: original, actividad: actividad || '' };
}

document.getElementById('checkBtn').addEventListener('click', () => {
  const dia = document.getElementById('diaInput').value;
  recordarActividad(dia);
});

document.getElementById('diaInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('checkBtn').click();
  }
});
