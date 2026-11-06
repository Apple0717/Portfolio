import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — William L. Todd" },
      { name: "description", content: "Sign in to the private dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, user, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard" });
  }, [ready, user, navigate]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = login(email, password);
    if (message) {
      setError(message);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Members</p>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Return to the private studio.</h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          The dashboard keeps the fuller record — focus, strengths, and the portfolio — once you are signed in on this device.
        </p>
      </Reveal>
      <Reveal delay={140} className="lux-panel p-6 md:p-9">
        <form onSubmit={onSubmit} className="space-y-5">
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="lux-input mt-2"
              required
            />
          </label>
          {error && (
            <p role="alert" className="lux-rise text-sm text-destructive">
              {error}
            </p>
          )}
          <button type="submit" className="gold-btn lux-btn w-full">
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-primary transition hover:text-accent">
            Create an account
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
