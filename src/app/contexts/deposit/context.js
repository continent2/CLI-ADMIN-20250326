import { createSafeContext } from "utils/createSafeContext";

export const [DepositContext, useDepositContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
