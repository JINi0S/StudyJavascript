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
        // gameBackground.style.backgroundColor = "#00ff00"; // 정답 → 초록색
        bg.style.backgroundColor = "#00ff00";
        button.classList.add('correct');
    } else {
        // gameBackground.style.backgroundColor = "#ff0000"; // 오답 → 빨간색
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



/*
let playIdx = 0;

const quizTitle = document.getElementById('quiz-title');
quizTitle.textContent = "ㄹ ㄴ"

const nextBtn = document.getElementById('next');
const retryBtn = document.getElementById('restart');

function endGame() {   
    // 게임 결과 텍스트 업데이트
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.color = "#505050"; // 회색 변경
    retryBtn.style.display = 'block';  // 재도전 버튼 활성
}

// 마지막 퀴즈면 restart, 아니면 next
// 정답 맞추면 초록색, 틀리면 빨간색

function playGame(selectedAnswer) {
    nextBtn.style.display = 'block';  // 넥스트 버튼 보이기

    const gameContent = document.getElementById('game-content');
    if (quizzes[playIdx].answer == selectedAnswer) {
        // 정답 초록색 처리
        gameContent.style.backgroundColor = "#00ff00";
    } else {
       // 오답 빨간색 처리
       gameContent.style.backgroundColor = "#ff0000";

    }    
}

function onNext() {
    playIdx += 1;
    // 회색색상으로 변경
    // 게임 보여주기??
    if (playIdx === quizzes.length) {
        endGame()
    }
}

function restartGame() {
    // 남은 횟수 초기화
    playIdx = 0;
    
    // document.getElementById('remainCount').innerText = `${remainCount}`;

    nextBtn.style.display = 'nonw'; 

    // 게임 종료 뷰 초기화
    retryBtn.style.display = 'none';  // 게임 종료 비활성
}

// 퀴즈 렌더링
function displayMenu(quizzes) {
    const menuContainer = document.getElementById('quiz-title');
    
    // 메뉴 항목들을 HTML로 변환
    const menuHTML = quizzes.map(item => `
            <div class="quiz-info">
                <h3>${item.title}</h3>
                <div class="game-button" id="filterButtons">
                    <button onclick="playGame('가위')">가위</button>
                    <button onclick="playGame('바위')">바위</button>
                </div>
            </div>
    `).join('');

    menuContainer.innerHTML = menuHTML;
}
displayMenu(quizzes)
*/