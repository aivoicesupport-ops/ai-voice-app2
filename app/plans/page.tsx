"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlansPage() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Choose Your Plan
      </h1>

      <p className="text-center text-zinc-400 mb-8">
        🎉 Launch Offer • Limited To First 1000 Users
      </p>

      <div className="flex justify-center mb-10">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-1 flex">

          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-xl ${
              billing === "monthly"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-xl ${
              billing === "yearly"
                ? "bg-green-600 text-white"
                : "text-white"
            }`}
          >
            Yearly (Save 20%)
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Starter */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-green-500 hover:scale-105 transition-all duration-300">

          <div className="text-green-400 font-semibold mb-2">
            🎉 Launch Offer
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Starter
          </h2>

          <div className="mb-2">
            <span className="text-zinc-500 line-through text-xl mr-2">
              ₹99
            </span>

            <span className="text-4xl font-bold">
              {billing === "monthly" ? "₹49" : "₹399"}
            </span>
          </div>

          <p className="text-zinc-400">
            {billing === "monthly" ? "/month" : "/year"}
          </p>

          <p className="mb-4 mt-4">
            {billing === "monthly"
              ? "5,000 Credits"
              : "60,000 Credits"}
          </p>

          <ul className="space-y-2 text-zinc-400">
            <li>✓ Fast TTS</li>
            <li>✓ 4 Voices</li>
            <li>✓ Download Audio</li>
          </ul>
<Link
  href={`/payments?plan=starter&billing=${billing}`}
            className="block w-full mt-8 bg-white text-black py-3 rounded-2xl font-semibold text-center"
          >
            Buy Now
          </Link>

        </div>

        {/* Pro */}

        <div className="relative bg-zinc-900 border-2 border-green-500 rounded-3xl p-8 hover:scale-105 transition-all duration-300">

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 px-4 py-1 rounded-full text-sm font-bold">
            🔥 MOST POPULAR
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Pro
          </h2>

          <div className="mb-2">
            <span className="text-zinc-500 line-through text-xl mr-2">
              ₹299
            </span>

            <span className="text-4xl font-bold">
              {billing === "monthly" ? "₹149" : "₹1440"}
            </span>
          </div>

          <p className="text-zinc-400">
            {billing === "monthly" ? "/month" : "/year"}
          </p>

          <p className="mb-4 mt-4">
            {billing === "monthly"
              ? "20,000 Credits"
              : "240,000 Credits"}
          </p>

          <ul className="space-y-2 text-zinc-400">
            <li>✓ Everything in Starter</li>
            <li>✓ Priority Speed</li>
            <li>✓ Best Value</li>
          </ul>

          <Link
  href={`/payments?plan=pro&billing=${billing}`}
            className="block w-full mt-8 bg-white text-black py-3 rounded-2xl font-semibold text-center"
          >
            Buy Now
          </Link>

        </div>

        {/* Creator */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 hover:scale-105 transition-all duration-300">

          <div className="text-yellow-400 font-semibold mb-2">
            ⭐ Premium
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Creator
          </h2>

          <div className="mb-2">
            <span className="text-zinc-500 line-through text-xl mr-2">
              ₹999
            </span>

            <span className="text-4xl font-bold">
              {billing === "monthly" ? "₹499" : "₹4790"}
            </span>
          </div>

          <p className="text-zinc-400">
            {billing === "monthly" ? "/month" : "/year"}
          </p>

          <p className="mb-4 mt-4">
            {billing === "monthly"
              ? "100,000 Credits"
              : "1,200,000 Credits"}
          </p>

          <ul className="space-y-2 text-zinc-400">
            <li>✓ Everything in Pro</li>
            <li>✓ Huge Credits</li>
            <li>✓ Content Creators</li>
          </ul>
<Link
  href={`/payments?plan=creator&billing=${billing}`}
            className="block w-full mt-8 bg-white text-black py-3 rounded-2xl font-semibold text-center"
          >
            Buy Now
          </Link>

        </div>

      </div>

    </div>
  );
}