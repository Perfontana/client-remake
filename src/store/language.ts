import { action, computed, makeObservable, observable } from "mobx";
import { Language, supportedLanguages, translations } from "../utils/languages";

class LanguageStore {
  currentLanguage: Language = Language.ENGLISH;

  constructor() {
    makeObservable(this, {
      currentLanguage: observable,
      ui: computed,
      changeLanguage: action,
      useDefaultLanguage: action,
    });
    this.useDefaultLanguage();
  }

  useDefaultLanguage() {
    const defaultLanguage = navigator.language
      .split("-")[0]
      .toLowerCase() as Language;

    if (supportedLanguages.includes(defaultLanguage))
      this.currentLanguage = defaultLanguage;
  }

  changeLanguage(newLanguage: Language) {
    this.currentLanguage = newLanguage;
  }

  get ui() {
    return translations[this.currentLanguage];
  }
}

export const language = new LanguageStore();
