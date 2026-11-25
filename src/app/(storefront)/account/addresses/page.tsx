"use client";

import * as React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

interface AddressRow {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pinCode: string;
}

const ADDR_KEY = "brijblash_frontend_addresses_v1";

export default function AccountAddressesPage() {
  const { pushToast } = useToast();
  const [addresses, setAddresses] = React.useState<AddressRow[]>([]);
  const [form, setForm] = React.useState({
    label: "Home",
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pinCode: "",
  });

  React.useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = localStorage.getItem(ADDR_KEY);
        if (raw) setAddresses(JSON.parse(raw) as AddressRow[]);
      } catch {
        // Ignore storage errors
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const persist = (next: AddressRow[]) => {
    setAddresses(next);
    try {
      localStorage.setItem(ADDR_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const next = [{ id: `addr-${Date.now()}`, ...form }, ...addresses];
    persist(next);
    pushToast("Address saved", { tone: "success" });
    setForm({
      label: "Home",
      fullName: "",
      phone: "",
      addressLine1: "",
      city: "",
      state: "",
      pinCode: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-4">
        <Link href="/account" className="text-xs font-bold uppercase text-[#173F35] underline">
          ← Back to Account
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold mt-1">
          Saved Addresses
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSave} className="lg:col-span-5 brj-surface p-5 space-y-3">
          <h2 className="font-editorial text-xl font-bold">Add Address</h2>
          <div>
            <Label>Label</Label>
            <Input
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
          </div>
          <div>
            <Label>Full Name *</Label>
            <Input
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div>
            <Label>10-Digit Mobile *</Label>
            <Input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <Label>Street Address *</Label>
            <Input
              required
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>City *</Label>
              <Input
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <Label>PIN Code *</Label>
              <Input
                required
                value={form.pinCode}
                onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>State *</Label>
            <Input
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Save Address
          </Button>
        </form>

        <div className="lg:col-span-7 space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className="brj-surface-soft p-4 flex justify-between gap-4">
              <div className="text-sm">
                <p className="font-bold uppercase text-xs text-[#173F35]">{addr.label}</p>
                <p className="font-bold mt-0.5">{addr.fullName}</p>
                <p>{addr.addressLine1}</p>
                <p>
                  {addr.city}, {addr.state} — {addr.pinCode}
                </p>
                <p className="text-xs text-[#211D19]/70 mt-1">Mobile: {addr.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => persist(addresses.filter((a) => a.id !== addr.id))}
                className="p-2 h-fit text-[#991B1B] hover:bg-[#FEE2E2] cursor-pointer"
                aria-label="Delete address"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
