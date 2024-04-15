/*
Simple script to highlight numbers (eventually percentages) in a text.
*/

const regex_num = /(\d+)/g;  // regex to detect numbers.
const note_set = ["Den Zahlen fehlt eine Referenz", "Keine ganzen Zahlen verwendet", "Behauptung ohne Evidenz aufgestellt"];  // Set of possible notes.

$(document).ready(function () {

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function () {

        // console.log("Check my text");
        const inputText = $("#text-query").val();

        let procText = inputText;

        console.log(procText);

        // Highlight the number and add a simple tooltip:
        // Note: Eventually match and process different types of numbers and adjust the tooltips.
        // Note: in case of multiple categories handle overlap!
        // procText = procText.replace(regex_num, '<div class="highlight-num tooltip">$1<span class="tooltiptext">Hi, ich bin eine Zahl!</span></div>');


        // Basic processing (highlighting):


        // Annotations:
        $("#text-note-general").text("Dieser Text ist einfach hervorragend! Hier sind trotzdem ein paar Anmerkungen, was man noch verbessern könnte:");

        // Create HTML for the list:

        let arr_li = [];

        // Loop over dictionary with rules:
        for (const [key, value] of Object.entries(check_numbers_dict)) {
            console.log(`${key} ${value["note"]}`); // "a 5", "b 7", "c 9"

            // Highlight the corresponding numbers:
            // procText = procText.replace(value["regex"], '<div class="highlight-num has-tooltip">$1<span class="tooltip-wrapper"><span class="tooltiptext">' +
            //     value["tooltip"] + '</span></span></div>');
            procText = procText.replace(value["regex"], '<div class="highlight-num tooltip">$1<span class="tooltiptext">' +
                value["tooltip"] + '</span></div>');
            console.log(procText);


            // Amend the notes:
            arr_li = arr_li.concat(value["note"]);
        }

        // If there are any entries:
        if (arr_li.length > 0) {

            let str_li = ""

            for (let i = 0; i < arr_li.length; i++) {
                str_li += "<li>" + arr_li[i] + "</li>";

            }

            // Add the list entries:
            $("#text-notes-list").html("<ul>" + str_li + "</ul>");
        }

        // Update the text:
        $("#text-result").html('<h3>Ihr Text</h3><br>' + procText);

    })


})


// ~~~~~~~~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO: Eventually define an object prototype (class)

const check_numbers_dict = {
    "Prozentzahl": {
        "regex": /(\d+ ?(%|Prozent))/g,
        "tooltip": "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
        "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "Andere": {
        "regex": /(\d+)/g,
        "tooltip": "Ich weiß nicht, was ich für eine Zahl bin",
        "note": "Sie haben eine Zahl verwendet, für die wir nicht bestimmen konnten, was sie bedeutet. Stellen Sie sicher, dass die Bedeutung der Zahl klar ist."
    }
}

// Testcase: Die Wahrscheinlichkeit für Regen ist 50% oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Die Wahrscheinlichkeit für Regen ist 50%  oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue.

// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
