/**
 * app.js - Control de interfaz, eventos, Prism, PWA, Drag&Drop, conversiones y fullscreen
 */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const inputArea = document.getElementById('input');
    const inputPanel = document.getElementById('inputPanel');
    const outputPanel = document.getElementById('outputPanel');
    const outputContainer = document.getElementById('outputContainer');
    const preContainer = document.getElementById('preContainer');
    const outputCode = document.getElementById('outputCode');
    const outputPlaceholder = document.getElementById('outputPlaceholder');
    
    // Pestañas de Trabajo Múltiple
    const contenedorPestanas = document.getElementById('contenedorPestanas');
    const botonNuevaPestana = document.getElementById('botonNuevaPestana');
    
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
    const interruptorModoOscuro = document.getElementById('interruptorModoOscuro');
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

    // Contenedores Principales y Búsqueda
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    const botonAbrirBusqueda = document.getElementById('botonAbrirBusqueda');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const campoBusqueda = document.getElementById('campoBusqueda');
    const contadorCoincidencias = document.getElementById('contadorCoincidencias');
    const botonCoincidenciaAnterior = document.getElementById('botonCoincidenciaAnterior');
    const botonCoincidenciaSiguiente = document.getElementById('botonCoincidenciaSiguiente');
    const botonCerrarBusqueda = document.getElementById('botonCerrarBusqueda');

    // Módulo de Comparación Avanzada (Beyond Compare)
    const seccionComparador = document.getElementById('seccionComparador');
    const botonModoDiff = document.getElementById('botonModoDiff');
    const btnCerrarComparador = document.getElementById('btnCerrarComparador');
    const btnModoEdicion = document.getElementById('btnModoEdicion');
    const btnModoVisual = document.getElementById('btnModoVisual');
    const grupoVistasVisuales = document.getElementById('grupoVistasVisuales');
    const btnVistaParalela = document.getElementById('btnVistaParalela');
    const btnVistaUnificada = document.getElementById('btnVistaUnificada');
    const btnDistinguirMayusculas = document.getElementById('btnDistinguirMayusculas');
    const selectModoEspacios = document.getElementById('selectModoEspacios');
    const btnIgnorarLineasVacias = document.getElementById('btnIgnorarLineasVacias');
    const wrapFiltroLineas = document.getElementById('wrapFiltroLineas');
    const selectFiltroLineas = document.getElementById('selectFiltroLineas');
    const grupoNavegacionDiferencias = document.getElementById('grupoNavegacionDiferencias');
    const btnDiferenciaAnterior = document.getElementById('btnDiferenciaAnterior');
    const btnDiferenciaSiguiente = document.getElementById('btnDiferenciaSiguiente');
    const contadorDiferencias = document.getElementById('contadorDiferencias');
    const grupoStatsDiferencias = document.getElementById('grupoStatsDiferencias');
    const statAgregadas = document.getElementById('statAgregadas');
    const statEliminadas = document.getElementById('statEliminadas');
    const statModificadas = document.getElementById('statModificadas');
    const btnIntercambiarLados = document.getElementById('btnIntercambiarLados');
    const btnImportarFormateador = document.getElementById('btnImportarFormateador');

    // Paneles y Vistas del Comparador
    const vistaEdicionComparacion = document.getElementById('vistaEdicionComparacion');
    const vistaVisualComparacion = document.getElementById('vistaVisualComparacion');
    const vistaComparacionParalela = document.getElementById('vistaComparacionParalela');
    const vistaComparacionUnificada = document.getElementById('vistaComparacionUnificada');
    const textareaComparadorIzquierdo = document.getElementById('textareaComparadorIzquierdo');
    const textareaComparadorDerecho = document.getElementById('textareaComparadorDerecho');
    const contadorIzquierdo = document.getElementById('contadorIzquierdo');
    const contadorDerecho = document.getElementById('contadorDerecho');
    const btnPegarIzquierdo = document.getElementById('btnPegarIzquierdo');
    const btnPegarDerecho = document.getElementById('btnPegarDerecho');
    const btnCopiarEdicionIzquierdo = document.getElementById('btnCopiarEdicionIzquierdo');
    const btnCopiarEdicionDerecho = document.getElementById('btnCopiarEdicionDerecho');
    const btnLimpiarIzquierdo = document.getElementById('btnLimpiarIzquierdo');
    const btnLimpiarDerecho = document.getElementById('btnLimpiarDerecho');
    const inputArchivoIzquierdo = document.getElementById('inputArchivoIzquierdo');
    const inputArchivoDerecho = document.getElementById('inputArchivoDerecho');
    const btnVerDiffDesdeEditorIzquierdo = document.getElementById('btnVerDiffDesdeEditorIzquierdo');
    const btnVerDiffDesdeEditorDerecho = document.getElementById('btnVerDiffDesdeEditorDerecho');

    // Contenedores del Visor Visual
    const scrollComparacionIzquierdo = document.getElementById('scrollComparacionIzquierdo');
    const scrollComparacionDerecho = document.getElementById('scrollComparacionDerecho');
    const scrollComparacionUnificado = document.getElementById('scrollComparacionUnificado');
    const gridComparacionIzquierdo = document.getElementById('gridComparacionIzquierdo');
    const gridComparacionDerecho = document.getElementById('gridComparacionDerecho');
    const gridComparacionUnificado = document.getElementById('gridComparacionUnificado');
    const btnEditarIzquierdoDesdeVisual = document.getElementById('btnEditarIzquierdoDesdeVisual');
    const btnEditarDerechoDesdeVisual = document.getElementById('btnEditarDerechoDesdeVisual');
    const btnEditarDesdeUnificada = document.getElementById('btnEditarDesdeUnificada');
    const btnCopiarTextoIzquierdo = document.getElementById('btnCopiarTextoIzquierdo');
    const btnCopiarTextoDerecho = document.getElementById('btnCopiarTextoDerecho');
    const btnPegarVisualIzquierdo = document.getElementById('btnPegarVisualIzquierdo');
    const btnPegarVisualDerecho = document.getElementById('btnPegarVisualDerecho');
    const btnLimpiarVisualIzquierdo = document.getElementById('btnLimpiarVisualIzquierdo');
    const btnLimpiarVisualDerecho = document.getElementById('btnLimpiarVisualDerecho');

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
        if (interruptorModoOscuro) {
            interruptorModoOscuro.checked = (theme === 'dark');
        }
    }

    if (interruptorModoOscuro) {
        interruptorModoOscuro.addEventListener('change', () => {
            setTheme(interruptorModoOscuro.checked ? 'dark' : 'light');
        });
    }

    if (indentSelect) {
        indentSelect.addEventListener('change', () => {
            localStorage.setItem('indent', indentSelect.value);
            const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
            if (pestanaActual) {
                pestanaActual.indentacion = indentSelect.value;
                guardarPestanasAlmacenadas();
            }
            if (inputArea.value.trim()) {
                formatCode();
            }
        });
    }

    const CLAVE_ALMACENAMIENTO_PESTANAS = 'code_formatter_pestanas_v2';
    const CLAVE_PESTANA_ACTIVA = 'code_formatter_pestana_activa_v2';

    let coleccionPestanas = [];
    let idPestanaActiva = null;
    let contadorPestanas = 1;

    // Obtiene las pestañas almacenadas en localStorage
    function obtenerPestanasAlmacenadas() {
        try {
            const datosSerializados = localStorage.getItem(CLAVE_ALMACENAMIENTO_PESTANAS);
            return datosSerializados ? JSON.parse(datosSerializados) : null;
        } catch (error) {
            console.warn('Error al leer pestañas guardadas:', error);
            return null;
        }
    }

    // Guarda la colección de pestañas en localStorage
    function guardarPestanasAlmacenadas() {
        try {
            localStorage.setItem(CLAVE_ALMACENAMIENTO_PESTANAS, JSON.stringify(coleccionPestanas));
        } catch (error) {
            console.warn('Error al guardar pestañas:', error);
        }
    }

    // Sincroniza los valores actuales del editor en la pestaña activa
    function sincronizarPestanaActual() {
        if (!idPestanaActiva) return;
        const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
        if (!pestanaActual) return;

        pestanaActual.codigoEntrada = inputArea.value;
        pestanaActual.codigoSalida = currentOutput || '';
        pestanaActual.lenguaje = languageSelect.value;
        pestanaActual.indentacion = indentSelect ? indentSelect.value : '4';
        pestanaActual.salidaEsError = outputCode.textContent.startsWith('Error') || outputCode.textContent.includes('Error al');

        guardarPestanasAlmacenadas();
    }

    // Renderiza la barra de pestañas con sus insignias, títulos y botones de cierre
    function renderizarBarraPestanas() {
        if (!contenedorPestanas) return;
        contenedorPestanas.innerHTML = '';

        coleccionPestanas.forEach(pestana => {
            const elementoPestana = document.createElement('div');
            elementoPestana.className = 'tab-item' + (pestana.id === idPestanaActiva ? ' activa' : '');
            elementoPestana.dataset.id = pestana.id;
            elementoPestana.title = `Doble clic para renombrar - ${pestana.titulo}`;

            const insigniaLenguaje = document.createElement('span');
            insigniaLenguaje.className = 'tab-badge';
            insigniaLenguaje.textContent = (pestana.lenguaje || 'TXT').toUpperCase();

            const spanTitulo = document.createElement('span');
            spanTitulo.className = 'tab-title';
            spanTitulo.textContent = pestana.titulo;

            // Edición de título con doble clic
            spanTitulo.addEventListener('dblclick', (evento) => {
                evento.stopPropagation();
                spanTitulo.contentEditable = 'true';
                spanTitulo.focus();

                const seleccion = window.getSelection();
                const rango = document.createRange();
                rango.selectNodeContents(spanTitulo);
                seleccion.removeAllRanges();
                seleccion.addRange(rango);

                const finalizarEdicion = () => {
                    spanTitulo.contentEditable = 'false';
                    const textoLimpio = spanTitulo.textContent.trim();
                    if (textoLimpio) {
                        pestana.titulo = textoLimpio;
                        guardarPestanasAlmacenadas();
                    } else {
                        spanTitulo.textContent = pestana.titulo;
                    }
                };

                spanTitulo.addEventListener('blur', finalizarEdicion, { once: true });
                spanTitulo.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        spanTitulo.blur();
                    } else if (e.key === 'Escape') {
                        spanTitulo.textContent = pestana.titulo;
                        spanTitulo.contentEditable = 'false';
                    }
                });
            });

            const botonCerrar = document.createElement('button');
            botonCerrar.className = 'tab-close-btn';
            botonCerrar.innerHTML = '<svg class="icono-svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            botonCerrar.title = 'Cerrar pestaña';
            botonCerrar.addEventListener('click', (evento) => {
                cerrarPestana(pestana.id, evento);
            });

            elementoPestana.appendChild(insigniaLenguaje);
            elementoPestana.appendChild(spanTitulo);
            elementoPestana.appendChild(botonCerrar);

            elementoPestana.addEventListener('click', () => {
                activarPestana(pestana.id);
            });

            contenedorPestanas.appendChild(elementoPestana);
        });
    }

    // Cambia la pestaña activa y restaura sus valores en el editor
    function activarPestana(idPestana) {
        if (idPestanaActiva === idPestana) return;

        sincronizarPestanaActual();

        const nuevaPestana = coleccionPestanas.find(pestana => pestana.id === idPestana);
        if (!nuevaPestana) return;

        idPestanaActiva = idPestana;
        localStorage.setItem(CLAVE_PESTANA_ACTIVA, idPestanaActiva);

        if (comparadorBeyondActivo) cerrarComparadorBeyond();
        cerrarBarraBusqueda();

        inputArea.value = nuevaPestana.codigoEntrada || '';
        languageSelect.value = nuevaPestana.lenguaje || 'xml';
        if (indentSelect && nuevaPestana.indentacion) {
            indentSelect.value = nuevaPestana.indentacion;
        }

        updateOutput(nuevaPestana.codigoSalida || '', nuevaPestana.salidaEsError || false);
        setStatus('Listo', '');

        renderizarBarraPestanas();
    }

    // Crea una nueva pestaña y la activa de inmediato
    function crearNuevaPestana(tituloPersonalizado = null, lenguajeInicial = null, codigoInicial = '') {
        sincronizarPestanaActual();

        contadorPestanas++;
        const nuevoId = 'pestana_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        const nuevoTitulo = tituloPersonalizado || `Pestaña ${contadorPestanas}`;
        const nuevoLenguaje = lenguajeInicial || languageSelect.value || 'xml';
        const nuevaIndentacion = indentSelect ? indentSelect.value : '4';

        const nuevaPestana = {
            id: nuevoId,
            titulo: nuevoTitulo,
            lenguaje: nuevoLenguaje,
            indentacion: nuevaIndentacion,
            codigoEntrada: codigoInicial,
            codigoSalida: '',
            salidaEsError: false
        };

        coleccionPestanas.push(nuevaPestana);
        guardarPestanasAlmacenadas();
        activarPestana(nuevoId);

        setTimeout(() => {
            const elementoPestana = contenedorPestanas.querySelector(`[data-id="${nuevoId}"]`);
            if (elementoPestana) {
                elementoPestana.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
            inputArea.focus();
        }, 50);
    }

    // Cierra una pestaña existente o la restablece si es la última
    function cerrarPestana(idPestana, evento) {
        if (evento) {
            evento.stopPropagation();
        }

        const indice = coleccionPestanas.findIndex(pestana => pestana.id === idPestana);
        if (indice === -1) return;

        const pestanaACerrar = coleccionPestanas[indice];

        // Solicita confirmación si la pestaña contiene código relevante
        if (pestanaACerrar.codigoEntrada && pestanaACerrar.codigoEntrada.trim().length > 0) {
            const confirmacion = confirm(`¿Deseas cerrar "${pestanaACerrar.titulo}"? Se perderán los cambios no guardados en el historial.`);
            if (!confirmacion) return;
        }

        // Si es la única pestaña, se limpia en vez de eliminarla
        if (coleccionPestanas.length === 1) {
            pestanaACerrar.titulo = 'Pestaña 1';
            pestanaACerrar.codigoEntrada = '';
            pestanaACerrar.codigoSalida = '';
            pestanaACerrar.lenguaje = 'xml';
            pestanaACerrar.indentacion = '4';
            pestanaACerrar.salidaEsError = false;

            inputArea.value = '';
            updateOutput('');
            languageSelect.value = 'xml';
            if (indentSelect) indentSelect.value = '4';
            guardarPestanasAlmacenadas();
            renderizarBarraPestanas();
            setStatus('Pestaña restablecida', '');
            return;
        }

        let nuevoIdActivo = idPestanaActiva;
        if (idPestana === idPestanaActiva) {
            const siguientePestana = coleccionPestanas[indice + 1] || coleccionPestanas[indice - 1];
            nuevoIdActivo = siguientePestana ? siguientePestana.id : null;
        }

        coleccionPestanas.splice(indice, 1);
        guardarPestanasAlmacenadas();

        if (nuevoIdActivo) {
            activarPestana(nuevoIdActivo);
        } else {
            renderizarBarraPestanas();
        }
    }

    // Inicializa el estado de las pestañas al cargar la aplicación
    function inicializarSistemaPestanas() {
        const pestanasGuardadas = obtenerPestanasAlmacenadas();
        const idUltimaActiva = localStorage.getItem(CLAVE_PESTANA_ACTIVA);

        if (pestanasGuardadas && pestanasGuardadas.length > 0) {
            coleccionPestanas = pestanasGuardadas;
            contadorPestanas = coleccionPestanas.reduce((max, pestana) => {
                const coincidencia = pestana.titulo.match(/Pestaña\s+(\d+)/i);
                if (coincidencia) {
                    const numero = parseInt(coincidencia[1], 10);
                    return numero > max ? numero : max;
                }
                return max;
            }, coleccionPestanas.length);

            const existeActiva = coleccionPestanas.some(pestana => pestana.id === idUltimaActiva);
            idPestanaActiva = existeActiva ? idUltimaActiva : coleccionPestanas[0].id;
        } else {
            const idInicial = 'pestana_' + Date.now();
            coleccionPestanas = [{
                id: idInicial,
                titulo: 'Pestaña 1',
                lenguaje: languageSelect.value || 'xml',
                indentacion: indentSelect ? indentSelect.value : '4',
                codigoEntrada: inputArea.value || '',
                codigoSalida: currentOutput || '',
                salidaEsError: false
            }];
            idPestanaActiva = idInicial;
            contadorPestanas = 1;
            guardarPestanasAlmacenadas();
        }

        const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva) || coleccionPestanas[0];
        idPestanaActiva = pestanaActual.id;
        localStorage.setItem(CLAVE_PESTANA_ACTIVA, idPestanaActiva);

        inputArea.value = pestanaActual.codigoEntrada || '';
        languageSelect.value = pestanaActual.lenguaje || 'xml';
        if (indentSelect && pestanaActual.indentacion) {
            indentSelect.value = pestanaActual.indentacion;
        }
        if (pestanaActual.codigoSalida) {
            updateOutput(pestanaActual.codigoSalida, pestanaActual.salidaEsError);
        }

        renderizarBarraPestanas();
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
        status.className = 'status ' + type;
        let iconoHtml = '';
        if (type === 'success') {
            iconoHtml = '<svg class="icono-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else if (type === 'error') {
            iconoHtml = '<svg class="icono-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        }
        status.innerHTML = iconoHtml + message;
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
            setStatus('Código formateado correctamente', 'success');
            guardarEnHistorial(input, language);
            sincronizarPestanaActual();
        } catch (error) {
            setStatus('Error al formatear: ' + error.message, 'error');
            updateOutput('Error al formatear: ' + error.message, true);
            sincronizarPestanaActual();
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
            setStatus('Código minificado correctamente', 'success');
            sincronizarPestanaActual();
        } catch (error) {
            setStatus('Error al minificar: ' + error.message, 'error');
            updateOutput('', true);
            sincronizarPestanaActual();
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
            setStatus('El código es válido', 'success');
            updateOutput('El código es válido y no presenta errores de sintaxis conocidos.');
            sincronizarPestanaActual();
        } catch (error) {
            setStatus('Error de validación: ' + error.message, 'error');
            updateOutput('Error de validación:\n' + error.message, true);
            sincronizarPestanaActual();
        }
    }

    function copyToClipboard() {
        if (!currentOutput) {
            setStatus('Error: No hay código formateado para copiar', 'error');
            return;
        }

        navigator.clipboard.writeText(currentOutput).then(() => {
            setStatus('Código copiado al portapapeles', 'success');
        }).catch(() => {
            setStatus('Error al copiar al portapapeles', 'error');
        });
    }

    function clearAll() {
        inputArea.value = '';
        updateOutput('');
        if (comparadorBeyondActivo) cerrarComparadorBeyond();
        cerrarBarraBusqueda();
        sincronizarPestanaActual();
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

        const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
        let nombreSugerido = 'codigo_formateado';
        if (pestanaActual && pestanaActual.titulo && !pestanaActual.titulo.startsWith('Pestaña')) {
            nombreSugerido = pestanaActual.titulo.replace(/\.[^/.]+$/, '');
        }

        downloadFilenameInput.value = nombreSugerido;
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
        setStatus(`Archivo '${filename}' descargado correctamente`, 'success');
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
            setStatus('JSON convertido a XML con éxito', 'success');
            sincronizarPestanaActual();
            renderizarBarraPestanas();
            closeConvertModal();
        } catch (e) {
            setStatus('Error al convertir JSON a XML: ' + e.message, 'error');
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
            setStatus('XML convertido a JSON con éxito', 'success');
            sincronizarPestanaActual();
            renderizarBarraPestanas();
            closeConvertModal();
        } catch (e) {
            setStatus('Error al convertir XML a JSON: ' + e.message, 'error');
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
                    const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
                    if (pestanaActual) {
                        pestanaActual.titulo = file.name;
                    }
                    formatCode();
                    renderizarBarraPestanas();
                    setStatus(`Archivo '${file.name}' cargado y formateado`, 'success');
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
            renderizarBarraPestanas();
        }, 150);
    });

    // Mantiene sincronizado el código de entrada con la pestaña activa mientras el usuario escribe
    inputArea.addEventListener('input', () => {
        const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
        if (pestanaActual) {
            pestanaActual.codigoEntrada = inputArea.value;
            guardarPestanasAlmacenadas();
        }
    });


    function toggleFullscreen(panel, btn) {
        const isFull = panel.classList.toggle('fullscreen');
        if (isFull) {
            btn.innerHTML = '<svg class="icono-svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>';
            btn.setAttribute('title', 'Salir de pantalla completa');
        } else {
            btn.innerHTML = '<svg class="icono-svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
            btn.setAttribute('title', 'Pantalla completa');
        }
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
                    <button class="history-delete-item-btn" title="Eliminar este elemento">
                        <svg class="icono-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
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
                setStatus(`Código '${registro.lenguaje.toUpperCase()}' cargado del historial`, 'success');
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

    const CLAVE_COMPARADOR_IZQUIERDO = 'beyond_compare_texto_izquierdo';
    const CLAVE_COMPARADOR_DERECHO = 'beyond_compare_texto_derecho';

    let comparadorBeyondActivo = false;
    let modoVistaComparador = 'edicion';
    let listaDiferenciasBeyond = [];
    let indiceDiferenciaActual = -1;

    const opcionesComparacion = {
        vista: 'paralela',
        distinguirMayusculas: true,
        modoEspacios: 'estricto',
        ignorarLineasVacias: false,
        filtroLineas: 'todas'
    };

    // Aplica las reglas de normalización según las opciones de comparación activas
    function normalizarTextoParaComparar(cadena) {
        if (cadena === null || cadena === undefined) return '';
        let procesada = cadena;
        if (!opcionesComparacion.distinguirMayusculas) {
            procesada = procesada.toLowerCase();
        }
        if (opcionesComparacion.modoEspacios === 'ignorar_indentacion') {
            procesada = procesada.trim();
        } else if (opcionesComparacion.modoEspacios === 'ignorar_todos') {
            procesada = procesada.replace(/\s+/g, '');
        }
        return procesada;
    }

    // Calcula diferencias a nivel de palabras y caracteres dentro de una misma línea
    function calcularDiferenciasIntralinea(lineaA, lineaB) {
        const patronTokens = /\s+|[a-zA-Z0-9_$]+|[^\s\w]/g;
        const tokensA = lineaA.match(patronTokens) || [lineaA];
        const tokensB = lineaB.match(patronTokens) || [lineaB];

        const n = tokensA.length;
        const m = tokensB.length;
        const matriz = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const coincide = normalizarTextoParaComparar(tokensA[i]) === normalizarTextoParaComparar(tokensB[j]);
                if (coincide) {
                    matriz[i + 1][j + 1] = matriz[i][j] + 1;
                } else {
                    matriz[i + 1][j + 1] = Math.max(matriz[i + 1][j], matriz[i][j + 1]);
                }
            }
        }

        const resultadoA = [];
        const resultadoB = [];
        let i = n, j = m;

        while (i > 0 || j > 0) {
            const coincide = i > 0 && j > 0 && normalizarTextoParaComparar(tokensA[i - 1]) === normalizarTextoParaComparar(tokensB[j - 1]);
            if (coincide) {
                resultadoA.unshift({ tipo: 'igual', texto: tokensA[i - 1] });
                resultadoB.unshift({ tipo: 'igual', texto: tokensB[j - 1] });
                i--; j--;
            } else if (j > 0 && (i === 0 || matriz[i][j - 1] >= matriz[i - 1][j])) {
                resultadoB.unshift({ tipo: 'agregada', texto: tokensB[j - 1] });
                j--;
            } else if (i > 0 && (j === 0 || matriz[i][j - 1] < matriz[i - 1][j])) {
                resultadoA.unshift({ tipo: 'eliminada', texto: tokensA[i - 1] });
                i--;
            }
        }

        return {
            htmlIzquierdo: construirHtmlIntralinea(resultadoA),
            htmlDerecho: construirHtmlIntralinea(resultadoB)
        };
    }

    // Convierte los tokens con sus marcas en formato HTML seguro
    function construirHtmlIntralinea(tokens) {
        return tokens.map(tok => {
            const contenido = escaparCaracteresHtml(tok.texto);
            if (tok.tipo === 'agregada') {
                return `<mark class="beyond-intralinea agregada">${contenido}</mark>`;
            }
            if (tok.tipo === 'eliminada') {
                return `<mark class="beyond-intralinea eliminada">${contenido}</mark>`;
            }
            return contenido;
        }).join('');
    }

    // Alinea horizontalmente las líneas de ambos paneles detectando bloques y modificaciones
    function alinearLineasParaComparacion(lineasA, lineasB) {
        const limiteMaximoLineas = 1500;
        const a = lineasA.slice(0, limiteMaximoLineas);
        const b = lineasB.slice(0, limiteMaximoLineas);

        const n = a.length;
        const m = b.length;
        const matriz = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const esVaciaA = a[i].trim().length === 0;
                const esVaciaB = b[j].trim().length === 0;

                let sonIguales = normalizarTextoParaComparar(a[i]) === normalizarTextoParaComparar(b[j]);
                if (opcionesComparacion.ignorarLineasVacias && esVaciaA && esVaciaB) {
                    sonIguales = true;
                }

                if (sonIguales) {
                    matriz[i + 1][j + 1] = matriz[i][j] + 1;
                } else {
                    matriz[i + 1][j + 1] = Math.max(matriz[i + 1][j], matriz[i][j + 1]);
                }
            }
        }

        const filasBrutas = [];
        let i = n, j = m;

        while (i > 0 || j > 0) {
            const sonIguales = i > 0 && j > 0 && normalizarTextoParaComparar(a[i - 1]) === normalizarTextoParaComparar(b[j - 1]);
            if (sonIguales) {
                filasBrutas.unshift({
                    tipo: 'igual',
                    textoA: a[i - 1],
                    textoB: b[j - 1],
                    numA: i,
                    numB: j
                });
                i--; j--;
            } else if (j > 0 && (i === 0 || matriz[i][j - 1] >= matriz[i - 1][j])) {
                filasBrutas.unshift({
                    tipo: 'agregada',
                    textoA: null,
                    textoB: b[j - 1],
                    numA: null,
                    numB: j
                });
                j--;
            } else if (i > 0 && (j === 0 || matriz[i][j - 1] < matriz[i - 1][j])) {
                filasBrutas.unshift({
                    tipo: 'eliminada',
                    textoA: a[i - 1],
                    textoB: null,
                    numA: i,
                    numB: null
                });
                i--;
            }
        }

        const filasAlineadas = [];
        let k = 0;
        while (k < filasBrutas.length) {
            const actual = filasBrutas[k];

            if (actual.tipo === 'igual') {
                filasAlineadas.push(actual);
                k++;
                continue;
            }

            const bloqueEliminadas = [];
            const bloqueAgregadas = [];

            while (k < filasBrutas.length && (filasBrutas[k].tipo === 'eliminada' || filasBrutas[k].tipo === 'agregada')) {
                if (filasBrutas[k].tipo === 'eliminada') bloqueEliminadas.push(filasBrutas[k]);
                else bloqueAgregadas.push(filasBrutas[k]);
                k++;
            }

            const maxFilasBloque = Math.max(bloqueEliminadas.length, bloqueAgregadas.length);
            for (let idx = 0; idx < maxFilasBloque; idx++) {
                const elemEliminado = bloqueEliminadas[idx] || null;
                const elemAgregado = bloqueAgregadas[idx] || null;

                if (elemEliminado && elemAgregado) {
                    filasAlineadas.push({
                        tipo: 'modificada',
                        textoA: elemEliminado.textoA,
                        textoB: elemAgregado.textoB,
                        numA: elemEliminado.numA,
                        numB: elemAgregado.numB
                    });
                } else if (elemEliminado) {
                    filasAlineadas.push({
                        tipo: 'eliminada',
                        textoA: elemEliminado.textoA,
                        textoB: null,
                        numA: elemEliminado.numA,
                        numB: null
                    });
                } else if (elemAgregado) {
                    filasAlineadas.push({
                        tipo: 'agregada',
                        textoA: null,
                        textoB: elemAgregado.textoB,
                        numA: null,
                        numB: elemAgregado.numB
                    });
                }
            }
        }

        return filasAlineadas;
    }

    // Actualiza los contadores de líneas y caracteres en la vista de edición
    function actualizarContadoresEdicionComparador() {
        const valorIzquierdo = textareaComparadorIzquierdo ? textareaComparadorIzquierdo.value : '';
        const valorDerecho = textareaComparadorDerecho ? textareaComparadorDerecho.value : '';

        const lineasIzquierda = valorIzquierdo ? valorIzquierdo.split('\n').length : 0;
        const lineasDerecha = valorDerecho ? valorDerecho.split('\n').length : 0;

        if (contadorIzquierdo) {
            contadorIzquierdo.textContent = `${lineasIzquierda} ${lineasIzquierda === 1 ? 'línea' : 'líneas'} (${valorIzquierdo.length} caracteres)`;
        }
        if (contadorDerecho) {
            contadorDerecho.textContent = `${lineasDerecha} ${lineasDerecha === 1 ? 'línea' : 'líneas'} (${valorDerecho.length} caracteres)`;
        }
    }

    // Alterna entre el modo de edición (escribir / pegar) y el modo visualizador de diferencias
    function cambiarModoVistaComparador(nuevoModo) {
        modoVistaComparador = nuevoModo;

        if (nuevoModo === 'edicion') {
            if (vistaEdicionComparacion) vistaEdicionComparacion.style.display = 'flex';
            if (vistaVisualComparacion) vistaVisualComparacion.style.display = 'none';

            if (btnModoEdicion) btnModoEdicion.classList.add('activa');
            if (btnModoVisual) btnModoVisual.classList.remove('activa');

            if (grupoVistasVisuales) grupoVistasVisuales.style.display = 'none';
            if (wrapFiltroLineas) wrapFiltroLineas.style.display = 'none';
            if (grupoNavegacionDiferencias) grupoNavegacionDiferencias.style.display = 'none';
            if (grupoStatsDiferencias) grupoStatsDiferencias.style.display = 'none';

            actualizarContadoresEdicionComparador();
        } else {
            if (vistaEdicionComparacion) vistaEdicionComparacion.style.display = 'none';
            if (vistaVisualComparacion) vistaVisualComparacion.style.display = 'flex';

            if (btnModoEdicion) btnModoEdicion.classList.remove('activa');
            if (btnModoVisual) btnModoVisual.classList.add('activa');

            if (grupoVistasVisuales) grupoVistasVisuales.style.display = 'flex';
            if (wrapFiltroLineas) wrapFiltroLineas.style.display = 'flex';
            if (grupoNavegacionDiferencias) grupoNavegacionDiferencias.style.display = 'flex';
            if (grupoStatsDiferencias) grupoStatsDiferencias.style.display = 'flex';

            ejecutarComparacionBeyond();
        }
    }

    let temporizadorComparacionAutomatica = null;

    // Programa una comparación automática en segundo plano con retardo de tecleo
    function programarComparacionAutomatica(forzarModoVisual = false) {
        clearTimeout(temporizadorComparacionAutomatica);
        temporizadorComparacionAutomatica = setTimeout(() => {
            ejecutarComparacionBeyond();
            if (forzarModoVisual) {
                cambiarModoVistaComparador('visual');
            }
        }, 120);
    }

    // Carga un archivo de texto arrastrado o seleccionado en el panel indicado
    function cargarArchivoEnLadoComparador(archivo, lado) {
        if (!archivo) return;
        const lector = new FileReader();
        lector.onload = (evento) => {
            const contenido = evento.target.result;
            if (lado === 'izquierdo' && textareaComparadorIzquierdo) {
                textareaComparadorIzquierdo.value = contenido;
                localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, contenido);
                actualizarContadoresEdicionComparador();
                ejecutarComparacionBeyond();
                setStatus(`Archivo "${archivo.name}" cargado en Lado Izquierdo`, 'success');
            } else if (lado === 'derecho' && textareaComparadorDerecho) {
                textareaComparadorDerecho.value = contenido;
                localStorage.setItem(CLAVE_COMPARADOR_DERECHO, contenido);
                actualizarContadoresEdicionComparador();
                ejecutarComparacionBeyond();
                cambiarModoVistaComparador('visual');
                setStatus(`Archivo "${archivo.name}" cargado en Lado Derecho y comparado`, 'success');
            }
        };
        lector.onerror = () => {
            setStatus(`Error al leer el archivo "${archivo.name}"`, 'error');
        };
        lector.readAsText(archivo);
    }

    // Configura el arrastre y suelta de archivos en las áreas de texto del comparador
    function configurarArrastreComparador(textarea, lado) {
        if (!textarea) return;
        textarea.addEventListener('dragover', (e) => {
            e.preventDefault();
            textarea.classList.add('dragover');
        });
        textarea.addEventListener('dragleave', () => {
            textarea.classList.remove('dragover');
        });
        textarea.addEventListener('drop', (e) => {
            e.preventDefault();
            textarea.classList.remove('dragover');
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                cargarArchivoEnLadoComparador(e.dataTransfer.files[0], lado);
            }
        });
    }

    // Pega contenido desde el portapapeles en el panel indicado y compara inmediatamente
    function pegarEnLadoComparador(textarea, claveStorage, nombreLado, cambiarAVisual = false) {
        if (!textarea) return;
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText().then(texto => {
                textarea.value = texto;
                localStorage.setItem(claveStorage, texto);
                actualizarContadoresEdicionComparador();
                ejecutarComparacionBeyond();
                if (cambiarAVisual) {
                    cambiarModoVistaComparador('visual');
                }
                setStatus(`Texto pegado en ${nombreLado} y comparado de inmediato`, 'success');
            }).catch(() => {
                textarea.focus();
                setStatus(`Pega el texto directamente en ${nombreLado} con Ctrl+V`, 'warning');
            });
        } else {
            textarea.focus();
            setStatus(`Pega el texto directamente en ${nombreLado} con Ctrl+V`, 'warning');
        }
    }

    // Copia texto al portapapeles con mensaje de estado informativo
    function copiarTextoLado(texto, nombreLado) {
        navigator.clipboard.writeText(texto || '').then(() => {
            setStatus(`Texto de ${nombreLado} copiado al portapapeles`, 'success');
        }).catch(() => {
            setStatus(`Error al copiar texto de ${nombreLado}`, 'error');
        });
    }

    // Limpia el contenido de uno de los paneles del comparador
    function limpiarLadoComparador(lado) {
        if (lado === 'izquierdo' && textareaComparadorIzquierdo) {
            textareaComparadorIzquierdo.value = '';
            localStorage.removeItem(CLAVE_COMPARADOR_IZQUIERDO);
            actualizarContadoresEdicionComparador();
            setStatus('Lado izquierdo limpiado', 'success');
        } else if (lado === 'derecho' && textareaComparadorDerecho) {
            textareaComparadorDerecho.value = '';
            localStorage.removeItem(CLAVE_COMPARADOR_DERECHO);
            actualizarContadoresEdicionComparador();
            setStatus('Lado derecho limpiado', 'success');
        }
        if (modoVistaComparador === 'visual') {
            ejecutarComparacionBeyond();
        }
    }

    // Importa el contenido actual del formateador hacia los paneles de comparación
    function importarTextosDesdeFormateador() {
        if (!textareaComparadorIzquierdo || !textareaComparadorDerecho) return;
        textareaComparadorIzquierdo.value = inputArea.value || '';
        textareaComparadorDerecho.value = currentOutput || '';

        localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, textareaComparadorIzquierdo.value);
        localStorage.setItem(CLAVE_COMPARADOR_DERECHO, textareaComparadorDerecho.value);

        actualizarContadoresEdicionComparador();
        cambiarModoVistaComparador('visual');
        setStatus('Textos del formateador cargados en el comparador', 'success');
    }

    // Ejecuta la comparación completa de textos y renderiza los paneles
    function ejecutarComparacionBeyond() {
        const textoA = textareaComparadorIzquierdo ? textareaComparadorIzquierdo.value : '';
        const textoB = textareaComparadorDerecho ? textareaComparadorDerecho.value : '';

        if (!textoA && !textoB) {
            if (statAgregadas) statAgregadas.textContent = '+0';
            if (statEliminadas) statEliminadas.textContent = '-0';
            if (statModificadas) statModificadas.textContent = '~0';
            if (contadorDiferencias) contadorDiferencias.textContent = 'Sin diferencias';
            listaDiferenciasBeyond = [];
            indiceDiferenciaActual = -1;

            const avisoVacio = '<div style="padding: 2.5rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;">No hay textos para comparar. Puedes volver a "Escribir / Pegar" para agregar contenido.</div>';
            if (gridComparacionIzquierdo) gridComparacionIzquierdo.innerHTML = avisoVacio;
            if (gridComparacionDerecho) gridComparacionDerecho.innerHTML = avisoVacio;
            if (gridComparacionUnificado) gridComparacionUnificado.innerHTML = avisoVacio;
            return;
        }

        const lineasA = textoA.split('\n');
        const lineasB = textoB.split('\n');

        const filasAlineadas = alinearLineasParaComparacion(lineasA, lineasB);

        // Agrupación de diferencias para navegación
        listaDiferenciasBeyond = [];
        let enDiferencia = false;
        let grupoActual = null;

        filasAlineadas.forEach((fila, indiceFila) => {
            if (fila.tipo !== 'igual') {
                if (!enDiferencia) {
                    enDiferencia = true;
                    grupoActual = {
                        indice: listaDiferenciasBeyond.length,
                        filaIndice: indiceFila,
                        tipo: fila.tipo
                    };
                    listaDiferenciasBeyond.push(grupoActual);
                }
                fila.indiceDiferencia = grupoActual.indice;
            } else {
                enDiferencia = false;
            }
        });

        // Contadores estadísticos
        let totalAgregadas = 0;
        let totalEliminadas = 0;
        let totalModificadas = 0;

        filasAlineadas.forEach(fila => {
            if (fila.tipo === 'agregada') totalAgregadas++;
            else if (fila.tipo === 'eliminada') totalEliminadas++;
            else if (fila.tipo === 'modificada') totalModificadas++;
        });

        if (statAgregadas) statAgregadas.textContent = `+${totalAgregadas}`;
        if (statEliminadas) statEliminadas.textContent = `-${totalEliminadas}`;
        if (statModificadas) statModificadas.textContent = `~${totalModificadas}`;

        if (contadorDiferencias) {
            contadorDiferencias.textContent = listaDiferenciasBeyond.length === 0
                ? 'Sin diferencias'
                : `${listaDiferenciasBeyond.length} ${listaDiferenciasBeyond.length === 1 ? 'diferencia' : 'diferencias'}`;
        }
        indiceDiferenciaActual = -1;

        if (opcionesComparacion.vista === 'paralela') {
            if (vistaComparacionParalela) vistaComparacionParalela.style.display = 'flex';
            if (vistaComparacionUnificada) vistaComparacionUnificada.style.display = 'none';
            renderizarVistaParalela(filasAlineadas);
        } else {
            if (vistaComparacionParalela) vistaComparacionParalela.style.display = 'none';
            if (vistaComparacionUnificada) vistaComparacionUnificada.style.display = 'flex';
            renderizarVistaUnificada(filasAlineadas);
        }
    }

    // Sincroniza la edición directa de líneas desde la vista visual hacia las áreas de texto
    function sincronizarEdicionLineaVisual(lado) {
        const contenedor = (lado === 'izquierdo') ? gridComparacionIzquierdo : gridComparacionDerecho;
        const textarea = (lado === 'izquierdo') ? textareaComparadorIzquierdo : textareaComparadorDerecho;
        const claveStorage = (lado === 'izquierdo') ? CLAVE_COMPARADOR_IZQUIERDO : CLAVE_COMPARADOR_DERECHO;

        if (!contenedor || !textarea) return;

        const filasReales = Array.from(contenedor.querySelectorAll('.beyond-fila:not(.beyond-fila-placeholder) .beyond-texto-linea'));
        const nuevoTexto = filasReales.map(span => span.textContent || '').join('\n');

        if (nuevoTexto !== textarea.value) {
            textarea.value = nuevoTexto;
            localStorage.setItem(claveStorage, nuevoTexto);
            actualizarContadoresEdicionComparador();
            ejecutarComparacionBeyond();
        }
    }

    // Dibuja las dos columnas en la vista lado a lado
    function renderizarVistaParalela(filasAlineadas) {
        if (!gridComparacionIzquierdo || !gridComparacionDerecho) return;
        gridComparacionIzquierdo.innerHTML = '';
        gridComparacionDerecho.innerHTML = '';

        filasAlineadas.forEach((fila, indiceFila) => {
            if (opcionesComparacion.filtroLineas === 'solo_diferencias' && fila.tipo === 'igual') return;
            if (opcionesComparacion.filtroLineas === 'solo_iguales' && fila.tipo !== 'igual') return;

            const elementoIzquierdo = document.createElement('div');
            const elementoDerecho = document.createElement('div');

            elementoIzquierdo.dataset.filaIndice = indiceFila;
            elementoDerecho.dataset.filaIndice = indiceFila;
            if (fila.indiceDiferencia !== undefined) {
                elementoIzquierdo.dataset.indiceDiferencia = fila.indiceDiferencia;
                elementoDerecho.dataset.indiceDiferencia = fila.indiceDiferencia;
            }

            if (fila.tipo === 'igual') {
                elementoIzquierdo.className = 'beyond-fila fila-igual';
                elementoDerecho.className = 'beyond-fila fila-igual';

                elementoIzquierdo.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-signo">&nbsp;</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="izquierdo">${escaparCaracteresHtml(fila.textoA || ' ')}</span>`;
                elementoDerecho.innerHTML = `<span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">&nbsp;</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="derecho">${escaparCaracteresHtml(fila.textoB || ' ')}</span>`;
            } else if (fila.tipo === 'modificada') {
                elementoIzquierdo.className = 'beyond-fila fila-modificada';
                elementoDerecho.className = 'beyond-fila fila-modificada';

                const intralinea = calcularDiferenciasIntralinea(fila.textoA, fila.textoB);
                elementoIzquierdo.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-signo">~</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="izquierdo">${intralinea.htmlIzquierdo}</span>`;
                elementoDerecho.innerHTML = `<span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">~</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="derecho">${intralinea.htmlDerecho}</span>`;
            } else if (fila.tipo === 'eliminada') {
                elementoIzquierdo.className = 'beyond-fila fila-eliminada';
                elementoDerecho.className = 'beyond-fila beyond-fila-placeholder';

                elementoIzquierdo.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-signo">-</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="izquierdo">${escaparCaracteresHtml(fila.textoA || ' ')}</span>`;
                elementoDerecho.innerHTML = `<span class="beyond-num-linea">&nbsp;</span><span class="beyond-signo">&nbsp;</span><span class="beyond-texto-linea">&nbsp;</span>`;
            } else if (fila.tipo === 'agregada') {
                elementoIzquierdo.className = 'beyond-fila beyond-fila-placeholder';
                elementoDerecho.className = 'beyond-fila fila-agregada';

                elementoIzquierdo.innerHTML = `<span class="beyond-num-linea">&nbsp;</span><span class="beyond-signo">&nbsp;</span><span class="beyond-texto-linea">&nbsp;</span>`;
                elementoDerecho.innerHTML = `<span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">+</span><span class="beyond-texto-linea" contenteditable="plaintext-only" spellcheck="false" data-lado="derecho">${escaparCaracteresHtml(fila.textoB || ' ')}</span>`;
            }

            gridComparacionIzquierdo.appendChild(elementoIzquierdo);
            gridComparacionDerecho.appendChild(elementoDerecho);
        });
    }

    // Dibuja el formato continuo en una sola columna unificada
    function renderizarVistaUnificada(filasAlineadas) {
        if (!gridComparacionUnificado) return;
        gridComparacionUnificado.innerHTML = '';

        filasAlineadas.forEach((fila, indiceFila) => {
            if (opcionesComparacion.filtroLineas === 'solo_diferencias' && fila.tipo === 'igual') return;
            if (opcionesComparacion.filtroLineas === 'solo_iguales' && fila.tipo !== 'igual') return;

            if (fila.tipo === 'modificada') {
                const intralinea = calcularDiferenciasIntralinea(fila.textoA, fila.textoB);

                const filaEliminada = document.createElement('div');
                filaEliminada.className = 'beyond-fila fila-eliminada';
                filaEliminada.dataset.filaIndice = indiceFila;
                if (fila.indiceDiferencia !== undefined) filaEliminada.dataset.indiceDiferencia = fila.indiceDiferencia;
                filaEliminada.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-num-linea">&nbsp;</span><span class="beyond-signo">-</span><span class="beyond-texto-linea">${intralinea.htmlIzquierdo}</span>`;
                gridComparacionUnificado.appendChild(filaEliminada);

                const filaAgregada = document.createElement('div');
                filaAgregada.className = 'beyond-fila fila-agregada';
                filaAgregada.dataset.filaIndice = indiceFila;
                if (fila.indiceDiferencia !== undefined) filaAgregada.dataset.indiceDiferencia = fila.indiceDiferencia;
                filaAgregada.innerHTML = `<span class="beyond-num-linea">&nbsp;</span><span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">+</span><span class="beyond-texto-linea">${intralinea.htmlDerecho}</span>`;
                gridComparacionUnificado.appendChild(filaAgregada);
                return;
            }

            const elementoFila = document.createElement('div');
            elementoFila.dataset.filaIndice = indiceFila;
            if (fila.indiceDiferencia !== undefined) elementoFila.dataset.indiceDiferencia = fila.indiceDiferencia;

            if (fila.tipo === 'igual') {
                elementoFila.className = 'beyond-fila fila-igual';
                elementoFila.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">&nbsp;</span><span class="beyond-texto-linea">${escaparCaracteresHtml(fila.textoA || ' ')}</span>`;
            } else if (fila.tipo === 'eliminada') {
                elementoFila.className = 'beyond-fila fila-eliminada';
                elementoFila.innerHTML = `<span class="beyond-num-linea">${fila.numA}</span><span class="beyond-num-linea">&nbsp;</span><span class="beyond-signo">-</span><span class="beyond-texto-linea">${escaparCaracteresHtml(fila.textoA || ' ')}</span>`;
            } else if (fila.tipo === 'agregada') {
                elementoFila.className = 'beyond-fila fila-agregada';
                elementoFila.innerHTML = `<span class="beyond-num-linea">&nbsp;</span><span class="beyond-num-linea">${fila.numB}</span><span class="beyond-signo">+</span><span class="beyond-texto-linea">${escaparCaracteresHtml(fila.textoB || ' ')}</span>`;
            }

            gridComparacionUnificado.appendChild(elementoFila);
        });
    }

    // Salta a la diferencia anterior o siguiente y centra los paneles sincronizados
    function navegarDiferencia(direccion) {
        if (listaDiferenciasBeyond.length === 0) return;

        indiceDiferenciaActual = (indiceDiferenciaActual + direccion + listaDiferenciasBeyond.length) % listaDiferenciasBeyond.length;

        const elementosPrevios = seccionComparador.querySelectorAll('.beyond-fila.diferencia-activa');
        elementosPrevios.forEach(el => el.classList.remove('diferencia-activa'));

        const elementosActivos = seccionComparador.querySelectorAll(`[data-indice-diferencia="${indiceDiferenciaActual}"]`);
        elementosActivos.forEach(el => el.classList.add('diferencia-activa'));

        if (elementosActivos.length > 0) {
            elementosActivos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        contadorDiferencias.textContent = `${indiceDiferenciaActual + 1} de ${listaDiferenciasBeyond.length}`;
    }

    // Abre el comparador Beyond Compare ocupando el espacio principal
    function abrirComparadorBeyond() {
        comparadorBeyondActivo = true;

        if (textareaComparadorIzquierdo && !textareaComparadorIzquierdo.value) {
            const guardadoIzquierdo = localStorage.getItem(CLAVE_COMPARADOR_IZQUIERDO);
            if (guardadoIzquierdo) textareaComparadorIzquierdo.value = guardadoIzquierdo;
        }
        if (textareaComparadorDerecho && !textareaComparadorDerecho.value) {
            const guardadoDerecho = localStorage.getItem(CLAVE_COMPARADOR_DERECHO);
            if (guardadoDerecho) textareaComparadorDerecho.value = guardadoDerecho;
        }

        contenedorPrincipal.style.display = 'none';
        seccionComparador.style.display = 'flex';
        botonModoDiff.classList.add('btn-special');

        actualizarContadoresEdicionComparador();

        const tieneIzquierdo = textareaComparadorIzquierdo && textareaComparadorIzquierdo.value.trim().length > 0;
        const tieneDerecho = textareaComparadorDerecho && textareaComparadorDerecho.value.trim().length > 0;

        if (tieneIzquierdo && tieneDerecho) {
            cambiarModoVistaComparador('visual');
            setStatus('Comparador activo: diferencias calculadas automáticamente', 'success');
        } else {
            cambiarModoVistaComparador('edicion');
            if (!tieneIzquierdo && textareaComparadorIzquierdo) {
                textareaComparadorIzquierdo.focus();
            } else if (!tieneDerecho && textareaComparadorDerecho) {
                textareaComparadorDerecho.focus();
            }
            setStatus('Comparador activo: escribe o pega tus textos para comparar de inmediato', 'success');
        }
    }

    // Cierra el comparador y restaura la vista estándar del editor
    function cerrarComparadorBeyond() {
        comparadorBeyondActivo = false;
        seccionComparador.style.display = 'none';
        contenedorPrincipal.style.display = 'flex';
        botonModoDiff.classList.remove('btn-special');
        setStatus('Listo', '');
    }

    // Alterna la visibilidad del módulo comparador
    function alternarModoComparador() {
        if (comparadorBeyondActivo) {
            cerrarComparadorBeyond();
        } else {
            abrirComparadorBeyond();
        }
    }

    // Intercambia el contenido de la columna izquierda con la derecha
    function intercambiarLadosComparacion() {
        if (!textareaComparadorIzquierdo || !textareaComparadorDerecho) return;
        const aux = textareaComparadorIzquierdo.value;
        textareaComparadorIzquierdo.value = textareaComparadorDerecho.value;
        textareaComparadorDerecho.value = aux;

        localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, textareaComparadorIzquierdo.value);
        localStorage.setItem(CLAVE_COMPARADOR_DERECHO, textareaComparadorDerecho.value);

        actualizarContadoresEdicionComparador();

        if (modoVistaComparador === 'visual') {
            ejecutarComparacionBeyond();
        }
        setStatus('Lados de comparación intercambiados', 'success');
    }

    // Sincronización de scroll fluido entre ambos paneles
    let sincronizandoScroll = false;
    scrollComparacionIzquierdo.addEventListener('scroll', () => {
        if (sincronizandoScroll) return;
        sincronizandoScroll = true;
        scrollComparacionDerecho.scrollTop = scrollComparacionIzquierdo.scrollTop;
        scrollComparacionDerecho.scrollLeft = scrollComparacionIzquierdo.scrollLeft;
        requestAnimationFrame(() => { sincronizandoScroll = false; });
    });
    scrollComparacionDerecho.addEventListener('scroll', () => {
        if (sincronizandoScroll) return;
        sincronizandoScroll = true;
        scrollComparacionIzquierdo.scrollTop = scrollComparacionDerecho.scrollTop;
        scrollComparacionIzquierdo.scrollLeft = scrollComparacionDerecho.scrollLeft;
        requestAnimationFrame(() => { sincronizandoScroll = false; });
    });

    let indiceCoincidenciaActual = -1;
    let elementosCoincidencia = [];

    // Abre la barra de búsqueda y enfoca su campo
    function abrirBarraBusqueda() {
        if (comparadorBeyondActivo) cerrarComparadorBeyond();
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
        // Atajo Alt+T o Ctrl+Alt+N para abrir nueva pestaña
        if ((e.altKey && e.key.toLowerCase() === 't') || (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'n')) {
            e.preventDefault();
            crearNuevaPestana();
            return;
        }

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
            if (comparadorBeyondActivo) cerrarComparadorBeyond();
        }

        if (comparadorBeyondActivo && (e.key === 'F7' || e.key === 'F8')) {
            e.preventDefault();
            navegarDiferencia(e.shiftKey ? -1 : 1);
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
    botonModoDiff.addEventListener('click', alternarModoComparador);
    downloadBtn.addEventListener('click', openDownloadModal);
    downloadConfirmBtn.addEventListener('click', executeDownload);
    downloadCancelBtn.addEventListener('click', closeDownloadModal);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    convertCloseBtn.addEventListener('click', closeConvertModal);

    btnCerrarComparador.addEventListener('click', cerrarComparadorBeyond);
    btnModoEdicion.addEventListener('click', () => cambiarModoVistaComparador('edicion'));
    btnModoVisual.addEventListener('click', () => cambiarModoVistaComparador('visual'));

    btnEditarIzquierdoDesdeVisual.addEventListener('click', () => {
        cambiarModoVistaComparador('edicion');
        if (textareaComparadorIzquierdo) textareaComparadorIzquierdo.focus();
    });
    btnEditarDerechoDesdeVisual.addEventListener('click', () => {
        cambiarModoVistaComparador('edicion');
        if (textareaComparadorDerecho) textareaComparadorDerecho.focus();
    });
    btnEditarDesdeUnificada.addEventListener('click', () => {
        cambiarModoVistaComparador('edicion');
        if (textareaComparadorIzquierdo) textareaComparadorIzquierdo.focus();
    });

    btnPegarIzquierdo.addEventListener('click', () => {
        pegarEnLadoComparador(textareaComparadorIzquierdo, CLAVE_COMPARADOR_IZQUIERDO, 'Lado Izquierdo');
    });
    btnPegarDerecho.addEventListener('click', () => {
        pegarEnLadoComparador(textareaComparadorDerecho, CLAVE_COMPARADOR_DERECHO, 'Lado Derecho', true);
    });

    if (btnPegarVisualIzquierdo) {
        btnPegarVisualIzquierdo.addEventListener('click', () => {
            pegarEnLadoComparador(textareaComparadorIzquierdo, CLAVE_COMPARADOR_IZQUIERDO, 'Lado Izquierdo', true);
        });
    }
    if (btnPegarVisualDerecho) {
        btnPegarVisualDerecho.addEventListener('click', () => {
            pegarEnLadoComparador(textareaComparadorDerecho, CLAVE_COMPARADOR_DERECHO, 'Lado Derecho', true);
        });
    }

    if (btnLimpiarVisualIzquierdo) {
        btnLimpiarVisualIzquierdo.addEventListener('click', () => limpiarLadoComparador('izquierdo'));
    }
    if (btnLimpiarVisualDerecho) {
        btnLimpiarVisualDerecho.addEventListener('click', () => limpiarLadoComparador('derecho'));
    }

    if (btnVerDiffDesdeEditorIzquierdo) {
        btnVerDiffDesdeEditorIzquierdo.addEventListener('click', () => cambiarModoVistaComparador('visual'));
    }
    if (btnVerDiffDesdeEditorDerecho) {
        btnVerDiffDesdeEditorDerecho.addEventListener('click', () => cambiarModoVistaComparador('visual'));
    }

    btnCopiarEdicionIzquierdo.addEventListener('click', () => {
        copiarTextoLado(textareaComparadorIzquierdo ? textareaComparadorIzquierdo.value : '', 'Lado Izquierdo');
    });
    btnCopiarEdicionDerecho.addEventListener('click', () => {
        copiarTextoLado(textareaComparadorDerecho ? textareaComparadorDerecho.value : '', 'Lado Derecho');
    });
    btnCopiarTextoIzquierdo.addEventListener('click', () => {
        copiarTextoLado(textareaComparadorIzquierdo ? textareaComparadorIzquierdo.value : '', 'Lado Izquierdo');
    });
    btnCopiarTextoDerecho.addEventListener('click', () => {
        copiarTextoLado(textareaComparadorDerecho ? textareaComparadorDerecho.value : '', 'Lado Derecho');
    });

    btnLimpiarIzquierdo.addEventListener('click', () => limpiarLadoComparador('izquierdo'));
    btnLimpiarDerecho.addEventListener('click', () => limpiarLadoComparador('derecho'));

    inputArchivoIzquierdo.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            cargarArchivoEnLadoComparador(e.target.files[0], 'izquierdo');
            e.target.value = '';
        }
    });
    inputArchivoDerecho.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            cargarArchivoEnLadoComparador(e.target.files[0], 'derecho');
            e.target.value = '';
        }
    });

    textareaComparadorIzquierdo.addEventListener('input', () => {
        localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, textareaComparadorIzquierdo.value);
        actualizarContadoresEdicionComparador();
        programarComparacionAutomatica(false);
    });
    textareaComparadorIzquierdo.addEventListener('paste', () => {
        setTimeout(() => {
            localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, textareaComparadorIzquierdo.value);
            actualizarContadoresEdicionComparador();
            ejecutarComparacionBeyond();
            setStatus('Texto pegado en Lado A y comparado automáticamente', 'success');
        }, 40);
    });
    textareaComparadorIzquierdo.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            cambiarModoVistaComparador('visual');
        }
    });

    textareaComparadorDerecho.addEventListener('input', () => {
        localStorage.setItem(CLAVE_COMPARADOR_DERECHO, textareaComparadorDerecho.value);
        actualizarContadoresEdicionComparador();
        programarComparacionAutomatica(false);
    });
    textareaComparadorDerecho.addEventListener('paste', () => {
        setTimeout(() => {
            localStorage.setItem(CLAVE_COMPARADOR_DERECHO, textareaComparadorDerecho.value);
            actualizarContadoresEdicionComparador();
            ejecutarComparacionBeyond();
            cambiarModoVistaComparador('visual');
            setStatus('Texto pegado en Lado B y comparado automáticamente', 'success');
        }, 40);
    });
    textareaComparadorDerecho.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            cambiarModoVistaComparador('visual');
        }
    });

    gridComparacionIzquierdo.addEventListener('blur', (e) => {
        if (e.target && e.target.classList.contains('beyond-texto-linea')) {
            sincronizarEdicionLineaVisual('izquierdo');
        }
    }, true);

    gridComparacionDerecho.addEventListener('blur', (e) => {
        if (e.target && e.target.classList.contains('beyond-texto-linea')) {
            sincronizarEdicionLineaVisual('derecho');
        }
    }, true);

    gridComparacionIzquierdo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target && e.target.classList.contains('beyond-texto-linea')) {
            e.preventDefault();
            e.target.blur();
        }
    });

    gridComparacionDerecho.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target && e.target.classList.contains('beyond-texto-linea')) {
            e.preventDefault();
            e.target.blur();
        }
    });

    seccionComparador.addEventListener('paste', (e) => {
        if (document.activeElement === textareaComparadorIzquierdo || document.activeElement === textareaComparadorDerecho) {
            return;
        }
        if (document.activeElement && document.activeElement.classList.contains('beyond-texto-linea')) {
            return;
        }
        const textoPegado = e.clipboardData ? e.clipboardData.getData('text') : '';
        if (!textoPegado) return;

        const estaSobreIzquierdo = scrollComparacionIzquierdo && scrollComparacionIzquierdo.matches(':hover');
        if (estaSobreIzquierdo) {
            e.preventDefault();
            textareaComparadorIzquierdo.value = textoPegado;
            localStorage.setItem(CLAVE_COMPARADOR_IZQUIERDO, textoPegado);
            actualizarContadoresEdicionComparador();
            ejecutarComparacionBeyond();
            setStatus('Texto pegado en Lado A y comparado automáticamente', 'success');
        } else {
            e.preventDefault();
            textareaComparadorDerecho.value = textoPegado;
            localStorage.setItem(CLAVE_COMPARADOR_DERECHO, textoPegado);
            actualizarContadoresEdicionComparador();
            ejecutarComparacionBeyond();
            setStatus('Texto pegado en Lado B y comparado automáticamente', 'success');
        }
    });

    btnVistaParalela.addEventListener('click', () => {
        opcionesComparacion.vista = 'paralela';
        btnVistaParalela.classList.add('activa');
        btnVistaUnificada.classList.remove('activa');
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    btnVistaUnificada.addEventListener('click', () => {
        opcionesComparacion.vista = 'unificada';
        btnVistaUnificada.classList.add('activa');
        btnVistaParalela.classList.remove('activa');
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    btnDistinguirMayusculas.addEventListener('click', () => {
        opcionesComparacion.distinguirMayusculas = !opcionesComparacion.distinguirMayusculas;
        btnDistinguirMayusculas.classList.toggle('activa', opcionesComparacion.distinguirMayusculas);
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    selectModoEspacios.addEventListener('change', () => {
        opcionesComparacion.modoEspacios = selectModoEspacios.value;
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    btnIgnorarLineasVacias.addEventListener('click', () => {
        opcionesComparacion.ignorarLineasVacias = !opcionesComparacion.ignorarLineasVacias;
        btnIgnorarLineasVacias.classList.toggle('activa', opcionesComparacion.ignorarLineasVacias);
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    selectFiltroLineas.addEventListener('change', () => {
        opcionesComparacion.filtroLineas = selectFiltroLineas.value;
        if (modoVistaComparador === 'visual') ejecutarComparacionBeyond();
    });

    btnDiferenciaAnterior.addEventListener('click', () => navegarDiferencia(-1));
    btnDiferenciaSiguiente.addEventListener('click', () => navegarDiferencia(1));
    btnIntercambiarLados.addEventListener('click', intercambiarLadosComparacion);
    btnImportarFormateador.addEventListener('click', importarTextosDesdeFormateador);

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

    botonNuevaPestana.addEventListener('click', () => {
        crearNuevaPestana();
    });

    languageSelect.addEventListener('change', () => {
        const pestanaActual = coleccionPestanas.find(pestana => pestana.id === idPestanaActiva);
        if (pestanaActual) {
            pestanaActual.lenguaje = languageSelect.value;
            guardarPestanasAlmacenadas();
            renderizarBarraPestanas();
        }
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
    inicializarSistemaPestanas();
    setupDragAndDrop();
    renderizarHistorial();
    configurarArrastreComparador(textareaComparadorIzquierdo, 'izquierdo');
    configurarArrastreComparador(textareaComparadorDerecho, 'derecho');
    actualizarContadoresEdicionComparador();
});
