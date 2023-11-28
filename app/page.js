"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";

export default function Home() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [runningContext, setRunningContext] = useState(null);
    const [userContextStatus, setUserContextStatus] = useState("");
    const [apiSearchText, setApiSearchText] = useState("");

    async function configureSdk() {
        try {
            const configResponse = await zoomSdk.config({
                capabilities: [
                    "setVirtualBackground",
                    // "onSendAppInvitation",
                    // "onShareApp",
                    // "onActiveSpeakerChange",
                    // "onMeeting",
                    // "connect",
                    // "onConnect",
                    // "postMessage",
                    // "onMessage",
                    // "authorize",
                    // "onAuthorized",
                    // "promptAuthorize",
                    // "getUserContext",
                    // "onMyUserContextChange",
                    // "sendAppInvitationToAllParticipants",
                    // "sendAppInvitation",
                    // "setVideoFilter",
                ],
                version: "0.16.0",
            });
            console.log("App configured", configResponse);
            setRunningContext(configResponse.runningContext);

            setUserContextStatus(configResponse.auth.status);

            const userContext = await zoomSdk.invoke("getUserContext");
            setUser(userContext);
        } catch (error) {
            // console.error(
            //     "Error configuring the SDK or getting user context:",
            error;
            // );
            // setError(
            ("There was an error configuring the JS SDK or getting user context.");
            // );
        }
    }

    useEffect(() => {
        configureSdk();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const searchHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setApiSearchText(lowerCase);
    };

    const filteredApis = apis?.filter((api) => {
        if (apiSearchText === "") {
            return api;
        } else {
            return api.name.toLowerCase().includes(apiSearchText);
        }
    });

    //add loding page while runningContext is null or see SSR 
    
    //If user opens the app outside of zoom client, redirect to install page
    /*
    if (!runningContext) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <div className="container max-w-4xl mx-auto text-center py-12 px-4">
                    <Image
                        src="/aimpower.png"
                        alt="Aimpower Logo"
                        className="mx-auto h-32 w-auto rounded-3xl"
                        width="400"
                        height="400"
                    />
                    <h1 className="text-4xl font-extrabold text-teal-600 mt-6 mb-4">
                        Homepage!
                    </h1>
                    <p className="text-lg text-teal-900 mb-8">
                        Add link to /install page.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <p className="text-center text-sm text-gray-500 py-4">
                        © 2023 Aimpower Inc. All rights reserved.
                    </p>
                </div>
            </div>
        );
    }
    //If user opens the app in zoom client, but is not in meeting
    else if (runningContext === "inMainClient") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <div className="container max-w-4xl mx-auto text-center py-12 px-4">
                    <Image
                        src="/aimpower.png"
                        alt="Aimpower Logo"
                        className="mx-auto h-32 w-auto rounded-3xl"
                        width="400"
                        height="400"
                    />
                    <h1 className="text-4xl font-extrabold text-teal-600 mt-6 mb-4">
                        Harshank here Launch meeting to explore the Aimpower App!
                    </h1>
                  
                    <p className="text-lg text-teal-900 mb-8">
                        Thank you for installing Aimpower Zoom App.
                    </p>
                    
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <p className="text-center text-sm text-gray-500 py-4">
                        © 2023 Aimpower Inc. All rights reserved.
                    </p>
                </div>
            </div>
        );
    }
    //when user is in meeting
    */
    return (
        <div className="bg-white w-screen h-screen">
            <div className="flex w-full justify-between">
                <Image
                    src="/aimpower.png"
                    alt="Aimpower Logo"
                    className="h-20 p-5 w-auto rounded-3xl"
                    width="400"
                    height="400"
                />

                <h3 className="text-xl font-bold text-black-600 p-5">
                    Welcome{" "}
                    {user
                        ? `${user.first_name} ${user.last_name}`
                        : "Aimpower Apps User"}
                    !
                </h3>
            
            </div>
            <div className="flex flex-col items-center justify-center w-full  p-4">
                <div className="max-w-xs w-full overflow-auto">
                    <div className="space-y-2">
                        {filteredApis?.map((api) => (
                            <button
                                onClick={invokeZoomAppsSdk(api)}
                                className="w-full bg-[#35377D] hover:bg-slate-900 text-white font-medium py-2 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
                                key={api.buttonName || api.name}
                            >
                                {" "}
                                {api.buttonName || api.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}
