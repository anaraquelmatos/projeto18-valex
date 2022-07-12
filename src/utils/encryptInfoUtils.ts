import Cryptr from "cryptr";

export async function encryptInformation(info: string) {
    const infoCard = new Cryptr(process.env.KEY);
    const infoCardEncrypted = infoCard.encrypt(info);
    return {
        infoCardEncrypted
    };
}