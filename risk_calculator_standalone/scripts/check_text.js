/*
Simple script to highlight numbers (eventually percentages) in a text.

Eventual functionality:
Judge an input text based on a fixed set of rules, e.g.:
    * if it reports effectivity it also must report harm
    * if it reports evidence it should report numbers (if available)
    * if it reports numbers they need to have a reference (or be otherwise clearly defined)

 Therefore, it will be able to process texts, output adherence to the criteria, and highlight corresponding information in text.

*/

// const pat_num = "\\d"  //
const pat_num = "(?:(?<![\\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,][0-9]+)?))(?!\\\.[0-9A-Za-z]|[a-zA-Z0-9])"
const regex_num = new RegExp("(" + pat_num + ")", "g");  // regex to detect numbers.
// From R: (?:(?<![\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,][0-9]+)?))(?!\\.[0-9A-Za-z]|[a-zA-Z0-9])
const note_set = ["Den Zahlen fehlt eine Referenz", "Keine ganzen Zahlen verwendet", "Behauptung ohne Evidenz aufgestellt"];  // Set of possible notes.

$(document).ready(function () {

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function () {

        // console.log("Check my text");
        const inputText = $("#text-query").val();

        let procText = inputText;

        console.log(sentence_tokenizer(procText));

        console.log(sentence_tokenizer(procText).map(word_tokenizer));

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

            // Get matches
            // (eventually migrate to object method?)
            const cur_matches = procText.match(value["regex"]);
            console.log(cur_matches);

            // Get duplicates:
            const duplicates = cur_matches.filter((item, index) => cur_matches.indexOf(item) !== index);

            console.log(duplicates); // Output: [2, 4, 5]

            // TODO!
            // Determine the indices for each match:
            // For the duplicates count up the indices to get them all!
            // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
            let unique = [...new Set(cur_matches)];
            console.log(unique);
            for (const mtc in unique){
                if(duplicates.has(mtc)){
                    console.log(mtc);
                }
            }



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
/*
Maybe use regex to find matches and then indexOf() --> but still returns first match only
("You can do that by passing in a value that's greater than the index of the previous occurrence as the second parameter to the method.)!
Will however need the string detected via regex!

Source for string manipulation:
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Possible parts:
* Basic sentence tokenizer --> analyse co-occurrence in sentences
* Basic word tokenizer --> move from word to word, analyse word surroundings for nouns (easier in German!)

*/

/*
Other formats to detect: Odds ratio, ARR/RRR, NNT...
*/

const regex_perc = new RegExp("(" + pat_num + " ?(%|\\\-?[Pp]rozent\\\w*(?=[ .?!]))" + ")", "g");

const check_numbers_dict = {
    "Prozentzahl": {
        "regex": regex_perc,
        "tooltip": "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
        "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "Andere": {
        "regex": regex_num,
        "tooltip": "Ich weiß nicht, was ich für eine Zahl bin",
        "note": "Sie haben eine Zahl verwendet, für die wir nicht bestimmen konnten, was sie bedeutet. Stellen Sie sicher, dass die Bedeutung der Zahl klar ist."
    }
}

// Testcase: Die Wahrscheinlichkeit für Regen ist 50% oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Die Wahrscheinlichkeit für Regen ist 50%  oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue.
// Testcase 2: Vergangene Woche hatten Biontech und Pfizer bekanntgegeben, dass ihr Impfstoff nach Zwischenergebnissen klinischer Studien einen mehr als 90-prozentigen Schutz vor Covid-19 bietet. Der US-Pharmakonzern Moderna hatte zuletzt für sein ähnliches Präparat eine Wirksamkeit von 94,5 Prozent errechnet.
// 94,5 Prozent
// 100 Leute.
// 1000 Leute.
// 100 Leute
// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function word_tokenizer(str) {
    const split = str.split(/\s/g);

    // Remove empty tokens and punctuation:
    // const clean_split = split.replace(/(?<!\W)[.,/#!$%^&*;:{}=_`~()](?!\W)/g,"");
    // Remove punctuation that is not within words.
    // Punctuation list: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    return split.filter(x => !/(?<!\W)[.,/#!$%^&*;:{}=_`~()](?!\W)/g.test(x));
}

function sentence_tokenizer(text) {
    const split = text.split(/(?<=[.?!])[ \r\n]/g);

    // Remove empty tokens:
    return split.filter(x => x);
}