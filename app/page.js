"use client";
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
        <div className="flex flex-col items-center justify-center w-full h-screen bg-black p-4">
            <div className="bg-gray-700 rounded-lg shadow p-6 max-w-xs w-full overflow-auto">
                <h1 className="text-lg font-semibold text-white mb-4">
                    Welcome{" "}
                    {user
                        ? `${user.first_name} ${user.last_name}`
                        : "Zoom Apps User"}
                    !
                </h1>

                <div className="space-y-2">
                    {filteredApis?.map((api) => (
                        <button
                            onClick={() => invokeZoomAppsSdk(api)}
                            className="w-full bg-teal-600 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
                            key={api.buttonName || api.name}
                        >
                            {api.buttonName || api.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}