
export const randomVerifyCode: () => string = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const formattedNumber = randomNumber.toString().padStart(6, '0');
    return formattedNumber;
}