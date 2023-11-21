"use client"
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="container max-w-4xl mx-auto text-center py-12 px-4">
                <Image
                    src="/aimpower.png"
                    alt="Aimpower Logo"
                    className="mx-auto h-32 w-auto rounded-3xl"
                    width="400"
                    height="400"
                />
                <h1 className="text-4xl font-extrabold text-gray-900 mt-6 mb-4">
                    Welcome to Aimpower Zoom App
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    We are thrilled to have you onboard. The Aimpower App is now
                    successfully integrated with your Zoom account. Experience
                    the forefront of video conferencing with just a click.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={() => (window.location.href = "zoommtg://")}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                        Launch Zoom Desktop App
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <p className="text-center text-sm text-gray-500 py-4">
                    © 2023 Aimpower Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}
