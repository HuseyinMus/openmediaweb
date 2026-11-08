"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  budgetOptions,
  businessTypeOptions,
  contactSchema,
  fieldErrorsFrom,
  LIMITS,
  serviceOptions,
  type ContactField,
} from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  service: string;
  projectDescription: string;
  budget: string;
  kvkkConsent: boolean;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; stored: boolean; emailed: boolean }
  | { kind: "error"; message: string };

const empty: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  service: "",
  projectDescription: "",
  budget: "",
  kvkkConsent: false,
};

const fieldOrder: ContactField[] = [
  "name",
  "businessName",
  "email",
  "phone",
  "businessType",
  "service",
  "projectDescription",
  "budget",
  "kvkkConsent",
];

const inputClass =
  "h-12 rounded-xl border-om-navy/15 bg-white px-4 text-[0.95rem] shadow-none placeholder:text-om-navy/35 focus-visible:border-om-blue focus-visible:ring-om-blue/20";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-om-navy">
        {label}
        {optional ? <span className="font-normal text-om-navy/45"> (isteğe bağlı)</span> : <span className="text-om-blue" aria-hidden="true"> *</span>}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-om-navy/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const initialService = serviceOptions.some((o) => o.value === preset) ? (preset as string) : "";

  const [values, setValues] = useState<FormState>({ ...empty, service: initialService });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateField(key: ContactField) {
    const r = contactSchema.safeParse(values);
    const message = r.success ? undefined : fieldErrorsFrom(r.error)[key];
    setErrors((e) => ({ ...e, [key]: message }));
  }

  function focusFirstError(errs: Partial<Record<ContactField, string>>) {
    const first = fieldOrder.find((f) => errs[f]);
    if (!first) return;
    // Wait for error messages to render, then bring the field into view.
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`#${first}`);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      el.focus({ preventScroll: true });
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrorsFrom(parsed.error);
      setErrors(errs);
      setStatus({ kind: "error", message: "Lütfen işaretli alanları kontrol edin." });
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true; stored: boolean; emailed: boolean }
        | { ok: false; error?: string; fieldErrors?: Partial<Record<ContactField, string>> }
        | null;

      if (data?.ok) {
        setStatus({ kind: "success", stored: data.stored, emailed: data.emailed });
        return;
      }
      if (data && !data.ok && data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      }
      setStatus({
        kind: "error",
        message: (data && !data.ok && data.error) || "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } catch {
      setStatus({ kind: "error", message: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin." });
    }
  }

  function reset() {
    setValues({ ...empty });
    setErrors({});
    setStatus({ kind: "idle" });
    startedAt.current = Date.now();
  }

  const describedBy = (id: ContactField, hasHint = false) =>
    errors[id] ? `${id}-error` : hasHint ? `${id}-hint` : undefined;

  if (status.kind === "success") {
    const message = status.stored
      ? status.emailed
        ? "Talebiniz kaydedildi ve ekibimize e-posta ile iletildi."
        : "Talebiniz kaydedildi. Ekibimiz talebinizi inceleyecek."
      : "Talebiniz ekibimize e-posta ile iletildi.";
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start py-6"
        role="status"
        aria-live="polite"
      >
        <span className="grid size-14 place-items-center rounded-full bg-om-yellow text-om-navy">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-om-navy">Teşekkürler!</h2>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-om-navy/70">{message}</p>
        <p className="mt-2 max-w-md text-om-navy/60">
          Size verdiğiniz e-posta adresi üzerinden dönüş yapacağız.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-om-navy/15 px-5 text-sm font-medium text-om-navy hover:bg-om-warm"
          >
            <RotateCcw className="size-4" aria-hidden="true" /> Yeni talep gönder
          </button>
          <Link
            href="/work"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-om-navy px-5 text-sm font-medium text-white hover:bg-om-blue"
          >
            Çalışmalarımızı inceleyin <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-required-note" className="relative">
      <p id="form-required-note" className="mb-6 text-sm text-om-navy/55">
        <span className="text-om-blue">*</span> ile işaretli alanlar zorunludur.
      </p>

      {/* Honeypot — hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Web siteniz</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Ad Soyad" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => values.name && validateField("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            aria-required="true"
            className={inputClass}
          />
        </Field>

        <Field id="businessName" label="İşletme adı" error={errors.businessName}>
          <Input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            maxLength={LIMITS.businessName}
            value={values.businessName}
            onChange={(e) => set("businessName", e.target.value)}
            onBlur={() => values.businessName && validateField("businessName")}
            aria-invalid={!!errors.businessName}
            aria-describedby={describedBy("businessName")}
            aria-required="true"
            className={inputClass}
          />
        </Field>

        <Field id="email" label="E-posta" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => values.email && validateField("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            aria-required="true"
            className={inputClass}
          />
        </Field>

        <Field id="phone" label="Telefon" optional error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            placeholder="+90 5xx xxx xx xx"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => values.phone && validateField("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={inputClass}
          />
        </Field>

        <Field id="businessType" label="İşletme türü" error={errors.businessType}>
          <Select value={values.businessType} onValueChange={(v) => set("businessType", v)}>
            <SelectTrigger
              id="businessType"
              aria-invalid={!!errors.businessType}
              aria-describedby={describedBy("businessType")}
              aria-required="true"
              className={cn(inputClass, "w-full data-[size=default]:h-12")}
            >
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-xl">
              {businessTypeOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="py-2.5">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="service" label="İlgilendiğiniz hizmet" error={errors.service}>
          <Select value={values.service} onValueChange={(v) => set("service", v)}>
            <SelectTrigger
              id="service"
              aria-invalid={!!errors.service}
              aria-describedby={describedBy("service")}
              aria-required="true"
              className={cn(inputClass, "w-full data-[size=default]:h-12")}
            >
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-xl">
              {serviceOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="py-2.5">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          id="projectDescription"
          label="Proje açıklaması"
          error={errors.projectDescription}
          hint={`${values.projectDescription.length} / ${LIMITS.projectDescription} — Ürünlerinizi, hedefinizi ve kullandığınız kanalları kısaca anlatın.`}
          className="sm:col-span-2"
        >
          <Textarea
            id="projectDescription"
            name="projectDescription"
            rows={6}
            maxLength={LIMITS.projectDescription}
            value={values.projectDescription}
            onChange={(e) => set("projectDescription", e.target.value)}
            onBlur={() => values.projectDescription && validateField("projectDescription")}
            aria-invalid={!!errors.projectDescription}
            aria-describedby={describedBy("projectDescription", true)}
            aria-required="true"
            className={cn(inputClass, "h-auto min-h-36 py-3 leading-relaxed")}
          />
        </Field>

        <Field id="budget" label="Bütçe aralığı" optional error={errors.budget} className="sm:col-span-2">
          <Select value={values.budget} onValueChange={(v) => set("budget", v)}>
            <SelectTrigger
              id="budget"
              aria-invalid={!!errors.budget}
              aria-describedby={describedBy("budget")}
              className={cn(inputClass, "w-full data-[size=default]:h-12")}
            >
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-xl">
              {budgetOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="py-2.5">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="kvkkConsent"
              checked={values.kvkkConsent}
              onCheckedChange={(c) => set("kvkkConsent", c === true)}
              aria-invalid={!!errors.kvkkConsent}
              aria-describedby={errors.kvkkConsent ? "kvkkConsent-error" : undefined}
              aria-required="true"
              className="mt-0.5 size-5 rounded-md border-om-navy/25 data-checked:border-om-blue data-checked:bg-om-blue"
            />
            <Label htmlFor="kvkkConsent" className="block text-sm leading-relaxed font-normal text-om-navy/75">
              Kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesine ilişkin{" "}
              <Link href="/kvkk" target="_blank" className="font-medium text-om-blue underline underline-offset-2">
                KVKK Aydınlatma Metni
              </Link>
              ’ni okudum. <span className="text-om-blue" aria-hidden="true">*</span>
            </Label>
          </div>
          {errors.kvkkConsent && (
            <p id="kvkkConsent-error" className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              {errors.kvkkConsent}
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {status.kind === "error" && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-6 flex items-start gap-2 rounded-xl bg-destructive/8 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {status.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-om-blue pr-2 pl-7 text-base font-medium text-white shadow-[0_10px_30px_-10px_rgb(36_91_255/0.7)] transition-colors hover:bg-om-cobalt disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? "Gönderiliyor…" : "Proje Talebini Gönder"}
          <span className="grid size-10 place-items-center rounded-full bg-om-yellow text-om-navy">
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            )}
          </span>
        </button>
        <p className="text-xs text-om-navy/45">Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.</p>
      </div>
    </form>
  );
}
