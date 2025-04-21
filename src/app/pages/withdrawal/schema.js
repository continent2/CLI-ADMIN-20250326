import { validate } from "multicoin-address-validator";
import * as Yup from "yup";

export const schema = Yup.object().shape({
  // amountField: Yup.string(),
  isCrypto: Yup.number().oneOf([0, 1]),
  amount: Yup.string(),
  // bankAddress: Yup.string().when("isCrypto", {
  //   is: 0,
  //   then: (schema) =>
  //     schema
  //       .trim()
  //       .required("주소가 필요합니다")
  //       .test("is-valid-tron-address", "유효하지 않은 주소입니다", (value) =>
  //         validate(value, "tron")
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  address: Yup.string().when("isCrypto", {
    is: 1,
    then: (schema) =>
      schema
        .trim()
        .required("주소가 필요합니다")
        .test("is-valid-tron-address", "유효하지 않은 주소입니다", (value) =>
          validate(value, "tron")
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  bankName: Yup.string(),

  bankAccount: Yup.string().when("isCrypto", {
    is: 0,
    then: (schema) =>
      schema
        .required("계좌번호를 입력해주세요")
        .matches(/^[0-9-]+$/, "숫자와 하이픈(-)만 입력 가능합니다"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // quoteSignature: Yup.string(),
});
