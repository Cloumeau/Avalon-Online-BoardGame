function showOptions() {
    let username = document.getElementById("username").value;
    if (username) {
        document.getElementById("options").style.display = "block";
        document.querySelector("form").style.display = "none";
    } else {
        alert("Please enter a username.");
    }
}

function createGame() {
    let groupName = prompt("Enter a name for the game group:");
    if (groupName) {
        let code = generateCode();
        localStorage.setItem("gameCode", code);
        window.location.href = "waiting-room.html";
    } else {
        alert("Please enter a name for the game group.");
    }
}

function joinGame() {
    let gameCode = prompt("Enter the game code:");
      if (gameCode) {
        localStorage.setItem("gameCode", gameCode);
        window.location.href = "waiting-room.html";
      } else {
        alert("Please enter a game code.");
      }
}

function generateCode() {
    let code = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}