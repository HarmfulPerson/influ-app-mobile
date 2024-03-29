export const nullAllKeys = <T extends Record<string, any>>(obj: T): T => {
    const returnedNulledObject = { ...obj };
    for (const key in returnedNulledObject) {
        if (Object.prototype.hasOwnProperty.call(returnedNulledObject, key)) {
            returnedNulledObject[key as keyof T] = null as T[keyof T]; // Type assertion
        }
    }

    return returnedNulledObject;
};
