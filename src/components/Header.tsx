import { Link } from 'react-router-dom';
import { asset } from '../utils/asset';
import './header.css';

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
  }[];
};

export function Header({ cart }: HeaderProps) {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <h1
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0
            }}
          >
            Devashish Yadav
          </h1>
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button" type="button">
          <img
            className="search-icon"
            src={asset('images/icons/search-icon.png')}
            alt="Search"
          />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src={asset('images/icons/cart-icon.png')}
            alt="Cart"
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

