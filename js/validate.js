var Validate = (function (config) {
    "use strict";

// Variablen
    var doc = document,
        con = config,
        // Typ des Paramaters ermitteln
        arg = arguments[0],
        // Ist das Argument ein String
        isString = typeof arg === "string",
        // ID des Formulars im String oder Objekt 
        form = (isString) ? doc.querySelector(arg) : doc.querySelector(con.form),
        // IDs der zu validierenden Inputs mit den RegExp --> für Custom Reg
        input = (con.inputs) ? con.inputs : false,
        // Alle Inputfelder im Formular
        fields = (isString) ? doc.querySelectorAll(arg + " input") : input,
        // Anzahl der korrekt ausgefüllten Felder
        validFields = (isString) ? doc.querySelectorAll(arg + ".true").length : doc.querySelectorAll(con.form + " .true").length,
        // RegExp aus dem Objekt + DOM Zugriff auf die des inputs + input Value Länge
        reg, field,

    // Default RegExp Werte
        defaultReg = {
            // Standard RegExp
            text: /^[a-z\s]+$/i,
            tel: /^[\+\(\)\s\-0-9]+$/,
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i,
            number: /^[0-9]+$/,
            // Autoren RegExp in der data-reg
            postcodeGer: /^[0-9]{5}$/,
            street: /[a-zA-ZäöüÄÖÜ \.]+ [0-9]+[a-zA-Z]?/,
            fullname: /[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜ]+/
        },

    // Cross Browser Events
        eventUtility = {
            addEvent: function (el, type, fn) {
                if (el.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent("on" + type, fn);
                } else {
                    el["on" + type] = fn;
                }
            },

            getTarget: function (event) {
                if (event.target) {
                    return event.target;
                } else {
                    return event.srcElement;
                }
            },

            preventDefault: function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        },

    // insert span for the error message
        insertElement = function () {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].type !== "submit") {
                    if (fields[i].type !== "number" && dataAttribut(fields[i], "reg")) {
                        console.log("Felder Number FF");
                        // Konvertieren von RegExp zu Strings
                        var setPattern = defaultReg[dataAttribut(fields[i], "reg")].toString();
                        // Bestimmte zeichen aus dem Pattern Löschen
                        fields[i].setAttribute("pattern", setPattern
                        .replace(/\//g, "")
                        .replace(/\^/g, "")
                        .replace(/i/, "")
                        .replace(/\$/, ""));
                    }
                    // Append span.info
                    fields[i].insertAdjacentHTML("afterend", "<span class='info'></span>");
                    fields[i].setAttribute("data-support", fields[i].type);
                }
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
        clearPattern = function (el){
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
                arg = arguments[0],
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
                    }
                }
            }
            return size;
        },

    // Länge der zu überprüfenden Felder
        countFields = objLength(fields),

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
            console.log("><>>DOM Access");
            // Positionswert
            nextElement.firstChild.style.top = -pos() + "px";
        },

    // Event Delegation
        event = function (evt) {
            var el = eventUtility.getTarget(evt), // Element HTML
                tag = el.tagName, // Tagname -> Rückgabe in CAPS
                id = el.id, // id -> damit wird im Aufrufobjekt die id geholt mit RegExp
                pattern = el.pattern, // RegExp im input
                dataSupport = dataAttribut(el, "support"), // Daten Attribut Support auslesen
                support = supportType(dataSupport), // Element Supported true/false --> Fallback wenn nix angegeben auf Standardtype
                defReg = defaultReg[dataAttribut(el, "reg")], // Default RegExp type=support
                inputId = (input[id]) ? input[id] : defReg, // Custom RegExp oder Autoren
                replacePattern = (inputId) ? inputId.toString().replace(/\//g, "").replace(/\^/g, "").replace(/\$/, "").replace(/i/, "") : defReg;

            // Wert im input nicht überschreiben wenn gesetzt
            // Custom RegExp überschreibt den Autoren RegExp des pattern Attributes
            reg = (inputId) ? inputId : defReg;

            // Reg Exp aus dem Objekt oder den default Werten
            if (replacePattern !== pattern && inputId) {                    
                el.setAttribute("pattern", replacePattern);   
                console.log("DOM############pattern überschrieben");
            }

            console.log(inputId);
            console.log("Reg: " + reg);
            console.log("Supported: " + support);

            // Bei input Feldern 
            if ((tag === "INPUT") && reg) {
                field = doc.querySelector("#" + id);

                // Wird das inputfeld unterstützt
                // Untersteht es der automatischen Validierung
                // Ist ein pattern Wert gesetzt               
                if (field.willValidate && support && pattern) {
                    // el.setAttribute("pattern", input[id].toString().replace(/\//g, "").replace(/\^/g, "").replace(/\$/, ""));
                    // HTML 5 E-Mail Validierung JavaScript API + Länge des Felder
                    if (field.checkValidity()) {
                        // Nur DOM Zugriff bei Veränderung
                        if(!el.classList.contains('true')) {
                            insertMsg(el, true);
                        }
                    } else {
                        if(!el.classList.contains("false")) {
                            insertMsg(el, false);
                        }                        
                    }
                    console.log("checkValidity()");
                    // keine Unterstützung oben aufgeführter Vorausetzungen
                } else {
                    if (field.value.match(reg)) {
                        insertMsg(el, true);
                    } else {
                        insertMsg(el, false);
                    }
                    console.log("match()");
                }
            }
        },

        // Send
        send = function (evt) {
            // Aufruf nochmals, da querySel. keine Live NodeLists zurückgeben
            validFields = doc.querySelectorAll(con.form + " .true").length;
            console.dir(validFields);

            // Pflichtfelder
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].value < 1) {
                    eventUtility.preventDefault(evt);
                    console.log("a");
                }
            };

            // Vergleich valide Felder mit Anzahl der zu valid. Felder
            if (countFields !== validFields) {
                eventUtility.preventDefault(evt);
                alert("Formular nicht abgeschickt");
            }

            console.log(countFields + " || " + validFields);
            alert(countFields + " || " + validFields);
        };

    // Cross Browser Events
    eventUtility.addEvent(form, "keyup", event);
    eventUtility.addEvent(form, "change", event);

    // Append spans after the inputs
    eventUtility.addEvent(window, "load", insertElement);

    // Senden Button
    eventUtility.addEvent(form, "submit", send);

    // Reset Formular
    form.reset();
});