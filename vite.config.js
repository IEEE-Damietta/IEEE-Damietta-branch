import { defineConfig } from "vite";

export default defineConfig({
  // استخدام './' بيخلي المسارات تبدأ بنقطة، وده بيخليها تشتغل على أي استضافة
  base: "./",
  build: {
    // للتأكد من أن الصور والملفات بتخرج في مجلد assets بشكل سليم
    assetsDir: "assets",
  },
});
