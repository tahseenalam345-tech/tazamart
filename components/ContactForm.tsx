"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 size={30} />
        </span>
        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Thanks for reaching out, {form.name.split(" ")[0]}. Our team will get
          back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", subject: "General enquiry", message: "" });
          }}
          className="mt-6 rounded-full border-2 border-brand-600 px-6 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-extrabold text-slate-900">Send Us a Message</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Name *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Email *
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            type="email"
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Subject
          </label>
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputCls}
          >
            <option>General enquiry</option>
            <option>Order support</option>
            <option>Delivery question</option>
            <option>Returns & refunds</option>
            <option>Partner with us</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Message *
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            rows={5}
            required
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        <Send size={15} />
        Send Message
      </button>
    </form>
  );
}
