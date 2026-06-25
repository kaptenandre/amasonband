import { Arrow } from "./Arrow";
import type { Cta } from "@/sanity/types";

export function CtaButton({ cta }: { cta: Cta }) {
  if (!cta?.label) return null;

  const style = cta.style ?? "primary";
  const href = cta.href ?? "#";
  const isAnchor = href.startsWith("#");
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      className={`btn btn-${style}`}
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {cta.label}
      {style === "primary" && !isAnchor && <Arrow />}
    </a>
  );
}
