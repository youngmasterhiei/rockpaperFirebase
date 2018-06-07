'use strict';
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
    

    var rock = "rock";
    var paper = "paper";
    var scissors = "scissors";

    // var playerOne = "";
    // var playerTwo = "";
    // var playerOneChoice = "";
    // var playerTwoChoice = "";
    var firstPlayerChosen = false;

    // var playerOneWins = 0;
    // var playerOneLosses = 0;
    // var playerTwoWins = 0;
    // var playerTwoLosses = 0;




    $(".playerOneChoice").on("click", function () {
        players.playerOne.choice = $(this).text().trim();
        console.log(players.playerOne.choice);
        $("#displayPlayerOneChoice").text(players.playerOne.choice);
        database.ref().set({
            players: players,
            });
        return players.playerOne.choice;

    });

    $(".playerTwoChoice").on("click", function () {
        players.playerTwo.choice = $(this).text().trim();
        console.log(players.playerTwo.choice);
        $("#displayPlayerTwoChoice").text(players.playerTwo.choice);
        evaluateChoices();
        database.ref().set({
            firstPlayerChosen : firstPlayerChosen,

            players: players,
            });
        return players.playerTwo.choice;


    });


    $("#playerSubmit").on("click", function () {
        event.preventDefault();
        if (firstPlayerChosen) {
            players.playerTwo.name = $("#player").val().trim();
            $("#playerTwoName").html("Player Two: " + players.playerTwo.name);
            console.log(players.playerTwo.name);
            $("#player").val("");
            database.ref().set({
                firstPlayerChosen : firstPlayerChosen,
                players: players,
                });


        }

        else {
            players.playerOne.name = $("#player").val().trim();
            $("#playerOneName").html("Player One: " + players.playerOne.name);
            firstPlayerChosen = true;
            console.log(players.playerOne.name);
            $("#player").val("");
            database.ref().set({
                firstPlayerChosen : firstPlayerChosen,
              players: players,
              });

            return firstPlayerChosen;
        }
    });

    function evaluateChoices() {
        if (players.playerOne.choice === rock && players.playerTwo.choice === scissors) {
            console.log(players.playerOne.name + " wins");
            $("#winner").html(players.playerOne.name + " wins");
            players.playerOne.wins++;
            players.playerTwo.losses++;
            $("#playerOneStats").html("Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses);
            $("#playerTwoStats").html("Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses);

        }
        else if (players.playerOne.choice === paper && players.playerTwo.choice === rock) {
            console.log(players.playerOne.name + " wins");
            $("#winner").html(players.playerOne.name + " wins");
            players.playerOne.wins++;
            players.playerTwo.losses++;
            $("#playerOneStats").html("Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses);
            $("#playerTwoStats").html("Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses);


        }
        else if (players.playerOne.choice === scissors && players.playerTwo.choice === paper) {
            console.log(players.playerOne.name + " wins");
            $("#winner").html(players.playerOne.name + " wins");
            players.playerOne.wins++;
            players.playerTwo.losses++;
            $("#playerOneStats").html("Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses);
            $("#playerTwoStats").html("Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses);


        }
        else if (players.playerOne.choice === players.playerTwo.choice) {
            console.log("its a tie");
            $("#winner").html(players.playerOne.name + " and " + players.playerTwo.name + " have tied");
            $("#playerOneStats").html("Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses);
            $("#playerTwoStats").html("Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses);
        }
        else {
            console.log(players.playerTwo.name + " wins");
            $("#winner").html(players.playerTwo.name + " wins");
            players.playerTwo.wins++;
            players.playerOne.losses++;
            $("#playerOneStats").html("Wins: " + players.playerOne.wins + "Losses: " + players.playerOne.losses);
            $("#playerTwoStats").html("Wins: " + players.playerTwo.wins + "Losses: " + players.playerTwo.losses);


        }

    };

    database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());
  
        // Log the value of the various properties
        console.log(snapshot.val().players.playerOne);
        console.log(snapshot.val().players.playerTwo);
  
        // Change the HTML
        $("#playerOneName").text(snapshot.val().players.playerOne.name);
        $("#playerTwoName").text(snapshot.val().players.playerTwo.name);


        // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

$("#nameReset").on("click", function(){
players.playerOne.name = "";
players.playerTwo.name = "";
firstPlayerChosen = false;

database.ref().set({
    firstPlayerChosen : firstPlayerChosen,
    players : players
    
  });


});


});