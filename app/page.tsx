"use client";

import { useEffect, useState } from "react";

import { auth, provider, db } from "@/lib/firebase";
import HomeSection from "./components/HomeSection";
import GeneratorCard from "./components/GeneratorCard";
import Link from "next/link";
import { voices } from "@/app/data/voices";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";


export default function Home() {

  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState("nova");
  const [credits, setCredits] = useState(500);
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [activePage, setActivePage] = useState("home");
  const [history, setHistory] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (currentUser) => {

      setUser(currentUser);

      if (currentUser) {

        const userRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

          const data = userSnap.data();

          setCredits(data.credits);
          await loadHistory(currentUser.uid);

        } else {

          await setDoc(userRef, {
            name: currentUser.displayName,
            email: currentUser.email,
            credits: 500,
          });

          setCredits(500);
          setHistory([]);

        }
      }
    }
  );

  return () => unsubscribe();

}, []);

  const loginWithGoogle = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log(result.user);

      alert("Login Successful");

    } catch (error) {

      console.log(error);

    }
  };

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
  const logout = async () => {

    await signOut(auth);

  };

  const generateAudio = async () => {

    if (!text) return;

    if (text.length > credits) {

      alert("Not enough credits");

      return;

    }

    try {

      setLoading(true);

      const selectedVoice = voices.find(
  (item) => item.voiceId === voice
);

const response = await fetch("/api/generate-audio", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text,
  voice: selectedVoice?.voiceId,
  voiceId: selectedVoice?.voiceId,
  voiceName: selectedVoice?.label,
  provider: selectedVoice?.provider,
  uid: user?.uid,
  }),
});
      if (!response.ok) {
  const errorData = await response.json();

  alert(errorData.error || "Audio generation failed");

  return;
}

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      setAudioUrl(url);

      const userRef = doc(
  db,
  "users",
  user.uid
);

const userSnap = await getDoc(userRef);

if (userSnap.exists()) {
  setCredits(userSnap.data().credits);
}
await loadHistory(user.uid);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
<HomeSection user={user} />
<GeneratorCard
  credits={credits}
  text={text}
  setText={setText}
  voice={voice}
  setVoice={setVoice}
  loading={loading}
  generateAudio={generateAudio}
  audioUrl={audioUrl}
/>

     <div className="absolute top-6 left-6 z-50">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-xl"
  >
    ☰
  </button>
</div>

{menuOpen && (
  <div className="fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-6 z-40">

    <button
  onClick={() => setMenuOpen(false)}
  className="mb-6 bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-700"
>
  ✕ 
</button>

    {user && (
  <div className="mb-8 border-b border-zinc-700 pb-4">

    <img
      src={user?.photoURL}
      alt="profile"
      className="w-14 h-14 rounded-full mb-3"
    />

    <p className="font-bold">
      {user?.displayName}
    </p>

    <p className="text-sm text-zinc-400">
      Credits: {credits}
    </p>

  </div>
)}

    <div className="flex flex-col gap-4">

      <button
  onClick={() => {
    setActivePage("home");
    setMenuOpen(false);
  }}
  className="text-left"
>
  🏠 Home
</button>

<Link
  href="/history"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  📜 History
</Link>

<Link
  href="/payments-history"
  className="block"
>
  💳 Payment History
</Link>

<Link
  href="/plans"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  💎 Plans
</Link>


<Link
  href="/about"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  ℹ️ About Us
</Link>

<Link
  href="/contact"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  📧 Contact Us
</Link>

<Link
  href="/privacy"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  🔒 Privacy Policy
</Link>
<Link
  href="/term"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  📄 Terms & Conditions
</Link>

<Link
  href="/refund"
  onClick={() => setMenuOpen(false)}
  className="text-left"
>
  💰 Refund Policy
</Link>



      <button
        onClick={logout}
        className="text-left text-red-400"
      >
        🚪 Logout
      </button>

    </div>

  </div>
)}

      <div className="absolute top-6 right-6">

        {user ? (

          <div className="flex items-center gap-3">

            <img
  src={user?.photoURL || "https://i.pravatar.cc/100"}
  alt="profile"
  className="w-10 h-10 rounded-full border border-zinc-700"
/>

            <button
              onClick={logout}
              className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

        ) : (
              
          <button
            onClick={loginWithGoogle}
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
          >
            Login
          </button>

        )}

      </div>

      













   {activePage === "home" && (
<>
  
      </>
)}

    </main>
  );
}