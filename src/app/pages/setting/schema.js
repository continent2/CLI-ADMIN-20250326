import * as Yup from "yup";

export const userUpdateSchema = Yup.object().shape({
    existingPassword: Yup.string()
        .transform((value) => value.trim()) // Remove spaces
        .required("비밀번호를 입력하세요."), // Case 1: Required field error

    newPassword: Yup.string()
        .transform((value) => value.trim()) // Remove spaces
        .required("새 비밀번호를 입력하세요.") // Case 1: Required field error
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다.") // Case 3: Minimum length requirement
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, "비밀번호는 숫자와 특수 문자를 포함해야 합니다."), // Case 3: Must contain number & special character

    confirmPassword: Yup.string()
        .transform((value) => value.trim()) // Remove spaces
        .required("비밀번호 확인을 입력하세요.") // Case 1: Required field error
        .oneOf([Yup.ref("newPassword"), null], "비밀번호와 비밀번호 확인은 동일해야 합니다.") // Case 2: Must match newPassword
});

export const bankSchema = Yup.object().shape({
    bankName: Yup.string()
        .required('은행명을 입력해주세요'),
    bankAccount: Yup.string()
        .trim()
        .min(11, '계좌번호는 10자 이상이어야 합니다')
        .required('계좌번호를 입력해주세요')
});

export const addressSchema = Yup.object().shape({
    address: Yup.string()
        .trim()
        .required('주소를 입력해주세요')
});


