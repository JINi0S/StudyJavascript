// 음식 데이터 배열
const foodMenu = [
    {
        id: 1,
        title: "Buttermilk Pancakes",
        category: "breakfast",
        price: 14000,
        img: "https://i.namu.wiki/i/EX4BRUeiN2P_iYn-s8K6BlvqRH-SSEe--TfL5Biamo7TSS8LQVFv7FmzUEgD82_08TQYNn1FEXQ-MwQyROX04abFBQhywgr_zrc3mVRZF7SzhUvo_y9WO4OrY_5xSEkpc9jopYJriLo0MFU6gm9jGg.webp",
        desc: "Fluffy buttermilk pancakes served with maple syrup"
    },
    {
        id: 2,
        title: "Diner Double",
        category: "lunch",
        price: 10000,
        img: "https://i.namu.wiki/i/_i_4pbcplDdQEUSbYbTgb46cLSmLvxNMHc-mPhtFgbgfCrVx7-tgzVshUKkexOb3DlxtnRDWTQRFAX6EhFzDERYu4eP6XBlSkks0luG69hqvDMEIe99-Zrpt4WA3u09ytcup8009H4O2H781FQ5aeg.webp",
        desc: "Classic double cheeseburger with all the fixings"
    },
    {
        id: 3,
        title: "Godzilla Milkshake",
        category: "shakes",
        price: 6000,
        img: "https://i.namu.wiki/i/KzszixwlvFwBCjl--S7CiaDy7JcX4miP_VYrO55D80uG7DlAQXu8WSHY-cDqpPS9Hc04AGWb1mFLLBGiP4qZdSNEsDG7tRtEjmPvzBtZVW7O0G5XZ8HGbMcvF_OGC_NXsg5wElG4E1e3-_nIYM1skw.webp",
        desc: "Massive chocolate milkshake with whipped cream"
    },
    {
        id: 4,
        title: "Country Delight",
        category: "breakfast",
        price: 20000,
        img: "https://thumb.photo-ac.com/b1/b13a281313546822856587363892486d_t.jpeg",
        desc: "Hearty breakfast platter with eggs and bacon"
    },
    {
        id: 5,
        title: "Steak Dinner",
        category: "dinner",
        price: 38000,
        img: "https://i.namu.wiki/i/RBqKDycvFV2iB2Ql-B7d87zXrEutWTeKm83OgIBmbzhW9AAHsFHD22HWjAs-3na_Fi8OTFxKG26qux9E-EoZOuzOGURwjOu7oKvapKubqcBYtTA_VSVQ4aB2fna-oWQN47HHkIz-uxBDJLsQA897tQ.webp",
        desc: "Juicy ribeye steak with side dishes"
    },
    {
        id: 6,
        title: "Oreo Drink",
        category: "shakes",
        price: 5000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCtS_uRU7LqOglE9yfQq-jET5F5vj3IgzfhbhnjYPMeoseX0Tyq5aHsVPjuHbTeVtq10&usqp=CAU",
        desc: "Creamy Oreo milkshake"
    },
    {
        id: 7,
        title: "Chicken Caesar Salad",
        category: "lunch",
        price: 16000,
        img: "https://recipe1.ezmember.co.kr/cache/recipe/2021/09/06/9b6e3064da9991735951fd49599d86b31.jpg",
        desc: "Fresh chicken caesar salad"
    },
    {
        id: 8,
        title: "Beef Stir Fry",
        category: "dinner",
        price: 25000,
        img: "https://www.allrecipes.com/thmb/7N-Xq1XMMJw8G0KJv2e0ETUYB2I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228823-quick-beef-stir-fry-DDMFS-4x3-1f79b031d3134f02ac27d79e967dfef5.jpg",
        desc: "Delicious beef stir fry with vegetables"
    }
];

// 메뉴 렌더링 함수
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

// 메뉴 필터링 함수
function filterMenu(category) {
    // 활성 버튼 스타일 변경
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if(button.textContent.toLowerCase() === category) {
            button.classList.add('active');
        }
    });

    // 카테고리별 필터링
    let filteredMenu;
    if (category === 'all') {
        filteredMenu = foodMenu;
    } else {
        filteredMenu = foodMenu.filter(item => item.category === category);
    }

    // 필터링된 메뉴 표시
    displayMenu(filteredMenu);
}

// 페이지 로드 시 초기 메뉴 표시
displayMenu(foodMenu);