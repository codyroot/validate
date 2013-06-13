# Validate.js - BETA v0.1

Validate.js ist eine kleine Bibliothek zum validieren von Formularen.
Dabei kommt die HTML5-Validerungs API und eine Fallbacklösung für ältere Browser zum Einsatz.

## Verwendung - Option 1
Die Verwendung von Validate.js benötigt folgende Schritte:  
**1:** Die Datei validate.js am Ende des Body Elementes eingebunden werden.  
**2:** Das Form Element benötigt ein id Attribut.
**3:** In das zu validierende Formularfeld muss das Attribut **data-reg** mit dem dazugehörigen Validierungswert notiert werden.  
**4:** Die Funktion Validate(id) muss in einen seperaten script Element aufgerufen werden. Als Parameter muss die id des Formularelements eingetragen werden.  
*Hinweis*: Ist das data-reg Attribut gesetzt, wird das Formularfeld automatisch zu einem Pflichtfeld.  
*Optional*: Einbinden der validate.css, um das vorgefertigte Styling der Fehlerboxen zu verwenden.
### JavaScript 
```javascript
// Im Parameter muss per id Selektor, die **id** des Formulares übergeben werden.
Validate("#form");
```
### HTML Requirements
Mit der Angabe des **data-reg** Attributes im HTML wird festgelegt wie das Feld validiert werden soll.
In dem Beispiel ist die Eingabe einer deutschen Postleitzahl notwendig, welche aus genau 5 Zahlen besteht.
```html
<form id="form">
	<input
	data-reg="postcodeGer"
	type="text" />
	<!-- Fehlerbox erscheint im span Element nach dem input, das span wird automatisch erzeugt -->
	<!-- Zum Stylen steht die Klasse info bereit -->
</form>
```

## Verwendung - Option 2
Validate.js erlaubt auch die Verwendung von eigenen **Regulären Ausdrücken**.  
**1** Das jeweilige Formularfeld muss eine id zugewiesen werden.  
**2** Die Funktion Validate(object) erwartet dabei ein JSON Objekt im Parameter.  
**3** In die Eigenschaft **form** muss die id des Formulares eingetragen werden.  
**4** Im **inputs** Objekt wird als Eigenschaftsname die id des zu validierenden Formularfeldes eingetragen.. 
**4** Als Wert bekommt die Eigenschaft den eigenen Regulären Ausdruck übergeben.  

*Hinweis 1:* Im inputs Objekt können mehrere Eigenschaften eingegeben werden.  
*Hinweis 2:* Die Nachricht im Fehlerfeld wird aus dem title Attribut des input Elementes generiert.  
### JavaScript
```javascript
Validate({
	// id des Formulares  
    form: "#form", 
		// id: RegExp
        tel: /^[\+\(\)\s0-9]+$/,
		street: /[a-zA-ZäöüÄÖÜ \.]+ [0-9]+[a-zA-Z]?/
    }
});
```
###HTML
```html
<form id="form">
	<input 	id="tel" type="tel" />
</form>
```
## Styling
### Errorbox
Zum Styling der Fehlernachrichten stehen 3 Klassen zur Verfügung.
**Position:** .info   
**Box:** .errorBox   
**Text:** .errorTrue & .errorFalse

####Beispieldatei validate.css
```css
/*
------------------------------------------------- Info Hover
*/
.info {
    cursor: help;
    position: relative;
    display: inline-block;
    background: #fff url(../img/info.png) left 0 no-repeat;
    min-width: 20px;
    height: 20px;
    margin-left: 5px;
}
/*
------------------------------------------------- Error Text
*/
.errorTrue {
	color: limegreen;
}

.errorFalse {
	color: red;
}

/*
------------------------------------------------- Error Box
*/
.errorBox {
	font-size: 0.625em;
	border: 1px solid #d0d0d0;
	position: absolute;
	left: 33px;
	padding: 4px;
	background: #fff;
	border-radius: 6px;
	box-shadow: 1px 1px 3px #d0d0d0;	
}

.errorBox:after, .errorBox:before {
	right: 100%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
}

.errorBox:after {
	border-color: transparent;
	border-right-color: #fff;
	border-width: 12px;
	top: 50%;
	margin-top: -12px;
}

.errorBox:before {
	border-color: transparent;
	border-right-color: #d0d0d0;
	border-width: 13px;
	top: 50%;
	margin-top: -13px;
}
```

## Browsersupport

Internet Explorer 8+  
Mozilla Firefox 3.6+  
Google Chrome 1+  
Safari 5+  
Opera 9.6+  

##Bugtracker
Number Fields
