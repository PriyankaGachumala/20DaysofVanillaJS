const currencyElement_1 = document.getElementById('currency-1');
const currencyElement_2 = document.getElementById('currency-2');
const amountElement_1 = document.getElementById('amount-1');
const amountElement_2 = document.getElementById('amount-2');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

//functions

//API call and updating DOM
function calculate(){
    const currency1 = currencyElement_1.value;
    const currency2 = currencyElement_2.value;
    let amount1 = amountElement_1.value;
    let amount2 = amountElement_2.value;

    fetch(`https://v6.exchangerate-api.com/v6/c6976263427a0e42cdc128ca/latest/${currency1}`)
     .then(res=> res.json())
     .then(data=>{
         const rate = data.conversion_rates[currency2];
        rateElement.innerHTML = `1 ${currency1} = ${rate} ${currency2}`;
        amount2 = amount1 * rate
        amountElement_2.value = amount2; 
     })
}

//event listeners
currencyElement_1.addEventListener('change',calculate);
amountElement_1.addEventListener('input',calculate);
currencyElement_2.addEventListener('change',calculate);
amountElement_2.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
    const tempStorage = currencyElement_1.value;
    currencyElement_1.value = currencyElement_2.value;
    currencyElement_2.value = tempStorage;
    calculate();
});
calculate();