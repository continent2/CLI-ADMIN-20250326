import * as Yup from 'yup';

export const schema = Yup.object().shape({
    amountField: Yup.string(),
    isWithdrawal: Yup.string(),
    isCrypto: Yup.number()
        .oneOf([0, 1]),
    amount: Yup.string(),
    bankAddress: Yup.string(),
    address: Yup.string()
        .trim()
        .when('isCrypto', {
            is: 0,
            then: (schema) => schema.required('주소를 입력해주세요'),
            otherwise: (schema) => schema.notRequired(),
        }),
    bankName: Yup.string(),

    bankAccount: Yup.string()
        .when('isCrypto', {
            is: 1,
            then: (schema) =>
                schema
                    .required('계좌번호를 입력해주세요')
                    .matches(/^[0-9-]+$/, '숫자와 하이픈(-)만 입력 가능합니다'),
            otherwise: (schema) => schema.notRequired(),
        }),
    quoteSignature: Yup.string(),
});
