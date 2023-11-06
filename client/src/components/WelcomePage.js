import React from "react";
import {useAuth, useUser} from "@clerk/clerk-react";

export default function WelcomePage() {
    // Access authentication state
    const {isLoaded: clerkIsLoaded, userId} = useAuth()
    const {user} = useUser()

    // Account for sign out while on page
    if(!clerkIsLoaded || !userId) {
        return null;
    }

    return (<>
        <div>
            <h1>Welcome {user.firstName} {user.lastName}!</h1>
        </div>
    </>)
}
