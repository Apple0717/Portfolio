import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — William L. Todd" },
      { name: "description", content: "Create an account to open the private dashboard." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup, user, ready } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard" });
  }, [ready, user, navigate]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter the name you want on the dashboard.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Use at least 6 characters.");
      return;
    }
    const message = signup(name, email, password);
    if (message) {
      setError(message);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Membership</p>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Open the door to the dashboard.</h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          Accounts stay in this browser. Sign up, then the private studio — charts, strengths, and selected work — is yours.
        </p>
      </Reveal>
      <Reveal delay={140} className="lux-panel p-6 md:p-9">
        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Name
            <input
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="lux-input mt-2"
              required
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="lux-input mt-2"
              required
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Password
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="lux-input mt-2"
              required
              minLength={6}
            />
          </label>
          {error && (
            <p role="alert" className="lux-rise text-sm text-destructive">
              {error}
            </p>
          )}
          <button type="submit" className="gold-btn lux-btn w-full">
            Sign up
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-primary transition hover:text-accent">
            Login
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
