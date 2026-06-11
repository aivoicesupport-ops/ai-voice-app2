"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

function PaymentsContent() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const searchParams = useSearchParams();

  const plan =
    searchParams.get("plan") || "starter";

  const billing =
    searchParams.get("billing") || "monthly";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const createOrder = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            plan,
            billing,
          }),
        }
      );

      const data =
        await response.json();

      const options = {
        key: process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "AI Voice India",

        description: `${plan} Plan`,

        order_id: data.id,

        handler: async function (
          response: any
        ) {
          const verifyResponse =
            await fetch(
              "/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  ...response,
                  uid: user?.uid,
                  plan,
                  billing,
                }),
              }
            );

          const verifyData =
            await verifyResponse.json();

          console.log(verifyData);

          if (verifyData.success) {
            alert(
              "Payment Verified Successfully"
            );
          } else {
            alert(
              "Payment Verification Failed"
            );
          }
        },
      };

      const razorpay = new (
        window as any
      ).Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert("Order Creation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-5xl font-bold mb-8">
        Payment
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <p className="text-xl mb-4">
          Selected Plan:
        </p>

        <h2 className="text-3xl font-bold mb-6">
          {plan.charAt(0).toUpperCase() +
            plan.slice(1)}{" "}
          Plan
        </h2>

        <p className="text-zinc-400 mb-6">
          {plan === "starter" &&
            (billing === "monthly"
              ? "5,000 Credits • ₹49/month"
              : "60,000 Credits • ₹399/year")}

          {plan === "pro" &&
            (billing === "monthly"
              ? "20,000 Credits • ₹149/month"
              : "240,000 Credits • ₹1440/year")}

          {plan === "creator" &&
            (billing === "monthly"
              ? "100,000 Credits • ₹499/month"
              : "1,200,000 Credits • ₹4790/year")}
        </p>

        <button
          onClick={createOrder}
          disabled={loading}
          className="w-full bg-green-600 py-4 rounded-2xl font-semibold"
        >
          {loading
            ? "Creating Order..."
            : "Proceed To Payment"}
        </button>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          Loading...
        </div>
      }
    >
      <PaymentsContent />
    </Suspense>
  );
}