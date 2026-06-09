"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
const [loading, setLoading] = useState(true);
const [usersCount, setUsersCount] = useState(0);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    async (user) => {

      if (!user) {
        setLoading(false);
        return;
      }

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap = await getDoc(userRef);

      if (
        userSnap.exists() &&
        userSnap.data().isAdmin === true
      ) {
        setIsAdmin(true);
        const usersSnapshot = await getDocs(
  collection(db, "users")
);

setUsersCount(usersSnapshot.size);
      }

      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);
if (loading) {
  return (
    <div className="p-6">
      Loading...
    </div>
  );
}

if (!isAdmin) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Access Denied
      </h1>

      <p className="mt-4 text-zinc-400">
        Admin access required.
      </p>
    </div>
  );
}
  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-5xl font-bold">
        Admin Dashboard
      </h1>
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

  <p className="text-zinc-400 mb-2">
    Total Users
  </p>

  <h2 className="text-4xl font-bold">
    {usersCount}
  </h2>

</div>
    </div>
  );
}