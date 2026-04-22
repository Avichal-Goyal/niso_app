import { NextResponse } from "next/server";
import { razorpay } from "../../lib/razorpay";
export async function POST(request) {
  const body = await request.json();
  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt: "receipt_" + + Date.now(),
  };
  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order });
  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}