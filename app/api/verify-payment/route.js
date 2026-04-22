import crypto from "crypto";
import { NextResponse } from "next/server";
export async function POST(request) {
  const body = await req.json();

  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      ).update(
        body.razorpay_order_id
        + "|"
        + body.razorpay_payment_id
      )
      .digest("hex");
       if(
  generatedSignature
  !== body.razorpay_signature
 ){
   return NextResponse.json(
    {success:false},
    {status:400}
   );
 } return NextResponse.json({
  success:true
 });

}