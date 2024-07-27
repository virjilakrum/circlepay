import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api-sandbox.circle.com/v1/wallets",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
