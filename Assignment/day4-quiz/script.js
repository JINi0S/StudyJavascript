// 퀴즈 데이터 배열
const quizzes = [
    {
        id: 1,
        title: "1 + 1 = ?",
        list: ["2", "6"],
        answer: "2"
    },
    {
        id: 2,
        title: "3 + 2 = ?",
        list: ["5", "32", "정답이 없음"],
        answer: "5"
    },
    {
        id: 3,
        title: "8 + 20 = ?",
        list: ["28", "38", "정답이 없음"],
        answer: "28"
    },
    {
        id: 4,
        title: "35 + 42 = ?",
        list: ["83", "79", "정답이 없음"],
        answer: "정답이 없음"
    },
    {
        id: 5,
        title: "17 + 33 = ?",
        list: ["60", "50", "정답이 없음"],
        answer: "50"
    }
]

let playIdx = 0;
const quizTitle = document.getElementById('quiz-title');
const quizOptions = document.getElementById('quiz-options');
const bg = document.body;
const gameBackground = document.getElementById('game-background');
const gameContent = document.getElementById('game-content');
const nextBtn = document.getElementById('next');
const retryBtn = document.getElementById('restart');

function displayQuiz() {
    if (playIdx >= quizzes.length) return endGame();

    const quiz = quizzes[playIdx];
    quizTitle.textContent = quiz.title;
    quizOptions.innerHTML = quiz.list
        .map(option => `<button class="quiz-option" onclick="playGame(this, '${option}')">${option}</button>`)
        .join('');
    
    gameContent.style.backgroundColor = "#ffffff"; // 배경 초기화
    nextBtn.style.display = "none"; // 다음 버튼 숨기기
}

function playGame(button, selectedAnswer) {
    if (quizzes[playIdx].answer === selectedAnswer) {
        bg.style.backgroundColor = "#00ff00";
        button.classList.add('correct');
    } else {
        bg.style.backgroundColor = "#ff0000";
        button.classList.add('wrong');
    }

    nextBtn.style.display = 'block';  // 다음 버튼 보이기
}

function onNext() {
    playIdx++;
    nextBtn.style.display = 'none';  // 다음 버튼 보이기
    bg.style.backgroundColor = "#a9a9a9";

    displayQuiz();
}

function endGame() {
    quizTitle.textContent = "게임 종료";
    quizOptions.innerHTML = "";
    gameBackground.style.backgroundColor = "#a9a9a9"; // 회색으로 변경
    nextBtn.style.display = 'none';
    retryBtn.style.display = 'block';  // 재시작 버튼 표시
}

function restartGame() {
    playIdx = 0;
    retryBtn.style.display = 'none'; // 재시작 버튼 숨기기
    displayQuiz();
}

displayQuiz();
