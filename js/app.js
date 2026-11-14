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
    
    // Selectores y Controles
    const languageSelect = document.getElementById('languageSelect');
    const indentSelect = document.getElementById('indentSelect');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validBtn = document.getElementById('validBtn');
    const convertBtn = document.getElementById('convertBtn');
    const statsBtn = document.getElementById('statsBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const status = document.getElementById('status');

    // Botones de pantalla completa
    const expandInputBtn = document.getElementById('expandInputBtn');
    const expandOutputBtn = document.getElementById('expandOutputBtn');

    // Modales
    const statsModal = document.getElementById('statsModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const convertModal = document.getElementById('convertModal');
    const convertCloseBtn = document.getElementById('convertCloseBtn');
    const convertJsonToXmlBtn = document.getElementById('convertJsonToXmlBtn');
    const convertXmlToJsonBtn = document.getElementById('convertXmlToJsonBtn');
    const downloadModal = document.getElementById('downloadModal');
    const downloadFilenameInput = document.getElementById('downloadFilenameInput');
    const downloadExtensionBadge = document.getElementById('downloadExtensionBadge');
    const downloadCancelBtn = document.getElementById('downloadCancelBtn');
    const downloadConfirmBtn = document.getElementById('downloadConfirmBtn');

    let currentOutput = '';

    // ==========================================
    // 1. GESTIÓN DE TEMA Y PREFERENCIAS
    // ==========================================
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

    // ==========================================
    // 2. RESALTADO Y SALIDA DE CÓDIGO
    // ==========================================
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

        if (window.Prism && !isError) {
            Prism.highlightElement(outputCode);
        }
    }

    function setStatus(message, type = '') {
        status.textContent = message;
        status.className = 'status ' + type;
    }

    // ==========================================
    // 3. ACCIONES PRINCIPALES
    // ==========================================
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
        setStatus('Listo', '');
    }

    function showStatistics() {
        const input = inputArea.value;
        const stats = Formatters.getStats(input, currentOutput);

        const statsContent = document.getElementById('statsContent');
        statsContent.innerHTML = `
            <div><strong>Código Original:</strong></div>
            <div><span>Líneas:</span><span>${stats.inputLines}</span></div>
            <div><span>Caracteres:</span><span>${stats.inputChars}</span></div>
            <div><span>Palabras:</span><span>${stats.inputWords}</span></div>
            <br>
            <div><strong>Código Procesado:</strong></div>
            <div><span>Líneas:</span><span>${stats.outputLines}</span></div>
            <div><span>Caracteres:</span><span>${stats.outputChars}</span></div>
            <div><span>Reducción / Cambio:</span><span>${stats.reduction}%</span></div>
        `;

        statsModal.style.display = 'block';
    }

    function closeStats() {
        statsModal.style.display = 'none';
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

    // ==========================================
    // 4. CONVERSIÓN ENTRE FORMATOS
    // ==========================================
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

    // ==========================================
    // 5. DRAG & DROP DE ARCHIVOS
    // ==========================================
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

    // ==========================================
    // 6. DETECCIÓN AUTOMÁTICA AL PEGAR
    // ==========================================
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

    // ==========================================
    // 7. PANTALLA COMPLETA / MAXIMIZAR PANELES
    // ==========================================
    function toggleFullscreen(panel, btn) {
        const isFull = panel.classList.toggle('fullscreen');
        btn.textContent = isFull ? '✕' : '⛶';
        btn.setAttribute('title', isFull ? 'Salir de pantalla completa' : 'Pantalla completa');
    }

    expandInputBtn.addEventListener('click', () => toggleFullscreen(inputPanel, expandInputBtn));
    expandOutputBtn.addEventListener('click', () => toggleFullscreen(outputPanel, expandOutputBtn));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (inputPanel.classList.contains('fullscreen')) {
                toggleFullscreen(inputPanel, expandInputBtn);
            }
            if (outputPanel.classList.contains('fullscreen')) {
                toggleFullscreen(outputPanel, expandOutputBtn);
            }
            closeStats();
            closeConvertModal();
            closeDownloadModal();
        }
    });

    // ==========================================
    // 8. EVENT LISTENERS GENERALES
    // ==========================================
    formatBtn.addEventListener('click', formatCode);
    minifyBtn.addEventListener('click', minifyCode);
    validBtn.addEventListener('click', validateCode);
    convertBtn.addEventListener('click', openConvertModal);
    statsBtn.addEventListener('click', showStatistics);
    downloadBtn.addEventListener('click', openDownloadModal);
    downloadConfirmBtn.addEventListener('click', executeDownload);
    downloadCancelBtn.addEventListener('click', closeDownloadModal);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    modalCloseBtn.addEventListener('click', closeStats);
    convertCloseBtn.addEventListener('click', closeConvertModal);

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
        if (event.target === statsModal) closeStats();
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

    // ==========================================
    // 9. REGISTRO PWA (SERVICE WORKER)
    // ==========================================
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
});
