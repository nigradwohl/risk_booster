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

    // Define order by type (press release, article etc.):

    let entry_ix = 0;  // index fpr the current entry.

    // Show the first element:
    console.log("#" + q_order[entry_ix] + "-q");
    $("#" + q_order[entry_ix] + "-q").show();

    // Handle button clicks:
    $(".continue-btn").on("click", function () {

        // Check entry:
        const curid = q_order[entry_ix];  // id of current page.

        console.log(`Current inputs for ID ${curid}:`);
        console.log(q_inputs);
        console.log(q_inputs[curid]);

        // Loop over defined input fields:
        for (const cur_input of q_inputs[curid]) {

            const cur_q_key = id_to_num_dict[cur_input];  // curent input field.
            let curval;

            // console.log("Is this a button with meaning? " + $(this).hasClass("input-btn"))

            if ($(this).hasClass("input-btn")) {
                console.log("Button with meaning!");
                // console.log($(this).val());
                curval = $(this).val();
            } else {
                curval = $("#" + cur_input).val();  // current input value.
            }
            console.log("Current value is: " + curval);

            if ([undefined, "", " "].includes(curval)) {
                alert("Sie haben nichts eingegeben! Absicht?");
                // Show popup that can be skipped!
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
        }

        // Final button:
        // Calculate the table if possible!
        if (entry_ix === q_order.length) {
            const ntab = new Basetable(
                [[risk_numbers.n00, risk_numbers.n10], [risk_numbers.n01, risk_numbers.n11]],
                [risk_numbers.msum0x, risk_numbers.msum1x],
                [risk_numbers.msumx0, risk_numbers.msumx1],
                risk_numbers.N_tot);
            const ptab = new Basetable(na_tab, [NaN, NaN], [NaN, NaN], 1);
            // NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
            const mtab1 = new Margintable(na_tab, [NaN, 1 - risk_numbers.rrr], [NaN, NaN]);
            const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);


            const simple_risk = new RiskCollection(ntab, ptab, mtab1, mtab2);
            simple_risk.ptab.complete_margins();
            simple_risk.n_from_p();
            console.log(simple_risk);
        }


    })

});

// ~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~


const q_order = [
    "rel-risk-reduction", "n-total",
    "any-control",
    "n-treat-control",
    "n-case",
    "or-case",
    "n-side"];
// ORDER WILL BE FLEXIBLE!

const q_inputs = Object.fromEntries(q_order.map((x) => [x, [x]]));
q_inputs["n-case"] = ["n-case-impf", "n-case-control"];
q_inputs["n-treat-control"] = ["n-impf", "n-control"];
console.log(q_inputs);

/**
 * Dictionary to convert inputs to the numbers in the object.
 */
const id_to_num_dict = {
    "rel-risk-reduction": "rrr",
    "n-total": "N_tot",
    "any-control": "any_control",
    "n-impf": "msumx0",
    "n-control": "msumx1",
    "n-case-impf": "n10",
    // careful! Vaccinated are now column 1 (index 0)!
    // cases are second row (index 1)
    "n-case-control": "n11"
}

// Create empty object with keys:
const entry_keys = [
    "rrr", "N_tot",
    "n00", "n01", "n10", "n11",
    "msum0x", "msum1x", "msum0x", "msum1x",
    "p00", "p01", "p10", "p11",
    // Non-numeric info:
    "any_control"
]
const risk_numbers = Object.fromEntries(entry_keys.map((x) => [x, NaN]));

// Lsits of formats:
const int_keys = ["N_tot",
    "n00", "n01", "n10", "n11",
    "msum00", "msum01",
    "msum10", "msum11"];
const float_keys = ["rrr", "p00", "p01", "p10", "p11"]