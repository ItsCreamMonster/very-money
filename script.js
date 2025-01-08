const spinHalfBtn = document.getElementById('spinHalfBtn');
const spinQuarterBtn = document.getElementById('spinQuarterBtn');
const spinTenthBtn = document.getElementById('spinTenthBtn');
const spinAllBtn = document.getElementById('spinAllBtn');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const balanceDisplay = document.getElementById('balanceDisplay');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutPopup = document.querySelector('.checkoutPopup');

let balance = 0;
let totalWin = 0;
let totalLoss = 0;


function randint(max) {
    return Math.floor(Math.random() * max);
};

function roundMoney(amount) {
    return Math.round(amount * 100) / 100;
};


// Disclaimer about the trustworthyness of the virtual gambling machine.
console.warn('%cDisclaimer: %c\n\nRemember that this is just a virtual game with no relation to real money and should not be taken seriously. \nYou can use generated data however you want but keep in mind that this is not revised and made to work as a real slot machine. \n\nFor information about real slot machines, check out Wikipedia or another reliable source.', 'font-weight: 900;', 'font-weight: 400;');


// Debug

let spinInterval
function debugSpinThousand(proportion) {
    spinInterval = setInterval(function() { spin(proportion) }, 50);

    setTimeout(() => clearInterval(spinInterval), 50000);
    setTimeout(() => console.log(csv), 50000);
};

let csv = 'balance,change,amount,reels';

function updateCSV(balance, change, amount, reels) {
    csv += `\n${balance},${change},${amount},${reels}`;
};


// Cookie loading. Doesn't work when running locally.

const cookieBalance = document.cookie
    .split("; ")
    .find((row) => row.startsWith("balance="))
    ?.split("=")[1];

if (!cookieBalance) {
    console.error('Unable to load balance from cookies.');
    freshStart();
} else if (cookieBalance <= 0) {
    freshStart();
};

if (cookieBalance) {
    setBalance(cookieBalance, 'set');
};

allOrNothingCheck();


// Spinning

function spin(proportion) {
    if (document.getElementById('startPrompt')) { document.getElementById('startPrompt').remove() };

    spinDisplayAnim();

    // bet = balance / proportion;

    spinHalfBtn.disabled = true;
    spinQuarterBtn.disabled = true;
    spinTenthBtn.disabled = true;
    spinAllBtn.style.opacity = 0;
    spinAllBtn.disabled = true;
    setTimeout(function() {
        let reels = [randint(9), randint(9), randint(9)];

        num1.innerText = reels[0];
        num2.innerText = reels[1];
        num3.innerText = reels[2];

        if (reels[0] == 7) { num1.classList.add('lucky') } else { num1.classList.remove('lucky') };
        if (reels[1] == 7) { num2.classList.add('lucky') } else { num2.classList.remove('lucky') };
        if (reels[2] == 7) { num3.classList.add('lucky') } else { num3.classList.remove('lucky') };

        console.log(reels[0], reels[1], reels[2]);
        payout(reels[0], reels[1], reels[2], proportion);
        
        spinHalfBtn.disabled = false;
        spinQuarterBtn.disabled = false;
        spinTenthBtn.disabled = false;
    }, 5400);
};

function spinDisplay() {
    let reels = [randint(9), randint(9), randint(9)];

    num1.innerText = reels[0];
    if (reels[0] == 7) { num1.classList.add('lucky') } else { num1.classList.remove('lucky') };
    num2.innerText = reels[1];
    if (reels[1] == 7) { num2.classList.add('lucky') } else { num2.classList.remove('lucky') };
    num3.innerText = reels[2];
    if (reels[2] == 7) { num3.classList.add('lucky') } else { num3.classList.remove('lucky') };
};

function spinDisplayAnim() {
    // for (let i = 0; i < 35; i++) {
    //     setTimeout(spinDisplay, (50 * i) * (i / 12.5));
    // };

    setTimeout(spinDisplay, 50);
    setTimeout(spinDisplay, 100);
    setTimeout(spinDisplay, 150);
    setTimeout(spinDisplay, 200);
    setTimeout(spinDisplay, 250);
    setTimeout(spinDisplay, 300);
    setTimeout(spinDisplay, 350);
    setTimeout(spinDisplay, 400);
    setTimeout(spinDisplay, 450);
    setTimeout(spinDisplay, 500);
    setTimeout(spinDisplay, 550);
    setTimeout(spinDisplay, 600);
    setTimeout(spinDisplay, 650);
    setTimeout(spinDisplay, 700);
    setTimeout(spinDisplay, 750);
    setTimeout(spinDisplay, 800);
    setTimeout(spinDisplay, 850);
    setTimeout(spinDisplay, 900);
    setTimeout(spinDisplay, 950);
    setTimeout(spinDisplay, 1000);
    setTimeout(spinDisplay, 1075);
    setTimeout(spinDisplay, 1125);
    setTimeout(spinDisplay, 1200);
    setTimeout(spinDisplay, 1300);
    setTimeout(spinDisplay, 1400);
    setTimeout(spinDisplay, 1550);
    setTimeout(spinDisplay, 1700);
    setTimeout(spinDisplay, 1850);
    setTimeout(spinDisplay, 2000);
    setTimeout(spinDisplay, 2200);
    setTimeout(spinDisplay, 2400);
    setTimeout(spinDisplay, 2600);
    setTimeout(spinDisplay, 3000);
    setTimeout(spinDisplay, 3400);
    setTimeout(spinDisplay, 3800);
    setTimeout(spinDisplay, 4600);
};

spinHalfBtn.addEventListener('click', function() { spin(2) });
spinQuarterBtn.addEventListener('click', function() { spin(4) });
spinTenthBtn.addEventListener('click', function() { spin(10) });

spinAllBtn.addEventListener('click', function() { spin(1) });


// Money

function freshStart() {
    setBalance(250, 'set');

    spinHalfBtn.disabled = false;
    spinQuarterBtn.disabled = false;
    spinTenthBtn.disabled = false;
    
    checkoutPopup.close();

    updateBalanceDisplay();
};

function endGame() {
    clearInterval(spinInterval);
    console.log(`%cThe game ended due to insufficient funds. ($${balance})`, 'color: #ff0000');
    // alert(`The game ended due to insufficient funds. ($${balance})`);

    checkout();
};

const restartBtn = document.getElementById('restartBtn');
const exportCSVBtn = document.getElementById('exportCSVBtn');
const checkoutBalance = document.getElementById('checkoutBalance');

function checkout() {
    clearInterval(spinInterval);

    spinHalfBtn.disabled = true;
    spinQuarterBtn.disabled = true;
    spinTenthBtn.disabled = true;
    spinAllBtn.style.opacity = 0;
    spinAllBtn.disabled = true;

    // The CSV export only contains data from the current session,
    // meaning that if a game is played and the user reloads the 
    // page, only the latest data will be captured in the export.
    exportCSVBtn.href = 'data:attachment/text,' + encodeURI(csv);
    exportCSVBtn.target = '_blank';
    exportCSVBtn.download = 'export.csv';

    checkoutBalance.innerText = `$${balance}`;
    document.getElementById('checkoutTotalWin').innerText = `+$${roundMoney(totalWin)}`;
    document.getElementById('checkoutTotalLoss').innerText = `-$${roundMoney(totalLoss)}`;

    if (balance > 100) {
        checkoutBalance.classList.remove('mediumBalance');
        checkoutBalance.classList.remove('lowBalance');
    } else if (balance <= 100 && balance > 50) {
        checkoutBalance.classList.add('mediumBalance');
        checkoutBalance.classList.remove('lowBalance');
    } else if (balance <= 50) {
        checkoutBalance.classList.remove('mediumBalance');
        checkoutBalance.classList.add('lowBalance');
    };

    checkoutPopup.showModal();
};

restartBtn.addEventListener('click', freshStart);
checkoutBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to check out? 99% of people who gamble stop right before they WIN BIG.') == true) {
        checkout();
    };
});

function updateBalanceDisplay() {
    balanceDisplay.innerText = `$${roundMoney(balance)}`;
    if (balance > 100) {
        balanceDisplay.classList.remove('mediumBalance');
        balanceDisplay.classList.remove('lowBalance');
    } else if (balance <= 100 && balance > 50) {
        balanceDisplay.classList.add('mediumBalance');
        balanceDisplay.classList.remove('lowBalance');
    } else if (balance <= 50) {
        balanceDisplay.classList.remove('mediumBalance');
        balanceDisplay.classList.add('lowBalance');
    };

    spinHalfBtn.innerText = `$${roundMoney(balance / 2)}`;
    spinQuarterBtn.innerText = `$${roundMoney(balance / 4)}`;
    spinTenthBtn.innerText = `$${roundMoney(balance / 10)}`;
};

function setBalance(value, type, isPayout = false) {
    switch (type) {
        case 'add':
            balance += value;
            break;
        case 'subtract':
            balance -= value;
            break;
        case 'multiply':
            balance = balance * value;
            break;
        case 'divide':
            balance = balance / value;
            break;
        case 'set':
            balance = value;
            break;
    };

    balance = roundMoney(balance);
    if (!isPayout) {
        updateCSV(balance, '', '', '');
    };
    document.cookie = `balance=${roundMoney(balance)}`;
    updateBalanceDisplay();
    allOrNothingCheck();
};

function payout(reel1, reel2, reel3, proportion) {
    let outcome

    if (reel1 == 7 && reel2 == 7 && reel3 == 7) {
        outcome = 'jackpot';
    } else if (reel1 == reel2 && reel2 == reel3) {
        outcome = 'AAA';
    } else if (reel1 == reel2) {
        outcome = 'AAB';
    } else if (reel2 == reel3) {
        outcome = 'AAB';
    } else {
        outcome = 'loss'
    };

    let bet = balance / proportion;
    let amount = 0;
    switch (outcome) {
        case 'jackpot':
            amount = bet * 100;
            console.log(`%cJ%ca%cc%ck%cp%co%ct%c! %c(+$${roundMoney(amount)})`, 'color: #ff0000', 'color: #ffa500', 'color: #ffff00', 'color: #00ff00', 'color: #00ffff', 'color: #0000ff', 'color: #a020f0', 'color: #ffffff', 'color: #00ff00');
            break;
        case 'AAA':
            amount = bet * 25;
            console.log(`%cAAA pattern. (+$${roundMoney(amount)})`, 'color: #00ff00');
            break;
        case 'AAB':
            amount = bet * 3;
            console.log(`%cAAB pattern. (+$${roundMoney(amount)})`, 'color: #00ff00');
            break;
        case 'loss':
            amount = 0;
            console.log(`%cLoss. (-$${bet})`, 'color: #ff0000');
            setBalance(bet, 'subtract');
            break;
    };

    setBalance(roundMoney(amount), 'add', true);

    let change;
    if (outcome == 'loss') {
        totalLoss += roundMoney(bet);
        change = 'negative';
        updateCSV(balance, change, bet, [reel1, reel2, reel3].toString().replace(',', '').replace(',', ''));
    } else {
        totalWin += roundMoney(amount);
        change = 'positive';
        updateCSV(balance, change, amount, [reel1, reel2, reel3].toString().replace(',', '').replace(',', ''));
    };

    if (balance <= 10) {
        clearInterval(spinInterval);
        setTimeout(() => endGame(), 10);
    };
};

function allOrNothingCheck() {
    if (balance <= 50) {
        spinAllBtn.disabled = false;
        spinAllBtn.style.opacity = 1;
    } else {
        spinAllBtn.style.opacity = 0;
        spinAllBtn.disabled = true;
    };
};


// Resetting

const resetBtn = document.getElementById('resetBtn');

function reset() {
    let confirmation = confirm('Are you sure you want to reset? This will remove all progress.');
    
    if (confirmation == true) {
        freshStart();
        location.reload();
    };
};

resetBtn.addEventListener('click', reset);