import type { SelectOption } from "./components/SelectV2";

export class Language {
  readonly code: string;
  readonly label: string;

  private constructor(code: string, label: string) {
    this.code = code;
    this.label = label;
  }

  toString(): string {
    return this.code;
  }
  //
  static readonly ENGLISH = new Language("en", "English");
  static readonly SPANISH = new Language("es", "Spanish");
  static readonly FRENCH = new Language("fr", "French");
  static readonly CHINESE = new Language("zh", "Chinese");
  static readonly TAMIL = new Language("ta", "Tamil");
  static readonly HINDI = new Language("hi", "Hindi");
}

export const languages = [
  Language.ENGLISH,
  Language.SPANISH,
  Language.FRENCH,
  Language.CHINESE,
  Language.TAMIL,
  Language.HINDI,
].map((l) => {
  return {
    value: l.code,
    label: l.label,
  } as SelectOption;
});
