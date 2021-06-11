
export const isValid = (value: string, pattern = /^((0|([1-9][0-9]*))(\.[0-9]*)?)?$/, flags?: string) => {
    const regex = new RegExp(pattern, flags);
    const result = regex.test(value);
    return result;
}