"use client"
import React, { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";
// import ErrorAlert from "./ErrorAlert"; // Make sure this is a React component compatible with Tailwind CSS

export default function Home() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [runningContext, setRunningContext] = useState(null);
    const [userContextStatus, setUserContextStatus] = useState("");
    const [me, setMe] = useState({});
    const [lowerThirdText, setLowerThirdText] = useState("");
    const [closingLowerThird, setClosingLowerThird] = useState(false);

    useEffect(() => {
        async function configureSdk() {
            try {
                const configResponse = await zoomSdk.config({
                    // ... your capabilities
                    capabilities: [
                        "setVirtualBackground",
                        "onSendAppInvitation",
                        "onShareApp",
                        "onActiveSpeakerChange",
                        "onMeeting",
                        "connect",
                        "onConnect",
                        "postMessage",
                        "onMessage",
                        "authorize",
                        "onAuthorized",
                        "promptAuthorize",
                        "getUserContext",
                        "onMyUserContextChange",
                        "sendAppInvitationToAllParticipants",
                        "sendAppInvitation",
                        "setVideoFilter",
                    ],
                    version: "0.16.0",
                });
                console.log("App configured", configResponse);

                setRunningContext(configResponse.runningContext);
                setUserContextStatus(configResponse.auth.status);

                const userContext = await zoomSdk.getUserContext();
                setUser(userContext);
            } catch (sdkError) {
                setError(
                    "There was an error configuring the JS SDK or getting user context."
                );
            }

            const onMessageListener = (evt) => {
                const payload = JSON.parse(evt.payload);
                if (payload.setError !== undefined) {
                    setError(payload.setError);
                } else if (payload.message !== undefined) {
                    handleMessageLowerThird(payload);
                }
            };

            zoomSdk.addEventListener("onMessage", onMessageListener);
            return () =>
                zoomSdk.removeEventListener("onMessage", onMessageListener);
        }

        configureSdk();
    }, []);

    const handleMessageLowerThird = (payload) => {
        // ... the same logic for handling the lower third text
    };

    const [apiSearchText, setApiSearchText] = useState("");

    const searchHandler = (e) => {
        setApiSearchText(e.target.value.toLowerCase());
    };

    const filteredApis = apis?.filter((api) => {
        return apiSearchText === ""
            ? api
            : api.name.toLowerCase().includes(apiSearchText);
    });

    // if (error) {
    //     return <ErrorAlert error={error} onClose={() => setError(null)} />;
    // }

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Hello{" "}
                {user
                    ? `${user.first_name} ${user.last_name}`
                    : "Zoom Apps user"}
                !
            </h1>
            <p>User Context Status: {userContextStatus}</p>
            <p>
                {runningContext
                    ? `Running Context: ${runningContext}`
                    : "Configuring Zoom JavaScript SDK..."}
            </p>

            <div className="api-scrollview mt-4">
                <input
                    placeholder="Search for an API"
                    onChange={searchHandler}
                    className="input-field-class" // Replace with Tailwind classes
                    id="api-scrollview-input"
                />

                <div className="api-buttons-list mt-4">
                    {filteredApis.map((api) => (
                        <button
                            onClick={() => invokeZoomAppsSdk(api)}
                            className="api-button-class" // Replace with Tailwind classes
                            key={api.buttonName || api.name}
                        >
                            {api.buttonName || api.name}
                        </button>
                    ))}
                </div>
                <hr className="hr-scroll-border mt-4"></hr>
            </div>

            <div
                className={`lower-third ${
                    !lowerThirdText || closingLowerThird ? "hidden" : "block"
                } mt-4`}
            >
                {lowerThirdText}
            </div>
        </div>
    );
}
