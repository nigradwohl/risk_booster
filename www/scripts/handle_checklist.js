/**
 * Manage the display of a risk checklist.
 */


$(document).ready(function () {

    let entry_ix = 0;  // index for the current entry.
    let is_skip = false;
    let out_arr = [0, false];

    // Preparations:
    const ntab = new Basetable(na_tab,  // condition.
        [NaN, NaN],
        [NaN, NaN],
        NaN);
    const ptab = new Basetable(
        na_tab,
        [NaN, NaN], [NaN, NaN], 1);
// NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
    const mtab1 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);
    const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);


    const check_risk = new RiskCollection(ntab, ptab, mtab1, mtab2);
    console.log(check_risk);

    console.log("Handle questions");
    // Get the JSON file for the topic:
    // const page_obj = JSON.parse("scripts/");
    /*
    Object should contain:
    - Question and corresponding input object
    - Order of questions
     */

    // Define order by type (press release, article etc.):

    // Show the first element:
    console.log("#" + q_order[entry_ix] + "-q");
    $("#" + q_order[entry_ix] + "-q").css('display', 'flex');

    // Handle button clicks:
    $(".continue-btn").on("click", function (ev) {
        out_arr = continue_page(ev, entry_ix, check_risk, is_skip);
        entry_ix = out_arr[0];
        is_skip = out_arr[1];
    })

    $("#input-missing").on("click", function (ev) {
        $("#noentry-popup").hide();
    })

    $(window).on("keypress", function (ev) {
        // console.log(ev);
        if (ev.key === "Enter") {
            out_arr = continue_page(ev, entry_ix, check_risk, is_skip);
            entry_ix = out_arr[0];
            is_skip = out_arr[1];
        }

    })

    $(".back-btn").on("click", function () {
        if (entry_ix > 0) {
            entry_ix--;
            $("#" + q_order[entry_ix] + "-q").css('display', 'flex');
            $("#" + q_order[entry_ix + 1] + "-q").hide();
            $(".continue-btn").css('display', 'inline-block');

            if (entry_ix === 0) {
                $(".back-btn").hide();
            }
        }

    })


    // console.log("~~~~~~~~~ Test icon array ~~~~~~~~~~~");
    // let tst2x2 = [[9700, 9850], [300, 150]];
    //
    // // Rescale:
    // tst2x2 = tst2x2.map((x) => x.map((y) => Math.round(y / 20)));
    // console.log(tst2x2);
    //
    // create_icon_array(
    //     tst2x2[0][1], tst2x2[1][0],
    //     tst2x2[1][0], tst2x2[1][1],
    //     'dotdisplay2');
    // $("#dotdisplay2").show();
    //
    // console.log("~~~~~~~~~ eof. test icon array ~~~~~~~~~~~");
});

function continue_page(ev, entry_ix, check_risk, is_skip) {
    // Check entry:
    const curid = q_order[entry_ix];  // id of current page.
    let missing_entries = [];
    let error = false;

    console.log(`Current inputs for ID ${curid}:`);
    console.log(q_inputs);
    console.log(q_inputs[curid]);

    // console.log("Calling event is");
    // console.log(ev);

    // Ensure that the continue button and enter allow to skip, too!

    const skip_misses = ev.currentTarget.id === "skip-missing" || is_skip;
    console.log(`Current target ID is ${ev.currentTarget.id}; Skip misses ${skip_misses}`);

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

        if (!skip_misses) {
            if ([undefined, "", " "].includes(curval)) {
                missing_entries = missing_entries.concat(cur_input);
                console.log("Sie haben nichts eingegeben! Absicht?");

            } else {

                // Evaluate entry:
                // TODO: Check format!
                let checked_val;

                // replace period with nothing:
                checked_val = curval.replace(/\./, "");
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
                // risk_numbers[cur_q_key] = checked_val;

                // Update percentages:
                if (perc_keys.includes(cur_q_key)) {

                    if (curval < 1) {
                        alert("Prozentzahl kleiner 0; Absicht?");
                    }

                    checked_val = checked_val / 100;  // percentage to floating point number.

                    if (cur_q_key === "rrr") {
                        checked_val = 1 - checked_val;  // maybe code transformation in dictionary object?
                    }


                }

                // Save value to table object:
                check_risk.update_by_arr(number_dict[cur_q_key], checked_val);

            }


        } else {
            // If misses were skipped:
            is_skip = false;
        }

    }

    console.log("Current object after entry");
    console.log(JSON.stringify(check_risk, undefined, 2));

    // Try completing the table before advancing:
    check_risk.try_completion();

    console.log("Current object after completion attempt");
    console.log(JSON.stringify(check_risk, undefined, 2));

    // Handle missing entries:
    if (missing_entries.length > 0) {
        // alert("Sie haben nichts eingegeben! Absicht?");
        // Show popup that can be skipped!

        is_skip = true;
        const input_field = $("#" + missing_entries[0]);
        const thispos = input_field.position();  // get position of current question.
        console.log(thispos);

        missing_entries.forEach((id) => $("#" + id).addClass("missing-input").addClass("selected-blur"));

        // Change the popup text here:
        const cur_popup = $("#noentry-popup");

        const popup_height = cur_popup.height();
        const popup_pad = cur_popup.innerHeight() - popup_height;
        const num_height = input_field.height();

        cur_popup
            .css({
                top: thispos.top - popup_height - num_height - popup_pad * 2,
                left: thispos.left,
                position: 'absolute'
            })
            .show();

        // Prevent propagation:
        ev.stopPropagation();

        $(window).on("click", function (e) {

            $("#noentry-popup").hide().removeClass("selected-blur");
            $(window).unbind("click");
        })

    }

    console.log("Missing entries:");
    console.log(missing_entries);

    // Advance page:
    if (!error && missing_entries.length === 0) {
        if (entry_ix < q_order.length) {

            // Check whether input can be skipped: ~~~~~~~~~~~~
            console.log("+++ CHECK IF SKIPPABLE +++");
            const skiplist = ["n-total", "p-treat"];
            const cur_entry = q_order[entry_ix];
            let next_entry;

            let skip = true;

            do {
                entry_ix++;  // Increment entry index.
                next_entry = q_order[entry_ix];  // get the next entry.
                skip = false;  // set to false.

                console.log(`Next entry is ${next_entry}`);

                if (skiplist.includes(next_entry)) {

                    console.log("Index array");
                    console.log(number_dict[id_to_num_dict[next_entry]]);

                    // Get the previous value for the field(s):
                    const prevval = check_risk.get_by_arr(number_dict[id_to_num_dict[next_entry]]);

                    console.log(`Previous value was ${prevval}`);
                    console.log(prevval);

                    // MAY ALSO TEST MULTIPLE INPUTS in loop/map!

                    if (!isNaN(prevval)) {
                        skip = true;  // May be done more sophisticated in the future!
                    }

                }

            } while (skip)


            $("#" + q_order[entry_ix] + "-q").css('display', 'flex');
            $("#" + cur_entry + "-q").hide();

            // Show back button:
            if (entry_ix > 0) {
                $(".back-btn").css('display', 'inline-block');
            }

            console.log("Risk object after entries and calculation");
            console.log(check_risk);
        }

        // Final button:
        // Calculate the table if possible!
        if (entry_ix === q_order.length - 1) {

            // Hide the continue button:
            $(".continue-btn").hide();

            console.log("~~~~~~~~~~~~~~~~ Calculate table ~~~~~~~~~~~~~~~~");
            // First index is condition, second index is treatment!
            // console.log(risk_numbers);


            // const ntab = new Basetable(
            //     [
            //         [risk_numbers.n00, risk_numbers.n01],  // no condition.
            //         [risk_numbers.n10, risk_numbers.n11]],  // condition.
            //     [risk_numbers.msum0x, risk_numbers.msum1x],
            //     [risk_numbers.msumx0, risk_numbers.msumx1],
            //     risk_numbers.N_tot);
            // const ptab = new Basetable(
            //     [
            //         [risk_numbers.p00, risk_numbers.p01],
            //         [risk_numbers.p10, risk_numbers.p11]],
            //     [NaN, NaN], [risk_numbers.mpx0, risk_numbers.mpx1], 1);
            // // NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
            // const mtab1 = new Margintable(na_tab, [NaN, 1 - risk_numbers.rrr], [NaN, NaN]);
            // const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);
            //
            //
            // const check_risk = new RiskCollection(ntab, ptab, mtab1, mtab2);
            check_risk.ptab.complete_margins();
            check_risk.n_from_p();

            check_risk.try_completion();
            check_risk.ntab.complete_margins();

            console.log("~~~~~~ Final risk object ~~~~~~");
            console.log(check_risk);

            // USe the 2x2 table to calculate outputs:
            console.log(check_risk.ntab.tab.margin2_mean());

            // Following the current definition this is the risk:
            const group_risks = check_risk.ntab.tab.margin2_mean();
            console.log("Risks in each group:");
            console.log(group_risks);

            const group_risks_flat = group_risks.flat();

            // Translate to natural frequencies:
            // const curscale = 1000;  // fixed reference! Should eventually be so that the smallest number is detectable!
            const curscale = [100, 1000, 2000, 5000, 10000, 50000, 100000]
                .filter((x) => group_risks_flat.every((r) => (r * x) >= 5))[0];
            // Get the first reference for which the product is greater 1!
            // Altering this threshhold will lead to larger references (which may differentiate better!)
            console.log("Curscale is " + curscale);

            // Round the group risks

            const risk_treat = Math.round(group_risks[1][1] * curscale) / curscale;
            const risk_control = Math.round(group_risks[0][1] * curscale) / curscale;
            const risk_treat_nh = Math.round(risk_treat * curscale) + " aus " + curscale;
            const risk_control_nh = Math.round(risk_control * curscale) + " aus " + curscale;

            // Risk reduction:
            // Absolute change in risk:
            const arc = group_risks[0][1] - group_risks[1][1];  // risk change in favor of treatment group.
            const meaning_arc = arc > 0 ? " weniger" : " mehr";
            console.log(`Absolute change is ${arc}`);

            const arr = Math.sign(arc) * Math.round(arc * curscale) / curscale;
            const arr_p = // arr > 0.01 ? Math.round(arr * 100) + "%" :
                (Math.sign(arc) * Math.round(arc * curscale) + " aus " + curscale + meaning_arc);

            // Note: If the risk is negative, it corresponds to an increase!
            const rrc = Math.abs(arc / group_risks[0][1]); // relative risk change.
            // How many times higher is the risk in the treatment group?

            const rrr = Math.round(rrc * 1000) / 1000;
            console.log("RRR is " + rrr);
            const rr_factor = Math.abs(rrr) >= 2 ? 1 : 100;
            const rrr_p = Math.round(rrr * rr_factor) +
                (rr_factor === 100 ? "% " : " mal ") +
                meaning_arc;
            // For numbers greater than 2 "x mal mehr" may be more appropriate.


            $("#risk-treat").text(risk_treat_nh);
            $("#risk-control").text(risk_control_nh);
            $("#abs-change").html(`Absolute${arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}: in der Behandlungsgruppe erkranken <span class="risk-info" id="arr">${arr_p}</span>`);
            $("#rel-change").html(`Relative${arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}:<span class="risk-info" id="rrr">${rrr_p}</span>`);
            // Rounding can eventually be improved!

            check_risk.ntab.get_N();  // calculate N if not provided.
            console.log(`N is ${check_risk.ntab.N}`);

            // Flexible scaling for large numbers:
            let N_scale = curscale;
            if (curscale > 1000) {  // Determine useful maximum.
                N_scale = 1000;
            }

            // Icon array:
            // const cur2x2 = check_risk.ntab.tab.tab2x2.map((x) => x.map((y) => Math.round(y / N_scale)));
            const cur2x2 = group_risks.map((x) => x.map((y) => Math.round(y * N_scale)));
            console.log(cur2x2);

            const group_arrs = {
                "treat": [cur2x2[1][1], cur2x2[1][0]],
                "control": [cur2x2[0][1], cur2x2[0][0]]
            }

            let ncol = N_scale === 1000 ? 50 : 20;

            const curwid_px = 250;

            // Set dotdisplay size:
            $(".canvas-base").css({
                width: curwid_px + 'px',
                height: Math.round(curwid_px/ncol * N_scale/ncol) + 'px'
            });

            create_icon_array(
                group_arrs.treat,  // treatment group.
                // cur2x2[0][0], cur2x2[0][1],  // control group.
                'dotdisplay-treat',
                ncol,
                ["coral", "lightgrey"]);
            $("#dotdisplay-treat").show();

            create_icon_array(
                // [cur2x2[1][0], cur2x2[1][1]],  // treatment group.
                group_arrs.control,  // control group.
                'dotdisplay-control',
                ncol,
                ["coral", "lightgrey"]);
            $("#dotdisplay-control").show();


            // Add button for saving the page:
            buttonPrintOrSaveDocument.addEventListener("click", printOrSave);  // allow saving.

            // Allow zooming into the canvas:
            $(".canvas-base").on("click", function (e) {

                console.log($(this).attr("id"));
                $(".zoomed-canvas").hide();

                const cur_type = $(this).attr("id").replace("dotdisplay-", "");

                // $(this).clone().appendTo(".canvas-zoom");
                create_icon_array(
                    group_arrs[cur_type],  // control group.
                    $(this).attr("id") + '-zoom');

                const mindim = Math.min(window.innerWidth, window.innerHeight);

                $(".canvas-zoom")
                    .width(mindim)
                    .height(mindim)
                    .css("display", "flex");
                $("#" + $(this).attr("id") + '-zoom').show();

                // Allow clicking anywhere to close:
                e.stopPropagation();  // stop event propagation to avoid immediate hiding on click.
                $(window).on("click", function () {
                    $(".canvas-zoom").hide();
                    $(".zoomed-canvas").hide();
                    // $(this).unbind("click");
                });
            })
        }
    }

    return [entry_ix, is_skip];
}

// ~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Ordered array of question (subpage) IDs which can be reordered fo reach type.
 * @type {string[]}
 */
const q_order = [
    "rel-risk-reduction",
    // "any-control",
    "n-treat-control",
    "n-total", "p-treat",
    "n-case",
    // "or-case",
    // "n-side",
    "results"
];
// ORDER WILL BE FLEXIBLE!

/**
 * Inputs on each subpage to be looped over.
 * @type {{[p: string]: [string]}}
 */
const q_inputs = Object.fromEntries(q_order.map((x) => [x, [x]]));
q_inputs["n-case"] = ["n-case-impf", "n-case-control"];
q_inputs["n-treat-control"] = ["n-impf", "n-control"];
console.log(q_inputs);

/**
 * Dictionary to convert inputs to the numbers in the object. First index is condition, second index is treatment.
 */
const id_to_num_dict = {
    "rel-risk-reduction": "rrr",
    "n-total": "N_tot",
    "any-control": "any_control",
    "n-impf": "msumx1",
    "n-control": "msumx0",
    "p-treat": "mpx1",
    "n-case-impf": "n11",
    // careful! Vaccinated are now column 2 (index 1)!
    // cases are second row (index 1)
    "n-case-control": "n10"  // cases among untreated (cases: 1, treatment: 0)
}

// Create empty object with keys:
/**
 * Keys for each input, to be mapped onto 2x2 table.
 * @type {string[]}
 */
// const entry_keys = [
//     "rrr", "N_tot",
//     "n00", "n01", "n10", "n11",
//     "msum0x", "msum1x", "msum0x", "msum1x",
//     "p00", "p01", "p10", "p11",
//     "mpx0",
//     // Non-numeric info:
//     "any_control"
// ]
// const risk_numbers = Object.fromEntries(entry_keys.map((x) => [x, NaN]));

// Pass the position in table object instead? e.g., as
// "rrr": ["mtab", "rel1", 1]
const number_dict = {
    "rrr": ["mtab2", "rel2", 1],
    "N_tot": ["ntab", "N"],
    "n00": ["ntab", "tab", "tab2x2", 0, 0],
    "n01": ["ntab", "tab", "tab2x2", 0, 1],
    "n10": ["ntab", "tab", "tab2x2", 1, 0],
    "n11": ["ntab", "tab", "tab2x2", 1, 1],
    "msum0x": ["ntab", "msums1", 0], "msum1x": ["ntab", "msums1", 1],
    "msumx0": ["ntab", "msums2", 0], "msumx1": ["ntab", "msums2", 1],
    "p00": ["ptab", "tab", "tab2x2", 0, 0],
    "p01": ["ptab", "tab", "tab2x2", 0, 1],
    "p10": ["ptab", "tab", "tab2x2", 1, 0],
    "p11": ["ptab", "tab", "tab2x2", 1, 1],
    "mpx0": [],
    "mpx1": ["ptab", "msums2", 1],
    // Non-numeric info:
    "any_control": []
}

// // For reference:
// const ntab = new Basetable(
//     [
//         [risk_numbers.n00, risk_numbers.n01],  // no condition.
//         [risk_numbers.n10, risk_numbers.n11]],  // condition.
//     [risk_numbers.msum0x, risk_numbers.msum1x],
//     [risk_numbers.msumx0, risk_numbers.msumx1],
//     risk_numbers.N_tot);
// const ptab = new Basetable(
//     [
//         [risk_numbers.p00, risk_numbers.p01],
//         [risk_numbers.p10, risk_numbers.p11]],
//     [NaN, NaN], [risk_numbers.mpx0, risk_numbers.mpx1], 1);
// // NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
// const mtab1 = new Margintable(na_tab, [NaN, 1 - risk_numbers.rrr], [NaN, NaN]);
// const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);

// Lists of formats:
/**
 * Lists defining the number formats for each input field.
 * @type {string[]}
 */
const int_keys = ["N_tot",
    "n00", "n01", "n10", "n11",
    "msum00", "msum01",
    "msum10", "msum11"];
const float_keys = ["rrr",
    "p00", "p01", "p10", "p11",
    "mpx0"]
const perc_keys = ["rrr", "mpx1"]


// FUNCTIONS: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function create_icon_array(arr_n, id, ncol, col_arr) {

    // Check for non-integer inputs:
    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input/469362#469362

    // Create an ordered array:
    try {
        // Check for integers (numbers( using "try" for now.
        // Update in time!
        // TODO: Proper input checking!
        // const n1 = risk_numbers.n00;  // parseInt($("#n1").val());
        // const n2 = risk_numbers.n01;
        // const n3 = risk_numbers.n10;
        // const n4 = risk_numbers.n11;
        const n_dots = arr_n.reduce((d, i) => d + i);

        // Create an array of types:
        // Determine number of rows:
        let ncols;
        if (ncol === undefined) {
            // Square default:
            ncols = Math.floor(Math.sqrt(n_dots));   // Math.floor(n_dots / 10);  // n_dots % 10;  // remainder.

        } else {
            ncols = ncol;   // Math.floor(n_dots / 10);  // n_dots % 10;  // remainder.
        }

        const nrows = Math.ceil(n_dots / ncols);


        console.log(n_dots + " dots, " + nrows + " rows and " + ncols + " columns");

        // Create a vector of dot types:
        const type_vec = arr_n.map((x, i) => Array(x).fill(i + 1)).flat();
        console.log("Type vec:");
        console.log(type_vec);

        // Determine fontsize:
        const fsize = "40px";
        const maxdim = Math.max(ncols, nrows);
        const wh = maxdim * 40;  // controls the area, the larger the smaller the icons appear.
        // Increasing wh above the icons size creates a (relative) margin for each.

        // Pad any missing elements with empty elements?

        // Create simple icon array:
        // May also benefit from fontawesome!
        (function () {

            'use strict';

            var c = document.getElementById(id);
            // var t = document.getElementById('t');
            var ctx = c.getContext('2d');
            // NOTE: THESE CONTROL THE SIZE OF THE DOTS!
            var w = c.width = wh;  // window.innerWidth;
            var h = c.height = wh / Math.round(ncols / nrows);  // window.innerHeight;
            // Fixed values ensure equal height and width of points.
            // current dots
            var balls = [];
            const total = n_dots;  // number of balls.
            // console.log("current noise: " + noise);
            const bounce = -1;


            // Add balls to the list and give them their direction:
            let icol = 0;
            let irow = 0;
            for (let i = 0; i < total; i++) {

                if (i % ncols === 0) {
                    irow++;
                    icol = 0;
                }

                balls.push({
                    // Initiate random positions:
                    // x: (icol + 0.5) * w / 40,  // the larger, the less spaced out.
                    // y: (irow + 0.5) * h / 40,
                    x: (icol + 0.25) * w / (ncols + 0.5),  // the larger, the less spaced out.
                    y: (irow + 0.25) * h / (nrows + 0.5),
                    type: type_vec[i]
                })

                icol++;  // Increment column.


            }

// draw all balls each frame
            function draw() {
                ctx.clearRect(0, 0, w, h);
                let j, dot;
                console.log("The ball object:");
                console.log(balls);
                for (j = 0; j < total; j++) {
                    dot = balls[j];  // get the ball.
                    // ctx.beginPath();
                    // ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2, false);  // second parameter controls size.
                    // console.log(j);
                    // console.log(dot);

                    // ctx.clearRect(0, 0, c.width, c.height);
                    ctx.font = '900 ' + fsize + ' FontAwesome';  // For font awesome 5+: '900 48px "Font Awesome 5 Free"';

                    // Define dot colors:
                    // const col_arr = ["#90f6d7", "#41506b", "#35bcbf", "#263849"];
                    // const col_arr = ["lightgrey", "coral", "green", "purple"];
                    ctx.fillStyle = col_arr[dot.type - 1];

                    // ctx.fillText(((dot.type % 2 === 0) ? "\uf119" : '\uf118'), dot.x, dot.y);  // smile or frown.
                    ctx.fillText('\uF007', dot.x, dot.y);  // use user icon.
                    // https://stackoverflow.com/questions/63601531/draw-font-awesome-icons-to-canvas-based-on-class-names
                    // (dot.type % 2 === 0) ? ctx.stroke() : '';


                    // noise dots unfilled.
                    // ctx.fillStyle = "rgb(0,0,0)";
                    // ctx.fill();
                    // ctx.strokeStyle = 'black';  // stroke for those with noise.
                    // (dot.type % 2 === 0) ? ctx.stroke() : '';
                }

            }

            // loop the animation
            // requestAnimationFrame(function loop() {
            //     requestAnimationFrame(loop);
            draw();
            // });


        })();
    } catch (err) {
        alert("Bitte geben Sie eine ganze Zahl ein!");
        console.log(err);
    }
}


// Printing and saving:
// https://techstacker.com/print-or-save-page-button-javascript/
const buttonPrintOrSaveDocument = document.querySelector(
    ".button-print-or-save-document"
)

function printOrSave() {
    window.print();
}
