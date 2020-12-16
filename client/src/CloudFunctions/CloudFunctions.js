import {func} from "../consts/firebase"

export const SetAccountViewer               = func.httpsCallable('SetAccountViewer');

export const SetAccountUser                 = func.httpsCallable('SetAccountUser');

export const SetAccountOwner                = func.httpsCallable('SetAccountOwner');

export const SetAccountSuper                = func.httpsCallable('SetAccountSuper');

//takes and email
export const CreateOrFetchMangedAccount     = func.httpsCallable('CreateOrFetchMangedAccount');

//takes uid and accountType
export const SetManagedAccountClaims        = func.httpsCallable('SetManagedAccountClaims');

export const DeleteMangedAccount            = func.httpsCallable('DeleteMangedAccount');

export const FetchLiveDeviceData            = func.httpsCallable('FetchLiveDeviceData');

export const getAuthContext                 = func.httpsCallable('getAuthContext');

