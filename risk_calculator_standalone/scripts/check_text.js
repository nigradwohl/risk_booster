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
Testcase 1:
Die Wahrscheinlichkeit für Regen ist 50% oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Die Wahrscheinlichkeit für Regen ist 50%  oder 60 Prozent? Jedenfalls irgendwas unter 100. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor elit neque, in condimentum ante pulvinar et. Donec et erat nulla. Vestibulum quis porta tellus. Curabitur non blandit metus. Vestibulum nec nisi quis urna tempor pharetra. Phasellus volutpat, arcu ac malesuada porttitor, erat diam facilisis ligula, eget aliquet nibh augue.

Testcase 2:
Vergangene Woche hatten Biontech und Pfizer bekanntgegeben, dass ihr Impfstoff nach Zwischenergebnissen klinischer Studien einen mehr als 90-prozentigen Schutz vor Covid-19 bietet. Der US-Pharmakonzern Moderna hatte zuletzt für sein ähnliches Präparat eine Wirksamkeit von 94,5 Prozent errechnet.
heute 5 94,5 Prozent
100 Leute.
1000 Leute.
100 Leute

Testcase 3:
Der Impfstoff wird nach Angaben der beiden Unternehmen 2mal im Abstand von 3Wochen verabreicht. In der Altersgruppe der Über-65-Jährigen wurde 7Tage nach der 2 Dosis eine Wirksamkeit von 94 Prozent ermittelt. Der Impfstoff sei von den Teilnehmern der weltweiten Studie gut vertragen worden, ernste Nebenwirkungen seien nicht beobachtet worden, berichteten die Unternehmen. Basis sind Angaben von mindestens 8000 zufällig ausgewählten Teilnehmern.

Bei der immer noch in zahlreichen Ländern laufenden Studie erhält eine Hälfte der insgesamt 43.000 Teilnehmer den Impfstoff, die andere Hälfte fungiert als Kontrollgruppe und bekommt ein Placebo-Mittel. Bislang erkrankten den Angaben zufolge insgesamt 170 Teilnehmer an Covid-19. Davon entfielen nur 8 Fälle auf die tatsächlich geimpften Probanden, 162 Fälle wurden in der Placebo-Gruppe diagnostiziert. Daraus errechnet sich eine Wirksamkeit von rund 95 Prozent. Nach Angaben von Biontech und Pfizer gab es unter allen Covid-19-Erkrankungen 10 schwere Verläufe - 9 in der Kontroll- und einen in der Impfgruppe.

Test statements:
- In der Kontrollgruppe erkranken 5 von 100, in der Behandlungsgruppe einer aus 100. --> gut
- Das Risiko zu erkranken ist 30-mal so hoch. Das heißt es erkranken 30 von 10000 mit dem bösen Verhalten und nur einer von 10000 ohne.
Das entspricht einem Risikoanstieg von 3000% --> Prozentzahl, vorsicht (mit 1. Satz okay-ish)
- Das Risiko zu erkranken ist unter rauchern doppelt so hoch. --> Referenz fehlt

 */

/*
Phraselist:

* risk-
    + verhindern + Erkrankung

 * relative_risk:
    + [Ii]mpf + wirksam + Prozent
    + Risiko + n-fach/n-mal so hoch

*/

/*
Output terms:
- bezugsgröße (worauf bezieht sich die Zahl?)

 */

/*
~~Feature ideas:~~

Structual ideas:
* make the token data an object with its own class, so that columns can be indexed accordingly.
* make the text an object which has associated: tokens (maybe as object), an array of matches

Content ideas:
* identify numbers and their units and types in token data? --> 95,4 [Prozent] is <perc>, 20 [Fälle] is <case>, etc.
    + use a regex identifier {NUMBER}(?<unit>)
    + use a unit dictionary to identify whether these are relevant units (can also be used to remove age etc.)
    + possibly replace or complement with token-based detector?

* identify other types of numbers (cases etc.)
* identify number ranges
* count occurrence of percentages: a large number (or density) may be hard to comprehend
* Identify whether any risk is communicated and whether both effectivity and harm are addressed.
* identify number references (e.g., adjacent nouns or verbs) --> may use a dictionary of nouns and verbs (or their regexes)!

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

        // console.log(word_tokenizer(inputText));
        // console.log(sentence_tokenizer(inputText).map(word_tokenizer));

        const token_dat = get_token_data(inputText);

        // console.log("Initial token data:");
        // console.log(token_dat);


        // Create HTML for the list:

        let arr_li = new Set;
        let arr_match = [];

        // Loop over dictionary with rules:
        for (const [key, value] of Object.entries(check_numbers_dict)) {
            // console.log(`${key} ${value["note"]}`); // "a 5", "b 7", "c 9"


            // Variant with exec:
            const matches = get_regex_matches(inputText, value["regex"]);
            arr_match = arr_match.concat(matches);

        }

        // Clean up the matches from all for redundancy:
        // console.log("Match objects:");
        // console.log(arr_match);
        // If a match is fully included in another, the match can be removed.
        // There is also some hierarchy (undefined numbers should only be output when

        // TODO: Function to loop over the tokens and ask for each if it is part of a match!

        // Add the matches to the text data:
        let token_match = Array(token_dat.token.length).fill(-1);
        let match_unit = Array(token_dat.token.length).fill(-1);

        let i = 0;
        let droplist = [];

        for (let match of arr_match) {
            // console.log(match.start_end);

            // For a token to be part of a match, the following conditions must be fulfilled:
            // Match start must be greater or equal than token start and smaller than token end
            const match_start = token_dat.start.findIndex(x => x >= match.start_end[0] && x < match.start_end[1]);
            // Match end must be smaller or equal to token end and larger than token start
            const match_end = token_dat.start.findIndex(x => x <= match.start_end[1] && x > match.start_end[0]);

            // console.log(match_start, match_end);

            if (match_start !== -1) {
                if (token_match[match_start] === -1) {
                    token_match[match_start] = [i];
                    match_unit[match_start] = match.type;
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

        console.log("Match data:");
        console.log(token_match);
        console.log(match_unit);

        // Is it more efficient to check for the matches or the tokens?
        // Likely the matches, because there are fewer by design!

        // console.log(token_match);

        // Add to object:
        // token_dat.token_match = token_match;
        token_dat.add_column(token_match, "match");
        token_dat.add_column(match_unit, "unit");
        token_dat.add_number_info();
        token_dat.detect_unit();

        // Detect topis:
        token_dat.detect_topic("eff", ["Nutz", "(?!Neben)[Ww]irks(am|ung)"]);
        token_dat.detect_topic("side", ["Nebenwirk"]);
        token_dat.detect_topic("impf", ["(?<!(gl|sch))[Ii]mpf"]);  // must be preceded

        // Detect number types (may need topics!)
        token_dat.detect_number_type();

        console.log("Updated token data:");
        console.log(token_dat);
        console.log(`${token_dat.nrow} rows and ${token_dat.ncol} columns`);
        // console.log(token_dat);

        // Remove the indices that have to be dropped:
        arr_match = arr_match.filter((ele, index) => !droplist.includes(index));

        // Sort the array by the starting position of each match:
        arr_match = arr_match.sort((a, b) => a.start_end[0] - b.start_end[0]);

        console.log("Sorted and cleaned matches");
        console.log(arr_match);

        token_dat.print();  // print data from object.
        // console.log(token_dat.get_row(1));  // print row.


        // Loop over all remaining matches to highlight them:
        let cur_ix = 0;  // current index in original text.
        let procText = "";

        // Detect the matches in token set:
        const unit_note_dict = {
            "perc": {
                "tooltip": {"ABS": "Absolute Prozentzahl", "REL": "Relative Prozentzahl"},
                "note": "Der Text verwendet Prozentzahlen. Achten Sie darauf, das klar ist, auf welche Größe sich die <a href=\"risk_wiki.html#wiki-prozent\">Prozentangabe</a> bezieht."
            },
            "case": {
                "tooltip": {"other": "Personen oder Fälle"},
                "note": "Der Text enthält Anzahlen von Fällen. Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
            },
            "unknown": {
                "tooltip": {"other": "Konnte nicht identifiziert werden"},
                "note": "Einige Zahlen konnten nicht identifiziert werden."
            }
        }

        for (i = 0; i < token_dat.nrow; i++) {

            // console.log(i);

            if (token_dat.unit[i] !== -1) {
                // Text prior to match:
                let text_pre = inputText.slice(cur_ix, token_dat.start[i]);
                let cur_unit = token_dat.unit[i];
                let cur_numtype = token_dat.numtype[i];

                // Get types for each tooltip:
                const cur_tooltip = unit_note_dict[cur_unit].tooltip[cur_numtype];

                let match_len = 0;
                // let match = token_dat.token.slice(i);

                while (token_dat.unit[i + match_len] !== -1 && i + match_len < token_dat.nrow) {
                    // match = token_dat.token[i];
                    // i++;
                    // console.log(token_dat.token[i + match_len]);
                    match_len++;
                }

                // console.log("Start: " + token_dat.start[i] + ", end: " + token_dat.end[i + match_len - 1] +
                //     ", match length: " + match_len);
                cur_ix = token_dat.end[i + match_len - 1] + 1;

                procText += text_pre +
                    ('<div class="highlight-num tooltip">' +
                        inputText.slice(token_dat.start[i], cur_ix) +
                        '<span class="tooltiptext">' +
                        cur_tooltip +
                        '</span></div>');
                // console.log(procText);

                i += match_len;

                arr_li = arr_li.add(unit_note_dict[cur_unit].note);
            }

        }
        procText += inputText.slice(cur_ix, inputText.length);

        // console.log(procText);

        let notes_html = "";

        // Annotations: ---------------------------------------------

        // Notes about topics:
        const key_topic_dict = {"impf": "Impfung"};  // {"impf": "Impfung", "eff": "Wirksamkeit", "side": "Nebenwirkungen"};
        let key_topics = [];
        let key_topics_str = "";

        const feature_dict = {"eff": "Nutzen", "side": "Schaden"};
        let feature_arr = [];
        let feature_str = "";

        // Get the content-topics:
        // Maybe differentiate this in a text-object!
        for (const topic of token_dat.topics) {
            // Topics:
            let curtopic = key_topic_dict[topic];

            if (curtopic !== undefined) {
                key_topics = key_topics.concat(curtopic);
            }

            // Features:
            let curfeature = feature_dict[topic];
            if (curfeature !== undefined) {
                feature_arr = feature_arr.concat(curfeature);
            }

        }

        // console.log(key_topics);

        const n_topics = key_topics.length;
        const n_features = feature_arr.length;

        if (n_topics === 1) {
            key_topics_str += "Dieser Text behandelt das Thema " + key_topics[0]
        } else if (n_topics > 1) {

            key_topics_str += "Dieser Text behandelt die Themen "

            for (i = 0; i < n_topics; i++) {
                if (i < n_topics - 1) {
                    key_topics_str += key_topics[i] + (i === n_topics - 2 ? " und " : ", ");
                } else {
                    key_topics_str += key_topics[i] + ".";
                }

            }

        } else {
            key_topics_str = "Das Thema dieses Textes konnte keinem Thema der Risikokommunikation zugeordnet werden.";
        }

        // Notes about features (e.g., effectivity and side-effects):
        console.log(feature_arr);
        const eff = feature_arr.includes("Nutzen");
        const side = feature_arr.includes("Schaden");

        if (eff && side) {
            feature_str += "Es werden Schaden und Nutzen thematisiert. Sehr gut! <i class=\"fa fa-thumbs-up\" style=\"font-size:24px\"></i>"
        } else if (eff) {
            feature_str += "Es wird nur der Nutzen thematisiert. Es sollte auch der Schaden thematisiert werden"

        } else if (side) {
            feature_str += "Es wird nur der Schaden thematisiert. Es sollte auch der nutzen thematisiert werden"

        } else {
            feature_str = "Es werden weder Schaden noch Nutzen thematisiert.";
        }

        // Add to string:
        let feature_list = "<ul><li>" + feature_str + "</li></ul>";


        $("#text-note-general").html("<p id=\"text-note-general\">" + key_topics_str + "</p>");


        // List of notes on numbers:
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
            notes_html += "<p>Zahleninformation:</p><ul>" + str_li + "</ul>";

        }


        // Update the notes:
        $("#text-notes-list").html(feature_list + notes_html);

        // Update the text:
        $("#text-result").html('<h3>Ihr Text</h3><br>' + procText);

    })


})


// ~~~~~~~~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
const regex_nh = new RegExp("(?<nh>" + pat_num + " (von|aus) " + pat_num + ")", "dg");
// Note: in regex_nh we may also try to get the denominator.
// nh must also be identified from tokens (e.g., In der Gruppe von 1000[case] Leuten sterben 4[num/case].

const check_numbers_dict = {
    "perc": {
        "regex": regex_perc,
        "tooltip": "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
        "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "nh": {
        "regex": regex_nh,
        "tooltip": "Ich bin eine \"natürliche\" Häufigkeit",
        "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "num": {
        "regex": regex_num,
        "tooltip": "Ich weiß nicht, was ich für eine Zahl bin",
        "note": "Sie haben eine Zahl verwendet, für die wir nicht bestimmen konnten, was sie bedeutet. Stellen Sie sicher, dass die Bedeutung der Zahl klar ist."
    }

}

//
const key_obj = {
    "REL": {
        "number_type": "perc",  // add in other types eventually! 30-fach etc.
        "keyset": [
            // A first entry to a domain-general keyset for risk:
            [RegExp(collapse_regex_or(["Risiko", "[Ww]ahrscheinlich"])),
                RegExp(collapse_regex_or(["höher", "erhöht", "reduziert", "(ge|ver)ringert?"]))]
        ]
    },
    "N_TOT": {
        "number_type": "case",
        "keyset": [
            // TODO: Double check these!
            [RegExp("Proband|[Tt]eilnehme|Versuchspers")],
            [RegExp("insgesamt|Studie")]
        ]
    }
}

// Additional set for vaccination topic:
const keyset_impf = [[RegExp(collapse_regex_or(["([Ww]irk(sam|t))", "[Ee]ffektiv"]))]];


// ~~~~~~~~~~~~~~~~~~~~~~~ CLASSES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * A text object to collect features from processing
 * @return {Object}     An object with a text and its features
 * @param text {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */

class TextObj {
    constructor(text) {
        this.text = text;
    }

    // Method to get corresponding token data:
    tokenize() {
        this.token = get_token_data(this.text);
    }

    // Method to get matches:
}

/**
 * Class for a text tokenized into words
 * @param txt {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
class TokenData {

    constructor(tokens, tpos_start, tpos_end, sentence_id) {
        this.token = tokens;

        this.nrow = this.token.length;
        this.ncol = 5;

        // Token information:
        this.id = [...Array(this.nrow).keys()];
        this.start = tpos_start;
        this.end = tpos_end;
        this.sent = sentence_id;

        // Also check for equal length in the future!
        // Also check for equal types per column!

        // Add global properties like number of rows (and columns) as properties:
        this.global_keys = ["global_keys", "nrow", "ncol", "colnames", "topics"];
        this.colnames = Object.keys(this).filter((x) => !this.global_keys.includes(x));
        this.topics = [];  // initialize empty topic list.


    }

    // Function to output all:
    print() {

        // console.log(Object.keys(this));

        // Determine column widths:
        let colwidths = [];
        for (const [key, value] of Object.entries(this)) {

            if (!this.global_keys.includes(key)) {  // exclude global keys.

                const col = value.concat(key);  // add the key.
                let curwidth = Math.max(...(col.map(el => el.toString().length)));
                colwidths = colwidths.concat(curwidth);

            }


        }

        console.log(`Colwidths and -names of ${this.ncol} columns:`);
        console.log(colwidths);
        console.log(this.colnames);

        // Possible feature: Column alignment (change padding fron/end)
        for (let ix_token = -1; ix_token < this.nrow; ix_token++) {

            const currow = ix_token > -1 ? this.get_row(ix_token) : this.colnames;
            let rowstr = "";


            for (let ix_col = 0; ix_col < this.ncol; ix_col++) {

                // Display info side by side:
                rowstr += currow[ix_col].toString().padEnd(colwidths[ix_col] + 2);
            }

            console.log(rowstr);

        }
    }

    // Function to output row:
    get_row(rix) {
        let row = [];
        for (const [key, value] of Object.entries(this)) {
            if (!this.global_keys.includes(key)) {
                if (Array.isArray(value[rix])) {
                    // console.log(value[rix]);
                    row = row.concat([value[rix]]);
                } else {
                    row = row.concat(value[rix]);
                }
            }
        }

        return (row);
    }

    // Function to add feature (e.g., number etc.):
    add_column(content, column_name) {
        this[column_name] = content;
        this.ncol++;
        this.colnames = this.colnames.concat(column_name);
    }

    // Functions to add specific information:
    add_number_info() {
        this.add_column(this.token.map((x) => regex_num.test(x)), "is_num");
    }

    // Method to detect and add units to detected numbers:
    detect_unit() {
        this.add_column(detect_unit(this), "unit");
    }

    // Method to detect topic information:
    detect_topic(topic, key_list) {
        // Eventually we may wnt to do this on the level of sentences or paragraphs; for now we judge the whole text.
        // These topics may inform also keywords (Impfung may make "schwerer Verlauf" relevant etc.
        // This will imply some tree structures -- our non-random grove.

        let topic_present = false;

        const regex = RegExp(collapse_regex_or(key_list), "g");
        console.log(regex);

        // Simple regex on tokens:
        for (const token of this.token) {
            if (topic_present) {
                this.topics = this.topics.concat(topic);
                break;
            }  // move out of loop if topic could already be discerned.
            topic_present = regex.test(token);

        }

    }

    // Method to detect number types:
    detect_number_type() {
        this.add_column(detect_number_type(this), "numtype");
    }
}


/**
 * Output of token data from function
 * @return {Object}     Object containing word and punctuation tokens from a text and their positions.
 * @param text {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function get_token_data(text) {

    const text_tokens = word_tokenizer(text);  // Define the text as word and punctuation tokens.

    let token_i;
    let token_set = new Set();  // set of unique tokens.
    let tpos_start = [];  // starting position of token.
    let tpos_end = [];  // end position of token in basic text.
    let token_pat;
    let curpos;

    let sentence_ids = [];
    let cur_sentence_id = 0;

    // Assign each token its beginning index:
    for (let i = 0; i < text_tokens.length; i++) {

        token_i = text_tokens[i];

        // Regex for token to ensure exact matching:
        if ([".", ",", "?", "!"].includes(token_i)) {
            // Punctuation follows somewhat different rules.
            // NOTE: Overlaps with other entities, likely because of the lack of spaces.
            token_pat = "\\" + token_i + "(?=\\s|\\n|$)";
        } else {
            token_pat = "(?<!\\w)" + token_i + "(?!\\w)";
        }
        const token_rex = RegExp(token_pat, "gm");  // global needed for exec to work and m to match across multiple lines
        // console.log(token_rex);

        if (token_set.has(token_i)) {
            // If the token has already been there, start searching from this previous token:
            // Index of previous occurrence:
            const prev_tokens = text_tokens.slice(0, i - 1);
            // console.log(prev_tokens);
            const ix_prev = prev_tokens.lastIndexOf(token_i);  // index of previous token in array.
            // console.log("Previous index of \"" + cur_token + "\" in array: " + ix_prev);
            token_rex.lastIndex = tpos_start[ix_prev] + text_tokens[ix_prev].length;
            // search array from the back to find index of previous and update regex index.
            curpos = token_rex.exec(text).index;
            // tpos_start = tpos_start.concat(curpos);
            // search only after previous index.
        } else {
            // If token is new, provide the unique index:
            // token_position = token_position.concat(inputText.indexOf(cur_token));
            curpos = text.search(token_rex);
            // Add cur_token to set to check for duplicates:
            token_set.add(token_i);

            // Problem with words which are part of another word (like "hatte" < "hatten").
            // They already match the first, longer word but are not in the set!
        }

        tpos_start = tpos_start.concat(curpos);
        tpos_end = tpos_end.concat(curpos + token_i.length - 1);

        // Assign sentence ID:
        sentence_ids = sentence_ids.concat(cur_sentence_id);
        if (["?", ".", "!"].includes(text_tokens[i])) {
            cur_sentence_id++
        }  // increment the id when a punctuation token is found

    }

    return new TokenData(text_tokens, tpos_start, tpos_end, sentence_ids);
}


// ----------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ----------------------------------------------------------------

// ~~~~~~~~~~~~~~~~~~~ PROCESSING FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Tries to detect the type of each number by using its unit and additional context information
 * @return {Array}     An array of number types for numeric token data
 * @param token_data {Object} A token data object with information about numbers.
 */
function detect_number_type(token_data) {

    console.log("Detecting the number type");

    // If missing add unit info!
    if (!Object.keys(token_data).includes("unit")) {
        // console.log(token_data);
        token_data.detect_unit();
    }

    let num_types = Array(token_data.nrow).fill(-1);  // was: "none"

    // Also check for topics?
    const sentence_set = new Set(token_data.sent);
    const sentence_counts = count(token_data.sent);

    // console.log("Sentence counts");
    // console.log(sentence_counts);

    /*
    Overview of the pipeline (tree-like structures?)
    1. Text-level properties (e.g. topic --> may inform the list of patterns to be tested
        (e.g., ([Ww]irk(sam|ung)) & <Prozentzahl> for the topic of vaccination)
    2. Sentence-level properties: Does the sentence contain any number? Otherwise we can skip it for number detection!
    3. Sentence-level patterns: Co-occurrence of tokens and number types
        [note: regex on whole sentence may be faster, but may ignore meaning of number]

    In the future we may try to add in paragraph-level features (topic etc.)
     */


    // Case: topic is vaccination and percentage and effectivity are present
    // Currently only sentence level!

    // check for "Wirksamkeit"/"Effektivität" etc.
    // let cursent_id = 0;  // ID of current sentence.
    // for (let i = 0; i < token_data.nrow + 1; i++) {
    //
    //     if (token_data.sent[i] === cursent_id) {
    //
    //     }
    // }

    // Sentence partitioning may also be done with slice, when sentence IDs and their length are saved somewhere...
    let prev_token = 0;
    for (const [key, value] of Object.entries(sentence_counts)) {

        // Get tokens in sentence:
        const final_token = prev_token + value;  // Get the final token of the sentence:

        const token_ids = token_data.id.slice(prev_token, final_token);
        const num_info = token_data.is_num.slice(prev_token, final_token);

        // Only continue if any numbers are present:
        if (num_info.includes(true)) {

            const sentence_tokens = token_data.token.slice(prev_token, final_token);

            // Get unit info:
            const sentence_units = token_data.unit.slice(prev_token, final_token);

            // console.log("First token in sentence: " + prev_token + ", Last token in sentence: " + final_token);
            // console.log("Ids in token data");
            // console.log(token_ids);
            console.log("Tokens in sentence and their numeric info:");
            console.log(sentence_tokens);
            console.log(num_info);
            console.log(sentence_units);
            // Issue is that we want to use regular expressions, which do not work so well on arrays!

            // Loop over tokens in sentence; maybe also use a token ID to assign number values?

            // Get positions of numbers:
            console.log("Number positions");
            // console.log(token_ids.filter((d, ind) => num_info[ind]));
            const num_array = token_ids.filter((d, ind) => num_info[ind]);
            console.log(num_array);

            // Testcase: Der Impfschutz bei Erwachsenen über 65 Jahren lag bei über 94 %.

            // Example keyset (eventually define elsewhere and translate into dictionary):

            // Conjunctions:
            // Risiko & erhöh & <Prozentzahl>
            // let keyset = [
            //     // A first entry to a domain-general keyset for risk:
            //     [RegExp(collapse_regex_or(["Risiko", "[Ww]ahrscheinlich"])),
            //         RegExp(collapse_regex_or(["höher", "erhöht", "reduziert", "(ge|ver)ringert?"]))]
            // ]

            // If the topic is vaccination, include a topic specific keyset:
            // if (token_data.topics.includes("impf")) {
            //     const keyset_impf = [[RegExp(collapse_regex_or(["([Ww]irk(sam|t))", "[Ee]ffektiv"]))]];
            //     // Check number surroundings for tokens related to "Wirksamkeit":
            //     // Do so as an inclusive disjunction.
            //     keyset = keyset.concat(keyset_impf);
            // }

            // console.log("Current keyset:");
            // console.log(keyset);

            for (const num of num_array) {
                const curnum_id = token_data.id[num];  // Get global ID of current number in sentence.
                console.log(num + ", " + curnum_id + ", unit: " + token_data.unit[curnum_id]);

                // Check for type:
                let numtype = "other";

                // Include topic-specific keywords:
                if (token_data.topics.includes("impf")) {
                    // Include Impf-specific keys
                    // Do so as an inclusive disjunction.
                    key_obj.REL.keyset = key_obj.REL.keyset.concat(keyset_impf);
                }

                console.log("Current key_obj:");
                console.log(key_obj);

                for (const [key, value] of Object.entries(key_obj)) {

                    console.log("Data judged:");
                    console.log(`Token: ${token_data.token[curnum_id]}, Unit: ${token_data.unit[curnum_id]}`);
                    console.log(value);

                    if (token_data.unit[curnum_id].includes(value.number_type)) {
                        // Note: may also apply to other number types like
                        // "30-faches Risiko", "das Risiko ist zweimal so hoch"
                        // console.log("It's a percentage!");

                        const keyset = value.keyset;  // Get keyset from object.

                        console.log("Current keyset:");
                        console.log(keyset);

                        // Test the keyset for rrr:
                        const keys_present = keyset
                            .map((keylist) => keylist
                                .filter((keyex) => sentence_tokens
                                    .filter((token) => keyex.test(token)).length > 0).length === keylist.length);

                        // Check each token:
                        // const key_present = sentence_tokens.filter((x) => keyrex.test(x));
                        console.log(keys_present);

                        // If any key is present for percentage, assign the corresponding flag:
                        if (keys_present.includes(true)) {
                            numtype = key;

                            // Eventually fix!
                            // if (token_data.unit[curnum_id].includes("perc")) {
                            //     numtype = "REL";
                            // } else {
                            //     numtype = "ABS";
                            // }
                        }


                    }

                }


                // Assign the numtype to the corresponding number token!
                num_types[curnum_id] = numtype;


            }

        }


        // Update last token:
        prev_token = final_token;

    }


    console.log("Output numtypes:");
    console.log(num_types);
    return num_types;

}


/**
 * Finds the unit to a number from token data
 * @return {Array}     An array of units for numeric data
 * @param token_data {Object} A token data object with information about numbers.
 */
function detect_unit(token_data) {
    // If missing add number info!
    if (!Object.keys(token_data).includes("is_num")) {
        // console.log(token_data);
        token_data.add_number_info();
    }

    // Initialize unit info:
    // If no unit info exists:
    let unit_info = [];
    if (!Object.keys(token_data).includes("unit")) {
        unit_info = Array(token_data.nrow).fill(-1);
    } else {
        unit_info = token_data.unit;
    }

    // Migrate later! Maybe to JSON
    // Lookup table:
    // ALTERNATIVELY use dict etc.?
    const unit_lookup = [
        [/(%|[Pp]rozent\w*)/, "perc"],  // percentages.
        [/Teilnehm|F[aä]ll|Proband/, "case"]  // frequencies.
        // natural/relative frequencies.
    ]
    // Note: Percentage signs may also be contained in the number token!

    // Simplest case: Next entry is unit
    let cur_token;
    for (let ix_tok = 0; ix_tok < token_data.nrow; ix_tok++) {
        if (token_data.is_num[ix_tok]) {
            cur_token = token_data.token[ix_tok];

            // Check the next adjacent indices:
            // Eventually we also will look back!
            for (let ix_nxt = ix_tok; ix_nxt < ix_tok + 4; ix_nxt++) {

                let nxt_token = token_data.token[ix_nxt];

                // Add to info array:
                let cur_info = unit_lookup.map((x) => x[0].test(nxt_token) ? x[1] : false).filter((x) => x);
                console.log("Cur info: " + cur_info + ", " + cur_info.length);
                if (cur_info.length > 0 && (unit_info[ix_tok] === -1 || unit_info[ix_tok].includes("num"))) {
                    // If there is a match or only an unspecified number from matching is contained, update.
                    // unit_info[ix_tok] = cur_info;

                    // Fill in Info to all before:
                    let n_ele = ix_nxt - ix_tok + 1;
                    unit_info.splice(ix_tok, n_ele, Array(n_ele).fill(cur_info));
                    unit_info = unit_info.flat();
                    console.log(unit_info);
                }

                // Here we could also add to ambiguous unit info!


            }

            // If no info was found:
            if (unit_info[ix_tok] === -1) {
                unit_info[ix_tok] = "unknown";
            }

        }
    }

    // Output:
    console.log("Unit info");
    console.log(unit_info);
    return unit_info;


}


/**
 * Splits a text into an array of words and punctuation
 * @return {Array}     An array of words (as defined by space delimiters)
 * @param txt {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function word_tokenizer(txt) {

    // console.log(txt);

    const split = txt
        .replace(/([.,?!:)])(?=\s)/g, ' $1')  // Ensure that punctuations becomes their own by adding a space before.
        .replace(/([.,?!:)])(?=$)/g, ' $1')
        .replace(/((?<=\s)[(])/g, '$1 ')  // space after opening parentheses.
        .split(/\s/g);

    // console.log("Token split");
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

    const matches = txt.matchAll(regexp);

    for (const match of matches) {

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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~ UTILITY FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
Functions that convey some basic utilities
 */

/**
 * Count occurrence of each unique array element, similar to table() in R.
 * @return {Object} Object of the form {element: count}.
 * @param arr {Array} An array.
 */
const count = (arr) => arr.reduce((ac, a) => (ac[a] = ac[a] + 1 || 1, ac), {});

/**
 * Convert array of regular expression strings to a single string any of which may match.
 * @return {String} Returns a string of string expressions separated by a vertical dash that can be converted into a regex.
 * @param key_list {Array} An array of strings that can be converted into regular expressions. Special characters must be escaped accordingly.
 */
function collapse_regex_or(key_list) {
    let keystr = "";
    for (let i = 0; i < key_list.length; i++) {
        keystr += key_list[i] + (i < key_list.length - 1 ? "|" : "");
    }

    return keystr;
}

// ~~~~~~~~~~~~~~~~~~~~ Unused functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
