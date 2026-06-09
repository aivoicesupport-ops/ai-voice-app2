"use client";
import { useEffect, useState } from "react";

import { auth, db } from "@/lib/firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
const [user, setUser] = useState<any>(null);
const loadHistory = async (uid: string) => {

  const q = query(
    collection(db, "history"),
    where("uid", "==", uid),
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

  setHistory(items);
};

useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (currentUser) => {

      setUser(currentUser);

      if (currentUser) {
        await loadHistory(currentUser.uid);
      }

    }
  );

  return () => unsubscribe();

}, []);
return (
  <div className="w-full max-w-4xl mx-auto p-6">

    <h1 className="text-5xl font-bold mb-8">
      History
    </h1>

    <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">

      {history.length === 0 ? (

        <p className="text-zinc-400">
          No history found
        </p>

      ) : (

        <div className="flex flex-col gap-4">

          {history.map((item) => (

            <div
              key={item.id}
              className="border border-zinc-700 rounded-2xl p-4"
            >

              <p className="font-semibold">
                {item.text}
              </p>

              <p className="text-zinc-400 text-sm mt-2">
                Voice: {item.voice}
              </p>

              <p className="text-zinc-400 text-sm">
                Characters: {item.characters}
              </p>

              <p className="text-zinc-500 text-xs mt-2">
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleString()
                  : "Unknown Date"}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
); 

}