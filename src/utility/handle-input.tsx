import React from 'react'

export interface InputValue {
    label: string
    value: string
    error: string | null
}


export type InputEvent = React.ChangeEvent<HTMLInputElement>

export type InputDispatch = React.Dispatch<React.SetStateAction<string>>

export type InputValueDispatch = React.Dispatch<React.SetStateAction<InputValue>>

export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
export type Argument = Value | Mapping | Argument[];

const classNames = (...args: Argument[]) => {
    return ""
}
classNames("", {"aaaaa": true})

export const handleInput = (dispatch: InputDispatch) => (event: InputEvent) => dispatch(event.target.value)

export const handleInputValue = (dispatch: InputValueDispatch) => (event: InputEvent) => dispatch((val) => ({
    ...val,
    value: event.target.value
}))

export const resetInputValue = (val: InputValue): InputValue => ({
    ...val,
    value: "",
    error: null
})

export class InputValidateRule {
}

export class RequiredValidateRule extends InputValidateRule {
}

export class EmailValidateRule extends InputValidateRule {
}

export class SizeValidateRule extends InputValidateRule {
    constructor(public min: number = 0, public max: number = Number.MAX_VALUE) {
        super();
    }
}

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const inputValueValidate = (value: InputValue,
                                   dispatch: InputValueDispatch,
                                   rule: (InputValidateRule | string)[] = []) => {

    let error = ""
    if (rule.includes("required") && !!(!!value.value)) {
        error = `${value.label} belum diisi`
    } else if (rule.includes("email") && !re.test(value.value)) {
        error = `${value.label} format tidak valid`
    }
    dispatch(val => ({
        ...val,
        error: error
    }))
}

type Rule = "min" | "max"

