# UpCurrency

A tiny library to keep specific field inputs in U.S. currency format.

## Usage

An UpCurrency object is created by invoking the UpCurrency constructor. The argument in this call is an object of key-value pairs, which much contain at least a reference to the field value (generally an input[type="text"] element). See Options below.

Example:

```javascript
var options = {
  element: document.getElementById("currencyInput"),
  dollarSign: false
};

var cInput = new UpCurrency(options);
```

## Options

element {Object} - HTML element that is being referenced. Default is null.

dollarSign {boolean} - Decides whether the formatted currency value should have a $ sign included. Set to false if you will use $ signs outside of the input field. Default is true.

onblur {boolean} - If true, only formats value to currency onblur. If false, maintains format while being edited (not recommended). Default is true.

initial {string | number | undefined} - If present (and set to a number or string), sets an initial value for the referenced element. Default is undefined.

## License

UpCurrency is available for use under the MIT License.
