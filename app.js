// =============================
// BMZ v1.0
// Main Application
// =============================

const BMZ = {
    version: "1.0",
    user: null,
    bookings: [],
    expenses: [],
    resorts: [],
    customers: []
};

// =============================
// STORAGE
// =============================

function saveData() {
    localStorage.setItem("bmz_data", JSON.stringify(BMZ));
}

function loadData() {
    const data = localStorage.getItem("bmz_data");

    if (data) {
        Object.assign(BMZ, JSON.parse(data));
    }
}

// =============================
// LOGIN
// =============================

function login(email, password) {

    if (!email || !password) {
        alert("أدخل البريد وكلمة المرور");
        return;
    }

    BMZ.user = {
        email: email,
        name: email.split("@")[0]
    };

    saveData();

    showDashboard();
}

// =============================
// LOGOUT
// =============================

function logout(){

    BMZ.user = null;

    saveData();

    location.reload();

}

// =============================
// DASHBOARD
// =============================

function showDashboard(){

    document.getElementById("loginPage").style.display="none";

    document.getElementById("dashboard").style.display="block";

    document.getElementById("username").innerHTML=BMZ.user.name;

}

// =============================
// INIT
// =============================

window.onload=function(){

    loadData();

    if(BMZ.user){

        showDashboard();

    }

}
