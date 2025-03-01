import Button from "@mui/material/Button";

const Login = () => {

  const handleLogin = () => {

    console.log('Client ID:', process.env.NEXT_PUBLIC_TINK_CLIENT_ID);
    console.log('Redirect URI:', process.env.NEXT_PUBLIC_TINK_REDIRECT_URI);

    const authUrl = new URL("https://link.tink.com/1.0/authorize");
    authUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_TINK_CLIENT_ID!);
    authUrl.searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_TINK_REDIRECT_URI || "");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "accounts:read, transactions:read, account-verification-reports:read");
    authUrl.searchParams.set("state", process.env.NEXT_PUBLIC_AUTH_SECRET || "");
    authUrl.searchParams.set("test", "true"); // Enable test mode
    authUrl.searchParams.set("demo", "true");
    
    console.log('Authorization URL:', authUrl.toString());
    window.location.href = authUrl.toString();
  }

  return (
    <>
      <Button variant={"contained"} color={"success"} onClick={handleLogin}>
        Connect with Tink
      </Button>
    </>
  );
};

export default Login;