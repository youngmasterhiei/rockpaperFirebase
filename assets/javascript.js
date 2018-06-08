
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

    var database = firebase.database();
    var refP1 = database.ref("players/playerOne/name");
    var refP2 = database.ref("players/playerTwo/name");


    var rock = "rock";
    var paper = "paper";
    var scissors = "scissors";


    var firstPlayerChosen = false;
    var buttonLockOn = true;
    var firstPlayerTurn = true;
    var secondPlayerTurn = false;

    var winner = "";
    var statsP1 = "";
    var statsP2 = "";






    $("#playerSubmit").on("click", function () {
        event.preventDefault();

        if (firstPlayerChosen) {
            players.playerTwo.name = $("#player").val().trim();

            console.log(players.playerTwo.name);
            $("#player").val("");
            refP2.set(players.playerTwo.name);
            buttonLockOn = false;
            database.ref().update({buttonLockOn : buttonLockOn});
            $("#playerOneButtons").hide();
        }

        else {
            players.playerOne.name = $("#player").val().trim();

            firstPlayerChosen = true;
            console.log(players.playerOne.name);
            $("#player").val("");


            database.ref().update({
                firstPlayerChosen: firstPlayerChosen,
                players: players
            });
            $("#playerTwoButtons").hide();
        }
    });

    $(".playerOneChoice").on("click", function () {
        if (buttonLockOn) {
            alert("players must be chosen first");
        }
        else if (!firstPlayerTurn){
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
                firstPlayerTurn : firstPlayerTurn,
                secondPlayerTurn : secondPlayerTurn
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
                firstPlayerTurn : firstPlayerTurn,
                secondPlayerTurn : secondPlayerTurn
            });
        }

    });

    function evaluateChoices() {
        
        if (players.playerOne.choice === rock && players.playerTwo.choice === scissors) {
            console.log(players.playerOne.name + " wins");
            winner = players.playerOne.name + " wins";
            players.playerOne.wins++;
            players.playerTwo.losses++;
            statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
            statsP2 =  "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
            database.ref().update({
                winner : winner,
                statsP1 : statsP1,
                statsP2 : statsP2
            });


            database.ref("players/playerOne").update({
                wins: players.playerOne.wins,
                losses: players.playerOne.losses
            });
            database.ref("players/playerTwo").update({
                wins: players.playerTwo.wins,
                losses: players.playerTwo.losses

            });

        }
        else if (players.playerOne.choice === paper && players.playerTwo.choice === rock) {
            console.log(players.playerOne.name + " wins");
           winner = players.playerOne.name + " wins";
            players.playerOne.wins++;
            players.playerTwo.losses++;
            statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
            statsP2 =  "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
            database.ref().update({
                winner : winner,
                statsP1 : statsP1,
                statsP2 : statsP2
            });


            database.ref("players/playerOne").update({
                wins: players.playerOne.wins,
                losses: players.playerOne.losses
            });
            database.ref("players/playerTwo").update({
                wins: players.playerTwo.wins,
                losses: players.playerTwo.losses

            });

        }
        else if (players.playerOne.choice === scissors && players.playerTwo.choice === paper) {
            console.log(players.playerOne.name + " wins");
            winner = players.playerOne.name + " wins";
            players.playerOne.wins++;
            players.playerTwo.losses++;
            statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
            statsP2 =  "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
            database.ref().update({
                winner : winner,
                statsP1 : statsP1,
                statsP2 : statsP2
            });

            database.ref("players/playerOne").update({
                wins: players.playerOne.wins,
                losses: players.playerOne.losses
            });
            database.ref("players/playerTwo").update({
                wins: players.playerTwo.wins,
                losses: players.playerTwo.losses

            });

        }
        else if (players.playerOne.choice === players.playerTwo.choice) {
            console.log("its a tie");
            winner = players.playerOne.name + " and " + players.playerTwo.name + " have tied";
            statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
            statsP2 =  "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
            database.ref().update({
                winner : winner,
                statsP1 : statsP1,
                statsP2 : statsP2
            });

            database.ref("players/playerOne").update({
                wins: players.playerOne.wins,
                losses: players.playerOne.losses
            });
            database.ref("players/playerTwo").update({
                wins: players.playerTwo.wins,
                losses: players.playerTwo.losses

            });
        }
        else {
            console.log(players.playerTwo.name + " wins");
           winner =  players.playerTwo.name + " wins";
            players.playerTwo.wins++;
            players.playerOne.losses++;
            statsP1 = "Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses;
            statsP2 =  "Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses;
            database.ref().update({
                winner : winner,
                statsP1 : statsP1,
                statsP2 : statsP2
            });


            database.ref("players/playerOne").update({
                wins: players.playerOne.wins,
                losses: players.playerOne.losses
            });
            database.ref("players/playerTwo").update({
                wins: players.playerTwo.wins,
                losses: players.playerTwo.losses

            });
        }

    };

    database.ref().on("value", function (snapshot) {

        // Print the initial data to the console.


        // Log the value of the various properties


        // Change the HTML
        $("#winner").html(snapshot.val().winner);
        $("#playerOneStats").text(snapshot.val().statsP1);
        $("#playerTwoStats").text(snapshot.val().statsP2);
        buttonLockOn = snapshot.val().buttonLockOn;
        firstPlayerChosen = snapshot.val().firstPlayerChosen;
        firstPlayerTurn = snapshot.val().firstPlayerTurn;
        secondPlayerTurn = snapshot.val().secondPlayerTurn;

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $("#nameReset").on("click", function () {
        players.playerOne.name = "";
        players.playerTwo.name = "";
        players.playerOne.choice = "";
        players.playerTwo.choice = "";
        firstPlayerChosen = false;
        buttonLockOn = true;
        firstPlayerTurn = true;
        secondPlayerTurn = false;
        winner = "";

        database.ref().set({
            buttonLockOn : buttonLockOn,
            firstPlayerChosen: firstPlayerChosen,
            firstPlayerTurn : firstPlayerTurn,
            secondPlayerTurn : secondPlayerTurn,
            players: players

        });


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