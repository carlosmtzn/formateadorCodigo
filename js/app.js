/**
 * app.js - Control de interfaz, eventos, resaltado con Prism y Modo Oscuro
 */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const inputArea = document.getElementById('input');
    const outputCode = document.getElementById('outputCode');
    const outputContainer = document.getElementById('outputContainer');
    const outputPlaceholder = document.getElementById('outputPlaceholder');
    const languageSelect = document.getElementById('languageSelect');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validBtn = document.getElementById('validBtn');
    const statsBtn = document.getElementById('statsBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const status = document.getElementById('status');
    const statsModal = document.getElementById('statsModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    let currentOutput = '';

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ Modo Claro';
            themeToggleBtn.setAttribute('title', 'Cambiar a modo claro');
        } else {
            themeToggleBtn.innerHTML = '🌙 Modo Oscuro';
            themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function getPrismLanguage(lang) {
        const map = {
            'xml': 'markup',
            'html': 'markup',
            'json': 'json',
            'javascript': 'javascript',
            'java': 'java'
        };
        return map[lang] || 'markup';
    }

    function updateOutput(code, isError = false) {
        currentOutput = code;
        
        if (!code) {
            outputPlaceholder.style.display = 'block';
            outputCode.style.display = 'none';
            outputCode.textContent = '';
            return;
        }

        outputPlaceholder.style.display = 'none';
        outputCode.style.display = 'block';
        outputCode.textContent = code;

        const lang = languageSelect.value;
        const prismLang = getPrismLanguage(lang);

        outputCode.className = `language-${prismLang}`;
        if (outputCode.parentElement) {
            outputCode.parentElement.className = `language-${prismLang}`;
        }

        if (window.Prism && !isError) {
            Prism.highlightElement(outputCode);
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

        try {
            const formatted = Formatters.format(input, language);
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
            updateOutput('✓ El código es válido y no presenta errores de sintaxis básicos.');
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

    function downloadCode() {
        if (!currentOutput) {
            setStatus('Error: No hay código para descargar', 'error');
            return;
        }

        const language = languageSelect.value;
        const extensions = {
            'xml': '.xml',
            'json': '.json',
            'html': '.html',
            'java': '.java',
            'javascript': '.js'
        };

        const blob = new Blob([currentOutput], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const element = document.createElement('a');
        element.href = url;
        element.download = 'codigo_formateado' + (extensions[language] || '.txt');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(url);

        setStatus('✓ Archivo descargado correctamente', 'success');
    }


    formatBtn.addEventListener('click', formatCode);
    minifyBtn.addEventListener('click', minifyCode);
    validBtn.addEventListener('click', validateCode);
    statsBtn.addEventListener('click', showStatistics);
    downloadBtn.addEventListener('click', downloadCode);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    modalCloseBtn.addEventListener('click', closeStats);

    languageSelect.addEventListener('change', () => {
        if (currentOutput) {
            // Re-resaltar si se cambia el lenguaje
            updateOutput(currentOutput);
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === statsModal) {
            closeStats();
        }
    });

    // Auto-formatear al pegar con pequeño delay
    let pasteTimeout;
    inputArea.addEventListener('paste', () => {
        clearTimeout(pasteTimeout);
        pasteTimeout = setTimeout(formatCode, 150);
    });

    // Atajo de teclado: Ctrl + Enter para formatear
    inputArea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            formatCode();
        }
    });

    // Inicializar tema al cargar
    initTheme();
});
