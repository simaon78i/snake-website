const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;

// יצירת הלוח (400 משבצות)
function createBoard() {
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();

function startGame() {
    // איפוס
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    
    score = 0;
    scoreDisplay.innerText = score;
    direction = 1;
    currentSnake = [2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    
    generateApple();
    timerId = setInterval(move, intervalTime);
}

function move() {
    // בדיקת פסילה (קירות ופגיעה עצמית)
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');

    if (hitBottom || hitTop || hitRight || hitLeft || hitSelf) {
        alert("המשחק נגמר! הניקוד שלך: " + score);
        return clearInterval(timerId);
    }

    // הזזת הנחש: הסרת זנב
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    
    // הוספת ראש
    currentSnake.unshift(currentSnake[0] + direction);

    // בדיקת אכילת תפוח
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail); // גדילה
        score++;
        scoreDisplay.innerText = score;
        generateApple();
    }
    
    squares[currentSnake[0]].classList.add('snake');
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

// פונקציית שינוי כיוון לכפתורים ומקלדת
function changeDir(newDir) {
    // מניעת פניית פרסה
    if (direction + newDir !== 0) {
        direction = newDir;
    }
}

// תמיכה במקלדת למחשב
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir(20);
    if (e.key === 'ArrowLeft') changeDir(1);
    if (e.key === 'ArrowRight') changeDir(-1);
});