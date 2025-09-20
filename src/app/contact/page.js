"use client";

import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";

function ContactForm() {
    return (
        <div className="flex flex-col justify-center items-center w-full gap-10">
                <form className="flex flex-col text-black w-[80%] md:w-[60%] gap-10">
                    <div className="flex flex-col">
                        <label for="name" aria-required className="text-base md:text-lg lg:text-xl">Name</label>
                        <input type="text" id="name" name="name" className="py-2 px-4 font-redditMono border-1 hover:rounded-2xl focus:rounded-2xl" />
                    </div>

                    <div className="flex flex-col">
                        <label for="email" aria-required className="text-base md:text-lg lg:text-xl">Email</label>
                        <input type="email" id="email" name="email" className="py-2 px-4 font-redditMono border-1 hover:rounded-2xl focus:rounded-2xl" />
                    </div>

                    <div className="flex flex-col">
                        <label for="email" aria-required className="text-base md:text-lg lg:text-xl">Message</label>
                        <textarea type="message" id="message" name="message" className="py-3 px-4 font-redditMono border-1 hover:rounded-2xl focus:rounded-2xl" />
                    </div>

                    <div>
                        <input type="submit" value="Send" className="px-7 pt-3 pb-2 bg-purple text-white text-sm lg:text-lg uppercase" />
                    </div>
                </form>
        </div>
    )
}

export default function ContactPage () {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen m-0">
            <div className="box-border w-[90%] max-w-[1024px] py-[6rem] md:py-[8rem] px-[1rem] md:px-[3rem]">
                <h3 className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                    Get in Touch
                </h3>

                <div className="flex flex-col justify-center items-center gap-10">
                    <h4 className="text-center font-redditMono font-light text-lg sm:text-xl md:text-2xl lg:text-3xl">I'd love to hear from you!</h4>

                    <SocialLinks className='gap-7' />

                    <ContactForm />
                </div>
            </div>
        </main>
    )
}