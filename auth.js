// ===============================
// BMZ Authentication v1.0
// ===============================

const USERS_KEY = "bmz_users";
const SESSION_KEY = "bmz_session";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    location.reload();
}

function register(name, email, password) {

    const users = getUsers();

    if (users.find(u => u.email === email)) {
        alert("هذا البريد مستخدم مسبقاً");
        return false;
    }

    const user = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    saveUsers(users);

    saveSession(user);

    return true;
}

function login(email, password) {

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("بيانات الدخول غير صحيحة");
        return false;
    }

    saveSession(user);

    return true;
}

function currentUser() {
    return getSession();
}

function requireLogin() {

    const user = currentUser();

    if (!user) {

        document.getElementById("loginPage").style.display = "block";

        const app = document.getElementById("app");

        if (app) app.style.display = "none";

    } else {

        document.getElementById("loginPage").style.display = "none";

        const app = document.getElementById("app");

        if (app) app.style.display = "block";

        const username = document.getElementById("username");

        if (username)
            username.innerText = user.name;

    }

}
