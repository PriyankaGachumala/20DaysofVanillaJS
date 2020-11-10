const main = document.getElementById('main');
const adduser = document.getElementById('addUser');
const doublemoney = document.getElementById('doubleMoney');
const showrichest = document.getElementById('showRichest');
const sort = document.getElementById('sort');
const calculatewealth = document.getElementById('calculateWealth');

let userData = [];
addRandomUser();
addRandomUser();
//fuctions

async function addRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()* 10000000)
    }
    addData(newUser);
}

//function to double money
function doubleMoney(){
    userData = userData.map(user=>{
        return { ...user, money: user.money*2};
    });
    updateDOM();
}

//function to sort array 
/*https://stackoverflow.com/questions/9831330/how-does-the-javascript-sort-function-workas-an-algorithm 
-- to understand how the function(a,b) works.*/
function sortArray(){
    userData.sort((a,b)=> b.money - a.money);
    updateDOM();
}

//function to show millionaries
function showMillionaries(){
    userData = userData.filter(user=> user.money >1000000)
    updateDOM();
}

//function to add total wealth
function showTotal(){
    const total = userData.reduce((acc,user)=> (acc += user.money),0)
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3><strong>Total Wealth</strong>${formatMoney(total)} </h3>`;
    main.appendChild(wealthEl);
}

function addData(dataObj){
    userData.push(dataObj);
    updateDOM();
}

function updateDOM(data = userData){
    //clear DOM
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    data.forEach(user=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

//formatting number to money
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number){
    return 'CAD ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 


//event listeners
adduser.addEventListener('click',addRandomUser)
doublemoney.addEventListener('click',doubleMoney);
showrichest.addEventListener('click',showMillionaries);
sort.addEventListener('click',sortArray);
calculatewealth.addEventListener('click',showTotal);


