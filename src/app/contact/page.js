"use client";

import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ActionButton from "@/components/ActionButton";
import Footer from "@/components/Footer";

function ContactForm() {
    return (
        <div className="flex flex-col justify-center items-center w-full gap-10">
                <form className="flex flex-col w-[80%] md:w-[60%] gap-10">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Name</label>
                        <input type="text" id="name" name="name" className="py-2 px-4 font-redditMono border-1" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Email</label>
                        <input type="email" id="email" name="email" className="py-2 px-4 font-redditMono border-1" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" aria-required className="font-redditMono text-base md:text-lg lg:text-xl">Message</label>
                        <textarea type="message" id="message" name="message" className="py-3 px-4 font-redditMono border-1" />
                    </div>

                    <div>
                        <ActionButton href="" text="Send" icon={FiSend} />
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

                    <SocialLinks className='gap-7' />

                    <ContactForm />
                </div>
            </div>
        </main>
    )
}