import {func} from "../consts/firebase"

export const SetAccountViewer               = func.httpsCallable('SetAccountViewer');

export const SetAccountUser                 = func.httpsCallable('SetAccountUser');

export const SetAccountOwner                = func.httpsCallable('SetAccountOwner');

export const SetAccountSuper                = func.httpsCallable('SetAccountSuper');

//takes and email returns uid
export const FetchUidByEmail                = func.httpsCallable('FetchUidByEmail');

//takes and email returns uid
export const CreateMangedAccount            = func.httpsCallable('CreateMangedAccount');

//takes uid and accountType and updates the claims
export const SetManagedAccountClaims        = func.httpsCallable('SetManagedAccountClaims');

//takes uid and an email. deletes the account does not delete the records in firestore
export const DeleteMangedAccount            = func.httpsCallable('DeleteMangedAccount');

export const FetchLiveDeviceData            = func.httpsCallable('FetchLiveDeviceData');

//returns the current users context.auth objects which includes the auth claims
export const getAuthContext                 = func.httpsCallable('getAuthContext');

