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

    /* user.update({
        unsafeMetadata: {
            keanId: 1111111,
            customField1: 'test'
        }
    }) */
    return (<>
        <div>
            <h3></h3>
            <h1>Welcome {user.firstName} {user.lastName}!</h1>
        </div>
    </>)
}
