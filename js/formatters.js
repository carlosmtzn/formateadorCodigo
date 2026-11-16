/**
 * formatters.js - Lógica de formateo, minificación, validación, conversión y detección de lenguaje
 */
const Formatters = {
    getIndentStr(indentType = '4') {
        if (indentType === '2') return '  ';
        if (indentType === 'tab') return '\t';
        return '    '; // default 4
    },

    getIndentOptions(indentType = '4') {
        const isTab = indentType === 'tab';
        const size = indentType === '2' ? 2 : (isTab ? 1 : 4);
        return {
            indent_size: size,
            indent_char: isTab ? '\t' : ' ',
            max_preserve_newlines: 2,
            preserve_newlines: true,
            keep_array_indentation: false,
            break_chained_methods: false,
            indent_scripts: 'normal',
            brace_style: 'collapse',
            space_before_conditional: true,
            unescape_strings: false,
            jslint_happy: false,
            end_with_newline: false,
            wrap_line_length: 0,
            comma_first: false,
            e4x: false,
            indent_empty_lines: false
        };
    },

    formatXML(xml, indentStr = '  ') {
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

            formatted += indentStr.repeat(pad) + node.trim() + '\n';
            pad += indent;
        });

        return formatted.trim();
    },

    formatJSON(json, indentStr = '  ') {
        const parsed = JSON.parse(json);
        const indent = indentStr === '\t' ? '\t' : indentStr.length;
        return JSON.stringify(parsed, null, indent);
    },

    formatHTML(html, indentStr = '  ') {
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

            formatted += indentStr.repeat(pad) + node.trim() + '\n';
            pad += indent;
        });

        return formatted.trim();
    },

    // Tokenizador y formateador robusto para Java/JavaScript (incluso con código minificado de 1 sola línea)
    formatCStyleFallback(code, indentStr = '    ') {
        let result = '';
        let indent = 0;
        let inString = false;
        let stringChar = '';
        let inCommentLine = false;
        let inCommentBlock = false;
        let parenDepth = 0;

        // Normalizar saltos de línea iniciales
        const clean = code.trim();

        for (let i = 0; i < clean.length; i++) {
            const char = clean[i];
            const nextChar = clean[i + 1] || '';
            const prevChar = clean[i - 1] || '';

            // Manejo de cadenas
            if (inString) {
                result += char;
                if (char === stringChar && prevChar !== '\\') {
                    inString = false;
                }
                continue;
            }

            // Manejo de comentarios de línea
            if (inCommentLine) {
                result += char;
                if (char === '\n') {
                    inCommentLine = false;
                    result += indentStr.repeat(indent);
                }
                continue;
            }

            // Manejo de comentarios de bloque
            if (inCommentBlock) {
                result += char;
                if (char === '*' && nextChar === '/') {
                    result += '/';
                    i++;
                    inCommentBlock = false;
                }
                continue;
            }

            if (char === '/' && nextChar === '/') {
                inCommentLine = true;
                result += '//';
                i++;
                continue;
            }

            if (char === '/' && nextChar === '*') {
                inCommentBlock = true;
                result += '/*';
                i++;
                continue;
            }

            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
                result += char;
                continue;
            }

            if (char === '(') {
                parenDepth++;
                result += char;
                continue;
            }

            if (char === ')') {
                parenDepth = Math.max(0, parenDepth - 1);
                result += char;
                continue;
            }

            if (char === '{') {
                indent++;
                result = result.trimEnd() + ' {\n' + indentStr.repeat(indent);
                continue;
            }

            if (char === '}') {
                indent = Math.max(0, indent - 1);
                result = result.trimEnd() + '\n' + indentStr.repeat(indent) + '}\n' + indentStr.repeat(indent);
                continue;
            }

            if (char === ';' && parenDepth === 0) {
                result += ';\n' + indentStr.repeat(indent);
                continue;
            }

            result += char;
        }

        return result
            .split('\n')
            .map(line => line.trimEnd())
            .filter((line, idx, arr) => !(line.trim() === '' && arr[idx - 1]?.trim() === ''))
            .join('\n')
            .trim();
    },

    formatJava(code, indentType = '4') {
        const indentStr = this.getIndentStr(indentType);
        if (typeof window !== 'undefined' && window.js_beautify) {
            try {
                return window.js_beautify(code, this.getIndentOptions(indentType));
            } catch (e) {
                console.warn('Error en js_beautify para Java, usando fallback:', e);
            }
        }
        return this.formatCStyleFallback(code, indentStr);
    },

    formatJavaScript(code, indentType = '4') {
        const indentStr = this.getIndentStr(indentType);
        if (typeof window !== 'undefined' && window.js_beautify) {
            try {
                return window.js_beautify(code, this.getIndentOptions(indentType));
            } catch (e) {
                console.warn('Error en js_beautify para JS, usando fallback:', e);
            }
        }
        return this.formatCStyleFallback(code, indentStr);
    },

    formatSQL(sql, indentStr = '  ') {
        const keywords = [
            'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 
            'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
            'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'ON', 'INSERT INTO', 
            'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'UNION ALL', 'UNION', 
            'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE', 'AS', 'IN', 'NOT IN', 
            'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'DISTINCT', 'CASE', 
            'WHEN', 'THEN', 'ELSE', 'END'
        ];

        let formatted = sql.trim().replace(/\s+/g, ' ');

        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'gi');
            formatted = formatted.replace(regex, kw);
        });

        const lineBreakClauses = [
            'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 
            'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
            'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'INSERT INTO', 'VALUES', 
            'UPDATE', 'SET', 'DELETE FROM', 'UNION ALL', 'UNION'
        ];

        lineBreakClauses.forEach(clause => {
            const regex = new RegExp(`(\\s*)\\b(${clause})\\b`, 'g');
            formatted = formatted.replace(regex, '\n$2');
        });

        const lines = formatted.split('\n');
        let result = '';

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            if (/^(AND|OR|ON|SET|VALUES)\b/.test(line)) {
                result += indentStr + line + '\n';
            } else {
                result += line + '\n';
            }
        });

        return result.trim();
    },

    format(code, language, indentType = '4') {
        const indentStr = this.getIndentStr(indentType);
        switch (language) {
            case 'xml':
                return this.formatXML(code, indentStr);
            case 'json':
                return this.formatJSON(code, indentStr);
            case 'html':
                return this.formatHTML(code, indentStr);
            case 'java':
                return this.formatJava(code, indentType);
            case 'javascript':
                return this.formatJavaScript(code, indentType);
            case 'sql':
                return this.formatSQL(code, indentStr);
            default:
                return code;
        }
    },

    minify(input, language) {
        if (language === 'json') {
            const parsed = JSON.parse(input);
            return JSON.stringify(parsed);
        } else if (language === 'sql') {
            return input
                .replace(/--.*$/gm, '')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s+/g, ' ')
                .replace(/\s*([,()=<>+*-])\s*/g, '$1')
                .trim();
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
                new Function(input);
                return true;
            case 'java':
                const openBraces = (input.match(/{/g) || []).length;
                const closeBraces = (input.match(/}/g) || []).length;
                if (openBraces !== closeBraces) {
                    throw new Error(`Llaves no balanceadas (abiertas: ${openBraces}, cerradas: ${closeBraces})`);
                }
                return true;
            case 'sql':
                const openParen = (input.match(/\(/g) || []).length;
                const closeParen = (input.match(/\)/g) || []).length;
                if (openParen !== closeParen) {
                    throw new Error(`Paréntesis no balanceados (abiertos: ${openParen}, cerrados: ${closeParen})`);
                }
                const singleQuotes = (input.match(/'/g) || []).length;
                if (singleQuotes % 2 !== 0) {
                    throw new Error('Comillas simples no cerradas en la consulta SQL');
                }
                return true;
            default:
                return true;
        }
    },


    jsonToXml(jsonStr, indentType = '4') {
        const data = JSON.parse(jsonStr);
        const indentStr = this.getIndentStr(indentType);

        function toXml(val, name = 'item', ind = 0) {
            const pad = indentStr.repeat(ind);
            if (val === null || val === undefined) {
                return `${pad}<${name}/>`;
            }
            if (typeof val !== 'object') {
                const escaped = String(val)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
                return `${pad}<${name}>${escaped}</${name}>`;
            }
            if (Array.isArray(val)) {
                return val.map(item => toXml(item, name, ind)).join('\n');
            }
            let res = `${pad}<${name}>\n`;
            for (const [k, v] of Object.entries(val)) {
                const validKey = k.replace(/[^a-zA-Z0-9_\-]/g, '_') || 'prop';
                res += toXml(v, validKey, ind + 1) + '\n';
            }
            res += `${pad}</${name}>`;
            return res;
        }

        if (Array.isArray(data)) {
            return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${data.map(item => toXml(item, 'item', 1)).join('\n')}\n</root>`;
        } else if (typeof data === 'object') {
            return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(data, 'root', 0)}`;
        } else {
            return `<?xml version="1.0" encoding="UTF-8"?>\n<root>${data}</root>`;
        }
    },

    xmlToJson(xmlStr, indentType = '4') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');

        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('XML Inválido: ' + parserError.textContent);
        }

        function xmlToObj(node) {
            if (node.nodeType === 3) {
                return node.nodeValue.trim();
            }
            if (node.nodeType === 1) {
                const obj = {};
                if (node.attributes && node.attributes.length > 0) {
                    obj['@attributes'] = {};
                    for (let i = 0; i < node.attributes.length; i++) {
                        const attr = node.attributes[i];
                        obj['@attributes'][attr.name] = attr.value;
                    }
                }
                let hasElementChildren = false;
                for (let i = 0; i < node.childNodes.length; i++) {
                    const child = node.childNodes[i];
                    if (child.nodeType === 1) {
                        hasElementChildren = true;
                        const childObj = xmlToObj(child);
                        if (obj[child.nodeName]) {
                            if (!Array.isArray(obj[child.nodeName])) {
                                obj[child.nodeName] = [obj[child.nodeName]];
                            }
                            obj[child.nodeName].push(childObj);
                        } else {
                            obj[child.nodeName] = childObj;
                        }
                    }
                }
                if (!hasElementChildren) {
                    const text = node.textContent.trim();
                    if (Object.keys(obj).length === 0) return text;
                    if (text) obj['#text'] = text;
                }
                return obj;
            }
            return null;
        }

        const resultObj = {};
        const rootElement = xmlDoc.documentElement;
        resultObj[rootElement.nodeName] = xmlToObj(rootElement);

        const indent = indentType === 'tab' ? '\t' : (indentType === '2' ? 2 : 4);
        return JSON.stringify(resultObj, null, indent);
    },

    detectLanguage(code) {
        const trimmed = code.trim();
        if (!trimmed) return null;

        // 1. JSON
        if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
            try {
                JSON.parse(trimmed);
                return 'json';
            } catch (e) {
                // Posible JSON o código
            }
        }

        // 2. HTML / XML
        if (trimmed.startsWith('<')) {
            if (/<!DOCTYPE\s+html/i.test(trimmed) || /<html[\s>]/i.test(trimmed) || /<body[\s>]/i.test(trimmed) || /<div[\s>]/i.test(trimmed)) {
                return 'html';
            }
            return 'xml';
        }

        // 3. SQL
        if (/^\s*(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE|WITH)\b/i.test(trimmed)) {
            return 'sql';
        }

        // 4. Java
        if (/\b(public\s+class|System\.out\.println|package\s+[a-z0-9_.]+|import\s+java\.)\b/.test(trimmed)) {
            return 'java';
        }

        // 5. JavaScript
        if (/\b(const\s+\w+|let\s+\w+|var\s+\w+|function\s*\(|function\s+\w+|console\.log|=>)\b/.test(trimmed)) {
            return 'javascript';
        }

        return null;
    }
};

window.Formatters = Formatters;
