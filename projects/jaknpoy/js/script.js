const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissor = document.querySelector('#scissor');
const myHand = document.querySelector('#myHand');
const opponentHand = document.querySelector('#opponentHand');

const generateNumber = () => Math.floor(Math.random() * 3).toString();
arrayHand = ['rock', 'paper', 'scissor'];

rock.addEventListener('click', () => {
    myHand.src = './asset/img/rock.png';
    opponentHand.src = `./asset/img/${arrayHand[generateNumber()]}.png`;
})
paper.addEventListener('click', () => {
    myHand.src = './asset/img/paper.png';
    opponentHand.src = `./asset/img/${arrayHand[generateNumber()]}.png`;
})
scissor.addEventListener('click', () => {
    myHand.src = './asset/img/scissor.png';
    opponentHand.src = `./asset/img/${arrayHand[generateNumber()]}.png`;
})

