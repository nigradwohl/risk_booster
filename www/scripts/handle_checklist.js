/**
 * Manage the display of a risk checklist.
 */

$(document).ready(function () {

    console.log("Handle questions");

    // Get the JSON file for the topic:
    // const page_obj = JSON.parse("scripts/");
    /*
    Object should contain:
    - Question and corresponding input object
    - Order of questions
     */

    const q_order = ["rel-risk-reduction", "n-total", "any-control", "n-side"];
    // ORDER WILL BE FLEXIBLE!

    // Define order by type (press release, article etc.):

    let entry_ix = 0;  // index fpr the current entry.

    // Show the first eleent:
    console.log("#" + q_order[entry_ix] + "-q");
    $("#" + q_order[entry_ix] + "-q").show();

    // Handle button clicks:
    $(".continue-btn").on("click", function () {

        // Check entry:
        const curval = $("#" + q_order[entry_ix]).val();

        if([undefined, "", " "].includes(curval)){
            alert("Invalid value");
        }

        if (entry_ix < q_order.length) {
            entry_ix++;
            $("#" + q_order[entry_ix] + "-q").show();
            $("#" + q_order[entry_ix - 1] + "-q").hide();
        }

    })

})