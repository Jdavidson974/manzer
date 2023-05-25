import { BehaviorSubject } from "rxjs";

export class DataState<T> {

    constructor(initialValue: T | null) {
        this._initialValue = initialValue;
    }
    private _initialValue!: T | null;

    private _value$ = new BehaviorSubject<T | null>(this._initialValue);
    public get value$() {
        return this._value$.asObservable();
    }
    public setValue$(value: T | null) {
        this._value$.next(value);
    }

    private _hasError$ = new BehaviorSubject<boolean>(false);
    public get hasError$() {
        return this._hasError$.asObservable();
    }
    public setHasError$(value: boolean) {
        this._hasError$.next(value);
    }

    private _isLoading$ = new BehaviorSubject<boolean>(false);
    public get isLoading$() {
        return this._isLoading$.asObservable();
    }
    public setIsLoading$(value: boolean) {
        this._isLoading$.next(value);
    }

    private _msgError$ = new BehaviorSubject<string>("Il y a une erreur");
    public get msgError$() {
        return this._msgError$.asObservable();
    }
    public setMsgError$(value: string) {
        this._msgError$.next(value);
    }
}
