import * as yup from "yup";

export const isErrorYupType = (error: any) =>
    typeof error === "object" && error !== null && "inner" in error;

export const validate = async <T>(
    schema: yup.ObjectSchema<Partial<T>>,
    schemaData: T
) => {
    try {
        await schema.validate(schemaData, { abortEarly: false });

        return {};
    } catch (validationErrors: any) {
        const formattedErrors: Record<any, any> = {};
        validationErrors.inner.forEach((error: yup.ValidationError) => {
            formattedErrors[error.path as keyof typeof formattedErrors] =
                error.message;
        });

        return formattedErrors;
    }
};
