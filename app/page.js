"use client";
import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";

export default function Home() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [runningContext, setRunningContext] = useState(null);
    const [userContextStatus, setUserContextStatus] = useState("");

    useEffect(() => {
        async function configureSdk() {
            try {
                const configResponse = await zoomSdk.config({
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
    const [apiSearchText, setApiSearchText] = useState("");

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
        <div>
            <h1>
                Hello
                {user
                    ? ` ${user.first_name} ${user.last_name}`
                    : " Zoom Apps user"}
                !
            </h1>
            <p>{`User Context Status: ${userContextStatus}`}</p>
            <p>
                {runningContext
                    ? `Running Context: ${runningContext}`
                    : "Configuring Zoom JavaScript SDK..."}
            </p>

            <div className="api-scrollview">
                <input
                    placeholder="Search for an API"
                    onChange={searchHandler}
                    label="Search"
                    id="api-scrollview-input"
                />

                <div className="api-buttons-list">
                    {filteredApis?.map((api) => (
                        <button
                            onClick={invokeZoomAppsSdk(api)}
                            className="api-button"
                            key={api.buttonName || api.name}
                        >
                            {" "}
                            {api.buttonName || api.name}
                        </button>
                    ))}
                </div>
                <hr className="hr-scroll-border"></hr>
            </div>
        </div>
    );
}
