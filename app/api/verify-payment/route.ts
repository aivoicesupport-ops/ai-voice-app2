import crypto from "crypto";
import { adminDb } from "@/lib/firebase-admin";
import admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  uid,
  plan,
  billing,
} = body;

    const sign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");
const isValid = sign === razorpay_signature;
let amount = 49;
let creditsAdded = 5000;

if (plan === "starter" && billing === "yearly") {
  amount = 399;
  creditsAdded = 60000;
}

if (plan === "pro" && billing === "monthly") {
  amount = 149;
  creditsAdded = 20000;
}

if (plan === "pro" && billing === "yearly") {
  amount = 1440;
  creditsAdded = 240000;
}

if (plan === "creator" && billing === "monthly") {
  amount = 499;
  creditsAdded = 100000;
}

if (plan === "creator" && billing === "yearly") {
  amount = 4790;
  creditsAdded = 1200000;
}

if (isValid && uid) {

  const paymentRef = adminDb
    .collection("payments")
    .doc(razorpay_payment_id);

  const paymentDoc =
    await paymentRef.get();

  if (paymentDoc.exists) {

    return Response.json({
      success: true,
      duplicate: true,
    });

  }

  await paymentRef.set({
    uid,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount,
    creditsAdded,
    plan,
billing,
    createdAt: Timestamp.now(),
  });

  const userRef = adminDb
    .collection("users")
    .doc(uid);

  await userRef.update({
    credits:
      admin.firestore.FieldValue.increment(
  creditsAdded
),
  });
}

return Response.json({
  success: isValid,
});

  } catch (error) {
    console.log(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}