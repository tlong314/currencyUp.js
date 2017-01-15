/**
 * @overview A JavaScript library that automatically formats text in form inputs to US currency.
 * @author Tim S. Long
 * @modified January 14, 2017
 * @license MIT
 */
;var UpCurrency = (function(global, undefined){
	'use strict';

	var options = {
		dollarSign: true,
		initial: undefined,
		element: null
	};

	/**
	 * @description Initiate the element.
	 * @param {Object} opts - constructor options. See documentation.
	 */
	var UpCurrency = function(opts){
		if(this === global) {
			return new UpCurrency(opts);
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
			options.element.value = formatToCurrency(parseFloat(options.initial.replace(/[^0-9.\-\(\)]/g, "").replace(/^\((.+)\)$/, "-$1") || 0, 10));
		} else if(typeof options.initial === "number") {
			options.element.value = formatToCurrency(options.initial);
		}

		options.element.addEventListener("focus", focusCurrency, false);
		options.element.addEventListener("blur", blurCurrency, false);
	}; // End UpCurrency() constructor.
	
	// Set value to raw floating point number when input field gains focus.
	var focusCurrency = function(){
		this.value = this.value.replace(/[^0-9.\-\(\)]/g, "").replace(/^\((.+)\)$/, "-$1");
	};

	// Set value to currency format when input field loses focus.
	var blurCurrency = function(){
		this.value = formatToCurrency(this.value.replace(/[^0-9.\-\(\)]/g, "").replace(/^\((.+)\)$/, "-$1"));
	};

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
		
		if(neg) {
			return "(" + (options.dollarSign ? "$" : "") + dollarsRev.reverse().join("") + "." + cents + ")";
		} else {
			return (options.dollarSign ? "$" : "") + dollarsRev.reverse().join("") + "." + cents;
		}
	}; // End formatToCurrency()
	
	// Get a currency-formatted value of the field input's current value (for instance, while it has focus).
	UpCurrency.prototype.getFormattedValue = function() {
		return formatToCurrency(this.value);
	};
	
	// Get an unformatted value of the field input's current value (for instance while it does not have focus).
	UpCurrency.prototype.getUnformattedValue = function() {
		return this.value.replace(/[^0-9.\-\(\)]/g, "").replace(/^\((.+)\)$/, "-$1");
	};

	// Get the raw numeric value of the field input's current value (for instance while it does not have focus).
	UpCurrency.prototype.getNumberValue = function() {
		return parseFloat(this.getUnformattedValue, 10);
	};

	// Expose the constructor.
	return UpCurrency;
}(window)); // End UpCurrency()
