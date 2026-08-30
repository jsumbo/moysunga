import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";

import { eventContent } from "@/lib/event-content";

const conceptNote = eventContent.registerPage.conceptNote;

export function ConceptNoteCard() {
  return (
    <div className="mt-10 border border-line bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center border border-ink/20 bg-ink text-white">
          <FileText aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-meta text-[10px] font-medium tracking-[0.12em] text-muted-copy uppercase">
            {conceptNote.label}
            <span className="ml-2 text-liberia">{conceptNote.fileType}</span>
          </p>
          <h2 className="mt-1 font-display text-[20px] leading-[1.15] font-semibold tracking-[-0.03em]">
            {conceptNote.title}
          </h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-[1.6] text-copy">{conceptNote.body}</p>
      <Link
        href="/api/concept-note"
        className="mt-5 inline-flex items-center gap-2 bg-ink px-[17px] py-[11px] font-meta text-[11px] font-medium tracking-[0.08em] text-white no-underline uppercase transition-opacity duration-200 hover:opacity-80"
      >
        {conceptNote.actionLabel}
        <ArrowDown aria-hidden="true" className="size-3.5" />
      </Link>
    </div>
  );
}
