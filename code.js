const charRange=document.getElementById("charRange");
const charAmount=document.getElementById("charAmount");
charRange.addEventListener('input',syncChar);
charAmount.addEventListener('input',syncChar);
function syncChar(e) {
    const value=e.target.value;
    charAmount.value=value;
    charRange.value=value;
}
const uCheck=document.getElementById("uCheck");
const sCheck=document.getElementById("sCheck");
const nCheck=document.getElementById("nCheck");
const form=document.querySelector(".form");
const gPassword = document.getElementById("passwordField");
const copyButton = document.getElementById("copyButton");

form.addEventListener('submit',e=>{
    e.preventDefault();
    const cAR=charAmount.value;
    const iUpper=uCheck.checked;
    const iNumber=nCheck.checked;
    const iSymbols=sCheck.checked;
    const password=generatePassword(cAR,iUpper,iNumber,iSymbols);
    gPassword.value = password;
});
const copy=document.querySelector(".copy");
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(gPassword.value);
    copy.classList.add('active');
    setTimeout(() => {
        copy.classList.remove('active');
    }, 1000);
});
const arrayFromLowToHigh = (low, high) => {
    const array = [];
    for (let i = low; i <= high; i++) {
    array.push(i);
    }
    return array;
};
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = [
    ...arrayFromLowToHigh(33, 47),
    ...arrayFromLowToHigh(58, 64),
    ...arrayFromLowToHigh(91, 96),
    ...arrayFromLowToHigh(123, 126)
];
function generatePassword(cAR, iUpper, iNumber, iSymbols) {
    let charCodes = [...LOWERCASE_CHAR_CODES];
    if (iUpper) {
        charCodes = [...charCodes, ...UPPERCASE_CHAR_CODES];
    }
    if (iNumber) {
        charCodes = [...charCodes, ...NUMBER_CHAR_CODES];
    }
    if (iSymbols) {
        charCodes = [...charCodes, ...SYMBOL_CHAR_CODES];
    }
    const result = [];
    for (let i = 0; i < cAR; i++) {
        const char = charCodes[Math.floor(Math.random() * charCodes.length)];
        result.push(String.fromCharCode(char));
    }   
    return result.join('');
}
