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
```javascript
Validate({  
    form: "#form" 
    inputs: {  
        tel: /^[\+\(\)\s0-9]+$/
    }
});
```
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
## Browsersupport

Internet Explorer 7+  
Mozilla Firefox 3.6+  
Google Chrome 4+  
Safari 5+  
Opera 11+  
