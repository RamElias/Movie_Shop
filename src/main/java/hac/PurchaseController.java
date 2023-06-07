package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purchase Controller to handel the save of the cart to the DB and managing the checkout flow
 * */

@RestController
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;

    @Autowired
    private CartController cartController;

    /**
     * Constructs a new PurchaseController.
     * @param purchaseRepository The purchase repository.
     * @param cartController The cart controller.
     */
    @Autowired
    public PurchaseController(PurchaseRepository purchaseRepository, CartController cartController) {
        this.purchaseRepository = purchaseRepository;
        this.cartController = cartController;
    }

    /**
     * Processes the checkout by saving the purchase, updating the payment, and clearing the cart.
     * @param purchase The purchase details.
     */
    @PostMapping("/checkout")
    public void checkout(@RequestBody Purchase purchase) {
        double totalPrice = cartController.getCartTotalPrice();
        purchase.setPayment(totalPrice);
        purchaseRepository.save(purchase);
        cartController.clearCart();
    }
}
