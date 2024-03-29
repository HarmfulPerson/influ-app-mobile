export const isErrorYupType = (error: any) =>
    typeof error === "object" && error !== null && "inner" in error;
