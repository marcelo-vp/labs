/*** CODE PLAYGROUND SCRIPTS ***/


/*** Opens a message box when leaving the site : BEGIN ***/

  // Creates the message box and attaches event handlers
  const dontLeaveMsg = () => {
    // Checks if user has recently viewed the message box
    const recentUser = localStorage.getItem('popup');
    // Gets current message box
    const openMsgs = document.getElementsByClassName('dont-leave');
    // If message box doesn't exist
    if (openMsgs.length == 0 && recentUser !== 'dont-leave') {
      // Creates message box and appends to #body
      const msgBox = document.createElement('div');
      msgBox.className = 'dont-leave';
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      msgBox.appendChild(closeButton);
      document.getElementById('body').appendChild(msgBox);
      // Creates dark background and appends to the body element
      const darkBgd = document.createElement('div');
      darkBgd.className = 'dark-bgd';
      document.querySelector('body').appendChild(darkBgd);
      // Gets window visible width and height
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // Sets dark background width and height values
      darkBgd.style.width = windowWidth;
      darkBgd.style.height = windowHeight;
      // Places message box at the center of the page
        // Gets msgBox width and height
        const boxWidth = msgBox.clientWidth;
        const boxHeight = msgBox.clientHeight;
        // Finds the top and left position
        const posTop = ((windowHeight - boxHeight)/2)*0.8;
        const posLeft = (windowWidth - boxWidth)/2;
        // Sets msgBox position by changing CSS properties
        msgBox.style.top = posTop;
        msgBox.style.left = posLeft;
      // Creates localstorage item in the client's browser
      localStorage.setItem('popup','dont-leave');
      // Closes message box when clicking the Close button
      closeButton.addEventListener('click', (e) => {
        msgBox.style.display = 'none';
        darkBgd.style.display = 'none';
      });
      // Closes message box if Esc key is pressed
      document.addEventListener('keydown', (e) => {
        let keyValue = e.key;
        if (keyValue === 'Escape') {
          msgBox.style.display = 'none';
          darkBgd.style.display = 'none';
        }
      });
      // Closes message box when the user clicks outside of it
      document.addEventListener('click', (e) => {
        if (e.target == darkBgd) {
          msgBox.style.display = 'none';
          darkBgd.style.display = 'none';
        }
      });
    } // Ends if
  } // Ends dontLeaveMsg
  // If mouse leaves the document area, show message box
  document.addEventListener('mouseleave', dontLeaveMsg);

/*** Opens a message box : END ***/


/*** Adds multiple items to cart : BEGIN ***/

  // Global variables
    // Cart's quantity of items and total value
    const cartQty = document.querySelector('.cart-qty-units');
    const cartVal = document.querySelector('.cart-price-value');
    // Product quantity on thumbnail
    const qtyInput = document.querySelector('.qty-value');
    // Cart icon element
    const cartIcon = document.querySelector('#cart-icon');

  // Gets cart information on page load
    // When the DOM is fully loaded
/*     document.addEventListener('DOMContentLoaded', (e) => {
      // Retrieves cart info via Ajax
        // Create new XML Http request object
        let getCart = new XMLHttpRequest();
        // Set conditions to process stored data and callback function
        getCart.addEventListener('readystatechange', (e) => {
          if (getCart.readyState === 4 && getCart.status === 200) {
            let ajaxResponse = JSON.parse(getCart.responseText);
            // Updates cart with latest quantity and value
            cartQty.textContent = ajaxResponse.cartQty;
            cartVal.textContent = ajaxResponse.cartValue.toFixed(2);
          }
        });
        // Open the Ajax request
        getCart.open('GET','data/user_info.json');
        // Send the request
        getCart.send();
    }); */

  // Sets quantity by clicking the up and down buttons
    // When clicking the increase quantity button
    const increaseQty = document.querySelector('.qty-up');
    increaseQty.addEventListener('click', (e) => {
      // Gets the input's initial value
      const initialValue = parseInt(qtyInput.value);
      // If the initial value is equal to or bigger than 1 and less than 100
      if (initialValue >= 1 && initialValue < 100) {
        // Adds one unit to the initial value
        qtyInput.value = initialValue + 1;
      }
    });
    // When clicking the decrease quantity button
    const decreaseQty = document.querySelector('.qty-down');
    decreaseQty.addEventListener('click', (e) => {
      // Gets the input's initial value
      const initialValue = parseInt(qtyInput.value);
      // If the initial value is equal to or bigger than 2
      if (initialValue >= 2) {
        // Subtracts initial value by one unit
        qtyInput.value = initialValue - 1;
      }
    });
  // When clicking the purchase button, adds product to cart with respective quantities
    // Selects the purchase button
    const purchaseButton = document.querySelector('.purchase-button');
    // Adds click event handler
    purchaseButton.addEventListener('click', (e) => {
      // Gets the product quantity
      const prodQty = parseInt(qtyInput.value);
      // Gets the product unitary value
      const prodValElem = document.querySelector('.prod-price-value');
      const prodVal = parseFloat(prodValElem.textContent);
      // Stores the product's total value
      const prodTotalVal = prodQty*prodVal;
      // Gets cart current quantity and value
        // Gets current quantity
        const cartIniQty = parseInt(cartQty.textContent);
        // Gets current value
        const cartIniVal = parseFloat(cartVal.textContent);
      // Adds new product quantity and total value
        // Updates cart quantity
        const cartNewQty = cartIniQty + prodQty;
        cartQty.textContent = cartNewQty;
        // Updates cart total value
          // Stores new total value
          const cartNewValue = cartIniVal + prodTotalVal;
          // Formats number with 2 digits after the decimal point
          // and converts it to string
          cartVal.textContent = cartNewValue.toFixed(2);
      // Stores cart info in the server via Ajax
        // Sets up url and settings of the request
        const url = 'data/user_info.json';
        const settings = {
          data: {
            cartQty : cartNewQty,
            cartValue : cartNewValue
          },
          type: 'POST'
        };
        // Open the request and send the data
        $.ajax(url, settings);
      // Resets product quantity on thumbnail to one unit
      qtyInput.value = 1;
      // Changes cart image from empty icon to full icon
      const cartUseElem = cartIcon.firstElementChild;
      // Gets the xlink:href attribute value
      const useElemId = cartUseElem.getAttribute('xlink:href');
        // If cart is empty, changes icon to full
        if (useElemId === '#cart-empty') {
          cartUseElem.setAttribute('xlink:href','#cart-full');
        }
    });
  // When clicking the empty cart button, reset cart quantity and value
  const emptyCartButton = document.querySelector('#cart-reset');
    // Adds click event listener to button
    emptyCartButton.addEventListener('click', (e) => {
      // Resets cart quantity and total value
      cartQty.textContent = '0';
      cartVal.textContent = '0.00';
      // Changes cart image from full icon to empty icon
      const cartUseElem = cartIcon.firstElementChild;
      // Gets the xlink:href attribute value
      const useElemId = cartUseElem.getAttribute('xlink:href');
        // If cart is full, changes icon back to empty
        if (useElemId === '#cart-full') {
          cartUseElem.setAttribute('xlink:href','#cart-empty');
        }
    });

/*** Adds multiple items to cart : END ***/


/*** Show and hide with animate : BEGIN ***/

  var couponButton = document.querySelector('#coupon-toggle');
  // When clicking the couponButton, toggle the coupon info visibility
  couponButton.addEventListener('click', function(e) {
    $('.coupon-info').slideToggle();
  });

/*** Show and hide with animate : END ***/


/*** Creating custom objects : BEGIN ***/

  // Creating an unique car object, with properties and methods
  var vwFox = {
    brand: 'Volkswagen',
    model: 'Fox',
    color: 'silver',
    start: function () {
      console.log(this.brand + ' ' + this.model + ' engine is on!');
    },
    drive: function () {
      console.log('Enjoy the ride on the new ' + this.brand + ' ' + this.model + '!');
    },
    stop: function () {
      console.log(this.brand + ' ' + this.model + ' has just stopped.');
    }
  }

	// Creating a car object constructor
	function Car (brand, model, color) {
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.start = function () {
			console.log(brand + ' ' + model + ' engine is on!');
		}
		this.drive = function () {
			console.log('Enjoy the ride, we are moving!');
		}
		this.stop = function () {
			console.log('Reached our destination. Engine off..');
		}
	}

	// Creating instances of the car object
	var Peugeot = new Car ('Peugeot','208','white');
  var Fiesta = new Car ('Fiesta','hatch','blue');
  
  // Creating a computer object constructor
  function Computer (brand, model, processor, ram, storage, display) {
    this.brand = brand;
    this.model = model;
    this.processor = processor;
    this.ram = ram;
    this.storage = storage;
    this.display = display;
  }
  // Creating objects prototypes for methods shared among instances
  Computer.prototype.turnOn = function (brand, model) {
    console.log('The ' + this.brand + ' ' + this.model + ' has just been turned on!');
  }
  Computer.prototype.turnOff = function (brand, model) {
    console.log('The ' + this.brand + ' ' + this.model + ' has just been turned off!');
  }
  // Creating instances of computers
  var lenovoTC = new Computer ('Lenovo','Thinkcentre Edge','Intel i5 2,8Ghz','8GB','250GB','22"');

/*** Creating custom objects : END ***/
