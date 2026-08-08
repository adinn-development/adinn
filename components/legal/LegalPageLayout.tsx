// components/legal/LegalPageLayout.tsx
"use client";

import { ReactNode } from "react";
import bannerImage from "@/assets/careers/careerbanner.jpg";

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  intro?: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  effectiveDate,
  intro,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="legal-page">
      {/* ── Banner Section (same image/treatment as Careers hero) ── */}
      <div
        className="legal-header"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(8,10,16,0.55), rgba(8,10,16,0.55)), url(${bannerImage.src})`,
        }}
      >
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Effective Date: {effectiveDate}</p>
        {intro && <p className="legal-intro">{intro}</p>}
      </div>

      {/* ── Centered Content Card ── */}
      <div className="legal-wrapper">
        <div className="legal-content">{children}</div>
      </div>

      <style jsx global>{`
        .legal-page {
          font-family: "PlusJakartaSans", sans-serif;
          background: #fbf9ff;
        }

        /* Banner */
        .legal-header {
          min-height: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 120px 60px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .legal-title {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 700;
          font-size: 42px;
          line-height: 110%;
          letter-spacing: 0%;
          margin: 0 0 16px;
          color: #ffffff;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
        }
        .legal-updated {
          display: inline-block;
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #1d1d1f;
          background: rgba(255, 255, 255, 0.92);
          padding: 8px 20px;
          border-radius: 30px;
          margin: 0 0 22px;
        }
        .legal-intro {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 155%;
          color: #f1f1f3;
          max-width: 760px;
          margin: 0 auto;
        }

        /* Centered content */
        .legal-wrapper {
          display: flex;
          justify-content: center;
          padding: 60px 120px 90px;
          background: #fbf9ff;
        }
        .legal-content {
          width: 100%;
          max-width: 860px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          box-shadow: 0 10px 34px rgba(0, 0, 0, 0.08);
          padding: 56px 64px;
        }

        .legal-content h2 {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 600;
          font-size: 24px;
          line-height: 130%;
          color: #1d1d1f;
          margin: 40px 0 14px;
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content h3 {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 600;
          font-size: 19px;
          color: #1d1d1f;
          margin: 26px 0 10px;
        }
        .legal-content p {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 165%;
          color: #333;
          margin: 0 0 14px;
        }
        .legal-content ul {
          margin: 0 0 16px;
          padding-left: 22px;
        }
        .legal-content li {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 165%;
          color: #333;
          margin-bottom: 8px;
        }
        .legal-content a {
          color: #ec2b45;
          font-weight: 600;
          text-decoration: none;
        }
        .legal-content a:hover {
          text-decoration: underline;
        }
        .legal-content strong {
          color: #1d1d1f;
        }
        .legal-divider {
          border: none;
          border-top: 1px solid #eee;
          margin: 36px 0;
        }
        .legal-contact-box {
          background: #fbf9ff;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          padding: 20px 24px;
          margin-top: 8px;
        }
        .legal-contact-box p {
          margin: 0 0 6px;
        }

        /* ── Responsive ── */
        @media (max-width: 1030px) {
          .legal-header {
            padding: 100px 50px 50px;
            min-height: 320px;
          }
          .legal-wrapper {
            padding: 50px 50px 70px;
          }
          .legal-content {
            padding: 40px 36px;
          }
        }
        @media (max-width: 700px) {
          .legal-header {
            padding: 90px 20px 40px;
            min-height: 280px;
          }
          .legal-title {
            font-size: 30px !important;
          }
          .legal-intro {
            font-size: 16px !important;
          }
          .legal-wrapper {
            padding: 40px 20px 60px;
          }
          .legal-content {
            padding: 30px 22px;
          }
          .legal-content h2 {
            font-size: 20px !important;
          }
          .legal-content p,
          .legal-content li {
            font-size: 15px !important;
          }
        }
        @media (max-width: 400px) {
          .legal-title {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}