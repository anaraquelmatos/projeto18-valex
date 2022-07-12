export async function countValues(values: any[]) {

    let total: number = null;

    values.map(value => {
        total += value.amount;
    });

    return {
        total
    };
}