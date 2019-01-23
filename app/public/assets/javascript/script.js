var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird","ferret","sugar glider","turtle","chinchilla","hedgehog","hermit crab","gerbil","pygmy goat","chicken","capybara","teacup pig","salamander","frog"];

function displayGiphyInfo() {
    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&rating!=r&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var data = response.data;
        $("#picture-view").empty();
        for (var i=0; i < data.length; i++) {
        $("#picture-view").append("<img src="+data[i].images.fixed_height_still.url +" class='gif' data-state='still' data-animate='"+data[i].images.fixed_height_downsampled.url+"' data-still='"+data[i].images.fixed_height_still.url+"'></img><p>rating: " + data[i].rating + "</p>");
        }
        $(".gif").on("click", function()  {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var animate_url = $(this).attr("data-animate");
            $(this).attr("src", animate_url);
            $(this).attr("data-state", "animate");
        } else {
            var still_url = $(this).attr("data-still");
            $(this).attr("src", still_url);
            $(this).attr("data-state", "still");
        }
        });
    });
}

function renderButtons() {
    $("#giphy-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("giphy");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#giphy-view").append(buttons);
    }
}

$("#add-giphy").on("click", function(event) {
    event.preventDefault();
    var giphy = $("#giphy-input").val().trim();
    topics.push(giphy);
    renderButtons();
});

$(document).on("click", ".giphy", displayGiphyInfo);

renderButtons();