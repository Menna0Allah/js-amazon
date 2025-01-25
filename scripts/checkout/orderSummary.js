import { cart, removeItem, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatPrice } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymentSummery.js";

export function renderOrderSummery(){
  let cartHTML= '';
  
  cart.forEach((item) => {
  
      const matching = getProduct(item.productId);

      const deliveryOption = getDeliveryOption(item.deliveryOptionId);

      const deliveryDate = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
      
      cartHTML+=`
      <div class="cart-item-container js-cart-container-${matching.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matching.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matching.name}
                  </div>
                  <div class="product-price">
                    $${formatPrice(matching.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matching.id}">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-update-id="${matching.id}">
                      Update
                    </span>
                    <input type="number" class="quantity-input input-quantity-${matching.id}">
                    <span class="save-quantity-link link-primary" data-save-id="${matching.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-delete-id="${matching.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionshtml(matching,item)}
                </div>
  
              </div>
            </div>
      `;
      
      
  });
  
  function deliveryOptionshtml(matching,item){
    let html ='';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
      const deliveryPrice = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatPrice(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === item.deliveryOptionId;
  
      html += `
      <div class="delivery-option js-delivery-otion" data-product-id="${matching.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matching.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryDate}
        </div>
        <div class="delivery-option-price">
          ${deliveryPrice} Shipping
        </div>
      </div>
    </div>
      `
    })
    return html;
  }
  
  
  document.querySelector('.order-summary').innerHTML = cartHTML;
  
  document.querySelectorAll('.js-delete-link').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const deleteItemId = deleteButton.dataset.deleteId; 
      removeItem(deleteItemId);
      document.querySelector(`.js-cart-container-${deleteItemId}`).remove();
      renderPaymentSummery();
      updateCartQuantity();
      
      // call it when click delete
    });
  });
  
  function updateCartQuantity(){
    let cartQuantity = Number(calculateCartQuantity());
    
    document.querySelector('.return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
  }
  
  
  updateCartQuantity();
  // to call it when the page loads
  
  document.querySelectorAll('.js-update-link').forEach((updateButton) => {
    updateButton.addEventListener('click', () =>{
      const updateItemId = updateButton.dataset.updateId;
      document.querySelector(`.js-cart-container-${updateItemId}`).classList.add('is-editing-quantity');
    })
  })
  
  document.querySelectorAll('.save-quantity-link').forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const saveItemId = saveButton.dataset.saveId;
      document.querySelector(`.js-cart-container-${saveItemId}`).classList.remove('is-editing-quantity');
  
      const x = document.querySelector(`.input-quantity-${saveItemId}`);
      const newQuantity = Number(x.value);
  
      updateQuantity(saveItemId,newQuantity);
  
      const quantityLabel = document.querySelector(`.js-quantity-label-${saveItemId}`);
      
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
    })
  })
  
  
  document.querySelectorAll('.js-delivery-otion').forEach((element) => {
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
    })
  })
}
