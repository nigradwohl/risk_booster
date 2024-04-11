/*
Simple script to highlight numbers (eventually percentages) in a text.
*/

const regex_num = /(\d+)/g;

$(document).ready(function(){

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function (){

        // console.log("Check my text");
        const inputText = $("#text-query").val();

        let procText = inputText;

        console.log(procText);

        // Highlight the number and add asimple tooltip:
        // Note: Eventually match and process different types of numbers and adjust the tooltips.
        procText = procText.replace(regex_num, '<div class="highlight-num tooltip">$1<span class="tooltiptext">Hi, ich bin eine Zahl!</span></div>');


        // Basic processing (highlighting)

        $("#text-result").html(procText);
    })


})
