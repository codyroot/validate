# Validate.js

A Library to Validate your forms.

## Usage
### Theoretical

Validate({  
    form: #id 
	// All fields will be validated
    inputs: {
		//id: Reg Exp  
        field: RegExp,  
    }  
});

### Practical

Validate({  
    form: "#form" 
    inputs: {  
        tel: /^[\+\(\)\s0-9]+$/,
        email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i
    }  

&lt;form action=&quot;#&quot; method=&quot;get&quot; id=&quot;form&quot;&gt;
    &lt;div&gt;
        &lt;label for=&quot;vorname&quot; class=&quot;required&quot;&gt;Firstname&lt;/label&gt;
        &lt;input pattern=&quot;[a-zA-Z\s]+&quot; data-support=&quot;text&quot; id=&quot;vorname&quot; name=&quot;vorname&quot; type=&quot;text&quot;
            placeholder=&quot;Max&quot; title=&quot;Only Letters!&quot; required /&gt;
        &lt;span class=&quot;info&quot; title=&quot;Only Letters!&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/form&gt;
## Browsersupport

Internet Explorer 7+  
Mozilla Firefox 3.6+  
Google Chrome 4+  
Safari 5+  
Opera 11+  