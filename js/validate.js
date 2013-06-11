var Validate = (function (config) {
    "use strict";

    var doc = document, 
        win = window, 
        con = config, 
        input = (con.inputs) ? con.inputs : false, 
        form = doc.querySelector(con.form), 
        validFields = doc.querySelectorAll(con.form + " .true").length, 
        reg, field, valueLen,
        
        // Default RegExp Werte
        defaultReg = {
            text: /^[A-Za-z\s]+$/,
            tel: /^[\+\(\)\s0-9]+$/,
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i,
            number: /^[0-9]+$/
        },

        eventUtility = {
            addEvent : function(el, type, fn) {
                if (el.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent("on" + type, fn);
                } else {
                    el["on" + type] = fn;
                }
            },

            getTarget : function(event) {
                if (event.target) {
                    return event.target;
                } else {
                    return event.srcElement;
                }
            },
   
            preventDefault : function(event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        },

    // Feature Detection
        supportType = function (type) {
            var i = document.createElement("input");
            i.setAttribute("type", type);
            return i.type === type;
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
            return el;
        },

    // Date Attributt
        dataAttribut = function (el, att) {
            if (el.dataset) {
                el = el.dataset[att];
            } else {
                el = el.getAttribute("data-" + att);
            }
            return el;
        },

    // Length valid fields
        objLength = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        },

    // Length all Fields
        countFields = objLength(input),

    // Message
        insertMsg = function (el, bool) {
            var nextElement = nextSibling(el),
                title = (el.title) ? el.title : "Incorrect input!",
                pos = function () { 
                    return nextElement.firstChild.offsetHeight / 2 - nextElement.offsetHeight / 2;
                };

            if (bool) {
                el.setAttribute("class", "true");
                nextElement.innerHTML = "<span class='errorBox errorTrue'>✔ Correct Input!</span>"; //
            } else {
                el.setAttribute("class", "false");
                nextElement.innerHTML = "<span class='errorBox errorFalse' title='asda'>" + title + "</span>";
            }
            nextElement.firstChild.style.top = -pos() + "px";
        },

    // Event Delegation
        event = function (evt) {

            var el = eventUtility.getTarget(evt), // Element HTML
                tag = el.tagName, // Tagname -> Rückgabe in CAPS
                id = el.id, // id -> damit wird im Aufrufobjekt die id geholt mit RegExp
                pattern = el.pattern, // RegExp im input
                support = supportType(dataAttribut(el, "support"));

            // Reg Exp aus dem Objekt
            reg = (input[id]) ? input[id] : defaultReg[dataAttribut(el,"support")]

            console.log(reg);
            console.log(countFields + "||" + validFields);

            // Bei input Feldern
            if ((tag === "INPUT") && reg) {
                field = doc.querySelector("#" + id);
                // required oder fail
                valueLen = (field.value.length > 0); // nicht verwendet aktuell

                // Wird das inputfeld unterstützt und untersteht es der automatischen Validierung
                if (support && field.willValidate && pattern) {

                    // HTML 5 E-Mail Validierung JavaScript API + Länge des Felder
                    if (field.checkValidity()) {
                        insertMsg(el, true);
                    } else {
                        insertMsg(el, false);
                    }
                    console.log("Supported");

                    // keine Unterstützung des inputs
                } else {
                    if (field.value.match(reg)) {
                        insertMsg(el, true);
                    } else {
                        insertMsg(el, false);
                    }
                    console.log("Browser untertstützt das Feld und/oder die automat. Validierung nicht!");
                }
            }
        };

    // Cross Browser Events
    eventUtility.addEvent(form, "keyup", event);
    eventUtility.addEvent(form, "change", event);

    // Senden Button
    eventUtility.addEvent(form, "submit", function (evt) {
        // form.addEventListener("submit", function (e) {

        // Aufruf nochmals, da querySel. keine Live NodeLists zurückgeben
        validFields = doc.querySelectorAll(con.form + " .true").length;
        console.dir(validFields);

        alert(countFields + " || " + validFields);

        // Vergleich valide Felder mit Anzahl der zu valid. Felder
        if (countFields !== validFields) {
            eventUtility.preventDefault(evt);
            alert("Formular nicht abgeschickt");
        }
        console.log(countFields + " || " + validFields);

    });
});
