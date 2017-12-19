// accidentally deleted my buttons when I was fixing my code and to be honest I didn't even
// notice that i chopped them. 
// will fix during lunch but here is what I have for now. I have some adding to do to the
// html as well as the js. sorry!!!! I got disorganized:/ I was wondering why nothing was 
// popping up.... 






// variable with my array of strings (topics)
$(document).ready(function () {
var buttonArray = ["surfboard", "sharks", "beach", "jellyfish"];



    function getButtons() {
        // $("#myButton").empty();
        // Here is where the for loop that runs through the buttons will be
        for (var i = 0; i < buttonArray.length; i++) {
            var button = $("<button>");
            button.text(buttonArray[i]);
            //adding attributes to the button like the name and getting it to the page
            button.attr("data-name", buttonArray[i]);
            button.addClass("surfing-button");
            $("#myButton").append(button);
            console.log(button);

        }
    }
    getButtons();
     
   function buttonActions() {
    $(document).on("click", ".surfing-button", function () {
        $("#displays").empty();        
        inputButton = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inputButton + "&rating=pg&limit=10&api_key=TpUAYaPAU2WQdsATriB4d6DUAbf8Oprx";
        //giphy link and api key here will enable us to be able to get the gifs
        // the ajax holds the two arguments- query url and get. calls the function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response); 
        // the .done is the promise. this makes it so that the page wont reload a billion times
            var result = response.data

            //api results will get pulled and sorted
            for (var i = 0; i < result.length; i++) {
                //dynamic variable
                var resultx = $("<div>");
                //how to get gif rating to display. will pop up as "Rated: "rating goes here"... well..should
                var r = $("<p>").text("Rated: " + result[i].rating);
                // another dynamic
                var viewableImage = $("<img>");
                // the status of the image. (still or animated)
                viewableImage.attr("src", result[i].images.fixed_height_still.url);
                viewableImage.attr("status", "still");
                viewableImage.attr("still", result[i].images.fixed_height_still.url)
                viewableImage.attr("animated", result[i].images.fixed_height.url)
                viewableImage.addClass("surf-gifs");
                resultx.append(r);
                resultx.append(viewableImage);

                $("#displays").append(resultx);
            
            }
        })
    });
}
    $("#addsurf").on("click", function (event) {
        event.preventDefault();
        // $("#myButton").empty();
        var result = $("#surf-input").val().trim();
        var buttonAdd = $("<button>");
            //adding attributes to the button like the name and getting it to the page
            buttonAdd.attr("data-name", result);
            buttonAdd.addClass("surfing-button");
            buttonAdd.text(result);
            $("#myButton").append(buttonAdd);
    
        buttonArray.push(result);
        console.log(result);
        buttonActions();
    })
    // if else statements that make the gifs either pause or become animated
    // if still, make animated
    $(document).on("click", ".surf-gifs", function () {
        if ($(this).attr("status") == "still") {

            $(this).attr("src",$(this).attr("animated"));
            $(this).attr("status", "animated");
        }
        // if animated, return to still
        else {
            $(this).attr("src",$(this).attr("still"));
            $(this).attr("status", "still");
        }
    });
   
});
