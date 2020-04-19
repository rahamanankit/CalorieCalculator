// Display the BMR Calculator on clicking the BMR Calculator mode
$("#bmrMode").click(function(){
    $("#heartRateCalculator").addClass("hideCalculator");
    $("#bmrCalculator").removeClass("hideCalculator");
    $("#bmrMode").attr("style", "background-color: pink");
    $("#heartRateMode").removeAttr("style");
    reset();
});

// Display the Heart Rate Calculator on clicking the Heart Rate Calculator mode
$("#heartRateMode").click(function(){
    $("#bmrCalculator").addClass("hideCalculator");
    $("#heartRateCalculator").removeClass("hideCalculator");
    $("#heartRateMode").attr("style", "background-color: pink");
    $("#bmrMode").removeAttr("style");
    reset();
});

// Calculate BMR Based on Age and Gender
$("#calculateBMI").click(function(){
    //Check if all the required fields are filled
    if(checkRequiredFieldsFilled() === false){
        alert("Please fill all the required fields");
    }
    //If all the required fields are filled 
    else{
        if($('input[name="gender"]:checked:visible').val() === "male"){
            calculateBMR("male");
        }
        else if($('input[name="gender"]:checked:visible').val() === "female"){
            calculateBMR("female");
        }
    } 
});

// Calculate Calories Burnt Based on Average Heart Rate
$("#calculateheartRate").click(function(){
    //Check if all the required fields are filled
    if(checkRequiredFieldsFilled() === false){
        alert("Please fill all the required fields");
    }
    //If all the required fields are filled 
    else{
        console.log("Else");
        if($('input[name="gender"]:checked:visible').val() === "male"){
            calculateCalorieHeartRate("male");
        }
        else if($('input[name="gender"]:checked:visible').val() === "female"){
            calculateCalorieHeartRate("female");
        }
    }
});


// Clear the values on clicking the Clear Button
$(".clearResults").click(function(){
    reset();
})

//Check if the required fields are filled
function checkRequiredFieldsFilled(){
    var required = $('input').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    return allRequired;
}

// Calculate the BMR values
function calculateBMR(gender){
    var bmr = 0;
    if(Number($(".age:visible").val()) < 15 || Number($(".age:visible").val()) > 80){
        $(".display:visible").text("Please enter a valid age");
        $(".display:visible").addClass("errorMessage");
    }
    else{
        if (gender === "male"){
            bmr = 66 + (13.7 * $(".weight:visible").val()) + (5 * $(".height").val()) - (6.8 * $(".age").val());
        }
        else if (gender === "female"){
            bmr = 655 + (9.6 * $(".weight:visible").val()) + (1.8 * $(".height").val()) - (4.7 * $(".age").val());
        }
        $("#sedentary").text(Math.round(bmr * 1.2).toLocaleString("en-US"));
        $("#exercise1to3").text(Math.round(bmr * 1.375).toLocaleString("en-US"));
        $("#exercise4to5").text(Math.round(bmr * 1.55).toLocaleString("en-US"));
        $("#exercise3to4").text(Math.round(bmr * 1.725).toLocaleString("en-US"));
        $("#exercise6to7").text(Math.round(bmr * 1.9).toLocaleString("en-US"));
        $("#veryIntenseExercise").text(Math.round(bmr * 2.0).toLocaleString("en-US"));
        //Display the calculated BMR in the result section
        $(".valueDisplay").text(Math.round(bmr).toLocaleString("en-US"));
        $(".valueDisplay").addClass("calculatedColor");
    }    
}

// Calculate the Calorie Burned Based on Heart Rate
function calculateCalorieHeartRate(gender){
    var caloriesBurned = 0;
    //Selecting the class that is visible
    if(Number($(".age:visible").val()) < 15 || Number($(".age:visible").val()) > 80){
        $(".display:visible").text("Please enter a valid age");
        $(".display:visible").addClass("errorMessage");
    }
    else{
        if (gender === "male"){
            console.log("Test");
            caloriesBurned = [($(".age:visible").val() * 0.2017) + ($(".weight:visible").val() * 0.1988) + ($("#avgHeartRate").val() * 0.6309) - 55.0969] * $("#workoutDuration").val() / 4.184;
        }
        else if (gender === "female"){
            caloriesBurned = [($(".age:visible").val() * 0.074) + ($(".weight:visible").val() * 0.1263) + ($("#avgHeartRate").val() * 0.4472) - 20.4022] * $("#workoutDuration").val() / 4.184;
        }
        //Display the calculated calories burned in the result section
        console.log(caloriesBurned);
        $(".valueDisplay").text(Math.round(caloriesBurned).toLocaleString("en-US"));
        $(".valueDisplay").addClass("calculatedColor");
    }
}

function reset(){
    $(".age:visible").val("");
    $(".height").val("");
    $(".weight:visible").val("");
    $("#avgHeartRate").val("");
    $("#workoutDuration").val("");
    $(".valueDisplay").text("0");
    $(".valueDisplay").removeClass("calculatedColor");
    $(".display:visible").text("");
    $("#sedentary").text("2,054");
    $("#exercise1to3").text("2,353");
    $("#exercise4to5").text("2,507");
    $("#exercise3to4").text("2,652");
    $("#exercise6to7").text("2,952");
    $("#veryIntenseExercise").text("3,251");
}
