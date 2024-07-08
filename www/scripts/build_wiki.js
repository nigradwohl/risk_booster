const wiki_order = ["risk", "effside",
    "prozent", "freq", "nh",
    "rel", "baseprob", "sample_size",
    "cprob", "pval", "confint",
    "causal", "rct", "treat", "control", "placebo", "teval", "tcomp"]


$(document).ready(function () {

    let wiki_text = "";
    let sidebar_text = "";

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

        // Sidebar:
        sidebar_text += `<a href="risk_wiki.html#wiki-${entry}">${curinfo.heading}</a>\n`;
    }

    $("#entry-list").html(wiki_text);

    // Add sidebar:
    $(".wiki-toc").html(sidebar_text);


})