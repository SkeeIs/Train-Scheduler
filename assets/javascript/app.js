//firebase config
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
//listener for click of button with id of send
$("#send").on("click", function() {
//keep page from refreshing    
    event.preventDefault()
//get values from input fields & assign to reasonably named variables    
    var name = $("#name-input").val();
    var destination = $("#dest-input").val();
    var frequency = $("#freq-input").val();
    var firstTrain = $("#first-input").val();
//make sure we got our data
    console.log(name)
    console.log(destination)
    console.log(frequency)
    console.log(firstTrain)
//push our data to our firebase database with keys same as the variable names from which we are passing the data
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
    })
//clearing out our form input fields
    $(".form-control").val("");
})
//listener for a new "child" being added to our database
database.ref().on("child_added", function(snapshot) {

    //snapshotting data
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    console.log(firstTrain);
    
    // splits user inputed first train time 09:40 to ["09", "20"]
  var timeArray = firstTrain.split(":");

  // Use the array to make a moment() of first train time and store in trainTime
  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  console.log(trainTime);
  // maxMoment will now be either the current time (moment()) or the first train arrival of the day (trainTime). Whichever is further out (max)
  var maxMoment = moment.max(moment(), trainTime);

  // If the first train has not come yet maxMoment is equal to trainTime (first train of the day) otherwise it is equal to the current moment
  if (maxMoment === trainTime) {

    // Format train arrival to be readable (hh:mm with am/pm)
    var trainArrival = trainTime.format("hh:mm A");

    // Difference between trainTime and current moment() to calculate minutes unitl next arrival
    var tMinutes = trainTime.diff(moment(), "minutes");

  } else {

    // differenceTimes is how long it has passed since first train of day
    var differenceTimes = moment().diff(trainTime, "minutes");

    // tRemainder is the left over of taking the diffferenceTimes and modulus frequency.
    var tRemainder = differenceTimes % frequency;

    // tMinutes takes the frequency and - the remainder. This number is always less than frequency
    var tMinutes = frequency - tRemainder;

    // Next arrival is the current time plus the tMinutes
    var trainArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
    //create a new table row & assign it to newRow
    var newRow = $("<tr>")
    //create a new table cell & assign it to trainNameCell, put the text from variable name into the cell, append cell to the table row
    var trainNameCell = $("<td>")
    trainNameCell.text(name);
    newRow.append(trainNameCell);
    //create a new table cell & assign it to destinationCell, put the text from variable destination into the cell, append cell to the table row
    var destinationCell = $("<td>")
    destinationCell.text(destination);
    newRow.append(destinationCell);
    //create a new table cell & assign it to frequencyCell, put the text from variable frequency into the cell, append cell to the table row
    var frequencyCell = $("<td>")
    frequencyCell.text(frequency);
    newRow.append(frequencyCell);
    //create a new table cell & assign it to trainArrivalCell, put the text from variable trainArrival into the cell, append cell to the table row
    var trainArrivalCell = $("<td>")
    trainArrivalCell.text(trainArrival);
    newRow.append(trainArrivalCell);
    //create a new table cell & assign it to minutesAwayCell, put the text from variable tMinutes into the cell, append cell to the table row
    var minutesAwayCell = $('<td>')
    minutesAwayCell.text(tMinutes);
    newRow.append(minutesAwayCell);
    //append the table row to tbody with id of schedule-data
    $("#schedule-data").append(newRow);
})

 