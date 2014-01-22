// JSHint Errors
/*global window */
/*global document */
/*global console */
/*global alert */
/*global navigator */

var Validate = (function (config) {
    "use strict";

    // Variablen
    var doc = document,
        con = config,
        // Typ des Paramaters ermitteln
        arg = Array.prototype.slice.call(arguments)[0],
        // Ist das Argument ein String
        isString = typeof arg === "string",
        // ID des Formulars im String oder Objekt 
        form = (isString) ? doc.querySelector(arg) : doc.querySelector(con.form),
        // Alle Inputfelder im Formular
        fields = (isString) ? doc.querySelectorAll(con + " input") : doc.querySelectorAll(con.form + " input"),
        // Anzahl der korrekt ausgefüllten Felder
        validFields = (isString) ? doc.querySelectorAll(arg + " .true").length : doc.querySelectorAll(con.form + " .true").length,
        // IDs der zu validierenden Inputs mit den RegExp --> für Custom Reg
        input = (con.inputs) ? con.inputs : false,

    // Default RegExp Werte
        defaultReg = {
            text: /^[a-zA-Z\s]+$/,
            tel: /^[\+\(\)\s\-0-9]+$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
            number: /^[0-9]+$/,
            postcodeGer: /^[0-9]{5}$/,
            street: /^[a-zA-ZäöüÄÖÜ \.]+ [0-9]+[a-zA-Z]?/,
            fullname: /^[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜ]+$/,
            ip4: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
            ip6: /^(([0-9A-Fa-f]{1,4}:){1,7}|:)(:|([0-9A-Fa-f]{1,4}:){1,7})$/,
            isbn: /^(ISBN )?\d-\d{6}-\d\d-\d$/
        },

    // insert span for the error message
        insertElement = function () {
            for (var i = 0; i < fields.length; i++) {
                var title = (fields[i].title) ? fields[i].title : "";
                if (!/submit|reset|checkbox|radio|number/.test(fields[i].type)) {
                    if (dataAttribut(fields[i], "reg")) {
                        // Konvertieren von RegExp zu Strings
                        var setPattern = defaultReg[dataAttribut(fields[i], "reg")].toString();
                        // Bestimmte zeichen aus dem Pattern Löschen
                        fields[i].setAttribute("pattern", setPattern
                        .replace(/\//g, "")
                        .replace(/\^/g, "")
                        .replace(/i/, "")
                        .replace(/\$/, ""));
                        // Native Pflichtfeldfunktion
                        fields[i].setAttribute("required", "required");
                    }

                    // Append span.info
                    fields[i].insertAdjacentHTML("afterend", "<span class='info' title='" + title + "'></span>");
                }
                // deprecated
                fields[i].setAttribute("data-support", fields[i].type);
            }
        },

    // Feature Detection
        supportType = function (type) {
            // if (/a|b|c/.test(val))
            var i = document.createElement("input");
            i.setAttribute("type", type);
            return i.type === type;
        },

    // Pattern Attribut bereinigen
        clearPattern = function (el) {
            return el.toString().replace(/\//g, "").replace(/\^/g, "").replace(/\$/, "");
        },

    // IE Fallback for nextElementSibling
        nextSibling = function (el) {
            if (el.nextElementSibling) {
                el = el.nextElementSibling;
            } else {
                do {
                    el = el.nextSibling;
                } while (el && el.nodeType !== 1);
            }
            // Styling the Element after the input
            el.style.position = "relative";
            el.setAttribute("class", "info");
            return el;
        },

    // Datenattribut bestimmen
        dataAttribut = function (el, att) {
            if (el.dataset) {
                el = el.dataset[att];
            } else {
                el = el.getAttribute("data-" + att);
            }
            return el;
        },

    // Länge der zu überprüfenden Felder aus dem Objekt auslesen
        objLength = function (obj) {
            var size = 0,
                // argumente in array umwandeln
                arg = Array.prototype.slice.call(arguments)[0],
                key;

            if (arg.length) {
                for (var i = 0; i < arg.length; i++) {
                    if (arg[i].hasAttribute("data-reg")) {
                        size++;
                    }
                }
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        size++;
                        // Pflichtfeld setzen
                        doc.getElementById(key).setAttribute("required", "required");
                    }
                }
            }
            return size;
        },

    // Länge der zu überprüfenden Felder
        countFields = (input) ? objLength(input) : objLength(fields),

    // Nachricht ob Eingabe korrekt ist oder nicht
        insertMsg = function (el, bool) {
            var nextElement = nextSibling(el),
                title = (el.title) ? el.title : "Incorrect input!",
                pos = function () {
                    return nextElement.firstChild.offsetHeight / 2 - nextElement.offsetHeight / 2;
                };
            if (bool) {
                el.setAttribute("class", "true");
                nextElement.innerHTML = "<span class='errorBox errorTrue'>✔ Correct Input!</span>";
            } else {
                el.setAttribute("class", "false");
                nextElement.innerHTML = "<span class='errorBox errorFalse'>" + title + "</span>";
            }
            // Positionswert
            nextElement.firstChild.style.top = -pos() + "px";
        },

    // Event Delegation
        event = function (evt) {
            var el = eventUtility.getTarget(evt), // Element HTML
                tag = el.tagName, // Tagname -> Rückgabe in CAPS
                id = (el.id) ? el.id : "", // id -> damit wird im Aufrufobjekt die id geholt mit RegExp
                len = (el.value) ? el.value.length : 0, // Pflichtfeld
                dataSupport = dataAttribut(el, "support"), // Daten Attribut Support auslesen
                support = supportType(dataSupport), // Element Supported true/false --> Fallback wenn nix angegeben auf Standardtype
                defReg = defaultReg[dataAttribut(el, "reg")], // Default RegExp type=support
                inputId = (input[id]) ? input[id] : defReg, // Custom RegExp oder Autoren
                replacePattern = (inputId) ? inputId.toString().replace(/\//g, "").replace(/\^/g, "").replace(/\$/, "").replace(/i/, "") : defReg,
                // Wert im input nicht überschreiben wenn gesetzt
                // Custom RegExp überschreibt den Autoren RegExp des pattern Attributes
                reg = (inputId) ? inputId : defReg,
                pattern = el.pattern; // Ersetztes Pattern

            // Reg Exp aus dem Objekt oder den default Werten
            if (replacePattern !== pattern && inputId) {
                el.setAttribute("pattern", replacePattern);
                console.log("DOM Zugriff");
            }

            pattern = el.pattern;
            console.log((pattern));

            // Bei input Feldern
            if ((tag === "INPUT") && reg) {

                // Wird das inputfeld unterstützt
                // Untersteht es der automatischen Validierung
                // Ist ein pattern Wert gesetzt
                if (el.willValidate && pattern) {
                    console.log("checkValidity()");
                    // el.setAttribute("pattern", input[id].toString().replace(/\//g, "").replace(/\^/g, "").replace(/\$/, ""));
                    // HTML 5 E-Mail Validierung JavaScript API + Länge des Felder
                    if (el.checkValidity() && len > 0) {
                        // Nur DOM Zugriff bei Veränderung
                        if (!el.classList.contains('true')) {
                            insertMsg(el, true);
                        }
                    } else {
                        if (!el.classList.contains("false")) {
                            insertMsg(el, false);
                        }
                    }
                    // keine Unterstützung oben aufgeführter Vorausetzungen
                } else {
                    console.log("match()");
                    if (el.value.match(reg) && len > 0) {
                        insertMsg(el, true);
                    } else {
                        insertMsg(el, false);
                    }
                }
            }
        },

        // Send
        send = function (evt) {
            // Aufruf nochmals, da querySel. keine Live NodeLists zurückgeben
            validFields = (isString) ? doc.querySelectorAll(arg + " .true").length : doc.querySelectorAll(con.form + " .true").length;

            // Vergleich valide Felder mit Anzahl der zu valid. Felder
            if (countFields !== validFields) {
                eventUtility.preventDefault(evt);
                alert("Formular nicht abgeschickt");
            }

            console.log(countFields + " || " + validFields);
            alert(countFields + " || " + validFields);
        },
        // IE 6 - 9 Detection
        isIe = /MSIE 7.0|MSIE 8.0|MSIE 9.0/.test(navigator.userAgent),

// Implementierung nach Init-Time Branching
        // Eventschnittstelle
        eventUtility = {
            addEvent: null,
            getTarget: null,
            preventDefault: null
        };

    // Moderne Browser
    if (typeof window.addEventListener === 'function') {
        eventUtility.addEvent = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        eventUtility.preventDefault = function (event) {
            event.preventDefault();
        };
        eventUtility.getTarget = function (event) {
            return event.target;
        };
        // IE < 9
    } else if (doc.attachEvent) {
        console.log("dfasdfasdf");
        eventUtility.addEvent = function (el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        eventUtility.preventDefault = function (event) {
            event.returnValue = false;
        };
        eventUtility.getTarget = function (event) {
            return event.srcElement;
        };
        // ältere Browser
    } else {
        eventUtility.addEvent = function (el, type, fn) {
            el['on' + type] = fn;
        };
    }

    // Cross Browser Events
    // input oder keyup Event Detection
    if ('oninput' in document.createElement('input') && !isIe) {
        // IE 9-- erkennt Rücktaste nicht
        eventUtility.addEvent(form, "input", event);
        console.log("Input");

    } else {
        eventUtility.addEvent(form, "keyup", event);
        console.log("Keyup");
    }
    // Change event - da kopieren mgl ist
    eventUtility.addEvent(form, "change", event);
    // Append spans after the inputs
    eventUtility.addEvent(window, "load", insertElement);
    // Senden Button
    eventUtility.addEvent(form, "submit", send);

    // Reset Formular
    form.reset();
});