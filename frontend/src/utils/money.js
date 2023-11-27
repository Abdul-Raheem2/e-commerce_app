const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
});

export default function moneyFormatter(amount){
    return formatter.format(amount/100); //convert pennies to pounds
}