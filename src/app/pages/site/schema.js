import { validate } from "multicoin-address-validator";
import * as Yup from "yup";

export const schema = Yup.object().shape({
  siteUrl: Yup.string()
    .trim()
    .required("사이트 URL이 필요합니다")
    .test(
      "is-valid-url",
      "유효한 URL을 입력하세요 (예: https://example.com)",
      (value) => {
        if (!value) return false;

        // First, use your original regex pattern
        const yourRegex =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (!yourRegex.test(value)) return false;

        // Then add additional safety checks
        try {
          // Ensure it has a protocol
          const urlToCheck = value.includes("://") ? value : `https://${value}`;
          const url = new URL(urlToCheck);

          // Validate protocol
          if (!["http:", "https:"].includes(url.protocol)) return false;

          // Validate hostname
          if (!url.hostname.includes(".")) return false;

          // Basic XSS protection
          if (
            value.includes("<") ||
            value.includes(">") ||
            value.includes('"') ||
            value.includes("'")
          ) {
            return false;
          }

          return true;
        } catch (e) {
          return false;
        }
      },
    ),
  SocialGroupId: Yup.string().trim(),
  managerSocialId: Yup.string().trim(),
  isCrypto: Yup.number().oneOf([0, 1]).nullable(),
  isReceiveAgencyOrSite: Yup.number().oneOf([1, 2]).nullable(),
  bankName: Yup.string()
    .trim()
    .nullable()
    .transform((value) => (typeof value === "string" ? value.trim() : value))
    .required("이 필드는 필수입니다")
    .min(1, "이 필드는 필수입니다"),
  // bankAccount: Yup.string()
  //   .trim()
  //   .required("계좌번호를 입력해주세요")
  //   .matches(/^[0-9]+$/, "숫자만 입력하세요"),
  bankAccount: Yup.string()
    .trim()
    .required("계좌번호를 입력해주세요")
    .matches(/^[0-9]+$/, "숫자만 입력하세요")
    .min(12, "계좌번호는 최소 12자 이상이어야 합니다"),

  address: Yup.string()
    .trim()
    .required("주소가 필요합니다")
    .test("is-valid-tron-address", "유효하지 않은 주소입니다", (value) =>
      validate(value, "tron"),
    ),
});
