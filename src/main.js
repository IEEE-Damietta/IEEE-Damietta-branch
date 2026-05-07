import { initRouter } from "./router";
import { toggleMenu } from "./utils/dom";
import { createCounterObserver, initBubblesEffect } from "./utils/animate";
import AOS from "aos";
import "aos/dist/aos.css";

// start bubbles effect
initBubblesEffect();

// start the router
initRouter();

// start animations library
AOS.init({
  once: false,
  offset: 200,
});

// init counter animation
const counterObserver = createCounterObserver();
document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

// event listeners
document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
document.getElementById("chatbot-toggle").addEventListener("click", toggleChatbot);
document.getElementById("chatbot-close").addEventListener("click", toggleChatbot);
document.getElementById("chatInput").addEventListener("keypress", (e) => handleKeyPress(e));
document.getElementById("chatbot-send").addEventListener("click", sendMessage);

// FAQ Accordion Functionality
document.querySelectorAll(".faq-question").forEach(function (question) {
  question.addEventListener("click", function () {
    var faqItem = this.parentElement;
    var isActive = faqItem.classList.contains("active");

    // Close all other items
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.classList.remove("active");
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});


// ==================== AI CHATBOT ====================
// Chatbot Functions
let isTyping = false;

function toggleChatbot() {
  const window = document.getElementById("chatbotWindow");
  window.classList.toggle("active");
}

function addMessage(content, isUser = false) {
  const messages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user" : "bot"}`;
  messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (!message || isTyping) return;

  // User message
  addMessage(message, true);
  input.value = "";

  // Bot typing
  isTyping = true;
  const sendBtn = document.querySelector(".chatbot-send");
  sendBtn.disabled = true;

  setTimeout(
    () => {
      const responses = getBotResponse(message);
      addMessage(responses);
      isTyping = false;
      sendBtn.disabled = false;
      input.focus();
    },
    1000 + Math.random() * 1000,
  );
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
function getBotResponse(message) {
  const lowerMessage = message.toLowerCase().trim();
  const arMessage = message
    .replace(/[^\u0600-\u06FF\u0020-\u007F]/g, "")
    .toLowerCase()
    .trim();

  // ==================== ردود متقدمة ====================

  // 1. الترحيب والتعريف
  if (
    lowerMessage.includes("مرحبا") ||
    lowerMessage.includes("اهلا") ||
    lowerMessage.includes("هاي") ||
    lowerMessage.includes("ازيك") ||
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    const welcomes = [
      "🌟 أهلا وسهلاً بيك في IEEE دمياط! أنا مساعدك الذكي 🤖<br>قولي عايز مساعدة في إيه؟",
      "👋 مرحباً يا بطل! IEEE دمياط جاهز يساعدك 😎<br>اسألني عن الاشتراك ، كورس، الفريق...",
      "🎉 أهلاً بيك! أحسن فرع طلابي في مصر هنا! 💪<br>إيه السؤال بتاعك؟",
    ];
    return welcomes[Math.floor(Math.random() * welcomes.length)];
  }

  // 2. العضوية والتسجيل (الأهم)
  if (
    lowerMessage.includes("فورم") ||
    lowerMessage.includes("الفورم") ||
    lowerMessage.includes("انضم") ||
    lowerMessage.includes("تسجيل") ||
    lowerMessage.includes("اسجل") ||
    lowerMessage.includes("التسجيل") ||
    lowerMessage.includes("join") ||
    lowerMessage.includes("membership") ||
    lowerMessage.includes("اشتراك") ||
    lowerMessage.includes(" اشترك") ||
    lowerMessage.includes(" بشترك")
  ) {
    return `🎯 <strong>العضوية مجانية تماماً!</strong> 💸 Zero Cost<br><br>
                📋 <strong>الخطوات (دقيقتين بس):</strong><br>
                ✅ 1️⃣ اضغط <strong>"Join Now"</strong> من القائمة<br>
                ✅ 2️⃣ املأ البيانات (اسم - تليفون - كلية)<br>
                ✅ 3️⃣ استلم شهادتك فوراً<br><br>
                🏆 <strong>هتحصل على:</strong><br>
                - شهادة IEEE معتمدة عالمياً<br>
                - ورش عمل مجانية (Arduino, Python, AI)<br>
                - فرص تدريب في شركات كبرى<br>
                - شبكة علاقات قوية<br><br>
                👆 <strong>اضغط Join Now دلوقتي!</strong>`;
  }

  // 3. الفريق التنفيذي (محدث)
  if (
    lowerMessage.includes("الفريق") ||
    lowerMessage.includes("رئيس") ||
    lowerMessage.includes("team") ||
    lowerMessage.includes("اتواصل") ||
    lowerMessage.includes("chairman") ||
    lowerMessage.includes("adham") ||
    lowerMessage.includes(" ادهم") ||
    lowerMessage.includes("روان") ||
    lowerMessage.includes("بسمله") ||
    lowerMessage.includes("عمر") ||
    lowerMessage.includes("يوسف") ||
    lowerMessage.includes("ندي") ||
    lowerMessage.includes("احمد")
  ) {
    return `👥 <strong>الفريق التنفيذي 2025-2026:</strong><br><br>
                👑 <strong>أدهم النفاراوي</strong> - الرئيس (Chairman)<br>
                ⚙️ <strong>رووان رشاد</strong> - نائب تقني<br>
                💼 <strong>بسمله الخواجة</strong> - نائب غير تقني<br>
                📋 <strong>عمر زكي</strong> - الأمين العام<br>
                💰 <strong>يوسف عبد العظيم</strong> - خازن أول<br>
                💰 <strong>ندي الحسيني</strong> - خازن ثاني<br>
                🌐 <strong>أحمد الديب</strong> - ويبماستر<br><br>
                📲 <strong>اضغط Contact Me</strong> تحت صورهم في About Us!`;
  }

  // 4. الفعاليات والورش
  if (
    lowerMessage.includes("فعاليات") ||
    lowerMessage.includes("ورش") ||
    lowerMessage.includes("events") ||
    lowerMessage.includes("الكورس") ||
    lowerMessage.includes("حفلة") ||
    lowerMessage.includes("مسابقة") ||
    lowerMessage.includes("كورسات") ||
    lowerMessage.includes("كورس")
  ) {
    return `📅 <strong>الفعاليات القادمة (كلهم مجاناً للأعضاء):</strong><br><br>
                🔥 <strong>ورشة Arduino</strong> - قريب جداً<br>
                🐍 <strong>كورس Python</strong> - من الصفر للاحتراف<br>
                🤖 <strong>ذكاء اصطناعي</strong> - AI Basics<br>
                💻 <strong>Web Development</strong> - HTML/CSS/JS<br>
                🏆 <strong>مسابقات برمجة</strong> - جوايز نقدية<br><br>
                📲 تابع الـ Facebook عشان التواريخ الدقيقة!`;
  }

  // 5. اللجان
  if (
    lowerMessage.includes("اللجنة") ||
    lowerMessage.includes("لجان") ||
    lowerMessage.includes("committees")
  ) {
    return `🏢 <strong>لجان IEEE دمياط (8 لجان):</strong><br><br>
                📢 <strong>العلاقات العامة</strong> - السوشيال ميديا<br>
                💻 <strong>التقنية</strong> - الورش والأجهزة<br>
                📚 <strong>التعليم</strong> - الكورسات والمحاضرات<br>
                🤝 <strong>الشراكات</strong> - الشركات والتدريب<br>
                🏆 <strong>المسابقات</strong> - البطولات<br>
                👥 <strong>العضوية</strong> - تسجيل الأعضاء<br>
                💼 <strong>التوظيف</strong> - فرص شغل<br>
                🎨 <strong>التصميم</strong> - البوسترات<br><br>
                👆 شوف التفاصيل في صفحة <strong>Committees</strong>`;
  }

  // 6. التواصل
  if (
    lowerMessage.includes("اتصل") ||
    lowerMessage.includes("رقم") ||
    lowerMessage.includes("تليفون") ||
    lowerMessage.includes("اتواصل ازاي") ||
    lowerMessage.includes("ايميل") ||
    lowerMessage.includes("واتس") ||
    lowerMessage.includes("contact")
  ) {
    return `📞 <strong>بيانات التواصل الرسمية:</strong><br><br>
                📧 <strong>eldeeb.9@example.com</strong><br>
                📱 <strong>+20 109 345 9909</strong><br><br>
                🌐 <strong>Facebook/Instagram:</strong> في الفوتر تحت<br>
                💬 <strong>أو كمل معايا هنا!</strong>`;
  }

  // 8. الأقسام
  if (lowerMessage.includes("هوم") || lowerMessage.includes("الرئيسية"))
    return "الصفحة الرئيسية <strong>Home</strong> في الأول يا معلم! 👆";
  if (lowerMessage.includes("عن") || lowerMessage.includes("about"))
    return "صفحة <strong>About Us</strong> - هتلاقي الفريق كله هناك! 😊";
  if (lowerMessage.includes("مدونة") || lowerMessage.includes("مقالات"))
    return "الـ <strong>Blogs</strong> مليان مقالات تقنية مفيدة جداً! 📚";
  if (lowerMessage.includes("لجان") || lowerMessage.includes("committees"))
    return "صفحة <strong>Committees</strong> - كل اللجان والمهام! 🏢";

  // 9. أسئلة شائعة
  if (
    lowerMessage.includes("سؤال") ||
    lowerMessage.includes("يسأل") ||
    lowerMessage.includes("faq")
  ) {
    return `❓ <strong>أشهر الأسئلة:</strong><br><br>
                💰 العضوية مجانية؟ <strong>أيوه 100%!</strong><br>
                ⏱️ كام دقيقة التسجيل؟ <strong>دقيقتين</strong><br>
                📜 الشهادة معتمدة؟ <strong>IEEE عالمياً</strong><br>
                👶 متطلبات؟ <strong>طالب هندسة بس</strong><br><br>
                👆 صفحة <strong>FAQ</strong> لكل التفاصيل!`;
  }

  // 10. ردود عامية ذكية
  const smartReplies = [
    // `💡 <strong>نصيحة مني ليك:</strong><br>انضم للفرع وهتغير حياتك المهنية! 🎓`,
    `🤔 لو عايز حاجة معينة من دول عشان اقدر اساعدك فيهم؟ قول:<br>
        • "اشتراك" 
        • "الفريق" 
        •"انضم" 
        •"team"  
        •"كورسات" 
        • "الفورم"
        •"اتصل"`,
    // `🚀 IEEE دمياط = <strong>البوابة لسوق العمل</strong><br>شهادات + خبرة + علاقات`,
    // `📚 عايز تتعلم برمجة؟<br>عندنا Python | Arduino | AI <strong>كله مجاناً!</strong>`,
    // `🏆 شارك في مسابقاتنا واربح جوايز + CV قوي للسيرة`,
    // `أنا 24/7 جاهز! 😎 أي سؤال تاني؟`
  ];

  return smartReplies[Math.floor(Math.random() * smartReplies.length)];
}