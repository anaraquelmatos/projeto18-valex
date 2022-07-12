import Cryptr from "cryptr";

export async function decryptInformationCard(info: string) {
    const informationCard = new Cryptr(process.env.KEY);
    const decryptInformationCard = informationCard.decrypt(info);
    return {
        decryptInformationCard
    };
}
