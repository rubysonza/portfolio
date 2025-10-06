import SocialLinks from "./SocialLinks";

export default function Footer() {
    return (
        <footer className="relative flex flex-col h-screen justify-between gap-8">
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center gap-16 my-40">
                    <h2 className="max-w-[80%] font-josefin text-4xl sm:text-7xl md:text-8xl font-bold text-center m-0 leading-15 sm:leading-20 md:leading-27">Let&apos;s get connected!</h2>
                    <SocialLinks className="gap-13" />
                </div>
            </div>

            <p className="text-center font-redditMono text-base p-8">&copy; 2025 Ruby Sonza</p>
        </footer>
    );
}