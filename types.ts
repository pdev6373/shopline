export type TextSizeType = 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 40 | 48;
export type TextWeightType = "400" | "500" | "600" | "700";
export type TextLetterSpacingType = -1 | 0.1 | 0.2 | 0.3 | 0.4;

export type TextType = {
  children: string | JSX.Element;
  size: TextSizeType;
  weight: TextWeightType;
  color: string;
  type: "heading" | "body";
  letterSpacing?: TextLetterSpacingType;
  center?: boolean;
};

export type ErrorType = {
  field: "email" | "fullname" | "password" | "";
  message: string;
};
