// app/terms-conditions/page.tsx

import Footer from "@/components/reusable-components/Footer";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Terms & Conditions | Adinn Advertising Ltd",
  description:
    "Read the Terms & Conditions governing your use of the Adinn Advertising Ltd website and services.",
};

const TermsConditionsPage = () => {
  return (
    <div>
      <LegalPageLayout
        title="Terms & Conditions"
        effectiveDate="August 08, 2026"
        intro="These Terms &amp; Conditions (“Terms”) govern your access to and use of the Adinn Advertising Ltd (“Adinn”, “we”, “us” or “our”) website and services. By using our website, you agree to be bound by these Terms."
      >
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our website, you confirm that you have read, understood and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our website.</p>

        <h2>2. Use of Website</h2>
        <p>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, restrict or inhibit anyone else&apos;s use of the website. Prohibited behaviour includes:</p>
        <ul>
          <li>Attempting to gain unauthorized access to our systems or data</li>
          <li>Uploading or transmitting harmful code, viruses or malicious content</li>
          <li>Submitting false, misleading or fraudulent information through our forms, including career applications</li>
          <li>Using the website in any way that could damage, disable or impair its functioning</li>
        </ul>

        <h2>3. Career Applications</h2>
        <p>When you apply for an open role through our careers page, you confirm that all information and documents (including your resume) submitted are accurate and belong to you. Submission of an application does not guarantee an interview, offer of employment or any other commitment from Adinn.</p>

        <h2>4. Intellectual Property</h2>
        <p>All content on this website, including text, graphics, logos, images and software, is the property of Adinn Advertising Ltd or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works from any content without our prior written consent.</p>

        <h2>5. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites for your convenience. We do not endorse and are not responsible for the content, accuracy or practices of any linked third-party website.</p>

        <h2>6. Disclaimer</h2>
        <p>Our website and its content are provided on an “as is” and “as available” basis. While we strive to keep information accurate and up to date, we make no warranties, express or implied, regarding the completeness, reliability or accuracy of the content.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Adinn Advertising Ltd shall not be liable for any direct, indirect, incidental or consequential damages arising out of your use of, or inability to use, our website or services.</p>

        <h2>8. Indemnification</h2>
        <p>You agree to indemnify and hold Adinn Advertising Ltd, its employees and affiliates harmless from any claims, damages or expenses arising from your misuse of the website or violation of these Terms.</p>

        <h2>9. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of India, and any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Madurai, Tamil Nadu.</p>

        <h2>10. Changes to These Terms</h2>
        <p>We may revise these Terms from time to time. Any updates will be posted on this page with a revised effective date. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</p>

        <hr className="legal-divider" />

        <h2>11. Contact Us</h2>
        <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
        <div className="legal-contact-box">
          <p><strong>Adinn Advertising Ltd</strong></p>
          <p>Email: info@adinn.co.in</p>
          <p>Phone: +918015806062</p>
          <p>Address:29, 1st Cross Street, Vanamamalai Nagar, Bypass road,
Madurai - 625010.</p>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
};

export default TermsConditionsPage;