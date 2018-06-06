$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB06Ffq3_DLPvs5ZXnFgVnlbs3zMfVJ6uM",
        authDomain: "rockpaperscissors-dbffa.firebaseapp.com",
        databaseURL: "https://rockpaperscissors-dbffa.firebaseio.com",
        projectId: "rockpaperscissors-dbffa",
        storageBucket: "",
        messagingSenderId: "710075389000"
    };
    firebase.initializeApp(config);


    var rock = "rock";
    var paper = "paper";
    var scissors = "scissors";

    var playerOne = "";
    var playerTwo = "";
    var playerOneChoice = "";
    var playerTwoChoice = "";
    var firstPlayerChosen = false;

    var playerOneWins = 0;
    var playerOneLosses = 0;
    var playerTwoWins = 0;
    var playerTwoLosses = 0;




    $(".playerOneChoice").on("click", function () {
        playerOneChoice = $(this).text().trim();
        console.log(playerOneChoice);
        $("#displayPlayerOneChoice").text(playerOneChoice);
        return playerOneChoice;

    });

    $(".playerTwoChoice").on("click", function () {
        playerTwoChoice = $(this).text().trim();
        console.log(playerTwoChoice);
        $("#displayPlayerTwoChoice").text(playerTwoChoice);
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
            $("#winner").html(playerOne + " wins");
            playerOneWins++;
            playerTwoLosses++;
            $("#playerOneStats").html("Wins: " + playerOneWins + "Losses: " + playerOneLosses);
            $("#playerTwoStats").html("Wins: " + playerTwoWins + "Losses: " + playerTwoLosses);

        }
        else if (playerOneChoice === paper && playerTwoChoice === rock) {
            console.log(playerOne + " wins");
            $("#winner").html(playerOne + " wins");
            playerOneWins++;
            playerTwoLosses++;
            $("#playerOneStats").html("Wins: " + playerOneWins + "Losses: " + playerOneLosses);
            $("#playerTwoStats").html("Wins: " + playerTwoWins + "Losses: " + playerTwoLosses);


        }
        else if (playerOneChoice === scissors && playerTwoChoice === paper) {
            console.log(playerOne + " wins");
            $("#winner").html(playerOne + " wins");
            playerOneWins++;
            playerTwoLosses++;
            $("#playerOneStats").html("Wins: " + playerOneWins + "Losses: " + playerOneLosses);
            $("#playerTwoStats").html("Wins: " + playerTwoWins + "Losses: " + playerTwoLosses);


        }
        else if (playerOneChoice === playerTwoChoice) {
            console.log("its a tie");
            $("#winner").html(playerOne + " and " + playerTwo + " have tied");
            $("#playerOneStats").html("Wins: " + playerOneWins + "Losses: " + playerOneLosses);
            $("#playerTwoStats").html("Wins: " + playerTwoWins + "Losses: " + playerTwoLosses);
        }
        else {
            console.log(playerTwo + " wins");
            $("#winner").html(playerTwo + " wins");
            playerTwoWins++;
            playerOneLosses++;
            $("#playerOneStats").html("Wins: " + playerOneWins + "Losses: " + playerOneLosses);
            $("#playerTwoStats").html("Wins: " + playerTwoWins + "Losses: " + playerTwoLosses);


        }

    };






});