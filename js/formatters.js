/**
 * formatters.js - Lógica de formateo, minificación y validación de código
 */
const Formatters = {
    formatXML(xml) {
        const PADDING = '  ';
        const reg = /(>)(<)(\/*)/g;
        let formatted = '';
        let pad = 0;

        xml = xml.replace(reg, '$1\n$2$3');
        
        xml.split('\n').forEach(node => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/) && pad > 0) {
                pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            formatted += PADDING.repeat(pad) + node + '\n';
            pad += indent;
        });

        return formatted.trim();
    },

    formatJSON(json) {
        const parsed = JSON.parse(json);
        return JSON.stringify(parsed, null, 2);
    },

    formatHTML(html) {
        const PADDING = '  ';
        const reg = /(>)(<)(\/*)/g;
        let formatted = '';
        let pad = 0;

        html = html.replace(reg, '$1\n$2$3');
        
        html.split('\n').forEach(node => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/) && pad > 0) {
                pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            formatted += PADDING.repeat(pad) + node + '\n';
            pad += indent;
        });

        return formatted.trim();
    },

    formatJava(code) {
        const lines = code.split('\n');
        let formatted = '';
        let indentLevel = 0;
        const INDENT = '    ';

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            if (line.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            formatted += INDENT.repeat(indentLevel) + line + '\n';

            if (line.endsWith('{')) {
                indentLevel++;
            }
        });

        return formatted.trim();
    },

    formatJavaScript(code) {
        const lines = code.split('\n');
        let formatted = '';
        let indentLevel = 0;
        const INDENT = '  ';

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            if (line.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            formatted += INDENT.repeat(indentLevel) + line + '\n';

            if (line.endsWith('{')) {
                indentLevel++;
            }
        });

        return formatted.trim();
    },

    format(code, language) {
        switch (language) {
            case 'xml':
                return this.formatXML(code);
            case 'json':
                return this.formatJSON(code);
            case 'html':
                return this.formatHTML(code);
            case 'java':
                return this.formatJava(code);
            case 'javascript':
                return this.formatJavaScript(code);
            default:
                return code;
        }
    },

    minify(input, language) {
        if (language === 'json') {
            const parsed = JSON.parse(input);
            return JSON.stringify(parsed);
        } else {
            return input
                .replace(/\s+/g, ' ')
                .replace(/\s*([{}\[\];:,])\s*/g, '$1')
                .replace(/;\s*}/g, '}')
                .trim();
        }
    },

    validate(input, language) {
        switch (language) {
            case 'json':
                JSON.parse(input);
                return true;
            case 'xml':
            case 'html':
                const openTags = (input.match(/<\w+/g) || []).length;
                const closeTags = (input.match(/<\/\w+>/g) || []).length;
                if (openTags !== closeTags) {
                    throw new Error(`Discrepancia en etiquetas (abiertas: ${openTags}, cerradas: ${closeTags})`);
                }
                return true;
            case 'javascript':
                // Validación básica de sintaxis JS usando Function constructor
                new Function(input);
                return true;
            case 'java':
                // Validación de llaves balanceadas
                const openBraces = (input.match(/{/g) || []).length;
                const closeBraces = (input.match(/}/g) || []).length;
                if (openBraces !== closeBraces) {
                    throw new Error(`Llaves no balanceadas (abiertas: ${openBraces}, cerradas: ${closeBraces})`);
                }
                return true;
            default:
                return true;
        }
    },

    getStats(input, output) {
        const inputLines = input ? input.split('\n').length : 0;
        const inputChars = input ? input.length : 0;
        const inputWords = input.trim() ? input.trim().split(/\s+/).filter(w => w.length > 0).length : 0;

        const outputLines = output ? output.split('\n').length : 0;
        const outputChars = output ? output.length : 0;
        const reduction = inputChars > 0 ? Math.round((1 - outputChars / inputChars) * 100) : 0;

        return {
            inputLines,
            inputChars,
            inputWords,
            outputLines,
            outputChars,
            reduction
        };
    }
};

window.Formatters = Formatters;
