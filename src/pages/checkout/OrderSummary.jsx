import { api } from '../../utils/api';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  // If delivery options haven't loaded yet, avoid rendering broken dates.
  if (!Array.isArray(deliveryOptions) || deliveryOptions.length === 0) {
    return <div className="order-summary" />;
  }

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find(
          (opt) => opt.id === cartItem.deliveryOptionId
        );

        const deleteCartItem = async () => {
          await api.delete(`/api/cart-items/${cartItem.productId}`);
          await loadCart();
        };

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date:{' '}
              {selectedDeliveryOption
                ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    'dddd, MMMM D'
                  )
                : '—'}
            </div>

            <div className="cart-item-details-grid">
              {/* IMPORTANT: prefix images with BASE_URL for GitHub Pages */}
              <img
                className="product-image"
                src={`${import.meta.env.BASE_URL}${cartItem.product.image}`}
                alt={cartItem.product?.name || 'Product'}
              />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>

                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>

                <div className="product-quantity">
                  <span>
                    Quantity:{' '}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>

                  <span className="update-quantity-link link-primary">
                    Update
                  </span>

                  <span
                    className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                  >
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
