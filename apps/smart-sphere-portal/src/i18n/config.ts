import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          title: "WorldWise Learning: Summer Camp Assessment",
          description: "Discover your child's path to global universities like NYU or Oxford.",
          button: "Check Readiness Now",
          result_title: "Recommendation:",
          hub_label: "Target Hub: HCMC Hub",
          domain_listening: "Listening",
          domain_speaking: "Speaking",
          domain_reading: "Reading",
          domain_writing: "Writing",
          domain_thinking: "Thinking"
        }
      },
      vi: {
        translation: {
          title: "Kiểm Tra Mức Độ Sẵn Sàng",
          description: "Khám phá con đường vào các đại học toàn cầu như NYU hoặc Oxford cho con bạn.",
          button: "Kiểm Tra Ngay",
          result_title: "Đề xuất:",
          hub_label: "Trung tâm mục tiêu: HCMC Hub",
          domain_listening: "Nghe",
          domain_speaking: "Nói",
          domain_reading: "Đọc",
          domain_writing: "Viết",
          domain_thinking: "Tư duy"
        }
      }
    }
  });

export default i18n;
