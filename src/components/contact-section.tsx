import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/portfolio-data";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please leave your name.");
      setSent(false);
      return;
    }
    if (!email.includes("@")) {
      setError("Please leave a real email so I can reply.");
      setSent(false);
      return;
    }
    if (message.trim().length < 8) {
      setError("A short note is enough — a sentence or two.");
      setSent(false);
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <div className="company-card from-left lux-panel col-start-1 mr-8 p-4 md:mr-12 md:p-5">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary">Contact us</p>
          <h2 className="mt-2 font-display text-2xl leading-tight md:text-3xl">Write from anywhere. I answer from California.</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-2 text-sm text-muted-foreground">
            The form opens your mail, addressed and ready.
          </p>
        </Reveal>
        <div className="mt-4 space-y-2">
          {[
            { icon: MapPin, label: profile.location, href: undefined },
            { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
            { icon: Phone, label: profile.phone, href: profile.phoneHref },
          ].map((item, index) => {
            const body = (
              <>
                <item.icon className="h-4 w-4 text-primary transition duration-300 group-hover:scale-110" />
                <span>{item.label}</span>
              </>
            );
            const className = "lux-panel lux-rise group flex items-center gap-2 px-3 py-2 text-xs transition duration-300 hover:-translate-y-0.5 hover:border-accent";
            return item.href ? (
              <a key={item.label} href={item.href} className={className} style={{ animationDelay: `${180 + index * 80}ms` }}>
                {body}
              </a>
            ) : (
              <div key={item.label} className={className} style={{ animationDelay: `${180 + index * 80}ms` }}>
                {body}
              </div>
            );
          })}
        </div>
      </div>

      <div className="company-card from-right contact-compact lux-panel col-start-2 ml-8 p-4 md:ml-12 md:p-5">
        {sent ? (
          <div className="lux-rise py-10 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">On its way</p>
            <h3 className="mt-3 font-display text-4xl">Your mail app should be open.</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              If it did not, write directly to {profile.email}. I read every note.
            </p>
            <button type="button" className="ghost-btn lux-btn mt-6" onClick={() => setSent(false)}>
              Write another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3" noValidate>
            <Field label="Name" id="contact-name" value={name} onChange={setName} autoComplete="name" />
            <Field label="Email" id="contact-email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <label className="lux-rise block text-xs uppercase tracking-[0.22em] text-muted-foreground" style={{ animationDelay: "180ms" }}>
              Message
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                className="lux-input mt-2 resize-none"
              />
            </label>
            {error && (
              <p role="alert" className="lux-rise text-sm text-destructive">
                {error}
              </p>
            )}
            <button type="submit" className="gold-btn lux-btn w-full">
              Send the note
            </button>
          </form>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
      {label}
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="lux-input mt-2"
      />
    </label>
  );
}
