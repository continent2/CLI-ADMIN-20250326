import { createSafeContext } from "utils/createSafeContext";

export const [WithdrawalDetailsContext, useWithdrawalDetailsContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
