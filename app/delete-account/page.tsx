import type { Metadata } from "next";
import Hero from "@/components/DeleteAccount/Hero";
import AboutDeletion from "@/components/DeleteAccount/AboutDeletion";
import DataDeleted from "@/components/DeleteAccount/DataDeleted";
import DataRetained from "@/components/DeleteAccount/DataRetained";
import RequestMethods from "@/components/DeleteAccount/RequestMethods";
import ProcessTimeline from "@/components/DeleteAccount/ProcessTimeline";
import FAQSection from "@/components/DeleteAccount/FAQSection";
import PolicyLinks from "@/components/DeleteAccount/PolicyLinks";
import Footer from "@/components/reusable-components/Footer";
import { faqItems } from "@/components/DeleteAccount/faqData";

const PAGE_URL = "https://adinn.com/delete-account";
const PAGE_TITLE = "Delete Account | Adinn";
const PAGE_DESCRIPTION =
  "Learn how to permanently delete your Adinn account and understand what personal data is removed or retained in accordance with Google Play policies.";
const OG_IMAGE = "https://adinn.com/AdinnLogo.svg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Adinn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 512,
        height: 512,
        alt: "Adinn Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: {
        "@type": "WebSite",
        name: "Adinn",
        url: "https://adinn.com",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://adinn.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Delete Account",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const DeleteAccountPage = () => {
  return (
    <div className="overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />
      <AboutDeletion />
      <DataDeleted />
      <DataRetained />
      <RequestMethods />
      <ProcessTimeline />
      <FAQSection />
      <PolicyLinks />
      <Footer />
    </div>
  );
};

export default DeleteAccountPage;
