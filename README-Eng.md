# Validate.js - BETA v0.1

A Library to Validate your forms.

## Usage
### Minimal Example
#### JavaScript 
```javascript
Validate({  
	// form: id of the form in this case
    form: "#form", 
	// These fields will be validated
    inputs: {
	// id of the <input>: RegExp  
        tel: false, // or add a custom RegExp  
    }  
});
```

#### HTML Requirements
The **id** and the **data-support** Attribut are required. The value of the **data-support** must be equal as **the type value**.
```html
<form id="form">
	<input
	data-support="tel"
	id="tel"
	type="tel" />
	<!-- Error Message shows up in the span Element, which will be automatically appended into the DOM-->
	<!-- For Custom Styling use the class info -->
</form>
```

### More Advanced Example
#### JavaScript
```javascript
Validate({  
    form: "#form", 
    inputs: {  
		vorname: /^[a-z\s]+$/i,
        tel: /^[\+\(\)\s0-9]+$/,
    }
});
```
####HTML
```html
<form id="form">
	<input pattern="[\+\(\)\s0-9]+"
	data-support="tel"
	id="tel"
	name="tel"
	type="tel"
	title="Only Numbers, +, and ()"
	required />
</form>
```
## Styling
### Errorbox
There are 3 classes available for styling the error messages.
The Element will be appended into the info span.  
**Position:** .info   
**Box Styling:** .errorBox   
**Textcolors:** .errorTrue & .errorFalse

####Example Styling @validate.css
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
