"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function PaymentsHistoryPage() {

        const [payments, setPayments] = useState<any[]>([]);
        useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    async (user) => {
      if (!user) return;

      const q = query(
        collection(db, "payments"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const items: any[] = [];

      snapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPayments(items);
    }
  );

  return () => unsubscribe();
}, []);
  return (
  <div className="w-full max-w-4xl mx-auto p-6">

    <h1 className="text-3xl md:text-5xl font-bold mb-10">
      Payment History
    </h1>

    <div className="space-y-4">

      {payments.map((payment) => (

        <div
          key={payment.id}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
        >
<div className="flex gap-2 mb-3">

  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
    {payment.plan
      ? payment.plan.toUpperCase()
      : "STARTER"}
  </span>

  <span className="bg-zinc-700 px-3 py-1 rounded-full text-sm">
    {payment.billing
      ? payment.billing.toUpperCase()
      : "MONTHLY"}
  </span>

</div>
          <p className="text-2xl font-bold mb-2">
            ₹{payment.amount}
          </p>

          <p className="text-green-400 mb-2">
            +{payment.creditsAdded} Credits
          </p>

          <p className="text-zinc-400 text-sm">
            {payment.createdAt?.toDate?.().toLocaleString()}
          </p>

        </div>

      ))}

    </div>

  </div>
);
}