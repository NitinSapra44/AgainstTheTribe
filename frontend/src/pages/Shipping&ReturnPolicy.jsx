import React from "react";

function ShippingandReturn(){
return (
    <div className="flex justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Exchange & Return Policy
        </h1>

        <p className="mb-6">
          At ATT, we strive to provide our customers with premium quality products and services.
          If you are not entirely satisfied with your purchase, we’re here to help.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Exchange Policy</h2>
        <p className="mb-6">
          Products can be exchanged within 7 days of delivery, provided they are unused, unwashed,
          and in their original packaging with all tags intact.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
        <p className="mb-6">
          We currently do not offer returns. However, if there is a genuine issue with the product
          such as manufacturing defects or damage during shipping, please reach out to our support.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How to Initiate an Exchange</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Contact our support team via email or chat within 7 days of delivery.</li>
          <li>Provide your order number and reason for exchange.</li>
          <li>Ship the item back to our provided address.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-6">
          If you have any questions or need assistance, please contact us at support@ATT.in
        </p>
      </div>
    </div>
  );
}

export default ShippingandReturn