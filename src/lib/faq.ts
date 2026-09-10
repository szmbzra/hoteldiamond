/** CMS `faq`/`faq_schema` columns arrive as either an array or stringified JSON. */
function parseFaqField(data: any): any[] {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Normalises a subpackage item's `faq`/`faq_schema` fields into {question, answer} pairs. */
export function normalizeFaqs(faq: any, faqSchema: any): FaqItem[] {
  const parsedFaq = parseFaqField(faq);
  const parsedFaqSchema = parseFaqField(faqSchema);
  const raw = parsedFaq.length > 0 ? parsedFaq : parsedFaqSchema;

  return raw.map((f: any) => ({
    question: f.q ?? f.question ?? "",
    answer: f.a ?? f.answer ?? "",
  }));
}
