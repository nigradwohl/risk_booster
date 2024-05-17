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
Der Impfstoff wird nach Angaben der beiden Unternehmen 2 mal im Abstand von 3 Wochen verabreicht. In der Altersgruppe der Über-65-Jährigen wurde 7 Tage nach der 2 Dosis eine Wirksamkeit von 94 Prozent ermittelt. Der Impfstoff sei von den Teilnehmern der weltweiten Studie gut vertragen worden, ernste Nebenwirkungen seien nicht beobachtet worden, berichteten die Unternehmen. Basis sind Angaben von mindestens 8000 zufällig ausgewählten Teilnehmern.

Bei der immer noch in zahlreichen Ländern laufenden Studie erhält eine Hälfte der insgesamt 43.000 Teilnehmer den Impfstoff, die andere Hälfte fungiert als Kontrollgruppe und bekommt ein Placebo-Mittel.

Bislang erkrankten den Angaben zufolge insgesamt 170 Teilnehmer an Covid-19. Davon entfielen nur 8 Fälle auf die tatsächlich geimpften Probanden, 162 Fälle wurden in der Placebo-Gruppe diagnostiziert. Daraus errechnet sich eine Wirksamkeit von rund 95 Prozent. Nach Angaben von Biontech und Pfizer gab es unter allen Covid-19-Erkrankungen 10 schwere Verläufe - 9 in der Kontroll- und einen in der Impfgruppe.

Slight reformulation:
Nur 8 Fälle ereigneten sich unter den tatsächlich geimpften Probanden, in der Kontrollgruppe wurden 162 Fälle diagnostiziert.

Nur 8 Fälle ereigneten sich unter den tatsächlich geimpften Probanden, in der Kontrollgruppe waren es 162.

Wer zum Selbstschutz eine Maske trägt, die dicht am Gesicht anliegt, der sei etwa 100-mal besser vor einer Infektion geschützt als ohne Maske.

41 % der weltweiten Studienteilnehmer und 45 % der amerikanischen Studienteilnehmer sind im Alter von 56 bis 85 Jahren.

Testcase 4:
In der Studie traten insgesamt 10 schwere COVID-19-Verläufe auf. Davon wurden 9 in der Placebogruppe und einer in der BNT162b2-Gruppe beobachtet. Bislang konnte das Data Monitoring Committee keine schwerwiegenden Nebenwirkungen feststellen. Eine Untersuchung der entblindeten Daten zur Impfstoffreaktion in einer randomisierten Subgruppe der finalen Phase-2/3-Analyse mit mindestens 8.000 der über 18-jährigen Probanden zeigte, dass der Impfstoff gut verträglich ist. Die meisten Nebenwirkungen traten nur vorübergehend auf. Die einzigen schweren Nebenwirkungen (3. Grades), die in mehr als 2 % der Probanden nach der ersten oder zweiten Impfung auftraten, waren Erschöpfung mit 3,8 % sowie Kopfschmerzen mit 2,0 % nach der zweiten Dosis.

Testcase percentages:
BNT162b2 zeigt in der primären Endpunktanalyse 28 Tage nach der ersten Impfung eine 95%ige Wirksamkeit gegen COVID-19; insgesamt traten 170 bestätigte COVID-19-Fälle auf, mit 162 Fällen in der Placebogruppe und 8 Fällen in der Impfstoffgruppe

41 % der weltweiten Studienteilnehmer und 45 % der amerikanischen Studienteilnehmer sind im Alter von 56 bis 85 Jahren.

Der Impfstoff wurde in allen Teilnehmerpopulationen gut vertragen, insgesamt nahmen 43.000 Probanden an der Studie teil; es wurden keine schwerwiegenden Nebenwirkungen festgestellt; die einzigen Nebenwirkungen dritten Grades die häufiger als 2 % auftraten, waren Erschöpfung mit 3,8 % und Kopfschmerzen mit 2,0 %

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
* color(?) code whether a display is good --> also differentiate between levels of "goodness"
* For mobile: split into 3 blocks?
* 1 block per topic (Prozentzahlen, relative Angaben etc.)

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


// Trigger the functionality:
$(document).ready(function () {

    // When the button is clicked, process and output the text:
    $("#check-text").on("click", function () {

        // INITIALIZE VARIABLES:
        let arr_li = new Set;  // create HTML for the list.


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // --------- TEXT INPUT AND PRE-PROCESSING --------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // console.log("Check my text");
        const rawText = $("#text-query").val(); // Get raw input text:

        // Pre-process input:
        console.log("Raw text:");
        console.log(JSON.stringify(rawText));

        // Get spaces before bullet points, not preceded by a fullstop and add the fullstop.
        const inputText = rawText
            .replaceAll(/(?<![.?!;])\s*\u2022/gm, ". \u2022")
            .replaceAll(/\.\n\./gm, ".\n\n");  // Replace stray changes.


        console.log("Pre-processed text text:");
        console.log(JSON.stringify(inputText));

        // Maybe replace missing punctuation here?

        // console.log(sentence_tokenizer(inputText));

        // console.log(word_tokenizer(inputText));
        // console.log(sentence_tokenizer(inputText).map(word_tokenizer));


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // --------- ANALYSIS OF TOKENIZED DATA -----------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        const token_dat = get_token_data(inputText);  // create tokenized data.

        // console.log("Initial token data:");
        // console.log(token_dat);

        // Get regex-based matches:
        const regex_matches = detect_regex_match(inputText, token_dat, check_numbers_dict);


        // Text-level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Add information to object:
        token_dat.add_column(regex_matches.match_id, "match");
        token_dat.add_column(regex_matches.match_type.map((x) => x !== -1 ? x.toString() : x), "unit");  // get unit info from regex matches.
        token_dat.add_number_info();  // add info about numbers.
        token_dat.detect_unit();  // get unti info from token data.

        // Detect topis:
        token_dat.detect_topic("impf", ["(?<!(gl|sch))[Ii]mpf"]);  // must be preceded
        token_dat.detect_topic("lower_risk", ["mindern", "Risiko"]);
        token_dat.detect_topic("cancer_risk", ["[Rr]isiko", "Krebs"]);  // must be preceded
        token_dat.detect_topic("cancer_drug", ["[Mm]edikament", "Krebs"])

        // Detect topic features:
        token_dat.detect_topic("eff", ["Nutz", "(?<!Neben)[Ww]irks(am|ung)", "Schutz",
            "geschützt"]);
        token_dat.detect_topic("side", ["Nebenwirk"]);
        // NOTE: Do not add specific side effects, because they may be effects (symptoms) in other contexts!
        token_dat.detect_topic("treatgroup", ["(Impf|Behandlungs)-?.*[Gg]ruppe"]);
        token_dat.detect_topic("controlgroup", ["(Kontroll|Placebo)-?.*[Gg]ruppe"]);


        // Number level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // Detect number types (may eventually need the topics to inform context names!):
        token_dat.detect_number_type(inputText);

        // Context detection:

        // NOTE: May also be applied to numbers that could not be identified so far!

        // For all numbers with non-.excluded units:
        const allnum_ix = token_dat.id.filter((d, ix) => token_dat.is_num[ix] && !units_exc.includes(token_dat.unit[ix]));
        const case_ix = token_dat.id.filter((d, ix) => token_dat.unit[ix] === "case");

        // Identify if numbers are total counts or refer to a subgroup:
        token_dat.add_column(investigate_context(token_dat, allnum_ix, window_keys.grouptype), "n_gtype");
        // Percentages MUST be subgroups by definition:
        token_dat.n_gtype = token_dat.n_gtype.map((x, ix) => token_dat.unit[ix] === "perc" ? "subgroup" : token_dat.n_gtype[ix]);

        // Do not apply the following to total numbers:
        const n_subgroup_ix = token_dat.id.filter((d, ix) => token_dat.n_gtype[ix] !== "total" && token_dat.n_gtype[ix] !== -1);
        token_dat.add_column(investigate_context(token_dat, n_subgroup_ix, window_keys.treat_contr), "n_trtctrl");
        token_dat.add_column(investigate_context(token_dat, n_subgroup_ix, window_keys.effside), "n_effside");
        // Note: Nutzen muss bei Verhaltensrisiken ggf. nicht unbedingt benannt werden (wenn es keinen ersichtlichen gibt)

        // Update missing information: ~~~~~~~~~~~
        // Absolute percentages (for now code as remainder that is not relative and see if it fails).
        token_dat.numtype = token_dat.numtype
            .map((ntype, ix) => token_dat.unit[ix] === "perc" && ntype.toString() === "other" ? "ABS" : ntype);


        console.log("Index of numbers with subgroup:");
        console.log(n_subgroup_ix);

        // Replace subgroup info:
        // TODO: Here we should eventually create informative labels for the tooltips!
        token_dat.numtype = token_dat.numtype
            .map((ntype, ix) => token_dat.n_gtype[ix] === "subgroup" && ntype.toString() === "N_CASE_TOT" ? token_dat.n_trtctrl[ix] : ntype);


        // Display for testing:
        console.log("Updated token data:");
        console.log(token_dat);
        console.log(`${token_dat.nrow} rows and ${token_dat.ncol} columns`);
        token_dat.print();  // print data from object.


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // -------------- HIGHLIGHTING --------------------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // Loop over tokens to highlight them:
        let cur_ix = 0;  // current index in original text.
        let procText = "";

        // Get rid of unidentified carryforward units:
        token_dat.unit = token_dat.unit.map((x) => x === "ucarryforward" ? -1 : x);

        // Loop over all tokens:
        for (let i = 0; i < token_dat.nrow; i++) {

            // console.log(i);
            let cur_unit = token_dat.unit[i];  // determine unit of current token.

            // console.log("current unit (is array: " + Array.isArray(cur_unit) + ")");
            // console.log(cur_unit);

            if (Array.isArray(cur_unit)) {
                cur_unit = cur_unit[0];  // for now take the first array element.
            }

            if (cur_unit !== -1 && !units_exc.includes(cur_unit)) {
                // Text prior to match:
                let text_pre = inputText.slice(cur_ix, token_dat.start[i]);

                // Get units and length:
                let match_len = 0;
                // let match = token_dat.token.slice(i);

                while (token_dat.unit[i + match_len] !== -1 && i + match_len < token_dat.nrow) {
                    // match = token_dat.token[i];
                    // i++;
                    // console.log(token_dat.token[i + match_len]);
                    match_len++;
                }

                // Get types for each tooltip from dictionary:
                let cur_numtype = token_dat.numtype.slice(i, i + match_len).filter((x) => x !== -1);
                // console.log(token_dat.numtype.slice(i, i + match_len));
                const cur_tooltip = unit_note_dict[cur_unit].tooltip[cur_numtype[0]];  // NOTE: currently first type only.

                // Token information:
                // console.log(token_dat.token[i] + "; Start: " + token_dat.start[i] + ", end: " + token_dat.end[i + match_len - 1] +
                //     ", match length: " + match_len + ", unit: " + cur_unit + ", numtype: " + cur_numtype);

                cur_ix = token_dat.end[i + match_len - 1] + 1;  // save index of final character to continue from there.

                procText += text_pre +
                    ('<div class="highlight-num tooltip">' +
                        inputText.slice(token_dat.start[i], cur_ix) +
                        '<span class="tooltiptext">' +
                        cur_tooltip +
                        '</span></div>');

                i += match_len;  // ensure to continue from next match.

            }

        }

        // Add remaining text to procText.
        procText += inputText.slice(cur_ix, inputText.length);

        // Handle breaks and lists:
        procText = procText.replaceAll(/\n\n/g, "<br><br>");
        procText = procText.replaceAll(/\u2022/g, "<br><br>\u2022  ");

        // console.log("Text after processing:");
        // console.log(procText);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Annotations: ---------------------------------------------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        let notes_html = "";  // initialize notes.

        // ~~~~~~~~~ TOPICS ~~~~~~~~~~~~~~~
        // Notes about topics:
        const key_topic_dict = {
            "impf": "Impfung",
            "cancer_risk": "Krebsrisiko",
            "lower_risk": "Risikominderung"
        };  // {"impf": "Impfung", "eff": "Wirksamkeit", "side": "Nebenwirkungen"};
        let key_topics_str = "";

        // Get the content-topics:
        const key_topics = Object.keys(key_topic_dict).filter((x) => token_dat.topics.includes(x));

        const n_topics = key_topics.length;
        let norisk = false;

        if (n_topics === 1) {
            key_topics_str += "Dieser Text behandelt das Thema " + key_topic_dict[key_topics[0]];
        } else if (n_topics > 1) {

            key_topics_str += "Dieser Text behandelt die Themen "
            key_topics_str += combine_str_arr(key_topics.map((x) => key_topic_dict[x]));

        } else {
            key_topics_str = "Das Thema dieses Textes konnte keinem Thema der Risikokommunikation zugeordnet werden.";
            norisk = true;
        }


        // ~~~~~~~~~~ FEATURES ~~~~~~~~~~~~~~~~

        // Notes about features (presence of effectivity and harm; reporting of comparison group):
        const feature_dict = {
            "eff": "Nutzen", "side": "Schaden",
            "treat": "Behandlungsgruppe", "contr": "Kontrollgruppe"
        };
        // let feature_arr = [];  // initialize array to be filled.


        let feature_list = "";

        /*
        Tests happen on 3 levels:
        1. Global text level: do certain keywords exist? (currently in OBJECT.topics)
        2. Global number level: do we have any numeric information on simple topics? (eff, side...)
        3. Local number level (interactions): are there numbers meeting multiple criteria (e.g., eff, eff x treatment)
         */

        let text_features = [];  // empty array for text features.

        // Get numbers related to risk communication for 2. and 3.:
        const risknum_ix = token_dat.id
            .filter((x) => ["perc", "case", "nh", "multi"].includes(token_dat.unit[x]) && token_dat.is_num[x]);
        console.log("Risknum indices:");
        console.log(risknum_ix);

        // Get each of these rows:
        const risknum_rows = risknum_ix.map((x) => token_dat.get_row(x));
        const risknums_flat = risknum_rows.flat();

        function check_any_arr(arrs, check_arr){return arrs.some((arr) => check_arr.every((x) => arr.includes(x)))};

        // 1. and 2. Global tests: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // List of keys; decide for each true/false and keep those that are true!
        const txtfeat_dict = {
            "any_risknum": risknum_ix.length > 0,
            "eff_num": risknums_flat.includes("eff"),
            "side_num": risknums_flat.includes("side"),
            "treat_num": risknums_flat.includes("treatment"),
            "contr_num": risknums_flat.includes("control"),
            // Interactions:
            "eff_treat_num": check_any_arr(risknum_rows, ["eff", "treatment"]),
            "side_treat_num": check_any_arr(risknum_rows, ["side", "treatment"]),
            "eff_contr_num": check_any_arr(risknum_rows, ["eff", "control"]),
            "side_contr_num": check_any_arr(risknum_rows, ["side", "control"]),
            "eff": this.eff_num || token_dat.topics.includes("eff"),
            "side": this.side_num || token_dat.topics.includes("side"),
            "treat": this.treat_num || token_dat.topics.includes("treatgroup"),
            "contr": this.contr_num || token_dat.topics.includes("controlgroup"),
            // Specific number info:
            "rel": ["REL", "mult"].some((x) => token_dat.numtype.includes(x)),  // tests if one of the elements exists.
            "rel_only": this.rel && !token_dat.numtype.includes("ABS") &&
                // Is there a row that fulfills both criteria?
                !check_any_arr(risknum_rows, ["case", "subgroup"]),
        };


        console.log("~~~~~~~~~~~~ Text features: ~~~~~~~~~~~~~~~~");
        console.log(txtfeat_dict);

        // Turn keys into array:
        const feature_arr = Object.entries(txtfeat_dict)
            .map(([key, value]) => value ? key : false)
            .filter(x => x);

        console.log(feature_arr);


        console.log("~~~~~~~~~~~~ Feedback on features: ~~~~~~~~~~~~~~~~");

        // Example feedback set:
        // Feedback as table etc?


        // ++++ HERE NOW +++
        console.log("+++ HERE NOW +++");


        // Feature sets for testing:
        const feature_set = {
            "eff_side": {
                "fset": ["eff", "side"],
                "zumzur": "zum "
            },
            "treat_control": {
                "fset": ["treat", "contr"],
                "zumzur": "zur "
            }
        }

        for (const [key, value] of Object.entries(feature_set)) {

            let feature_str = " Es ";


            // Get present features:
            let feats_present = value.fset.filter((feat) => feature_arr.includes(feat));
            let feats_missing = value.fset.filter((feat) => !feature_arr.includes(feat));
            feats_present = feats_present.map((key) => feature_dict[key]);
            feats_missing = feats_missing.map((key) => feature_dict[key]);
            console.log(`Features present and missing are:`);
            console.log(feats_present);
            console.log(feats_missing);


            if (feats_present.length > 1) {
                feature_str = "<i class=\"fa fa-thumbs-up in-text-icon good\"></i>" + feature_str;
                feature_str += " werden Informationen " + value.zumzur + feats_present.join(" und ") + " berichtet.";
            } else if (feats_present.length > 0) {
                feature_str = "<i class=\"fa fa-thumbs-down in-text-icon warning\"></i>" + feature_str;
                feature_str += " werden nur Informationen " + value.zumzur + feats_present.toString() + " berichtet. Es sollten auch Informationen " + value.zumzur + feats_missing + " berichtet werden.";
            } else {
                feature_str = "<i class=\"fa fa-thumbs-down in-text-icon error\"></i>" + feature_str;
                feature_str += " werden weder Informationen zu " + value.fset.map((key) => feature_dict[key]).join(" noch " + value.zumzur) + " berichtet.";
            }


            // Add to string:
            feature_list += "<li>" + feature_str + "</li>";
        }

        // Flag out the use of numbers: ~~~~~~~~~~~~~~~~~~~~~~~
        let feature_num = "<li>";
        const any_risk_num = ["perc", "cases", "nh", "multi"].filter((x) => token_dat.unit.includes(x));
        // console.log("Any risk num:");
        // console.log(token_dat.unit);
        if (any_risk_num.length > 0) {
            feature_num += "<i class=\"fa fa-thumbs-up in-text-icon good\"></i> Der Text scheint Zahlen zu den genannten Risiken zu berichten. </li><li>";


            // Differentiate numbers for control and treatment group:
            // Do numbers apply to treatment and control group
            // (or: affected and general population for other risks)

            // Differentiate: Does it report numbers only about effectivity? Also about side effects?
            const eff_num = feature_arr.includes("eff_num");
            const side_num = feature_arr.includes("side_num");

            if (eff_num && side_num) {
                feature_num += "<i class=\"fa fa-thumbs-up in-text-icon good\"></i> " +
                    "Sowohl zum Nutzen, als auch zum Schaden wurden Zahlen angegeben."
            } else if (eff_num || side_num) {
                feature_num += "<i class=\"fa fa-thumbs-down in-text-icon warning\"></i> " +
                    "Zahlen nur zu" +
                    (eff_num ? "r Nutzen" : " Schaden") +
                    " angegeben."
            } else {
                feature_num += "<i class=\"fa fa-thumbs-down in-text-icon error\"></i> " +
                    "Die Zahlen scheinen sich leider weder auf Nutzen naoch auf Schaden zu beziehen."
            }


            feature_num += "</li><li>";

            // Die Wirksamkeit wird (nicht) mit Zahlen aus Behandlungs- und Kontrollgruppe belegt.
            // Nebenwirkungen werden nicht für Behandlungs- und Kontrollgruppe angegeben
            let arr_eff_both = feature_arr.includes("eff_treat_num") && feature_arr.includes("eff_contr_num") > 0 ? ["<i class=\"fa fa-thumbs-up in-text-icon good\"></i>", ""] : ["<i class=\"fa fa-thumbs-down in-text-icon error\"></i>", "nicht erkennbar "];
            let arr_side_both = feature_arr.includes("side_treat_num") && feature_arr.includes("side_contr_num") ? ["<i class=\"fa fa-thumbs-up in-text-icon good\"></i>", ""] : ["<i class=\"fa fa-thumbs-down in-text-icon error\"></i>", "nicht erkennbar "];


            feature_num += arr_eff_both[0] + " Der Nutzen wird " + arr_eff_both[1] + "mit Zahlen für Behandlungs- und Kontrollgruppe belegt</li><li>";
            feature_num += arr_side_both[0] + " Die Schadenwirkung wird " + arr_side_both[1] + "für Behandlungs- und Kontrollgruppe angegeben";
            // Rather "Nur für" oä.

        } else {
            // ONLY NUMBERS: ~~~~~~~~~~~~~~~~~~~~~~~~
            feature_num += "<i class=\"fa fa-thumbs-down in-text-icon error\"></i> " +
                "Der Text scheint keine Zahlen zu den Risiken zu berichten. " +
                "Rein verbale Beschreibungen sollten vermieden werden. [LINK WIKI!]" +
                "Bitte versuchen Sie Zahlen zu berichten.";
        }

        // Only talks about numbers if the text talks about risK:
        if (!norisk) {
            feature_list += feature_num + "</li>";
        }


        // Combine the list of text features:
        feature_list = "<ul>" + feature_list + "</ul>";


        // Output topics:
        $("#text-note-general").html("<p id=\"text-note-general\">" + key_topics_str + "</p>");


        // List of notes on number types:
        for (const [key, value] of Object.entries(unit_note_dict)) {

            console.log(`Get number type info for ${key}:`);
            console.log(token_dat.unit.flat());

            if (token_dat.unit.flat().includes(key)) {
                console.log("Unit dict content:");
                console.log(value);

                let numtypes = Object.keys(value.tooltip)
                    .filter((key) => token_dat.numtype.includes(key))
                    .map((x) => value.tooltip[x]);
                console.log(numtypes);

                arr_li = arr_li.add(value.note(numtypes));
            }


        }


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

// Constants:
const pat_num = "(?:(?<![\\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,:][0-9]+)?))(?!\\\.[0-9A-Za-zÄÖÜäöüß]|[a-zA-Z0-9ÄÖÜäöüß])"

const regex_num = new RegExp("(?<unknown>" + pat_num + ")", "dg");  // regex to detect numbers; d-flag provides beginning and end!.
const regex_perc = new RegExp("(?<perc>" + pat_num + " ?(%|\\\-?[Pp]rozent)\\\w*(?=[\\s.?!])" + ")", "dg");
const regex_nh = new RegExp("(?<nh>" + pat_num + " (von|aus) " + pat_num + ")", "dg");
const regex_multi = new RegExp("(?<multi>" + pat_num + "[ \\-]?([Mm]al|[Ff]ach) (so )?( ?viele|groß|hoch|niedrig|besser)(?=[\\s.?!])" + ")", "dg");
// Note: in regex_nh we may also try to get the denominator as a group or as its own entity.
// nh must also be identified from tokens (e.g., In der Gruppe von 1000[case] Leuten sterben 4[num/case].

// Define units to not consider further:
const units_exc = ["age", "currency", "time", "date", "year", "duration", "legal"];

/*
Tests for simple units:

Das kostet 100 Euro und ist 50 Jahre alt.
Um 17 Uhr gehen wir bis 19:00 weg und kommen um 1.00 Uhr am 2.3.2021 heim.
Das steht so in §12 Artikel 13, Absatz 10.
 */

const check_numbers_dict = {
    "perc": {
        "regex": regex_perc,
        // "tooltip": "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
        // "note": "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
    },
    "nh": {
        "regex": regex_nh,
        // "tooltip": "Ich bin eine \"natürliche\" Häufigkeit",
        // "note": "Sie haben eine natürliche Häufigkeit verwendet. Das ist sehr gut. Am besten sollte der Nenner über Vergleiche der Gleiche sein (z.B. 1 aus 100 Geimpften erkrankt, während 3 aus 100 ungeimpften erkranken)."
    },
    // Multitude of something (e.g. 20-fach).
    "multi": {
        "regex": regex_multi
    },
    "multi2": {
        "regex": /(?<multi>([Hh]alb|[Dd]oppelt|[Dd]reifach|[Dd]reimal) so( ?viele|groß|hoch|niedrig|besser))/dg
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Simple matches:
    "age": {
        "regex": /(?<age>(\d+-? bis )*\d+([.|,]\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))/dg
    },
    // "age2": {
    //     "regex": RegExp("(?<age>" + pat_num + "( Jahre|\-jährig)" + ")", "dg")
    // },
    "currency_post": {
        "regex": RegExp("(?<currency>" + pat_num + " ?(EUR|€|Euro|Dollar)" + ")", "dg")
    },
    "currency_pre": {
        "regex": RegExp("(?<currency>" + "(USD|\$) ?" + pat_num + ")", "dg")
    },
    "time": {
        "regex": /(?<time>(\d{1,2}(\.\d{2})? Uhr)|(\d{1,2}:\d{2}))/dg
    },
    "date": {
        "regex": /(?<date>\d{1,2}\.\d{1,2}\.(18|19|20)\d{2})/dg
    },
    "yearrange": {
        "regex": /(?<year>(zwischen|von) (18|19|20)\d{2} (und|bis) (18|19|20)\d{2})/dg
    },
    "duration": {
        "regex": /(?<duration>[0-9]+(-stündig|-tägig| Minuten?| Stunden?| Tagen?| Wochen?))/dg
    },
    "legal": {
        "regex": /(?<legal>(Artikel|§|Absatz) ?\d+)/dg
    },
    // Carry-forward match:
    "carry_forward_pre": {
        "regex": RegExp("(?<ucarryforward>((waren|sind) es|[Dd]avon[^.]*) " + pat_num + "(?=\\W))", "dg")
    },
    "carry_forward_post": {
        "regex": RegExp("(?<ucarryforward>" + pat_num + " (waren|sind) es)", "dg")
    },
    // Default number match:
    "other_num": {
        "regex": regex_num,
        // "tooltip": "Ich weiß nicht, was ich für eine Zahl bin",
        // "note": "Sie haben eine Zahl verwendet, für die wir nicht bestimmen konnten, was sie bedeutet. Stellen Sie sicher, dass die Bedeutung der Zahl klar ist."
    }

}

//
const key_obj = {
    "REL": {
        "number_unit": "perc",  // add in other types eventually! 30-fach etc.
        "keyset": [
            // A first entry to a domain-general keyset for risk:
            [RegExp(collapse_regex_or(["Risiko", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle"])),
                RegExp(collapse_regex_or(["höher", "erhöht", "reduziert", "(ge|ver)ringert?"]))]
        ]
    },
    // Total nuber of cases/incidents:
    // NOTE: Order matters!
    "N_CASE_TOT": {
        "number_unit": "case",
        "keyset": [
            // TODO: Double check these!
            [RegExp("Fälle"), RegExp("insgesamt")]
        ]
    },
    "N_TOT": {
        "number_unit": "case",
        "keyset": [
            // TODO: Double check these!
            [RegExp("Proband|[Tt]eilnehme|Versuchspers|Menschen"), RegExp("insgesamt|Studie|umfass(t|en)")]
        ]
    },
    // Part of cases:
    "N_AFFECTED": {
        "number_unit": "case",
        "keyset": [
            [RegExp("[Ee]rkrankt|[Bb]etroffen")]
        ]
    }
    // Treatment and control:
    // "N_TREAT": {
    //     "number_unit": "case",
    //     "keyset": [
    //         [RegExp("(?!un)geimpft|behandelt")]
    //     ]
    // },
    // "N_CONTROL": {
    //     "number_unit": "case",
    //     "keyset": [
    //         [RegExp("[Ee]rkrank(t(en)?)|[Bb]etroffen")]
    //     ]
    // }
}

// The following should be its own (because numbers belong to a category and can be an approximation)
// "APPROX": {
//     "number_unit": "perc",  // ACTUALLY ALSO OTHERS?
//     "keyset": []
//     // Pattern would be "mehr/weniger als; ungefähr" --> percent, nh or also cases!
// },

// Additional set for vaccination topic:
const keyset_impf = [[RegExp(collapse_regex_or(["([Ww]irk(sam|t))", "[Ee]ffektiv"]))]];


// Detect the matches in token set:
const unit_note_dict = {
    "perc": {
        "tooltip": {
            "ABS": "absolute Prozentzahl",
            "REL": "relative Prozentzahl",
            "other": "andere Prozentzahl"
        },
        "note": function (type_arr) {

            let types = ""
            if (type_arr.length === 1) {
                types = type_arr.toString() + "en"
            } else if (type_arr.length === 2) {
                types = type_arr.join("en und ") + "en";
            } else {
                const last = type_arr.pop();
                types = type_arr.join("en, ") + " und " + last + "en";
            }

            let txt_out = "Der Text verwendet ";

            if (type_arr.includes("relative Prozentzahl")) {
                if (type_arr.length === 1) {
                    txt_out += "nur " + types + ". <a href=\"risk_wiki.html#wiki-rel\">Relative Angaben</a> ohne Basisrisiko sollten vermieden werden.";
                } else {
                    txt_out += types + ". ";
                }

                txt_out += "Achten Sie darauf, dass Sie auch die <strong>absoluten Wahrscheinlichkeiten in den Gruppen berichten</strong> -- " +
                    "am besten als <a href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> (d.h., 3 aus 1000 oä.).";

            } else {
                txt_out += `${types}. Achten Sie darauf, dass klar ist auf welche Größe sich die <a href=\"risk_wiki.html#wiki-prozent\">Prozentangabe</a> bezieht.`
            }

            return txt_out;

        }
    },
    "nh": {
        "tooltip": {
            "other": "Natürliche Häufigkeit"
        },
        "note": function (type_arr) {
            return "Der Text enthält Natürliche Häufigkeiten. Sehr gut! Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
        }
    },
    "case": {
        "tooltip": {
            "other": "Personen oder Fälle",
            "N_TOT": "Gesamtzahl an Personen",
            "N_AFFECTED": "Gesamtzahl Betroffene (Erkrankte)",
            "N_CASE_TOT": "Gesamtzahl Betroffene (Erkrankte)",
            "treatment": "Anzahl unter den Behandelten",
            "control": "Anzahl in der Kontrollgruppe"
        },
        "note": function (type_arr) {
            return "Der Text enthält Anzahlen von Fällen. Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
        }
    },
    "multi": {
        "tooltip": {"other": "Relative Angabe"},
        "note": function (type_arr) {
            return "Der Text enthält relative Vergleiche (10-mal so groß, halb so groß)." +
                "Bitte achten Sie darauf, auch die absoluten Risiken in jeder Gruppe anzugeben -- am besten als natürliche Häufigkeit " +
                "(z.B., unter denen ohne Impfung steckten sich 2 aus 1000 an unter den geimpften nur 1 aus 1000)."
        }
    },
    // Unidentified matches:
    "unknown": {
        "tooltip": {"other": "Konnte nicht identifiziert werden"},
        "note": function (type_arr) {
            return "Einige Zahlen konnten nicht identifiziert werden."
        }
    }
}


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

        // console.log(`Colwidths and -names of ${this.ncol} columns:`);
        // console.log(colwidths);
        // console.log(this.colnames);

        // Possible feature: Column alignment (change padding fron/end)
        for (let ix_token = -1; ix_token < this.nrow; ix_token++) {

            const currow = ix_token > -1 ? this.get_row(ix_token) : this.colnames;
            let rowstr = "";


            for (let ix_col = 0; ix_col < this.ncol; ix_col++) {

                // Display info side by side:
                rowstr += currow[ix_col].toString().padEnd(colwidths[ix_col] + 2);
            }

            // Output row:
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
        if (this.colnames.includes("unit")) {
            // If there already was a unit column replace it:
            this.unit = detect_unit(this);
        } else {
            this.add_column(detect_unit(this), "unit");
        }

    }

    // Method to detect topic information:
    detect_topic(topic, key_list) {
        // Eventually we may wnt to do this on the level of sentences or paragraphs; for now we judge the whole text.
        // These topics may inform also keywords (Impfung may make "schwerer Verlauf" relevant etc.
        // This will imply some tree structures -- our non-random grove.

        let topic_present = false;

        const regex = RegExp(collapse_regex_or(key_list), "g");
        // console.log(regex);

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
    detect_number_type(txt) {
        this.add_column(detect_number_type(this, txt), "numtype");
    }
}


/**
 * Output of token data from function
 * @return {Object}     Object containing word and punctuation tokens from a text and their positions.
 * @param text {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function get_token_data(text) {

    const text_tokens = word_tokenizer(text);  // Define the text as word and punctuation tokens.
    // console.log(text_tokens);  // for testing.

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
        if (["\\n\\*", ".", ":", ";", ",", "?", "!", "(", ")", "/"].includes(token_i)) {
            // Punctuation follows somewhat different rules.
            // NOTE: Overlaps with other entities, likely because of the lack of spaces.

            // Escape and add lookahead or behind.
            if (["("].includes(token_i)) {
                token_pat = "(?<=\\s|\\n|^)" + token_i.replace(/([.?()/])/dgm, "\\$1");
            } else {
                token_pat = token_i.replace(/([.?()/])/dgm, "\\$1") + "(?=\\s|\\n|$|\\.|,)";
            }

        } else {
            token_pat = "(?<!\\w)" + token_i + "(?!\\w)";
        }
        const token_rex = RegExp(token_pat, "gm");  // global needed for exec to work and m to match across multiple lines
        // console.log(token_rex);

        // Set index to search from to previous index:
        token_rex.lastIndex = tpos_end[tpos_end.length - 1];  // tpos_start[ix_prev] + text_tokens[ix_prev].length;
        curpos = token_rex.exec(text).index;

        // Save start and end positions of token:
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
let testcount = 0;

// ~~~~~~~~~~~~~~~~~~~ PROCESSING FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Tries to detect the type of each number by using its unit and additional context information
 * @return {Array}     An array of number types for numeric token data
 * @param token_data {Object} A token data object with information about numbers.
 * @param txt {String} The text corresponding to the token data, allowing to detect matches.
 */
function detect_number_type(token_data, txt) {

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

    // Update the keyset:
    console.log("Current keyset:");
    console.log(key_obj);

    // Include topic-specific keywords:
    if (token_data.topics.includes("impf")) {
        // Include Impf-specific keys
        // Do so as an inclusive disjunction.
        key_obj.REL.keyset = key_obj.REL.keyset.concat(keyset_impf);
        // testcount++;
    }

    // Detect matches that are indicative of certain data types:
    const relation_dict = {
        "treatre_pre": {
            "regex": /(?<treatment>(\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}geimpften (Proband\w+|Teilnehm\w+)))/dg  // (\w+ ){0,2} are up to 2 more words.
            // / (auf die tatsächlich geimpften (Proband\w+|Teilnehm\w+))/
        },
        "controlrel_pre": {
            "regex": /(?<control>\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(in der|unter den (Teilnehme\w+ |Proband\w+){,2} der|auf die (Teilnehme\w+ |Proband\w+){,2}) (Kontroll|Placebo)-?[Gg]ruppe)/dg
        },
        "treatre_post": {
            "regex": /(?<treatment>((auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}geimpften (Proband\w+|Teilnehm\w+)) ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2})/dg  // (\w+ ){0,2} are up to 2 more words.
            // / (auf die tatsächlich geimpften (Proband\w+|Teilnehm\w+))/
        },
        "controlrel_post1": {
            "regex": /(?<control>(auf die|unter den) (Teilnehme\w+ |Proband\w+){,2} ([a-zA-ZÄÖÜßäöü]+ ){1,2}(Kontroll|Placebo)-?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2})/dg
        },
        "controlrel_post2": {
            "regex": /(?<control>in der (Kontroll|Placebo)[- ]?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+( [a-zA-ZÄÖÜßäöü]+){0,2})/dg
        }
    }

    const ref_matches = detect_regex_match(txt, token_data, relation_dict);

    console.log("Reference matches");
    console.log(ref_matches);

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
            // console.log("Tokens in sentence and their numeric info:");
            // console.log(sentence_tokens);
            // console.log(num_info);
            // console.log(sentence_units);
            // Issue is that we want to use regular expressions, which do not work so well on arrays!

            // Loop over tokens in sentence; maybe also use a token ID to assign number values?

            // Get positions of numbers:
            console.log("Number positions");
            // console.log(token_ids.filter((d, ind) => num_info[ind]));
            const num_array = token_ids.filter((d, ix) => num_info[ix]);
            console.log(num_array);

            for (const num of num_array) {
                const curnum_id = token_data.id[num];  // Get global ID of current number in sentence.
                // console.log(num + ", " + curnum_id + ", unit: " + token_data.unit[curnum_id]);

                // Check for type:
                let numtype = "other";

                // console.log("Current key_obj:");
                // console.log(key_obj);

                for (const [key, value] of Object.entries(key_obj)) {

                    console.log(`Data judged for key ${key}:`);
                    console.log(`Token: ${token_data.token[curnum_id]}, Unit: ${token_data.unit[curnum_id]}`);
                    // console.log(value);

                    // Check for the number type to select whether the number type (cases, percentage...) applies:
                    if (token_data.unit[curnum_id].includes(value.number_unit)) {
                        // Note: may also apply to other number types like
                        // "30-faches Risiko", "das Risiko ist zweimal so hoch"
                        // console.log("It's a percentage!");

                        // const keyset = value.keyset;  // Get keyset from object.

                        // console.log("Current keyset:");
                        // console.log(keyset);

                        // Test the keyset for rrr:
                        const keys_present = value.keyset
                            .map((keylist) => keylist  // got through all sublists.
                                .filter((keyex) => sentence_tokens  // check each expression.
                                    // ... in the sentence tokens:
                                    .filter((token) => keyex.test(token)).length > 0).length === keylist.length);

                        // Maybe: find cue-words (in, unter etc.) and then check for in/unter what.

                        // Check each token:
                        // const key_present = sentence_tokens.filter((x) => keyrex.test(x));
                        // console.log(`Keys from ${key} present in sentence:`);
                        // console.log(keyset);
                        // console.log(keys_present);

                        /*
                         Implement:
                         - parse in some order? (first ahead, then back; turn around on comma?)
                         - successively grow larger (sub-sentence, sentence, paragraph)s
                         */


                        // If all keys in one of the keysets are present, assign the corresponding flag:
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

                // Check number if numtype remained other:
                if (numtype === "other") {

                    console.log("Sentence tokens");
                    console.log(sentence_tokens);

                    // console.log(`Number match from regex (num = ${num})`);
                    // console.log(ref_matches.match_type[num]);

                    if (ref_matches.match_type[num].length > 0) {
                        numtype = ref_matches.match_type[num];
                    }

                }

                // Assign the numtype to the corresponding number token!
                num_types[curnum_id] = numtype;


            }

        }


        // Update last token:
        prev_token = final_token;

    }


    // OUTPUT: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    console.log("Output numtypes:");
    console.log(num_types);
    return num_types;

}

/**
 * Sets of keys to be used with window approach.
 */
const window_keys = {
    "grouptype": {
        "total": RegExp(collapse_regex_or(["insgesamt", "alle_", "Basis"]), "dg"),
        "subgroup": RegExp(collapse_regex_or(["[Ii]n_", "[Uu]nter_", "[Dd]avon_",
            "der\\w*[Tt]eilnehmer", "entfielen\w*auf"]), "dg")
    },
    "treat_contr": {
        // Types of subgroups:
        "control": RegExp(collapse_regex_or(["Kontroll-?\\w*[Gg]ruppe", "Placebo-?\\w*[Gg]ruppe"]), "dg"),
        "treatment": RegExp(collapse_regex_or(["[Gg]eimpfte?n?", "Impf-?\\w*[Gg]ruppe",
            "[Tt]eilnehmer|Probanden.*Impfung"]), "dg"),
        "all": RegExp(collapse_regex_or(["[Tt]eilnehmer", "Probanden"]), "dg")
    },
    "effside": {
        "eff": RegExp(collapse_regex_or(["(?<![Nn]eben)[Ww]irk", "Impfschutz",
            "Schutz", "geschützt",
            // The following may only apply to vaccination? (But likely also to treatment!)
            "Infektion", "[Ee]rkrank", "Verl[aä]uf"]), "dg"),
        "side": RegExp(collapse_regex_or(["Nebenwirk", "Komplikation"]), "dg"),  // more keywords?
    },
    "incr_decr": {
        "risk_incr": RegExp(collapse_regex_or([
            "(Risiko|Wahrscheinlichkeit)\\w*(erhöht|steigt)",
            "(erhöht|steigt)\\w*(Risiko|Wahrscheinlichkeit)"]), "dg"),
        "risk_decr": RegExp(collapse_regex_or([
            "(Risiko|Wahrscheinlichkeit)\\w*sinkt|verringert",
            "sinkt|verringert\\w*(Risiko|Wahrscheinlichkeit)",
            "schütz(en|t)\\w*(Erkrankung|Ansteckung)"]), "dg")
    },
    "verbs": {
        // Verbs:
        "ill": RegExp(collapse_regex_or(["erkrank(t|en)", "Verl[äa]uf"]), "dg")
    }

}


/**
 * Investigates a contex window around numbers or other entities
 * @return {Array}     An array including information about elements of token based on surrounding words defined in keyset.
 * @param token_data {Object} A token data object with information about numbers.
 * @param index_arr {Array} An array of indices corresponding to the token data, indicating which elements should be considered.
 * @param keyset {Object} An object with named keysets determining the classes assigned.
 */
function investigate_context(token_data, index_arr, keyset) {

    let context_info = Array(token_data.nrow).fill(-1);  // was: "none"

    // Back to text level:
    /*
        Context-window approach (number-centric):
        1. Get the number
        2. Identify a useful split (comma --> subsentence > fullstop --> sentence > \n --> paragraph)
        3. Check for informative unit within split
        4. If none is found, move on to next split and check if informative keyword-combinations occur
        5. If ambiguous (more than one unit after concat: use disambiguation strategy (e.g., overall matches)

        Identify keywords indicative of
        - subgroups (e.g., "davon"/"unter" + "Geimpfte"/"Kontrollgruppe") vs. full groups ("insgesamt")
        - what is counted ("cases" etc. --> unit!)
        - what happens (VERBs like "erkranken")

        GOAL: Use as little information as possible.

        1. Check between stop tokens (punctuation)
        2. Try to get a description that is as complete as possible --> only move beyond punctuation if incomplete
    */
    // Get positions of numbers:
    // console.log("~~~~~~~~~~~ Context-window approach: ~~~~~~~~~~~~~ ");

    // Keyword dict:
    // Search subgroup keywords (in, unter ...) and non-subgroup keywords (insgesamt ...):
    // const key_total = RegExp(collapse_regex_or(["insgesamt"]));
    // const key_sub = RegExp(collapse_regex_or(["in", "unter"]));
    // // What is the subgroup? (treatment, control, all cases ...)
    // const key_group = RegExp(collapse_regex_or(["Kontroll-?gruppe", "[Gg]impfte?n?"]));
    // const key_verb = RegExp(collapse_regex_or(["erkrank(t|en)"]))
    // // Maybe also distinguish "waren" vs. "sich ereignen"


    // console.log("Testing keyset:");
    // console.log(keyset);

    // // console.log(token_ids.filter((d, ind) => num_info[ind]));
    // const num_array_all = token_data.id.filter((d, ix) => token_data.is_num[ix] && !units_exc.includes(token_data.unit[ix]));
    // console.log(index_arr);

    // const tokens = token_data.token;


    // For each number query:
    for (const token_ix of index_arr) {

        // // console.log("-------- NEW TOKEN --------");
        // console.log(`+++ Token number ${token_ix}: ${tokens[token_ix]} +++`);

        // PREPARE THE WINDOW: ~~~~~~~~~~~~~~
        let testcounter = 0;  // testcounter to avoid infinite loops!

        // Define the absolute maximum:
        const min_start = 0;
        const max_end = token_data.nrow;  // could also be sentence end!

        // Note: One could additionally implement a list of "locks":
        let lock_start = token_ix;  // 0;
        let lock_end = token_ix + 2;  // token_data.nrow;
        // could also be relative to token, e.g., start at 0 tokens before and 2 after, the increase the rage based on some rules!

        let numberfeats = new Set();
        let key_info = {};

        // Initialize flag for having encountered stop-tokens:
        let stop_tokens = ["\\n", ".", "?", "!", ":", "oder", "und", ";", ",", "-"];  // renew for each number!
        let stop_token_start = false;
        let stop_token_end = false;
        let stop_update_count = 0;

        let description_complete = false;  // initialize condition for complete description.

        // Window prior to number:
        let window_start = token_ix;
        let window_end = token_ix;

        // OPEN THE WINDOW: ~~~~~~~~~~~~~~~~
        while (!description_complete && (lock_start > min_start || lock_end < max_end)) {

            // console.log(`Token ${token_ix}, lock start: ${lock_start}, lock end: ${lock_end}; range before: ${token_ix - lock_start}, range after: ${lock_end - token_ix}, current stop tokens: ${stop_tokens.join(" ")}`);

            while (window_start > lock_start) {
                window_start--;
                // Log if a stop token was encountered:
                if (stop_tokens.includes(token_data.token[window_start])) {
                    stop_token_start = true;
                    break;
                }

            }
            while (window_end < lock_end) {
                window_end++;
                if (stop_tokens.includes(token_data.token[window_end])) {
                    stop_token_end = true;
                    break;
                }
            }

            // As for-loop:
            // for (window_start = token_ix - 1; !stop_tokens.includes(token_data.token[window_start]) && window_start > lock_start; window_start--) {
            //
            //     let cur_pre = tokens[window_start];
            //
            //     console.log(cur_pre);
            //     // window_start--;
            //     // Either loop here or combine all and then test re-connected string!
            //     for (const [key, value] of Object.entries(window_keys)) {
            //         if (value.test(cur_pre)) {
            //             arr_num_feat = arr_num_feat.concat(key);
            //         }
            //     }
            //
            //
            // }

            // Visualize the list of tokens:
            const test_tokens = token_data.token.slice(window_start, window_end);
            const test_str = test_tokens.join("_");
            // Issue could be that underscore counts as word character; will exploit this for now!!
            // console.log(test_tokens);
            // console.log("TESTSTRING:\n" + test_str);

            // Test the tokens here:
            // Here we should define sets that exclude each other! (e.g., control + treatment)
            for (const [key, value] of Object.entries(keyset)) {
                // console.log("TESTING KEYS");
                // Also log nearest distance and number of iterations?

                const match = value.exec(test_str);  // test_str.search(value);

                if (match !== null) {

                    if (!numberfeats.has(key)) {
                        key_info[key] = [match.indices, testcounter];  // match positions in teststring and iteration.
                        // console.log(key_info);
                    }
                    numberfeats = numberfeats.add(key);
                }
            }

            // Test co-occurrence patterns in window?
            // const keys_present = value.keyset
            //     .map((keylist) => keylist  // got through all sublists.
            //         .filter((keyex) => sentence_tokens  // check each expression.
            //             // ... in the sentence tokens:
            //             .filter((token) => keyex.test(token)).length > 0).length === keylist.length);

            // If it does not work: remove the first stop token (","); remove numbers for which it worked!

            // console.log("Description of number as set:");
            // console.log(numberfeats);


            // console.log(`Stop token at start: ${stop_token_start}, at end: ${stop_token_end}`);

            // Update the stop tokens:
            if ((stop_token_start && stop_token_end) || (stop_token_end && lock_start === min_start) || (stop_token_start && lock_end === max_end)) {
                // console.log("UPDATE STOP TOKENS");
                stop_tokens.pop();  // remove the last stop token and retry.
                // When both are at the end, reset them.
                stop_token_start = false;
                stop_token_end = false;
                stop_update_count++;
            }

            // if ((stop_token_end && lock_start === min_start) || (stop_token_start && lock_end === max_end)) {
            //     console.log("UPDATE STOP TOKENS when one window is at the end");
            //     stop_tokens.pop();  // remove the last stop token and retry.
            // }

            // Extend the window:
            // Possible extension: Asymmetric updating (dependent on context words -- e.g., we will want to know what happens after "in").
            // Do before or after stop tokens?
            lock_start = !stop_token_start && lock_start > min_start ? lock_start - 1 : lock_start;
            lock_end = !stop_token_end && lock_end < max_end ? lock_end + 1 : lock_end;


            // conditions for completeness:
            // Note: Currently a dummy condition!
            // MAYBE: Require at least one update of stop tokens to make it greedy? stop_update_count > 0
            // If one category could be clarified, exclude it?

            if (Object.keys(keyset).filter((x) => numberfeats.has(x)).length > 0) {
                // console.log("FINAL TESTSTRING:\n" + test_str);
                // console.log(test_tokens);
                // console.log("DESCRIPTION COMPLETE");
                description_complete = true;

                // console.log(numberfeats);

            }

            // Fix a maximum number of iterations to avoid breakdown!
            if (testcounter > 50) {
                // console.log("BREAK DESCRIPTION");
                description_complete = true;
                // console.log(numberfeats);
            }

            testcounter++;  // should maybe remain implemented!

            // console.log(`Token ${token_ix}, range before: ${token_ix - lock_start}, range after: ${lock_end - token_ix}, current stop tokens: ${stop_tokens.join(" ")}`);

            // console.log(`Start ${lock_start} is min: ${lock_start <= min_start}, End ${lock_end} is max: ${lock_end >= max_end}`);

            // Break if at the end of the text!
            // if (lock_start === 0 && lock_end === token_data.nrow) {
            //     break;
            // }
        }

        // Assign the information to the data:
        context_info[token_ix] = Array.from(numberfeats).toString();


    }

    return context_info;
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
        [/Teilnehm|F[aä]ll|Proband|Mensch|Verl[aä]uf/, "case"]  // frequencies.
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
                // console.log("Cur info: " + cur_info + ", " + cur_info.length);
                if (cur_info.length > 0 && (unit_info[ix_tok] === -1 || unit_info[ix_tok].includes("unknown"))) {
                    // If there is a match or only an unspecified number from matching is contained, update.
                    // unit_info[ix_tok] = cur_info;

                    // Fill in Info to all before:
                    let n_ele = ix_nxt - ix_tok + 1;
                    unit_info.splice(ix_tok, n_ele, Array(n_ele).fill(cur_info));
                    unit_info = unit_info.flat();
                    // console.log(unit_info);
                }

                // Here we could also add to ambiguous unit info!


            }

            // Function to count consecutive values:
            const range = (start, stop, step) =>
                Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);

            function countReps(array) {
                let result = [];
                let begins = [];  // vector for begins.

                let counter = 1;  // initialize counter.
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === array[i + 1]) {
                        counter++;
                    } else {
                        result = result.concat(Array(counter).fill(counter));// += array[i] + counter;
                        begins = begins.concat(Array(counter).fill(i - counter + 1));
                        counter = 1;
                    }
                }
                return {"counts": result, "begins": begins};
            }


            // If no info was found:
            if (unit_info[ix_tok] === -1) {

                unit_info[ix_tok] = "unknown";

            } else if (unit_info[ix_tok] === "ucarryforward") {

                // Number and beginnings of each streak of replacements.
                const n_reps = countReps(unit_info);

                // console.log("Count repetitions:");
                // console.log(n_reps);

                // console.log("Carrying forward...");
                // console.log("[" + unit_info.toString() + "]");
                // carry previous unit forward f exists:

                const prev_info = unit_info.slice(0, ix_tok - 1);
                // console.log("Previous info");
                // console.log(prev_info);


                const prev_units = prev_info.filter((x) => x !== -1 && x !== "ucarryforward");
                // unit_info[ix_tok] = prev_units[prev_units.length - 1];
                // console.log("Previous units");
                // console.log(prev_units.toString() + ", unit prev: " + prev_units[prev_units.length - 1].toString());


                unit_info.splice(n_reps.begins[ix_tok], n_reps.counts[ix_tok], Array(n_reps.counts[ix_tok]).fill(prev_units[prev_units.length - 1]));
                unit_info = unit_info.flat();
                // // console.log(unit_info);
            }

        }
    }

    // Output:
    // console.log("Unit info");
    // console.log(unit_info);
    return unit_info;


}

/**
 *
 */
function detect_regex_match(txt, token_dat, check_dict) {
    let arr_match = [];

    // Loop over dictionary with rules:
    for (const [key, value] of Object.entries(check_dict)) {
        // console.log(`${key} ${value["note"]}`); // "a 5", "b 7", "c 9"


        // Variant with exec:
        const matches = get_regex_matches(txt, value["regex"]);

        // console.log(`Raw matches for ${key}:`);
        // console.log(matches);

        arr_match = arr_match.concat(matches);

    }

    // Clean up the matches from all for redundancy:
    // console.log("Match objects:");
    // console.log(arr_match);
    // If a match is fully included in another, the match can be removed.
    // There is also some hierarchy (undefined numbers should only be output when

    // Add the matches to the text data:
    let token_match = Array(token_dat.token.length).fill(-1);
    let match_type = Array(token_dat.token.length).fill(-1);

    let i = 0;
    let droplist = [];

    for (let match of arr_match) {
        // console.log(match.start_end);

        // For a token to be part of a match, the following conditions must be fulfilled:
        // Match start must be greater or equal than token start and smaller than token end
        let match_start = token_dat.start.findIndex(x => x >= match.start_end[0] && x < match.start_end[1]);
        // Match end must be smaller or equal to token end and larger than token start
        // Search from the back!
        let match_end = token_dat.end.findLastIndex(x => x <= (match.start_end[1] - 1) && x > match.start_end[0]);

        console.log("Match start and end: " + match_start + ", " + match_end);
        console.log(match);

        // If one of the idices can be found:
        if (match_start !== -1 || match_end !== -1) {
            let match_id = -1;
            let cur_type = -1;

            if (match_end === -1) {
                match_end = match_start;
            }

            if (match_start === -1) {
                match_start = match_end;
            }

            const n_ele = match_end - match_start + 1;

            if (token_match[match_start] === -1 && token_match[match_end] === -1) {
                match_id = [i];
                cur_type = match.type;

            } else if (match.type[0] !== "unknown") {

                // console.log("Match type");
                // console.log(match.type);
                // Note: If we can establish a clear hierarchical structure, we could drop the match here:
                // arr_match.splice(i);
                droplist = droplist.concat(i);
                const prev_ix = token_match[match_start]

                match_id = prev_ix.concat(i)
                cur_type = match.type;  // might also concat...

                // Also amend the previous match to include the other type?
                arr_match[prev_ix[0]].type = arr_match[prev_ix[0]].type.concat(match.type);

            } else {
                droplist = droplist.concat(i);
            }

            if (cur_type !== -1) {
                // Update the data when anything could be found:
                // console.log(`Replacing ${n_ele} elements with matchtype ${cur_type}`);
                token_match.splice(match_start, n_ele, Array(n_ele).fill(match_id));
                token_match = token_match.flat();
                match_type.splice(match_start, n_ele, Array(n_ele).fill(cur_type));
                match_type = match_type.flat();
            }

        }


        // if (match_start !== -1) {
        //     if (token_match[match_start] === -1) {
        //         token_match[match_start] = [i];
        //         match_type[match_start] = match.type;
        //     } else if (match.type[0] !== "unknown") {
        //         console.log("Match type");
        //         console.log(match.type);
        //         // Note: If we can establish a clear hierarchical structure, we could drop the match here:
        //         // arr_match.splice(i);
        //         droplist = droplist.concat(i);
        //         const prev_ix = token_match[match_start]
        //
        //         // Also amend the previous match to include the other type?
        //         arr_match[prev_ix[0]].type = arr_match[prev_ix[0]].type.concat(match.type);
        //
        //         // Add index:
        //         token_match[match_start] = prev_ix.concat(i);
        //
        //     }
        //
        // }
        // if (match_end !== -1) {
        //
        //     if (token_match[match_end] === -1) {
        //         token_match[match_end] = [i];
        //         match_type[match_end] = match.type;
        //     } else if (match.type[0] !== "unknown") {
        //         // Note: If we can establish a clear hierarchical structure, we could drop the match here:
        //         // arr_match.splice(i);
        //         droplist = droplist.concat(i);
        //
        //         const prev_ix = token_match[match_end]
        //
        //         // Also amend the previous match to include the other type?
        //         arr_match[prev_ix[0]].type = arr_match[prev_ix[0]].type.concat(match.type);
        //
        //         // Add index:
        //         token_match[match_end] = prev_ix.concat(i);
        //     }
        // }

        // Increment match ID:
        i++;

    }

    // console.log("Match data (raw):");
    // console.log(arr_match);

    // Remove the indices that have to be dropped:
    arr_match = arr_match.filter((ele, index) => !droplist.includes(index));

    // Sort the array by the starting position of each match:
    arr_match = arr_match.sort((a, b) => a.start_end[0] - b.start_end[0]);

    // console.log("Match data (cleaned):");
    // console.log(arr_match);
    // console.log(token_match);
    // console.log(match_type);

    // Is it more efficient to check for the matches or the tokens?
    // Likely the matches, because there are fewer by design!
    return ({"arr_match": arr_match, "match_id": token_match, "match_type": match_type})

}


/**
 * Splits a text into an array of words and punctuation
 * @return {Array}     An array of words (as defined by space delimiters)
 * @param txt {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function word_tokenizer(txt) {

    // console.log(txt);

    const split = txt
        .replace(/([.,;?!:)])(?=\s)/g, ' $1')  // Ensure that punctuations becomes their own by adding a space before.
        .replace(/([.,;?!:])(?=$)/g, ' $1')
        .replace(/([)])/g, ' $1')  // space before any parenthesis.
        .replace(/((?<=\s)[(])/g, '$1 ')  // space after opening parentheses.
        .split(/[\s\u2022]/g);

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

        // console.log(match);

        if (match.groups === undefined) {
            console.log(match.groups);
            throw new Error("No group provided. Please provide a regex with a named group using (?<GROUPNAME>REGEX).")
        }

        // If a group was provided check if it is orderly:
        const key = Object.keys(match.groups);

        if (key.length > 1) {
            throw new Error("More than one group provided. Please provide a regex with a single named group using (?<GROUPNAME>).")
        }

        // console.log("Key:");
        // console.log(key);

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

/**
 * Combine an array into a string that is separated by commas or and, based on its length.
 * @return {String} Returns a string separated as an enumeration.
 * @param arr {Array} An array of strings.
 */
function combine_str_arr(arr) {
    const arr_len = arr.length;
    let output = "";

    for (let i = 0; i < arr_len; i++) {
        if (i < arr_len - 1) {
            output += arr[i] + (i === arr_len - 2 ? " und " : ", ");
        } else {
            output += arr[i] + ".";
        }

    }

    return output;
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
