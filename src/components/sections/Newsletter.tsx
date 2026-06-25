"use client";

import { useState } from "react";
import { Arrow } from "../Arrow";
import type { NewsletterSection } from "@/sanity/types";

type State = "idle" | "loading" | "success" | "error";

export function Newsletter({ data }: { data: NewsletterSection }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, actionUrl: data.actionUrl }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      setMessage(data.successMessage || "Thanks — you’re on the list.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="section" id="newsletter">
      <div className="container">
        <div className="newsletter">
          {data.heading && (
            <h2 className="newsletter__heading">{data.heading}</h2>
          )}
          {data.body && <p className="newsletter__body">{data.body}</p>}

          <form className="signup" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              className="signup__input"
              type="email"
              required
              autoComplete="email"
              placeholder={data.placeholder || "you@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={state === "loading"}
            >
              {state === "loading"
                ? "Signing up…"
                : data.buttonLabel || "Notify me"}
              {state !== "loading" && <Arrow />}
            </button>
          </form>

          <p
            className="signup__status"
            data-state={state}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
