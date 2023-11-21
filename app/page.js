"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";

export default function Home() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [runningContext, setRunningContext] = useState(null);
    const [userContextStatus, setUserContextStatus] = useState("");
    const [apiSearchText, setApiSearchText] = useState("");

    useEffect(() => {
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
    return (
        <div className="bg-black w-screen h-screen">
            <div className="flex w-full justify-between">
                <Image
                    src="/aimpower.png"
                    alt="Aimpower Logo"
                    className="h-20 p-5 w-auto rounded-3xl"
                    width="400"
                    height="400"
                />
                <h3 className="text-xl font-bold text-teal-600 p-5">
                    Welcome{" "}
                    {user
                        ? `${user.first_name} ${user.last_name}`
                        : "Zoom Apps User"}
                    !
                </h3>
            </div>
            <div className="flex flex-col items-center justify-center w-full  p-4">
                <div className="max-w-xs w-full overflow-auto">
                    <div className="space-y-2">
                        {filteredApis?.map((api) => (
                            <button
                                onClick={invokeZoomAppsSdk(api)}
                                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
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
