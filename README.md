# Train-Scheduler

Schedule manager for trains, lightrails, monorails, trolleys, high-speed rail, rapid transit, El trains, etc!


# Link to deployed site
[Train Schedule Manager](https://skeeis.github.io/Train-Scheduler/)


# Images
![Train Scheduler Manager](https://i.imgur.com/GpVzosr.png)

# technology used

- HTML
- CSS
- CSS Grid
- UIKit Front-End Framework
- Google Firebase
- Javascript
- JQuery
- Moment.js

# code snippets
Using Google Firebase to store input train schedules
```
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
```

# Learning points & Challenges
Most of the learning on this project came from using Google Firebase to store our input data & from moment.js for snapshotting times & making time based comparisons to calculate train arrivals.


# Author 
Taylor Skeels
