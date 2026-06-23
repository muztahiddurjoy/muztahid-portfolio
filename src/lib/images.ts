/* ============================================================
   MUZTAHID RAHMAN — curated imagery catalogue
   ------------------------------------------------------------
   Illustrative, topical defaults that give the editorial UI real
   visual weight out of the box. Every photo here is a *default*:
   any Payload `media` upload (hero portrait, project cover, gallery
   shot, article cover) overrides it via the mappers, so an editor can
   swap in real photography from the admin panel without touching code.

   All images come from the Unsplash CDN (stable, immutable photo IDs)
   and are rendered through `<ImageFrame>`, which applies a theme-aware
   duotone wash — so a colour photo always settles into the active warm
   palette instead of fighting it.

   Pick new images by validating the photo id returns an image, e.g.:
     curl -I "https://images.unsplash.com/photo-<id>?w=64"
   ============================================================ */

/** Build a sized, format-optimised Unsplash URL from an immutable photo id. */
const u = (id: string, w = 1600): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/* ----------------------------- portraits / hero ----------------------------- */
// Anonymous, work-focused frames (no claimed likeness) — "the builder at work".
export const heroImage = u('1581094794329-c8112a89af12', 1400) // over-the-shoulder, code on screen
export const aboutPortrait = u('1581092918056-0c4c3acd3789', 1200) // hands working on electronics

/* ------------------------------- project imagery ------------------------------- */
// Keyed by project slug. `cover` is the headline frame; `gallery` fills the three
// "In the Build" slots in order. Subjects are topical to each project's domain.
export const projectImages: Record<string, { cover: string; gallery: string[] }> = {
  appbaksho: {
    cover: u('1522071820081-009f0129c71c'), // studio team shipping together
    gallery: [u('1517694712202-14dd9538aa97', 1000), u('1556761175-5973dc0f32e7', 1000), u('1581092160562-40aa08e78837', 1000)],
  },
  'bot-engineers': {
    cover: u('1461749280684-dccba630e2f6'), // code on screen
    gallery: [u('1605810230434-7631ac76ec81', 1000), u('1558494949-ef010cbdcc31', 1000), u('1487958449943-2429e8be8625', 1000)],
  },
  'enterprise-commerce': {
    cover: u('1551288049-bebda4e38f71'), // analytics / commerce dashboard
    gallery: [u('1518005020951-eccb494ad742', 1000), u('1498050108023-c5249f4df085', 1000), u('1451187580459-43490279c0fa', 1000)],
  },
  'mongol-tori-autonomy': {
    cover: u('1485827404703-89b55fcc595e'), // autonomous robot
    gallery: [u('1518770660439-4636190af475', 1000), u('1547234935-80c7145ec969', 1000), u('1581091226825-a6a2a5aee158', 1000)],
  },
  'space-apps-telemetry': {
    cover: u('1446776811953-b23d57bd21aa'), // earth from orbit
    gallery: [u('1591696205602-2f950c417cb9', 1000), u('1444703686981-a3abbc4d4fe3', 1000), u('1454165804606-c3d57bc86b40', 1000)],
  },
  'fabrication-studio': {
    cover: u('1559136555-9303baea8ebd'), // workshop / makerspace
    gallery: [u('1518186285589-2f7649de83e0', 1000), u('1453928582365-b6ad33cbcf64', 1000), u('1581093588401-fbb62a02f120', 1000)],
  },
}

/* ------------------------------- article covers ------------------------------- */
// Keyed by article slug.
export const articleCovers: Record<string, string> = {
  'building-a-studio-not-an-agency': u('1531482615713-2afd69097998'), // collaborating team
  'shipping-under-constraint': u('1504384308090-c894fdcc538d'), // heads-down sprint room
  'the-engineering-culture-i-want': u('1573164713988-8665fc963095'), // data / ops corridor
  'autonomy-on-unforgiving-terrain': u('1469474968028-56623f02e42e'), // unforgiving terrain
  'the-w123-school-of-engineering': u('1503376780353-7e6692767b70'), // built-to-last classic car
  'framing-engineering-as-value': u('1581090700227-1e37b190418e'), // founder silhouette
  'the-cloud-pipeline-that-sleeps-well': u('1558494949-ef010cbdcc31'), // servers / cloud
}

/* ------------------------------- session imagery ------------------------------ */
// Keyed by session slug. `cover` is the headline frame on the list row + detail
// hero. A CMS `cover.image` upload overrides it per-session via the mappers.
export const sessionImages: Record<string, { cover: string }> = {
  'fullstack-mentorship': { cover: u('1517694712202-14dd9538aa97') }, // 1:1 over a laptop
  'ship-your-first-saas': { cover: u('1522071820081-009f0129c71c') }, // a team shipping together
  'robotics-bootcamp': { cover: u('1485827404703-89b55fcc595e') }, // autonomous robot
  'code-review-office-hours': { cover: u('1461749280684-dccba630e2f6') }, // code on screen
  'system-design-deep-dive': { cover: u('1551288049-bebda4e38f71') }, // architecture / dashboard
  'campus-tech-talk': { cover: u('1531482615713-2afd69097998') }, // a room, mid-talk
}

/* --------------------------------- ambient art -------------------------------- */
// Faint, masked photographic washes layered behind hero / footer chrome.
// Every theme has a *light* background, so these are blended with `multiply` —
// which only reads with mid-tone, *structural* imagery (aerial / architectural
// line-work). Dark images (night skies) would just smear; avoid them here.
export const ambient = {
  contact: u('1518770660439-4636190af475', 1600), // aerial street grid — a connected world
  footer: u('1487958449943-2429e8be8625', 1600), // architectural line-work — built to last
}
