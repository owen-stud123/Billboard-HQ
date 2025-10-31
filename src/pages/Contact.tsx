import React, { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  value: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus(""), 6000);
  };

  const contactInfo: ContactInfo[] = [
    { icon: <FaEnvelope />, title: "Email", value: "...@gmail.com" },
    { icon: <FaPhone />, title: "Phone", value: "+250 ... " },
    { icon: <FaMapMarkerAlt />, title: "Location", value: "Kigali, Rwanda" },
  ];

  const benefits: string[] = [
    "Direct connection with billboard owners",
    "Transparent pricing and negotiations",
    "Real-time campaign analytics",
    "24/7 customer support",
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Get In Touch</h2>
          <p className="text-lg text-gray-600">
            Have questions? message us and we'll respond as soon as possible.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="space-y-8">

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              {contactInfo.map(({ icon, title, value }, i) => (
                <div key={i} className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-sky-100 text-sky-600 rounded-full text-lg">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-gray-600">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl p-8 shadow">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-2">
                {benefits.map((b, i) => (
                  <li key={i}>* {b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl p-8 shadow">
            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email", "subject"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-2 capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                  placeholder="Tell us about your advertising needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                <span>Send Message</span>
                <FaPaperPlane />
              </button>
            </form>

            {/* Success message */}
            {status && (
              <p className="mt-6 text-center text-black-600 font-semibold bg-green-50 p-3 rounded-xl">
                {status}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;

