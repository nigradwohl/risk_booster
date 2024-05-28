/**
 * Dictionary with information to be presented in the Wiki and summaries to be used in otherplaces.
 IDs for wiki will receive the prefix "wiki-"
 * @type {{}}
 */

const info_data = {
    // Percentages:
    "prozent": {
        "heading": "Prozentzahlen",
        "annotation": "",
        "overview": ["Bezugsgröße ist entscheidend, besonders für <a href=\"#wiki-rel\">relative Angaben</a>" +
        " (z.B., eine Erhöhung von 50%, eine Impfstoffwirksamkeit von 90%)",
            "Absolute Ereigniswahrscheinlichkeiten sind <a href=\"#wiki-rel\">relativen Angaben</a> vorzuziehen"],
        "examples": [],
        "maintext": ["Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.",
            "Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a>."]
    },
    "nh": {
        "heading": "Natürliche Häufigkeiten",
        "annotation": "[TODO: Improve design of examples!]<br>",
        "overview": ["Bezugsgröße sollte konstant sein.",
            "Absolute Ereigniswahrscheinlichkeiten sind relativen Angaben vorzuziehen"],
        "examples": ["440 von 1000 Personen ohne Auffrischungsimpfung gegen COVID-19 erkranken, während unter den " +
        "Geimpften nur 270 von 1000 erkranken.<br><a href=\"https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren\">https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren</a>"],
        "maintext": []
    }
}