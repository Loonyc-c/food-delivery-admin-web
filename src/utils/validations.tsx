export const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Мэйл хаягаа оруулна уу !";
    } else if (!emailRegex.test(email)) {
        return "Зөв мэйл хаяг оруулна уу !";
    }

    return "";
};
