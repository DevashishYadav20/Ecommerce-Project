import { api } from '../../utils/api';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    await api.post('/api/cart-items', {
      productId: product.id,
      quantity,
    });
    await loadCart();
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        {/* Prefix with BASE_URL so GitHub Pages finds the asset */}
        <img
          className="product-image"
          data-testid="product-image"
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`${import.meta.env.BASE_URL}images/ratings/rating-${
            product.rating.stars * 10
          }.png`}
          alt="Rating"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img
          src={`${import.meta.env.BASE_URL}images/icons/checkmark.png`}
          alt="Checkmark"
        />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
