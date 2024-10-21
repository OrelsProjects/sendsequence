"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useMemo } from "react";

const lastUpdateDateText = "24/09/2024";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="bg-background text-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm mb-6 italic">
            Last updated: {lastUpdateDateText}
          </p>

          <p className="text-lg mb-6">
            Thank you for choosing {process.env.NEXT_PUBLIC_APP_NAME}{" "}
            {`("we," "us," or "our")`}. We are committed to protecting your
            personal information and your right to privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you use our service.
          </p>

          {/* 1. Access to Your Email */}
          <h2 className="text-2xl font-bold mb-4">1. Access to Your Email</h2>
          <p className="text-lg mb-6">
            Your privacy is our top priority. To provide our unique service of
            automating email sequences to your new subscribers from Substack or
            Medium, we require limited access to your Gmail account. Here&apos;s
            how we handle your email data:
          </p>

          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>
              <strong>Limited Email Access:</strong> We only access emails
              specifically from Substack or Medium that notify you of a new
              subscriber.
            </li>
            <li>
              <strong>No Unauthorized Reading:</strong> We do not read, process,
              or store the content of any other emails in your inbox.
            </li>
            <li>
              <strong>Data Extraction:</strong> From the subscriber notification
              emails, we extract only the subscriber&apos;s name and email
              address to initiate your pre-set email sequences.
            </li>
            <li>
              <strong>Encryption and Security:</strong> The extracted subscriber
              information is encrypted and securely stored. Only you have access
              to manage this data.
            </li>
            <li>
              <strong>No Sharing of Email Data:</strong> We do not share, sell,
              or rent your email data or subscriber information to any third
              parties.
            </li>
          </ul>

          <p className="text-lg mb-6">
            By granting us access to your Gmail account, you acknowledge and
            consent to this limited use. You can revoke our access at any time
            through your Google account settings.
          </p>

          {/* 2. Information We Collect */}
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="text-lg mb-6">
            Apart from limited access to your email for the purposes described
            above, we may collect the following information:
          </p>

          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Such as your name, email
              address, and contact details when you sign up for our service.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              service, including timestamps, features accessed, and
              interactions.
            </li>
          </ul>

          {/* 3. How We Use Your Information */}
          <h2 className="text-2xl font-bold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-lg mb-6">We use the information we collect to:</p>

          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>Provide, operate, and maintain our service.</li>
            <li>Improve, personalize, and expand our service.</li>
            <li>
              Communicate with you, including sending updates and promotional
              materials.
            </li>
            <li>
              Monitor and analyze usage and trends to enhance user experience.
            </li>
            <li>Comply with legal obligations and protect our rights.</li>
          </ul>

          {/* 4. Data Security */}
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-lg mb-6">
            We implement a variety of security measures to maintain the safety
            of your personal information:
          </p>

          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>
              <strong>Encryption:</strong> All sensitive data is encrypted both
              in transit and at rest.
            </li>
            <li>
              <strong>Access Controls:</strong> Only authorized personnel have
              access to personal data, and they are required to keep the
              information confidential.
            </li>
            <li>
              <strong>Regular Audits:</strong> We regularly review our data
              collection, storage, and processing practices to prevent
              unauthorized access.
            </li>
          </ul>

          {/* 5. Your Rights and Choices */}
          <h2 className="text-2xl font-bold mb-4">
            5. Your Rights and Choices
          </h2>
          <p className="text-lg mb-6">You have the right to:</p>

          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>
              <strong>Access:</strong> Request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Rectify:</strong> Correct any inaccuracies in your
              personal data.
            </li>
            <li>
              <strong>Erase:</strong> Request the deletion of your personal
              data.
            </li>
            <li>
              <strong>Restrict:</strong> Limit the processing of your personal
              data under certain conditions.
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Revoke any consent you&apos;ve
              previously given us.
            </li>
          </ul>

          <p className="text-lg mb-6">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:support@subscriberautomator.com"
              className="text-primary hover:underline"
            >
              support@subscriberautomator.com
            </a>
            .
          </p>

          {/* 6. Third-Party Services */}
          <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
          <p className="text-lg mb-6">
            We may use third-party services for hosting, analytics, and other
            functionalities. These third parties have access to your data only
            to perform tasks on our behalf and are obligated not to disclose or
            use it for any other purpose.
          </p>

          {/* 7. Cookies and Tracking Technologies */}
          <h2 className="text-2xl font-bold mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-lg mb-6">
            We may use cookies and similar tracking technologies to track
            activity on our service and hold certain information. You can
            instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent.
          </p>

          {/* 8. Children&apos;s Privacy */}
          <h2 className="text-2xl font-bold mb-4">
            8. Children&apos;s Privacy
          </h2>
          <p className="text-lg mb-6">
            Our service does not address anyone under the age of 13. We do not
            knowingly collect personal information from children under 13. If
            you are a parent or guardian and become aware that your child has
            provided us with personal data, please contact us.
          </p>

          {/* 9. Changes to This Privacy Policy */}
          <h2 className="text-2xl font-bold mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-lg mb-6">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            with an updated {"Last updated"} date.
          </p>

          {/* 10. Contact Us */}
          <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
          <p className="text-lg mb-6">
            If you have any questions or concerns about this Privacy Policy or
            our practices, please contact us at:
          </p>

          <p className="text-lg mb-6">
            Email:{" "}
            <a
              href="mailto:support@subscriberautomator.com"
              className="text-primary hover:underline"
            >
              orelsmail@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
