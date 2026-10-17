import { assets } from "@/lib/assets"

/** Non-approved images still on the site. Their licences (CC BY, CC BY-SA) require attribution. */
export const creditedAssets = Object.values(assets).filter((a) => a.status !== "approved")

/**
 * Attribution list for every non-approved image, shown on the image credits
 * page (linked from the footer). Required by the CC BY and CC BY-SA licences
 * of some review photos; kept for all of them so reviewers can trace
 * provenance (see docs/ASSET_MANIFEST.md).
 */
export function ImageCredits() {
  if (!creditedAssets.length) return null
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {creditedAssets.map((a) => (
        <li key={a.id} className="py-4 text-[14.5px] leading-relaxed text-slate-text">
          <a href={a.credit.sourceUrl} className="font-medium text-charcoal underline-offset-4 hover:underline">
            {a.credit.title}
          </a>{" "}
          — {a.credit.author} ·{" "}
          <a href={a.credit.licenseUrl} className="underline-offset-4 hover:underline">
            {a.credit.license}
          </a>
          {a.credit.license.startsWith("CC BY") && " · cropped"}
        </li>
      ))}
    </ul>
  )
}
