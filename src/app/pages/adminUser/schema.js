import * as Yup from 'yup';

export const schema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required('사용자 이름을 입력해주세요'),

    pwd: Yup.string()
        .trim()
        .required('비밀번호를 입력해주세요'),

    socialId: Yup.string()
        .trim()
        .required('소셜 ID를 입력해주세요'),

    socialGroupId: Yup.string().trim(), // Optional as per your note

    phoneCountryCode: Yup.string()
        .trim()
        .required('국가 코드를 입력해주세요')
        .oneOf(['+82'], '국가 코드는 +82여야 합니다'),

    phoneNationalNumber: Yup.string()
        .trim()
        .required('전화번호를 입력해주세요'),

    email: Yup.string()
        .trim()
        .required('이메일을 입력해주세요')
        .email('유효한 이메일 형식을 입력해주세요')
});
