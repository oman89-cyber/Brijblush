"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "brijblash_frontend_user",
        JSON.stringify({ email, fullName: email.split("@")[0] || "Guest" })
      );
    } catch {
      // Ignore storage errors
    }
    pushToast("Signed in (Frontend Preview)", {
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
            Patron Access
          </p>
          <h1 className="font-editorial text-3xl font-bold mt-1">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </form>

        <div className="text-sm text-center border-t border-[#211D19]/15 pt-4">
          New to Brijblash?{" "}
          <Link href="/register" className="font-bold text-[#173F35] underline">
            Create Customer Account
          </Link>
        </div>
      </div>
    </div>
  );
}
