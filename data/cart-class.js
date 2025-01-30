class Cart{
    cartItems = undefined;
    localStorage = undefined

    constructor(storageKey) {
        this.localStorage = storageKey;
        this.loadFromStorage();
    }

    // localFromStorage: function 
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.storageKey));
      
        if(!this.cartItems) {
          this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
        }
      };

        saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    };

    addToCart(productId){
        let matching;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matching = cartItem;
            }
        });
    
        //let matching = this.find((item) => item.productId === productId);
        // const selectedQuantity = Number(document.querySelector(`.select-${productId}`).value);
    
        if (matching) {
            matching.quantity += 1; 
        } else {
            this.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1', // default value when add new item
            });
        }
    
        this.saveToStorage();
        };
    
        removeItem(productId){
        const newCart = [];
        this.cartItems.forEach((item) => {
            if(item.productId !== productId){
            newCart.push(item);
            }
        })
        this.cartItems = newCart;
        
        this.saveToStorage();
    };

    calculateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
        // make it return to use it to put it in html element
    };

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });
          
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });
        
        matchingItem.deliveryOptionId = deliveryOptionId;
        
        this.saveToStorage();
    };
}

const cart = new Cart('cart-oop');

