const CART_STORAGE_KEY = 'shopping_cart';

export const getCart = () => {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return cart;
};

export const removeFromCart = (productId, size, color) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => 
        !(item.id === productId && item.size === size && item.color === color)
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
};

export const updateCartItemQuantity = (productId, size, color, quantity) => {
    const cart = getCart();
    const updatedCart = cart.map(item => {
        if (item.id === productId && item.size === size && item.color === color) {
            return { ...item, quantity };
        }
        return item;
    });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
};

export const clearCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
}; 