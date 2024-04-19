/*
Simple script to highlight numbers (eventually percentages) in a text.

Eventual functionality:
Judge an input text based on a fixed set of rules, e.g.:
    * if it reports effectivity it also must report harm
    * if it reports evidence it should report numbers (if available)
    * if it reports numbers they need to have a reference (or be otherwise clearly defined)

 Therefore, it will be able to process texts, output adherence to the criteria, and highlight corresponding information in text.

*/

/*
Testcases:
Testcase: Die Wahrscheinlichkeit für Regen ist 50% oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Die Wahrscheinlichkeit für Regen ist 50%  oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue.
Testcase 2: Vergangene Woche hatten Biontech und Pfizer bekanntgegeben, dass ihr Impfstoff nach Zwischenergebnissen klinischer Studien einen mehr als 90-prozentigen Schutz vor Covid-19 bietet. Der US-Pharmakonzern Moderna hatte zuletzt für sein ähnliches Präparat eine Wirksamkeit von 94,5 Prozent errechnet.
94,5 Prozent
100 Leute.
1000 Leute.
100 Leute
 */

// const pat_num = "\\d"  //
const pat_num = "(?:(?<![\\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,][0-9]+)?))(?!\\\.[0-9A-Za-z]|[a-zA-Z0-9])"
const regex_num = new RegExp("(?<num>" + pat_num + ")", "dg");  // regex to detect numbers; d-flag provides beginning and end!.
// From R: (?:(?<![\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,][0-9]+)?))(?!\\.[0-9A-Za-z]|[a-zA-Z0-9])
const note_set = ["Den Zahlen fehlt eine Referenz", "Keine ganzen Zahlen verwendet", "Behauptung ohne Evidenz aufgestellt"];  // Set of possible notes.

$(document).ready(function () {

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function () {

        // console.log("Check my text");
        const inputText = $("#text-query").val();

        // let procText = inputText;

        // console.log(sentence_tokenizer(inputText));

        console.log(word_tokenizer(inputText));
        // console.log(sentence_tokenizer(inputText).map(word_tokenizer));

        const text_tokens = word_tokenizer(inputText);  // Define the text as word and punctuation tokens.

        let cur_token;
        let token_set = new Set();  // set of unique tokens.
        let tpos_start = [];  // starting position of token.
        let tpos_end = [];  // end position of token in basic text.

        let sentence_ids = [];
        let cur_sentence_id = 0;

        // Assign each token its beginning index:
        for (let i = 0; i < text_tokens.length; i++) {
            cur_token = text_tokens[i];

            let token_pat;
            let curpos;

            // Regex for token to ensure exact matching:
            if ([".", ",", "?"].includes(cur_token)) {
                // Punctuation follows somewhat different rules.
                // NOTE: Overlaps with other entities, likely because of the lack of spaces.
                token_pat = "\\" + cur_token + "(?=\\s|\\n|$)";
            } else {
                token_pat = "(?<!\\w)" + cur_token + "(?!\\w)";
            }
            const token_rex = RegExp(token_pat, "gm");  // global needed for exec to work and m to match across multiple lines
            // console.log(token_rex);

            if (token_set.has(cur_token)) {
                // If the token has already been there, start searching from this previous token:
                // Index of previous occurrence:
                // const prev_ix = token_position[text_tokens.indexOf(cur_token, -0)];  // search array from the back.
                const prev_tokens = text_tokens.slice(0, i - 1);
                // console.log(prev_tokens);
                const ix_prev = prev_tokens.lastIndexOf(cur_token);  // index of previous token in array.
                // console.log("Previous index of \"" + cur_token + "\" in array: " + ix_prev);
                // token_position = token_position.concat(inputText.indexOf(cur_token, prev_ix + 1));
                token_rex.lastIndex = tpos_start[ix_prev] + text_tokens[ix_prev].length;
                // search array from the back to find index of previous and update regex index.
                // console.log("Last index is: " + token_rex.lastIndex);
                curpos = token_rex.exec(inputText).index;
                // tpos_start = tpos_start.concat(curpos);
                // search only after previous index.
            } else {
                // If token is new, provide the unique index:
                // token_position = token_position.concat(inputText.indexOf(cur_token));
                curpos = inputText.search(token_rex);
                // Add cur_token to set to check for duplicates:
                token_set.add(cur_token);

                // Problem with words which are part of another word (like "hatte" < "hatten").
                // They already match the first, longer word but are not in the set!
            }

            tpos_start = tpos_start.concat(curpos);
            tpos_end = tpos_end.concat(curpos + cur_token.length - 1);

            // Assign sentence ID:
            sentence_ids = sentence_ids.concat(cur_sentence_id);
            if (["?", ".", "!"].includes(text_tokens[i])) {
                cur_sentence_id++
            }  // increment the id when a punctuation token is found.

            // Display info side by side:
            // console.log("\"" + cur_token + "\", ", + token_position[i] + "-" + Number(token_position[i] + cur_token.length - 1) + ", " + sentence_ids[i]);

        }

        // console.log(token_set);


        // Annotations:
        $("#text-note-general").text("Dieser Text ist einfach hervorragend! Hier sind trotzdem ein paar Anmerkungen, was man noch verbessern könnte:");

        // Create HTML for the list:

        let arr_li = new Set;
        let arr_match = [];

        // Loop over dictionary with rules:
        for (const [key, value] of Object.entries(check_numbers_dict)) {
            // console.log(`${key} ${value["note"]}`); // "a 5", "b 7", "c 9"

            // Get matches
            // (eventually migrate to object method?)
            // const cur_matches = inputText.match(value["regex"]);
            // console.log(cur_matches);
            //
            // // Get duplicates:
            // const duplicates = cur_matches.filter((item, index) => cur_matches.indexOf(item) !== index);
            //
            // console.log("Duplicates are: ");
            // console.log(duplicates); // Output: [2, 4, 5]
            //
            // // Determine the indices for each match:
            // // For the duplicates count up the indices to get them all!
            // // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
            // const unique_mtc = [...new Set(cur_matches)];
            // console.log("Unique elements are:");
            // console.log(unique_mtc);
            // for (let i = 0; i < unique_mtc.length; i++) {
            //     if (duplicates.includes(unique_mtc[i])) {
            //         console.log(unique_mtc[i] + " is a duplicate");
            //     }
            // }

            // Variant with exec:
            const matches = get_regex_matches(inputText, value["regex"]);
            arr_match = arr_match.concat(matches);

        }

        // Clean up the matches from all for redundancy:
        console.log("Match objects:");
        console.log(arr_match);
        // If a match is fully included in another, the match can be removed.
        // There is also some hierarchy (undefined numbers should only be output when

        // Add the matches to the text data:
        let token_match = Array(text_tokens.length).fill(-1);
        let i = 0;
        let droplist = [];

        for (let match of arr_match) {
            // console.log(match.start_end);

            // For a token to be part of a match, the following conditions must be fulfilled:
            // Match start must be greater or equal than token start and smaller than token end
            const match_start = tpos_start.findIndex(x => x >= match.start_end[0] && x < match.start_end[1]);
            // Match end must be smaller or equal to token end and larger than token start
            const match_end = tpos_start.findIndex(x => x <= match.start_end[1] && x > match.start_end[0]);

            // console.log(match_start, match_end);

            if (match_start !== -1) {
                if (token_match[match_start] === -1) {
                    token_match[match_start] = [i];
                } else {
                    // Note: If we can establish a clear hierarchical structure, we could drop the match here:
                    // arr_match.splice(i);
                    droplist = droplist.concat(i);
                    const prev_ix = token_match[match_start]

                    // Also amend the previous match to include the other type?
                    arr_match[prev_ix[0]].type = arr_match[prev_ix[0]].type.concat(match.type);

                    // Add index:
                    token_match[match_start] = prev_ix.concat(i);

                }

            }
            if (match_end !== -1) {

                if (token_match[match_end] === -1) {
                    token_match[match_end] = [i];
                } else {


                    // Note: If we can establish a clear hierarchical structure, we could drop the match here:
                    // arr_match.splice(i);
                    droplist = droplist.concat(i);

                    const prev_ix = token_match[match_end]

                    // Also amend the previous match to include the other type?
                    arr_match[prev_ix[0]].type = arr_match[prev_ix[0]].type.concat(match.type);

                    // Add index:
                    token_match[match_end] = prev_ix.concat(i);
                }
            }

            // Increment match ID:
            i++;

        }

        console.log(token_match);

        // Remove the indices that have to be dropped:
        arr_match = arr_match.filter((ele, index) => !droplist.includes(index));

        // Sort the array by the starting position of each match:
        arr_match = arr_match.sort((a, b) => a.start_end[0] - b.start_end[0]);

        console.log("Sorted and cleaned matches");
        console.log(arr_match);

        // Show all token info:
        for (let i = 0; i < text_tokens.length; i++) {

            // Display info side by side:
            console.log(("\"" + text_tokens[i] + "\"").padEnd(25) + "  " +
                token_match[i].toString().padEnd(5) + "  " +
                (tpos_start[i] + "-" + tpos_end[i]).padStart(7) + "  " +
                sentence_ids[i].toString().padEnd(2));

        }


        // Loop over all remaining matches to highlight them:
        let cur_ix = 0;  // current index in original text.
        let procText = "";

        for (let match of arr_match) {

            // Get types for each tooltip:
            const cur_tooltip = match.type.map((x) => check_numbers_dict[x].tooltip);
            // console.log(cur_tooltip)

            // Highlight the corresponding numbers:
            // inputText = inputText.replace(value["regex"], '<div class="highlight-num has-tooltip">$1<span class="tooltip-wrapper"><span class="tooltiptext">' +
            //     value["tooltip"] + '</span></span></div>');
            // procText = procText.replace(value["regex"], '<div class="highlight-num tooltip">$1<span class="tooltiptext">' +
            //     value["tooltip"] + '</span></div>');
            console.log(match);

            procText += inputText.slice(cur_ix, match.start_end[0]) +
                ('<div class="highlight-num tooltip">' + match.match +
                    '<span class="tooltiptext">' +
                    cur_tooltip +
                    '</span></div>');
            // console.log(procText);

            cur_ix = match.start_end[1];


            // Amend the notes:
            // console.log(match.type.map((x) => check_numbers_dict[x].note));
            for (let note of match.type.map((x) => check_numbers_dict[x].note)) {
                // console.log(note);
                arr_li = arr_li.add(note);
            }

        }

        console.log(arr_li);


        // If there are any entries:
        if (arr_li.size > 0) {

            let str_li = ""

            // for (let i = 0; i < arr_li.size; i++) {
            //     str_li += "<li>" + arr_li[i] + "</li>";
            //
            // }

            for (const note of arr_li) {
                str_li += "<li>" + note + "</li>";

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

const regex_perc = new RegExp("(?<perc>" + pat_num + " ?(%|\\\-?[Pp]rozent\\\w*(?=[\\s.?!]))" + ")", "dg");

const check_numbers_dict = {
    "perc": {
        "regex": regex_perc,
        "tooltip": "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
        "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "num": {
        "regex": regex_num,
        "tooltip": "Ich weiß nicht, was ich für eine Zahl bin",
        "note": "Sie haben eine Zahl verwendet, für die wir nicht bestimmen konnten, was sie bedeutet. Stellen Sie sicher, dass die Bedeutung der Zahl klar ist."
    }

}


// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Splits a text into an array of words and punctuation
 * @return {Array}     An array of words (as defined by space delimiters)
 * @param txt {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function word_tokenizer(txt) {


    const split = txt
        .replace(/([.,?!:)])(?=\s|$)/g, ' $1')  // Ensure that punctuations becomes their own by adding a space before.
        .replace(/((?<=\s)[(])/g, ' $1')  // opening parentheses.
        .split(/\s/g);

    // console.log(split);

    // Remove empty tokens and punctuation:
    // const clean_split = split.replace(/(?<!\W)[.,/#!$%^&*;:{}=_`~()](?!\W)/g,"");
    // Remove punctuation that is not within words.
    // Punctuation list: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    // return split.filter(x => !/(?<!\w)[.,/#!$%^&*;:{}=_`~()](?!\w)/g.test(x));
    return split.filter(x => x);
}


/**
 * Splits a text into an array of sentences
 * @return {Array}     An array of sentences
 * @param txt {String} A text, in which sentences are delimited by [.?!].
 */
function sentence_tokenizer(txt) {
    const split = txt.split(/(?<=[.?!])[ \r\n]/g);

    // Remove empty tokens:
    return split.filter(x => x);
}

// Use exec()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
/**
 * Find matches from a named regex group
 * @return {Object}     All first matches in text from a regex, with their beginning and end indices and the name of the group.
 * @param txt {String} A text string (full text, paragraph, sentence or words).
 * @param regexp {RegExp} A regular expression with a single named group of the form (?<GROUPNAME>REGEX).
 */
function get_regex_matches(txt, regexp) {
    // Testing:
    // console.log(txt);
    // console.log(regexp);

    // let arr_tmp;  // initialize temporary array.
    let arr_out = [];  // initialize output array.

    // Note: exec() may only be interesting if we need the named groups.
    // while ((arr_tmp = regexp.exec(txt)) !== null) {
    //
    //     // Testing output:
    //     // let msg = `Found ${Object.keys(arr_tmp.groups)}. `;
    //     // msg += `Next match starts at ${regex.lastIndex}`;
    //     // console.log(msg);
    //     // console.log(arr_tmp);
    //
    //     // Note: regex is updated to save the last index of each match,
    //     // so that the next match can be obtained in the next iteration.
    //
    //     // Add the information to the output array:
    //     const key = Object.keys(arr_tmp.groups);
    //
    //     if (key.length < 1) {
    //         Error("No group provided. Please provide a regex with a named group using (?<GROUPNAME>).")
    //     }
    //     if (key.length > 1) {
    //         Error("More than one group provided. Please provide a regex with a single named group using (?<GROUPNAME>).")
    //     }
    //     const curmatch = {"group": key[0], "match": arr_tmp.groups[key], "start_end": arr_tmp.indices.groups[key]};
    //     // console.log(curmatch);
    //     arr_out = arr_out.concat(curmatch);  // append match object to array.
    // }

    const matches = txt.matchAll(regexp);

    for (const match of matches) {
        // console.log(
        //     `Found ${match[0]} start=${match.index} end=${
        //         match.index + match[0].length
        //     }.`,
        // );
        // console.log(match);
        // const curmatch = {"match": match[0], "start_end": [match.index, match.index + match[0].length]};
        // arr_out = arr_out.concat(curmatch);  // append match object to array.

        // Add the information to the output array:

        // Check for errors:
        /*
        Tests:
        new RegExp("(?" + pat_num + " ?(%|\\\-?[Pp]rozent\\\w*(?=[\\s.?!]))" + ")", "dg");
        new RegExp("(?<perc>" + pat_num + " ?(?<percname>%|\\\-?[Pp]rozent\\\w*(?=[\\s.?!]))" + ")", "dg");
                 */

        if (match.groups === undefined) {
            console.log(match.groups);
            throw new Error("No group provided. Please provide a regex with a named group using (?<GROUPNAME>REGEX).")
        }

        // If a group was provided check if it is orderly:
        const key = Object.keys(match.groups);

        if (key.length > 1) {
            throw new Error("More than one group provided. Please provide a regex with a single named group using (?<GROUPNAME>).")
        }

        const curmatch = {"type": [key[0]], "match": match.groups[key], "start_end": match.indices.groups[key]};
        // console.log(curmatch);
        arr_out = arr_out.concat(curmatch);  // append match object to array.

    }


    return arr_out;
}

