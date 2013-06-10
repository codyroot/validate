# Validate.js

A Library to Validate your forms.

## Usage
### Theoretical
```javascript
Validate({  
    form: #id 
	// These fields will be validated
    inputs: {
		// id: Reg Exp  
        field: RegExp,  
    }  
});
```

### Practical
#### JavaScript
```javascript
Validate({  
    form: "#form" 
    inputs: {  
        tel: /^[\+\(\)\s0-9]+$/
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
	<!-- Error Message shows up in the next Element , in this case the span-->
	<span title="Only Numbers, +, and ()"></span>
</form>
```
## Styling
### Errorbox
There are 3 classes available for styling the error messages.
The Element will be appended in the next Element after the input.

**Position and Border:** .errorBox   
**Textcolors:** .errorTrue & .errorFalse

###Example Styling
```css
.errorTrue {
	color: limegreen;
}

.errorFalse {
	color: red;
}

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
