export function convert(num){
    let digit = parseFloat(num.replace("£", ""));
    return digit;
}