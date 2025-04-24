import { Link } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Local Imports
import { Button, Card, Checkbox, Input, InputErrorMsg } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import appLogo from "../../../assets/appIcon.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "hooks";

// ----------------------------------------------------------------------

export default function SignIn() {
  const { login, errorMessage } = useAuthContext();
  const [show, { toggle }] = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "elegantBanana",
      password: "TEST@1234",
    },
  });

  const onSubmit = (data) => {
    login({
      username: data.username,
      password: data.password,
    });
  };

  // Clear local storage
  // localStorage.clear();
  // sessionStorage.clear();

  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <img
              src={appLogo}
              alt="app_logo"
              className="mx-auto size-40 rounded-[50%]"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                TETHER24
              </h2>
              <p className="text-gray-400 dark:text-dark-300">로그인하세요</p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="사용자명" //Username
                  placeholder="사용자 이름을 입력하세요" //Enter Username
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("username")}
                  error={errors?.username?.message}
                />
                <Input
                  label="비밀번호" //Password
                  placeholder="비밀번호 입력" //Enter Password
                  type={show ? "text" : "password"}
                  prefix={
                    <LockClosedIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  suffix={
                    <Button
                      variant="flat"
                      className="pointer-events-auto size-6 shrink-0 rounded-full p-0"
                      onClick={toggle}
                    >
                      {show ? (
                        <EyeSlashIcon className="size-4.5 text-gray-500 dark:text-dark-200" />
                      ) : (
                        <EyeIcon className="size-4.5 text-gray-500 dark:text-dark-200" />
                      )}
                    </Button>
                  }
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>

              <div className="mt-2">
                <InputErrorMsg
                  when={errorMessage && errorMessage?.message !== ""}
                >
                  {errorMessage?.message}
                </InputErrorMsg>
              </div>

              <div className="mt-4 flex items-center justify-between space-x-2">
                <Checkbox label="이 기기 기억하기" />
                <a
                  href="##"
                  className="text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800 dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100"
                  style={{ visibility: "hidden" }}
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="mt-5 w-full" color="primary">
                로그인 {/*Sign in*/}
              </Button>
            </form>
            <div className="mt-4 text-center text-xs+">
              <p className="line-clamp-1">
                {/* <span>가입 문의하기</span>{" "}*/}
                <Link
                  target="_blank"
                  className="text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                  to="https://t.me/+qX8-mKgD6vw5ZmRl"
                >
                  가입 문의하기
                </Link>
              </p>
            </div>
          </Card>
          <div className="mt-8 flex justify-center text-xs text-gray-400 dark:text-dark-300">
            <a href="##">VER.2025-04-23 01:12</a>
            <div className="mx-2.5 my-0.5 w-px bg-gray-200 dark:bg-dark-500"></div>
            <a href="##">이용약관</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
