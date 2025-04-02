import { createSafeContext } from "utils/createSafeContext";

export const [AdminUserContext, useAdminUserContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
