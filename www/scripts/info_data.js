/**
 * Dictionary with information to be presented in the Wiki and summaries to be used in otherplaces.
 IDs for wiki will receive the prefix "wiki-"
 * @type {{}}
 */

const info_data = {
    // Empty data:
    "mt": {
        "heading": "",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": [],
        "maintext": ""   // string of main text for wiki.
    },
    // Basisrisiko:
    "baseprob": {
        "heading": "Basisirisiko (Basiswahrscheinlichkeit)",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Basiswahrscheinlichkeit", "Prävalenz"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Risiko in einer Vergleichsgruppe ohne Intervention (z.B. ohne Impfung oder Medikation)"],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Das Basisrisiko ist zentral, um die Wirksamkeit einer Intervention (Impfung, Medikament etc.) zu beurteilen " +
            "oder um zu bestimmen, ob ein bestimmtes Verhalten schädlich ist." +  // string of main text for wiki.
            "Es beschreibt die Wahrscheinlichkeit mit der ein Ereignis auftritt, wenn keine Behandlung stattgefunden hat " +
            "(z.B., in der ungeimpften Allgemeinbevölkerung oder unter nichtrauchenden personen)." +
            " </p>" +
            "<p>" +
            "Eine Impfung oder ein Medikament ist nur dann wirksam, wenn das Basisrisiko unter den Geimpften geringer ist. " +
            "Gleichermaßen ist ein Verhalten nur dann schädlich, wenn die Wahrscheinlichkeit für negative Folgen wie Krankheit oder Tod " +
            "unter denjenigen, die das Verhalten zeigen größer ist." +
            "</p>" +
            "<p>" +
            "Wichtig ist hierbei nicht nur die <a href=\"risk_wiki.html#wiki-rel\">relative Veränderung</a> zu betrachten." +
            "Eine Verdoppelung eines Risikos kann bedeuten, dass von 10,000 Personen anstelle von 2 Personen 4 Personen erkranken" +
            "(Veränderung von 0.02% auf 0.04%)" +
            "oder dass von 10,000 Personen anstelle von 200 Personen 400 Personen erkranken (Veränderung von 2% auf 4%)" +
            "Daher muss immer (auch) die [LINK]<a>absolute Reduktion</a> kommuniziert werden (mindestens als absolute Prozentzahlen in den " +
            "Gruppen, die verglichen werden)." +
            "</p>"

    },
    // Percentages:
    "prozent": {
        "heading": "Prozentzahlen",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",
        "overview": ["Bezugsgröße ist entscheidend, besonders für <a href=\"risk_wiki.html#wiki-rel\">relative Angaben</a>" +
        " (z.B., eine Erhöhung von 50%, eine Impfstoffwirksamkeit von 90%)",
            "Absolute Ereigniswahrscheinlichkeiten sind <a href=\"risk_wiki.html#wiki-rel\">relativen Angaben</a> vorzuziehen",
            "Prozentzahlen sollten nur für Zahlenwerte größer 1% n werden. Ansonsten sind <a>"],
        "examples": [],
        "popup": ["<ul>" +
        "<li>Bei Prozentzahlen muss die <a>[LINK!]Bezugsgröße</a> immer klar sein (d.h., auf welche Gruppe sich der Anteil bezieht)</li>" +
        "<li>Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.</li>" +
        "<li>Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a>.</li>" +
        "</ul>"],
        "maintext": "<p>Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden." +
            "Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> (z.B., 1 aus 100 oder 1 aus 1000)</p>."
// ["Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.",
// "Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a>."]
    },
    // Frequencies:
    "freq": {
        "heading": "Häufigkeiten",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Wenn es sich nicht um die Gesamtzahl handelt, sollte klar werden auf welche Gesamtzahl sich die Häufigkeit bezieht (z.B., 100 Erkrankte von wie vielen?)"],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["100 Personen", "10.000 Studienteilnehmende", "3456 Todesfälle", "12 Geimpfte", "21 Äpfel"],  // array of list items with examples.
        "popup": ["<ul>" +
        "<li>Achten Sie darauf immer die [LINK]Grundgesamtheit (z.B., Anzahl der Geimpften) anzugeben, auf die sich die Anzahl bezieht.</li>" +
        "<li>Transparenter sind <a href=\"risk_wiki.html#wiki-rel\">natürliche Häufigkeiten</a> (z.B., 15 aus 1000).</li>" +
        "</ul>"],
        "maintext": "<p>Häufigkeiten natürliche Zahlen, die die Anzahl von Personen oder Dingen beschreiben.</p>" +
            "<p>Im Kontext medizinischer Berichterstattung handelt es sich häufig um die Anzahl von Erkrankungsfällen oder " +
            "die Anzahl von Personen mit nebenwirkungen in einer Studie.</p>"   // array of paragraphs as main text for wiki.
    },
    "sample_size": {
        "heading": "Stichprobengröße",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["10.000 Studienteilnehmende", "1000 Probanden", "insgesamt 5000 Versuchsteilnehmer"],  // array of list items with examples.
        "popup": ["<p>Hilfreiche Angabe. Die Stichprobengröße hilft, die Zuverlässigkeit der Daten zu beurteilen und kann als Referenz dienen.</p>" +
        "<p></p>"],
        "maintext": ""   // array of paragraphs as main text for wiki.
    },
    "nh": {
        "heading": "Natürliche Häufigkeiten (auch: relative Häufigkeiten)",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "[TODO: Improve design of examples!]<br>",
        "overview": ["Bezugsgröße sollte konstant sein.",
            "Absolute Ereigniswahrscheinlichkeiten sind relativen Angaben vorzuziehen"],
        "examples": ["440 von 1000 Personen ohne Auffrischungsimpfung gegen COVID-19 erkranken, während unter den " +
        "Geimpften nur 270 von 1000 erkranken.<br><a href=\"https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren\">https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren</a>"],
        "popup": ["<p><a href=\"risk_wiki.html#wiki-nh\">Natürliche Häufigkeiten</a> sind sehr transparent, um Risiken auszudrücken. " +
        "Achten Sie aber darauf, dass die Referenz (d.h., 1 in 1000 oder 1 in 10000) jeweils konstant ist.</p>"],
        "maintext": "<p>Im Unterschied zu <a href='#wiki-freq'>Häufigkeiten</a>, haben <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> eine Bezugsgruppe(?).</p>"
    },
    "rel": {
        "heading": "Relative Angaben",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["<i class=\"fa fa-exclamation-triangle annote-text-icon\"></i>Vorsicht vor relativen Angaben! Relativ zu was?",
            "Leicht missverständlich, führen häufig zur Überschätzung uns sind daher nicht transparent",
            // "Relative Angaben sollten daher niemals ohne absolute Wahrscheinlichkeiten verwendet werden.",
            "Immer mindestens das Basisrisiko (die Basiswahrscheinlichkeit) in der <a>[LINK]Kontrollgruppe</a> berichten."
// "Falls nur relative Angaben verwendet werden können, müssen sie gleichermaßen für Nutzen und Schaden der Impfung, des Medikamentes oder des Verhaltens verwendet werden."
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["20-mal so viel", "Impfwirksamkeit[LINK] von 90%"],  // array of list items with examples.
        "popup": [
            "<p><i class=\"fa fa-exclamation-triangle annote-text-icon\"></i>Vorsicht vor relativen Angaben! Alleinstehend intransparent. Bezug?</p>" +
            "<ul>" +
            "<li>Leicht missverständlich; führt häufig zu <a href=\"risk_wiki.html#wiki-error-rel\">Überschätzung des Risikos</a></li>" +
            "<li>Es muss zumindest die <a href='base-prob'>Basiswahrscheinlichkeit</a> in der Vergleichsgruppe angegeben werden.</li>" +
            "</ul>"
            ],
        "maintext": "<h4>Verwendung</h4>" +
            "<p></p>" +
            "<h4>Relative Angaben können missverständlich sein.</h4>" +
            "<p>Ein relativer Risikoanstieg um das 5-fache klingt viel. Bei einer Erkrankung die nur 1 Person unter 10.000 betrifft, " +
            "bedeutet ein solcher Anstieg aber nur dass unter denjenigen mit dem Risikofaktor (z.B., mit einer bestimmten Ernährungsweise)" +
            "anstelle von einer Person (0.01%), 5 Personen in 10.000 (0.05%), erkranken.</p>" +
            "<p>Ähnlich verhält es sich mit der <span class='rrr'>relativen Risikoreduktion</span>, wie sie häufig zur angaben von Impfwirksamkeiten verwendet wird." +
            "Eine Impfwirksamkeit von 90% etwa bedeutet dass unter den Geimpften 90% weniger Personen erkranken." +
            "Erkranken in der nicht geimpften Gruppe zum Beispiel 10 aus 1000, so erkrankt in der geimpften Gruppe" +
            "1 aus 1000." +
            "</p>" +
            "<p>" +
            "Das entspricht einer absoluten Risikoreduktion um 0.9% (von 1% auf 0.1%)." +
            "[CHECK!]" +
            "Dieser Effekt wirkt erheblich kleiner als die relativen 90%." +
            "<span id=\"wiki-error-rel\">Da relative Angaben oft zu einer Fehleinschätzung führen</span>, sollten sie" +
            "vermieden werden." +
            "Wenn sie verwendet werden, sollten sie gemeinsam mit <a>absoluten Risikoangaben[TODO]</a> verwendet" +
            "werden, um so eine transparente Einschätzung des Risikos zu gewährleisten." +
            "</p>" +
            "<h4>Verwendung derselben Zahlentypen für Nutzen und Schaden</h4>" +
            "[MAKE REFERENCEABLE?]" +
            "<p>" +
            "Falls nur relative Angaben verwendet werden, sollten sie gleichermaßen für Nutzen und Schaden" +
            "des Medikamentes oder des Verhaltens verwendet werden." +
            "<br>" +
            "Wenn der Nutzen relativ ausgedrückt wird, wird er häufig überschätzt (<a href=\"#wiki-error-rel\">s." +
            "oben</a>)" +
            "[BEISPIEL!]" +
            "</p>"
    },
    // Other kinds of numbers:
    "pval": {
        "heading": "<i>p</i>-Werte",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["<a href='risk_wiki.html#wiki-cprob'>Bedingte Wahrscheinlichkeit</a> diese oder extremere Daten in einer Stichprobe zu beobachten",
            "Der p-Wert wird häufig missverstanden und sollte nicht verwendet werden"],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Der p-Wert wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
            "<p>Der p-Wert ist die <a href='wiki-cprob'>bedingte Wahrscheinlichkeit</a> diese oder extremere Daten in einer Stichprobe zu beobachten, " +
            "wenn es in der Population eigentlich <emph>keinen</emph> Unterschied gibt.</p>" +
            "<p>Nehmen wir an, dass in einer fiktiven Untersuchung eines neune Medikamentes unter den Behandelten 2 aus 1000 erkranken, " +
            "während unter den Unbehandelten 5 aus 1000 erkranken. Der p-Wert is 0,01. " +
            "Das bedeutet, dass die Wahrscheinlichkeit, eine absolute Risikoreduktion von 3 in 1000 zu beobachten, " +
            "wenn es eigentlich keinen Unterschied gibt, bei 1% liegt.</p>" +
            "<p>Da der p-Wert auch von Expert*innen häufig missverstanden wird, sollte er in journalistische Publikationen eher nicht verwendet werden.</p>" +
            "<p>Zudem ist er bei Untersuchungen mit sehr vielen Versuchspersonen nicht informativ, da er für große Stichproben typischerweise sehr klein wird.</p>"
    },
    "cprob": {
        "heading": "Bedingte Wahrscheinlichkeit",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Die Wahrscheinlichkeit eines Ereignisses, bedingt darauf, dass eine Bedingung wahr ist (z.B., dass jemand erkrankt ist)"],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Unter den Erkrankten erhalten 90 aus 100 ein positives Testergebnis",
            "Unter den Geimpften erkranken 6 aus 1000",
            "Die Sensitivität des Tests beträgt 99%"],  // array of list items with examples.
        "popup": [],
        "maintext": "[TODO] Stichworte: Sensitivität, Spezifität, PPV, NPV"   // string of main text for wiki.
    }
}