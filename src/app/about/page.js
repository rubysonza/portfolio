export default function About() {
    return (
        <main className='pt-24'>
            <div className='relative flex justify-center items-start h-[100vh]'>
                <h1 className="pt-10 text-6xl font-bold uppercase">About</h1>
                {/* <span className="absolute flex text-3xl text-purple">Ruby</span> */}
            </div>

            <div className="relative flex justify-center items-start h-[100vh]">
                <p className="flex justify-center items-center text-center h-[100vh] max-w-[300px] text-2xl">
                    Here are the tools that bring my ideas to life
                </p>
            </div>

            <div className="relative flex justify-center items-center h-[100vh]">
                <h2 className="">My Toolkit</h2>
                <div>
                    {/* Icons */}
                </div>
            </div>

            <div className="relative flex justify-center items-center h-[100vh] text-center">
                <p className="max-w-[300px] text-2xl">I didn&apos;t always think about becoming a web designer and developer.</p>
            </div>

            <div className="relative flex flex-col justify-center items-center h-[100vh] text-center">
                <h2>Education</h2>
                <p>I graduated from <b>Rutgers University - New Brunswick</b> with a <b>B.A. in Information Technology.</b></p>
                <p>While I initially though I'd pursue a career in I.T., a single web design course made me realize my passion for <b>a field where I could merge my creative and strategic sides.</b></p>
            </div>
        </main>
    );
}