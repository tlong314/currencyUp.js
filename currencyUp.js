/**
 * @title currencyUp.js
 * @description Formats US currency in form fields.
 * @author Tim S. Long
 * @modified June 10, 2017
 * @license MIT
 */
;var currencyUp = (function(global, undefined){
	var options = {
		dollarSign: true,
		onblur: true,
		initial: undefined,
		element: null
	};

	/**
	 * @description Initiate the element.
	 * @param {Object} opts - constructor options. See documentation.
	 */
	var currencyUp = function(opts){
		if(this === global) {
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
			options.element.value = (options.dollarSign ? "$" : "") + formatToCurrency(parseFloat(options.initial.replace(/[^0-9.\-]/g, "") || 0, 10));
		} else if(typeof options.initial === "number") {
			options.element.value = (options.dollarSign ? "$" : "") + formatToCurrency(options.initial);
		}

		if(options.onblur) {
			options.element.addEventListener("focus", focusCurrency, false);
			options.element.addEventListener("blur", blurCurrency, false);
		}
		
		options.element.addEventListener("keyup", keyUpCurrency, false);
	}; // End currencyUp() constructor.
	
	// Set value to raw floating point number when input field gains focus.
	var focusCurrency = function(){
		this.value = this.value.replace(/[^0-9.\-]/g, "");
	};

	// Set value to currency format when input field loses focus.
	var blurCurrency = function(){
		this.value = (options.dollarSign ? "$" : "") + formatToCurrency(this.value.replace(/[^0-9.\-]/g, ""));
	};

	// If onblur option is on, removes all non-acceptable values from input field (only keeps numerical digits, periods, and negative signs).
	// If onblur option is false, does this and formats to money (not recommended, as this moves the cursor).
	var keyUpCurrency = function(){
		if(options.onblur) {
			this.value = this.value.replace(/[^0-9.\-]/g, "");
		} else {
			var val = parseFloat(this.value.replace(/[^0-9.\-]/g, "") || 0, 10);
			this.value = (options.dollarSign ? "$" : "") + formatToCurrency(val); // Note the cursor moving to the end of the input. UI fail.
		}
	}; // End keyUpCurrency

	// Format number to standard US currency.
	var formatToCurrency = function(num){
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
		
		return (neg ? "-" : "") + dollarsRev.reverse().join("") + "." + cents;
	}; // End formatToCurrency()
	
	// Get a currency-formatted value of the field input's current value (for instance, while it has focus).
	currencyUp.prototype.getFormattedValue = function() {
		return (options.dollarSign ? "$" : "") + formatToCurrency(this.value);
	};
	
	// Get an unformatted value of the field input's current value (for instance while it does not have focus).
	currencyUp.prototype.getUnFormattedValue = function() {
		return this.value.replace(/[^0-9.\-]/g, "");
	};

	// Get the raw numeric value of the field input's current value (for instance while it does not have focus).
	currencyUp.prototype.getNumberValue = function() {
		return parseFloat(this.value.replace(/[^0-9.\-]/g, ""), 10);
	};
	
	// Expose the constructor.
	return currencyUp;
}(window)); // End currencyUp()
