import { CircleCheck } from "lucide-react";

type ConfirmationPanelProps = {
  title: string;
  body: string;
  reference: string;
};

export function ConfirmationPanel({
  title,
  body,
  reference,
}: ConfirmationPanelProps) {
  return (
    <div role="status" className="bg-ink px-[31px] py-[33px] text-white">
      <CircleCheck
        aria-hidden="true"
        className="size-8 text-highlight"
        strokeWidth={1.5}
      />
      <p className="mt-5 font-meta text-[10px] font-medium tracking-[0.12em] text-highlight uppercase">
        Request received
      </p>
      <h2 className="mt-[17px] mb-[29px] font-display text-[clamp(32px,4vw,48px)] leading-[0.94] font-semibold tracking-[-0.04em]">
        {title}
      </h2>
      <p className="max-w-[420px] text-base leading-[1.6] text-white/85">{body}</p>
      <p className="mt-8 font-meta text-[9px] font-medium tracking-[0.12em] text-white/70">
        REFERENCE
      </p>
      <p className="mt-2 font-meta text-sm tracking-[0.08em] text-white">
        {reference}
      </p>
    </div>
  );
}
