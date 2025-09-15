import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className='relative flex flex-col h-screen justify-between gap-8'>
            <div className='flex flex-col justify-center items-center gap-16 my-40'>
                <h3 className='font-josefin text-5xl md:text-9xl font-bold text-center m-0'>Let's get connected!</h3>
                <SocialLinks />
            </div>

            <p className='flex font-redditMono text-base p-8'>&copy; 2025 Ruby Sonza</p>
        </footer>
    );
}