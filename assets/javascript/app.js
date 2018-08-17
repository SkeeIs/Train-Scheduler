var config = {
    apiKey: "AIzaSyAKfKYlP1Td7-BcjUqyOoFqYpZd36iJnzk",
    authDomain: "codersbay-4d3d4.firebaseapp.com",
    databaseURL: "https://codersbay-4d3d4.firebaseio.com",
    projectId: "codersbay-4d3d4",
    storageBucket: "codersbay-4d3d4.appspot.com",
    messagingSenderId: "901300256314"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#send").on("click", function() {
    event.preventDefault()
    
    var name = $("#name-input").val();
    var destination = $("#dest-input").val();
    var frequency = $("#freq-input").val();
    var nextArrival = $("#next-input").val();

    console.log(name)
    console.log(destination)
    console.log(frequency)
    console.log(nextArrival)

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival
    })

    $(".form-control").val("");
})

database.ref().on("child_added", function(snapshot) {

    //snapshotting data
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var nextArrival = snapshot.val().nextArrival;

    console.log(nextArrival);
    
    var thisRow = $("<tr>")
    
    var thisCell = $("<td>")
    thisCell.text(name);
    thisRow.append(thisCell);

    var thisCell = $("<td>")
    thisCell.text(destination);
    thisRow.append(thisCell);

    var thisCell = $("<td>")
    thisCell.text(frequency);
    thisRow.append(thisCell);

    var thisCell = $("<td>")
    thisCell.text(nextArrival);
    thisRow.append(thisCell);

    // var thisCell = $('<td>')
    // thisCell.text(minAway);
    // thisRow.append(thisCell);

    $("#schedule-data").append(thisRow);
})

 