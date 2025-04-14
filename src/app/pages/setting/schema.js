import { validate } from "multicoin-address-validator";
import * as Yup from "yup";

export const userUpdateSchema = Yup.object().shape({
  existingPassword: Yup.string()
    .transform((value) => value.trim())
    .required("비밀번호를 입력하세요."),

  newPassword: Yup.string()
    .transform((value) => value.trim())
    .required("새 비밀번호를 입력하세요.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(/\d/, "숫자를 최소 1개 포함해야 합니다.") // At least one number
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "특수문자를 최소 1개 포함해야 합니다.") // At least one symbol
    .matches(/^\S*$/, "공백을 포함할 수 없습니다."), // No whitespace allowed

  confirmPassword: Yup.string()
    .transform((value) => value.trim())
    .required("비밀번호 확인을 입력하세요.")
    .oneOf([Yup.ref("newPassword"), null], "비밀번호가 일치하지 않습니다."),
});

export const bankSchema = Yup.object().shape({
  bankName: Yup.string(),
  bankAccount: Yup.string()
    .trim()
    .min(11, "계좌번호는 11자 이상이어야 합니다")
    .matches(/^\d+$/, "숫자만 입력해주세요"),
});

export const addressSchema = Yup.object().shape({
  address: Yup.string()
    .trim()
    .required("주소가 필요합니다")
    .test("is-valid-tron-address", "유효하지 않은 주소입니다", (value) =>
      validate(value, "tron"),
    ),
});
