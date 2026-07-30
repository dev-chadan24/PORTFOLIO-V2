import { Reveal } from "./Reveal";

/**
 * SectionMark — editorial section divider used across all portfolio sections.
 * Displays a numeric index, hairline rule, and section label.
 *
 * Extracted from About.tsx to make it a proper shared UI primitive.
 */
export function SectionMark({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-14">
        <span className="text-display italic text-3xl text-text-muted">{index}</span>
        <span className="hairline h-px bg-border flex-1 max-w-[80px]" />
        <span className="text-eyebrow">{label}</span>
      </div>
    </Reveal>
  );
}
