import { NextResponse } from "next/server";
import { loginToOBP } from "../../../utils/login";

export async function GET() {

    // const username = "katja.fi.29@example.com";
    // const password = "ca0317";

    try {
        const apiResponse = await loginToOBP();

        return NextResponse.json(apiResponse);
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to log in or initiate OAuth flow." }, { status: 500 });
    }

    
}