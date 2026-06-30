export default async function sitemap() {
  const baseUrl = "https://ieeedamietta.org";

  // Static pages in the sitemap
  const staticRoutes = ["", "/events", "/blogs", "/long", "/register"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0], // Sets today's date automatically
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8, // Home page gets the highest priority
    }),
  );

  // Tip: If you have blog posts or events from an API,
  // you can fetch them here and add them to the sitemap dynamically.

  return [...staticRoutes];
}
