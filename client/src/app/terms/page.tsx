// src/app/terms/page.tsx
import Header from '@components/Header'; // Adjust path as needed
import Footer from '@components/Footer'; // Adjust path as needed
import React from 'react';
import Markdown from 'react-markdown'; // You might need to install react-markdown: npm install react-markdown

const termsContent = `
# Terms and Conditions for Kone Renaissance Foundation

**Last Updated: June 22, 2025**

Welcome to the Kone Renaissance Foundation website. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website.

---

## 1. Acceptance of Terms

By using this website, you confirm that you have read, understood, and agree to be bound by these Terms and our [Privacy Policy](/privacy). We may update these Terms at any time. Your continued use of the website following changes means you accept the revised Terms.

---

## 2. Use of the Website

You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. You must not:

- Attempt to gain unauthorized access to the website or its related systems.
- Use the website for commercial solicitation or spam.
- Upload harmful or malicious code or content.

---

## 3. Donations

All donations made through our site are voluntary and non-refundable. We strive to use all donations transparently and responsibly to support our mission of improving education and opportunity in Kone, Ethiopia.

---

## 4. Intellectual Property

All content, logos, images, and designs on this website are the property of Kone Renaissance Foundation unless otherwise noted. You may not copy, reproduce, or distribute any content without prior written permission.

---

## 5. Links to Other Websites

Our website may contain links to third-party websites for your convenience. We do not control or endorse the content of these sites and are not responsible for their privacy practices or terms.

---

## 6. Limitation of Liability

We do our best to ensure the accuracy and security of our content. However, we do not guarantee that the website will be error-free or uninterrupted. To the fullest extent permitted by law, Kone Renaissance Foundation is not liable for any direct, indirect, or consequential damages resulting from the use of this website.

---

## 7. Termination

We reserve the right to restrict or terminate access to our website for any user who violates these Terms or engages in harmful behavior.

---

## 8. Governing Law

These Terms shall be governed by and construed in accordance with the laws of Ethiopia. Any disputes arising out of or relating to these Terms shall be resolved in Ethiopian courts.

---

## 9. Changes to These Terms

We may update these Terms from time to time. Changes will be posted here with a new "Last Updated" date. We encourage you to review them regularly.

---

## 10. Entire Agreement

These Terms, together with our Privacy Policy, constitute the entire agreement between you and the Kone Renaissance Foundation regarding the use of this website.

---

## 11. Contact Us

If you have any questions about these Terms, please contact us at:

**Kone Renaissance Foundation**  
📧 konerenfoundation@gmail.com  
📞 +251 00 00 00 00  
📍 Kone, North Wollo, Ethiopia
`;


export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />
      <section className="py-16 px-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg my-12">
        <Markdown>{termsContent}</Markdown>
      </section>
      <Footer />
    </main>
  );
}