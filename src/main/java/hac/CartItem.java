package hac;

/**
 * Represents an item in a cart.
 */

public class CartItem {
    private String id;
    private String title;
    private String release_date;
    private String poster_path;
    private double price;

    // Constructors
    /**
     * Creates a new instance of CartItem.
     */
    public CartItem() {
    }

    // Getters and setters
    /**
     * Retrieves the ID of the cart item.
     * @return The ID of the cart item.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the cart item.
     * @param id The ID of the cart item.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Retrieves the title of the cart item.
     * @return The title of the cart item.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the cart item.
     * @param title The title of the cart item.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Retrieves the release date of the cart item.
     * @return The release date of the cart item.
     */
    public String getRelease_date() {
        return release_date;
    }

    /**
     * Sets the release date of the cart item.
     * @param release_date The release date of the cart item.
     */
    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    /**
     * Retrieves the poster path of the cart item.
     * @return The poster path of the cart item.
     */
    public String getPoster_path() {
        return poster_path;
    }

    /**
     * Sets the poster path of the cart item.
     * @param poster_path The poster path of the cart item.
     */
    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    /**
     * Retrieves the price of the cart item.
     * @return The price of the cart item.
     */
    public double getPrice() {
        return price;
    }

    /**
     * Sets the price of the cart item.
     * @param price The price of the cart item.
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Returns a string representation of the CartItem object.
     * @return A string representation of the CartItem object.
     */
    @Override
    public String toString() {
        return "CartItem{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", release_date='" + release_date + '\'' +
                ", poster_path='" + poster_path + '\'' +
                ", price=" + price +
                '}';
    }
}
