export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How long does account deletion take?",
    answer:
      "Once your request is verified, we permanently delete your account and associated personal data within 7 business days.",
  },
  {
    question: "Can I recover my account after deletion?",
    answer:
      "No. Account deletion is permanent and irreversible. Once processed, your profile, login credentials, and personal data cannot be restored.",
  },
  {
    question: "Will my payment history be deleted?",
    answer:
      "Financial and transaction records linked to your account may be retained for the period required by applicable tax, accounting, and financial regulations, even after your account is deleted.",
  },
  {
    question: "What data is retained after deletion?",
    answer:
      "We retain only the limited records required by law or legitimate business compliance, such as financial records, accounting records, audit logs, and legal compliance data. This data is stored solely for the legally mandated retention period and is not used for any other purpose.",
  },
  {
    question: "Can I register again after deleting my account?",
    answer:
      "Yes. You are free to create a new Adinn account at any time using the mobile app. Your previous account data will not be restored, as deletion is permanent.",
  },
];
