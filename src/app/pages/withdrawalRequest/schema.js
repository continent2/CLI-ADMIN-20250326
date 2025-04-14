import * as Yup from "yup";

export const schema = Yup.object().shape({
  amountFrom: Yup.string().required("보내는 금액을 입력해주세요"),

  currencyFrom: Yup.string().required("보내는 통화를 선택해주세요"),

  amountTo: Yup.string().required("받는 금액을 입력해주세요"),

  currencyTo: Yup.string().required("받는 통화를 선택해주세요"),

  bankName: Yup.string().trim().required("은행명을 입력해주세요"),

  bankAccount: Yup.string().trim().required("계좌번호를 입력해주세요"),

  isCrypto: Yup.boolean(), // optional

  address: Yup.string().trim().required("주소를 입력해주세요"),

  netType: Yup.string().trim().required("네트워크 유형을 입력해주세요"),

  quoteSignature: Yup.string().trim().required("서명 값을 입력해주세요"),
});
