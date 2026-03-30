"use client";

import { useState } from "react";

interface LeadFormProps {
  leadMagnet: string;
  buttonText?: string;
  showEventType?: boolean;
  showEventDate?: boolean;
  showBudget?: boolean;
  onSuccess?: () => void;
}

export default function LeadForm({
  leadMagnet,
  buttonText = "Get My Free Guide →",
  showEventType = true,
  showEventDate = false,
  showBudget = false,
  onSuccess,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    eventType: "",
    eventDate: "",
    budget: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (showEventType && !formData.eventType) {
      newErrors.eventType = "Please select an event type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store lead data (would normally send to API)
    const leadData = {
      ...formData,
      leadMagnet,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    console.log("Lead captured:", leadData);
    localStorage.setItem(`lead_${Date.now()}`, JSON.stringify(leadData));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Fire tracking pixels
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: leadMagnet });
    }

    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <div className="luxury-card p-8 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-white mb-2">You're Almost There!</h3>
        <p className="text-gray-300 mb-6">
          Check your email for your {leadMagnet}. We've sent it to <span className="text-white font-medium">{formData.email}</span>
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Didn't receive it? Check your spam folder or</p>
          <a
            href="mailto:support@emilyexperience.com"
            className="text-emily-gold hover:text-emily-gold-light transition-colors text-sm font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-card p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="firstName" className="luxury-label">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="luxury-input w-full"
          />
          {errors.firstName && <p className="form-error">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="luxury-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="luxury-input w-full"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        {showEventType && (
          <div>
            <label htmlFor="eventType" className="luxury-label">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="luxury-input w-full cursor-pointer"
            >
              <option value="">Select your event type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="birthday">Birthday Party</option>
              <option value="anniversary">Anniversary</option>
              <option value="baby-shower">Baby Shower</option>
              <option value="graduation">Graduation</option>
              <option value="other">Other</option>
            </select>
            {errors.eventType && <p className="form-error">{errors.eventType}</p>}
          </div>
        )}

        {showEventDate && (
          <div>
            <label htmlFor="eventDate" className="luxury-label">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="luxury-input w-full"
            />
          </div>
        )}

        {showBudget && (
          <div>
            <label htmlFor="budget" className="luxury-label">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="luxury-input w-full cursor-pointer"
            >
              <option value="">Select your budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-20k">$10,000 - $20,000</option>
              <option value="20k-50k">$20,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold-gradient w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            buttonText
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </form>
  );
}
