/**
 * app.js - Control de interfaz, eventos, Prism, PWA, Drag&Drop, conversiones y fullscreen
 */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const inputArea = document.getElementById('input');
    const inputPanel = document.getElementById('inputPanel');
    const outputPanel = document.getElementById('outputPanel');
    const preContainer = document.getElementById('preContainer');
    const outputCode = document.getElementById('outputCode');
    const outputPlaceholder = document.getElementById('outputPlaceholder');
    
    // Historial
    const historyToggleBtn = document.getElementById('historyToggleBtn');
    const historyCount = document.getElementById('historyCount');
    const historyDrawer = document.getElementById('historyDrawer');
    const closeHistoryBtn = document.getElementById('closeHistoryBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyList = document.getElementById('historyList');

    // Selectores y Controles
    const languageSelect = document.getElementById('languageSelect');
    const indentSelect = document.getElementById('indentSelect');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validBtn = document.getElementById('validBtn');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const status = document.getElementById('status');

    // Botones de pantalla completa
    const expandInputBtn = document.getElementById('expandInputBtn');
    const expandOutputBtn = document.getElementById('expandOutputBtn');

    // Modales
    const convertModal = document.getElementById('convertModal');
    const convertCloseBtn = document.getElementById('convertCloseBtn');
    const convertJsonToXmlBtn = document.getElementById('convertJsonToXmlBtn');
    const convertXmlToJsonBtn = document.getElementById('convertXmlToJsonBtn');
    const downloadModal = document.getElementById('downloadModal');
    const downloadFilenameInput = document.getElementById('downloadFilenameInput');
    const downloadExtensionBadge = document.getElementById('downloadExtensionBadge');
    const downloadCancelBtn = document.getElementById('downloadCancelBtn');
    const downloadConfirmBtn = document.getElementById('downloadConfirmBtn');

    // Modo Diff y Búsqueda
    const botonModoDiff = document.getElementById('botonModoDiff');
    const diffContainer = document.getElementById('diffContainer');
    const botonAbrirBusqueda = document.getElementById('botonAbrirBusqueda');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const campoBusqueda = document.getElementById('campoBusqueda');
    const contadorCoincidencias = document.getElementById('contadorCoincidencias');
    const botonCoincidenciaAnterior = document.getElementById('botonCoincidenciaAnterior');
    const botonCoincidenciaSiguiente = document.getElementById('botonCoincidenciaSiguiente');
    const botonCerrarBusqueda = document.getElementById('botonCerrarBusqueda');

    let currentOutput = '';

    function initPreferences() {
        // Tema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

        // Indentación
        const savedIndent = localStorage.getItem('indent');
        if (savedIndent && indentSelect) {
            indentSelect.value = savedIndent;
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ Claro';
            themeToggleBtn.setAttribute('title', 'Cambiar a modo claro');
        } else {
            themeToggleBtn.innerHTML = '🌙 Oscuro';
            themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    if (indentSelect) {
        indentSelect.addEventListener('change', () => {
            localStorage.setItem('indent', indentSelect.value);
            if (inputArea.value.trim()) {
                formatCode();
            }
        });
    }

    function getPrismLanguage(lang) {
        const map = {
            'xml': 'markup',
            'html': 'markup',
            'json': 'json',
            'javascript': 'javascript',
            'java': 'java',
            'sql': 'sql'
        };
        return map[lang] || 'markup';
    }

    function updateOutput(code, isError = false) {
        currentOutput = code;
        
        if (!code) {
            outputPlaceholder.style.display = 'block';
            preContainer.style.display = 'none';
            outputCode.textContent = '';
            return;
        }

        outputPlaceholder.style.display = 'none';
        preContainer.style.display = 'block';
        outputCode.textContent = code;

        const lang = languageSelect.value;
        const prismLang = getPrismLanguage(lang);

        outputCode.className = `language-${prismLang}`;
        preContainer.className = `language-${prismLang} line-numbers`;

        const LIMITE_CARACTERES_RESALTADO = 120000;
        if (code.length > LIMITE_CARACTERES_RESALTADO) {
            preContainer.className = `language-${prismLang}`;
            envolverLineasEnFilas(outputCode);
            return;
        }

        if (window.Prism && !isError) {
            Prism.highlightElement(outputCode);
        }

        envolverLineasEnFilas(outputCode);
    }

    // Envuelve cada línea de código en un contenedor individual para permitir resaltado completo y selección
    function envolverLineasEnFilas(elementoCodigo) {
        const lineas = elementoCodigo.innerHTML.split('\n');
        elementoCodigo.innerHTML = lineas.map((lineaHtml, indice) => {
            const contenido = lineaHtml === '' ? '&nbsp;' : lineaHtml;
            return `<span class="fila-codigo" data-linea="${indice + 1}">${contenido}</span>`;
        }).join('\n');
    }

    // Quita la selección de cualquier fila o número de línea resaltado
    function deseleccionarFilas() {
        const filaActiva = outputCode.querySelector('.fila-codigo.fila-seleccionada');
        if (filaActiva) {
            filaActiva.classList.remove('fila-seleccionada');
        }
        const numeroActivo = preContainer.querySelector('.line-numbers-rows > span.numero-linea-seleccionado');
        if (numeroActivo) {
            numeroActivo.classList.remove('numero-linea-seleccionado');
        }
    }

    // Resalta el número de línea correspondiente en la barra lateral
    function resaltarNumeroLinea(numeroLinea) {
        const contenedorNumeros = preContainer.querySelector('.line-numbers-rows');
        if (!contenedorNumeros) return;
        const spansNumeros = contenedorNumeros.children;
        const indice = Number(numeroLinea) - 1;
        if (spansNumeros[indice]) {
            spansNumeros[indice].classList.add('numero-linea-seleccionado');
        }
    }

    function setStatus(message, type = '') {
        status.textContent = message;
        status.className = 'status ' + type;
    }

    function formatCode() {
        const input = inputArea.value.trim();
        
        if (!input) {
            setStatus('Error: No hay código para formatear', 'error');
            return;
        }

        const language = languageSelect.value;
        const indentType = indentSelect ? indentSelect.value : '4';

        try {
            const formatted = Formatters.format(input, language, indentType);
            updateOutput(formatted);
            setStatus('✓ Código formateado correctamente', 'success');
            guardarEnHistorial(input, language);
        } catch (error) {
            setStatus('✗ Error al formatear: ' + error.message, 'error');
            updateOutput('Error al formatear: ' + error.message, true);
        }
    }

    function minifyCode() {
        const input = inputArea.value.trim();
        
        if (!input) {
            setStatus('Error: No hay código para minificar', 'error');
            return;
        }

        const language = languageSelect.value;

        try {
            const minified = Formatters.minify(input, language);
            updateOutput(minified);
            setStatus('✓ Código minificado correctamente', 'success');
        } catch (error) {
            setStatus('✗ Error al minificar: ' + error.message, 'error');
            updateOutput('', true);
        }
    }

    function validateCode() {
        const input = inputArea.value.trim();
        
        if (!input) {
            setStatus('Error: No hay código para validar', 'error');
            return;
        }

        const language = languageSelect.value;

        try {
            Formatters.validate(input, language);
            setStatus('✓ El código es válido', 'success');
            updateOutput('✓ El código es válido y no presenta errores de sintaxis conocidos.');
        } catch (error) {
            setStatus('✗ Error de validación: ' + error.message, 'error');
            updateOutput('✗ Error de validación:\n' + error.message, true);
        }
    }

    function copyToClipboard() {
        if (!currentOutput) {
            setStatus('Error: No hay código formateado para copiar', 'error');
            return;
        }

        navigator.clipboard.writeText(currentOutput).then(() => {
            setStatus('✓ Código copiado al portapapeles', 'success');
        }).catch(() => {
            setStatus('✗ Error al copiar al portapapeles', 'error');
        });
    }

    function clearAll() {
        inputArea.value = '';
        updateOutput('');
        if (modoDiffActivo) alternarModoDiff();
        cerrarBarraBusqueda();
        setStatus('Listo', '');
    }

    function getFileExtension(lang) {
        const extensions = {
            'xml': '.xml',
            'json': '.json',
            'html': '.html',
            'java': '.java',
            'javascript': '.js',
            'sql': '.sql'
        };
        return extensions[lang] || '.txt';
    }

    function openDownloadModal() {
        if (!currentOutput) {
            setStatus('Error: No hay código para descargar', 'error');
            return;
        }

        const ext = getFileExtension(languageSelect.value);
        downloadExtensionBadge.textContent = ext;
        downloadFilenameInput.value = 'codigo_formateado';
        downloadModal.style.display = 'block';

        setTimeout(() => {
            downloadFilenameInput.focus();
            downloadFilenameInput.select();
        }, 50);
    }

    function closeDownloadModal() {
        downloadModal.style.display = 'none';
    }

    function executeDownload() {
        if (!currentOutput) {
            closeDownloadModal();
            return;
        }

        const ext = getFileExtension(languageSelect.value);
        let filename = downloadFilenameInput.value.trim() || 'codigo_formateado';

        // Evitar duplicar la extensión si el usuario la escribió manualmente
        if (filename.toLowerCase().endsWith(ext.toLowerCase())) {
            filename = filename.slice(0, -ext.length);
        }
        filename = (filename || 'codigo_formateado') + ext;

        const blob = new Blob([currentOutput], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const element = document.createElement('a');
        element.href = url;
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(url);

        closeDownloadModal();
        setStatus(`✓ Archivo '${filename}' descargado correctamente`, 'success');
    }

    function openConvertModal() {
        convertModal.style.display = 'block';
    }

    function closeConvertModal() {
        convertModal.style.display = 'none';
    }

    convertJsonToXmlBtn.addEventListener('click', () => {
        const input = inputArea.value.trim();
        if (!input) {
            setStatus('Error: Ingrese código JSON para convertir', 'error');
            closeConvertModal();
            return;
        }
        try {
            const indentType = indentSelect ? indentSelect.value : '4';
            const xml = Formatters.jsonToXml(input, indentType);
            languageSelect.value = 'xml';
            updateOutput(xml);
            setStatus('✓ JSON convertido a XML con éxito', 'success');
            closeConvertModal();
        } catch (e) {
            setStatus('✗ Error al convertir JSON a XML: ' + e.message, 'error');
            closeConvertModal();
        }
    });

    convertXmlToJsonBtn.addEventListener('click', () => {
        const input = inputArea.value.trim();
        if (!input) {
            setStatus('Error: Ingrese código XML para convertir', 'error');
            closeConvertModal();
            return;
        }
        try {
            const indentType = indentSelect ? indentSelect.value : '4';
            const json = Formatters.xmlToJson(input, indentType);
            languageSelect.value = 'json';
            updateOutput(json);
            setStatus('✓ XML convertido a JSON con éxito', 'success');
            closeConvertModal();
        } catch (e) {
            setStatus('✗ Error al convertir XML a JSON: ' + e.message, 'error');
            closeConvertModal();
        }
    });

    function setupDragAndDrop() {
        const dropZone = inputPanel;

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('drag-over');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const ext = file.name.split('.').pop().toLowerCase();
                
                // Mapear extensión a lenguaje
                const extMap = {
                    'json': 'json',
                    'xml': 'xml',
                    'html': 'html',
                    'htm': 'html',
                    'jsp': 'html',
                    'sql': 'sql',
                    'java': 'java',
                    'js': 'javascript',
                    'mjs': 'javascript'
                };

                const reader = new FileReader();
                reader.onload = (event) => {
                    inputArea.value = event.target.result;
                    if (extMap[ext]) {
                        languageSelect.value = extMap[ext];
                    } else {
                        const detected = Formatters.detectLanguage(inputArea.value);
                        if (detected) languageSelect.value = detected;
                    }
                    formatCode();
                    setStatus(`✓ Archivo '${file.name}' cargado y formateado`, 'success');
                };
                reader.readAsText(file);
            }
        });
    }


    inputArea.addEventListener('paste', () => {
        setTimeout(() => {
            const code = inputArea.value;
            const detected = Formatters.detectLanguage(code);
            if (detected) {
                languageSelect.value = detected;
                setStatus(`Lenguaje auto-detectado: ${detected.toUpperCase()}`, 'success');
            }
            formatCode();
        }, 150);
    });


    function toggleFullscreen(panel, btn) {
        const isFull = panel.classList.toggle('fullscreen');
        btn.textContent = isFull ? '✕' : '⛶';
        btn.setAttribute('title', isFull ? 'Salir de pantalla completa' : 'Pantalla completa');
    }

    expandInputBtn.addEventListener('click', () => toggleFullscreen(inputPanel, expandInputBtn));
    expandOutputBtn.addEventListener('click', () => toggleFullscreen(outputPanel, expandOutputBtn));

    const CLAVE_HISTORIAL = 'code_formatter_history';
    const MAXIMO_ELEMENTOS_HISTORIAL = 25;

    // Obtiene los textos guardados desde localStorage
    function obtenerHistorial() {
        try {
            return JSON.parse(localStorage.getItem(CLAVE_HISTORIAL)) || [];
        } catch (error) {
            return [];
        }
    }

    // Guarda una copia del código formateado en el historial local
    function guardarEnHistorial(codigoEntrada, lenguaje) {
        if (!codigoEntrada || codigoEntrada.trim().length === 0) return;
        const historial = obtenerHistorial();
        
        // Evita duplicar si el código y lenguaje son idénticos al último registro
        if (historial.length > 0 && historial[0].codigoEntrada === codigoEntrada && historial[0].lenguaje === lenguaje) {
            return;
        }

        const registro = {
            id: 'hist_' + Date.now(),
            marcaTiempo: Date.now(),
            lenguaje: lenguaje,
            codigoEntrada: codigoEntrada,
            vistaPrevia: codigoEntrada.trim().slice(0, 100).replace(/\s+/g, ' '),
            totalCaracteres: codigoEntrada.length,
            totalLineas: codigoEntrada.split('\n').length
        };

        historial.unshift(registro);
        if (historial.length > MAXIMO_ELEMENTOS_HISTORIAL) historial.pop();

        try {
            localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
        } catch (error) {
            console.warn('Error al guardar historial:', error);
        }
        renderizarHistorial();
    }

    // Calcula una descripción legible del tiempo transcurrido
    function formatearTiempoRelativo(marcaTiempo) {
        const segundosTranscurridos = Math.floor((Date.now() - marcaTiempo) / 1000);
        if (segundosTranscurridos < 60) return 'Hace un momento';
        const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
        if (minutosTranscurridos < 60) return `Hace ${minutosTranscurridos}m`;
        const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
        if (horasTranscurridas < 24) return `Hace ${horasTranscurridas}h`;
        const fecha = new Date(marcaTiempo);
        return `${fecha.getDate()}/${fecha.getMonth() + 1} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}`;
    }

    // Dibuja las tarjetas del historial en el panel desplegable
    function renderizarHistorial() {
        const historial = obtenerHistorial();
        if (historyCount) historyCount.textContent = historial.length;

        if (!historyList) return;

        if (historial.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    No hay textos guardados en el historial aún.<br>
                    <span style="font-size:0.75rem; opacity:0.8;">Se guardarán automáticamente cada vez que formatees.</span>
                </div>
            `;
            return;
        }

        historyList.innerHTML = '';
        historial.forEach(registro => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'history-item';
            tarjeta.title = 'Haz clic para cargar este código';

            tarjeta.innerHTML = `
                <div class="history-item-top">
                    <span class="history-lang-badge">${registro.lenguaje.toUpperCase()}</span>
                    <span class="history-time">${formatearTiempoRelativo(registro.marcaTiempo)}</span>
                    <button class="history-delete-item-btn" title="Eliminar este elemento">🗑️</button>
                </div>
                <div class="history-item-preview">${escaparCaracteresHtml(registro.vistaPrevia)}</div>
                <div class="history-item-meta">
                    <span>${registro.totalLineas} líneas</span>
                    <span>${registro.totalCaracteres} caracteres</span>
                </div>
            `;

            // Cargar el código seleccionado en el editor
            tarjeta.addEventListener('click', (evento) => {
                if (evento.target.closest('.history-delete-item-btn')) return;

                inputArea.value = registro.codigoEntrada;
                languageSelect.value = registro.lenguaje;
                formatCode();
                cerrarPanelHistorial();
                setStatus(`✓ Código '${registro.lenguaje.toUpperCase()}' cargado del historial`, 'success');
            });

            // Eliminar elemento puntual del historial
            const botonEliminar = tarjeta.querySelector('.history-delete-item-btn');
            botonEliminar.addEventListener('click', (evento) => {
                evento.stopPropagation();
                eliminarElementoHistorial(registro.id);
            });

            historyList.appendChild(tarjeta);
        });
    }

    // Escapa caracteres especiales para inserción segura en el DOM
    function escaparCaracteresHtml(cadena) {
        return cadena
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Elimina un registro individual por su identificador
    function eliminarElementoHistorial(idElemento) {
        let historial = obtenerHistorial();
        historial = historial.filter(registro => registro.id !== idElemento);
        try {
            localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
        } catch (error) {}
        renderizarHistorial();
        setStatus('Texto eliminado del historial', '');
    }

    // Vacía todos los registros del historial tras confirmación
    function vaciarTodoElHistorial() {
        const historial = obtenerHistorial();
        if (historial.length === 0) return;
        if (confirm('¿Estás seguro de que deseas vaciar todo el historial de textos?')) {
            localStorage.removeItem(CLAVE_HISTORIAL);
            renderizarHistorial();
            setStatus('Historial de textos vaciado', '');
        }
    }

    function alternarPanelHistorial() {
        historyDrawer.classList.toggle('open');
    }

    function cerrarPanelHistorial() {
        historyDrawer.classList.remove('open');
    }

    let modoDiffActivo = false;

    // Calcula la subsecuencia común más larga para generar diferencias línea por línea
    function calcularDiferenciasLineas(lineasAntiguas, lineasNuevas) {
        const maxLineas = 1000;
        const a = lineasAntiguas.slice(0, maxLineas);
        const b = lineasNuevas.slice(0, maxLineas);

        const n = a.length;
        const m = b.length;
        const matriz = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (a[i] === b[j]) {
                    matriz[i + 1][j + 1] = matriz[i][j] + 1;
                } else {
                    matriz[i + 1][j + 1] = Math.max(matriz[i + 1][j], matriz[i][j + 1]);
                }
            }
        }

        const resultado = [];
        let i = n, j = m;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
                resultado.unshift({ tipo: 'igual', texto: a[i - 1] });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || matriz[i][j - 1] >= matriz[i - 1][j])) {
                resultado.unshift({ tipo: 'agregada', texto: b[j - 1] });
                j--;
            } else if (i > 0 && (j === 0 || matriz[i][j - 1] < matriz[i - 1][j])) {
                resultado.unshift({ tipo: 'eliminada', texto: a[i - 1] });
                i--;
            }
        }

        return resultado;
    }

    // Alterna entre la vista estándar y el visor de diferencias
    function alternarModoDiff() {
        modoDiffActivo = !modoDiffActivo;

        if (!modoDiffActivo) {
            diffContainer.style.display = 'none';
            outputContainer.style.display = 'block';
            botonModoDiff.textContent = 'Modo Diff';
            botonModoDiff.classList.remove('btn-special');
            botonModoDiff.classList.add('btn-secondary');
            return;
        }

        const textoEntrada = inputArea.value;
        const textoSalida = currentOutput || '';

        if (!textoEntrada.trim() && !textoSalida.trim()) {
            setStatus('No hay código para comparar', 'error');
            modoDiffActivo = false;
            return;
        }

        const lineasEntrada = textoEntrada.split('\n');
        const lineasSalida = textoSalida.split('\n');
        const diferencias = calcularDiferenciasLineas(lineasEntrada, lineasSalida);

        diffContainer.innerHTML = '';
        diferencias.forEach(linea => {
            const elementoLinea = document.createElement('div');
            elementoLinea.className = `linea-diff ${linea.tipo}`;

            const signo = linea.tipo === 'agregada' ? '+' : (linea.tipo === 'eliminada' ? '-' : ' ');
            elementoLinea.innerHTML = `<span class="signo-diff">${signo}</span><span class="contenido-diff">${escaparCaracteresHtml(linea.texto || ' ')}</span>`;
            diffContainer.appendChild(elementoLinea);
        });

        outputContainer.style.display = 'none';
        diffContainer.style.display = 'block';
        botonModoDiff.textContent = 'Cerrar Diff';
        botonModoDiff.classList.remove('btn-secondary');
        botonModoDiff.classList.add('btn-special');
        setStatus('✓ Modo Diff activado: comparando entrada vs salida', 'success');
    }

    let indiceCoincidenciaActual = -1;
    let elementosCoincidencia = [];

    // Abre la barra de búsqueda y enfoca su campo
    function abrirBarraBusqueda() {
        if (modoDiffActivo) alternarModoDiff();
        barraBusqueda.style.display = 'flex';
        campoBusqueda.focus();
        campoBusqueda.select();
        ejecutarBusqueda();
    }

    // Cierra la barra de búsqueda y restaura la vista
    function cerrarBarraBusqueda() {
        barraBusqueda.style.display = 'none';
        campoBusqueda.value = '';
        limpiarResaltadoBusqueda();
        indiceCoincidenciaActual = -1;
        elementosCoincidencia = [];
        contadorCoincidencias.textContent = '0/0';
    }

    // Restaura el código original en el visor sin marcas de búsqueda
    function limpiarResaltadoBusqueda() {
        if (currentOutput) {
            updateOutput(currentOutput);
        }
    }

    // Busca el término dentro del código y resalta las coincidencias
    function ejecutarBusqueda() {
        const termino = campoBusqueda.value;
        if (!termino || !currentOutput) {
            limpiarResaltadoBusqueda();
            contadorCoincidencias.textContent = '0/0';
            elementosCoincidencia = [];
            indiceCoincidenciaActual = -1;
            return;
        }

        const regexBusqueda = new RegExp(`(${termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const textoEscapado = escaparCaracteresHtml(currentOutput);
        const htmlResaltado = textoEscapado.replace(regexBusqueda, '<mark class="coincidencia-busqueda">$1</mark>');

        outputCode.innerHTML = htmlResaltado;
        envolverLineasEnFilas(outputCode);
        elementosCoincidencia = Array.from(outputCode.querySelectorAll('.coincidencia-busqueda'));

        if (elementosCoincidencia.length > 0) {
            indiceCoincidenciaActual = 0;
            actualizarCoincidenciaActiva();
        } else {
            indiceCoincidenciaActual = -1;
            contadorCoincidencias.textContent = '0/0';
        }
    }

    // Actualiza la coincidencia activa y la centra en pantalla
    function actualizarCoincidenciaActiva() {
        elementosCoincidencia.forEach((el, idx) => {
            el.classList.toggle('coincidencia-activa', idx === indiceCoincidenciaActual);
        });

        contadorCoincidencias.textContent = `${indiceCoincidenciaActual + 1}/${elementosCoincidencia.length}`;

        const elementoActivo = elementosCoincidencia[indiceCoincidenciaActual];
        if (elementoActivo) {
            elementoActivo.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function irACoincidenciaSiguiente() {
        if (elementosCoincidencia.length === 0) return;
        indiceCoincidenciaActual = (indiceCoincidenciaActual + 1) % elementosCoincidencia.length;
        actualizarCoincidenciaActiva();
    }

    function irACoincidenciaAnterior() {
        if (elementosCoincidencia.length === 0) return;
        indiceCoincidenciaActual = (indiceCoincidenciaActual - 1 + elementosCoincidencia.length) % elementosCoincidencia.length;
        actualizarCoincidenciaActiva();
    }

    historyToggleBtn.addEventListener('click', alternarPanelHistorial);
    closeHistoryBtn.addEventListener('click', cerrarPanelHistorial);
    clearHistoryBtn.addEventListener('click', vaciarTodoElHistorial);

    window.addEventListener('keydown', (e) => {
        // Atajo Ctrl+F o Cmd+F para búsqueda en código
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            abrirBarraBusqueda();
            return;
        }

        // Atajo Ctrl+Shift+C para copiar resultado
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            copyToClipboard();
            return;
        }

        // Atajo Ctrl+D para descargar
        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            openDownloadModal();
            return;
        }

        if (e.key === 'Escape') {
            if (inputPanel.classList.contains('fullscreen')) {
                toggleFullscreen(inputPanel, expandInputBtn);
            }
            if (outputPanel.classList.contains('fullscreen')) {
                toggleFullscreen(outputPanel, expandOutputBtn);
            }
            closeConvertModal();
            closeDownloadModal();
            cerrarPanelHistorial();
            cerrarBarraBusqueda();
            deseleccionarFilas();
            if (modoDiffActivo) alternarModoDiff();
        }
    });

    // Maneja la selección o deselección de filas al hacer clic en el código o número de línea
    outputContainer.addEventListener('click', (evento) => {
        const filaCodigo = evento.target.closest('.fila-codigo');
        if (filaCodigo) {
            const yaEstabaSeleccionada = filaCodigo.classList.contains('fila-seleccionada');
            deseleccionarFilas();
            if (!yaEstabaSeleccionada) {
                filaCodigo.classList.add('fila-seleccionada');
                resaltarNumeroLinea(filaCodigo.dataset.linea);
            }
            return;
        }

        const spanNumero = evento.target.closest('.line-numbers-rows > span');
        if (spanNumero) {
            const contenedorNumeros = spanNumero.parentElement;
            const indiceFila = Array.from(contenedorNumeros.children).indexOf(spanNumero);
            const filaDestino = outputCode.querySelector(`.fila-codigo[data-linea="${indiceFila + 1}"]`);
            if (filaDestino) {
                const yaEstabaSeleccionada = filaDestino.classList.contains('fila-seleccionada');
                deseleccionarFilas();
                if (!yaEstabaSeleccionada) {
                    filaDestino.classList.add('fila-seleccionada');
                    spanNumero.classList.add('numero-linea-seleccionado');
                }
            }
        }
    });

    formatBtn.addEventListener('click', formatCode);
    minifyBtn.addEventListener('click', minifyCode);
    validBtn.addEventListener('click', validateCode);
    convertBtn.addEventListener('click', openConvertModal);
    botonModoDiff.addEventListener('click', alternarModoDiff);
    downloadBtn.addEventListener('click', openDownloadModal);
    downloadConfirmBtn.addEventListener('click', executeDownload);
    downloadCancelBtn.addEventListener('click', closeDownloadModal);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    convertCloseBtn.addEventListener('click', closeConvertModal);

    botonAbrirBusqueda.addEventListener('click', abrirBarraBusqueda);
    botonCerrarBusqueda.addEventListener('click', cerrarBarraBusqueda);
    botonCoincidenciaSiguiente.addEventListener('click', irACoincidenciaSiguiente);
    botonCoincidenciaAnterior.addEventListener('click', irACoincidenciaAnterior);
    campoBusqueda.addEventListener('input', ejecutarBusqueda);

    campoBusqueda.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) irACoincidenciaAnterior();
            else irACoincidenciaSiguiente();
        }
        if (e.key === 'Escape') {
            cerrarBarraBusqueda();
        }
    });

    downloadFilenameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeDownload();
        }
    });

    languageSelect.addEventListener('change', () => {
        if (currentOutput) {
            updateOutput(currentOutput);
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === convertModal) closeConvertModal();
        if (event.target === downloadModal) closeDownloadModal();
    });

    // Atajo de teclado: Ctrl + Enter para formatear
    inputArea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            formatCode();
        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(() => console.log('Service Worker PWA registrado'))
                .catch(err => console.log('Error registro SW:', err));
        });
    }

    // Inicializaciones
    initPreferences();
    setupDragAndDrop();
    renderizarHistorial();
});
