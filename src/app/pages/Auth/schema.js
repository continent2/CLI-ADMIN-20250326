import * as Yup from 'yup'

export const schema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required("사용자 이름은 필수 항목입니다"),
    password: Yup.string().trim()
        .required("비밀번호는 필수 항목입니다")
})