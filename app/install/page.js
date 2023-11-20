"use client"
import { useRouter } from "next/navigation";

function Home() {
    const router = useRouter();

    // Function to handle button click for installation
    const handleInstall = async () => {
        // Redirect to the API route that handles the installation
        router.push('/api/install');
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleInstall}>Install Zoom App</button>
        </div>
    );
}

export default Home;
