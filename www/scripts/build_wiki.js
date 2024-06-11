const wiki_order = ["risk", "effside", "prozent", "freq", "nh",
    "rel", "baseprob", "sample_size",
    "cprob", "pval",
"rct", "treat", "control", "placebo"]


$(document).ready(function () {

    let wiki_text = "";

    for (const entry of wiki_order) {

        const curinfo = info_data[entry];

        wiki_text += "<div class=\"wiki-entry full-column\" id=\"wiki-" + entry + "\">";

        wiki_text += '<h2>' + curinfo.heading + '</h2>';

        if(curinfo.annotation.length > 0){
            wiki_text += curinfo.annotation;
        }

        // Overview information from object:
        if (curinfo.overview.length > 0) {
            wiki_text += '<div class="wiki-overview">' +
                '<ul>' +
                "<li>" + curinfo.overview.join("</li><li>") +
                "</li></ul></div>";
        }

        // Example information from object:
        if (curinfo.examples.length > 0) {
            wiki_text += '<div class="wiki-examples"><p>Beispiele: </p><ul>' +
                "<li>" + curinfo.examples.join("</li><li>") +
                "</li></ul></div>";
        }

        // Main text from object:
        if (curinfo.maintext.length > 0) {
            wiki_text += '<div class="wiki-text">' +
                curinfo.maintext +
                '</div>'
        }

        wiki_text += "</div>";
    }

    $("#entry-list").html(wiki_text);

})