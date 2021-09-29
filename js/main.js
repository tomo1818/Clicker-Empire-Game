const config = {
    initialForm: document.getElementById("initial-form"),
    mainPage: document.getElementById("mainPage"),
}

const item = [
    {
        "name":"Flip machine",
        "price":15000,
        "priceLate":1,
        "max":500,
        "type":"ability",
        "getPrice":25,
        "imgUrl":"https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
    },
    {
        "name":"ETF Stock",
        "price":300000,
        "priceLate":1.1,
        "max":Infinity,
        "type":"stock",
        "getPrice":0.1,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "name":"ETF Bonds",
        "price":300000,
        "priceLate":1,
        "max":Infinity,
        "type":"stock",
        "getPrice":0.07,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "name":"Lemonade Stand",
        "price":30000,
        "priceLate":1,
        "max":1000,
        "type":"realEstate",
        "getPrice":30,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"
    },
    {
        "name":"Ice Cream Truck",
        "price":100000,
        "priceLate":1,
        "max":500,
        "type":"realEstate",
        "getPrice":120,
        "imgUrl":"https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"
    },
    {
        "name":"House",
        "price":20000000,
        "priceLate":1,
        "max":100,
        "type":"realEstate",
        "getPrice":32000,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"
    },
    {
        "name":"TownHouse",
        "price":40000000,
        "priceLate":0,
        "max":100,
        "type":"realEstate",
        "getPrice":64000,
        "imgUrl":"https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"
    },
    {
        "name":"Mansion",
        "price":250000000,
        "priceLate":1,
        "max":20,
        "type":"realEstate",
        "getPrice":500000,
        "imgUrl":"https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"
    },
    {
        "name":"Industrial Space",
        "price":1000000000,
        "priceLate":1,
        "max":10,
        "type":"realEstate",
        "getPrice":2200000,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"
    },
    {
        "name":"Hotel Skyscraper",
        "price":25000000,
        "priceLate":1,
        "max":5,
        "type":"realEstate",
        "getPrice":10000000000,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"
    },
    {
        "name":"Bullet-speed Sky Railway",
        "price":10000000000000,
        "priceLate":1,
        "max":1,
        "type":"realEstate",
        "getPrice":30000000000,
        "imgUrl":"https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
    }
]

let purchaseItems = [];

function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

class UserAccount {
    initialMoney = 50000;
    initialAge = 20;

    constructor(name) {
        this.name = name;
        this.money = this.initialMoney;
        this.age = this.initialAge;
        this.days = 0;
        this.hamburger = 0;
        this.addMoneyPerClick = 25;
        this.addMoneyPerDays = 0;
        this.itemBox = [];
    }

    changeMoney(amount) {
        this.money += amount;
        return this.money;
    }
}

class Item {
    constructor(name, price, priceLate, max, type, getPrice, imgUrl) {
        this.name = name;
        this.price = price;
        this.priceLate = priceLate;
        this.max = max;
        this.type = type;
        this.getPrice = getPrice;
        this.imgUrl = imgUrl;
        this.stock = 0;
    }
}

function initializeUserAccount() {
    // document.getElementById("userName").value = "";
    let form = document.getElementById("user-form");

    let userAccount = new UserAccount(form.querySelectorAll(`input[name="userName"]`)[0].value);

    displayNone(config.initialForm);

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainData";
    mainContainer.append(mainPage(userAccount, "new"), createSaveOrReset());
    let timer = setInterval(function() {
        daysGone(userAccount);
        changeMoney(userAccount);
    }, 1000);


    config.mainPage.append(mainContainer);

    document.getElementById("save-btn").addEventListener("click", function() {
        clearInterval(timer);
        let data = {
            mainData:config.mainPage.innerHTML,
            account:userAccount
        };

        localStorage.setItem(userAccount.name, JSON.stringify(data));
        alert("保存しました。");
        displayBlock(config.initialForm);
        config.mainPage.innerHTML = "";
    });

    document.getElementById("reset-btn").addEventListener("click", function() {
        let result = window.confirm("データをリセットしても良いですか?");
        if (result) {
            clearInterval(timer);
            config.mainPage.innerHTML = "";
            initializeUserAccount();
        }
    });
}

function saveDataDisplay() {
    let result = callData();
    if (result != false) {
        displayNone(config.initialForm);
        let userAccount = result.account;
        let mainContainer = document.createElement("div");
        mainContainer.id = "mainData";
        mainContainer.append(mainPage(userAccount, "login"), createSaveOrReset());
        let timer = setInterval(function() {
            daysGone(userAccount);
            changeMoney(userAccount);
        }, 1000);

        config.mainPage.append(mainContainer);

        document.getElementById("save-btn").addEventListener("click", function() {
            clearInterval(timer);
            let data = {
                mainData:config.mainPage.innerHTML,
                account:userAccount
            };

            localStorage.setItem(userAccount.name, JSON.stringify(data));
            alert("保存しました。");
            displayBlock(config.initialForm);
            config.mainPage.innerHTML = "";
        });

        document.getElementById("reset-btn").addEventListener("click", function() {
            let result = window.confirm("データをリセットしても良いですか?");
            if (result) {
                clearInterval(timer);
                config.mainPage.innerHTML = "";
                initializeUserAccount();
            }
        });
    }
}

function mainPage(userAccount, type) {
    let container = document.createElement("div");
    container.classList.add("p-3", "d-flex", "bg-navy", "vh-75", "flex-wrap");

    // 左画面
    let hamburgerCon = document.createElement("div");
    hamburgerCon.classList.add("col-md-4", "col-12", "text-center", "align-items-center", "bg-dark", "p-2", "fit-height");
    let hamburgerInfo = document.createElement("div");
    hamburgerInfo.innerHTML =
    `
    <div class="bg-navy mb-md-5">
        <h4 id="burger">${userAccount.hamburger} Burgers</h4>
        <p id="addMoneyPerClick">one click ¥${userAccount.addMoneyPerClick}</p>
    </div>
    `

    let hamburgerImg = document.createElement("div");
    hamburgerImg.innerHTML =
    `
    <a href="#" disabled="disabled" class="d-block col-md-10 col-4 mx-auto">
        <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" alt="">
    </a>
    `
    hamburgerCon.append(hamburgerInfo, hamburgerImg);
    container.append(hamburgerCon);

    hamburgerImg.addEventListener("click", function() {
        addHamburger(userAccount);
        changeMoney(userAccount);
    });

    // 右画面
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add("col-md-8", "col-12", "p-2");

    let userInfo = document.createElement("div");
    userInfo.classList.add("text-center", "p-2");
    userInfo.innerHTML =
    `
    <div class="d-flex flex-wrap">
        <div class="border border-dark border-4 col-6">
            <p class="text-white p-md-2">${userAccount.name}</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="age" class="text-white p-md-2">${userAccount.age} years old</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="days" class="text-white p-md-2">${userAccount.days} days</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="money" class="text-white p-md-2">¥ ${userAccount.money}</p>
        </div>
    </div>
    `;

    let itemCon = document.createElement("div");
    itemCon.classList.add("bg-dark", "p-2", "box-height", "overflow-auto");
    let itemBox = document.createElement("div");

    if (type === "new") {
        for (let i = 0; i < item.length; i++) {
            let item1 = new Item(item[i]["name"], item[i]["price"], item[i]["priceLate"], item[i]["max"], item[i]["type"], item[i]["getPrice"], item[i]["imgUrl"]);
            userAccount.itemBox.push(item1);
            itemBox.append(createItem(item1));
        }
    } else {
        for (let i = 0; i < item.length; i++) {
            itemBox.append(createItem(userAccount.itemBox[i]));
        }
    }

    itemCon.append(itemBox);
    let itemStocks = itemCon.querySelectorAll("#item-stock");

    let items = itemCon.querySelectorAll("#item");
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function() {
            itemCon.innerHTML = "";
            itemCon.append(displayItemDetail(item[i]));

            document.getElementById("purchaseValue").addEventListener("change", function() {
                changeTotal();
            });

            document.getElementById("back-btn").addEventListener("click", function() {
                itemCon.innerHTML = "";
                itemCon.append(itemBox);
            });

            document.getElementById("purchase-btn").addEventListener("click", function() {
                let currentValue = userAccount.itemBox[i].stock;
                let purchaseValue = parseInt(document.getElementById("purchaseValue").value);
                let totalAmount = parseInt(document.getElementById("totalAmount").getAttribute("data-total"));
                if (compareMoney(userAccount) && currentValue + purchaseValue <= userAccount.itemBox[i].max) {
                    purchaseItem(userAccount, totalAmount, purchaseValue, userAccount.itemBox[i]);
                    let currentPrice = items[i].querySelectorAll("#itemPrice")[0];
                    userAccount.itemBox[i].price += userAccount.itemBox[i].price * (userAccount.itemBox[i].priceLate - 1)
                    currentPrice.innerHTML = `¥${userAccount.itemBox[i].price}`
                    changeMoney(userAccount);
                    userAccount.itemBox[i].stock += purchaseValue;
                    itemStocks[i].innerHTML = userAccount.itemBox[i].stock;
                    itemCon.innerHTML = "";
                    itemCon.append(itemBox);
                } else {
                    alert("You don't have enough money.");
                    itemCon.innerHTML = "";
                    itemCon.append(itemBox);
                }
            });
        });
    }

    userInfoCon.append(userInfo, itemCon);
    container.append(userInfoCon);

    return container;
}

function createSaveOrReset() {
    let saveOrReset = document.createElement("div");
    saveOrReset.classList.add("mt-2");
    saveOrReset.innerHTML =
    `
    <div>
        <div class="full-width d-flex justify-content-between">
            <div class="col-6 pl-0">
                <button id="reset-btn" class="btn btn-outline-primary col-12 new-btn" type="submit">Reset</button>
            </div>
            <div class="col-6 pr-0">
                <button id="save-btn" class="btn btn-primary col-12 login-btn" type="submit">Save</button>
            </div>
        </div>
    </div>
    `;

    return saveOrReset;
}

function callData() {
    if(JSON.parse(localStorage.getItem(document.getElementById("yourName").value)) === null){
        alert("保存されていません。");
        return false;
    }
    let data = JSON.parse(localStorage.getItem(document.getElementById("yourName").value));
    return data;
}

function createItem(item) {
    let container = document.createElement("a");
    container.href = "javascript:void(0)";
    container.id = "item";
    container.classList.add("d-block", "bg-navy", "mb-1", "d-flex", "flex-wrap", "align-items-center", "justify-content-center");

    let imgCon = document.createElement("div");
    imgCon.classList.add("col-4");
    imgCon.innerHTML =
    `
    <div class="col-12 mx-auto py-3">
        <img src="${item.imgUrl}" alt="">
    </div>
    `;

    let itemInfoCon = document.createElement("div");
    itemInfoCon.classList.add("col-8", "text-left", "text-white");
    let type = item.type === "ability" ? "click" : "sec"
    itemInfoCon.innerHTML =
    `
    <div class="py-4">
        <div class="d-flex justify-content-between">
            <h4>${item.name}</h4>
            <h4 id="item-stock" data-stock="${item.stock}">${item.stock}</h4>
        </div>
        <div class="d-flex justify-content-between">
            <p class="text-left" id="itemPrice" data-price="${item.price}">¥${item.price}</p>
            <p class="text-success text-right">¥${item.getPrice} /${type}</p>
        </div>
    </div>
    `;

    container.append(imgCon, itemInfoCon);

    return container;
}

function addHamburger(userAccount) {
    userAccount.hamburger += 1;
    document.getElementById("burger").innerHTML = userAccount.hamburger + " Burger";
    userAccount.money += userAccount.addMoneyPerClick;
}

function changeMoney(userAccount) {
    document.getElementById("money").innerHTML = "¥ " + (userAccount.money + userAccount.addMoneyPerDays);
}

function daysGone(userAccount) {
    userAccount.days += 1;
    document.getElementById("days").innerHTML = userAccount.days + " days";
    userAccount.money += userAccount.addMoneyPerDays;
    if (userAccount.days % 365 === 0) {
        addAge(userAccount);
    }
}

function addAge(userAccount) {
    userAccount.age += 1;
    document.getElementById("age").innerHTML = `${userAccount.age} years old`;
}

function displayItemDetail(item) {
    let container = document.createElement("div");
    container.classList.add("bg-navy", "p-3");
    let itemDetail = document.createElement("div");
    itemDetail.classList.add("d-flex", "flex-wrap", "justify-content-between")
    itemDetail.innerHTML =
    `
    <div class="col text-left py-5">
        <h4 class="full-width">${item.name}</h4>
        <p class="full-width">Max purchases: ${item.max}</p>
        <p class="full-width">Price: ${item.price}</p>
        <p class="full-width">Get ¥${item.getPrice} /${item.type === "ability" ? "click" : "sec"}</p>
    </div>
    <div class="col">
        <div>
            <img src="${item.imgUrl}" alt="">
        </div>
    </div>
    `;

    let purchaseForm = document.createElement("div");
    purchaseForm.innerHTML =
    `
    <div>
        <div class="mb-2">
            <p class="text-left">How many would you like to buy?</p>
            <div>
                <input class="full-width form-control" type="number" data-price="${item.price}" id="purchaseValue" placeholder="0" required>
                <p class="text-right" data-total="0" id="totalAmount">total: ¥0</p>
            </div>
        </div>
        <div class="full-width d-flex justify-content-between">
            <div class="col-6 pl-0">
                <button id="back-btn" class="btn btn-outline-primary col-12 new-btn" type="submit">Go Back</button>
            </div>
            <div class="col-6 pr-0">
                <button id="purchase-btn" class="btn btn-primary col-12 login-btn" type="submit">Purchase</button>
            </div>
        </div>
    </div>
    `;

    container.append(itemDetail, purchaseForm);

    return container;
}

function changeTotal() {
    let numBox = document.getElementById("purchaseValue");
    let total = document.getElementById("totalAmount");
    total.innerHTML = `total: ¥${parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"))}`;
    total.setAttribute("data-total", String(parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"))))
}

function compareMoney(userAccount) {
    return userAccount.money >= parseInt(document.getElementById("totalAmount").getAttribute("data-total"));
}

function purchaseItem(userAccount, amount, value, item) {
    userAccount.money -= amount;
    if (item["type"] === "ability") {
        userAccount.addMoneyPerClick += item.getPrice * value;
        document.getElementById("addMoneyPerClick").innerHTML = `one click ¥${userAccount.addMoneyPerClick}`;
    } else if (item.type === "stock" && item["priceLate"] === 0) {
        userAccount.addMoneyPerDays += item.price * item.getPrice * value * 0.01;
    } else if(item.type === "stock" && item.priceLate != 0) {
        userAccount.addMoneyPerDays += item.price * item.getPrice * value * 0.01;
    } else {
        userAccount.addMoneyPerDays += item.getPrice * value;
    }
}
