/**
 *	@title currencyUp.js
 * @description Formats US currency in form fields.
 * @author Tim S. Long
 * @modified October 11, 2016
 * @license MIT
 */
;var currencyUp = (function(){
	var options = {
		dollarSign: true,
		onblur: true,
		initial: null,
		element: null
	};

	// Initiate the element.
	var currencyUp = function(opts){
		if(this === window) {
			return new currencyUp(opts);
		}

		for(var x in options) {
			if(typeof opts[x] !== "undefined") {
				options[x] = opts[x];
			}
		}
		
		if(!options.element) {
			return;
		}

		if(typeof options.initial === "string") {
			options.element.value = (options.dollarSign ? "$" : "") + setCurrency(parseFloat(options.initial.replace(/[^0-9.\-]/g, "") || 0, 10));
		} else if(typeof options.initial === "number") {
			options.element.value = (options.dollarSign ? "$" : "") + setCurrency(options.initial);
		}

		if(options.onblur) {
			options.element.addEventListener("focus", focusCurrency, false);
			options.element.addEventListener("blur", blurCurrency, false);
		}
		
		options.element.addEventListener("keyup", keyupCurrency, false);
	}; // End currencyUp() constructor.
	
	var focusCurrency = function(){
		this.value = this.value.replace(/[^0-9.\-]/g, "");
	};

	var blurCurrency = function(){
		this.value = (options.dollarSign ? "$" : "") + setCurrency(this.value.replace(/[^0-9.\-]/g, ""));
	};

	var keyupCurrency = function(){
		if(options.onblur) {
			this.value = this.value.replace(/[^0-9.\-]/g, "");
		} else {
			var val = parseFloat(this.value.replace(/[^0-9.\-]/g, "") || 0, 10);
			//this.value = (options.dollarSign ? "$" : "") + setCurrency(val); // Note the cursor moving to the end of the input. UI fail.
		}
	};

	// Format to standard US currency.
	var setCurrency = function(num){
		if(!num) {
			return "0.00";
		}
		
		var neg = num < 0 ? true : false;
		num = Math.abs(num);
		
		var change = num.toFixed(2).split("."),
			dollars = change[0], cents = change[1],
			dollarsRev = dollars.split("").reverse();

		for(var i = 3; i < dollarsRev.length; i += 3) {
			dollarsRev.splice(i, 0, ",");
			i++;
		}
		
		return dollarsRev.reverse().join("") + "." + cents;
	};
	
	// Expose the constructor.
	return currencyUp;
}()); // End currencyUp()