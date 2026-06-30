export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // If you have admin pages you don't want search engines to index (optional)
    },
    sitemap: "https://ieeedamietta.org/sitemap.xml",
  };
}
