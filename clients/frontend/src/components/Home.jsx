import React from 'react'
import { Link } from 'react-router-dom'
import { SignUp } from '../components'
function Home() {
    return (
        <>
            <div className="relative overflow-hidden max-w-screen h-screen flex flex-col bg-homeBg bg-center bg-cover bg-no-repeat before:content-[''] before:w-60 before:h-60 before:bg-red-900 before:rounded-full before:absolute before:-right-32 before:-top-28 before:bg-gradient-to-r from-indigo-400 to-cyan-400 before:shadow-[-12px_35px_116px_38px_#3182ce]">
                <header className="flex p-4">
                    <h1 className="font-sans text-4xl">Doout</h1>
                </header>
                <main className="flex flex-col justify-center items-center flex-grow">
                    <h1 className="text-4xl xs:text-xl text-center w-2/3 font-bold">
                        A complete messaging platform {' '}
                        <span className="bg-gradient-to-r from-neutral-100 via-teal-300 to-blue-700 bg-clip-text text-transparent text-center">
                            away from mainstream social media.
                        </span>{" "}
                    </h1>
                    <div className="flex justify-evenly between items-center font-bold m-4 w-full flex-wrap bg-black bg-opacity-5">
                        <a
                            className="px-9 py-4  bg-white text-black rounded-sm"
                            href="#signups"
                        >
                            Sign up
                        </a>
                        <Link
                            type="button"
                            to="login"
                            className="px-9 py-4 border-2 border-red-50"
                        >
                            Login
                        </Link>
                    </div>
                </main>
            </div>
            <SignUp />
        </>
    )
}

export default Home;