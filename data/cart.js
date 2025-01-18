export const cart = [];

export function addToCart(productId){
    let matching = cart.find((item) => item.productId === productId);
    const selectedQuantity = Number(document.querySelector(`.select-${productId}`).value);
    if (matching) {
      matching.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectedQuantity,
      });
    }
  };