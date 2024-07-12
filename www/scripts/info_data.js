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
        "overview": ["Das Risiko beschreibt wie wahrscheinlich es ist, dass ein bestimmtes Ereignis eintritt (im medizinischen Kontext häufig eine Erkrankung)",
            "Der Begriff ist nicht deckungsgleich mit dem Alltagsverständnis",
            "Der Risikobegriff im Kontext der Risikokommunikation kann meist durch \"Wahrscheinlichkeit\" ersetzt werden."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Das Risiko, sich mit einer Erkrankung anzustecken",
            "Symptome auszubilden",
            "an einer Erkrankung zu versterben, oder",
            "sich bei einer Sportart zu verletzen"],  // array of list items with examples.
        "popup": [],
        "maintext": "<p>Erwähnen: Relative risiken.</p>"

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
            "Zufriedenheit führt (vgl. Leitlininien für evidenzbasierte Gesundheitskommunikation) [LINK] </p>" +
            "<p>Bei der numerischen Darstellung ist dringend zu beachten, dass Nutzen und Schaden mit der gleichen " +
            "Bezugsgröße dargestellt werden sollten. Einheitliche Bezugsgrößen " +
            "(z.B. x von 1000) erleichtern das Verständnis im Vergleich zu wechselnden Bezugsgrößen " +
            "(z.B. x von 100; x von 1000; x von 10000). Die Verwendung unterschiedlicher Bezugsgrößen kann die " +
            "Wahrnehmung beeinflussen und zu einer Über- bzw. Unterschätzung des Nutzens oder Risikos führen. " +
            "Das zeigt sich besonders deutlich beim so genannten \"<a href='wiki-mismatch'>mismatched Framing[LINK!]</a>\"." +
            "Abweichungen von der einheitlichen Bezugsgröße sollten gut begründet und transpararent dargelegt werden. " +
            "Eine Darstellung in <a href='wiki-prozent'>Prozent</a> ist ebenfalls möglich, sollte jedoch klar und " +
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
            "Absolute Ereigniswahrscheinlichkeiten sind relativen Angaben vorzuziehen",
            "Für <a href=\"risk_wiki.html#wiki-rel\">relative Angaben</a>" +
            " (z.B., eine Erhöhung von 50%, eine Impfstoffwirksamkeit von 90%) sollten unbedingt die Basisrisiken berichtet werden",
            "Prozentzahlen sollten nur für Zahlenwerte größer 1% verwendet werden (ansonsten sind <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> vorzuziehen)."],
        "examples": ["Die Wahrscheinlichkeit zu erkranken, wenn man auf eine infizierte Person getroffen ist liegt bei 2% (absolut).",
            "Das Infektionsrisiko war in der Kontrollgruppe 50% höher (relativ).",
            "52% der Versuchsteilnehmer*innen waren weiblich (absolut)."],
        "popup": ["<ul><li>Achten Sie darauf anzugeben, auf welche Gruppe sich der Prozentanteil bezieht</li></ul>"],
        "maintext": // "<p>Prozentzahlen sollten nur bei Angaben größer als 1% verwendet werden.</p>" +
            "<p>Besser als <a href=\"\">Prozentzahlen</a> sind typischerweise <a href=\"#wiki-nh\">natürliche Häufigkeiten</a> (z.B., 1 aus 100 oder 1 aus 1000). " +
            "Diese werden häufig besser verstanden, insbesondere, für Prozentzahlen < 1%.</p>" +
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
        "<li>Transparenter für die Kommunkation von Risiken sind <a href=\"risk_wiki.html#wiki-nh\">natürliche Häufigkeiten</a> mit einer konstanten Referenz (z.B., 15 aus 1000).</li>" +
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
            "<p>Hilfreiche Angabe. Die <a href='#wiki-sample'>Stichprobengröße</a> hilft, die Zuverlässigkeit der Daten zu beurteilen und kann als Bezugsgröße dienen.</p>"],
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
            "<p><a href=\"risk_wiki.html#wiki-nh\">Natürliche Häufigkeiten</a> sind sehr transparent, um Risiken auszudrücken. " +
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
            "Es sollte immer mindestens das Basisrisiko (die Basiswahrscheinlichkeit)[LINK] in der [LINK]Vergleichsgruppe berichtet werden"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [
            "Das relative Risiko, dass häufig Rauchende an Lungenkrebs erkranken ist 20-mal so groß, wie unter Nichtrauchenden",
            "Bei Personen über 60 Jahren ohne Corona Infektion ist das Risiko innerhalb eines Jahres zu versterben halb so groß " +
            "wie bei Gleichaltrigen, ohne Infektion",
            // "[https://www.aerzteblatt.de/nachrichten/120400/Berechnung-Sterberisiko-durch-Corona-bei-Aelteren-mehr-als-verdoppelt]\n" +
            "Der Impfstoff hat eine Wirksamkeit[LINK] von 90% (typischerweise eine relative Risikoreduktion, s. Text)",
            "Bewegung reduziert die Wahrscheinlichkeit von Herz-Kreislauferkrankungen um x% (nicht zwingend relativ)"
        ],  // array of list items with examples.
        "popup": [
            "<p><i class=\"fa fa-exclamation-triangle annote-text-icon\"></i>&nbsp;Relative Angaben sind oft intransparent.</p>" +
            "<ul>" +
            // "<li>sie führen häufig zu einer <a href=\"risk_wiki.html#wiki-error-rel\">Überschätzung des Risikos</a></li>" +
            "<li>Achten Sie darauf, dass die <a href='risk_wiki.html#wiki-baseprob'>Basiswahrscheinlichkeit (bzw. das Basisrisiko)</a> angegeben wurde, auf die sich die Veränderung bezieht.</li>" +
            "</ul>"
        ],
        "maintext":
            "<h4 id='wiki-relrisk'>Relatives Risiko</h4>" +
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
            "Das entspricht einem absoluten Risikoanstieg[LINK] um 1% (0,056 * 0,18 * 100 = 1,008%).  Somit würde das absolute " +
            "Risiko von 56 von 1000 Personen auf  66 von 1000 (oder 6,6%) ansteigen.</p>" +
            "" +
            "<h4 id='wiki-mismatch'>Verwendung derselben Zahlentypen für Nutzen und Schaden</h4>" +
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
            "Kann durch <a href='#wiki-prozent'>Prozentzahlen oder <a href='#wiki-nh'>natürliche Häufigkeiten</a> " +
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
            "<li>Achten Sie darauf, dass die <a href='risk_wiki.html#wiki-baseprob'>Basiswahrscheinlichkeit (bzw. das Basisrisiko)</a> angegeben wurde, auf die sich die Veränderung bezieht.</li>" +
            "</ul>"
        ],
        "maintext":
            "<h4 id='wiki-relrisk'>Absolutes Risiko</h4>" +
            "Absolute Risiken sollten möglichst immer berichtet werden, da sie realistischere Risikoeinschätzungen ermöglichen." +
            "<p>Absolute Risiken meinen die Wahrscheinlichkeit in einer Gruppe (mit oder ohne Exposition gegenüber einem Risikofaktor oder einer Itervention) " +
            "Bei einer Erkrankung, die durch Ernährung wahrscheinlicher wird könnte unter denjeningen ohne das problematische Ernährungsverhalten" +
            "1 Person unter 10.000 erkranken (absolutes Risiko in der <a href='#wiki-contr'>Vergleichsgruppe</a>)" +
            "während unter denjeningen mit dem problematischen Ernährungsverhalten 5 Personen in 10.000 (0,05%) erkranken " +
            "(absolutes Risiko in der <a href='#wiki-treat'>Untersuchungsgruppe</a>)." +
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
    "pval": {
        "heading": "<i>p</i>-Werte",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["<a href='risk_wiki.html#wiki-cprob'>Bedingte Wahrscheinlichkeit</a> diese oder extremere Daten in einer Stichprobe zu beobachten",
            "Der p-Wert wird häufig missverstanden und sollte nicht verwendet werden"],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["<p>Der <a href='wiki-pval'>p-Wert</a> wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
        "<p>Typischerweise wird ein p-Wert kleiner als 0.05 als \"statistisch signifikant\" bezeichtnet, was eine akzeptable Unischerheit ausdrückt.</p>" +
        "<p>Da der p-Wert auch von Expert*innen häufig missverstanden wird, sollte er in journalistische Publikationen eher nicht verwendet werden.</p>"],
        "maintext": "<p>Der p-Wert wird in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
            "<p>Typischerweise wird ein p-Wert kleiner als 0.05 als \"statistisch signifikant\" bezeichtnet, was eine akzeptable Unischerheit ausdrückt.</p>" +
            "<p>Der p-Wert ist die <a href='wiki-cprob'>bedingte Wahrscheinlichkeit</a> diese oder extremere Daten in einer Stichprobe zu beobachten, " +
            "wenn es in der Population eigentlich <emph>keinen</emph> Unterschied gibt.</p>" +
            "<p>Nehmen wir an, dass in einer fiktiven Untersuchung eines neune Medikamentes unter den Behandelten 2 aus 1000 erkranken, " +
            "während unter den Unbehandelten 5 aus 1000 erkranken. Der p-Wert is 0,01. " +
            "Das bedeutet, dass die Wahrscheinlichkeit, eine absolute Risikoreduktion von 3 in 1000 zu beobachten, " +
            "wenn es eigentlich keinen Unterschied gibt, bei 1% liegt.</p>" +
            "<p>Da der p-Wert auch von Expert*innen häufig missverstanden wird, sollte er in journalistische Publikationen eher nicht verwendet werden.</p>" +
            "<p>Zudem ist er bei Untersuchungen mit sehr vielen Versuchspersonen nicht informativ, da er für große Stichproben typischerweise sehr klein wird.</p>"
    },
    "confint": {
        "heading": "Konfidenzintervall",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Intervall, in dem der wahre Wert in 95% aller Experimente liegen würde, wenn man dasselbe Experiment sehr oft wiederholt."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["<p><a href='wiki-confint'>Konfidenzintervalle</a> werden in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
        "<p>Typischerweise werden Konfidenzintervalle, die <emph>nicht</emph> null einschließen, was eine akzeptable Unischerheit ausdrückt.</p>"],
        "maintext": "<p>Konfidenzintervalle werden in wissenschaftlichen Publikationen verwendet, um die Unsicherheit eines Ergebnisses zu beziffern.</p>" +
            "<p>Typischerweise werden Konfidenzintervalle, die <emph>nicht</emph> null einschließen, was eine akzeptable Unischerheit ausdrückt.</p>"
    },
    "cprob": {
        "heading": "Bedingte Wahrscheinlichkeit",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [""],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Die Wahrscheinlichkeit eines Ereignisses, wenn eine Bedingung wahr ist (z.B., dass jemand zur Gruppe der Erkrankten gehört)",
            "Bedingte Wahrscheinlcihkeiten sollten bevorzugt als <a href='#wiki-nh'>natürliche Häufigkeiten</a> ausgedrückt werden."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": ["Unter den Erkrankten erhalten 90 aus 100 ein positives Testergebnis",
            "Unter den Geimpften erkranken 6 aus 1000",
            "Die Sensitivität des Tests beträgt 99%"],  // array of list items with examples.
        "popup": ["TODO: Sensitivität, Spezifität etc.!"],
        "maintext": "[TODO] Stichworte: Sensitivität, Spezifität, PPV, NPV"   // string of main text for wiki.
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
            "<p>Nur <a href='risk_wiki.html#wiki-rct'>Experimente</a> (z.B., randomized controlled trial, RCT) " +
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
            "Im Experiment weren durch zufällige Zuweisung auf eine Experimental- und eine Kontrollgruppe " +
            "systematische Unterschiede zwischen den Gruppen ausgeschlossen, " +
            "so dass (anders als bei der Beobachtung von Gruppen oder Zeitpunkten) " +
            "<a href='#wiki-causal'>Kausalaussagen</a> möglich sind.",
            "In der Medizin ist en typisches Experiment der \"Randomized Controlled Trial\" (RCT): " +
            "Personen werden zufällig einer Behandlung oder einer Vergleichsbehandlung " +
            "(häufig mit einem <a href='#wiki-placebo'>Placebo</a>) zugewiesen"
        ],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["TODO!"],
        "maintext": "" +
            "<h3 id='wiki-rct'>Randomized Controlled Trial (RCT)</h3>"   // string of main text for wiki.
    },
    "treat": {
        "heading": "Behandlungsgruppe",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Impfgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Gruppe die eine Behandlung erhält oder bei der ein Einfluss vorliegt (im Unterschied zur <a href=\"#wiki-control\">Verlgeichs- oder Kontrollgruppe</a>",
            "Der Vergleich von Behandlungs- und Vergleichsgruppe erlaubt Aussagen über den Effekt (und dessen Größe), also z.B., ob ein Medikament wirksam Symptome lindert."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": [],
        "maintext": ""   // string of main text for wiki.
    },
    "teval": {
        "heading": "Untersuchungszeitpunkt",
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": ["Impfgruppe"],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Zeitpunkt zu dem Daten gesammelt werden, die mit Daten zu einem <a href=\"#wiki-tcomp\">Vergleichszeitpunkt</a> verglichen werden.",
            "Der Vergleich von Untersuchungs- und Vergleichszeitpunkt erlaubt Aussagen über Veränderungen über die Zeit (und deren Größe), " +
            "also z.B., ob es Menschen besser oder schlechter geht (nur aufgrund der Zeit sind üblicherweise keine Aussagen über die Wirkmechanismen möglich)."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": ["Zeitpunkt zu dem eine Untersuchung stattfindet und der mit einem <a href=\"#wiki-tcomp\">Vergleichszeitpunkt</a> verglichen wird."],
        "maintext": "Ähnlich zur <a href=\"#wiki-treat\">Behandlungsgruppe</a> etwa in Medikamentenstudien."   // string of main text for wiki.
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
        "maintext": "<p>Erfolgt die Zuteilung in <a href=\"#wiki-treat\">Behandlungs-</a> und Kontrollgruppe zufällig, spricht man von einem <a href='#wiki-expe'>Experiment</a>.</p>"   // string of main text for wiki.
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
        "popup": ["Zeitpunkt mit dem Daten zu einem <a href=\"#wiki-teval\">Untersuchungszeitpunkt</a> verglichen werden."],
        "maintext": ""   // string of main text for wiki.
    },
    "placebo": {
        "heading": "Placebo",  // the heading.
        "subheading": "",  // placeholder for a potential subheading.
        "aliases": [],  // list of other names.
        "annotation": "",  // internal annotations; should be eventually ""
        "overview": ["Eine Scheinbehandlung, bei der ein Präparat ohne Wirkstoff verabreicht wird.",
            "Wird häufig als <a href='#wiki-control'>Kontrollgruppe</a> in medizinischen Studien verwendet, um den Wirkstoff eines Medikamentes über die von Patienten erwartete Wirkung hinaus zu untersuchen."],  // array of list items overview of most important points, displayed in wiki and text checker.
        "examples": [],  // array of list items with examples.
        "popup": [],
        "maintext": "Versuchspersonen müssen nach einer Studie aufgeklärt werden, in welcher Gruppe sie waren."   // string of main text for wiki.
    }

}