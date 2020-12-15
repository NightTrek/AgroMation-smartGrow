import {func} from "../consts/firebase"

export const SetAccountOwner = func.httpsCallable('SetAccountOwner');

export const getAuthContext = func.httpsCallable('getAuthContext');