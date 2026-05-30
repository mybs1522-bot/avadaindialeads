"use client";

import { Download,Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@/features/books/types";
import { supabase } from "@/lib/supabase";

export function BookDialog({
  open,
  onClose,
  book,
}: {
  open: boolean;
  onClose: () => void;
  book: Book | null;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    if (!email.trim() || !phone.trim()) {
      toast.error("Please enter your email and phone number");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("book_leads").insert({
      email: email.trim(),
      phone: phone.trim(),
      book_id: book.id,
    });

    setSubmitting(false);

    if (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } else {
      toast.success("Success! Redirecting you to the book...");
      onClose();
      // Redirect to the book link in a new tab
      window.open(book.link, "_blank");
      // Reset form
      setEmail("");
      setPhone("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Free Book</DialogTitle>
          <DialogDescription>
            Enter your details below to get access to{" "}
            <span className="font-semibold text-foreground">
              {book?.title}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email Address</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone Number</Label>
            <Input
              id="lead-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Download className="mr-2 size-4" />
            )}
            Get Free Access
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
