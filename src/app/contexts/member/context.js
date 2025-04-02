import { createSafeContext } from "utils/createSafeContext";

export const [MemberContext, useMemberContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
