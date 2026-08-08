// app/privacy-policy/page.tsx

import Footer from "@/components/reusable-components/Footer";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy | Adinn Advertising Ltd",
  description:
    "Read the Privacy Policy of Adinn Advertising Ltd to understand how we collect, use and protect your information.",
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <LegalPageLayout
        title="Privacy Policy"
        effectiveDate="August 08, 2026"
        intro="Adinn Advertising Ltd (“Adinn”, “we”, “us” or “our”) values your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services."
      >
        <h2>1. Information We Collect</h2>
        <p>We may collect the following categories of information when you interact with our website or services:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, location, and any details you submit through our contact, enquiry or career application forms.</li>
          <li><strong>Application Data:</strong> Resume/CV, work experience and other details you provide when applying for an open role.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited and time spent on our website, collected automatically through cookies and similar technologies.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and provide the services you request</li>
          <li>Review and process job applications submitted through our careers page</li>
          <li>Improve our website, services and user experience</li>
          <li>Send updates, marketing communications or service-related notices, where you have consented to receive them</li>
          <li>Comply with applicable legal and regulatory obligations</li>
        </ul>

        <h2>3. Cookies &amp; Tracking Technologies</h2>
        <p>Our website may use cookies and similar tracking technologies to remember your preferences and understand how visitors use our site. You can control or disable cookies through your browser settings; however, some parts of the website may not function properly if cookies are disabled.</p>

        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li>Trusted third-party service providers who help us operate our website and deliver our services</li>
          <li>Regulatory authorities or law enforcement, where required by law</li>
          <li>Business partners, only with your explicit consent</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>We implement reasonable technical and organizational measures to protect your information from unauthorized access, alteration, disclosure or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

        <h2>6. Data Retention</h2>
        <p>We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, including career applications, unless a longer retention period is required by law.</p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to access, correct, update or request deletion of your personal information. To exercise any of these rights, please contact us using the details below.</p>

        <h2>8. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites and encourage you to review their respective privacy policies.</p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>Our website and services are not directed at individuals under the age of 18, and we do not knowingly collect personal information from children.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically.</p>

        <hr className="legal-divider" />

        <h2>11. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or how your information is handled, please reach out to us:</p>
        <div className="legal-contact-box">
          <p><strong>Adinn Advertising Ltd</strong></p>
          <p>Email: info@adinn.co.in</p>
          <p>Phone: +918015806062</p>
          <p>Address: 29, 1st Cross Street, Vanamamalai Nagar, Bypass road,
Madurai - 625010.</p>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;