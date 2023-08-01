import Link from "next/link";
import {GithubLogo, YoutubeLogo, File} from "phosphor-react";

export default function Home() {
  return (
    <div className='flex flex-col gap-y-6 h-screen md:w-screen px-5 sm:px-20 lg:px-80 py-24 bg-white'>
        <header className='flex justify-between mb-40'>
            <p className='text-xl font-bold'>Luganodes Task Submission</p>
            <nav className='flex gap-x-8'>
                <Link className='hover:underline hover:text-sm' href='/login'>Login</Link>
                <Link className='hover:underline hover:text-sm' href='/sign-up'>Sign Up</Link>
            </nav>
        </header>
        <img src="https://i.imgur.com/P6jlxtf.png"></img>
        <h1 className='text-3xl'>Luganodes Task - 4</h1>
        <ul>
            <li><b>Name: </b>Hariket Sukesh Kumar Sheth</li>
            <li><b>Register Number: </b>20BCE1975</li>
            <li><b>VIT Email: </b>hariket.sukeshkumar2020@vitstudent.ac.in</li>
        </ul>
        <p>This project is a task submission for the Luganodes organisation. Find below some details about the Video Demonstration and Documentation (Setup) details below</p>

        <div className='flex flex-col gap-y-2 mb-5'>
            <h2 className='pb-4'>You can find the video via links below 👇</h2>
            <Link className='flex items-center gap-x-4 hover:underline text-base' href=''>
                <YoutubeLogo weight='fill' width={26} height={26} />
                <span>Video Demonstration</span>
            </Link>
            <Link className='flex items-center gap-x-4 hover:underline text-base' href='https://github.com/hariketsheth/luganodes-task-submission#readme'>
                <File weight='fill' width={26} height={26} />
                <span>The Documentation</span>
            </Link>
        </div>
        <p>You can find the project on Github</p>
        <Link className='flex items-center gap-x-4 hover:underline text-base' href='https://github.com/hariketsheth/luganodes-task-submission'>
            <GithubLogo weight='fill' width={26} height={26} />
            <span>@hariketsheth/Luganodes</span>
        </Link>
    </div>
  )
}
