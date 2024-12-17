let currentPlayer = 'X'; // İnsan 'X', bilgisayar 'O'
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Oyun tahtasına tıklama olayını ekle
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

// Oyun tahtasına tıklama fonksiyonu
function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    // Geçersiz tıklamaları engelle: Hücre doluysa, oyun bitmişse veya bilgisayar sırasıysa
    if (gameBoard[index] !== '' || gameOver || currentPlayer === 'O') {
        return;
    }

    // Oyuncunun hamlesini tahtaya yerleştir
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Oyun bitip bitmediğini kontrol et
    if (checkWinner()) {
        status.textContent = `${currentPlayer} Kazandı!`;
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        status.textContent = "Beraberlik!";
        gameOver = true;
    } else {
        // Bilgisayarın sırasına geç
        currentPlayer = 'O';
        status.textContent = "Bilgisayarın sırası";
        setTimeout(computerMove, 500); // Bilgisayar hamlesini 500ms sonra yap
    }
}

// Bilgisayarın hamlesini yapma fonksiyonu
function computerMove() {
    const availableMoves = gameBoard.map((value, index) => value === '' ? index : null).filter(value => value !== null);

    if (availableMoves.length === 0) {
        return; // Hamle yapılacak yer yoksa çık
    }

    // Bilgisayar rastgele bir boş hücre seçer
    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    gameBoard[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    // Oyun bitip bitmediğini kontrol et
    if (checkWinner()) {
        status.textContent = "Yapay Zeka Kazandı!";
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        status.textContent = "Beraberlik!";
        gameOver = true;
    } else {
        // İnsan oyuncuya geç
        currentPlayer = 'X';
        status.textContent = "Senin sıran";
    }
}

// Kazananı kontrol etme fonksiyonu
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
        [0, 4, 8], [2, 4, 6] // Çapraz
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Oyunu sıfırlama fonksiyonu
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    status.textContent = "Senin sıran";

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Home butonuna tıklandığında sayfayı yönlendirme
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'https://ufak1.github.io/home/'; // Burada 'index.html' yerine yönlendirmek istediğiniz sayfanın URL'sini yazabilirsiniz
});
