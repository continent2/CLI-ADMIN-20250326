import { createSafeContext } from "utils/createSafeContext";

export const [AppDataContext, useAppDataContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
