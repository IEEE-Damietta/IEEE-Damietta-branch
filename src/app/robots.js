export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // لو عندك صفحات مش عايز جوجل يشوفها (اختياري)
    },
    sitemap: "https://ieeedamietta.org/sitemap.xml",
  };
}
