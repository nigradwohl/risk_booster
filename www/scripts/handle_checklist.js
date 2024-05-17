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

    // Show the first element:
    console.log("#" + q_order[entry_ix] + "-q");
    $("#" + q_order[entry_ix] + "-q").show();

    // Handle button clicks:
    $(".continue-btn").on("click", function () {

        // Check entry:
        const curid = q_order[entry_ix];  // id of current page.
        const cur_q_key = id_to_num_dict[curid];  // curent input field.
        let curval;

        console.log("Is this a button with meaning? " + $(this).hasClass("input-btn"))

        if ($(this).hasClass("input-btn")) {
            console.log("Button with meaning!");
            // console.log($(this).val());
            curval = $(this).val();
        } else {
            curval = $("#" + curid).val();  // current input value.
        }
        console.log("Current value is: " + curval);

        if ([undefined, "", " "].includes(curval)) {
            alert("Sie haben nichts eingegeben! Absicht?");
            // Show popup!
        } else {

            // Evaluate entry:
            // TODO: Check format!
            let checked_val;
            let error = false;

            // Replace comma with period:
            checked_val = curval.replace(/,/, ".");

            // Test, if it is a number and convert if true:
            const is_num = !isNaN(parseFloat(checked_val));
            if (is_num) {
                // Note: Ignores additional text!
                checked_val = parseFloat(checked_val);
            }

            if (int_keys.includes(cur_q_key)) {
                // Check integer entries:
                if (!is_num) {
                    alert("KEINE ZAHL!");
                    error = true;
                } else if (!Number.isInteger(checked_val)) {
                    alert("KEINE GANZE ZAHL!");
                    error = true;
                }
            } else if (float_keys.includes(cur_q_key)) {

                // Check float entries:
                if (!is_num) {
                    alert("KEINE ZAHL!");
                    error = true;
                }

            } else {
                // All other keys (string, boolean etc.)
            }

            // Save value to dictionary:
            risk_numbers[cur_q_key] = checked_val;

            // Advance page:
            if (!error) {
                if (entry_ix < q_order.length) {
                    entry_ix++;
                    $("#" + q_order[entry_ix] + "-q").show();
                    $("#" + q_order[entry_ix - 1] + "-q").hide();
                }
            }

        }


    })

});

// ~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Dictionary to convert inputs to the numbers in the object.
 */
const id_to_num_dict = {
    "rel-risk-reduction": "rrr",
    "n-total": "N_tot"
}

// Create empty object with keys:
const entry_keys = [
    "rrr", "N_tot",
    "n00", "n01", "n10", "n11",
    "p00", "p01", "p10", "p11",
    // Non-numeric info:
    "any_control"
]
const risk_numbers = Object.fromEntries(entry_keys.map((x) => [x, NaN]));

// Lsits of formats:
const int_keys = ["N_tot", "n00", "n01", "n10", "n11"];
const float_keys = ["rrr", "p00", "p01", "p10", "p11"]