import * as Yup from "yup";

export const schema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("사용자 이름을 입력해주세요")
    .min(8, "사용자 이름은 최소 8자 이상이어야 합니다")
    .max(20, "사용자 이름은 최대 20자 이하여야 합니다"),

  pwd: Yup.string()
    .trim()
    .required("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(20, "비밀번호는 최대 20자 이하여야 합니다")
    .matches(/\d/, "비밀번호에는 숫자가 최소 1개 포함되어야 합니다")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "비밀번호에는 특수문자가 최소 1개 포함되어야 합니다",
    ),

  socialId: Yup.string()
    .trim()
    .matches(
      /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
      "https://t.me/ 형식으로 입력해주세요",
    )
    .required("소셜 ID를 입력해주세요"),

  socialGroupId: Yup.string()
    .trim()
    .matches(
      /^https:\/\/t\.me\/\+[a-zA-Z0-9]+$/,
      "https://t.me/+ 형식으로 입력해주세요",
    ),

  phoneCountryCode: Yup.string(),

  phoneNationalNumber: Yup.string()
    .required("전화번호를 입력해주세요")
    .matches(/^[0-9]+$/, "숫자만 입력해주세요"),

  email: Yup.string()
    .trim()
    .required("이메일을 입력해주세요")
    .email("유효한 이메일 형식을 입력해주세요"),
});
