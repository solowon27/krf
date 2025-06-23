// src/app/privacy/page.tsx
import Header from '@components/Header'; // Adjust path as needed
import Footer from '@components/Footer'; // Adjust path as needed
import React from 'react';
import Markdown from 'react-markdown'; // You might need to install react-markdown: npm install react-markdown

const privacyContent = `
# Privacy Policy for Kone Renaissance Foundation

**Last Updated: June 22, 2025**

Kone Renaissance Foundation ("we," "our," or "us") values the privacy of our visitors, donors, and supporters. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website or services.

## 1. Information We Collect

We may collect the following types of information:

- **Personal Information**: Name, email address, phone number, and mailing address when you contact us or make a donation.
- **Donation Information**: Records of your donations including the amount, date, and any messages you include.
- **Technical Data**: Browser type, IP address, pages visited, and referring site data through cookies and analytics tools.

## 2. How We Use Your Information

We use your information for the following purposes:

- To communicate with you regarding your inquiries or support requests.
- To process and acknowledge your donations.
- To send you updates about our foundation, programs, and events (only if you opt in).
- To maintain accurate records for accounting and transparency.
- To improve our website functionality and user experience.

## 3. How We Share Your Information

We do **not** sell, rent, or trade your personal information. We may share information:

- With service providers or partners who help us manage donation processing, communications, or analytics — only as necessary and under confidentiality agreements.
- When required by law or in response to valid legal processes.

## 4. Cookies and Tracking

We use cookies and similar tracking tools to analyze website traffic and user behavior. You can disable cookies in your browser settings, but some parts of our website may not function properly without them.

## 5. Data Security

We implement industry-standard measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no online platform is 100% secure, and we cannot guarantee absolute security.

## 6. Children's Privacy

Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the information promptly.

## 7. Your Rights and Choices

You may request access to the personal data we hold about you, ask us to update or delete it, or withdraw consent for any communication by contacting us at the address below.

## 8. Changes to This Policy

We reserve the right to modify this Privacy Policy at any time. Any updates will be posted here with a new effective date. We encourage you to review this policy periodically.

## 9. Contact Us

If you have any questions or concerns about this Privacy Policy, or how your data is handled, please contact us at:

**Kone Renaissance Foundation**  
📧 konerenfoundation@gmail.com  
📞 +251 00 00 00 00  
📍 Kone, North Wollo, Ethiopia
`;


export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />
      <section className="py-16 px-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg my-12">
        <Markdown>{privacyContent}</Markdown>
      </section>
      <Footer />
    </main>
  );
}