const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let gameOn = false;

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
    gameOn= true;
    score = 0;
    scoreDisplay.innerText = score;
    direction = 1;
    currentSnake = [2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    
    generateApple();
    timerId = setInterval(move, intervalTime);
}
function endGame(){
        if(!gameOn){
            return;
        }
        gameOn=false;
        alert("המשחק נגמר! הניקוד שלך: " + score);
        return clearInterval(timerId);
}
function move() {
    // בדיקת פסילה (קירות ופגיעה עצמית)
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');

    if (hitBottom || hitTop || hitRight || hitLeft || hitSelf) {
        endGame();
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
// מאזין לתחילת מגע
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

// מאזין לסיום מגע
document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    // סף מינימלי לתנועה כדי למנוע זיהוי של לחיצות רגילות כסווייפ
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    if (Math.max(absDx, absDy) > 30) { // 30 פיקסלים מינימום
        if (absDx > absDy) {
            // תנועה אופקית (ימינה/שמאלה)
            // שים לב: הערכים בפונקציית changeDir צריכים להתאים ללוגיקה שלך
            if (dx > 0) changeDir(-1);  // ימינה
            else changeDir(1);        // שמאלה
        } else {
            // תנועה אנכית (למעלה/למטה)
            if (dy > 0) changeDir(20); // למטה (בהנחה שרוחב הלוח 20)
            else changeDir(-20);       // למעלה
        }
    }
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
