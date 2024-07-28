import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { sourceWalletId, destinationWalletId, amount } = await req.json();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_CIRCLE_API_URL}/transfers`,
      {
        sourceWalletId,
        destinationWalletId,
        amount,
        currency: "USD",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error performing transfer:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
