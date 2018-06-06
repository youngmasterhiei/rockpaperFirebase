$(document).ready(function () {

    var rock = "rock";
    var paper = "paper";
    var scissors = "scissors";

    var playerOne = "";
    var playerTwo = "";
    var playerOneChoice = "";
    var playerTwoChoice = "";
    var firstPlayerChosen = false;

    var totalWins = 0;
    var totalLosses = 0;



    $(".playerOneChoice").on("click", function () {
        playerOneChoice = $(this).text().trim();
        console.log(playerOneChoice);
        $("#displayPlayerOne").text(playerOneChoice);
        return playerOneChoice;

    });

    $(".playerTwoChoice").on("click", function () {
        playerTwoChoice = $(this).text().trim();
        console.log(playerTwoChoice);
        $("#displayPlayerTwo").text(playerTwoChoice);
        evaluateChoices();
        return playerTwoChoice;


    });


    $("#playerSubmit").on("click", function () {
        event.preventDefault();
        if (firstPlayerChosen) {
            playerTwo = $("#player").val().trim();
            $("#playerTwoName").html("Player Two: " + playerTwo);
            console.log(playerTwo);
            $("#player").val("");

        }

        else {
            playerOne = $("#player").val().trim();
            $("#playerOneName").html("Player One: " + playerOne);
            firstPlayerChosen = true;
            console.log(playerOne);
            $("#player").val("");
        }
    });

    function evaluateChoices() {
        if (playerOneChoice === rock && playerTwoChoice === scissors) {
            console.log(playerOne + " wins");
        }
        else if (playerOneChoice === paper && playerTwoChoice === rock) {
            console.log(playerOne + " wins");
        }
        else if (playerOneChoice === scissors && playerTwoChoice === paper) {
            console.log(playerOne + " wins");
        }
        else if (playerOneChoice === playerTwoChoice) {
            console.log("its a tie");
        }
        else {
            console.log(playerTwo + " wins");
        }
    };






});