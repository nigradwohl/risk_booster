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
        "maintext": []   // strig of main text for wiki.
    },
    // Percentages:
    "prozent": {
        "heading": "Prozentzahlen",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",
        "overview": ["Bezugsgröße ist entscheidend, besonders für <a href=\"#wiki-rel\">relative Angaben</a>" +
        " (z.B., eine Erhöhung von 50%, eine Impfstoffwirksamkeit von 90%)",
            "Absolute Ereigniswahrscheinlichkeiten sind <a href=\"#wiki-rel\">relativen Angaben</a> vorzuziehen",
        "Prozentzahlen sollten nur für Zahlenwerte größer 1% verwedet werden. Ansonsten sind <a>"],
        "examples": [],
        "maintext": "Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden." +
            "Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a>."
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
        "maintext": "<p>Im Unterschied zu <a href='wiki-freq'>Häufigkeiten</a>, haben <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> eine Bezugsgruppe(?).</p>"
    }
}