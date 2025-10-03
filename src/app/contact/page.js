"use client";

import { useState } from 'react';
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ActionButton from "@/components/ActionButton";
import Footer from "@/components/Footer";

function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        e.target.reset(); // Clear the form
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message.');
    }
  };

    return (
        <div className="flex flex-col justify-center items-center w-full gap-10">
                <form onSubmit={handleSubmit} className="flex flex-col w-[80%] md:w-[60%] gap-10">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Name<span className="text-red-600">*</span></label>
                        <input type="text" id="name" name="name" required className="py-2 px-4 font-redditMono border-1" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Email<span className="text-red-600">*</span></label>
                        <input type="email" id="email" name="email" required className="py-2 px-4 font-redditMono border-1" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Subject<span className="text-red-600">*</span></label>
                        <input type="subject" id="subject" name="subject" required className="py-2 px-4 font-redditMono border-1" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Message<span className="text-red-600">*</span></label>
                        <textarea id="message" name="message" required className="py-3 px-4 font-redditMono border-1" />
                    </div>

                    <div>
                        <button type="submit">
                           <ActionButton text="Send" icon={FiSend} />
                        </button>
                        {status && <p className="mt-4">{status}</p>}
                    </div>
                </form>
        </div>
    )
}

export default function ContactPage () {
    return (
        <main className="z-20 flex flex-col justify-center items-center min-h-screen m-0">
            <div className="box-border w-[90%] max-w-[1024px] py-[6rem] md:py-[8rem] px-[1rem] md:px-[3rem]">
                <h1 className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                    Get in Touch
                </h1>

                <div className="flex flex-col justify-center items-center gap-10">
                    <p className="text-center font-redditMono font-light text-lg sm:text-xl md:text-2xl lg:text-3xl">I'd love to hear from you!</p>

                    <ContactForm />
                </div>
            </div>
        </main>
    )
}