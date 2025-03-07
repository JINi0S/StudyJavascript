

// 메뉴 렌더링 함수
/*
function displayMenu(menuItems) {
    const menuContainer = document.getElementById('menuContainer');
    
    // 메뉴 항목들을 HTML로 변환
    const menuHTML = menuItems.map(item => `
        <div class="food-card">
            <img src="${item.img}">
            <div class="food-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <p><strong>${item.price}원</strong></p>
            </div>
        </div>
    `).join('');

    menuContainer.innerHTML = menuHTML;
}
*/

let playerPoint = 0;
let computerPoint = 0;
let remainCount = 10;

const computerScore = document.getElementById('computerScore');
computerScore.textContent = computerPoint;

const playerScore = document.getElementById('playerScore');
playerScore.textContent = playerPoint;

const remainText = document.getElementById('remainCount');
remainText.textContent = remainCount

const gameresult = document.getElementById('game-result');
function endGame() {
    let resultMessage = '';

    if (Number(playerScore.textContent) > Number(computerScore.textContent)) {
        resultMessage = '플레이어 승리!';
    } else if (Number(playerScore.textContent) < Number(computerScore.textContent)) {
        resultMessage = '컴퓨터 승리!';
    } else {
        resultMessage = '무승부';
    }

    // 게임 결과 텍스트 업데이트
    document.getElementById('game-play-result').innerText = `게임 결과: ${resultMessage}`;

    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'none';  // 게임 영역 숨기기

    const gameOverContainer = document.getElementById('game-end-container');
    gameOverContainer.style.display = 'block';  // 게임 종료 보이기
}

function playGame(playerType) {
    // 컴퓨터 랜덤 선택
    const arr = ["가위", "바위", "보"];
    const randomComputerType = arr[Math.floor(Math.random() * arr.length)];
    console.log(`컴퓨터 선택: ${randomComputerType}`);

    remainCount = remainCount - 1;
    remainText.textContent = Number(remainText.textContent) - 1;
    if (playerType === randomComputerType) {
        gameresult.textContent = "무승부"
        console.log('비겼습니다!');

    } else if (playerType === "가위") {
        if (randomComputerType === "바위") {
            computerScore.textContent = Number(computerScore.textContent) + 1;
            gameresult.textContent = '컴퓨터 승리'
        } else {
            playerScore.textContent = Number(playerScore.textContent) + 1;
            gameresult.textContent = '플레이어 승리'

        }
    } else if (playerType === "바위") {
        if (randomComputerType === "보") {
            computerScore.textContent = Number(computerScore.textContent) + 1;
            gameresult.textContent = '컴퓨터 승리'
        } else {
            playerScore.textContent = Number(playerScore.textContent) + 1;
            gameresult.textContent = '플레이어 승리'

        }
    } else if (playerType === "보") {
        if (randomComputerType === "가위") {
            computerScore.textContent = Number(computerScore.textContent) + 1;
            gameresult.textContent = '컴퓨터 승리'
        } else {
            playerScore.textContent = Number(playerScore.textContent) + 1;
            gameresult.textContent = '플레이어 승리'
        }
    }

    if (remainCount === 0) {
        endGame()
    }
}

function restartGame() {
    // 남은 횟수 초기화
    remainCount = 10;
    
    document.getElementById('remainCount').innerText = `${remainCount}`;
    document.getElementById('computerScore').innerText = 0;
    document.getElementById('playerScore').innerText = 0;

    // 게임 영역 다시 보이게 하기
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'block';  // 게임 영역 보이기

    // 게임 결과 초기화
    document.getElementById('game-result').innerText = '';

    // 게임 종료 뷰 초기화
    const gameOverContainer = document.getElementById('game-end-container');
    gameOverContainer.style.display = 'none';  // 게임 종료 비활성
}

const gameOverContainer = document.getElementById('game-end-container');
gameOverContainer.style.display = 'none';  // 게임 종료 비활성