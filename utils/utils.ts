export const nullAllKeys = <T extends Record<string, any>>(obj: T): T => {
    const returnedNulledObject = { ...obj };
    for (const key in returnedNulledObject) {
        if (Object.prototype.hasOwnProperty.call(returnedNulledObject, key)) {
            returnedNulledObject[key as keyof T] = null as T[keyof T]; // Type assertion
        }
    }

    return returnedNulledObject;
};

export const parseBooleanStringToBoolean = (string: string) =>
    string === "true" ? true : false;

export const parseObjectToUrlParams = (object: Record<string, string>) =>
    new URLSearchParams(object).toString();
