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
    "risk": {
        "heading": "Risiko",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Wahrscheinlichkeit"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Risiko beschreibt wie wahrscheinlich es ist, dass ein bestimmtes Ereignis eintritt (im medizinischen Kontext häufig eine Erkrankung, aber auch eine Genesung)",
            "Der Begriff ist nicht deckungsgleich mit dem Alltagsverständnis, das sich typischerweise eher auf negative Ereignisse beschränkt",
            "Der Risikobegriff im Kontext der Risikokommunikation kann meist durch \"Wahrscheinlichkeit\" ersetzt werden."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Das Risiko, sich mit einer Erkrankung anzustecken",
            "Symptome auszubilden",
            "an einer Erkrankung zu versterben, oder",
            "sich bei einer Sportart zu verletzen"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Risiko beschreibt wie wahrscheinlich es ist, dass ein bestimmtes Ereignis eintritt. " +
            "Risikoinformation kann mit Worten oder Zahlen kommuniziert werden. Die Leitlinie für evidezbasierte Gesundheitsinformation " +
            "empfiehlt Risiken nicht nur verbal anzugeben sondern immer auch zahlen zu berichten. " +
            "Diese Zahlen können <a href='#wiki-abs'>absolut</a> oder <a href='#wiki-rel'>relativ sein</a>, " +
            "sprich, die Wahrscheinlichkeit für eine Population oder Gruppe angeben oder die Wahrscheinlichkeiten für " +
            "verschiedne Gruppen als Vielefache vergleichen.</p>"

    },
    "effside": {
        "heading": "Nutzen und Schaden",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Die meisten Medikamente und Impfungen haben nicht nur einen Nutzen, indem sie z.B. den Gesundheitszustand " +
            "verbessern, Symptome abmildern, Todesfälle verhindern oder als Impfung Erkrankungen, sondern können auch " +
            "das Risiko für Schadenwirkungen erhöhen (z.B., Nebenwirkungen, wie Fieber oder andere Erkrankungen).",
            "Bei allen Interventionen und Behandlungen müssen sowohl die Risiken (Wahrscheinlichkeiten) für Nutzen als " +
            "auch Schaden thematisiert werden, damit Lesende eine informierte Entscheidung darüber treffen können, " +
            "ob die Wirksamkeit einer Intervention groß genug ist, um die möglichen Nebenwirkungen zu rechtfertigen.",
            "Die Risiken für Nutzen und Schaden sollten dabei mit Zahleninformation belegt werden und jeweils mit der " +
            "gleichen Bezugsgröße dargestellt werden (z.B. x aus 1000)"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [
            "Während in der Placebogruppe etwa 5 aus 1000 verstarben, verstarben in der Behandlungsgruppe nur etwa 2 aus 1000. Nebenwirkungen, wie Kopfschmerz oder Schwindel traten in der Placebogruppe bei 1% auf, in der Behandlungsgruppe waren es 2%.",
            "Das Medikament verbessert den Gesundheitszustand. Mit dem Medikament berichteten 60 von 100 Personen ein erhöhtes Wohlbefinden. Unter Personen, die ein Placebo erhielten, berichteten nur 20 von 100 ein erhöhtes Wohlbefinden. " +
            "Nebenwirkungen waren leicht erhöhter Blutdruck bei 2 von 100 Personen mit dem Medikament, verglichen mit einer Person mit 1 von 100 Personen in der Placebogruppe."],  // array of list items with examples.
        "popup": ["TODO!"],
        "maintext": "<p>Der Nutzen einer Maßnahme (z.B. einer Behandlung oder einer Verhaltensänderung) kann in " +
            "positiven Auswirkungen oder in der Vermeidung negativer Auswirkungen bestehen. So kann ein Medikament die " +
            "Lebenserwartung erkrankter Personen verlängern (positiv) oder eine Impfung kann Erkrankung verhindern " +
            "(ein negatives Ergebnis vermeiden).</p>" +
            "<p>Analog kann der Schaden einer Maßnahme in Nebenwirkungen (z.B. einem erhöhten Risiko für andere Erkrankungen) " +
            "oder anderen Einschränkungen in der gesundheitsbezogenen Lebensqualität bestehen. Mögliche Ergebnisse sind " +
            "also Erkrankungen (Morbidität), Todesfälle (Mortalität), oder auch Veränderungen in der gesundheitsbezogenen " +
            "Lebensqualität oder Lebensdauer.</p>" +
            "<p>Um informierte Entscheidungen zu ermöglichen, müssen unbedingt immer sowohl der Nutzen einer Maßnahme " +
            "und der Schaden dargestellt werden. Sprich, es sollte zum einen dargelegt werden, wie sich das Risiko für " +
            "negative Folgen verringert oder die Wahrscheinlichkeit für positive Ergebnisse erhöht. Zum anderen muss " +
            "auch dargelegt werden, ob sich durch die Intervention das Risiko für negative Folgen erhöht. Bekommen " +
            "behandelte Personen zum Beispiel wahrscheinlicher Fieber oder erleiden bestimmte Entzündungen?</p>" +
            "<p>Die Leitllinie für evidenzbasierte Gesundheitsmedizin legt dabei nahe, " +
            "dass Risiken, Nutzen und Schaden nicht nur verbal beschrieben werden sollten " +
            "(z.B., das Medikament ist wirksam und sicher, Nebenwirkungen sind unwahrscheinlich). " +
            "Dies liegt daran, dass verbale Darstellungen häufig zu Fehleinschätzungen von Risiken führen. " +
            "Eine numerische Darstellung sorgt hingegen für ein besseres Verständnis und ermöglicht eine realistischere " +
            "Risikoabschätzung, wodurch die Intention, eine Maßnahme durchzuführen, höher ist. " +
            "Studien zur Akzeptanz zeigen zudem eine klare Präferenz für numerische Darstellungen, da diese als glaubwürdiger " +
            "wahrgenommen werden. Zudem zeigt sich, dass numerische Darstellungen attraktiver sind, was zu einer höheren " +
            "Zufriedenheit führt (vgl. <a target=\"_blank\" href=\"https://www.leitlinie-gesundheitsinformation.de/\">Leitlinie evidenzbasierte" +
            "Gesundheitsinformation</a>)</p>" +
            "<p>Bei der numerischen Darstellung ist dringend zu beachten, dass Nutzen und Schaden mit der gleichen " +
            "Bezugsgröße dargestellt werden sollten. Einheitliche Bezugsgrößen " +
            "(z.B. x von 1000) erleichtern das Verständnis im Vergleich zu wechselnden Bezugsgrößen " +
            "(z.B. x von 100; x von 1000; x von 10000). Die Verwendung unterschiedlicher Bezugsgrößen kann die " +
            "Wahrnehmung beeinflussen und zu einer Über- bzw. Unterschätzung des Nutzens oder Risikos führen. " +
            "Das zeigt sich besonders deutlich beim so genannten \"<a href='#wiki-mismatch'>mismatched Framing</a>\"." +
            "Abweichungen von der einheitlichen Bezugsgröße sollten gut begründet und transpararent dargelegt werden. " +
            "Eine Darstellung in <a href='#wiki-prozent'>Prozent</a> ist ebenfalls möglich, sollte jedoch klar und " +
            "konsistent angewendet werden, um Verwirrung zu vermeiden.</p>"   // string of main text for wiki.
    },
    "baseprob": {
        "heading": "Basisirisiko",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Basiswahrscheinlichkeit", "Prävalenz"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "<a href='#wiki-abs'>Absolutes Risiko</a> in einer <a href='#wiki-control'>Vergleichsgruppe</a> ohne Intervention (z.B. ohne Impfung oder Medikation, aber auch ohne ein riskantes Verhalten)",
            "Dient als Vergleichsmaßstab für Interventionen, die die Wahrscheinlichkeit negativer Folgen, wie von Erkrankung oder Tod verringern oder positive Ergebnisse (z.B. Wohlbefinden) erhöhen sollen."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Die Wahrscheinlichkeit unter den Ungeimpften zu Erkranken liegt bei 2%",
            "In der Placebogruppe erkrankten 5 von 1000",
            "Unter nicht rauchenden Männern beträgt das Risiko für Lungenkrebs etwa 2 in 1000",
            "Unter Personen, die nicht regelmäßig Sport treiben, ist das Risiko von Herz-Kreislauferkrankungen bei x%"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Das Basisrisiko ist zentral, um die Wirksamkeit einer Intervention (Impfung, Medikament etc.) " +
            "zu beurteilen oder um zu bestimmen, ob ein bestimmtes Verhalten schädlich ist. Es beschreibt die " +
            "Wahrscheinlichkeit, mit der ein Ereignis auftritt, wenn keine Behandlung stattgefunden hat " +
            "(z.B. in der ungeimpften Allgemeinbevölkerung oder unter nichtrauchenden Personen)." +
            " </p>" +
            "<p>" +
            "Eine Impfung oder ein Medikament sind nur dann wirksam, wenn das Basisrisiko unter den behandelten Personen geringer ist. " +
            "Gleichermaßen ist ein Verhalten nur dann schädlich, wenn die Wahrscheinlichkeit für negative Folgen wie Krankheit oder Tod " +
            "unter denjenigen, die das Verhalten zeigen größer ist." +
            "</p>" +
            "<p>" +
            "Wichtig ist hierbei nicht nur die <a href=\"risk_wiki.html#wiki-rel\">relative Veränderung</a> zu betrachten." +
            "Eine Verdoppelung eines Risikos kann bedeuten, dass von 10,000 Personen anstelle von 2 Personen 4 Personen erkranken" +
            "(Veränderung von 0.02% auf 0.04%)" +
            "oder dass von 10,000 Personen anstelle von 200 Personen 400 Personen erkranken (Veränderung von 2% auf 4%)" +
            "Daher muss immer (auch) die <a href='#wiki-arr'>absolute Reduktion</a> kommuniziert werden (mindestens als absolute Prozentzahlen in den " +
            "Gruppen, die verglichen werden)." +
            "</p>" +
            "<p>Da das Basisrisiko aufgrund anderer Faktoren (z.B., Alter, Geschlecht, andere Erkrankungen, aber auch ein dynamisches Infektionsgeschehen) variieren kann," +
            "kann es dabei sinnvoll sein, Situationen für niedriges und hohes Basisrisiko darzustellen." +
            "Beispielsweise verhindert eine Impfung mit einer Wirksamkeit von 80% " +
            "bei einem relativ niedrigen Risiko von 10 in 1000 nur 8 von 1000 Infektionen (da sich die meisten Personen ohnehin nicht infiziert hätten)," +
            "während sie für ein höheres Risiko von 50 in 1000 etwa 40 von 1000 Infektionen verhindert.</p>"

    },
    // Percentages:
    "prozent": {
        "heading": "Prozentzahlen",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",
        "overview": [
            "Drücken einen Anteil von 100 aus",
            "Absolute Ereigniswahrscheinlichkeiten sind relativen Angaben vorzuziehen",
            "Für <a href=\"risk_wiki.html#wiki-rel\">relative Angaben</a>" +
            " (z.B., eine Erhöhung von 50%, eine Impfstoffwirksamkeit von 90%) sollten unbedingt die Basisrisiken berichtet werden",
            "Prozentzahlen sind eine Alternative zu natürlichen Häufigkeiten und bedeuten dasselbe wie 1 von 100",
            "•\tProzentzahlen sollten nur für Zahlenwerte größer 1% verwendet werden, ansonsten sollten  <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> verwendet werden."],
        "examples": ["Die Wahrscheinlichkeit zu erkranken, wenn man auf eine infizierte Person getroffen ist liegt bei 2% (absolut).",
            "Das Infektionsrisiko war in der Kontrollgruppe 50% höher (relativ).",
            "52% der Versuchsteilnehmer*innen waren weiblich (absolut)."],
        "popup": ["<ul><li>Achten Sie darauf anzugeben, auf welche Gruppe sich der Prozentanteil bezieht</li></ul>"],
        "maintext": // "<p>Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.</p>" +
            "<p>Prozentzahlen drücken aus, auf welchen Anteil von 100 eine Aussage zutrifft " +
            "(lat.-it. per cento: von Hundert). Damit haben Sie eine feste Bezugsgröße.</p>" +
            "<p>Häufig robuster als Prozentzahlen sind natürliche Häufigkeiten (z.B., 1 aus 100 oder 1 aus 1000). " +
            "Diese werden häufig besser verstanden. Insbesondere, für Prozentzahlen kleiner als 1% können so Kommazahlen vermieden werden.</p>" +
            "<p>1% einspricht den <a href='#wiki-nh'>natürlichen Häufigkeiten</a> 1 von 100 oder 10 von 1000. " +
            "Folglich entspricht 0,1% (oder ein Promille) 1 in 1000 und 0,01% entspricht 1 in 10,000." +
            "Nach derselben Logik entsprechen 15 von 100 und 150 von 1000 15%.</p>"
// ["Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.",
// "Besser als <a href=\"\">Prozentzahlen</a> sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a>."]
    },
    // Frequencies:
    "freq": {
        "heading": "Häufigkeiten",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Häufigkeiten sind natürliche Zahlen, die die Anzahl von Personen, Ereignissen (z.B. Krankhietsfällen) oder sonstigen Dingen oder Dingen beschreiben.",
            "Wenn es sich nicht um die eine Gesamtzahl handelt, sollte klar angegeben werden auf welche Gesamtzahl sich die Häufigkeit bezieht (z.B., 100 Erkrankte von wie vielen Personen insgesamt?)"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["100 Personen", "10.000 Studienteilnehmende", "3456 Todesfälle", "12 Geimpfte", "21 Äpfel"],  // array of list items with examples.
        "popup": ["<ul>" +
        "<li>Wenn es sich nicht um die Gesamtzahl in einer Gruppe handelt, achten Sie darauf diese Gesamtzahl immer anzugeben (z.B., Anzahl der Geimpften).</li>" +
        "<li>Transparenter für die Kommunkation von Risiken sind <a target='_blank' href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> mit einer konstanten Referenz (z.B., 15 aus 1000).</li>" +
        "</ul>"],
        "maintext": "<p>Im Kontext medizinischer Berichterstattung werden Häufigkeiten oft verwendet um die Anzahl von " +
            "Erkrankungs- oder Todesfällen oder die Anzahl von Personen mit Nebenwirkungen in einer Studie darzustellen.</p>" +
            "<p>Aus Häufigkeiten in Gruppen lassen sich Risiken ableiten: " +
            "der Anteil der Erkrankten mit Impfung und der Anteil der Erkrankten ohne Impfung bilden die Risiken " +
            "(d.h. Erkrankungswahrscheinlichkeiten) in den jeweiligen Gruppen ab. " +
            "Gleichermaßen bildet der Anteil derer mit starken Symptomen in einer Gruppe mit Medikamenten und der " +
            "Anteil in einer Placebogruppe die Risiken für Symptome in den beiden Gruppen ab.</p>" +
            "<p>Wichtig für eine transparente Risikokommunikation ist, dass Fälle von Erkrankungen oder Todesfällen nicht " +
            "für sich alleine stehen sollten. Alleine sind Fallzahlen nicht aussagekräftig, da dieselbe hohe Fallzahl " +
            "in einer großen Gruppe ein geringeres Risiko ausdrückt, als in einer kleineren Gruppe. " +
            "Verursacht beispielsweise eine Krankheit 1000 Todesfälle innerhalb eines Jahres, stellt das bezogen auf " +
            "die deutsche Gesamtbevölkerung von rund 80 Millionen ein eher kleines Risiko dar (etwas mehr als 1 Tod pro 100.000). " +
            "Dieselbe Anzahl von Todesfällen in Wanne-Eickel (mit etwa 330.000 Personen), " +
            "legt ein erheblich größeres Risiko nahe (303 in 100.000)." +
            "<p>Da Fallzahlen für sich alleine nicht aussagekräftig sind, sollte immer die Größe der zugrundeliegenden " +
            "Gruppen berichtet werden. Eine gute Alternative ist das Berichten von Risiken als " +
            "<a href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> mit einheitlicher Bezugsgröße.</p>"
    },
    "sample_size": {
        "heading": "Stichprobengröße",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Die Anzahl der Personen die in einer Untersuchung oder Studie beobachtet wurden",
            "Größere Stichproben ermöglichen zuverlässigere Aussagen",
            "Die Stichprobengröße sollten stets angegeben werden, da so Rückschlüsse auf die Verlässlichkeit der Ergebnisse gezogen werden können."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["10.000 Studienteilnehmende", "1000 Probanden", "insgesamt 5000 Versuchsteilnehmer"],  // array of list items with examples.
        "popup": [
            "<p>Hilfreiche Angabe. Die <a target='_blank' href='#wiki-sample'>Stichprobengröße</a> hilft, die Zuverlässigkeit der Daten zu beurteilen und kann als Bezugsgröße dienen.</p>"],
        "maintext": "<p></p>" +
            "<p>DDie Größe einer Stichprobe ist aber wird oft von den durch die verfügbaren Ressourcen geleitet begrenzt. " +
            "leine Stichproben liefern nicht zwingend falsche Ergebnisse, aber die Ergebnisse sind typischerweise weniger " +
            "verlässlich und können weniger generalisierbar sein. Daher ist bei Studien mit sehr kleinen Stichproben " +
            "generell Vorsicht geboten (was eine kleine Stichprobe ist, hängt von der Fragestellung, den Basiswahrscheinlichkeiten und dem erwarteten Unterschied ab. " +
            "Im Kontext medizinischer interventionen sind die Basiswahrscheinlichkeiten und Unterschiede häufig eher gering, so dass Stichproben oft recht groß sein müssen. " +
            "Eine eindeutige Empfehlung kann hier nciht gegeben werden. " +
            "Als Faustregel kann man möglicherweise für viele Fälle festhalten, dass Stichproben von 1.000 Personen bereits fragwürdig sein können).</p>"   // array of paragraphs as main text for wiki.
    },
    "nh": {
        "heading": "Natürliche Häufigkeiten",
        "subheading": "(auch: relative Häufigkeiten)",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",
        "overview": [
            "Drücken Risiken als anteilige Häufigkeiten, aus (z.B. x von 100)",
            "Die Bezugsgröße sollte konstant sein (also für alle zu vergleichenden Risiken x von 100 oder x von 1000, x von 10.000 etc.)",
            "Besonders bei Wahrscheinlichkeiten kleiner als 1 sollten natürliche Häufigkeiten verwendet werden"
        ],
        "examples": [
            "440 von 1000 Personen ohne Auffrischungsimpfung gegen COVID-19 erkranken, während unter den " +
            "Geimpften nur 270 von 1000 erkranken.<br>" +
            "<a href=\"https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren\">https://www.hardingcenter.de/de/impfungen/mrna-schutzimpfung-gegen-covid-19-fuer-erwachsene-unter-60-jahren</a>"],
        "popup": [
            "<p><a target='_blank' href=\"risk_wiki.html#wiki-nh\">Natürliche Häufigkeiten</a> sind sehr transparent, um Risiken auszudrücken. " +
            "Achten Sie aber darauf, dass die Referenz (d.h., 1 in 1000 oder 1 in 10000) jeweils für alle Risiken konstant ist.</p>"],
        "maintext": "<p>Natürliche Häufigkeiten sind eine transparente Art, um Risiken darzustellen, da sich " +
            "Individuen die zugrundeliegenden Gruppen gut vorstellen können. Während Lesende bei anderen Zahlenformaten " +
            "möglicherweise eine Perspektive auf den Einzelfall annehmen, bleibt bei natürlichen Häufigkeiten eher klar, " +
            "dass sich die Aussage über das Risiko auf über Personen hinweg bezieht. So wird eher deutlich, dass es " +
            "etwa auch unter Geimpften Erkrankungen geben kann. Eine Verwechslung mit anteiliger Zeit " +
            "(z.B., dass ein Risiko von 70% bedeutet, dass eine Krankheit 70% der Zeit besteht) wird dadurch ebenfalls " +
            "unwahrscheinlicher.</p>" +
            "<p>Nutzen und Schaden sollten mit der gleichen Bezugsgröße dargestellt werden. Einheitliche Bezugsgrößen " +
            "(z.B. x von 1000) erleichtern das Verständnis im Vergleich zu wechselnden Bezugsgrößen " +
            "(z.B. x von 100; x von 1000; x von 10.000). Die Verwendung unterschiedlicher Bezugsgrößen kann die " +
            "Wahrnehmung beeinflussen und zu einer Über- bzw. Unterschätzung des Nutzens oder Risikos führen. </p>" +
            "<p>Abweichungen von der einheitlichen Bezugsgröße sollten gut begründet und transparent dargelegt werden. " +
            "Eine Darstellung in <a href='#wiki-prozent'>Prozent</a> ist ebenfalls möglich, sollte jedoch klar und " +
            "konsistent angewendet werden, " +
            "um Verwirrung zu vermeiden. " +
            "Dabei sollten Prozentzahlen kleiner als eins durch den Einsatz natürlicher Häufigkeiten vermieden werden.</p>"
    },
    "rel": {
        "heading": "Relative Risiken",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Können relative Vergleiche von Risiken wie Vielfache (3-mal mehr, halb so groß), aber auch relative Reduktionen (90% weniger) sein",
            "sind leicht missverständlich, führen häufig zur Überschätzung und sind daher nicht transparent",
            "sollten niemals alleine ohne absolute Risiken oder absolute Risikoveränderungen angegeben werden",
            "Es sollte immer mindestens das <a href='#wiki-baseprob'>Basisrisiko</a> (die Basiswahrscheinlichkeit) " +
            "in der <a href='#wiki-treat-control'>Vergleichsgruppe</a> berichtet werden"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [
            "Das relative Risiko, dass häufig Rauchende an Lungenkrebs erkranken ist 20-mal so groß, wie unter Nichtrauchenden",
            "Bei Personen über 60 Jahren ohne Corona Infektion ist das Risiko innerhalb eines Jahres zu versterben halb so groß " +
            "wie bei Gleichaltrigen, ohne Infektion",
            // "[https://www.aerzteblatt.de/nachrichten/120400/Berechnung-Sterberisiko-durch-Corona-bei-Aelteren-mehr-als-verdoppelt]\n" +
            "Der Impfstoff hat eine Wirksamkeit von 90% (typischerweise eine <a href='#wiki-rrr'>relative Risikoreduktion</a>, s. Text)",
            "Bewegung reduziert die Wahrscheinlichkeit von Herz-Kreislauferkrankungen um x% (nicht zwingend relativ)"
        ],  // array of list items with examples.
        "popup": [
            "<p><a target='_blank' href='risk_wiki.html#wiki-rel'><i class=\"fa fa-exclamation-triangle annote-text-icon\"></i>&nbsp;Relative Angaben</a> sind oft intransparent.</p>" +
            "<ul>" +
            // "<li>sie führen häufig zu einer <a href=\"risk_wiki.html#wiki-error-rel\">Überschätzung des Risikos</a></li>" +
            "<li>Achten Sie darauf, dass die <a target='_blank' href='risk_wiki.html#wiki-baseprob'>Basiswahrscheinlichkeit (bzw. das Basisrisiko)</a> angegeben wurde, auf die sich die Veränderung bezieht.</li>" +
            "</ul>"
        ],
        "maintext":
            "<h4 id='wiki-relrisk'>Relatives Risiko</h4>" +
            "<p>Relatives Risiko: beschreibt das Verhältnis der Wahrscheinlichkeit, dass ein Ereignis in einer " +
            "exponierten Gruppe im Vergleich zu dem gleichen Ereignis in einer nicht-exponierten Gruppe auftritt. " +
            "Zum Beispiel könnten Menschen, die regelmäßig rauchen (exponierte Gruppe) im Vergleich zu Menschen, " +
            "die nicht rauchen (nicht exponierte Gruppe), einem höheren Risiko für Lungenkrebs ausgesetzt sein.</p>" +
            "<p>Ein relatives Risiko von 1 spricht für keinen Effekt, also ist das Risiko für exponierte und " +
            "nicht-exponierte Gruppe gleich hoch. Wenn das relative Risiko >1 ist, spricht es für ein " +
            "erhöhtes Risiko der exponierten Gruppe gegenüber der nicht-exponierten Gruppe. Bei einem Wert <1, " +
            "ist es genau das Gegenteil, d.h. ein erhöhtes Risiko der nicht-exponierten Gruppe gegenüber der nicht-exponierten Gruppe. </p>" +
            "<p>Ein relativer Risikoanstieg um das 5-fache klingt erheblich. Bei einer Erkrankung die nur 1 Person " +
            "unter 10.000 betrifft, bedeutet ein solcher Anstieg aber nur, dass unter denjenigen mit dem Risikofaktor " +
            "(z.B., mit einer bestimmten Ernährungsweise) anstelle von einer Person (0.01%), 5 Personen in 10.000 (0.05%), " +
            "erkranken. </p>" +
            "" +
            "<h4 id='wiki-rrr'>Relative Risikoreduktion</h4>" +
            "<p>Ähnlich verhält es sich mit der relativen Risikoreduktion, wie sie häufig zur Angabe von Impfwirksamkeiten verwendet wird. " +
            "Dabei handelt es sich um eine relative Risikoreduktion, die eine Antwort auf die Frage liefert, um wie viel Prozent das " +
            "Risiko geriner ist. Eine Impfwirksamkeit von 90% bedeutet etwa, dass unter den Geimpften 90% weniger Personen erkranken. " +
            "Erkranken in der nicht geimpften Gruppe zum Beispiel 10 aus 1000, so erkrankt in der geimpften Gruppe 1 aus 1000." +
            "</p>" +
            "<p>" +
            "Das entspricht einer absoluten Risikoreduktion um 0.9% (von 1% auf 0.1%). " +
            "Dieser Effekt wirkt erheblich kleiner als die relativen 90%. " +
            "<span id=\"wiki-error-rel\">Da relative Angaben oft zu einer Fehleinschätzung führen</span>" +
            "sollten sie gemeinsam mit <a href='wiki-arr'>absoluten Risikoangaben</a>[TODO] verwendet werden, um eine transparente " +
            "Einschätzung des Risikos zu gewährleisten." +
            "</p>" +
            "<p>Um relative Risiken beurteilen zu können, sind also absolute Risiken erforderlich. Nehmen wir als weiteres Beispiel " +
            "den Zusammenhang zwischen verarbeitetem Fleisch und Darmkrebs: Angenommen, im Laufe des Lebens an Darmkrebs zu erkranken, " +
            "beträgt 5,6% (das bedeutet 56 Personen von 1000 erkranken). Was bedeutet in diesem Zusammenhang ein 18%iger Anstieg des " +
            "Darmkrebsrisikos? Wenn das relative Risiko um 18% steigt, bedeutet dies, dass das Basisrisiko um 18% erhöht wird. " +
            "Das entspricht einem <a href='#wiki-arr'>absoluten Risikoanstieg</a> um 1% (0,056 * 0,18 * 100 = 1,008%). " +
            "Somit würde das absolute Risiko von 56 von 1000 Personen auf  66 von 1000 (oder 6,6%) ansteigen.</p>" +
            "" +
            "<h4 id='wiki-mismatch'>Verwendung derselben Zahlentypen für Nutzen und Schaden (Vermeidung von mismatched framing)</h4>" +
            "<p>" +
            "Wenn <a href='#wiki-eff_side'>Nutzen und Schaden</a> berichtet werden, sollten niemals relative Risiken für " +
            "das eine und absolute Risiken für das andere verwendet werden. Wenn der Nutzen relativ ausgedrückt wird, " +
            "wird dieser häufig überschätzt (siehe auch <a href='#wiki-base_risk'>Basisrisiko</a>), da relative " +
            "Veränderungen meist größer sind. " +
            "Dies führt dann zum so genannten \"mismatched framing\": Der Nutzen wird durch das relative " +
            "Risiko überschätzt, während der Schaden durch die Angabe absoluter Risiken unterschätzt wird. " +
            "Die Aussage \"eine Impfung bietet einen Impfschutz von 75%, bei 4% der Versuchspersonen traten Nebenwirkungen auf\"," +
            "ist beispielsweise intransparent. Der Nutzen scheint sehr groß, während die Wahrscheinlichkeit von Nebenwirkungen " +
            "sehr gering scheint, obwohl die Situation auch sein könnte, dass die Krankheit 4 von 100 Ungeimpften betrifft und " +
            "1 von 100 Geimpften (also 3 von 100 weniger). Wenn unter den Ungeimpften keine Nebenwirkungen berichtet wurden, " +
            "erleiden folglich mehr Personen Nebenwirkungen (4 von 100), als Personen vor der Erkrankung geschützt werden. " +
            "Ohne das Risiko einer Erkrankung unter den Ungeimpften (oder auch unter den Geimpften) ist die Information also nahezu " +
            "wertlos, um Nutzen und Schaden zu vergleichen und kann zu stark verzerrter Wahrnehmung führen. " +
            "Daher sollte ein solches \"mismatched framing\" vermieden werden, indem für Schaden und Nutzen absolute Risiekn berichtet werden." +
            "</p>"
    },
    "abs": {
        "heading": "Absolute Risiken",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Die absolute Wahrscheinlichkeit eines Ereignisses (z.B., Erkrankung, Genesung, Tod) in einer Gruppe",
            "Ist relativen Angaben vorzuziehen und sollte immer für alle zu Vergleichenden Gruppen oder Zeitpunkte berichtet werden",
            "Kann durch <a href='#wiki-prozent'>Prozentzahlen</a> oder <a href='#wiki-nh'>natürliche Häufigkeiten</a> " +
            "ausgedrückt werden"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [
            "Das Risiko an Darmkrebs zu erkranken steigt durch Fleichskonsum um 1% von 5,6% auf 6,6%",
            "Bewegung reduziert die Wahrscheinlichkeit von Herz-Kreislauferkrankungen um x% (nicht zwingend absolut)"
        ],  // array of list items with examples.
        "popup": [
            "<p><i class=\"fa fa-exclamation-triangle annote-text-icon\"></i>&nbsp;Relative Angaben sind oft intransparent.</p>" +
            "<ul>" +
            // "<li>sie führen häufig zu einer <a href=\"risk_wiki.html#wiki-error-rel\">Überschätzung des Risikos</a></li>" +
            "<li>Achten Sie darauf, dass die <a target='_blank' href='risk_wiki.html#wiki-baseprob'>Basiswahrscheinlichkeit (bzw. das Basisrisiko)</a> angegeben wurde, auf die sich die Veränderung bezieht.</li>" +
            "</ul>"
        ],
        "maintext":
            "<h4 id='wiki-absrisk'>Absolutes Risiko</h4>" +
            "<p>Das Absolute Risikoist die Wahrscheinlichkeit in der exponierten (oder nicht-exponierten) " +
            "Gruppe zu erkranken. Es wird häufig über die Inzidenzrate (also die Anzahl an Neuerkrankungen) ausgedrückt. " +
            "Eine Population habe die Größe von 100 Raucher*innen und 75 erkranken an einem Lungenkarzinom. " +
            "Demnach 25 nicht. Das absolute Risiko wäre demnach die Inzidenzrate der Raucher*innen, die an einem " +
            "Lugenkarzinom erkrankt sind. Dies wäre: 75 / (75 + 25) = 0,75. </p>" +
            "Absolute Risiken sollten möglichst immer berichtet werden, da sie im Vergleich zu absoluten Risiken realistischere Risikoeinschätzungen ermöglichen." +
            "<p>Absolute Risiken meinen die Wahrscheinlichkeit in einer Gruppe (mit oder ohne Exposition gegenüber einem Risikofaktor oder einer Itervention) " +
            "Bei einer Erkrankung, die durch Ernährung wahrscheinlicher wird könnte unter denjeningen ohne das problematische Ernährungsverhalten" +
            "1 Person unter 10.000 erkranken (absolutes Risiko in der <a href='#wiki-treat-control'>Vergleichsgruppe</a>)" +
            "während unter denjeningen mit dem problematischen Ernährungsverhalten 5 Personen in 10.000 (0,05%) erkranken " +
            "(absolutes Risiko in der <a href='#wiki-treat-control'>Untersuchungsgruppe</a>)." +
            "</p>" +
            "" +
            "<h4 id='wiki-arr'>Absolute Risioveränderung</h4>" +
            "<p>Die absolute Risikoveränderung wird als die Differenz zwischen den absoluten Risiken gebildet. " +
            "Im obigen Beispiel wäre das eine Veränderung von 4 erkrankten Personen in 10.000 (oder 0,04%). " +
            "Ein solcher Anstieg entspricht hier einem relativen Risikoanstieg um das 5-fache, der recht groß wirkt. " +
            "Wobei in Anbtracht der absoluten Veränderung von 0,04% nicht klar ist, ob es tatsächich ein großer Effekt ist" +
            "(dies hängt schlussendlich von der Schwere der Erkrankung ab -- ist dies binnen kurzer Zeit tödlich, kann eine " +
            "solche Reduktion bereits substantiell sein)." +
            "</p>"
    },
    "reference": {
        "heading": "Bezugsgröße",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Anzahl oder Anteil auf die sich eine Prozentzahl oder eine anteilige Anzahl bezieht."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["In der Gruppe der Geimpften waren <emph>1.000 Personen</emph>, davon erkrankten 9",
            "Von den <emph>780 untersuchten Personen</emph> waren 50% in der Behandlungsgruppe"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Die Bezugsgröße erlaubt einzuschätzen, ob eine Anzahl oder ein relativer Prozentanteil</p>"   // string of main text for wiki.
    },
    // Other kinds of numbers:
    "confint": {
        "heading": "Konfidenzintervall",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Drückt die Unsicherheit um ein Ergebnis (z.B., ein Risiko oder einen Unterschied zwischen Risiken) aus, " +
            "als wie zuverlässig das Ergebnis ist",
            "Intervall, in dem der wahre Wert in 95% aller Experimente liegen würde, wenn man dasselbe Experiment sehr oft wiederholt oder man sehr oft eine " +
            "Stichprobe aus der Selben Population zieht."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Die Schutzwirkung beträgt 97,4 % (95 % KI: 91,4 – 99,2)."],  // array of list items with examples.
        "popup": ["<p><a target='_blank' href='wiki-confint'>Konfidenzintervalle</a> werden in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
        "<p>Typischerweise werden Konfidenzintervalle, die <emph>nicht</emph> null einschließen, was eine akzeptable Unischerheit ausdrückt.</p>"],
        "maintext": "<p>Konfidenzintervalle werden in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
            "<p>Schließt das Konfidenzintervall eines Unterschiedes nicht den Wer null ein, wird die Unsicherheit, dass ein Effekt, " +
            "der nicht null ist, vorliegt als akzeptabel angesehen. Man spricht dann häufig auch von \"statistischer Signifikanz\".</p>" +
            "<p>Typischerweise werden Konfidenzintervalle meist für 90% oder 95% gewählt. Die genaue Interpretation ist relativ schwierig " +
            "und führt auch bei Expert*innen häufig zu Fehlern. Ein 90% Konfidenzintervall etwa bedeutet, dass der " +
            "tatsächliche Mittelwert nach unendlich vielen Stichproben aus einer Population in 90% der Konfidenzintervalle " +
            "enthalten ist. Im Wissenschaftskontext wird es meist anstelle von oder in Verbindung mit dem <a href='#wiki-pval'>p-Wert</a> " +
            "verwendet und macht ähnliche Aussagen.</p>"
    },
    "cprob": {
        "heading": "Bedingte Wahrscheinlichkeit",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Die Wahrscheinlichkeit eines Ereignisses, wenn eine Bedingung wahr ist (z.B., dass jemand zur Gruppe der Erkrankten gehört)",
            "Bedingte Wahrscheinlichkeiten sollten bevorzugt als <a href='#wiki-nh'>natürliche Häufigkeiten</a> ausgedrückt werden."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Unter den Erkrankten erhalten 90 aus 100 ein positives Testergebnis",
            "Unter den Geimpften erkranken 6 aus 1000",
            "Die Sensitivität des Tests beträgt 99%"],  // array of list items with examples.
        "popup": ["TODO: Sensitivität, Spezifität etc.!"],
        "maintext": "<p>Bedingte Wahrscheinlichkeiten treten in vielen Fällen auf. Im Kontext von medizinischen Tests " +
            "und Screeningverfahren beispielsweise können Wahrscheinlichkeiten für ein positives Testergebnises " +
            "angegeben werden, wenn eine Erkrankung tatsächlich vorliegt bzw. ein negatives Testergebnis, wenn " +
            "keine Erkrankung vorliegt (Sensitivität und Spezifität). Umgekehrt könne auch die bedingten Wahrscheinlichkeiten dafür angegeben werden, " +
            "dass bei einem positiven bzw. negativen Testergebnis tatsächleich eine Erkrankung bzw. keine Erkrankung vorliegt " +
            "(positiver Vorhersagewert und negativer Vorhersagewert; s. <a href='#wiki-sens-spec'>Testgenauigkeit und Vorhersagegüte</a> unten). " +
            "Auch das Risiko innerhalb einer Gruppe " +
            "ist eine bedingte Wahrscheinlichkeit, da es die Wahrscheinlichkeit angibt beispielsweise zu erkranken " +
            "oder zu versterben, wenn eine bestimmte Gruppenzugehörigkeit vorliegt (z.B., <a href='#wiki-baseprob'>Basisrisiko</a> in der " +
            "<a href='#wiki-treat-control'>Untersuchungs- oder Vergleichsgruppe</a>). " +
            "Ein weiteres Beispiel sind <a href='#wiki-pval'>p-Werte (s. unten)</a>, die angeben wie wahrrscheinlich es ist in einer " +
            "Stichprobe Daten zu beobachten, in denen sich Gruppen so stark oder stärker als in der Stichprobe unterscheiden, " +
            "wenn es in der Population eigentlich keinen Unterschied gibt.</p>" +
            "<p>Wie insbesondere das Beispiel der Testgenauigkeit illustriert, ist es wichtig, dass bei bedingten Wahrscheinlichkeiten kar ist, " +
            "auf welche Gruppe oder welches Ereignis sich diese beziehen.</p>" +
            "" +
            "<h4 id='wiki-sens-spec'>Beispiel: Testgenaugkeit und Vorhersagegüte</h4>" +
            "<p>Gerade bei medizinischen Tests gibt es einige wichtige bedingte Wahrscheinlichkeiten. " +
            "Die <emph>Testgenauigkeit</emph> wird üblicherweise als Sensitivität und Spezifität angegeben (typischerweise in <a href='#wiki-prozent'>Prozent</a>). " +
            "Die Sensitivität gibt an, welchen Anteil der Erkrankten ein Test korrekt als erkrankt erkennt und ein positives Ergebnis " +
            "ausgibt. Die Spezifität gibt an, wie viele Personen, " +
            "die nicht erkrankt sind korrekt als nicht erkrankt erkannt werden und ein negatives Testergebnis erhalten. " +
            "Mit diesen Angaben werden Tests beschrieben, insbesondere da diese in der Regel an einer Gruppe von Erkranken und " +
            "nicht Erkrankten auf seine Güte geprüft werden.</p>" +
            "<p>Sensitivität und Spezifität sind aber häufig nicht die interessierenden Werte: " +
            "Typischerweise interessieren sich die Getesteten für die <emph>Vorhersagegüte</emph>, " +
            "also wie wahrscheinlich sie tatsächlich erkrankt sind, wenn der Test sie als erkrankt erkennt (positives Testergebnis). " +
            "Dies hängt zusätzlich zur Güte des Tests von der Prävalenz, also dem " +
            "Risiko der Erkrankung der Person ab. Das Risiko nach einem positiven Testergebnis tatsächlich erkrankt zu sein, wird " +
            "als positiver prädiktiver Wert (PPV) bezeichnet.</p>" +
            "<p>So der Test nicht perfekt ist, bleibt das Risiko insbesondere bei seltenen Erkrankungen auch nach dem Test möglicherweise relativ niedrig. " +
            "Ein Test mit einer Sensitivität von 90% und einer Spezifität von 80% etwa, wird bei einer Krankheit, die " +
            "10 von 100 Personen betrifft 9 von 100 erkrankten Personen und 72 von 90 gesunden Personen korrekt erkennen, " +
            "aber auch eine Person verpassen und 18 Personen fälschlich als erkrankt ausweisen. Ein positiver Test kann " +
            "also auch fälschlich zustande kommen. Der positive Vorhersagewert ist in diesem Fall also etwa 33% (und nicht nahe 90%, wie die Sensitivität möglicherweise suggeriert)" +
            "(27 Personen erhalten ein positives Ergebnis, für 9, also ein Drittel, ist dies auch korrekt).</p>" +
            "<p>Analog gilt dies für den negativen Vorhersagewert (NPV). Ein negatives Testergebnis schließt eine " +
            "Erkrankung nicht vollständig aus. Es passt lediglich die Schätzung des Risikos an. In unserem Beispiel " +
            "erhält eine erkrankte Person ein negatives Testergebnis und 72 nicht Erkrankte erhalten ein negatives " +
            "Testergebnis. Das heißt etwa 89% aller negativen Testergebnisse sind korrekt. Ist die Erkrankung relativ häufig, " +
            "verringert dies den negativen Vorhersagewert (im Extremfall, in dem alle erkrankt sind, liegt dieser selbst bei einem perfekten Test bei null).</p>" +
            "<p>Der Fall von Testergebnissen illustriert, dass es bei bedingten Wahrscheinlichkeiten wichtig ist " +
            "darauf zu achten, dass die Wahrscheinlichkeit auf die korrekte Gruppe bezogen ist.</p>" +
            "" +
            "<h4 id='wiki-pval'>Beispiel: p-Werte</h4>" +
            "<p>Der p-Wert ist die Bedingte Wahrscheinlichkeit in einer möglichen Stichprobe Daten zu beobachten, in denen sich " +
            "Gruppen so stark oder stärker als in der beobachteten Stichprobe unterscheiden, wenn es in der Population " +
            "eigentlich keinen Unterschied gibt. " +
            "Der p-Wert wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern. " +
            "Da der p-Wert auch von Expert*innen häufig missverstanden wird und den Lesenden wenig Mehrwert bieten dürfte, " +
            "sollte er in journalistische Publikationen eher nicht verwendet werden.</p>" +
            "<p>Angenommen, in einer fiktiven Untersuchung eines neuen Medikamentes wird eine Stichprobe von 2.000 Personen untersucht. " +
            "Unter den Behandelten genesen nach 5 Tagen " +
            "30 aus 1000, während unter den Unbehandelten 10 aus 1.000 genesen. In diesem Fall wäre der <i>p</i>-Wert 0,005. Das bedeutet, " +
            "dass die Wahrscheinlichkeit, eine <a href='#wiki-arr'>absolute Risikoveränderung</a> von 20 in 1.000 oder mehr zu beobachten, wenn es " +
            "eigentlich keinen Unterschied gibt, bei 0,5% liegt. Würde man aus einer Population ohne Unterschied " +
            "10.000 verschiedene Stichproben von 2.000 Personen ziehen, würde man nur in 50 aus 10.000 (0,5%) einen " +
            "Unterschied finden, der so groß oder größer, als in der beobachteten Stichprobe ist.</p>" +
            "<p>In einem solchen Falle geht man typischerweise von einer akzeptablen Unsicherheit aus, da die beobachteten Unterschiede " +
            "wenig wahrscheinlich auf Zufällige Unterschiede zurückgeführet werden können." +
            "Konventionell werden Unterschiede mit einem <i>p</i>-Wert kleiner als 0,05 (d.h. 5%) als statistisch Signifikant bezeichnet " +
            "und die Annahme, dass kein Effekt besteht (auch: Nullhypothese) verworfen.</p>" +
            "<p>Wichtig ist, dass der <i>p</i>-Wert <emph>keine</emph> Aussage darüber macht, wie groß die Wahrscheinlichkeit " +
            "eines tatsächlichen Unterschiedes ist.</p>" +
            "<p>Zudem ist er bei Untersuchungen mit sehr vielen Versuchspersonen nicht informativ, da er für große Stichproben " +
            "auch für sehr geringe Unterschiede typischerweise sehr klein wird.</p>"   // string of main text for wiki.
    },
    "pval": {
        "heading": "<i>p</i>-Werte",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "<a href='risk_wiki.html#wiki-cprob'>Bedingte Wahrscheinlichkeit</a> in einer Stichprobe Daten zu " +
            "beobachten, in denen sich Gruppen so stark oder stärker als in der Stichprobe unterscheiden, wenn es in der Population eigentlich keinen Unterschied gibt",
            "Der p-Wert wird auch von Expert*innen häufig missverstanden und bringt daher vermutlich keinen Mehrwert für journalistische Artikel"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["<p>Der <a target='_blank' href='wiki-pval'>p-Wert</a> wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
        "<p>Typischerweise wird ein p-Wert kleiner als 0.05 als \"statistisch signifikant\" bezeichtnet, was eine akzeptable Unischerheit ausdrückt.</p>" +
        "<p>Da der p-Wert auch von Expert*innen häufig missverstanden wird, sollte er in journalistische Publikationen eher nicht verwendet werden.</p>"],
        "maintext": "" +
            "<p>Der p-Wert ist die Bedingte Wahrscheinlichkeit in einer möglichen Stichprobe Daten zu beobachten, in denen sich " +
            "Gruppen so stark oder stärker als in der beobachteten Stichprobe unterscheiden, wenn es in der Population " +
            "eigentlich keinen Unterschied gibt. " +
            "Der p-Wert wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern. " +
            "Da der p-Wert auch von Expert*innen häufig missverstanden wird und den Lesenden wenig Mehrwert bieten dürfte, " +
            "sollte er in journalistische Publikationen eher nicht verwendet werden.</p>" +
            "<p>Angenommen, in einer fiktiven Untersuchung eines neuen Medikamentes wird eine Stichprobe von 2.000 Personen untersucht. " +
            "Unter den Behandelten genesen nach 5 Tagen " +
            "30 aus 1000, während unter den Unbehandelten 10 aus 1.000 genesen. In diesem Fall wäre der <i>p</i>-Wert 0,005. Das bedeutet, " +
            "dass die Wahrscheinlichkeit, eine <a href='#wiki-arr'>absolute Risikoveränderung</a> von 20 in 1.000 oder mehr zu beobachten, wenn es " +
            "eigentlich keinen Unterschied gibt, bei 0,5% liegt. Würde man aus einer Population ohne Unterschied " +
            "10.000 verschiedene Stichproben von 2.000 Personen ziehen, würde man nur in 50 aus 10.000 (0,5%) einen " +
            "Unterschied finden, der so groß oder größer, als in der beobachteten Stichprobe ist.</p>" +
            "<p>In einem solchen Falle geht man typischerweise von einer akzeptablen Unsicherheit aus, da die beobachteten Unterschiede " +
            "wenig wahrscheinlich auf Zufällige Unterschiede zurückgeführet werden können." +
            "Konventionell werden Unterschiede mit einem <i>p</i>-Wert kleiner als 0,05 (d.h. 5%) als statistisch Signifikant bezeichnet " +
            "und die Annahme, dass kein Effekt besteht (auch: Nullhypothese) verworfen.</p>" +
            "<p>Wichtig ist, dass der <i>p</i>-Wert <emph>keine</emph> Aussage darüber macht, wie groß die Wahrscheinlichkeit " +
            "eines tatsächlichen Unterschiedes ist.</p>" +
            "<p>Zudem ist er bei Untersuchungen mit sehr vielen Versuchspersonen nicht informativ, da er für große Stichproben " +
            "auch für sehr geringe Unterschiede typischerweise sehr klein wird.</p>"   // string of main text for wiki.
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Non-numeric entries: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "causal": {
        "heading": "Ursache und Wirkung (Kausalität)",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Kausalität"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Kausalität bezeichnet die Beziehung zwischen zwei Ereignissen, bei der das eine Ereignis (die Ursache) direkt das andere Ereignis (die Wirkung) hervorruft.",
            "Aussagen über Ursache und Wirkung können nur gemacht werden, wenn alternative Erklärungen (z.B. das Verstreichen von Zeit) zuverlässig ausgeschlossen werden können; " +
            "dies ist in der Regel nur durch kontrollierte <a href='#wiki-expe'>Experimente</a> möglich"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Die Impfung verringert das Risiko einer Erkrankung um 50%.",
            "Rauchen verursacht Lungenkrebs"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Aussagen über Ursache und Wirkung sind häufig nicht einfach zu treffen. " +
            "Oft gibt es Alternativerklärungen dafür, dass auf eine Ursache kausal eine Wirkung folgt. " +
            "Ist es beim Drücken eines Lichtschalters recht eindeutig, dass das Licht gewissermaßen eine Wirkung des Drückens ist, " +
            "ist dies bei Medikamenten typischerweise deutlich komplexer. " +
            "So muss zum Beispiel ausgeschlossen werden, dass die vermeintliche Heilung durch ein Medikament eigentlich " +
            "durch einfaches Abwarten zustande gekommen ist.</p>" +
            "<p>Nur <a href='risk_wiki.html#wiki-expe'>Experimente</a>" +
            "(z.B., <a href='risk_wiki.html#wiki-rct'>randomized controlled trials</a>, RCT) " +
            "erlauben es zuverlässig kausale Schlüsse zu ziehen. Dabei werden Personen zufällig auf die zu " +
            "vergleichenden Gruppen aufgeteilt (z.B., Medikament und Placebo), " +
            "so dass Unterschiede zwischen den Gruppen nicht systematisch sind und damit beobachtete " +
            "Unterschiede auf die Intervention zurückgeführt werden können. " +
            "So kann zum Beispiel auch ausgeschlossen werden, dass behandelte Personen auch einfach so genesen wären.</p>" +
            "<p>Veränderungen zwischen Zeitpunkten oder nicht experimentellen (beobachteten) Gruppen " +
            "können zwar auf Ursachen hinweisen, können aber auch durch andere Veränderungen über die Zeit oder " +
            "andere systematische Unterschiede zwischen den Gruppen erklärt werden .</p>" +
            "<p>Eine fiktive Studie, die den Zusammenhang zwischen Einführung eines neuen Fitnessprogramms und dem " +
            "allgemeinen Gesundheitszustand der Bevölkerung untersucht zeigt, dass der Anteil gesunder Personen " +
            "nach der Einführung des Fitnessprogrammes steigt. " +
            "Dies könnte nun auf das Fitnessprogramm zurückgeführt werden. " +
            "Es könnte jedoch auch durch andere Faktoren wie eine gleichzeitige Ernährungsinitiative, " +
            "saisonale Veränderungen oder einen allgemeinen Trend hin zu gesünderem Lebensstil in der Bevölkerung erklärt werden. " +
            "Daher sind solche Vergleiche nicht schlussgültig aussagekräftig darüber, welche Ursache etwas hat. " +
            "Aus diesem Grunde sind experimentelle Untersuchungen unerlässlich. " +
            "Im Beispiel könnte man dies erreichen, indem man das Fitnessprogramm einer zufälligen Stichprobe an Personen " +
            "zur Verfügung stellt und parallel diese Personen und Personen ohne das Programm beobachtet.</p>"
        // string of main text for wiki.
    },
    "expe": {
        "heading": "Experiment",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": [
            "Personen werden zufällig einer Behandlung oder einer Vergleichsbehandlung (häufig mit einem Placebo) zugewiesen",
            "Durch die zufällige Zuweisung werden systematische Unterschiede zwischen den Gruppen vermieden, " +
            "so dass man <a href='#wiki-causal'>Kausalaussagen</a> machen kann."

        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [
            "Randomized Controlled Trial (RCT; z.B., werden 1.00 Personen zufällig in zwei Gruppen aufgeteilt: " +
            "500 Personen erhalten das Medikament und die anderen 500 Personen erhalten eine Vergleichsbehandlung oder ein Placebo.)"
        ],  // array of list items with examples.
        "popup": ["Im Experiment weren durch zufällige Zuweisung auf eine Experimental- und eine Kontrollgruppe " +
            "systematische Unterschiede zwischen den Gruppen ausgeschlossen, " +
            "so dass (anders als bei der Beobachtung von Gruppen oder Zeitpunkten) " +
            "<a target='_blank' href='#wiki-causal'>Kausalaussagen</a> möglich sind.",
            "In der Medizin ist en typisches Experiment der \"Randomized Controlled Trial\" (RCT): " +
            "Personen werden zufällig einer Behandlung oder einer Vergleichsbehandlung " +
            "(häufig mit einem <a target='_blank' href='#wiki-placebo'>Placebo</a>) zugewiesen"],
        "maintext":
            "<p>Im Allgemeinen besteht ein Experiment darin, das Versuchspersonen zufällig auf verschiedenen Behandlungen " +
            "verteilt werden. So werden systematische Unterschiede ausgeschlossen und Kausalaussagen ermöglicht. " +
            "Ein in der medizin verbreitetes Experiment " +
            "</p>" +
            "<h4 id='wiki-rct'>Randomized Controlled Trial (RCT)</h4>" +  // string of main text for wiki.
        "   <p>Werden 1000 Personen zufällig auf zwei Gruppen (z.B., Medikament mit Wirkstoff und Placebo) " +
            "verteilt, so ist bekannt, dass sich die beiden Gruppen nicht systematisch in anderen Eigenschaften, " +
            "wie zum Beispiel Geschlecht oder Gesundheitsverhalten (z.B., Rauchen) unterscheiden. Dies ist selbst " +
            "dann wahr, wenn es gewissen Unterschiede zwischen den Gruppen gibt (es z.B., ein paar mehr Raucher in " +
            "der einen Gruppe gibt als in der anderen). Diese Unterschiede sind nur dann problematisch, wenn es Gründe " +
            "gibt, dass die Randomisierung fehlgeschlagen ist. Das kann beispielsweise der Fall sein, wenn für eine " +
            "Gruppe systematisch mehr Personen vor Kneipen rekrutiert wurden.</p>" +
            "<p>Die Abwesenheit anderer systematischer Unterschiede ist für den Vergleich essenziell. Stellen wir uns " +
            "ein Medikament gegen Lungenprobleme vor. Gibt es in der Gruppe, die das Medikament erhält, mehr Raucher, " +
            "so wird die Wirkung möglicherweise unterschätzt, da zusätzliche Lungenerkrankungen durch das Rauchen " +
            "auftreten. Umgekehrt könnte ein systematisch höherer Anteil an Rauchenden in der Placebogruppe dazu führen, " +
            "dass das Medikament als wirksam eingestuft wird, obwohl der höhere Anteil an Erkrankungen auf das " +
            "Rauchen zurückzuführen ist und nicht auf die Genesungen in der Medikamentengruppe.</p>" +
            "<p>Sind die Unterschiede in anderen Eigenschaften aber zufällig (und die Stichprobe hinreichend groß), " +
            "können wir davon ausgehen, dass die Unterschiede zwischen den Gruppen auf das Medikament und nicht auf " +
            "andere Eigenschaften (wie etwa das Rauchverhalten) zurückzuführen ist.</p>" +
            "<p>Die Zuteilung sollte idealerweise nicht nur zufällig sein, sondern auch blind oder doppelblind. " +
            "Das bedeutet, dass die Versuchspersonen während der Untersuchung nicht wissen in welcher Gruppe sie sind. " +
            "Bei doppelblinden Studien wissen zusätzlich diejeningen, die mit den Versuchspersonen interagieren nicht, " +
            "in welcher Bedingung diese sind. Diese Verhindert zum Beispiel, dass das Wissen, dass die Scheinbehandlung wirkungslos ist, " +
            "die Ergebnisse zugunsten eine zu hohen Wirksamkeit beeinflusst.</p>"
    },
    "treat-control": {
        "heading": "Untersuchungs- und Vergleichsgruppe",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Impfgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Untersuchungsgruppe: Gruppe, die eine Behandlung erhält oder bei der ein Einfluss vorliegt",
            "Vergleichsgruppe: Gruppe, in der eine Behandlung oder ein Einfluss nicht vorliegt, um den Effekt des Einflusses zu bestimmen.",
            "Der Vergleich von Behandlungs- und Vergleichsgruppe erlaubt Aussagen über den Effekt (und dessen Größe), also z.B., ob ein Medikament wirksam Symptome lindert" +
            "oder ein Verhalten den Gesundheitszustand verbessert oder verschlechtert.",
            "Bei zufälliger Zuteilung im <a href='#wiki-expe'>Experiment</a> können Aussagen über <a href='#wiki-causal'>Ursache und Wirkung</a> gemacht werden."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Behandlungsgruppe: Gruppe, die tatsächlich ein Medikament erhält; Gruppe, die einem Risikofaktor " +
        "(z.B., Luftverschmutzung) ausgestzt war; Gruppe, die ein Gesundheitsverhalten (z.B., regelmäßigen Sport) zeigt",
        "Vergleichsgruppe: Placebogruppe bei Impf- und Medikamentenstudien, Gruppe, die einem Risikofaktor (z.B., Luftverschmutzung) " +
        "nicht ausgesetzt war; Gruppe, die ein Gesundheitsverhalten (z.B., regelmäßigen Sport) nicht zeigt"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Der Vergleich von Gruppen bei denen ein Merkmal (z.B. eine Behandlung oder ein Umwelteinfluss) vorliegt " +
            "ermöglicht es, zu verstehen, das Merkmal einen Unterschied hervorruft. " +
            "Ein solcher Vergleich ermöglicht nicht notwendigerweise Aussagen über <a href='#wiki-causal'>Ursache und Wirkung</a>, " +
            "da beim Vergleich von Gruppen auch andere Unterschiede eine Rolle spielen können.</p>" +
            "<p>Erfolgt die Zuteilung in Behandlungs- und Kontrollgruppe zufällig, spricht man von einem <a href='#wiki-expe'>Experiment</a>. " +
            "Typischerweise wissen die Versuchspersonen nicht, in welcher Gruppe sie sind (sie sind „blind“), so dass z.B. " +
            "Berichte über verbesserungen des Gesundheitszustandes oder Nebenwirkungen nicht systematisch auf " +
            "Erwartungseffekte zurückgeführt werden können (s. <a href='#wiki-palcebo'>Placebo</a>). " +
            "Versuchspersonen müssen nach einer Studie aufgeklärt werden, in welcher Gruppe sie waren.</p>"   // string of main text for wiki.
    },
    "teval-comp": {
        "heading": "Untersuchungs- und Vergleichszeitpunkt",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Impfgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Untersuchungszeitpunkt: Zeitpunkt, zu dem Daten gesammelt werden, die mit Daten zu einem Vergleichszeitpunkt verglichen werden.",
            "Vergleichszeitpunkt: Zeitpunkt mit dem Daten zu einem Untersuchungszeitpunkt verglichen werden.",
        "Der Vergleich von Untersuchungs- und Vergleichszeitpunkt erlaubt Aussagen über Veränderungen über die Zeit " +
        "(und deren Größe), also z.B., ob es Menschen besser oder schlechter geht (nur aufgrund der Zeit sind üblicherweise keine Aussagen über die Wirkmechanismen möglich)."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["Zeitpunkt zu dem eine Untersuchung stattfindet und der mit einem <a target='_blank' href=\"#wiki-tcomp\">Vergleichszeitpunkt</a> verglichen wird."],
        "maintext": "<p>Der Untersuchungszeitpunkt ist ähnlich zur Untersuchungsgruppe etwa in Medikamentenstudien, während der Vergleichszeitpunkt der Kontrollgruppe ähnlich ist. " +
            "Ein entscheidender Unterschied ist, dass Personen nicht zufällig auf Zeitpunkte zugewiesen werden können. " +
            "Daher können Zeitpunkte nicht für ein <a href='#wiki-expe'>Experiment</a> verwendet werden und Aussagen über <a href='#wiki-causal'>Ursache und Wirkung</a>" +
            "sind folglich in der Regel nicht möglich. " +
            "Neben dem Verstreichen von Zeit können verschiedene Einflüsse eine Rolle spielen, so dass der Vergleich von Zeitpunkten " +
            "zunächst nur Aufschluss über die Existenz möglicher Veränderungen geben kann.</p>"
    },
    "control": {
        "heading": "Vergleichsgruppe",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Placebogruppe", "Kontrollgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Wichtiger Aspekt guter Forschung",
            "Gruppe, in der eine Behandlung oder ein Einfluss nicht vorliegt, um den Effekt des Einflusses zu bestimmen."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Placebogruppe bei Impf- und medikamentenstudien"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Erfolgt die Zuteilung in <a href=\"#wiki-treat-control\">Behandlungs-</a> und Kontrollgruppe zufällig, spricht man von einem <a href='#wiki-expe'>Experiment</a>.</p>"   // string of main text for wiki.
    },
    "tcomp": {
        "heading": "Vergleichszeitpunkt",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Impfgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Zeitpunkt mit dem Daten zu einem <a href=\"#wiki-teval\">Untersuchungszeitpunkt</a> verglichen werden.",
            "Der Vergleich von Untersuchungs- und Vergleichszeitpunkt erlaubt Aussagen über Veränderungen über die Zeit (und deren Größe), " +
            "also z.B., ob es Menschen besser oder schlechter geht (nur aufgrund der Zeit sind üblicherweise keine Aussagen über die Wirkmechanismen möglich)."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["Zeitpunkt mit dem Daten zu einem <a target='_blank' href=\"#wiki-teval\">Untersuchungszeitpunkt</a> verglichen werden."],
        "maintext": ""   // string of main text for wiki.
    },
    "placebo": {
        "heading": "Placebo",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Eine Scheinbehandlung, bei der ein Präparat ohne Wirkstoff verabreicht wird.",
            "Wird häufig als <a href='#wiki-treat-control'>Kontrollgruppe</a> in medizinischen Studien verwendet, um den Wirkstoff eines Medikamentes über die von Patienten erwartete Wirkung hinaus zu untersuchen."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Kochsalzlösung", "Zuckerpillen"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Placebos sind Scheinbehandlungen. Anstelle eines Medikaments wird ein Präparat ohne Wirkstoff " +
            "verabreicht (z.B., Kochsalzlösung bei einer Impfung, Zuckertabletten ohne Wirkstoff anstelle von Medikamenten). " +
            "Zur Untersuchung der Wirksamkeit von Medikamenten ist dies wichtig, da so Erwartungseffekte ausgeschlossen " +
            "werden können. Erwartungseffekte treten auf, da alleine die Erwartung, dass mit der Einnahme eines Medikamentes " +
            "eine Besserung eintritt, dazu führen kann, dass eine Besserung wahrgenommen wird. Umgekehrt kann es auch " +
            "die Erwartung von Nebenwirkungen wahrscheinlicher machen, dass tatsächlich Nebenwirkungen wahrgenommen und " +
            "berichtet werden. Um Nutzen und Schaden des Wirkstoffes an sich festzustellen sollte daher ein Vergleich " +
            "mit einem Placebo stattfinden.</p>"   // string of main text for wiki.
    }

}