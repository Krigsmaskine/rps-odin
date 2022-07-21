function computerPlay() {
    const options = ["Paper","Rock","Scissors"]
    const randomOption = options[Math.floor(Math.random() * options.length)];
    return randomOption;
};

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    if (playerSelection == "ROCK" && computerSelection == "PAPER") {
        return "You lose the round! Paper beats rock."
    }

    if (playerSelection == "SCISSORS" && computerSelection == "ROCK") {
        return "You lose the round! Rock beats scissors."
    }

    if (playerSelection == "PAPER" && computerSelection == "SCISSORS") {
        return "You lose the round! Scissors beats paper."
    }

    if (playerSelection == "PAPER" && computerSelection == "PAPER") {
        return "You tie the round! You both picked paper."
    }

    if (playerSelection == "ROCK" && computerSelection == "ROCK") {
        return "You tie the round! You both picked rock."
    }

    if (playerSelection == "SCISSORS" && computerSelection == "SCISSORS") {
        return "You tie the round! You both picked scissors."
    }

    if (playerSelection == "SCISSORS" && computerSelection == "PAPER") {
        return "You win the round! Scissors beats paper."
    }

    if (playerSelection == "PAPER" && computerSelection == "ROCK") {
        return "You win the round! Paper beats rock."
    }

    if (playerSelection == "ROCK" && computerSelection == "SCISSORS") {
        return "You win the round! Rock beats scissors."
    }



};

function playRoundButton(btn) {
    let playerSelection = btn.innerHTML.substring(
        btn.innerHTML.indexOf("/") + 1, 
        btn.innerHTML.indexOf(".")
    );
    let computerSelection = computerPlay();

    const container = document.querySelector('#playfield');
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = playRound(playerSelection, computerSelection);
    container.appendChild(content);
};

const controller = new AbortController();
const btn = document.querySelectorAll('#btn');
btn.forEach(btn => btn.addEventListener("click", function(){playRoundButton(btn)}, { signal: controller.signal } ));

var onAppend = function(elem, f) {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.addedNodes.length) {
                f(m.addedNodes)
            }
        })
    })
    observer.observe(elem, {childList: true})
}

onAppend(document.querySelector('#playfield'), function(added) {
    const playResults = document.querySelector('#playfield').innerHTML;
    let winCount = (playResults.match(/win/g) || []).length;
    let lossCount = (playResults.match(/lose/g) || []).length;

    document.getElementById("gameTally").innerHTML = `You've won ${winCount} rounds and lost ${lossCount} rounds.`;

    if (lossCount == 5) {
        const container = document.querySelector('#gameResult');
        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = "You lost the game! Refresh the page to try again."
        container.appendChild(content);
        const btn = document.querySelectorAll('#btn');
        btn.forEach(btn => controller.abort());
    }

    if (winCount == 5) {
        const container = document.querySelector('#gameResult');
        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = "You won the game! Refresh the page to try again."
        container.appendChild(content);
        const btn = document.querySelectorAll('#btn');
        btn.forEach(btn => controller.abort());
    }
})