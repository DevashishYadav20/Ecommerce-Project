// src/pages/orders/TrackOrderPage.tsx
import { Link } from "react-router-dom";
import "./TrackOrderPage.css";

export function TrackOrderPage() {
  return (
    <div className="track-order-container">
      <h2>Track Your Order</h2>
      <p>Enter your order number to check the status (demo page).</p>

      <input
        type="text"
        placeholder="Order ID"
        className="track-order-input"
      />

      <button className="track-order-button">Track</button>

      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="back-home-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
