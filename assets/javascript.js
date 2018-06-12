
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
    // player 1 and 2 objects
    var players = {
        playerOne: {
            name: "name",
            choice: "",
            wins: 0,
            losses: 0,

        },
        playerTwo: {
            name: "name",
            choice: "",
            wins: 0,
            losses: 0,
        }
    };
    // link firebase
    var database = firebase.database();
    var refP1 = database.ref("players/playerOne/name");
    var refP2 = database.ref("players/playerTwo/name");

    var rock = "rock";
    var paper = "paper";
    var scissors = "scissors";
    //switches for playing the game 
    var firstPlayerChosen = false;
    var secondPlayerChosen = false;
    var buttonLockOn = true;
    var usernameLock = true;
    var firstPlayerTurn = true;
    var secondPlayerTurn = false;

    // used for stats and messaging 
    var winner = "";
    var statsP1 = "";
    var statsP2 = "";
    var userName = "";

    // $(document).on("keyup", "#player", function (event) {

    //     if (event.keyCode === 13) {
    //         // Trigger the button element to submit using enter
    //         $("#playerSubmit").click();
    //     }
    // });

    // $(document).on("keyup", "#playerMessage", function (event) {

    //     if (event.keyCode === 13) {
    //         // Trigger the button element to submit using enter
    //         $("#messageSubmit").click();
    //     }
    // });

// choose first or second player, hide the other button prevents a bug with usernamelock
    $("#selectPlayerOne").on("click", function () {
        if (firstPlayerChosen) {
            alert("Player one is already chosen");
        }
        else {
            firstPlayerChosen = true;
            usernameLock = false;
            $("#selectPlayerTwo").hide();
            database.ref().update({ firstPlayerChosen: firstPlayerChosen });
        }
    });


    $("#selectPlayerTwo").on("click", function () {
        if (secondPlayerChosen) {
            alert("Player two is already chosen")
        }
        else {
            secondPlayerChosen = true;
            usernameLock = false;
            $("#selectPlayerOne").hide();
            database.ref().update({ secondPlayerChosen: secondPlayerChosen });
        }

    });

    $("#playerSubmit").on("click", function () {
        debugger;

        event.preventDefault();
        if (usernameLock) {
            alert("Please select a player");
        }

        else if (secondPlayerChosen) {
            players.playerTwo.name = $("#player").val().trim();
            userName = $("#player").val().trim();

            console.log(players.playerTwo.name);
            $("#player").val("");
            refP2.set(players.playerTwo.name);
            buttonLockOn = false;
            database.ref().update({ buttonLockOn: buttonLockOn });
            $("#playerOneButtons").hide();
        }

        else if (firstPlayerChosen) {
            players.playerOne.name = $("#player").val().trim();
            userName = $("#player").val().trim();

            console.log(players.playerOne.name);
            $("#player").val("");


            database.ref().update({
                players: players
            });
            $("#playerTwoButtons").hide();
        }
    });




    $(".playerOneChoice").on("click", function () {
        if (buttonLockOn) {
            alert("players must be chosen first");
        }
        else if (!firstPlayerTurn) {
            alert("waiting on player 2");
        }
        else {
            players.playerOne.choice = $(this).text().trim();
            console.log(players.playerOne.choice);
            database.ref("players/playerOne").update({
                choice: players.playerOne.choice
            });
            firstPlayerTurn = false;
            secondPlayerTurn = true;
            database.ref().update({
                firstPlayerTurn: firstPlayerTurn,
                secondPlayerTurn: secondPlayerTurn
            });
        }
    });

    $(".playerTwoChoice").on("click", function () {
        if (buttonLockOn) {
            alert("players must be chosen first")
        }
        else if (!secondPlayerTurn) {
            alert("waiting on player 1");
        }
        else {
            players.playerTwo.choice = $(this).text().trim();
            console.log(players.playerTwo.choice);
            evaluateChoices();
            database.ref("players/playerTwo").update({

                choice: players.playerTwo.choice
            });
            firstPlayerTurn = true;
            secondPlayerTurn = false;
            database.ref().update({
                firstPlayerTurn: firstPlayerTurn,
                secondPlayerTurn: secondPlayerTurn
            });
        }

    });
    //messaging application 
    $(document).on("click", "#messageSubmit", function () {
        debugger;
        event.preventDefault();

        var message = userName + ": " + $("#playerMessage").val();
        //$("#messageArea").append(players.playerOne.name + ": " + message);
        $("#playerMessage").val("");

        database.ref("message").push({
            message: message
        });

    });

    database.ref("message").on("child_added", function (snapshot) {
        $("#messageArea").append(snapshot.val().message + "<br>");

    });

    $("#nameReset").on("click", function () {
        players.playerOne.name = "";
        players.playerTwo.name = "";
        players.playerOne.choice = "";
        players.playerTwo.choice = "";
        firstPlayerChosen = false;
        secondPlayerChosen = false;
        buttonLockOn = true;
        firstPlayerTurn = true;
        secondPlayerTurn = false;
        winner = "";
        var statsP1 = "";
        var statsP2 = "";
        message = "";




        database.ref().update({

            buttonLockOn: buttonLockOn,
            firstPlayerChosen: firstPlayerChosen,
            secondPlayerChosen: secondPlayerChosen,
            firstPlayerTurn: firstPlayerTurn,
            secondPlayerTurn: secondPlayerTurn,
            players: players,
            statsP1: statsP1,
            statsP2: statsP2,
            winner: winner,
            message: message

        });

    });


    //updates stats to firebase based after the evaluateChoices function runs
    function firebaseUpdatePlayerStats() {
        statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
        statsP2 = "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
        database.ref().update({
            winner: winner,
            statsP1: statsP1,
            statsP2: statsP2
        });

        database.ref("players/playerOne").update({
            wins: players.playerOne.wins,
            losses: players.playerOne.losses
        });
        database.ref("players/playerTwo").update({
            wins: players.playerTwo.wins,
            losses: players.playerTwo.losses

        });
    };

    function selectWinner(player, winningPlayer, losingPlayer) {
        winner = player + " wins";
        winningPlayer;
        losingPlayer;

    };

    function evaluateChoices() {

        if (players.playerOne.choice === rock && players.playerTwo.choice === scissors) {
            selectWinner(players.playerOne.name, players.playerOne.wins++, players.playerTwo.losses++);
            firebaseUpdatePlayerStats();
        }
        else if (players.playerOne.choice === paper && players.playerTwo.choice === rock) {
            selectWinner(players.playerOne.name, players.playerOne.wins++, players.playerTwo.losses++);
            firebaseUpdatePlayerStats();
        }
        else if (players.playerOne.choice === scissors && players.playerTwo.choice === paper) {
            selectWinner(players.playerOne.name, players.playerOne.wins++, players.playerTwo.losses++);
            firebaseUpdatePlayerStats();
        }
        else if (players.playerOne.choice === players.playerTwo.choice) {
            winner = players.playerOne.name + " and " + players.playerTwo.name + " have tied";
            firebaseUpdatePlayerStats();
        }
        else {
            selectWinner(players.playerTwo.name, players.playerTwo.wins++, players.playerOne.losses++);
            firebaseUpdatePlayerStats();
        }

    };

    database.ref().on("value", function (snapshot) {


        // Change the HTML
        $("#winner").html(snapshot.val().winner);
        $("#playerOneStats").text(snapshot.val().statsP1);
        $("#playerTwoStats").text(snapshot.val().statsP2);
        // $("#messageArea").append(players.playerOne.name + snapshot.val().message + "\n");


        buttonLockOn = snapshot.val().buttonLockOn;
        firstPlayerChosen = snapshot.val().firstPlayerChosen;
        firstPlayerTurn = snapshot.val().firstPlayerTurn;
        secondPlayerTurn = snapshot.val().secondPlayerTurn;


        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    database.ref("players/playerOne").on("value", function (snapshot) {
        players.playerOne.name = snapshot.val().name;
        players.playerOne.choice = snapshot.val().choice;

        $("#playerOneName").text(snapshot.val().name);
        $("#displayPlayerOneChoice").text(snapshot.val().choice);

        // $("#playerOneStats").text(snapshot.val().wins);
        // $("#playerOneStats").text(snapshot.val().losses);

    });

    database.ref("players/playerTwo").on("value", function (snapshot) {
        players.playerTwo.name = snapshot.val().name;
        players.playerTwo.choice = snapshot.val().choice;

        $("#playerTwoName").text(snapshot.val().name);
        $("#displayPlayerTwoChoice").text(snapshot.val().choice);
        // $("#playerTwoStats").text(snapshot.val().wins);
        // $("#playerTwoStats").text(snapshot.val().losses);

    });

});