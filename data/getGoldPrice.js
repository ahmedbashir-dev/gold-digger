let basePrice = 2850;

export async function getGoldPrice(min=2780, max = 2950){
    await new Promise(resolve => setTimeout(resolve, 1000));
    const change = Math.random() < 0.5 ? -20 : 20;
    basePrice += change;
    basePrice = Math.max(min, Math.min(max, basePrice));
    return basePrice;
}