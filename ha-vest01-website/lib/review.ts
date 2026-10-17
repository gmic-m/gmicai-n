/**
 * Review-build switch. While true, the page shows the review-draft banner,
 * placeholder disclosures and internal review notes (dashed blocks).
 *
 * Publication is NOT approved (v1.4 sheet, "Open Issues & Approvals"). Before
 * any publication build: replace every placeholder asset, clear the review
 * checklist in docs/REVIEW-CHECKLIST.md, obtain Trigg's explicit approval of
 * the exact version, then set this to false. Placeholder disclosures stay
 * visible regardless of this flag for any asset still marked "placeholder".
 */
export const REVIEW_BUILD = true

export const REVIEW_LABEL = "HA-VEST01 Product Page v1.4 — Review Draft"
export const REVIEW_SUBLABEL = "Not approved for publication · Internal review only"
