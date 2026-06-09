import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function POST(req: Request) {
  try {
    const { plan, billing } = await req.json();

let amount = 4900;

if (plan === "starter" && billing === "yearly") {
  amount = 39900;
}

if (plan === "pro" && billing === "monthly") {
  amount = 14900;
}

if (plan === "pro" && billing === "yearly") {
  amount = 144000;
}

if (plan === "creator" && billing === "monthly") {
  amount = 49900;
}

if (plan === "creator" && billing === "yearly") {
  amount = 479000;
}
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });

    return Response.json(order);

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}