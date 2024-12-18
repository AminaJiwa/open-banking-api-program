import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

const Login = () => {
    
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <p>Signed in as {session.user?.email}</p>
                <p>Welcome {session.user?.name}</p>
                <Button variant={"contained"} color={"error"} onClick={() => signOut()}>
                    Sign out
                </Button>
            </>
        );
    }
    
    return (
    <>
      <p>Not signed in</p> <br />
      <Button variant={"contained"} color={"success"} onClick={() => signIn()}>
        Sign in
      </Button>
    </>
    );
}

export default Login;