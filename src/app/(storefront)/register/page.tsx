"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "brijblash_frontend_user",
        JSON.stringify({ fullName, email, phone })
      );
    } catch {
      // Ignore storage errors
    }
    pushToast("Account created (Frontend Preview)", {
      description: "Ready to connect with Firebase Authentication.",
      tone: "success",
    });
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="brj-surface p-7 sm:p-8 space-y-6">
        <div className="border-b border-[#211D19]/15 pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
            Join Brijblash
          </p>
          <h1 className="font-editorial text-3xl font-bold mt-1">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">10-Digit Mobile (Optional)</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
            />
          </div>
          <div>
            <Label htmlFor="password">Password (min 8 chars) *</Label>
            <Input
              id="password"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            <UserPlus className="h-4 w-4" />
            Register
          </Button>
        </form>

        <p className="text-sm text-center border-t border-[#211D19]/15 pt-4">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#173F35] underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
