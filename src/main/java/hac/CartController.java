package hac;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;
import java.util.ArrayList;
import java.util.List;

/**
 * Cart Controller to handle all the endpoints of the /cart requests
 */

@RestController
@SessionScope
public class CartController {

    private final List<CartItem> cartItems = new ArrayList<>();

    /**
     * Retrieves the list of cart items.
     * @return The list of cart items.
     */
    @GetMapping("/cart")
    public List<CartItem> getCart() {
        return cartItems;
    }


    /**
     * Adds a new item to the cart.
     * @param item The cart item to be added.
     * @return The added cart item.
     */
    @PostMapping("/cart")
    public CartItem addToCart(@RequestBody CartItem item) {
        for (CartItem cartItem : cartItems) {
            if (cartItem.getId().equals(item.getId())) {
                return cartItem;
            }
        }
        System.out.println("Received item: " + item);
        item.setPrice(3.99);
        cartItems.add(item);
        return item;
    }

    /**
     * Retrieves the total price of all items in the cart.
     * @return The total price of all items in the cart.
     */
    @GetMapping("/cart/total-price")
    public double getCartTotalPrice() {
        double totalPrice = 0;
        for (CartItem cartItem : cartItems) {
            totalPrice += cartItem.getPrice();
        }
        return totalPrice;
    }

    /**
     * Removes an item from the cart based on the item ID.
     * @param itemId The ID of the item to be removed.
     */
    @DeleteMapping("/cart/delete{itemId}")
    public void removeFromCart(@PathVariable String itemId) {
        cartItems.removeIf(item -> item.getId().equals(itemId));
    }

    /**
     * Clears the cart by removing all items.
     */
    @DeleteMapping("/cart/deleteAll")
    public void clearCart() {
        cartItems.clear();
    }

    /**
     * Checks if an item with the specified ID exists in the cart.
     * @param itemId The ID of the item to check.
     * @return true if the item exists in the cart, false otherwise.
     */
    @GetMapping("/cart/check/{itemId}")
    public boolean checkItemInCart(@PathVariable String itemId) {
        return cartItems.stream().anyMatch(item -> item.getId().equals(itemId));
    }


}