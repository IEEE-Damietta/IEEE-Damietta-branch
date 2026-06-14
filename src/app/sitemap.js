export default async function sitemap() {
  const baseUrl = "https://ieeedamietta.org";

  // الصفحات الثابتة عندك
  const staticRoutes = ["", "/events", "/blogs", "/long", "/register"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0], // بيحط تاريخ النهاردة تلقائي
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8, // الصفحة الرئيسية ليها الأولوية القصوى
    }),
  );

  // 💡 نصيحة للمستقبل: لو عندك مقالات (blogs) أو أحداث (events) بتيجي من الـ API
  // تقدر تعمل ليها fetch هنا وتعملها map وتضيفها للـ sitemap ديناميكياً!

  return [...staticRoutes];
}
