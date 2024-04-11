/*
Simple script to highlight numbers (eventually percentages) in a text.
*/

const regex_num = /(\d+)/g;  // regex to detect numbers.
const note_set = ["Den Zahlen fehlt eine Referenz", "Keine ganzen zahlen verwendet", "Behauptung ohne Evidenz aufgestellt"];  // Set of possible notes.

$(document).ready(function () {

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function () {

        // console.log("Check my text");
        const inputText = $("#text-query").val();

        let procText = inputText;

        console.log(procText);

        // Highlight the number and add asimple tooltip:
        // Note: Eventually match and process different types of numbers and adjust the tooltips.
        procText = procText.replace(regex_num, '<div class="highlight-num tooltip">$1<span class="tooltiptext">Hi, ich bin eine Zahl!</span></div>');


        // Basic processing (highlighting)

        $("#text-result").html(procText);

        // Annotations:
        $("#text-note-general").text("Dieser Text ist einfach hervorragend! Hier sind trotzdem ein paar Anmerkungen, was man noch verbessern könnte:");

        // Create HTML for the list:
        let arr_li = ""
        let ix_notes = [0, 1];

        for(let i = 0; i < note_set.length; i++){
            if(i in ix_notes){
                arr_li += "<li>" + note_set[i] + "</li>";
            }
        }

        $("#text-notes-list").html("<ul>" + arr_li + "</ul>");
    })


})
