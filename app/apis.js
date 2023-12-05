/* globals zoomSdk */

let width = 100;
let height = 100;
let imageData = new ImageData(width, height);

// Function to generate a random integer between 0 and 255
function randomColorValue() {
  return Math.floor(Math.random() * 256);
}

// Iterate over each pixel and set a random color
for (let i = 0; i < imageData.data.length; i += 4) {
  imageData.data[i] = randomColorValue(); // Red
  imageData.data[i + 1] = randomColorValue(); // Green
  imageData.data[i + 2] = randomColorValue(); // Blue
  imageData.data[i + 3] = 255; // Alpha (fully opaque)
}



const invokeZoomAppsSdk = (api) => () => {
    const { name, buttonName = "", options = null } = api;
    const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk);

    zoomAppsSdkApi(options)
        .then((clientResponse) => {
            console.log(
                `${buttonName || name} success with response: ${JSON.stringify(
                    clientResponse
                )}`
            );
        })
        .catch((clientError) => {
            console.log(
                `${buttonName || name} error: ${JSON.stringify(clientError)}`
            );
        });
};


const apis = [
    {
        name: "setVirtualBackground",
        buttonName: "Set Background",
        options: {
            fileUrl:
                "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=983&q=80",
        },
    },
    {
        name: "removeVirtualBackground",
        buttonName: "Remove Background",
    },
    {
        name: "setVirtualBackground",
        buttonName: "I'm still speaking",
        options: {
            fileUrl:
                "https://i.imgur.com/GENo1j7.jpeg",
        },
    },
    {
        name: "removeVirtualBackground",
        buttonName: "Done Speaking",
    },
    {
        name: "setVirtualBackground",
        buttonName: "Set PWS Badge",
        options: {
            fileUrl:
                "https://i.imgur.com/c1Naqsl.jpeg",
        },
    },
    {
        name: "removeVirtualBackground",
        buttonName: "Remove PWS Badge",
    },
    {
        name: "setVirtualForeground",
        buttonName: "Set PWS Badge Using Virtual Foreground",
        options: {
            imageData:
                imageData,
        },
    },
    {
        name: "removeVirtualForeground",
        buttonName: "Remove PWS Badge Using Virtual Foreground",
    },
 
];

module.exports = { apis, invokeZoomAppsSdk };
