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
          hub_label: "Target Hub: HCMC Hub"
        }
      },
      vi: {
        translation: {
          title: "Kiểm Tra Mức Độ Sẵn Sàng",
          description: "Khám phá con đường vào các đại học toàn cầu như NYU hoặc Oxford cho con bạn.",
          button: "Kiểm Tra Ngay",
          result_title: "Đề xuất:",
          hub_label: "Trung tâm mục tiêu: HCMC Hub"
        }
      }
    }
  });

export default i18n;
