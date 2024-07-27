document.addEventListener("DOMContentLoaded", function(){

    document
        .getElementById("accountList")
        .addEventListener("click", changeAccount);

    document.getElementById("userAddress").addEventListener("click", copyAddress);

    document.getElementById("transferFunds").addEventListener("click", handler);

    document.getElementById("header_network").addEventListener("click", getOpenNetwork);

    document.getElementById("network_item").addEventListener("click", getSelectedNetwork);

    document.getElementById("add_network").addEventListener("click", setNetwork);

    document.getElementById("loginAccount").addEventListener("click", loginUser);
    
    document.getElementById("accountCreate").addEventListener("click", createUser);

    document.getElementById("openCreate").addEventListener("click", openCreate);

    document.getElementById("sign_up").addEventListener("click", signUp);

    document.getElementById("login_up").addEventListener("click", login);


    document.getElementById("logout").addEventListener("click", logout);

    document.getElementById("open_Transfer").addEventListener("click", openTransfer);

    document.getElementById("goBack").addEventListener("click", goBack);

    document.getElementById("open_Import").addEventListener("click", openImport);

    document.getElementById("open_assets").addEventListener("click", openAssets);

    document.getElementById("open_activity").addEventListener("click", openActivity);

    document.getElementById("goHomePage").addEventListener("click", goHonePage);

    document.getElementById("openAccountImport").addEventListener("click", openImportModel);

    document.getElementById("close_import_account").addEventListener("click", closeImportModel);

    document.getElementById("add_new_token").addEventListener("click", addToken);

    document.getElementById("add_New_Account").addEventListener("click", addAccount);

});

let providerURL = 'https://polygon-amoy.g.alchemy.com/v2/dzRzS0jxUdciTnky7pMN5hV7Im9-MPTQ';

//let provider;
let privateKey;
let address;

function handler(){
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;

    const private_key = ""

    const testAccount = "0x1114a1b2f10e5032a41EbE8F3E926182B0A7908D";

    //provider
    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
    };

    let a = document.getElementById("link");
    a.href = "somelink url";

    wallet.sendTransaction(tx).then((txObj) => {
        console.log("txHash:", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";
        const a = document.getElementById("link");

        a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;

        document.getElementById("link").style.display = "block";
    });
};

function checkBalance(address){
    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    provider.getBalance(address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);

        document.getElementById("accountBalance").innerHTML = `${balanceInEth} MATIC`;

        document.getElementById("userAddress").innerHTML = `${address.slice(
            0,
            15
        )}...`;
    });
};

function getOpenNetwork(){
    document.getElementById("network").style.display = "block";
};

function getSelectedNetwork(e){
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if(e.target.innerHTML === "Ethereum Mainnet"){
        providerURL = "";
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Polygon Mainnet") {
        providerURL = "";
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Polygon Mumbai") {
        providerURL = "";
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Goerli test network") {
        providerURL = "";
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Sepolia test network") {
        providerURL = "";
        document.getElementById("network").style.display = "none";
    }

    console.log(providerURL);
};

function setNetwork(){
    document.getElementById("network").style.display = "no"
};

function loginUser(){
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

function createUser(){
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
};

function openCreate(){
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
};

function signUp(){
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = 'none';
    document.getElementById("center").style.display = 'block';

    const wallet = ethers.Wallet.createRandom();

    if(wallet.address){
        console.log(wallet)

        //API call
        const url = "http://localhost:3000/api/v1/user/signup";

        const data = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((result) => {
            document.getElementById("createAddress").innerHTML = wallet.address;
            document.getElementById("createPrivateKey").innerHTML = wallet.privateKey;
            document.getElementById("createMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";

            const userWallet = {
                address: wallet.address,
                private_key: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
            };

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();
        }).catch((error) => {
            console.log("ERROR:", error);
        });
    }
};

function login(){
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    //API CALL
    const url = "http://localhost:3000/api/v1/user/login";
    const data = {
        email: email,
        password: password,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((result) => {
        console.log(result)
        const userWallet = {
            address: result.data.user.address,
            private_key: result.data.user.priavte_key,
            mnemonic: result.data.user.mnemonic,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });
};

function logout(){
    localStorage.removeItem("userWallet");
    window.location.reload();
};

function openTransfer(){
    document.getElementById("transfer_form").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function goBack(){
    document.getElementById("transfer_form").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport(){
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function importGoBack() {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
}

function openActivity(){
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function openAssets(){
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
};

function goHomePage(){
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImportModel(){
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function closeImportModel(){
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function addToken(){
    const address = document.getElementById("token_address").value;
    const name = document.getElementById("token_name").value;
    const symbol = document.getElementById("token_symbol").value;

    //API CALL
    const url = "http://localhost:3000/api/v1/tokens/createtoken";
    const data = {
        name: name,
        address: address,
        symbol: symbol,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        window.location.reload()
    }).catch((error) => {
        console.log("ERROR", error);
    });
};

function addAccount(){
    const privateKey = document.getElementById("add_account_private_key").value;

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    console.log(wallet);

    const url = "http://localhost:3000/api/v1/account/createaccount";

    const data = {
        privateKey: privateKey,
        address: wallet.address,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
};

function myFunction(){
    console.log(ethers);
    const str = localStorage.getItem("userWallet");
    const parseObj  =JSON.parse(str);

    if(parseObj?.address){
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";

        privateKey = parseObj.private_key;
        address = parseObj.address;

        checkBalance(parseObj.address);
    }

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");

    const url = "http://localhost:3000/api/v1/tokens/alltoken";

    fetch(url).then((response) => response.json()).then((data) => {
        let elements = "";

        data.data.tokens.map((token) =>
            elements += `
            <div class="assets_item">
            <img class="assets_item_img"
              src="./assers/theblockchaincoders.png"
              alt=""
            />

            <span> ${token.address.slice(0, 15)}... </span>
            <span>${token.symbol}</span>
            </div>
            `
        );

        tokenRender.innerHTML = elements;
    }).catch((error) => {
        console.log(error);
    });

    fetch("http://localhost:3000/api/v1/account/allaccount").then((response) => response.json()).then((data) => {
        let accounts = "";

        data.data.accounts.map((account, i) => 
            accounts += `
            <div class="lists">
            <p>${i+1}</p>
            <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey}> ${account.address.slice(
                0,
                25
            )}...</p>
            </div>
            `
        );

        accountRender.innerHTML = accounts;
    }).catch((error) => {
        console.log(error);
    });

    console.log(privateKey);
};

function copyAddress(){
    navigator.clipboard.writeText(address);
};

function changeAccount(){
    const data = document.querySelector(".accountValue");
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");

    console.log(privateKey,address);

    const userWallet = {
        address: address,
        private_key: privateKey,
        mnemonic: "Changed",
    };

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);

    window.location.reload();
};

window.onload = myFunction;
