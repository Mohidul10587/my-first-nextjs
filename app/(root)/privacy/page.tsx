import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Privacy Policy</h1>
      <div className="max-w-2xl mx-auto p-4 mt-6 bg-white rounded-lg shadow-md">
        <p className="mb-4">
          At Our Company, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your
          information when you visit our website or use our services.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          and contact details when you voluntarily provide it to us. We also
          collect non-personal information such as browser type and IP address
          for analytics purposes.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect to provide and improve our services,
          communicate with you, and personalize your experience on our website.
          We do not sell or share your personal information with third parties
          without your consent.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Security of Your Information
        </h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. However, please be aware that no method of transmission
          over the internet or electronic storage is completely secure.
        </p>
        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal
          information. You can also opt-out of receiving promotional
          communications from us at any time by following the unsubscribe
          instructions in our emails.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page. You
          are advised to review this Privacy Policy periodically for any
          changes.
        </p>
      </div>
    </div>
  );
};

export default page;
