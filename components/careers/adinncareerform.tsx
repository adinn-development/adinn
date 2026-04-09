"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import uploadIcon from "@/assets/careers/noun-cloud-upload-857930.svg";

const jobRoles = [
  {
    id: 1,
    title: "Digital Marketing Executive",
    description: "Create high-impact campaigns across Google, Meta & more",
    location: "Madurai / Onsite",
  },
  {
    id: 2,
    title: "Front-End Developer (React.js)",
    description: "Build fast, beautiful web interfaces",
    location: "Madurai / Onsite",
  },
  {
    id: 3,
    title: "SEO Specialist",
    description: "Boost visibility with smart, ethical strategies",
    location: "Madurai / Onsite",
  },
  {
    id: 4,
    title: "Telecaller Executive ( Female )",
    description: "Generate leads, resolve queries, support sales",
    location: "Madurai / Onsite",
  },
];
const jobRole = [
  {
    id: 1,
    title: "Digital Marketing Executive",
    description: "Create high-impact campaigns across Google, Meta & more",
    location: "Madurai / Onsite",
  },
  {
    id: 2,
    title: "Front-End Developer (React.js)",
    description: "Build fast, beautiful web interfaces",
    location: "Madurai / Onsite",
  },
];
export default function AdinnCareerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      showToast("Please upload PDF or DOC/DOCX files only", "error");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size should be less than 5MB", "error");
      return;
    }
    
    setFileName(file.name);
    setSelectedFile(file);
  }
};

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

 const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();

 // Name validation
if (!form.fullName.trim()) { showToast("Please enter your full name", "error"); return; }
const nameRegex = /^[A-Za-z\s]+$/;
if (!nameRegex.test(form.fullName.trim())) { 
  showToast("Name should only contain letters and spaces", "error"); 
  return; 
}

// Phone validation
// Phone validation - strictly 10 digits only
if (!form.phone.trim()) { showToast("Please enter your phone number", "error"); return; }
const phoneRegex = /^[0-9]+$/;
if (!phoneRegex.test(form.phone.trim())) { 
  showToast("Phone number should only contain digits (0-9)", "error"); 
  return; 
}
if (form.phone.trim().length !== 10) { 
  showToast("Phone number must be exactly 10 digits", "error"); 
  return; 
}

// Email validation
if (!form.email.trim()) { showToast("Please enter your email address", "error"); return; }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(form.email)) { showToast("Please enter a valid email address", "error"); return; }

// Location validation
if (!form.location.trim()) { showToast("Please enter your location", "error"); return; }

// Resume validation (MANDATORY)
if (!selectedFile) { 
  showToast("Please upload your resume (PDF, DOC, or DOCX format)", "error"); 
  return; 
}

  setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("mailtype", "adinncareers");
      formData.append("userName", form.fullName);
      formData.append("userEnquiryEmail", form.email);
      formData.append("userPhoneNumber", form.phone);
      formData.append("userEnquiryLocation", form.location);
      formData.append("userAppliedRole", selectedRole);
      if (selectedFile) formData.append("userResume", selectedFile);

      const response = await fetch("https://adinndigital.com/api/careers/index_adinncareers.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        showToast("Application submitted successfully! Our team will contact you soon.", "success");
        setForm({ fullName: "", phone: "", email: "", location: "" });
        setFileName("");
        setSelectedFile(null);
        setTimeout(() => setIsOpen(false), 2000);
      } else {
        showToast(result.message || "Failed to submit application. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className={`adinn-toast adinn-toast-${toast.type}`}>
          <span className="adinn-toast-message">{toast.message}</span>
          <button className="adinn-toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* ── Why Join Adinn Section ── */}
<div className="adinn-why-section">
  <h2 className="adinn-why-title">Why to Join Adinn Advertising</h2>
  <p className="adinn-why-subtitle">
    We don’t just hire people. We invest in talent.
  </p>

  <div className="adinn-why-grid">
    {[
      {
        title: "Growth Focused",
        desc: "Constant learning and upskilling",
      },
      {
        title: "Innovative Mindset",
        desc: "Explore bold ideas without boundaries",
      },
      {
        title: "Digital-First Thinking",
        desc: "Work that impacts globally",
      },
      {
        title: "Collaborative Culture",
        desc: "Your voice matters here",
      },
      {
        title: "Work-Life Balance",
        desc: "We believe balance fuels creativity",
      },
      {
        title: "Purpose in What We Do",
        desc: "Every role adds real value",
      },
    ].map((item, i) => (
      <div key={i} className="adinn-why-card">
        <h3 className="adinn-why-card-title">{item.title}</h3>
        <p className="adinn-why-card-desc">{item.desc}</p>
      </div>
    ))}
  </div>
</div>

      {/* ── Open Roles Section ── */}
      <div id="open-roles-section" className="adinn-roles-section">
    <h2 className="adinn-roles-title">Open Roles</h2>
    <p className="adinn-roles-subtitle">
      Explore current roles at <strong>Adinn Digital</strong>
    </p>

    <div className="adinn-roles-grid">
      {jobRoles.map((job) => (
        <div key={job.id} className="adinn-role-card">
          <h3 className="adinn-role-name">{job.title}</h3>
          <p className="adinn-role-desc">{job.description}</p>
          <p className="adinn-role-location">{job.location}</p>
          <button
            className="adinn-apply-btn"
            onClick={() => handleOpenModal(job.title)}
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>

      <div className="adinn-roles-section">
        <h2 className="adinn-roles-title">Open Roles</h2>
        <p className="adinn-roles-subtitle">
          Explore current roles at <strong>Adinn Outdoor</strong>
        </p>

        <div className="adinn-roles-grid">
          {jobRole.map((job) => (
            <div key={job.id} className="adinn-role-card">
              <h3 className="adinn-role-name">{job.title}</h3>
              <p className="adinn-role-desc">{job.description}</p>
              <p className="adinn-role-location">{job.location}</p>
              <button
                className="adinn-apply-btn"
                onClick={() => handleOpenModal(job.title)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {isOpen && (
        <div className="adinn-overlay" onClick={() => setIsOpen(false)}>
          <div className="adinn-modal" onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button className="adinn-close" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>

            {/* Header */}
            <div className="adinn-header">
              <h2 className="adinn-title">Why to Join Adinn Advertising</h2>
              <p className="adinn-subtitle">
                We don&apos;t just hire people. We invest in talent.
              </p>
              {selectedRole && (
                <p className="adinn-role-badge">Applying for: <strong>{selectedRole}</strong></p>
              )}
            </div>

            {/* Form */}
            <div className="adinn-form">
              <div className="adinn-field">
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                  placeholder="Full Name *" className="adinn-input" disabled={isLoading} />
              </div>
              <div className="adinn-field">
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Phone Number *" className="adinn-input" disabled={isLoading} />
              </div>
              <div className="adinn-field">
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address *" className="adinn-input" disabled={isLoading} />
              </div>
              <div className="adinn-field">
                <input type="text" name="location" value={form.location} onChange={handleChange}
                  placeholder="Location *" className="adinn-input" disabled={isLoading} />
              </div>

              {/* Upload Resume */}
              <div
                className="adinn-upload"
                onClick={() => !isLoading && fileInputRef.current?.click()}
                style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
              >
<Image 
  src={uploadIcon} 
  alt="Upload" 
  width={40} 
  height={30}
  className="w-[40px] h-[30px] max-[600px]:!w-[20px] max-[600px]:!h-[20px]"
/>                  {/* <span className="adinn-upload-text">{fileName ? fileName : "Upload Resume"}</span>
                <span className="adinn-upload-hint">(PDF/DOC, max 5MB)</span> */}
                <span className="adinn-upload-text">{fileName ? fileName : "Upload Resume *"}</span>
<span className="adinn-upload-hint">(PDF/DOC/DOCX, max 5MB)</span>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx"
                  onChange={handleFileChange} style={{ display: "none" }} disabled={isLoading} />
              </div>

              {/* Submit */}
              <button className="adinn-submit" onClick={handleSubmit} disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Open Roles Section ── */
        .adinn-roles-section {
          padding: 40px 120px;
          background: #FBF9FF;
;
          font-family: "PlusJakartaSans", sans-serif;
        }
        .adinn-roles-title {
          font-family: PlusJakartaSans;
font-weight: 600;
font-style: SemiBold;
font-size: 30px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;
        }
        .adinn-roles-subtitle {
          font-family: PlusJakartaSans;
font-weight: 500;
font-style: Medium;
font-size: 24px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;
padding: 20px 0px;
        }
        .adinn-roles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
           max-width: 100%;
        }
        .adinn-role-card {
          background: rgba(255, 255, 255, 0.75);
          border-radius: 10px;
          padding: 22px 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
          .adinn-role-card:hover {
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }
        .adinn-role-name {
          color: #1D1D1F;
          margin: 0;
          font-family: PlusJakartaSans;
font-weight: 600;
font-style: Medium;
font-size: 20px;
leading-trim: NONE;
line-height: 33px;
letter-spacing: 0%;
vertical-align: middle;

        }
        .adinn-role-desc {
          font-size: 13px;
          color: #1D1D1F; 
          margin: 0;font-family: PlusJakartaSans;
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;
        }
        .adinn-role-location {
          font-family: PlusJakartaSans;
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;

        }
        .adinn-apply-btn {
          width: fit-content;
          background: linear-gradient(270deg, #861927 0%, #EC2B45 100%);
          color: #fff;
          border: none;
          border-radius: 35px;
          padding: 10px 28px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: "PlusJakartaSans", sans-serif;
          transition: opacity 0.2s, transform 0.1s;
          margin-top: 20px;
        }
        .adinn-apply-btn:hover { opacity: 0.9; }
        .adinn-apply-btn:active { transform: scale(0.97); }

        /* ── Overlay ── */
        .adinn-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── Modal ── */
        .adinn-modal {
          background: #fff;
          border-radius: 10px;
          padding: 30px 46px 20px;
          width: 100%;
          max-width: 780px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          animation: slideUp 0.25s ease;
          font-family: "PlusJakartaSans", sans-serif;
          margin-top:40px;
          margin-bottom: 40px;
        }
        @keyframes slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .adinn-close {
          position: absolute;
          top: 14px;
          right: 16px;
          background: none;
          border: none;
          font-size: 18px;
          color: #888;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .adinn-close:hover { color: #333; }

        .adinn-header { margin-bottom: 4px; }
        .adinn-title {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #1D1D1F;
          margin: 0 0 6px;
        }
        .adinn-subtitle {
          font-family: "Montagu Slab", serif;
          font-weight: 400;
          font-size: 18px;
          color: #000;
          margin: 0;
          padding: 0px 10px 10px 0;
        }
        .adinn-role-badge {
          font-size: 13px;
          color: #861927;
          margin: 6px 0 0;
          padding: 6px 12px;
          background: #fdf0f1;
          border-radius: 6px;
          display: inline-block;
        }

        .adinn-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px 60px;
        }
        .adinn-field { position: relative; }
        .adinn-input {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 16px;
          color: #333;
          background: #EEEEEE;
          outline: none !important;
          box-shadow: none !important;
          box-sizing: border-box;
          font-family: "Georgia", serif;
          transition: border-color 0.2s, background 0.2s;
        }
        .adinn-input::placeholder { color: #1D1D1F; }
        .adinn-input:focus {
          border-color: #000 !important;
          background: #fff;
          outline: none !important;
          box-shadow: none !important;
        }
        .adinn-input:disabled { background: #cccccc; cursor: not-allowed; }

        .adinn-upload {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #ddd;
          border-radius: 10px;
          padding: 11px 14px;
          background: #CFCDCD;
          transition: border-color 0.2s;
          color: #555;
        }
        .adinn-upload:hover { border-color: #c0392b; }
        .adinn-upload-text {
          font-family: "PlusJakartaSans", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #1D1D1F;
        }
        .adinn-upload-hint {
          font-family: "PlusJakartaSans", sans-serif;
          font-size: 12px;
          color: #1D1D1F;
        }

        .adinn-submit {
          width: 140px;
          border-radius: 35px;
          padding: 10px 35px;
          margin-top: 20px;
          background: linear-gradient(270deg, #861927 0%, #EC2B45 100%);
          color: #fff;
          font-family: "PlusJakartaSans", sans-serif;
          font-size: 18px;
          border: none;
          cursor: pointer;
          transition: transform 0.1s, opacity 0.2s;
        }
        .adinn-submit:hover { opacity: 0.9; }
        .adinn-submit:active { transform: scale(0.98); }
        .adinn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ── Toast ── */
        .adinn-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-radius: 8px;
          font-family: "PlusJakartaSans", sans-serif;
          font-size: 14px;
          font-weight: 500;
          min-width: 300px;
          max-width: 450px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideInRight 0.3s ease;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .adinn-toast-success { background: #10b981; color: white; border-left: 4px solid #059669; }
        .adinn-toast-error { background: #ef4444; color: white; border-left: 4px solid #dc2626; }
        .adinn-toast-message { flex: 1; margin-right: 12px; }
        .adinn-toast-close {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 0 4px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .adinn-toast-close:hover { opacity: 1; }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .adinn-roles-grid { grid-template-columns: 1fr; }
          .adinn-modal { padding: 24px 18px 22px; }
          .adinn-form { padding: 20px; }
          .adinn-toast { left: 20px; right: 20px; min-width: auto; }
        }
          /* ── Why Join Section ── */
.adinn-why-section {
  padding: 70px 120px;
  font-family: "PlusJakartaSans", sans-serif;
   background: #FBF9FF;
}

.adinn-why-title {
  font-family: PlusJakartaSans;
font-weight: 600;
font-style: SemiBold;
font-size: 30px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;
color: #1D1D1F;
}

.adinn-why-subtitle {
  font-family: PlusJakartaSans;
font-weight: 400;
font-style: Regular;
font-size: 24px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
vertical-align: middle;
color: #000000;
padding-top: 10px;
}

.adinn-why-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.adinn-why-card {
  background: rgba(255, 255, 255, 0.75);
  border-radius: 14px;
  padding: 22px;
  border: 1px solid #f0f0f0;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);
  transition: 0.3s ease;
}

.adinn-why-card:hover {
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.adinn-why-card-title {
  font-weight: 600;
  font-size: 18px;
  color: #111;
  margin: 0 0 6px;
}

.adinn-why-card-desc {
  font-size: 15px;
  color: #555;
  margin: 0;
}

.adinn-upload-required {
  border-color: #ff6b6b;
  background: #fff5f5;
}

/* Responsive */
@media (max-width: 900px) {
  .adinn-why-grid {
    grid-template-columns: 1fr 1fr;
  }
  .adinn-roles-section{
   padding: 50px 20px;
  }
  .adinn-why-section{
     padding: 50px 20px;
  }
}
@media (max-width: 1030px){
   .adinn-roles-section{
   padding: 70px 50px;
  }
  .adinn-why-section{
     padding: 70px 50px;
  }
  .adinn-role-desc, .adinn-role-location{
    font-size: 16px;
    line-height: 120% !important;
  }
}
@media (max-width: 600px) {
  .adinn-why-section {
    padding: 50px 20px;
  }
  .adinn-why-grid {
    grid-template-columns: 1fr;
  }
  .adinn-why-title{
     font-size: 24px !important;
     line-height: 120% !important;
  }
  .adinn-why-subtitle,.adinn-title, .adinn-roles-subtitle {
     font-size: 20px !important;
     line-height: 120% !important;
  }
  .adinn-subtitle,{
    font-size: 16px !important;
     line-height: 120% !important;
  }   
  .adinn-roles-section{
     padding: 70px 20px !important;
  }
  .adinn-upload-text{
       font-size: 14px !important;
  }
    .adinn-upload-hint {
        font-size: 10px !important;
  }      
      }
@media (max-width: 400px){
  .adinn-upload-text{
       font-size: 12px !important;
  }
        .adinn-upload-hint {
        font-size: 8px !important;
  }  
}
@media (max-width: 320px){
.adinn-title, .adinn-roles-subtitle, .adinn-roles-subtitle, .adinn-role-name{
  font-size: 18px !important;
}
    .adinn-subtitle,{
  font-size: 14px !important;
}
} 

      `}</style>
    </>
  );
}