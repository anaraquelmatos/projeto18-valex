import dayjs from "dayjs";

export async function expirationCard(expirationDate: String) {

    const DATE_TODAY = dayjs().format('MM/YY');

    if (expirationDate < DATE_TODAY){
        throw {
            type: "unauthorized",
            message: "expired expiration date!"
        }
    }

}