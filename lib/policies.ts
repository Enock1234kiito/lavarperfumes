export type PolicySection = {
  heading: string;
  subsections: {
    title?: string;
    body?: string;
    bullets?: string[];
  }[];
};

export const shippingReturnsPolicy: PolicySection[] = [
  {
    heading: "Shipping Policy",
    subsections: [
      {
        title: "Order Processing",
        bullets: [
          "All orders are processed within 1–3 business days after payment confirmation. Orders placed on weekends, holidays, or during high-demand periods may require additional processing time.",
          "Once your order has been shipped, you may receive tracking details where available.",
        ],
      },
      {
        title: "Delivery Time",
        body: "Estimated delivery timelines:",
        bullets: [
          "Local Orders: 2–7 business days",
          "International Orders: 5–21 business days",
          "Please note that delivery times are estimates and may vary depending on courier operations, customs processing, public holidays, weather conditions, or other circumstances outside our control.",
        ],
      },
      {
        title: "Shipping Address Responsibility",
        bullets: [
          "Customers are responsible for providing accurate and complete shipping information at checkout.",
          "Lavara is not responsible for delays, failed deliveries, or lost parcels caused by incorrect or incomplete shipping details provided by the customer.",
          "If an order is returned to us due to an incorrect address or unsuccessful delivery attempt, additional shipping charges may apply for re-delivery.",
        ],
      },
      {
        title: "Lost, Delayed, or Damaged Packages",
        bullets: [
          "If your order arrives damaged or appears lost during transit, please contact us within 48 hours of delivery (or expected delivery date) with your order number and clear photographs of the package and item where applicable.",
          "We will review each case and work with the shipping carrier to determine an appropriate resolution.",
        ],
      },
    ],
  },
  {
    heading: "Returns & Refund Policy",
    subsections: [
      {
        body: "We want every experience with Lavara to feel intentional and satisfying. Due to the personal and hygienic nature of fragrance products, all return requests are handled carefully.",
      },
      {
        title: "Return Eligibility",
        body: "Returns may only be accepted under the following conditions:",
        bullets: [
          "You received the wrong item",
          "Your item arrived damaged or defective",
          "Your item remains unopened, unused, and in its original packaging condition",
        ],
      },
      {
        title: "Non-Returnable Items",
        body: "For hygiene, quality assurance, and product integrity reasons, we do not accept returns or offer refunds for:",
        bullets: [
          "Opened or used fragrances",
          "Products showing signs of use, tampering, or damage caused after delivery",
          "Samples or discovery products",
          "Sale, promotional, discounted, or clearance items",
        ],
      },
      {
        title: "Return Request Window",
        bullets: [
          "All return requests must be submitted within 7 days of delivery.",
          "Requests submitted after this period may not qualify for review or approval.",
        ],
      },
      {
        title: "Return Conditions",
        body: "To qualify for a return:",
        bullets: [
          "Product must be unopened and unused",
          "Product must be returned in original packaging and condition",
          "Proof of purchase or order confirmation must be provided",
          "Returns that do not meet these conditions may be refused.",
        ],
      },
      {
        title: "Refunds",
        bullets: [
          "Approved refunds are processed only after inspection and approval of the returned item.",
          "Refunds are issued to the original payment method and may take 5–10 business days to reflect depending on your bank or payment provider.",
          "Shipping costs are non-refundable, except where the error was caused directly by Lavara (including incorrect or defective items).",
        ],
      },
      {
        title: "Exchanges",
        body: "We only offer exchanges for products that arrive damaged, defective, or incorrect.",
      },
      {
        title: "Order Cancellations",
        bullets: [
          "Orders may only be cancelled before shipment.",
          "Once an order has been processed and dispatched, cancellations are no longer possible.",
        ],
      },
    ],
  },
];
