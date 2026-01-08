import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please enter a message").max(1000),
});
export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
  });

  const [showModal, setShowModal] = useState(false);
  const [sendError, setSendError] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  async function onSubmit(data) {
    setSendError(null);
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      };
      //send email via emailjs
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setShowModal(true);
      reset();
    } catch (err) {
      console.error("emailjs error:", err);
      setSendError(
        "An error occurred while sending your message. Please try again later."
      );
    }
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-black to-[#060606] text-white px-6 py-24 relative">
      {/*floating soft bottle*/}
      <motion.img
        src="src/assets/soft-bottle.png"
        alt="soft bottle"
        aria-hidden
        className="pointer-events-none absolute right-8 bottom-8 w-64 opacity-50"
        animate={{ y: [0, -12, 0] }}
        transition={{ Repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <div className="w-full max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transation={{ duration: 0.6 }}
          className="text-4xl font-serif text-center mb-2"
        >
          Let’s Talk Aromaé
        </motion.h1>
        <p className="text-center text-slate-400 mb-8">
          Every aroma tells a story. Let us help you shape yours.
        </p>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-white/5 p-8 rounded-3xl border border-white/8 backdrop-blur-md"
        >
          {/* Name Field */}
          <label className="block mb-4">
            <input
              {...register("name")}
              placeholder="Your name"
              className="w-full bg-transparent border border-white/10 px-4 py-3 rounded-lg placeholder:text-slate-400 focus:outline-none focus-within:ring-1 focus:ring-amber-400 transition"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </label>
          {/* Email Field */}
          <label className="block mb-4">
            <input
              {...register("email")}
              placeholder="Your email"
              className="w-full bg-transparent border border-white/10 px-4 py-3 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </label>
          {/* message */}
          <label className="block mb-4">
            <textarea
              {...register("message")}
              placeholder="Tell us about your inquiry..."
              rows={6}
              className="w-full bg-transparent border border-white/10 px-4 py-3 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition resize-none"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1">
                {errors.message.message}
              </p>
            )}
          </label>
          {/* submit */}
          <div className="flex gap-3 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setSendError(null);
              }}
              className="px-4 py-2 rounded-lg border border-white/10 text-slate-200 hover:bg-white/5 transition"
              disabled={isSubmitting}
            >
              Reset
            </button>
          </div>
        </motion.form>
      </div>
      {/* Success modal (copy updated) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/6 backdrop-blur-lg p-8 rounded-2xl border border-white/10 text-center max-w-sm"
            >
              <h3 className="text-2xl font-serif text-yellow-400 mb-2">
                Message Sent
              </h3>
              <p className="text-slate-300 mb-6">
                Your message will be handled with care.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
