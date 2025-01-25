import { router } from "expo-router";
import { DEBOUNCE_DELAY } from "../constants/Main";
import { format, isToday, isThisYear } from "date-fns";
import { pl } from "date-fns/locale";
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

export const navigateBack = () => {
    if (router.canGoBack()) router.back();
};

export function debounce(
    func: (...args: any[]) => void,
    wait: number = DEBOUNCE_DELAY
) {
    let timeout: NodeJS.Timeout | null;
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export const returnChatTime = (date: Date): string => {
    if (isToday(date)) {
        // Jeśli data jest dzisiejsza, zwróć tylko godzinę i minutę
        return format(date, "HH:mm", { locale: pl });
    } else if (isThisYear(date)) {
        // Jeśli data jest z bieżącego roku, zwróć miesiąc, dzień, godzinę i minutę
        return format(date, "dd.MM HH:mm", { locale: pl });
    } else {
        // Jeśli data nie jest z bieżącego roku, dodaj rok
        return format(date, "dd.MM.yyyy HH:mm", { locale: pl });
    }
};
