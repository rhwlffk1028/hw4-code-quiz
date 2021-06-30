var scores = document.querySelector("#scores");
var back = document.querySelector("#back");
var reset = document.querySelector("#reset");

// Line 6 ~ 18 should have processed the data from index.HTML but not working properly.
    // Retreives the score data (saved in local storage) from index.html.
    var scoreDatas = localStorage.getItem("scoreDatas");
    // Receiving string of information from server and convert into object
    scoreDatas = JSON.parse(scoreDatas);

    // Make sure the user scores are valid and then creates list and display.
    if (scoreDatas !== null) {
        for (let i = 0; i < scoreDatas.length; i++) {
            var liEl = document.createElement("li");
            liEl.textContent = "Initial: " + scoreDatas[i].initials + "Score: " + scoreDatas[i].scores;
            scores.appendChild(listEl);
        }
    }

// when 'go back' button is clicked, it goes back to the main page of index.html.
back.addEventListener("click", function () {
    window.location.replace("index.html");
});

// when 'clear highscores' button is clicked, it removes the local storage data and clear the list.
reset.addEventListener("click", function () {
    localStorage.clear(); //reset the local storage data.
    location.reload(); //reload the current browser after the local storage is reset.
});