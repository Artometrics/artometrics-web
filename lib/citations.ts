export type CitationStyle = "apa" | "mla" | "chicago" | "bibtex" | "url";

export const CITATION_STYLES: { id: CitationStyle; label: string }[] = [
  { id: "apa", label: "APA" },
  { id: "mla", label: "MLA" },
  { id: "chicago", label: "Chicago" },
  { id: "bibtex", label: "BibTeX" },
  { id: "url", label: "URL" },
];

export type ParsedReference = {
  plainText: string;
  url?: string;
  doi?: string;
  authorSegment?: string;
  year?: string;
  bodySegment?: string;
  hasItalicTitle: boolean;
};

const SITE = "https://artometrics.com";

/** Strip HTML to a single normalized plain string (keeps no markup). */
export function plainTextFromHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function resolveHref(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("/")) return `${SITE}${trimmed}`;
  return trimmed;
}

export function extractUrlAndDoiFromHtml(html: string): { url?: string; doi?: string } {
  const hrefRe = /href=["']([^"']+)["']/gi;
  let url: string | undefined;
  let doi: string | undefined;
  let match: RegExpExecArray | null;
  while ((match = hrefRe.exec(html)) !== null) {
    const resolved = resolveHref(match[1]);
    if (!resolved) continue;
    if (/doi\.org\//i.test(resolved)) {
      doi = resolved.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
      url = resolved;
      break;
    }
    if (!url && /^https?:\/\//i.test(resolved)) url = resolved;
  }
  if (!doi && url && /doi\.org\//i.test(url)) {
    doi = url.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  }
  const plainDoi = html.match(/10\.\d{4,9}\/[^\s<"']+/i)?.[0];
  if (!doi && plainDoi) {
    doi = plainDoi.replace(/\.$/, "");
    url = url || `https://doi.org/${doi}`;
  }
  return { url, doi };
}

/** Heuristic parse from visible reference line (usually APA-ish in Artometrics reports). */
export function parseReferenceFromPlain(
  plainText: string,
  url?: string,
  doi?: string,
  hasItalicTitle = false,
): ParsedReference {
  const plain = plainText.replace(/\s+/g, " ").trim();

  let authorSegment: string | undefined;
  let year: string | undefined;
  let bodySegment: string | undefined;

  const parenYear = plain.match(/^(.+?)\.\s*\((n\.d\.|\d{4})\)\.\s*(.+)$/i);
  if (parenYear) {
    authorSegment = parenYear[1].trim();
    year = parenYear[2].replace(/\.$/, "");
    bodySegment = parenYear[3].trim();
  } else {
    const trailingYear = plain.match(/^(.+?),\s*(\d{4}(?:–\d{4})?)\.\s*(.+)$/);
    if (trailingYear) {
      authorSegment = trailingYear[1].trim();
      year = trailingYear[2].split("–")[0];
      bodySegment = trailingYear[3].trim();
    } else {
      const authorOnly = plain.match(/^([^.]+(?:\.[^.(]+)*)\.\s+(.+)$/);
      if (authorOnly && authorOnly[1].length < 120) {
        authorSegment = authorOnly[1].trim();
        bodySegment = authorOnly[2].trim();
      }
    }
  }

  return {
    plainText: plain,
    url,
    doi,
    authorSegment,
    year,
    bodySegment: bodySegment ?? (authorSegment ? undefined : plain),
    hasItalicTitle,
  };
}

export function parseReferenceFromHtml(html: string): ParsedReference {
  const plainText = plainTextFromHtml(html);
  const { url, doi } = extractUrlAndDoiFromHtml(html);
  const hasItalicTitle = /<em>|<i\b/i.test(html);
  return parseReferenceFromPlain(plainText, url, doi, hasItalicTitle);
}

function apaAuthorsToMlaLastFirst(authorSegment: string): string {
  const parts = authorSegment.split(/\s*,\s*&\s*|\s*,\s*and\s+/i);
  const mlaParts = parts.map((part) => {
    const trimmed = part.trim();
    const comma = trimmed.match(/^([^,]+),\s*(.+)$/);
    if (comma) return `${comma[1].trim()}, ${comma[2].trim()}`;
    return trimmed;
  });
  return mlaParts.join(", and ");
}

function stripTrailingLinkLabel(body: string, url?: string): string {
  if (!url) return body;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const re = new RegExp(`\\s*${host.replace(/\./g, "\\.")}\\s*$`, "i");
    return body.replace(re, "").trim();
  } catch {
    return body;
  }
}

function bibtexKey(ref: ParsedReference, index: number): string {
  const author = ref.authorSegment?.split(",")[0]?.replace(/\W+/g, "") || "source";
  const year = ref.year?.replace(/\D/g, "") || "nd";
  return `${author}_${year}_${index}`.toLowerCase().slice(0, 48);
}

function bibtexEscape(value: string): string {
  return value.replace(/[{}\\]/g, "\\$&");
}

function titleFromBody(body: string): string {
  const withoutJournal = body.split(/\.\s+[A-Z][^,]+,\s*\d/)[0];
  return (withoutJournal || body).replace(/\.$/, "").trim();
}

export function formatCitation(ref: ParsedReference, style: CitationStyle, index = 0): string {
  const body = ref.bodySegment ?? ref.plainText;
  const author = ref.authorSegment;
  const year = ref.year ?? "n.d.";
  const url = ref.url;
  const doi = ref.doi;

  switch (style) {
    case "apa":
      return ref.plainText;

    case "url":
      if (url) return url;
      if (doi) return `https://doi.org/${doi}`;
      return ref.plainText;

    case "mla": {
      if (!author) {
        return url ? `${ref.plainText} ${url}` : ref.plainText;
      }
      const mlaAuthor = apaAuthorsToMlaLastFirst(author);
      const core = stripTrailingLinkLabel(body, url);
      const title = titleFromBody(core);
      const isBook = ref.hasItalicTitle;
      const quoted = isBook && !title.includes('"') ? `"${title}."` : `${title}.`;
      let line = `${mlaAuthor}. ${quoted}`;
      if (year !== "n.d.") line += ` ${year}.`;
      if (url) line += ` ${url}.`;
      else if (!line.endsWith(".")) line += ".";
      return line.replace(/\s+/g, " ").trim();
    }

    case "chicago": {
      if (!author) {
        return url ? `${ref.plainText}. ${url}.` : `${ref.plainText}.`;
      }
      const core = stripTrailingLinkLabel(body, url);
      const title = titleFromBody(core);
      let line = `${author}. "${title}."`;
      if (year !== "n.d.") line += ` ${year}.`;
      if (url) line += ` ${url}.`;
      return line.replace(/\s+/g, " ").trim();
    }

    case "bibtex": {
      const key = bibtexKey(ref, index);
      const title = titleFromBody(body || ref.plainText);
      const lines = [`@misc{${key},`];
      if (author) lines.push(`  author = {${bibtexEscape(author)}},`);
      if (title) lines.push(`  title = {${bibtexEscape(title)}},`);
      if (ref.year) lines.push(`  year = {${ref.year}},`);
      if (doi) lines.push(`  doi = {${doi}},`);
      if (url) lines.push(`  url = {${url}},`);
      lines.push("}");
      return lines.join("\n");
    }

    default:
      return ref.plainText;
  }
}
