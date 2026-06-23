import type { FormConfig } from "./types"

export interface FormTemplate {
  id: string
  name: string
  description: string
  category: "auth" | "contact" | "feedback" | "ecommerce" | "custom"
  emoji: string
  config: FormConfig
}

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Simple contact form with name, email, subject, and message fields.",
    category: "contact",
    emoji: "📬",
    config: {
      name: "Contact Us",
      mode: "single",
      validation: "client",
      columns: 1,
      submitLabel: "Send Message",
      steps: [],
      fields: [
        { id: "c_name", type: "text", name: "name", label: "Full Name", placeholder: "Your name", required: true, width: "full" },
        { id: "c_email", type: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: true, width: "full" },
        { id: "c_subject", type: "select", name: "subject", label: "Subject", placeholder: "Select a topic", required: true, width: "full", options: [
          { label: "General Inquiry", value: "general" },
          { label: "Support", value: "support" },
          { label: "Partnership", value: "partnership" },
          { label: "Feedback", value: "feedback" },
        ]},
        { id: "c_message", type: "textarea", name: "message", label: "Message", placeholder: "Write your message here...", required: true, width: "full", validation: { minLength: 10, maxLength: 1000 } },
      ],
    },
  },
  {
    id: "signup",
    name: "Sign Up Form",
    description: "User registration form with name, email, password, and terms agreement.",
    category: "auth",
    emoji: "✨",
    config: {
      name: "Create Account",
      mode: "single",
      validation: "client",
      columns: 1,
      submitLabel: "Sign Up",
      steps: [],
      fields: [
        { id: "su_name", type: "text", name: "fullName", label: "Full Name", placeholder: "John Doe", required: true, width: "full" },
        { id: "su_email", type: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: true, width: "full" },
        { id: "su_password", type: "password", name: "password", label: "Password", placeholder: "At least 8 characters", required: true, width: "full", validation: { minLength: 8 } },
        { id: "su_confirm", type: "password", name: "confirmPassword", label: "Confirm Password", placeholder: "Repeat your password", required: true, width: "full" },
        { id: "su_terms", type: "checkbox", name: "agreeTerms", label: "I agree to the Terms of Service and Privacy Policy", required: true, width: "full", defaultValue: false },
      ],
    },
  },
  {
    id: "login",
    name: "Login Form",
    description: "Simple login form with email, password, and remember me toggle.",
    category: "auth",
    emoji: "🔑",
    config: {
      name: "Welcome Back",
      mode: "single",
      validation: "client",
      columns: 1,
      submitLabel: "Log In",
      steps: [],
      fields: [
        { id: "li_email", type: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: true, width: "full" },
        { id: "li_password", type: "password", name: "password", label: "Password", placeholder: "Enter your password", required: true, width: "full" },
        { id: "li_remember", type: "switch", name: "rememberMe", label: "Remember me", required: false, width: "full", defaultValue: false },
      ],
    },
  },
  {
    id: "feedback",
    name: "Feedback Form",
    description: "User feedback form with rating, category, and detailed comments.",
    category: "feedback",
    emoji: "💬",
    config: {
      name: "Share Your Feedback",
      mode: "single",
      validation: "client",
      columns: 1,
      submitLabel: "Submit Feedback",
      steps: [],
      fields: [
        { id: "fb_rating", type: "radio", name: "rating", label: "Overall Rating", required: true, width: "full", options: [
          { label: "⭐ Excellent", value: "5" },
          { label: "👍 Good", value: "4" },
          { label: "😐 Average", value: "3" },
          { label: "👎 Poor", value: "2" },
          { label: "💔 Terrible", value: "1" },
        ]},
        { id: "fb_category", type: "multiselect", name: "categories", label: "What areas can we improve?", required: false, width: "full", options: [
          { label: "UI / Design", value: "design" },
          { label: "Performance", value: "performance" },
          { label: "Documentation", value: "docs" },
          { label: "Components", value: "components" },
          { label: "Developer Experience", value: "dx" },
        ]},
        { id: "fb_like", type: "slider", name: "satisfaction", label: "Satisfaction Score", required: false, width: "full", validation: { min: 0, max: 100 }, defaultValue: 75 },
        { id: "fb_comments", type: "textarea", name: "comments", label: "Additional Comments", placeholder: "Tell us what you think...", required: false, width: "full" },
      ],
    },
  },
  {
    id: "multi-step-checkout",
    name: "Multi-Step Checkout",
    description: "3-step checkout form: Shipping → Payment → Review.",
    category: "ecommerce",
    emoji: "🛒",
    config: {
      name: "Checkout",
      mode: "multi",
      validation: "client",
      columns: 1,
      submitLabel: "Place Order",
      steps: [
        { id: "step_shipping", title: "Shipping", order: 0 },
        { id: "step_payment", title: "Payment", order: 1 },
        { id: "step_review", title: "Review", order: 2 },
      ],
      fields: [
        { id: "ch_name", type: "text", name: "fullName", label: "Full Name", placeholder: "John Doe", required: true, width: "full", stepId: "step_shipping" },
        { id: "ch_email", type: "email", name: "email", label: "Email", placeholder: "you@example.com", required: true, width: "full", stepId: "step_shipping" },
        { id: "ch_address", type: "textarea", name: "address", label: "Shipping Address", placeholder: "Street, City, ZIP", required: true, width: "full", stepId: "step_shipping" },
        { id: "ch_card", type: "text", name: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", required: true, width: "full", stepId: "step_payment" },
        { id: "ch_expiry", type: "text", name: "expiry", label: "Expiry Date", placeholder: "MM/YY", required: true, width: "half", stepId: "step_payment" },
        { id: "ch_cvv", type: "password", name: "cvv", label: "CVV", placeholder: "123", required: true, width: "half", stepId: "step_payment" },
        { id: "ch_review", type: "checkbox", name: "agreeReview", label: "I confirm all details are correct", required: true, width: "full", stepId: "step_review" },
      ],
    },
  },
  {
    id: "newsletter",
    name: "Newsletter Signup",
    description: "Quick newsletter subscription with name, email, and preferences.",
    category: "contact",
    emoji: "📧",
    config: {
      name: "Join Our Newsletter",
      mode: "single",
      validation: "client",
      columns: 1,
      submitLabel: "Subscribe",
      steps: [],
      fields: [
        { id: "nl_name", type: "text", name: "name", label: "First Name", placeholder: "Your name", required: false, width: "half" },
        { id: "nl_email", type: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: true, width: "half" },
        { id: "nl_topics", type: "multiselect", name: "topics", label: "Topics you're interested in", required: false, width: "full", options: [
          { label: "React", value: "react" },
          { label: "Next.js", value: "nextjs" },
          { label: "TypeScript", value: "typescript" },
          { label: "CSS / Design", value: "css" },
          { label: "UI Components", value: "ui" },
        ]},
        { id: "nl_frequency", type: "radio", name: "frequency", label: "Email Frequency", required: true, width: "full", options: [
          { label: "Weekly digest", value: "weekly" },
          { label: "Monthly roundup", value: "monthly" },
          { label: "Major updates only", value: "major" },
        ]},
      ],
    },
  },
]
