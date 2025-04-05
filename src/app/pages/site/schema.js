import * as Yup from "yup";

export const schema = Yup.object().shape({
    siteUrl: Yup.string()
        .trim()
        .matches(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
            "유효한 URL을 입력하세요"
        )
        .required("사이트 URL이 필요합니다"),
    SocialGroupId : Yup.string()
        .trim(),
    managerSocialId : Yup.string()
        .trim(),
    isCrypto : Yup.string()
        .trim(),
    isReceiveAgencyOrSite: Yup.string()
        .trim(),
    bankName: Yup.string()
        .trim()
        .nullable()
        .transform((value) => (typeof value === "string" ? value.trim() : value))
        .required("이 필드는 필수입니다")
        .min(1, "이 필드는 필수입니다"),
    bankAccount: Yup.string()
        .trim()
        .required("계좌번호를 입력해주세요"),

    address: Yup.string()
        .trim()
        .required("주소가 필요합니다"),
});