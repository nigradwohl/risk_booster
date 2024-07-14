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

        // INITIALIZE OBJECTS and ARRAYs (that may be modified):
        /**
         * Array of units that should not be considered further
         * @type {string[]}
         */
        let units_exc = ["age", "currency", "time", "date", "year", "dur", "legal", "medical", "enum", "misc", "rank", "phone"];

        /**
         * Object that is looped over to check for units.
         * @type {{date: {regex: RegExp}, dur: {regex: RegExp}, medical: {regex: RegExp}, mult: {regex: RegExp}, pval: {regex: RegExp}, currency_pre: {regex: RegExp}, year: {regex: RegExp}, yearrange: {regex: RegExp}, year2: {regex: RegExp}, year3: {regex: RegExp}, perc: {regex: RegExp}, freq_word: {regex: RegExp}, currency_post: {regex: RegExp}, legal: {regex: RegExp}, datemon: {regex: RegExp}, carry_forward_pre: {regex: RegExp}, yearnum: {regex: RegExp}, other_num: {regex: RegExp}, misc: {regex: RegExp}, medical_post: {regex: RegExp}, perc_word: {regex: RegExp}, enum: {regex: RegExp}, mult2: {regex: RegExp}, carry_forward_post: {regex: RegExp}, nh: {regex: RegExp}, confint: {regex: RegExp}, time: {regex: RegExp}, age: {regex: RegExp}, monyear: {regex: RegExp}, dur2: {regex: RegExp}}}
         */
        const check_numbers_dict = {
            "perc": regex_perc,
            "perc_word": RegExp("(?<perc>(" + collapse_regex_or(numwords) + ") ?(%|\\\-?[Pp]rozent)\\\w*(?=[\\s.?!])" + ")", "dg"),
            "freq_word": regex_numwords,
            "nh": regex_nh,
            "nh2": regex_nh2,
            // multtude of something (e.g. 20-fach).
            "mult": regex_mult,
            "mult2": /(?<mult>([Hh]alb|[Dd]oppelt|[Dd]reifach|[Dd]reimal) (so )?(viele|gr[oö]ß|hoch|niedrig|besser|erhöht|höher))/dg,
            "pval": RegExp("(?<pval>p ?[\\<\\=] ?" + pat_num + ")", "dg"),
            "confint": RegExp("(?<confint>" + pat_num + " ?% ?[CK]I:? \\[?" + pat_num + " ?[-\\u2013;,] ?" + pat_num + "\\]?)", "dg"),
            "yearnum": /(?<nyear>\d+([.|,]\d+)( Jahr[a-z]*))/dg,  // require comma or point separator!
            "yearnum2": /(?<nyear>\d+( Jahr[a-z]*) ([A-Za-z]+ )?(?=länger|steiger|reduzier))/dg,  // require comma or point separator!
            // "lifeexpectancy":
            //     RegExp("(?<nyear>Lebens(dauer|erwartung) (zwischen|von) " + pat_num + "( Jahr[a-z]*))", "dg")  // require comma or pouint separator!
            //     // /(?<age>(\d+-? bis )*\d+([.|,]\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))/dg
            // ,
            // Currently excluded:
            "rank": /(?<rank>(Rang|Pl[aä]tze) \d+( (und|bis) \d+)?)/dg,
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // Simple matches:
            "age": /(?<age>(?<![,.])(\d+-? (bis|und) )?\d+-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))/dg,
            "currency_post": RegExp("(?<currency>" + pat_num + " ?(EUR|€|Euro|Dollar)" + ")", "dg"),
            "currency_pre": RegExp("(?<currency>" + "(USD|\$) ?" + pat_num + ")", "dg"),
            "time": /(?<time>(\d{1,2}(\.\d{2})? Uhr)|(\d{1,2}:\d{2}))/dg,
            "date": /(?<date>\d{1,2}\.\d{1,2}\.(18|19|20)\d{2}(?![|.\w]))/dg,
            "month": RegExp("(?<date>\\d{1,2}\\.? (" + collapse_regex_or(month_names) + ")( \\d{4})?)", "dg"),
            "datemon": /(?<date>\d{1,2}\.\d{1,2}\.(18|19|20)\d{2}(?![|.\w]))/dg,
            "year": /(?<year>(Jahr|Anfang|Ende|Mitte|Nach) \d{4})/dg,
            "year2": /(?<year>(18|19|20)?\d{2}er)/dg,
            "year3": /(?<year>(?<!(,|\.|Jahr |Anfang |Ende |Mitte |Nach ))(19|20)\d{2}(?![|.\w]))/dg,  // 20th and 21st century.
            "monyear": RegExp("(?<year>" + collapse_regex_or(month_names) + " \\d{4})", "dg"),
            "yearrange": /(?<year>(zwischen|von) (18|19|20)\d{2}(?![|.\w]) (und|bis) (18|19|20)?\d{2}(?![|.\w]))/dg,
            "dur": /(?<dur>[0-9]+(-stündig|-tägig|-monatig| Minuten?| Stunden?| Tagen?| Wochen?| Monate?))/dg,
            "dur2": regex_dur2,
            "legal": /(?<legal>(Artikel|§|Absatz|Paragra(ph|f)) ?\d+)/dg,
            "medical": RegExp("(?<medical>(BMI|Diabetes Typ) ?" + pat_num + ")", "dg"),
            "medical_post": RegExp("(?<medical>" + pat_num + " (Gene))", "dg"),
            // Carry-forward match:
            "carry_forward_pre": RegExp("(?<ucarryforward>((waren|sind) es|[Dd]avon[^.]*) (\\w+ ){0,2}" + pat_num + "(?=\\W))", "dg"),
            // (\w+ ){0,2} allows up to 2 more words.
            "carry_forward_post": RegExp("(?<ucarryforward>" + pat_num + " (waren|sind) es)", "dg"),
            "phone": /(?<phone>[+]?[0-9]* ?([(]?[0-9]{0,3}[)])?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{1,6})/dg,
            // MIscellaneous numbers to be excluded!
            "misc": RegExp("(?<misc>(" + pat_num + " bis )?" + pat_num + "\\.? (Grad|Staat|Schritt|Kommentare|.[gC](?= .)))", "dg"),
            "degree": RegExp("(?<misc>(" + pat_num + " bis )?" + pat_num + "\\.?(.[gC](?= .)))", "dg"),
            // Enumeration:
            "enum": /(?<enum>\(\d{1,2}\))/dg,
            // "within_nums":
            //   RegExp("(?<misc>" +"\w*-?" + pat_num + ")", "dg")
            // Default number match:
            "other_num": regex_num
        }

        const person_all = ["Proband", "[Tt]eilnehme", "[Pp]erson", "Menschen", "Frauen", "Männer", "Kinder", "Erwachsene"]

        /**
         * Object that can be looped over to check numbers for number types taht are specific to their units in "number_unit".
         * @type {{ncase: {number_unit: string[], keyset: RegExp[][]}, incr: {number_unit: string[], keyset: RegExp[][]}, ntot: {number_unit: string[], keyset: RegExp[][]}, decr: {number_unit: string[], keyset: RegExp[][]}}}
         */
        const numtype_keyset = {
            "incr": {
                "number_unit": ["perc", "mult", "nyear"],  // add in other types eventually! 30-fach etc.
                "keyset": [
                    // A first entry to a domain-general keyset for risk:
                    [RegExp(collapse_regex_or(["[Rr]isiko", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle"])),
                        RegExp(collapse_regex_or(["höher", "erhöht"]))],
                    [RegExp(collapse_regex_or(["[Uu]nterschied", "höher", "vergrößerte"])),
                        RegExp(collapse_regex_or(["Lebenserwartung", "Abstand"]))],
                    [RegExp(collapse_regex_or(["Anstieg"]))]


                ]
            },
            "decr": {
                "number_unit": ["perc", "mult", "nyear"],  // add in other types eventually! 30-fach etc.
                "keyset": [
                    // A first entry to a domain-general keyset for risk:
                    [RegExp(collapse_regex_or(["[Rr]isiko", "Gefahr", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle", "Erkrank"])),
                        RegExp(collapse_regex_or(["[Rr]eduzier", "minimier", "niedriger", "(ge|ver)ringert?", "s[ae]nk"]))],
                    [RegExp(collapse_regex_or(["besser"])),
                        RegExp(collapse_regex_or(["geschützt"]))],
                    [RegExp(collapse_regex_or(["st[aeo]rb"])),
                        RegExp(collapse_regex_or(["früher"]))],
                    [RegExp(collapse_regex_or(["weniger"])),
                        RegExp(collapse_regex_or(["lebt?en"]))],
                    [RegExp(collapse_regex_or(["Sterblichkeitslücke"])),
                        RegExp(collapse_regex_or(["vergrößert"]))],
                    [RegExp(collapse_regex_or(["Demenz", "Krankheit"])),
                        RegExp(collapse_regex_or(["verlangsamt"]))]
                ]
            },
            // Total nuber of cases/incidents:
            // NOTE: Order matters!
            "ncase": {
                "number_unit": ["freq", "nh"],
                "keyset": [
                    // TODO: Double check these!
                    [RegExp("Fälle|Verläufe"), RegExp("insgesamt|nach|Studie")],
                    [RegExp("[Ee]rkrankt|[Bb]etroffen")],
                    [RegExp("Todesfälle")],
                    [RegExp("(ver)?st[aeo]rben"), RegExp(collapse_regex_or(person_all))],
                    // Reporting certain effects in study:
                    [RegExp("berichte(te)?n|entwickel|beobacht"), RegExp("Unwohlsein|Nebenwirkungen")],
                    [RegExp("berichte(te)?n"), RegExp("wohl"), RegExp("fühlen")]
                ]
            },
            "ntot": {
                "number_unit": ["freq"],
                "keyset": [
                    [RegExp(collapse_regex_or(person_all)),
                        RegExp(collapse_regex_or(["insgesamt", "nahmen", "erh(a|ie)lten", "befragt", "ausgewählt", "umfass(t|en)"])),
                        RegExp(collapse_regex_or(["Studie", "Untersuchung", "Erhebung"]))],
                    [RegExp(collapse_regex_or(["Daten", "[Bb]efragt"])),
                        RegExp(collapse_regex_or(["von", "über"])),
                        RegExp(collapse_regex_or(person_all))],
                    // 2nd set:
                    [RegExp(collapse_regex_or(person_all)),
                        RegExp("Analyse")]
                ]
            }
        }

        /**
         * Sets of keys to be used with window approach. Will be created upon each click!
         */
        const window_keys = {
            "grouptype": {
                "total": ["insgesamt", "alle_", "Basis", "umfass(t|en)", "waren.*jeweils", "etwa.*[Tt]eiln[ae]hme"],
                "sub": ["[Ii]n_", "[Uu]nter_", "[Dd]avon_",
                    "der.*[Tt]eilnehmer", "entfielen.*auf"]
                // Note: Switch from \w* to .*, since \w does not capture % etc.
            },
            "treat_contr": {
                // Types of subgroups:
                "contr": ["Kontroll-?.*[Gg]ruppe", "Placebo-?.*[Gg]ruppe",
                    "Vergleichs-?.*[Gg]ruppe",
                    "Prävention.*wenigsten.*befolgte",
                    "kein.*Medika"],
                "treat": ["[Gg]eimpfte?n?", "Impf-?.*[Gg]ruppe",
                    "(?<!Kontroll|Vergleichs|Placebo).Gruppe",  // negative definition of treatment group.
                    "Behandlungsgruppe", "Behandelte",
                    "([Tt]eilnehmer|Probanden).*Impfung",
                    "erh(a|ie)lten.*(Präparat|Medikament)",
                    "(Präparat|Medikament|Antidepressiva).*erh(a|ie)lten",
                    "gesündesten.*Lebensstil"],
                // "all": ["insgesamt.*([Tt]eilnehmer|Probanden)"],
                "all": ["(aller|insgesamt).*[Tt]eilnehmer|Probanden",
                    "insgesamt.*(Fälle|Verläufe)", "(Fälle|Verläufe).*insgesamt",
                    "beiden.*Gruppen", "sowohl.*[Gg]ruppe"]  // problematic!
            },
            "effside": {
                "eff": ["(?<![Nn]eben)[Ww]irk(?!lich)", "Impfschutz",
                    "Schutz", "geschützt",
                    "(reduziert|verringert|minimiert).*(Risiko|[Gg]efahr|Wahrscheinlichkeit).*(Ansteckung|Infektion|[Ee]rkrank)",
                    "((Risiko|[Gg]efahr|Wahrscheinlichkeit).*(Ansteckung|Infektion|[Ee]rkrank)).*(reduziert|verringert|minimiert)",
                    "(Ansteckungsgefahr|Infektionsrisiko).*(nur|verringert)",
                    "Reduzierung",
                    "(mindert|reduziert).*Symptome",
                    // The following may only apply to vaccination? (But likely also to treatment!)
                    "schwer.*Verl[aä]uf",
                    "Verbesserung"],
                "side": ["Nebenwirk", "Komplikation", "unerwünschte.*Effekt", "Herzmuskelentzündung"],  // more keywords?
                "damage": ["(Inzidenz|[Ee]rkank|Todesfäll|Risiko).*(erhöht|vielfach)",
                    "(erhöht|vielfach).*(Inzidenz|[Ee]rkank|Todesfäll|Risiko)",
                    "Risiko.*Erkrank",
                    "Todesf[aä]ll|gestorben|Infektion",
                    "Lebenserwartung.*sink|weniger", "st[aeo]rb.*früher",
                    "[Nn]ur.*Gesundheitszustand.*gut",  // absence of positive!
                    "([Gg]esundheit|[Ff]inanz|[Pp]sychisch).*Belastung"],
                "all": ["jeweils", "beiden.*Gruppen"],
                // Other types (age etc.):
                "sample": ["im.*Alter"]  // sample description.
            },
            "incr_decr": {
                "risk_incr": [
                    "(Risiko|Wahrscheinlichkeit).*(erhöht|steigt)",
                    "(erhöht|steigt).*(Risiko|Wahrscheinlichkeit)"],
                "risk_decr": [
                    "(Risiko|Wahrscheinlichkeit).*(sinkt|verringert|reduziert)",
                    "(sinkt|verringert|reduziert).*(Risiko|Wahrscheinlichkeit)",
                    "schütz(en|t).*(Erkrankung|Ansteckung)"]
            },
            "conditions": {
                // Verbs:
                "pers": ["Krankenakt"],  // numbers of persons.
                "ill": ["erkrank(t|en)", "Verl[äa]uf", "[Ii]nfiziert", "entwickeln"],  // ill individuals.
                "death": ["st[eao]rben", "Todesfälle", "Todesfall(!?e)"]  // death cases.
            },
            "units": {
                "freq": ["Proband", "Teilnehm", "Infektion", "Krankenakt"],
                "death": ["(ge|ver)st[aeo]rben"],
                // Units for exclusion:
                "medical": ["BMI"]
            },
            "rel": {
                "abs": ["[Qq]uote", "Anteil", "mehr_als"],  // quotas should always be absolute.
                "rel": ["Wirksamkeit", "Impfschutz", "Schutzwirkung"]
            },
            "reference": {
                // TODO!
                "tot": ["(der|aller)_(Studien)?[Tt]eilnehm"],
                "sub": ["Kontroll-?.*[Gg]ruppe", "Placebo-?.*[Gg]ruppe",
                    "Vergleichs-?.*[Gg]ruppe",
                    "Prävention.*wenigsten.*befolgte",
                    "kein.*Medika"]
            }

        }


        // EOF. DYNAMIC OBJECS.


        // INITIALIZE VARIABLES:
        let arr_li = new Set;  // create HTML for the list.


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // --------- TEXT INPUT AND PRE-PROCESSING --------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // console.log("Check my text");
        const rawText = $("#text-query").val(); // Get raw input text:

        $("#mail-feedback").attr("href", 'mailto:risk.booster@gmail.com?subject=Fehlerhafter Text im ScienceXMedia Riskbooster&body=' +
            "Fehler im folgenden Text:<br><br>" + rawText.replaceAll("\n", "  "));


        // Pre-process input:
        console.log("Raw text:");
        console.log(JSON.stringify(rawText));

        // Get spaces before bullet points, not preceded by a fullstop and add the fullstop.
        const inputText = rawText
            .replaceAll(/(?<![.?!;])\s*\u2022/gm, ". \u2022")
            .replaceAll(/\.\n\./gm, ".\n\n");  // Replace stray changes.


        console.log("Pre-processed text:");
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


        // Text-level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Detect topics: ------------
        token_dat.detect_topic("impf", [["(?<!(gl|sch))[Ii]mpf"]]);  // must be preceded
        token_dat.detect_topic("mask", [["Maske|FFP"]]);  // must be preceded
        token_dat.detect_topic("protect", [["Schutzwirkung"], ["Ansteckungsgefahr", "nur"]]);  // must be preceded
        token_dat.detect_topic("lower_risk", [["mindern", "Risiko"],
            ["schützen|Schutz", "Infekt|Ansteck"]]);
        token_dat.detect_topic("cancer_risk", [["[Rr]isiko", "Krebs"]]);  // must be preceded
        token_dat.detect_topic("cancer_drug", [["[Mm]edikament", "Krebs"]])
        token_dat.detect_topic("lifex", [["Lebenserwartung"]])

        if (!token_dat.topics.includes("lifex")) {
            delete check_numbers_dict.yearnum;  // If no life-expectancy is discussed, remove numbers of years.
        } else {
            const index = units_exc.indexOf("age");
            units_exc.splice(index, 1);
            // show age, when it comes to life expectancy.
        }

        // Get regex-based matches:
        const regex_matches = detect_regex_match(inputText, token_dat, check_numbers_dict);
        console.log("Regex matches");
        console.log(regex_matches);

        // Add information to object:
        token_dat.add_column(regex_matches.match_id, "match");
        token_dat.add_column(regex_matches.match_type.map((x) => x !== -1 ? x.toString() : x), "unit");  // get unit info from regex matches.
        token_dat.add_number_info();  // add info about numbers.
        token_dat.add_column(token_dat.token.map((x, ix) => (RegExp(collapse_regex_or(numwords), "dg").test(x))), "is_nw");  // is it a number word?
        token_dat.detect_unit();  // get additional unit info from token data.

        // token_dat.is_nw  = token_dat.is_nw.map((x, ix) => x && ![-1, "unknown"].includes(token_dat.unit[ix]));  // keep only numberwords that have known units.


        // Try to detect outcomes and conditions!
        const regex_targetcond = /(?:Schutz vor|Krankheit) (?<targetcond>(?:\w+(?=[ .,;?!])){1,2})/mg;  // capture 1 or 2 words!
        console.log("Condition matches");
        const condmatches = [...inputText.matchAll(regex_targetcond)];  // .exec(inputText);
        const targetconds = condmatches.map((x) => x.groups.targetcond);
        console.log(targetconds);

        // Detect topic features: ---------
        token_dat.detect_topic("eff", [[collapse_regex_or(["Nutz", "(?<!Neben)[Ww]irks(am|ung)", "Schutz",
            "schütz"].concat(targetconds))]]);
        token_dat.detect_topic("side", [["Nebenwirk"], ["Herzmuskelentzünd"]]);
        // NOTE: Do not add specific side effects, because they may be effects (symptoms) in other contexts!
        console.log("Treat, control:");
        token_dat.detect_topic("treatgroup", [["(Impf|Behandlungs)-?.*[Gg]ruppe"],
            ["(Antidepressiva|Medika).*erh(a|ie)lten"]]);
        token_dat.detect_topic("controlgroup", [["(Kontroll|Placebo|Vergleichs)-?.*[Gg]ruppe"],
            ["kein.*Medika"]]);

        // Detect the type of comparison:
        token_dat.detect_topic("comp_time", [["schlechter|besser", "als", "vor", "Jahren"],
            ["veränder|erhöh", "zwischen_\\d{4}"],
            ["Abstand", "wuchs|vergrößert", "Jahre", "\\d{4}"]]);


        // Add keywords according to the type of comparison (currently collected in the "topic" property):
        // +++ HERE +++
        // Add keywords for comparisons between timepoints instead of groups:
        if (token_dat.topics.includes("comp_time")) {
            // We might also include maxyear and minyear!
            console.log(token_dat.token.filter((x, ix) => token_dat.unit[ix] === "year"));
            // Amend vocabulary for treatment and control:
            window_keys.treat_contr.treat = window_keys.treat_contr.treat.concat(["nur_noch"]);
            window_keys.treat_contr.contr = window_keys.treat_contr.contr.concat(["zum_Vergleich", "vor_.*Jahren", "[Ww]ährend_.*noch"]);
        }

        // Detect if the text reports an intervention (experiment):
        // token_dat.detect_topic("comp_treat", ["veränder|erhöh", "zwischen \\d{4}"]);
        if (["treatgroup", "controlgroup", "impf", "protect"].some(x => token_dat.topics.includes(x))) {
            token_dat.topics = token_dat.topics.concat("comp_treat");
        }

        // Is it an intervention? If it discusses effectivity and side effects yes!
        const is_intervention = ["eff", "side"].every(x => token_dat.topics.includes(x));

        if (!token_dat.topics.includes("comp_treat")) {
            delete window_keys.effside.eff;
            delete window_keys.effside.side;
        }

        // Get rid of duplicates: ----------
        token_dat.topics = [...new Set(token_dat.topics)];

        // Number level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // Detect number types (may eventually need the topics to inform context names!):
        numtype_keyset.ncase.keyset = numtype_keyset.ncase.keyset.concat([[RegExp(collapse_regex_or(targetconds))]]);  // modify qwith targetconds!
        // console.log(numtype_keyset);
        token_dat.detect_number_type(inputText, numtype_keyset);
        console.log(token_dat.numtype.toString());  // initial number types.

        // Context detection: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // Get rid of non-numbers (tokens that still contain incorrect patterns):
        const nonumpat = RegExp("[A-Za-zÄäÖöÜüß]+[\-.]?\\d", "dg");
        // console.log("Before context detection:");
        // token_dat.print();
        token_dat.is_num = token_dat.is_num.map((x, ix) => x && !nonumpat.test(token_dat.token[ix]));  // was: !token_dat.token[ix].search(nonumpat)
        // console.log(token_dat.token);
        // console.log(token_dat.is_num);

        // Detect missing units:
        // console.log(" +++ detecting missing units +++");
        const no_unit_ix = token_dat.id.filter((d, ix) => token_dat.is_num[ix] && token_dat.unit[ix] === "unknown");
        // console.log(no_unit_ix);
        const new_units = investigate_context(token_dat, no_unit_ix, window_keys.units, false);
        // console.log(new_units);
        // Replace the missing units:
        let ix = -1;
        for (let i = 0; i < no_unit_ix.length; i++) {
            ix = no_unit_ix[i];
            if (new_units[ix].length > 0) {
                token_dat.unit[ix] = new_units[ix];
            }

        }

        // Detect unidentified number words:
        // Case to handle:
        // "Davon wurden 9 in der Placebogruppe und **einer** in der BNT162b2-Gruppe beobachtet."

        const regex_numwords_raw = RegExp("(?<!\\w)(" + collapse_regex_or(numwords) + ")", "dg");
        const is = token_dat.token
            .map((x) => regex_numwords_raw.test(x) && !token_dat.is_num ? x : -1);

        console.log("+++ Additional candidate number words: +++");
        // Also detect "Drittel" etc.)
        // Loop (map?) over all candidate numwords
        // get up to 1 sentence before and check for a frequency(?) unit
        // Apply the unit and set number to "true" if applicable!
        for (let i = 0; i < token_dat.nrow; i++) {
            // Is it a candidate?
            if (regex_numwords_raw.test(token_dat.token[i])) {
                const cursent = token_dat.sent[i];
                // const window_start = token_dat.id
                //     .filter((ix) => token_dat.sent[ix] >= cursent - 1 && token_dat.sent[ix] <= cursent);
                // const window_start = token_dat.id
                //     .filter((ix) => token_dat.sent[ix] >= cursent - 1 && token_dat.sent[ix] <= cursent);
                const prev_ntypes = token_dat.numtype  // was: token_dat.unit === freq; switched to ncase to avoid FP.
                    .filter((x, ix) => token_dat.sent[ix] >= cursent - 1 && ix <= i && x === "ncase")
                    .flat();
                // console.log(token_dat);
                // console.log("Previous number units");
                // console.log(token_dat.token[i]);
                // console.log(prev_units);
                const ulen = prev_ntypes.length;
                if (ulen > 0) {
                    token_dat.unit[i] = "freq";
                    token_dat.is_num[i] = true;
                    token_dat.numtype[i] = prev_ntypes[ulen - 1];
                }

            }
        }

        // NOTE: May also be applied to numbers that could not be identified so far!

        // For all numbers with non-.excluded units:
        const allnum_ix = token_dat.id.filter((d, ix) => token_dat.is_num[ix] && !units_exc.includes(token_dat.unit[ix]));
        const freq_ix = token_dat.id.filter((d, ix) => token_dat.unit[ix] === "freq");
        const perc_ix = token_dat.id.filter((d, ix) => ["perc", "mult"].includes(token_dat.unit[ix]));

        // Identify if numbers are total counts or refer to a subgroup:
        token_dat.add_column(investigate_context(token_dat, allnum_ix, window_keys.grouptype, false), "gtype");
        // Percentages MUST be subgroups by definition:
        token_dat.gtype = token_dat.gtype.map((x, ix) => token_dat.unit[ix] === "perc" ? "sub" : token_dat.gtype[ix]);

        // Do not apply the following to total numbers:
        const n_subgroup_ix = token_dat.id.filter((d, ix) => token_dat.is_num[ix] &&
            token_dat.gtype[ix] !== "total" && token_dat.gtype[ix] !== -1);
        console.log("---------- Get treatment and control: -----------");
        token_dat.add_column(investigate_context(token_dat, n_subgroup_ix, window_keys.treat_contr, false), "group");
        console.log(token_dat.group.toString());


        console.log("---------- Get effectivity and side effects: -----------");
        if (token_dat.topics.includes("comp_treat")) {
            window_keys.effside.eff = window_keys.effside.eff.concat(targetconds);
        }
        token_dat.add_column(investigate_context(token_dat, n_subgroup_ix, window_keys.effside, false), "effside");
        // Note: Nutzen muss bei Verhaltensrisiken ggf. nicht unbedingt benannt werden (wenn es keinen ersichtlichen gibt)
        console.log(token_dat.effside.toString());


        // Get information about the underlyeing conditions (morbidity, mortality...):
        console.log("---------- Get information about the underlying conditions (morbidity, mortality...): -----------");
        token_dat.add_column(investigate_context(token_dat, freq_ix, window_keys.conditions, false), "ftype");

        // Update missing information: ~~~~~~~~~~~
        // Absolute percentages (for now code as remainder that is not relative and see if it fails).
        // token_dat.numtype = token_dat.numtype
        //     .map((ntype, ix) => token_dat.unit[ix] === "perc" && ntype.toString() === "other" ? "ABS" : ntype);


        // console.log("Index of numbers with subgroup:");
        // console.log(n_subgroup_ix);

        // Replace subgroup info:
        // Note: caused a bug in some cases -- solve differently?
        // First, replace unknown subgroups:
        token_dat.gtype = token_dat.gtype
            .map((gtype, ix) => token_dat.numtype[ix] === "ncase" && ["unknown", "all"].includes(token_dat.group[ix]) ? "total" : gtype);

        // TODO: WHere do we need this? Why should numtype be = group?
        // token_dat.numtype = token_dat.numtype
        //     .map((ntype, ix) => token_dat.gtype[ix] === "sub" && ["ncase"].includes(ntype.toString()) ? token_dat.group[ix] : ntype);


        // Detect whether a change is relative:
        console.log("---------- Detect relative changes: -----------");
        // Some context detection:
        const n_change_ix = token_dat.id.filter((d, ix) => token_dat.is_num[ix] &&
            ["incr", "decr"].includes(token_dat.numtype[ix]));
        // const rel_context = investigate_context(token_dat, n_change_ix, window_keys.treat_contr);

        // Column for relative and absolute:
        token_dat.add_column(investigate_context(token_dat, perc_ix, window_keys.rel, true), "relabs");
        console.log(token_dat.relabs.toString());
        // was: token_dat.add_column(token_dat.numtype.map((x) => !["incr", "decr", -1].includes(x) ? "abs" : x), "relabs");
        token_dat.relabs = token_dat.relabs.map((x, ix) => ["incr", "decr"].includes(token_dat.numtype[ix]) && x !== "abs" ? "rel" : x);
        console.log(token_dat.relabs.toString());

        // Column for percentages <1%:
        // Translate number words:
        console.log("~~~~~~~~~~~~~~ TRANSLATING NUMBER WORDS ~~~~~~~~~~~~~~");
        const num_arr = Array.from(Array(13).keys());
        // token_dat.add_column(token_dat.token
        //     .map((x, ix) => token_dat.is_num[ix] && token_dat.is_nw[ix] ? (num_arr[num_arr
        //         .filter((ixn) => RegExp(numwords[ixn] + " (?!\\d)", "dg").test(x))]).toString() : x), "trnum");
        token_dat.add_column([...token_dat.token], "trnum");
        for (let ix = 0; ix < token_dat.nrow - 1; ix++) {
            if (token_dat.is_num[ix] && token_dat.is_nw[ix]) {

                if (!token_dat.is_num[ix + 1]) {
                    const token = token_dat.token[ix];
                    console.log(`+++ Current token is ${token}`);
                    const num_ix = num_arr
                        .filter((ixn) => RegExp(numwords[ixn], "dg").test(token))
                    // Excludes numbers that occur directly after the number word.
                    if (num_ix !== undefined && num_ix.length > 0) {
                        token_dat.trnum[ix] = num_arr[num_ix].toString();
                    }
                } else {
                    // Revoke status as number, if the next token after a potential number word is number itself.
                    token_dat.is_num[ix] = false;
                    token_dat.is_nw[ix] = false;
                }

            }


        }

        token_dat.add_column(token_dat.unit.map((x, ix) => x === "perc" && token_dat.is_num[ix] ?
            token_dat.trnum[ix].match(regex_num)[0].replace(",", ".") < 1 : -1), "smperc");

        for (const ix of n_change_ix) {

            let out = "unclear";

            if (token_dat.unit[ix] === "mult") {
                out = "rel";
            } else if (token_dat.relabs[ix] === "abs") {
                out = "abs";
            } else {

                // For small percentages assume absolute:
                // console.log("Get relative percentages and percentages <1%!");
                // const numpart = token_dat.token[ix].match(regex_num)[0].replace(",", ".");
                const numpart = token_dat.trnum[ix].match(regex_num)[0].replace(",", ".");
                // use transformed number instead to capture number words.
                // console.log(numpart);
                out = numpart < 10 ? "abs" : "rel";
            }
            // Assign the result:
            token_dat.relabs[ix] = out;
        }

        console.log(token_dat.relabs.toString());

        // Code remaining percentages as absolute:
        token_dat.relabs = token_dat.relabs.map((x, ix) => token_dat.unit[ix] === "perc" && [-1, "unknown"].includes(x) ? "abs" : x);

        // eof. detecting relative vs. absolute.

        // Fix some issues:
        token_dat.numtype = token_dat.numtype
            .map((x, ix) => token_dat.unit[ix] === "freq" && [-1, "other"].includes(x) && token_dat.gtype[ix] === "sub" ? "ncase" : x);

        // Reference information for absolute percentages and subgroups:
        // +++ HERE +++
        token_dat.add_column(investigate_context(token_dat, n_subgroup_ix, window_keys.reference, false), "reference");

        // Display for testing: ~~~~~~~~~~~~~~~~~~
        console.log("~~~~~ Updated token data: ~~~~~~");
        console.log(token_dat);
        console.log(`${token_dat.nrow} rows and ${token_dat.ncol} columns`);
        token_dat.print(allnum_ix);  // print data from object.


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // -------------- HIGHLIGHTING --------------------
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // Loop over tokens to highlight them:
        let cur_ix = 0;  // current index in original text.
        let procText = "";

        // Get rid of unidentified carryforward units:
        token_dat.unit = token_dat.unit.map((x) => x === "ucarryforward" ? -1 : x);

        // Loop over all tokens:
        // TODO: Turn into a function eventually?
        for (let i = 0; i < token_dat.nrow; i++) {

            if (token_dat.is_num[i]) {

                // console.log(i);
                let cur_unit = token_dat.unit[i];  // determine unit of current token.

                // console.log("current unit (is array: " + Array.isArray(cur_unit) + ")");
                // console.log(cur_unit);

                if (Array.isArray(cur_unit)) {
                    cur_unit = cur_unit[0];  // for now take the first array element.
                }

                // If the number has a unit and it is not one the exxclusion list:
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

                    // Signature of current number:
                    const currow = token_dat.get_row(i);

                    // This might help: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get?retiredLocale=de


                    // const colix = ["relabs", "unit", "numtype"].map(x => token_dat.colnames.indexOf(x));

                    const col_info = ["unit", "relabs", "numtype"].map(x => currow[token_dat.colnames.indexOf(x)]);

                    console.log(`~~~~~ Traverse tree for ${token_dat.token[i]}: ~~~~~~`);
                    console.log(col_info);
                    // console.log(info_tree.traverse(col_info)["tool"]);

                    const cur_tooltip = info_tree.traverse(col_info)["tool"];


                    // const cur_tooltip = unit_note_dict[cur_unit].tooltip[cur_numtype[0]];  // NOTE: currently first type only.

                    // Token information:
                    // console.log(token_dat.token[i] + "; Start: " + token_dat.start[i] + ", end: " + token_dat.end[i + match_len - 1] +
                    //     ", match length: " + match_len + ", unit: " + cur_unit + ", numtype: " + cur_numtype);

                    // console.log("Current number type is");
                    // console.log(cur_numtype);

                    cur_ix = token_dat.end[i + match_len - 1] + 1;  // save index of final character to continue from there.


                    // Numbers that issue warnings:
                    // Strong warnings:
                    const warn_num = currow.includes("rel") || ["pval", "mult"].includes(cur_unit);
                    // was: const warn_num = ["incr", "decr"].includes(cur_numtype[0]) || ["pval", "mult"].includes(cur_unit);
                    const warn_small = token_dat.smperc[i] === true;

                    // Unclarities (e.g., missing reference groups):
                    // Percentages that apply to all are suspicious (if there is any talk about groups, that is).
                    const warn_noref = (token_dat.group[i] === "all" || token_dat.group[i] === "") && cur_unit === "perc" && ["eff", "side"].includes(token_dat.effside[i]);
                    // but these should be only highlighted (or only receive an icon?).

                    // prepare warnings:
                    const highlight_type = warn_num || warn_noref || warn_small ? "highlight-warning" : "highlight-base";
                    const warn_icon = warn_num ? "<sup><i class=\"fa fa-exclamation-triangle annote-text-icon\"></i></sup>" : "";

                    // Assemble text:
                    procText += text_pre +
                        ('<div id=hn' + i + ' class="highlight-num ' + highlight_type + ' tooltip">' +
                            inputText.slice(token_dat.start[i], cur_ix) +
                            warn_icon +
                            '<span class="tooltiptext">' +
                            cur_tooltip +
                            (warn_noref ? "<br>(Bezug unklar)" : "") +
                            (warn_small ? "<br>Prozentzahl < 1%" : "") +
                            '</span></div>');

                    i += match_len;  // ensure to continue from next match.

                }

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
        // TODO: Risiko minderung" is something good, if it is about protection "erhöhter Schutz" is something good"
        // If it is about incidence of illness or mortality, "increase" is something bad --> "Nutzen" is decrease!
        // Notes about topics:
        const key_topic_dict = {
            "impf": "Impfung",
            "mask": "Schutzmasken",
            "protective_measures": "Schutzmaßnahmen",
            "cancer_risk": "Krebsrisiko",
            "lower_risk": "Risikominderung"
        };  // {"impf": "Impfung", "eff": "Wirksamkeit", "side": "Nebenwirkungen"};
        let key_topics_str = "";

        // Get the content-topics:
        const key_topics = Object.keys(key_topic_dict).filter((x) => token_dat.topics.includes(x));

        const n_topics = key_topics.length;
        let norisk = false;

        // if (n_topics === 1) {
        //     key_topics_str += "Dieser Text behandelt das Thema " + key_topic_dict[key_topics[0]];
        // } else if (n_topics > 1) {
        //
        //     key_topics_str += "Dieser Text behandelt die Themen "
        //     key_topics_str += combine_str_arr(key_topics.map((x) => key_topic_dict[x]));
        //
        // } else {
        //     key_topics_str = "Das Thema dieses Textes konnte keinem Thema der Risikokommunikation zugeordnet werden.";
        //     norisk = true;
        // }

        key_topics_str += "Berichtet der Text belastbare Informationen?";


        // ~~~~~~~~~~ FEATURES ~~~~~~~~~~~~~~~~
        const feature_aliases = {
            "comp_time": {
                "treat": "<span class=\"tooltiptext tooltip-overview\">Zeitpunkt, zu dem sich etwas verändert hat (z.B., Zunahme oder Abnhame von Erkrankungen)</span>" +
                    "<a href='risk_wiki.html#wiki-teval'>Untersuchungszeitpunkt</a>",
                "contr": "<span class=\"tooltiptext tooltip-overview\">Zeitpunkt, mit dem der Untersuchungszeitpunkt verglichen wird.</span>" +
                    "<a href='risk_wiki.html#wiki-tcontr'>Vergleichszeitpunkt</a>"
            },
            "comp_treat": {
                "treat": "<span class=\"tooltiptext tooltip-overview\">Gruppe, die die Behandlung erhalten hat oder einem Risiko ausgesetzt war.</span>" +
                    "<a href='risk_wiki.html#wiki-treat'>Behandlungsgruppe</a>",
                "contr": "<span class=\"tooltiptext tooltip-overview\">Gruppe, die keine Behandlung erhalten hat oder einem Risiko nicht ausgesetzt war.</span>" +
                    "<a href='risk_wiki.html#wiki-contr'>Kontrollgruppe/Vergleichsgruppe</a>"
            },
            "comp_default": {
                "treat": "<span class=\"tooltiptext tooltip-overview\">Gruppe, in der sich etwas verändert hat (z.B., Zunahme oder Abnhame von Erkrankungen).</span>" +
                    "<a href='risk_wiki.html#wiki-treat'>Untersuchungsgruppe</a>",
                "contr": "<span class=\"tooltiptext tooltip-overview\">Gruppe, mit der verglichen wird.</span>" +
                    "<a href='risk_wiki.html#wiki-contr'>Vergleichsgruppe</a>"
            },
        };

        // Get the topics:
        let curcomp = token_dat.topics.filter(x => /comp_/.test(x));
        // Determine the set of texts and tooltips:
        // Handle multiple comparison types by giving precedence for treatment for now!
        curcomp = curcomp.includes("comp_treat") ? "comp_treat" : [curcomp].flat()[0];
        // Use the default or th topic:
        const curfeats = (curcomp === undefined || curcomp.length === 0) ? feature_aliases["comp_default"] : feature_aliases[curcomp];

        console.log(curcomp);


        // Notes about features (presence of effectivity and harm; reporting of comparison group):
        const feature_dict = {
            "eff": "<div id=\"eff-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">Wirksamkeit einer Behandlung oder Impfung" +
                "(z.B., verhinderte Erkranungen, Genesung, Vermeidung von Todesfällen).<br>" +
                "Sollte immer mit Zahlen belegt werden.</span>" +
                "<a href='risk_wiki.html#wiki-effside'>Nutzen</a></div>",
            "side": "<div id=\"side-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">Schaden (z.B., Nebenwirkungen) einer Behandlung oder Impfung.<br>" +
                "Sollte immer mit Zahlen belegt werden.</span>" +
                "<a href='risk_wiki.html#wiki-effside'>Schaden</a></div>",
            // More general damage like an increase in risk over time or in specific groups:
            "damage": "<div id=\"eff-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">Risiko einer negativen Auswirkung (z.B., Erkrankung)</span>" +
                "<a href='risk_wiki.html#wiki-risk'>Gesundheitsrisiko</a></div>",
            "treat": "<div id=\"treat-tt\" class=\"tooltip\">" + curfeats["treat"] + "</div>",
            "contr": "<div id=\"contr-tt\" class=\"tooltip\">" +
                curfeats["contr"] + "</div>"
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
            .filter((x) => ["perc", "freq", "nh", "mult", "nyear"].includes(token_dat.unit[x].toString()) && token_dat.is_num[x]);
        console.log("Risknum indices:");
        console.log(risknum_ix);

        // Get each of these rows:
        const risknum_rows = risknum_ix.map((x) => token_dat.get_row(x));
        const risknums_flat = risknum_rows.flat();

        // 1. and 2. Global tests: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // List of keys; decide for each true/false and keep those that are true!
        const txtfeat_dict = {
            "any_risknum": risknum_ix.length > 0,
            "eff_num": risknums_flat.includes("eff"),
            "side_num": risknums_flat.includes("side"),
            "damage_num": risknums_flat.includes("damage"),
            "treat_num": risknums_flat.includes("treat"),
            "contr_num": risknums_flat.includes("contr"),
            // Interactions:
            "eff_treat_num": check_any_arr(risknum_rows, ["eff", "treat"]),
            "side_treat_num": check_any_arr(risknum_rows, ["side", "treat"]),
            "eff_contr_num": check_any_arr(risknum_rows, ["eff", "contr"]),
            "side_contr_num": check_any_arr(risknum_rows, ["side", "contr"])
            // "eff": this.eff_num || token_dat.topics.includes("eff"),
            // "side": this.side_num || token_dat.topics.includes("side"),
            // "treat": this.treat_num || token_dat.topics.includes("treatgroup"),
            // "contr": this.contr_num || token_dat.topics.includes("controlgroup"),
            // // Specific number info:
            // "rel": ["REL", "mult"].some((x) => token_dat.numtype.includes(x)),  // tests if one of the elements exists.
            // "rel_only": this.rel && !token_dat.numtype.includes("ABS") &&
            //     // Is there a row that fulfills both criteria?
            //     !check_any_arr(risknum_rows, ["case", "subgroup"])
        };

        txtfeat_dict["eff"] = txtfeat_dict.eff_num || token_dat.topics.includes("eff");
        txtfeat_dict["side"] = txtfeat_dict.side_num || token_dat.topics.includes("side");
        txtfeat_dict["damage"] = txtfeat_dict.damage_num || token_dat.topics.includes("damage");
        txtfeat_dict["treat"] = txtfeat_dict.treat_num || token_dat.topics.includes("treatgroup");
        txtfeat_dict["contr"] = txtfeat_dict.contr_num || token_dat.topics.includes("controlgroup");
        // Specific number info:
        txtfeat_dict["rel"] = ["incr", "decr", "mult"].some((x) => token_dat.numtype.includes(x));  // tests if one of the elements exists.
        txtfeat_dict["rel_only"] = txtfeat_dict.rel && !token_dat.relabs.includes("abs") &&
            // Is there a row that fulfills both criteria?
            !check_any_arr(risknum_rows, ["freq", "sub"]);

        // Additional information:
        const addfeat_dict = {
            // Which number types are there?
            "effunit": new Set(token_dat.unit.filter((x, ix) => token_dat.effside[ix] === "eff" && x !== -1)),
            "effnumtype": new Set(token_dat.numtype.filter((x, ix) => token_dat.effside[ix] === "eff" && x !== "other" && x !== -1)),
            "sideunit": new Set(token_dat.unit.filter((x, ix) => token_dat.effside[ix] === "side" && x !== -1)),
            "sidenumtype": new Set(token_dat.numtype.filter((x, ix) => token_dat.effside[ix] === "side" && x !== "other" && x !== -1))
        };

        // This collection allows to hint at communicating about differences between reporting about effectivity and side effects (mismatched framing).
        let mismatched_framing = "none";
        if (txtfeat_dict.eff_num && txtfeat_dict.side_num) {

            // Array of relevant indicators:
            const mismatch_arr = [check_any_arr(risknum_rows, ["side", "abs"]), check_any_arr(risknum_rows, ["side", "rel"]),
                check_any_arr(risknum_rows, ["eff", "abs"]), check_any_arr(risknum_rows, ["eff", "rel"])]

            if ([true, false, false, true].every((x, ix) => mismatch_arr[ix] === x)) {
                mismatched_framing = "side_rel"
            } else if ([false, true, true, false].every((x, ix) => mismatch_arr[ix] === x)) {
                mismatched_framing = "eff_rel"
            }


            // // The less likely case:
            // check_any_arr(risknum_rows, ["side", "rel"]) && !check_any_arr(risknum_rows, ["side", "abs"]) &&
            // !check_any_arr(risknum_rows, ["eff", "rel"]) && check_any_arr(risknum_rows, ["eff", "abs"]);
        }

        console.log("~~~~~~~~~~~~ Text features: ~~~~~~~~~~~~~~~~");
        console.log(txtfeat_dict);
        console.log(addfeat_dict);

        // Turn keys into array:
        const feature_arr = Object.entries(txtfeat_dict)
            .map(([key, value]) => value ? key : false)
            .filter(x => x);

        console.log("Feature array:");
        console.log(risknum_rows);
        console.log(feature_arr);


        console.log("~~~~~~~~~~~~ Feedback on features: ~~~~~~~~~~~~~~~~");

        // Example feedback set:
        // Feedback as table etc?


        // ++++ HERE NOW +++
        // console.log("+++ HERE NOW +++");


        // Feature sets for testing:
        const feature_set = {
            "eff_side": {
                "fset": ["eff", "side"],
                "tool":
                    "Nur indem Lesende vollständig über die Wirksamkeit und mögliche Nebeneffekte informiert werden, " +
                    "können sie sich ein unabhängiges Urteil über die erwünschten und unerwünschten Folgen " +
                    "bilden und eine informierte Entscheidung treffen.",
                "zumzur": "zum "
            },
            "damage": {
                "fset": ["damage"],
                "zumzur": "zu einem "
            },
            "treat_contr": {
                "fset": ["treat", "contr"],
                "tool": "Nur indem die Lesenden die Risiken (Wahrscheinlichkeiten) mit und ohne Intervention kennen, " +
                    "können Sie sich ein unabhängiges Urteil über das Ausmaß von Nutzen und Schaden bilden " +
                    "und eine informierte Entscheidung treffen.",
                "zumzur": "zur "
            }
        }


        // Remove/adjust Nutzen/Schaden terminology for other kinds of topics (e.g., comparison of risks).
        if (token_dat.topics.includes("comp_treat")) {
            delete feature_set.damage;
        } else {

            key_topics_str += "<p class=\"note-par\">" +
                "Der Text berichtet keine Intervention (z.B., Medikamentenbehandlung), " +
                "die einen Vergleich zwischen einer Behandlungsgruppe und einer Vergleichsgruppe anstellt" +
                (token_dat.topics.includes("comp_time") ? ", sondern scheint Zeitpunkte zu vergleichen. " : ". ") +
                "Daher sind keine " +
                "<span id=\"causal-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">Kausalaussagen beschreiben, ob ein Faktor ursächlich für ein Ergebnis ist " +
                "(z.B., ein Medikament für die Genesung). Das ist nur zuverlässig in Experimenten mit randomisierter Zuteilung möglich.</span>" +
                "<a href='risk_wiki.html#wiki-causal'>Kausalaussagen</a></span> " +
                "möglich" +
                "</p>";

            delete feature_set.eff_side;  // remove the inappropriate effectivity/side-effects category.
            // feature_set.treat_contr.zumzur = "zum ";
            delete feature_set.treat_contr;
        }


        // Overarching text features: ~~~~~~~~~~~~~~~~~~~~~
        for (const [key, value] of Object.entries(feature_set)) {

            let feature_str = " Es ";

            // Get present features:
            let feats_present = value.fset.filter((feat) => feature_arr.includes(feat));
            let feats_missing = value.fset.filter((feat) => !feature_arr.includes(feat));
            feats_present = feats_present.map((k) => feature_dict[k]);
            feats_missing = feats_missing.map((k) => feature_dict[k]);
            console.log(`Features present and missing are:`);
            console.log(feats_present);
            console.log(feats_missing);


            if (feats_missing.length === 0) {
                feature_str = "<i class=\"fa fa-check in-text-icon good\"></i>" + feature_str;
                feature_str += " werden Informationen " + value.zumzur + feats_present.join(" und ") +
                    " berichtet.";
            } else if (key === "damage") {
                feature_str += " konnte kein Gesundheitsrisiko erkannt werden. " +
                    "Wenn der Text ein Gesundheitsrisiko behandelt, kontaktieren Sie uns bitte, damit wir den Fehler beheben können.";
            } else {
                if (feats_missing.length === 1) {
                    feature_str = "<i class=\"fa fa-exclamation-triangle in-text-icon warning\"></i>" + feature_str;
                    feature_str += " werden nur Informationen " + value.zumzur + feats_present.toString() +
                        " berichtet. Es sollten auch Informationen " + value.zumzur + feats_missing + " berichtet werden. ";
                } else {
                    feature_str = "<i class=\"fa fa-close in-text-icon error\"></i>" + feature_str;
                    feature_str += " werden weder Informationen " + value.zumzur +
                        value.fset.map((key) => feature_dict[key]).join(" noch " + value.zumzur) + " berichtet. "
                    // "<br>NOTE: In Wiki mention the reasons and that one should mention if the evidence is not based on a group comparison";
                }

                // Add tooltip why this a problem:
                // "<div id=\"eff-tt\" class=\"tooltip\">" +
                // "<span class=\"tooltiptext tooltip-overview\">Wirksamkeit einer Behandlung oder Impfung" +
                // "(z.B., verhinderte Erkranungen, Genesung, Vermeidung von Todesfällen).<br>" +
                // "Sollte immer mit Zahlen belegt werden.</span>" +
                // "<a href='risk_wiki.html#wiki-effside'>Nutzen</a></div>"
                feature_str = feature_str + "<div id=\"" + key + "-tt\" class=\"tooltip\">" +
                    "<span class=\"tooltiptext tooltip-overview\" style='width: 100%'>" +
                    value.tool +
                    "</span> (Warum ist das ein Problem?)</div>";
            }


            // Add to string:
            feature_list += "<li>" + feature_str + "</li>";
        }

        // Flag out the use of numbers: ~~~~~~~~~~~~~~~~~~~~~~~
        let feature_num = "";
        const any_risk_num = txtfeat_dict.any_risknum;  // ["perc", "freq", "nh", "mult", "nyear"].filter((x) => token_dat.unit.includes(x));
        // console.log("Any risk num:");
        // console.log(token_dat.unit);
        if (txtfeat_dict.any_risknum) {
            // feature_num += "<li><i class=\"fa fa-check in-text-icon good\"></i> Der Text scheint Zahlen " +
            //     (!feature_arr.includes("damage") && feature_set?.damage ? "" :
            //         "zu den genannten " +
            //         "<div id=\"risk-tt\" class=\"tooltip\">" +
            //         "<span class=\"tooltiptext tooltip-overview\">Anders der umgangssprachliche Risikobegriff gleichbedeutend mit \"Wahrscheinlichkeit\" " +
            //         "(häufig etwa Wahrscheinlichkeit zu erkranken oder versterben; aber auch positiv, z.B., Wahrscheinlichkeit länger zu leben).</span>" +
            //         "<a target=\"_blank\" href='risk_wiki.html#wiki-risk'>Risiken</a></div> ") +
            //     "zu berichten.</li>";

            // +++ HERE!
            // TODO: Remove/adjust Nutzen/Schaden terminology for other kinds of topics (e.g., comparison of risks).

            feature_num += "</li></ul><p>Welche Zahleninformation wird berichtet?</p><ul><li>";

            // Differentiate numbers for control and treat group:
            // Do numbers apply to treat and contr group
            // (or: affected and general population for other risks)

            // Differentiate: Does it report numbers only about effectivity? Also about side effects?
            if (token_dat.topics.includes("comp_treat")) {
                // Do this only, if groups are compared!

                feature_num += "<li>";

                const eff_num = feature_arr.includes("eff_num");
                const side_num = feature_arr.includes("side_num");

                if (eff_num && side_num) {
                    feature_num += "<i class=\"fa fa-check in-text-icon good\"></i> " +
                        "Sowohl zum Nutzen, als auch zum Schaden wurden Zahlen angegeben."
                } else {
                    if (eff_num || side_num) {
                        feature_num += "<i class=\"fa fa-exclamation-triangle in-text-icon warning\"></i> " +
                            "Zahlen nur zu" +
                            (eff_num ? "m Nutzen" : " Schaden") +
                            " angegeben."
                    } else {
                        feature_num += "<i class=\"fa fa-close in-text-icon error\"></i> " +
                            "Die verwendeten Zahlen beziehen sich leider weder auf Nutzen noch auf Schaden."
                    }

                    // Add explanatory popup:
                    feature_num += "<div id=\"noeffnum-tt\" class=\"tooltip\">" +
                        "<span class=\"tooltiptext tooltip-overview\">" +
                        "Nur wenn sowohl der Nutzen, als auch der Schaden mit transprarenten Zahlen belegt werden, " +
                        "ist eine informierte Beurteilung möglich, wie groß der Nutzen im Vergleich zu anderen " +
                        "Interventionen und zum Schaden ist " +
                        "</span> (Warum ist das ein Problem?)</div>";
                }

                feature_num += "</li><li>";

                // Die Wirksamkeit wird (nicht) mit Zahlen aus Behandlungs- und Kontrollgruppe belegt.
                // Nebenwirkungen werden nicht für Behandlungs- und Kontrollgruppe angegeben
                let arr_eff_both = feature_arr.includes("eff_treat_num") && feature_arr.includes("eff_contr_num") ?
                    ["<i class=\"fa fa-check in-text-icon good\"></i>", "", ""] : ["<i class=\"fa fa-close in-text-icon error\"></i>",
                        "nicht erkennbar ",
                        "<div id=\"noeffnum-tt\" class=\"tooltip\">" +
                        "<span class=\"tooltiptext tooltip-overview\">" +
                        "Nur indem die Lesenden die Größe des Nutzens mit und ohne Intervention kennen, " +
                        "können Sie sich ein unabhängiges Urteil über das Ausmaß des Nutzens bilden " +
                        "und eine informierte Entscheidung treffen. " +
                        "</span>(Warum ist das ein Problem?)</div>"
                    ];
                let arr_side_both = feature_arr.includes("side_treat_num") && feature_arr.includes("side_contr_num") ?
                    ["<i class=\"fa fa-check in-text-icon good\"></i>", "", ""] : ["<i class=\"fa fa-close in-text-icon error\"></i>",
                        "nicht erkennbar ",
                        "<div id=\"nosidenum-tt\" class=\"tooltip\">" +
                        "<span class=\"tooltiptext tooltip-overview\">" +
                        "Nur indem die Lesenden die Größe des Schadens mit und ohne Intervention kennen, " +
                        "können Sie sich ein unabhängiges Urteil über das Ausmaß des Schadens bilden " +
                        "und eine informierte Entscheidung treffen." +
                        "</span>(Warum ist das ein Problem?)</div>"];


                feature_num += arr_eff_both[0] + " Der Nutzen wird " + arr_eff_both[1] +
                    "mit Zahlen für Behandlungs- und Kontrollgruppe belegt</li>" + arr_eff_both[2] + "<li>";
                feature_num += arr_side_both[0] + " Die Schadenwirkung wird " + arr_side_both[1] +
                    "mit Zahlen für Behandlungs- und Kontrollgruppe belegt " + arr_side_both[2];
                // Rather "Nur für" oä.
            } else if (token_dat.topics.includes("comp_time")) {

                feature_num += "<li>";

                const treat_num = feature_arr.includes("treat_num");
                const contr_num = feature_arr.includes("contr_num");

                if (treat_num && contr_num) {
                    feature_num += "<i class=\"fa fa-check in-text-icon good\"></i> " +
                        "Sowohl zum Untersuchungszeitpunkt, als auch zum Vergleichszeitpunkt wurden Zahlen angegeben."
                } else if (treat_num || contr_num) {
                    feature_num += "<i class=\"fa fa-exclamation-triangle in-text-icon warning\"></i> " +
                        "Zahlen nur zum " +
                        (treat_num ? "Untersuchungszeitpunkt" : "Vergleichszeitpunkt") +
                        " angegeben."
                } else {
                    feature_num += "<i class=\"fa fa-close in-text-icon error\"></i> " +
                        "Die Zahlen beziehen sich leider nicht auf die absoluten Risiken zum Untersuchungs- oder Vergleichszeitpunkt."
                }
            }

            feature_num += "</li>";  // close the final list element.

            /*
            NOTE: Handle further cases!
             */


        } else {
            // ONLY NUMBERS: ~~~~~~~~~~~~~~~~~~~~~~~~
            feature_num += "<li><i class=\"fa fa-close in-text-icon error\"></i> " +
                "Der Text scheint keine Zahlen zu den Risiken zu berichten. " +
                "Rein verbale Beschreibungen sollten vermieden werden. " +
                "Bitte versuchen Sie Zahlen zu berichten.</li>";
        }

        // Only talks about numbers if the text talks about risK:
        if (!norisk) {
            feature_list += feature_num;
        }


        // Combine the list of text features:
        feature_list = "<ul>" + feature_list + "</ul>";


        // Output topics:
        // $("#text-note-general").html("<p id=\"text-note-general\">" + key_topics_str + "</p>");
        // General information:
        $("#text-note-general").html("<p id=\"text-note-general\" class='note-par'>" +
            "Fahren Sie über die hervorgehobenen Ausdrücke, um weitere Informationen zu erhalten. " +
            "Klicken Sie auf die Links, um ins Wiki zu gelangen." +
            "</p>" +
            key_topics_str
        );


        // Add mismatched framing:
        if (["side_rel", "eff_rel"].includes(mismatched_framing)) {

            let mismatch_inf = [["relative Zahlen", "größer"], ["absolute Zahlen", "kleiner"]];
            if (mismatched_framing === "eff_rel") {
                mismatch_inf.reverse()
            }

            arr_li.add('Achtung: Sie haben für den Nutzen ' +
                mismatch_inf[0][0] +
                ' und für die Schadenwirkung ' +
                mismatch_inf[1][0] +
                ' verwendet. ' +
                'Dieses "' +
                '<div id="eff-mmf" class="tooltip">' +
                '<span class="tooltiptext tooltip-overview">Verwendung relativer Maße ' +
                'für den Nutzen und absoluter Maße für die Schadenwirkung (auch umgekehrt möglich). ' +
                'Da relative Angaben meist überschätzt werden, ' +
                'stellt mismatched framing eine intransparente Verzerrung dar und sollte vermieden werden.</span>' +
                '<a target=\"_blank\" href=\'risk_wiki.html#wiki-mismatch\'>mismatched framing</a></div>' +
                '" sollte vermieden werden. '
                // 'da es <a target=\"_blank\" href="risk_wiki.html#wiki-effside">Die Wirksamkeit ' +
                // mismatch_inf[0][1] +
                // ' und den Schaden ' +
                // mismatch_inf[1][1] +
                // ' erscheinen lässt</a>'
            );
        }

        // Add note on risk calculator:
        // TODO: Link to appropriate risk calculator (vaccination/treatment...)

        // List of notes on number types:
        const keepvals = ["pval"];
        for (const [key, value] of Object.entries(unit_note_dict)) {

            console.log(`Get number type info for ${key}:`);
            console.log(token_dat.unit.flat());

            // Only report some values (in addition to the more global feedback):
            if (keepvals.includes(key)) {
                if (token_dat.unit.flat().includes(key)) {
                    console.log("Unit dict content:");
                    console.log(value);

                    let numtypes = Object.keys(value.tooltip)
                        .filter((inkey) => check_any_arr(risknum_rows, [key, inkey]))
                        .map((x) => value.tooltip[x]);
                    console.log(numtypes);

                    arr_li = arr_li.add(value.note(numtypes));
                }

            }

        }


        // If there are any entries:
        if (arr_li.size > 0) {
            let str_li = ""
            for (const note of arr_li) {
                str_li += "<li>" + note + "</li>";
            }
            // Add the list entries:
            notes_html += "<ul><li>Weitere Anmerkungen:</li><ul>" + str_li + "</ul></ul>";
        }


        // Update the notes:
        $("#text-notes-list").html(feature_list + notes_html);

        // Update the text:
        $("#text-result").html('<h3>Ihr Text</h3>' +
            '<div class="fillout-info">' +
            '<p class="instruction-par">Fahren Sie mit dem Mauszeiger über die hervorgehobenen Zahlen, um zu Erfahren, ' +
            'welchem Format wir die Zahl zugeordnet haben.' +
            '<br>Klicken Sie auf die Zahl, um mehr zu erfahren.</p>' +
            '</div>' +
            procText);


        // Alternative tooltip as popup:
        $(".highlight-num").on("click", function (e) {


            const cur_num = $(this);
            const thispos = cur_num.position();  // position of clicked number.
            console.log(thispos);

            // Change the popup text here:
            const cur_popup = $("#tooltip-popup");

            // Remove highlighting classes:
            // cur_popup.removeClass("selected-blur");
            $(".highlight-num").removeClass("selected-blur");

            // Get text for the  popup:
            const token_id = cur_num.attr("id").replace("hn", "");

            // console.log("Clicked token");
            // console.log(token_dat.token[token_id] + ", unit: " + token_dat.unit[token_id] +


            // Get current row:
            const currow = token_dat.get_row(token_id);
            console.log(currow);

            // Traverse the info tree:
            const col_info = ["unit", "relabs", "numtype"].map(x => currow[token_dat.colnames.indexOf(x)]);
            // const curinfo = info_data[info_tree.traverse(col_info)["popup"]];
            // Directly enter info in info tree? Maybe borrow from info dict?
            const curinfo = info_tree.traverse(col_info);

            const addinfo_perc = "<p>" +
                (token_dat.smperc[token_id] === true ? "<br>Die Prozentzahl ist < 1%. Greifen Sie bitte auf <a target=\"_blank\" href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> " +
                    "(z.B., 1 aus 100 oder 1 aus 1000) zurück." : "") +
                // Alternativ: Wir konnten
                "</p>";  // z.B., relative/absolute Prozentzahl.


            // const addinfo_sub = "<p>" +
            //     "Die Zahl bezieht sich" + (/_sub/.test(infokey) ? "absolut" : "relativ") + " zu sein." +
            //     "</p>";  // z.B., relative/absolute Prozentzahl.


            cur_popup.html(
                `<h4>${curinfo.tool}</h4>` +
                // `<p><strong>Bezug</strong>: ${token_dat.group[token_id]}</p>` +  // Some additional info!
                `${col_info[0] === "perc" ? addinfo_perc : ""}` +  // additional info.
                // `${(/_sub/.test(infokey) ? ("<p>Die Zahl bezieht sich auf eine Subgruppe. " +
                //     "Stellen Sie sicher, das klar ist auf welche übergeordnete Gruppe sie sich bezieht.</p>") : "")}` +
                // `<p><ul><li>${curinfo.popup.join("</li><li>")}</li></ul></p>`  // to process an array as list.
                `${!curinfo.popup ? "<p>Diese Zahl konnten wir leider nicht näher identifizieren.</p>" : curinfo.popup}`

                // +++ `<p>[Place to add more info, if needed!]</p>`+++
            );

            // Get popup properties:
            const popup_height = cur_popup.height();
            const popup_width = cur_popup.width();
            const popup_pad = cur_popup.innerHeight() - popup_height;
            const num_height = cur_num.height();

            // Style the popup, position it and show:
            const txt_ele = $("#text-result");  // element for text container
            const right_bound = txt_ele.position().left + txt_ele.width();  // rightmost position.
            const txt_ele_top = txt_ele.position().top;

            // Note: Eventually improve positioning; seemingly, the issue occurs only on the first click!

            console.log(`Popup height (pad): ${popup_height} (${popup_pad}), Highlight height: ${num_height}, 
            Highlight pos (top, bottom) ${thispos.top}, ${thispos.left}`);
            console.log(`Right bound is ${right_bound}`);

            // Fixed part of the position:
            const top_fixed = thispos.top - num_height * 0.75 - popup_pad + 2;

            // Adjust the popup position and show:
            cur_popup
                .css({
                    top: top_fixed - popup_height,  // add 2 pixels.
                    // If the popup goes out of bounds, correct.
                    left: (thispos.left + popup_width > right_bound) ? thispos.left - popup_width / 2 : thispos.left
                    // position: 'absolute'
                })
                // Redo some calculatios after positioning.
                .css({
                    // check if the top of the popup overlaps considerably
                    top: top_fixed - cur_popup.height(),
                    // If the popup goes out of bounds, correct.
                    // left: (thispos.left + popup_width > correction_left) ? thispos.left / 2 : thispos.left
                    // position: 'absolute'
                })
            // .addClass("selected-blur")

            // TODO: Fix issue with rightmost numbers!

            console.log(`top of txt element: ${txt_ele_top}; 
            top of parent: ${txt_ele.parent().position().top}, 
            popup top: ${cur_popup.position().top}`);

            cur_popup
                // Redo some calculatios after positioning.
                .css({
                    // check if the top of the popup overlaps considerably
                    top: cur_popup.position().top < txt_ele.parent().position().top ?
                        top_fixed + num_height * 2 : top_fixed - cur_popup.height(),
                    // If the popup goes out of bounds, correct.
                    // left: (thispos.left + popup_width > correction_left) ? thispos.left / 2 : thispos.left
                    // position: 'absolute'
                })
                .show();


            // Add selection blur to the number:
            $(this).addClass("selected-blur");

            // Prevent propagation:
            e.stopPropagation();

            $(window).on("click", function (e) {

                // console.log(e.target);

                // May need to become more complex with more elements!
                // Get all parent node IDs?
                let node_arr = [];
                let curnode = e.target;
                while (curnode.localName !== "body") {
                    node_arr = node_arr.concat(curnode.id);
                    curnode = curnode.parentNode;
                }

                // console.log("Array of parent nodes:");
                // console.log(node_arr);


                if (!node_arr.includes("tooltip-popup")) {
                    cur_popup.hide().removeClass("selected-blur");
                    cur_num.removeClass("selected-blur");
                    // $(window).unbind("click").unbind("scroll");
                    // $(".text-output").unbind("scroll");
                }

            })

            // Handle scrolling:
            // $(window).on("scroll", function () {
            //     $("#tooltip-popup").hide().removeClass("selected-blur");
            //     $(window).unbind("click").unbind("scroll");
            //     $(".text-output").unbind("scroll");
            // })
            //
            // $(".text-output").on("scroll", function () {
            //     $("#tooltip-popup").hide().removeClass("selected-blur");
            //     $(this).unbind("scroll");
            //     $(window).unbind("click").unbind("scroll");
            // })

        })

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
const month_names = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November",
    "Dezember"];
const pat_num = "(?:(?<![\\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,:][0-9]+)?))(?!\\\.[0-9A-Za-zÄÖÜäöüß]|[a-zA-Z0-9ÄÖÜäöüß])";
const numwords = ["[Kk]einen?", "(?<![Kk])[Ee]ine?[rm]?(?![gnz])", "[Zz]wei(?!fe)", "[Dd]rei", "[Vv]ier", "[Ff]ünf", "[Ss]echs",
    "[Ss]ieben", "[Aa]cht(?!e)", "[Nn]eun(?!k)", "[Zz]ehn", "[Ee]lf", "[Zz]wölf"];

const regex_num = new RegExp("(?<unknown>" + pat_num + "( Millionen| Milliarden)?)", "dg");  // regex to detect numbers; d-flag provides beginning and end!.
const regex_numwords = new RegExp("(?<unknown>(" + collapse_regex_or(numwords) + ") (Person(en)?|F[aä]lle?))", "dg");
const regex_perc = new RegExp("(?<perc>(" + pat_num + " bzw\\. )?" + pat_num + " ?(%|\\\-?[Pp]rozent)\\\w*(?=[\\s.?!])" + ")", "dg");
const regex_nh = new RegExp("(?<nh>" + pat_num + " (?!%|[Pp]rozent)(\\w+ )?(von|aus|in) (\\w+ )?" + pat_num + ")", "dg");  // TODO: Handle numberwords here.
const regex_nh2 = new RegExp("(?<nh>(" + collapse_regex_or(numwords) + ") (?!%|[Pp]rozent)(\\w+ )?(von|aus|in) (\\w+ )?" + pat_num + ")", "dg");
const regex_mult = new RegExp("(?<mult>" + pat_num + "[ \\-]?([Mm]al|[Ff]ach) (so )?( ?viele|gr[oö]ß(er)?|hoch|niedrig(er)?|besser|erhöht|höher)(?=[\\s.?!])" + ")", "dg");
const regex_dur2 = /(?<dur>\d+([,.]\d+)?-?\d*([,.]\d+)?(Minuten?| Stunden?| Tagen?| Wochen?))/dg;
// Note: in regex_nh we may also try to get the denominator as a group or as its own entity.
// nh must also be identified from tokens (e.g., In der Gruppe von 1000[case] Leuten sterben 4[num/case].


/*
Tests for simple units:

Das kostet 100 Euro und ist 50 Jahre alt.
Um 17 Uhr gehen wir bis 19:00 weg und kommen um 1.00 Uhr am 2.3.2021 heim.
Das steht so in §12 Artikel 13, Absatz 10.
 */


// The following should be its own (because numbers belong to a category and can be an approximation)
// "APPROX": {
//     "number_unit": "perc",  // ACTUALLY ALSO OTHERS?
//     "keyset": []
//     // Pattern would be "mehr/weniger als; ungefähr" --> percent, nh or also freqs!
// },

// Additional set for vaccination topic:
const keyset_impf = [[RegExp(collapse_regex_or(["([Ww]irk(sam|t))", "[Ee]ffektiv", "[Ss]ch[uü]tz"]))]];


// Detect the matches in token set:
const unit_note_dict = {
    "perc": {
        "tooltip": {
            "abs": "absolute Prozentzahl",
            "rel": "relative Prozentzahl",
            "incr": "Veränderung",
            "decr": "Veränderung",
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
                types = type_arr.join("en, ") + "en und " + last + "en";
            }

            let txt_out = "Der Text verwendet ";

            if (type_arr.includes("relative Prozentzahl")) {
                if (type_arr.length === 1) {
                    txt_out += "nur " + types + ". <a target=\"_blank\" href=\"risk_wiki.html#wiki-rel\">Relative Angaben</a> ohne Basisrisiko sollten vermieden werden.";
                } else {
                    txt_out += types + ". ";
                }

                console.log(`+++++++ CURRENT TEXT SNIP: ${type_arr.join()}`);

                txt_out = txt_out.replace(/(relative Prozentzahl(en)?)/g,
                    "<div id=\"relnote\" class=\"highlight-other highlight-warning tooltip\">" +
                    "<a target=\"_blank\" href=\"risk_wiki.html#wiki-rel\">$1</a>" +
                    "<span class=\"tooltiptext tooltip-overview\">" +
                    "Achten Sie darauf, dass Sie auch die <strong>" +
                    "absoluten Wahrscheinlichkeiten" +
                    " in der Behandlungs- und Vergleichsgruppe berichten</strong> &ndash; " +
                    "am besten als <a target=\"_blank\" href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> (d.h., 3 aus 1000 oä.).</span></div>");


                // txt_out += "Achten Sie darauf, dass Sie auch die <strong>absoluten Wahrscheinlichkeiten in den Gruppen berichten</strong> -- " +
                //     "am besten als <a target=\"_blank\" href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> (d.h., 3 aus 1000 oä.).";

            } else {
                txt_out += `${types}. Achten Sie darauf, dass klar ist auf welche Größe sich die <a target=\"_blank\" href=\"risk_wiki.html#wiki-prozent\">Prozentangabe</a> bezieht.`
            }

            return txt_out;

        }
    },
    "nh": {
        "tooltip": {
            "other": "Natürliche Häufigkeit"
        },
        "note": function (type_arr) {
            return "Der Text enthält " +
                "<a target=\"_blank\" href=\"risk_wiki.html#wiki-nh\">Natürliche Häufigkeiten.</a> " +
                "Sehr gut! Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
        }
    },
    "freq": {
        "tooltip": {
            "other": "Personen oder Fälle",
            "ntot": "Gesamtzahl an Personen",
            "ncase": "Gesamtzahl Betroffene (Erkrankte)",
            "treat": "Anzahl unter den Behandelten",
            "contr": "Anzahl in der Kontrollgruppe"
        },
        "note": function (type_arr) {
            return "Der Text enthält " +
                "<div id=\"case-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">" +
                "<p>" +
                "Fallzahlen können sehr transparent sein und sind oft leichter verständlich, als z.B. Prozentzahlen. " +
                "Wichtig ist aber, dass klar ist, wie groß die Gruppe oder Grundgesamtheit ist, in der die Fälle auftreten." +
                "</p></span>" +
                "<a target=\"_blank\" href='risk_wiki.html#wiki-freq'>Anzahlen von Fällen</a>" +
                "</div>. "
            // "Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
        }
    },
    "mult": {
        "tooltip": {"other": "Relative Angabe"},
        "note": function (type_arr) {
            return "Der Text enthält <a target=\"_blank\" href='risk_wiki.html#wiki-rel'>relative Vergleiche</a> (10-mal so groß, halb so groß)." +
                "Bitte achten Sie darauf, auch die <a target=\"_blank\" href='risk_wiki.html#wiki-abs'>absoluten Risiken</a> in jeder Gruppe anzugeben &ndash; am besten als <a target=\"_blank\" href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> " +
                "(z.B., unter denen ohne Impfung steckten sich 2 aus 1000 an unter den geimpften nur 1 aus 1000)."
        }
    },
    "pval": {
        "tooltip": {"other": "P-Wert"},
        "note": function (type_arr) {
            return "Der Text enthält " +
                "<div id=\"pval-tt\" class=\"tooltip\">" +
                "<span class=\"tooltiptext tooltip-overview\">" +
                "<p>wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
                "<p>Typischerweise wird ein p-Wert kleiner als 0.05 als \"statistisch signifikant\" bezeichtnet, was eine akzeptable Unischerheit ausdrückt.</p>" +
                "<p>Ein besseres Maß für Unsicherheit sind Zahlenspannen (z.B., Credibilitätsintervalle oder Konfidenzintervalle." +
                "z.B., die Anzahl an vermiedenen Todensfällen unter den Behandelten liegt zwischen 5 und 10)</p></span>" +
                "<a target=\"_blank\" href='risk_wiki.html#wiki-pval'>p-Werte</a></div>. Diese sind leicht missverständlich und sollten vermieden werden. "
        }
    },
    "nyear": {
        "tooltip": {
            "other": "<a target=\"_blank\" href='risk_wiki.html#wiki-lifex'>Lebenserwartungen</a> in Jahren",
            "incr": "Unterschiede in der <a target=\"_blank\" href='risk_wiki.html#wiki-lifex'>Lebenserwartung</a>",
            "decr": "Unterschiede in der <a target=\"_blank\" href='risk_wiki.html#wiki-lifex'>Lebenserwartung</a>"
        },
        "note": function (type_arr) {
            // console.log("~~~~~~~~~~~~~ HANDLE NUMBERS OF YEARS ~~~~~~~~~~~~~~~~~~");
            // console.log(type_arr);
            return `Der Text enthält ${[...new Set(type_arr)].join(" und ")}.<br>Diese Information kann aktuell nicht optimal verarbeitet werden.`
            // "Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
        }
    },
    "age": {
        "tooltip": {
            "other": "Alter in Jahren"
        },
        "note": function (type_arr) {
            // console.log("~~~~~~~~~~~~~ HANDLE NUMBERS OF YEARS ~~~~~~~~~~~~~~~~~~");
            // console.log(type_arr);
            return `Der Text enthält Altersangaben.`
            // "Achten Sie auf einheitliche Bezugsgrößen (z.B., 1 aus 100, 1,000 oder 10,000)."
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


// Info tree:
// Class to quickly define output nodes:
class OutputNode {
    constructor(tool, popup) {
        this.tool = tool;
        this.popup = popup;
    }
}

// Previous defaults:
// "perc": "Prozentzahl", "freq": "Anzahl", "nh": "Natürliche Häufigkeit", "pval": "p-Wert",
// "undefined": "Konnte nicht identifiziert werden"

// Previous wiki reference:
//     "perc_other": "prozent",
//     "perc_other_eff_abs": "prozent",
//     "perc_other_side_abs": "prozent",
//     // Relative percentages:
//     "perc_decr_rel": "rel",
//     "perc_decr_eff_rel": "rel",  // +++ UPDATE! +++
//     "perc_decr_side_rel": "rel",
//     // Types of freqs -- update!
//     "freq_ntot": "sample_size",
//     "freq_ntot_total": "sample_size",
//     "freq_ntot_sub_treat": "sample_size",
//     "freq_ntot_sub_contr": "sample_size",
//     "freq_ncase_total_all": "freq",  // total numbers of cases often not informative!
//     "freq_ncase_sub_treat": "freq",
//     "freq_ncase_sub_contr": "freq",  // here: reference.
//     "freq_treat": "freq",
//     "freq_contr": "freq",
//     "freq_other": "freq",
//     // Natural frequencies:
//     "nh_ncase": "nh",
//     // Other kinds of numbers:
//     "mult_other": "rel",
//     "pval_other": "pval"

const popup_perc = function (rel) {
    return "<p>Diese <a target=\"_blank\" href='risk_wiki.html#wiki-prozent'>Prozentzahl</a> scheint " +
        (rel === "rel" ? "relativ" : "absolut") + " zu sein.</p>"
};

const popup_freq = function (sample) {
    return "<p>Diese Häufigkeit scheint eine " +
        (sample === "ntot" ? "<a target=\"_blank\" href='risk_wiki.html#wiki-sample'>Stichprobengröße</a>" : "<a target=\"_blank\" href='risk_wiki.html#wiki-freq'>Anzahl von Fällen</a>") + " zu sein.</p>"
};

// In the future we might try to have more sophisticated methods to allow the passing of specific parameters!

const info_tree = {
    // Levels:
    // "treelvs": ["relabs", "unit"],
    "tree": {
        // unit tree:
        "perc": {
            "abs": new OutputNode("Absolute Prozentzahl", popup_perc("abs") + info_data.prozent.popup),
            "rel": new OutputNode("Relative Prozentzahl", popup_perc("rel") + info_data.rel.popup),
            "default": new OutputNode("Prozentzahl", "Diese Prozentzahl konnte leider nicht näher identifiziert werden")
        },  // Note: This is merely an addition; make its own tree or a condition within the perc-tree?
        "nh": new OutputNode("Natürliche Häufigkeit.", info_data.nh.popup),
        "freq": {
            "ncase": new OutputNode("Fallzahl", popup_freq("ncase") + info_data.freq.popup),
            "ntot": new OutputNode("Stichprobengröße", popup_freq("ntot") + info_data.sample_size.popup),
            "default": new OutputNode("Häufigkeit", "Diese Häufigkeit konnte leider nicht näher identifiziert werden")
        },
        "mult": new OutputNode("Relative Veränderung", info_data.rel.popup),
        "pval": new OutputNode("p-Wert", info_data.pval.popup),
        "confint": new OutputNode("Konfidenzintervall", info_data.confint.popup),
        "nyear": {
            "decr": new OutputNode("Unterschied in der Lebenserwartung", "Kann zum Vergleich der Sterblichkeit verschiedener Gruppen dienen. " +
                "Achten Sie darauf, die Gesamtlebenserwartung anzugeben."),
            "incr": new OutputNode("Unterschied in der Lebenserwartung", "Kann zum Vergleich der Sterblichkeit verschiedener Gruppen dienen. " +
                "Achten Sie darauf, die Gesamtlebenserwartung anzugeben."),
            "other": new OutputNode("Lebenserwartung in Jahren", "Lebenserwartung kann zur Beurteilung der Sterblichkeit dienen."),
            "default": new OutputNode("Anzahl an Jahren", "Diese Anzahl an Jahren konnte leider nicht näher identifiziert werden")
        },
        "age": new OutputNode("Altersangabe", "Kann insbesondere hilfreich sein, um Unterschiede in der Lebenserwartung einzuordnen."),
        "default": new OutputNode("Zahl.", "Diese Zahl konnte leider nicht näher identifiziert werden")
    },
    "traverse": function (arr) {

        let curtree = this.tree;
        let curdefault = this.tree.default;

        console.log(curtree);
        console.log(curdefault);

        for (const i of arr) {
            console.log(i);
            const curentry = curtree[i];

            if (curentry !== undefined) {
                curtree = curentry;

                // Log the default for if the tree is undefined!
                curdefault = curtree["default"];

                console.log(curtree);
                console.log(curdefault);

                // When reaching an output node return:
                if (curtree instanceof OutputNode) {
                    break;
                }

            }

        }

        // Replace undefined tree by last encountered default:
        if (!(curtree instanceof OutputNode)) {
            curtree = curdefault;
        }

        console.log("Final tree:");
        console.log(curtree);
        console.log(curdefault);

        return curtree;

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

    constructor(tokens, tpos_start, tpos_end, sentence_id, paragraph_id) {
        this.token = tokens;

        this.nrow = this.token.length;
        this.ncol = 5;

        // Token information:
        this.id = [...Array(this.nrow).keys()];
        this.start = tpos_start;
        this.end = tpos_end;
        this.sent = sentence_id;
        this.par = paragraph_id;
        this.par_minmax = [...Array(paragraph_id[this.nrow - 1] + 1).keys()]
            .map(par => [paragraph_id.indexOf(par), paragraph_id.lastIndexOf(par)]);
        console.log("Paragraph boundaries:");
        console.log(this.par_minmax);

        // Also check for equal length in the future!
        // Also check for equal types per column!

        // Add global properties like number of rows (and columns) as properties:
        this.global_keys = ["global_keys", "nrow", "ncol", "colnames", "topics", "par_minmax"];
        this.colnames = Object.keys(this).filter((x) => !this.global_keys.includes(x));
        this.topics = [];  // initialize empty topic set.


    }

    // Function to output all:
    print(highlight_rows) {

        // console.log(Object.keys(this));
        if (highlight_rows === undefined) {
            highlight_rows = [];
        }

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
            if (highlight_rows.includes(ix_token)) {
                const highlight = "font-weight: bold; color: red; font-style: italic; background-color: yellow";
                // const normal = "font-weight: normal";
                // console.log("A string with a %cbold%c word", bold, normal);
                console.log("%c" + rowstr, highlight);
            } else {
                console.log(rowstr);
            }


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
        // console.log("Adding info what is a number:");
        // console.log(this.token.map((x, ix) => regex_num.test(x) || (RegExp(collapse_regex_or(numwords), "dg").test(x) && this.unit[ix] !== -1)));
        // this.add_column(this.token.map((x, ix) => regex_num.test(x)), "is_num");
        this.add_column(this.token.map((x, ix) => regex_num.test(x) || (RegExp(collapse_regex_or(numwords), "dg").test(x) && this.unit[ix] !== -1)), "is_num");
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

        // Implement window check instead?
        // Check, if some of the regular expression sets match:

        const token_str = this.token.join("_");

        if (key_list.some(x => x.every(rex => RegExp(rex).test(token_str)))) {
            this.topics = this.topics.concat(topic);
        }

    }

    // Method to detect number types:
    detect_number_type(txt, numtype_dict) {
        this.add_column(detect_number_type(this, txt, numtype_dict), "numtype");
    }
}


/**
 * Output of token data from function
 * @return {Object}     Object containing word and punctuation tokens from a text and their positions.
 * @param text {String} A text, in which words are delimited by spaces and punctuation is followed by space, newline or end of line $.
 */
function get_token_data(text) {

    text = text.replaceAll('"', "\"");

    const text_tokens = word_tokenizer(text);  // Define the text as word and punctuation tokens.
    // console.log(text_tokens);  // for testing.

    let token_i;
    let token_set = new Set();  // set of unique tokens.
    let tpos_start = [];  // starting position of token.
    let tpos_end = [];  // end position of token in basic text.
    let token_pat;
    let curpos;

    let sentence_ids = [];
    let paragraph_ids = [];
    let cur_sentence_id = 0;
    let cur_paragraph_id = 0;

    // get paragraphs:
    console.log("PARAGRAPHS");
    let paragraph_array = [];
    for (const mtc of text.matchAll(/\n\n/dg)) {
        console.log(mtc.index)
        paragraph_array = paragraph_array.concat(mtc.index);
    }
    console.log(paragraph_array);

    // Assign each token its beginning index:
    for (let i = 0; i < text_tokens.length; i++) {

        token_i = text_tokens[i];

        // Regex for token to ensure exact matching:
        if (["\\n\\*", ".", ":", ";", ",", "?", "!", "(", ")", "\"", "'", "/", "\-", "\u2018", "\u2019", "\u201c", "\u201d"].includes(token_i) ||
            /\++/g.test(token_i)  // also test plus signs (and potentially other quantifiers)
        ) {
            // Punctuation follows somewhat different rules.
            // NOTE: Overlaps with other entities, likely because of the lack of spaces.

            // Escape and add lookahead or behind.
            if (["(", ")"].includes(token_i)) {
                token_pat = token_i.replace(/([.?()/])/dgm, "\\$1");
                // was: token_pat = "(?<=\\s|\\n|^)" + token_i.replace(/([.?()/])/dgm, "\\$1");
            } else if (["\"", "'", "\u2018", "\u2019", "\u201c", "\u201d"].includes(token_i)) {
                token_pat = token_i;  // no requirement to escape?
            } else {
                token_pat = token_i.replace(/([.?()/+\-])/dgm, "\\$1") + "(?=\\s|\\n|$|\\.|,|-|[\"'\u2018\u2019\u201c\u201d])";
            }

        } else {
            token_pat = "(?<!\\w)" + token_i + "(?!\\w)";
        }
        const token_rex = RegExp(token_pat, "gm");  // global needed for exec to work and m to match across multiple lines
        // console.log(token_rex);

        // Set index to search from to previous index:
        // NOTE: In this place the debugger often stops on unhandled expressions!
        token_rex.lastIndex = tpos_end[tpos_end.length - 1];  // tpos_start[ix_prev] + text_tokens[ix_prev].length;
        curpos = token_rex.exec(text).index;

        // Save start and end positions of token:
        tpos_start = tpos_start.concat(curpos);
        tpos_end = tpos_end.concat(curpos + token_i.length - 1);

        // Assign sentence ID:
        sentence_ids = sentence_ids.concat(cur_sentence_id);
        if (["?", ".", "!", ";"].includes(text_tokens[i])) {
            cur_sentence_id++
        }  // increment the id when a punctuation token is found

        // Assign paragraph ID:
        if (curpos > paragraph_array[cur_paragraph_id]) {
            cur_paragraph_id++
        }  // increment the id when a punctuation token is found
        paragraph_ids = paragraph_ids.concat(cur_paragraph_id);

    }

    return new TokenData(text_tokens, tpos_start, tpos_end, sentence_ids, paragraph_ids);
}


// ----------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ----------------------------------------------------------------
let testcount = 0;

// ~~~~~~~~~~~~~~~~~~~ PROCESSING FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~
// Entry of keyset
// "number_unit": ["perc", "mult", "nyear"],  // add in other types eventually! 30-fach etc.
//                 "keyset": [
//                     // A first entry to a domain-general keyset for risk:
//                     [RegExp(collapse_regex_or(["[Rr]isiko", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle"])),
//                         RegExp(collapse_regex_or(["höher", "erhöht"]))],
//                     [RegExp(collapse_regex_or(["[Uu]nterschied", "höher", "vergrößerte"])),
//                         RegExp(collapse_regex_or(["Lebenserwartung", "Abstand"]))]
//
//                 ]
/**
 * Tries to detect the type of each number by using its unit and additional context information
 * @return {Array}     An array of number types for numeric token data
 * @param token_data {Object} A token data object with information about numbers.
 * @param txt {String} The text corresponding to the token data, allowing to detect matches.
 * @param numtype_dict {Object} Object with numtypes as keys. Field "number_unit" must contain units that are eligible for this number type.
 Field keyset contains an array of arrays containing RegEx. If all RegEx in any inner array are true, the number type is assigned.
 * @returns {any[]}
 */
function detect_number_type(token_data, txt, numtype_dict) {

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
    //
    // // Update the keyset:
    // console.log("Current keyset numtype:");
    // console.log(numtype_dict);

    // Include topic-specific keywords:
    if (token_data.topics.includes("impf")) {
        // Include Impf-specific keys
        // Do so as an inclusive disjunction.
        numtype_dict.decr.keyset = numtype_dict.decr.keyset.concat(keyset_impf);
        // testcount++;
    }

    // Detect matches that are indicative of certain data types:
    const relation_dict = {
        "treatre_pre": /(?<treat>(\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}geimpften (Proband\w+|Teilnehm\w+|Kind\w+|Behandelt)))/dg,
        "controlrel_pre": /(?<contr>\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(in der|unter den (Teilnehme\w+ |Proband\w+){,2} der|auf die (Teilnehme\w+ |Proband\w+){,2}) (Kontroll|Placebo|Vergleichs)-?[Gg]ruppe)/dg,
        "treatre_post": /(?<treat>((auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}(geimpften|behandelten) (Proband\w+|Teilnehm\w+)) ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2})/dg,
        "treatre_post2": /(?<treat>((auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}(Behandelt\w+)) ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2})/dg,
        "controlrel_post1": /(?<contr>(auf die|unter den) (Teilnehme\w+ |Proband\w+){,2} ([a-zA-ZÄÖÜßäöü]+ ){1,2}(Kontroll|Placebo|Vergleichs)-?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2})/dg,
        "controlrel_post2": /(?<contr>in der (Kontroll|Placebo|Vergleichs)[- ]?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\d+( [a-zA-ZÄÖÜßäöü]+){0,2})/dg
    }

    const ref_matches = detect_regex_match(txt, token_data, relation_dict);

    // console.log("Reference matches");
    // console.log(ref_matches);

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

                // console.log("Current numtype_dict:");
                // console.log(numtype_dict);

                for (const [key, value] of Object.entries(numtype_dict)) {

                    // console.log(`Data judged for key ${key}:`);
                    // console.log(`Token: ${token_data.token[curnum_id]}, Unit: ${token_data.unit[curnum_id]}`);
                    // console.log(value);

                    // Check for the number type to select whether the number type (cases, percentage...) applies:
                    if (value.number_unit.includes(token_data.unit[curnum_id].toString())) {
                        // reversed relative to previous version, was: token_data.unit[curnum_id].includes(value.number_unit)
                        // Allows to associate numbertypes with different units!

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
                        // // console.log(keyset);
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
                            //     numtype = "change";
                            // } else {
                            //     numtype = "ABS";
                            // }
                        }


                    }

                }

                // Check number if numtype remained other:
                if (numtype === "other") {

                    // console.log("Sentence tokens");
                    // console.log(sentence_tokens);

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
    // console.log("Output numtypes:");
    // console.log(num_types);
    return num_types;

}


/**
 * Investigates a contex window around numbers or other entities
 * @return {Array}     An array including information about elements of token based on surrounding words defined in keyset.
 * @param token_data {Object} A token data object with information about numbers.
 * @param index_arr {Array} An array of indices corresponding to the token data, indicating which elements should be considered.
 * @param keyset {Object} An object with named keysets determining the classes assigned.
 * @param only_pars {Boolean} Flag, if only paragraphs should be checked for context.
 */
function investigate_context(token_data, index_arr, keyset, only_pars) {

    let context_info = Array(token_data.nrow).fill(-1);  // was: "none"

    if (only_pars === undefined) {
        only_pars = true;
    }

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

    // console.log("Current keyset window:");
    // console.log(JSON.stringify(keyset));
    // Turn the keyset into regex:
    keyset = {...keyset};  // copy the object to prevent that it is overridden
    for (const key of Object.keys(keyset)) {
        // console.log(keyset[key]);
        keyset[key] = RegExp(collapse_regex_or(keyset[key]), "dg")
    }
    // console.log(keyset);

    // Get paragraph minimum and maximum:
    // let par_minmax = [];
    // console.log(par_minmax);
    // for(const par of [...Array(token_data.par[token_data.nrow - 1] + 1).keys()]){
    //     token_data.id.filter((tok, ix) => )
    // }
    const par_minmax = token_data.par_minmax;

    // For each number query:
    for (const token_ix of index_arr) {

        // console.log("-------- NEW TOKEN --------");
        // console.log(`+++ Token number ${token_ix}: ${token_data.token[token_ix]} +++`);

        // PREPARE THE WINDOW: ~~~~~~~~~~~~~~
        let testcounter = 0;  // testcounter to avoid infinite loops!

        // Define the absolute maximum:
        let min_start = 0;
        let max_end = token_data.nrow;
        if (only_pars) {
            // Limit search to paragraph:
            const curpar = token_data.par[token_ix];  // get current paragraph.
            min_start = par_minmax[curpar][0];
            max_end = par_minmax[curpar][1];  // could also be sentence end!
        }

        // Note: One could additionally implement a list of "locks":
        let lock_start = token_ix;  // 0;
        let lock_end = token_ix + 2;  // token_data.nrow;
        // could also be relative to token, e.g., start at 0 tokens before and 2 after, the increase the rage based on some rules!

        let numberfeats = new Set();
        let key_info = {};

        // Initialize flag for having encountered stop-tokens:
        // const stop_token_set = ["\\n", ".", "?", "!", ":", "oder", "und", ";", ",", "-"];
        let stop_tokens = ["\\n", ".", "?", "!", ":", "und", ";", ",", "oder", "-"];  // renew for each number!
        let stop_token_start = false;
        let stop_token_end = false;
        let stop_update_count = 0;

        let description_complete = false;  // initialize condition for complete description.

        // Window prior to number:
        let window_start = token_ix;
        let window_end = token_ix;

        // OPEN THE WINDOW: ~~~~~~~~~~~~~~~~
        while (!description_complete && (lock_start > min_start || lock_end < max_end)) {

            // console.log(`Token ${token_ix}, window start: ${window_start}, lock start: ${lock_start}, window end: ${window_end}, lock end: ${lock_end}; range before: ${token_ix - lock_start}, range after: ${lock_end - token_ix}, current stop tokens: ${stop_tokens.join(" ")}`);

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
            const test_str = test_tokens.join("_").replaceAll("-", "_");
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
                        key_info[key] = [match.indices,  // positions in teststring
                            stop_update_count,  // stop_token_set.length - stop_tokens.length,  // number of tokens removed.
                            testcounter];  // number of iteration.
                        console.log(key_info);


                    }

                    // Add the feature:
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

            // Extend the window:
            // Possible extension: Asymmetric updating (dependent on context words -- e.g., we will want to know what happens after "in").
            // Do before or after stop tokens?
            lock_start = !stop_token_start && lock_start > min_start ? lock_start - 1 : lock_start;
            lock_end = !stop_token_end && lock_end < max_end ? lock_end + 1 : lock_end;


            // Update the stop tokens:
            if ((stop_token_start && stop_token_end) || (stop_token_end && lock_start === min_start) || (stop_token_start && lock_end === max_end)) {
                // console.log("UPDATE STOP TOKENS");
                stop_tokens.pop();  // remove the last stop token and retry.
                // When both are at the end, reset them.
                stop_token_start = stop_tokens.includes(token_data.token[window_start]);
                stop_token_end = stop_tokens.includes(token_data.token[window_end]);
                stop_update_count++;
            }

            // if ((stop_token_end && lock_start === min_start) || (stop_token_start && lock_end === max_end)) {
            //     console.log("UPDATE STOP TOKENS when one window is at the end");
            //     stop_tokens.pop();  // remove the last stop token and retry.
            // }


            // conditions for completeness:
            // Note: Currently a dummy condition!
            // MAYBE: Require at least one update of stop tokens to make it greedy? stop_update_count > 0
            // If one category could be clarified, exclude it?
            // Now also require that at least one stop token has been encountered (?)

            if (Object.keys(keyset).filter((x) => numberfeats.has(x)).length > 0 &&
                stop_update_count > 2  // NOTE: KEEP?
            ) {
                // console.log("FINAL TESTSTRING:\n" + test_str);
                // console.log(test_tokens);
                // console.log("DESCRIPTION COMPLETE");
                description_complete = true;

                // console.log(numberfeats);

                if (numberfeats.size > 1) {
                    numberfeats.delete("all");  // give more specific features precedence!
                }

            }

            // Fix a maximum number of iterations to avoid breakdown!
            if (testcounter > 50 || (lock_end === max_end && lock_start === min_start)) {
                console.log("BREAK DESCRIPTION");
                description_complete = true;
                // console.log(numberfeats);
                numberfeats = numberfeats.add("unknown");
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
        [/Teilnehm|[Ff][aä]ll|Proband|Person|Mensch|Kind|Mädchen|Junge|Männer|Frauen|Verl[aä]uf|Erwachsen/, "freq"]  // frequencies.
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
 * Detect matches defined in an object in a regular expression.
 * @param txt
 * @param token_dat
 * @param check_dict
 * @returns {{arr_match: *[], match_id: any[], match_type: any[]}}
 */
function detect_regex_match(txt, token_dat, check_dict) {
    let arr_match = [];

    // Array with precendence rules:
    // const arr_drop = [
    //     {"set": ["age", "nyear"], "drop": "age"}  // which should be checked and which should be dropped?
    // ];

    // Loop over dictionary with rules:
    for (const [key, value] of Object.entries(check_dict)) {
        // Variant with exec:
        const matches = get_regex_matches(txt, value);
        arr_match = arr_match.concat(matches);

    }

    // Clean up the matches from all for redundancy:
    console.log("Match objects:");
    console.log(JSON.stringify(arr_match));
    // If a match is fully included in another, the match can be removed.
    // There is also some hierarchy (undefined numbers should only be output when

    // Add the matches to the text data:
    let token_match = Array(token_dat.token.length).fill(-1);
    let match_type = Array(token_dat.token.length).fill(-1);

    let i = 0;
    let droplist = [];

    for (let match of arr_match) {
        // For a token to be part of a match, the following conditions must be fulfilled:
        // Match start must be greater or equal than token start and smaller than token end
        let match_start = token_dat.start.findIndex(x => x >= match.start_end[0] && x < match.start_end[1]);
        // Match end must be smaller or equal to token end and larger than token start
        // Search from the back!
        let match_end = token_dat.end.findLastIndex(x => x <= (match.start_end[1] - 1) && x > match.start_end[0]);
        console.log("Match start and end: " + match_start + ", " + match_end + ", " + match.type);
        console.log(match);
        console.log(JSON.stringify(match_type));  // already found matches.

        // If one of the indices can be found:
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

            // Check if the match has been defined already:
            if (match_type[match_start] === -1 && match_type[match_end] === -1) {

                console.log("Establish new match");
                match_id = [i];
                cur_type = match.type;

                // } else if (match.type[0] !== "unknown") {
            } else if (!["unknown", "ucarryforward"].includes(match.type[0])) {  // now exclude both.

                // console.log("Match type");
                // console.log(match.type);
                droplist = droplist.concat(i);
                let prev_ix = token_match[match_start]

                const precedence_list = ["nyear", "age"];
                // nyear has precedence over age, because it is more specific!

                if (prev_ix !== -1) {
                    prev_ix = Array.isArray(prev_ix) ? prev_ix : [prev_ix];
                    match_id = prev_ix.concat(i);

                    // Also amend the previous match to include the other type?
                    const prev_type = arr_match[prev_ix[0]].type;  // get the previous type.
                    cur_type = match.type;  // might also concat...
                    // note: conversion to string should be robust, since only the first key ist saved.

                    console.log(`Does ${cur_type}: ${precedence_list.indexOf(cur_type)} replace ${prev_type[0]}: ${precedence_list.indexOf(prev_type[0])}`);
                    console.log(cur_type);
                    console.log(prev_type);

                    if (precedence_list.indexOf(cur_type[0]) < precedence_list.indexOf(prev_type[0])) {
                        // Note: undefined is indexOf = -1; thus undefined has precedence over defined!
                        // arr_match[prev_ix[0]].type = prev_type.type.concat(cur_type);  // combine previous and current.
                        console.log(`Replace match ${prev_type} with ${cur_type}`);
                        arr_match[prev_ix[0]].type = cur_type;  // update match, if curtype has precedence.
                    } else {
                        cur_type = prev_type;
                    }
                }

            } else {
                // console.log(`Drop match ${match.type}`);
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
        // Increment match ID:
        i++;
    }

    // Remove the indices that have to be dropped:
    arr_match = arr_match.filter((ele, index) => !droplist.includes(index));
    console.log(arr_match);

    // Sort the array by the starting position of each match:
    arr_match = arr_match.sort((a, b) => a.start_end[0] - b.start_end[0]);

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
    // Define abbreviations and replace the point temporarily:
    const abbrevs = ["mind", "z.B", "etc", "oä", "bzw"];
    txt = txt.replaceAll(RegExp("(?<=" + collapse_regex_or(abbrevs) + ")(\\.)", "gm"), "xABBREVx");

    // Split the text into its tokens:
    const split = txt
        .replace(/([.,;?!:)])(?=[\s"'\u2018\u2019\u201c\u201d?])/g, ' $1 ')  // Ensure that punctuations becomes their own by adding a space before.
        .replace(/([.,;?!:])(?=$)/g, ' $1 ')
        .replace(/([)])/g, ' $1 ')  // space before any parenthesis.
        .replace(/([("'\u2018\u2019\u201c\u201d])/g, ' $1 ')  // space after opening parentheses or quote.
        // .replace(/((?<=\s)[("'\u2018\u2019\u201c\u201d])/g, ' $1 ')  // space after opening parentheses or quote.
        // .replace(/(["'\u2018\u2019\u201c\u201d](?=\s))/g, ' $1')  // space before quotes.
        .split(/[\s\u2022]/g);  // split on spaces and bullets.

    const out = split.map((x) => x.replace("xABBREVx", "."));  // re-replace the point.

    // console.log("Token split");
    // console.log(split);

    // Remove empty tokens and punctuation:
    // const clean_split = split.replace(/(?<!\W)[.,/#!$%^&*;:{}=_`~()](?!\W)/g,"");
    // Remove punctuation that is not within words.
    // Punctuation list: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    // return split.filter(x => !/(?<!\w)[.,/#!$%^&*;:{}=_`~()](?!\w)/g.test(x));
    return out.filter(x => x);
}


/**
 * Splits a text into an array of paragraphs
 * @return {Array}     An array of paragraphs
 * @param txt {String} A text, in which paragraphs are delimited by \n\n.
 */
function paragraph_tokenizer(txt) {
    const split = txt.split(/\n\n/g);

    // Remove empty tokens:
    return split.filter(x => x);
}


/**
 * Splits a text into an array of sentences
 * @return {Array}     An array of sentences
 * @param txt {String} A text, in which sentences are delimited by [.?!].
 */
function sentence_tokenizer(txt) {
    const split = txt.split(/(?<=[.?!;])[ \r\n]/g);

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
            // console.log(match.groups);
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
        console.log(curmatch);
        // NOTE: key[0] ensures that it is only one item.
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
 * Check, if all elements of any of an array of arrays is included in a test array.
 * @param arrs Array of arrays to test.
 * @param check_arr Array to test if any test array is fully included
 * @returns {*}
 */
function check_any_arr(arrs, check_arr) {
    return arrs.some((arr) => check_arr.every((x) => arr.includes(x)))
}

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

// Printing:
// https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript
// function printDiv({divId, title}) {
//   let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
//
//   // ASSEMBLE THE ANNOTATIONS HERE? ESSENTIALLY RE-CREATE THE TEXT?
//
//   mywindow.document.write(`<html><head><title>${title}</title>`);
//   mywindow.document.write('</head><body >');
//   mywindow.document.write(document.getElementById(divId).innerHTML);
//   mywindow.document.write('</body></html>');
//
//   mywindow.document.close(); // necessary for IE >= 10
//   mywindow.focus(); // necessary for IE >= 10*/
//
//   mywindow.print();
//   mywindow.close();
//
//   return true;
// }

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
