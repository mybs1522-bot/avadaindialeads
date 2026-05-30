"use client";

import { CheckCircle, Loader2 } from "lucide-react";
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
import { Service } from "@/features/profile/types/services";
import { supabase } from "@/lib/supabase";

export function ServiceDialog({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service: Service | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("service_leads").insert({
      name: name.trim(),
      phone: phone.trim(),
      service_id: service.id,
    });

    setSubmitting(false);

    if (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } else {
      if (service.payment_link) {
        toast.success("Success! Redirecting to payment...");
        window.open(service.payment_link, "_blank");
      } else {
        toast.success("Request received! Our support team will contact you shortly.");
      }
      onClose();
      // Reset form
      setName("");
      setPhone("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Service</DialogTitle>
          <DialogDescription>
            Enter your details below to request{" "}
            <span className="font-semibold text-foreground">
              {service?.title}
            </span>
            .
            {service?.description && (
              <p className="mt-2 text-sm text-muted-foreground whitespace-normal">
                {service.description}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="service-name">Full Name</Label>
            <Input
              id="service-name"
              type="text"
              placeholder="e.g. Rahul Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-phone">Phone Number</Label>
            <Input
              id="service-phone"
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
              <CheckCircle className="mr-2 size-4" />
            )}
            {service?.payment_link ? "Proceed to Payment" : "Request Call Back"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
