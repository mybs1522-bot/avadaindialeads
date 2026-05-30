"use client";

import { CheckCircle, Loader2, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { WriteReviewDialog } from "@/features/profile/components/reviews/write-review-dialog";

interface Review {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch reviews");
      console.error(error);
    } else {
      setReviews(data as Review[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error(`Failed to mark review as ${status}`);
    } else {
      toast.success(`Review marked as ${status}`);
      fetchReviews();
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete review");
    } else {
      toast.success("Review deleted");
      fetchReviews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Review Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchReviews}>
            Refresh
          </Button>
          <Button onClick={() => setDialogOpen(true)}>
            Add Review
          </Button>
        </div>
      </div>
      
      <WriteReviewDialog open={dialogOpen} onClose={() => {
        setDialogOpen(false);
        fetchReviews();
      }} />

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reviewer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="w-[300px]">Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.role || "Client"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-orange-400">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {review.content}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "approved"
                          ? "default"
                          : review.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {review.status !== "approved" && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => updateStatus(review.id, "approved")}
                          title="Approve"
                        >
                          <CheckCircle className="size-4" />
                        </Button>
                      )}
                      {review.status !== "rejected" && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-orange-500 hover:text-orange-600"
                          onClick={() => updateStatus(review.id, "rejected")}
                          title="Reject"
                        >
                          <XCircle className="size-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteReview(review.id)}
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
