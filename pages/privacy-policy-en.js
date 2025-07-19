import MainLayout from '../components/layouts/MainLayout';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function PrivacyPolicyEn() {
  return (
    <MainLayout>
      <NextSeo
        title="Privacy Policy | Metropol Reklam"
        description="Metropol Reklam privacy policy and terms of use."
        canonical="https://metropolreklam.net/privacy-policy-en"
      />

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">METROPOL REKLAM PRIVACY POLICY</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">Last Updated: July 19, 2025</p>
          
          <div className="mt-4 flex items-center justify-center space-x-4">
            <Link href="/privacy-policy" className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-medium transition duration-300">
              Türkçe
            </Link>
            <span className="px-3 py-1 bg-primary text-white rounded font-medium">English</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Metropol Reklam ("Company," "we," "us," or "our") respects the privacy of our users ("User," "you," or "your") who visit our website at www.metropolreklam.net ("Site"). This Privacy Policy explains the types of personal data we collect through the Site, how we use it, with whom we share it, and your rights regarding this data.
          </p>
          <p>
            This policy has been prepared in accordance with the Turkish Personal Data Protection Law No. 6698 ("KVKK") and also considers the principles of the General Data Protection Regulation (GDPR) for our international users.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Data Controller</h2>
          <p>
            Within the scope of KVKK, the data controller for your personal data is Metropol Reklam, with its registered address at Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın, Turkey.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Personal Data We Collect</h2>
          <p>We may collect the following types of personal data when you use our Site:</p>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Data You Provide Directly:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Contact Form:</strong> When you fill out the contact form on our Site, we collect your name, surname, email address, phone number, and any other information contained in your message.</li>
            <li><strong>User Account (if applicable):</strong> For accounts created for the admin panel or user login, we collect your email address and hashed password.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">Data Collected Automatically:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Analytics Data:</strong> When you visit our Site, we use the Umami Analytics platform to collect anonymous or pseudonymized data to analyze site usage. This data may include pages visited, time spent on the site, device type, operating system, browser information, and geographic location (at the country/city level). This data does not directly identify you personally.</li>
            <li><strong>Cookies:</strong> We use cookies for session management (e.g., keeping you logged in to the admin panel), improving site performance, and enhancing user experience.</li>
            <li><strong>Google reCAPTCHA Data:</strong> We use the Google reCAPTCHA service to protect our forms from spam and abuse. This service collects hardware and software information, which is sent to Google for analysis. The use of this data is subject to Google's Privacy Policy.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Why and How We Use Your Personal Data</h2>
          <p>We use the personal data we collect for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>To Provide Services:</strong> To respond to your requests and inquiries and to provide you with information.</li>
            <li><strong>To Communicate:</strong> To contact you and inform you about your requests.</li>
            <li><strong>For Site Security:</strong> To keep our Site and services secure and to prevent fraud and abuse (e.g., reCAPTCHA).</li>
            <li><strong>For Improvement and Analysis:</strong> To analyze the performance and user experience of our Site to improve our services (e.g., Umami Analytics).</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. With Whom We Share Your Personal Data</h2>
          <p>
            We do not share your personal data with third parties without your consent, except as required by law. However, we may share data with the following service providers to deliver our services:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Hosting and Database Providers:</strong> Our website is hosted on Vercel, and our data is stored in a MySQL database.</li>
            <li><strong>Email Delivery Services:</strong> We may use third-party services like the Resend API for emails sent through our contact forms.</li>
            <li><strong>Security Providers:</strong> The Google reCAPTCHA service for spam protection.</li>
            <li><strong>Widget Providers:</strong> We may use third-party widget providers like Elfsight to display features such as Google Reviews on our Site.</li>
            <li><strong>Legal Authorities:</strong> We may share your data with authorized public institutions and organizations upon a legal request.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights as a Data Subject</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To learn whether your personal data is being processed,</li>
            <li>To request information if it has been processed,</li>
            <li>To learn the purpose of the processing and whether it is used in line with its purpose,</li>
            <li>To know the third parties to whom your data has been transferred, at home or abroad,</li>
            <li>To request the correction of incomplete or incorrect data,</li>
            <li>To request the deletion or destruction of your data under the conditions stipulated in the relevant legislation,</li>
            <li>To request that correction, deletion, or destruction operations be notified to third parties to whom the data has been transferred,</li>
            <li>To object to any unfavorable outcome that may arise from the analysis of your data exclusively through automated systems,</li>
            <li>To request compensation for damages arising from the unlawful processing of your data.</li>
          </ul>
          <p>
            To exercise these rights, you can contact us at <a href="mailto:metropolreklam@hotmail.com" className="text-primary hover:underline">metropolreklam@hotmail.com</a>. Users residing in the European Union may have additional rights under the GDPR.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will take effect on the date they are published on our Site.
          </p>
        </div>

        <hr className="my-12 border-gray-300" />

        <h1 className="text-3xl font-bold mb-8 text-center">METROPOL REKLAM TERMS OF USE</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Last Updated: July 19, 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="italic mb-6">
            Please read these Terms of Use ("Agreement") carefully before using our website at www.metropolreklam.net ("Site").
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Parties and Acceptance</h2>
          <p>
            This Agreement is entered into between Metropol Reklam ("Company"), located at Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın, Turkey, and the person using the Site ("User"). By accessing or using the Site, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this Agreement. If you do not agree to these terms, you must not use the Site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
          <p>
            This Site is established to provide information about the advertising services offered by Metropol Reklam, to showcase its projects (gallery), and to enable users to contact the Company.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property Rights</h2>
          <p>
            All text, images, logos, graphics, designs, and other materials on the Site ("Content") are the intellectual property of Metropol Reklam or are used under license. The User may not copy, reproduce, distribute, or create derivative works from the Content without the prior written consent of the Company.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. User Obligations</h2>
          <p>By using the Site, the User agrees to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Comply with all applicable laws,</li>
            <li>Provide accurate and current information in contact forms or other interactive areas,</li>
            <li>Refrain from any activity that could compromise the Site's security or interfere with its operation (e.g., sending spam, transmitting viruses, attempting to hack),</li>
            <li>Not infringe upon the rights of other users or the Company.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services that are not controlled by us (e.g., Google Reviews widget). We are not responsible for the content, privacy policies, or practices of these sites. We recommend that you review the terms and policies of any third-party sites you visit.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            The Site is provided on an "as is" and "as available" basis. The Company does not warrant that the Site will be uninterrupted, error-free, or secure. The Company shall not be liable for any direct or indirect damages arising from the use of the Site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to the Agreement</h2>
          <p>
            The Company reserves the right to unilaterally modify this Agreement at any time without prior notice. Changes become effective at the time they are published on the Site. Your continued use of the Site signifies your acceptance of the modified Agreement.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law and Jurisdiction</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of the Republic of Turkey. The Ankara Courts and Execution Offices shall have exclusive jurisdiction to settle any dispute arising from this Agreement.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact</h2>
          <p>
            If you have any questions about this Agreement, you can contact us at <a href="mailto:metropolreklam@hotmail.com" className="text-primary hover:underline">metropolreklam@hotmail.com</a>.
          </p>
          </div>
          
          <div className="flex justify-between mt-8">
            <a href="#top" className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </a>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h1 className="text-3xl font-bold mb-8 text-center">METROPOL REKLAM TERMS OF USE</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">Last Updated: July 19, 2025</p>

          <div className="prose prose-lg max-w-none">
            <p className="italic mb-6">
              Please read these Terms of Use ("Agreement") carefully before using our website at www.metropolreklam.net ("Site").
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Parties and Acceptance</h2>
            <p>
              This Agreement is entered into between Metropol Reklam ("Company"), located at Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın, Turkey, and the person using the Site ("User"). By accessing or using the Site, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this Agreement. If you do not agree to these terms, you must not use the Site.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p>
              This Site is established to provide information about the advertising services offered by Metropol Reklam, to showcase its projects (gallery), and to enable users to contact the Company.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property Rights</h2>
            <p>
              All text, images, logos, graphics, designs, and other materials on the Site ("Content") are the intellectual property of Metropol Reklam or are used under license. The User may not copy, reproduce, distribute, or create derivative works from the Content without the prior written consent of the Company.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Obligations</h2>
            <p>By using the Site, the User agrees to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Comply with all applicable laws,</li>
              <li>Provide accurate and current information in contact forms or other interactive areas,</li>
              <li>Refrain from any activity that could compromise the Site's security or interfere with its operation (e.g., sending spam, transmitting viruses, attempting to hack),</li>
              <li>Not infringe upon the rights of other users or the Company.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services that are not controlled by us (e.g., Google Reviews widget). We are not responsible for the content, privacy policies, or practices of these sites. We recommend that you review the terms and policies of any third-party sites you visit.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              The Site is provided on an "as is" and "as available" basis. The Company does not warrant that the Site will be uninterrupted, error-free, or secure. The Company shall not be liable for any direct or indirect damages arising from the use of the Site.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to the Agreement</h2>
            <p>
              The Company reserves the right to unilaterally modify this Agreement at any time without prior notice. Changes become effective at the time they are published on the Site. Your continued use of the Site signifies your acceptance of the modified Agreement.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law and Jurisdiction</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the Republic of Turkey. The Ankara Courts and Execution Offices shall have exclusive jurisdiction to settle any dispute arising from this Agreement.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact</h2>
            <p>
              If you have any questions about this Agreement, you can contact us at <a href="mailto:metropolreklam@hotmail.com" className="text-primary hover:underline">metropolreklam@hotmail.com</a>.
            </p>
          </div>
          
          <div className="flex justify-between mt-8">
            <a href="#top" className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
