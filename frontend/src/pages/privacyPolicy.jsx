import React from "react";

function Privacypolicy(){
    return (
    <div className="flex justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl text-left">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <p className="mb-6">
          At Against The Tribe, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-6">
          We collect the following types of personal information when you visit or make a purchase
          from our site:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Your name, email address, and contact number</li>
          <li>Shipping and billing addresses</li>
          <li>Payment details (processed securely via third-party services)</li>
          <li>Device information (IP address, browser type, time zone)</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-6">We use your data to:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you regarding your purchase</li>
          <li>Improve our website, products, and customer experience</li>
          <li>Send promotional emails (only if you opt-in)</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p className="mb-6">
          We do not sell or rent your personal data. Your information may be shared with trusted
          third parties only for the purpose of payment processing, shipping, analytics, or
          marketing services — all of which follow strict data protection guidelines.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
        <p className="mb-6">
          We implement industry-standard security measures to protect your data. However, no method
          of transmission over the internet is 100% secure. We cannot guarantee absolute security,
          but we take all reasonable steps to protect your information.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
        <p className="mb-6">
          Our site uses cookies to improve your experience, remember preferences, and track usage.
          You can disable cookies in your browser settings, but this may affect certain site
          functionalities.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, correct, or delete your personal data at any time. If you'd
          like to exercise any of these rights, please contact us using the information below.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
        <p className="mb-6">
          We reserve the right to update this Privacy Policy at any time. Any changes will be
          posted on this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about our privacy practices, please contact us at: <br />
          <span className="font-medium">Email:</span> support@againstthetribe.in
        </p>
      </div>
    </div>
  );
}

export default Privacypolicy