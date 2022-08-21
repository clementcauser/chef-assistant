import { format as formatDate } from "date-fns";
import { fr as dateFR } from "date-fns/locale";
import i18n, { InitOptions, TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import { setLocale } from "yup";

import fr from "./langs/fr.json";
import en from "./langs/en.json";

export const config: InitOptions = {
  resources: {
    fr: {
      translation: fr,
    },
    en: {
      translation: en,
    },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    format(value, format) {
      if (format === "uppercase") {
        return value.toUpperCase();
      }
      if (value instanceof Date) {
        const locale = { fr: dateFR }[i18n.language];

        return formatDate(value, format ?? "", locale ? { locale } : undefined);
      }
      return value;
    },
    escapeValue: false,
  },
};

const buildYupMessages = (_: null, t: TFunction) => {
  // add translated error messages as you need
  // must follow the yup shape : https://github.com/jquense/yup/blob/master/src/locale.ts
  const yupErrorMessages = {
    array: {
      max: ({ max }: { max: number }) =>
        t("form.errors.array.max", { count: max }),
    },
    string: {
      min: ({ min }: { min: number }) =>
        t("form.errors.string.min", { count: min }),
      max: ({ max }: { max: number }) =>
        t("form.errors.string.tooLong", { count: max }),
      email: () => t("form.errors.string.email"),
      url: () => t("form.errors.string.url"),
      length: ({ length }: { length: number }) =>
        t("form.errors.string.exactLength", { count: length }),
      required: () => t("form.errors.string.required"),
    },
    mixed: {
      required: () => t("form.errors.required"),
    },
  };

  setLocale(yupErrorMessages);
};

i18n.use(initReactI18next).init(config, buildYupMessages);

// update html lang attribute
if (typeof window !== "undefined") {
  i18n.on("languageChanged", (lang) => {
    window.document.documentElement.setAttribute("lang", lang);
    buildYupMessages(null, i18n.t.bind(i18n));
  });
}

export const supportedLocales = [
  { locale: "fr", name: "Français" },
  { locale: "en", name: "English" },
];

export default i18n;
