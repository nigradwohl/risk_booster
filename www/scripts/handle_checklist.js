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

    let entry_ix = 0;  // index for the current entry.

    // Show the first element:
    console.log("#" + q_order[entry_ix] + "-q");
    $("#" + q_order[entry_ix] + "-q").show();

    // Handle button clicks:
    $(".continue-btn").on("click", function () {

        // Check entry:
        const curid = q_order[entry_ix];  // id of current page.
        let error = false;

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


            }

        }

        // Advance page:
        if (!error) {
            if (entry_ix < q_order.length) {
                entry_ix++;
                $("#" + q_order[entry_ix] + "-q").show();
                $("#" + q_order[entry_ix - 1] + "-q").hide();
            }

            // Final button:
            // Calculate the table if possible!
            if (entry_ix === q_order.length - 1) {
                console.log("~~~~~~~~~~~~~~~~ Calculate table ~~~~~~~~~~~~~~~~");
                // First index is condition, second index is treatment!
                console.log(risk_numbers);

                const ntab = new Basetable(
                    [
                        [risk_numbers.n00, risk_numbers.n01],  // no condition.
                        [risk_numbers.n10, risk_numbers.n11]],  // condition.
                    [risk_numbers.msum0x, risk_numbers.msum1x],
                    [risk_numbers.msumx0, risk_numbers.msumx1],
                    risk_numbers.N_tot);
                const ptab = new Basetable(
                    [
                        [risk_numbers.p00, risk_numbers.p01],
                        [risk_numbers.p10, risk_numbers.p11]],
                    [NaN, NaN], [risk_numbers.mpx0, risk_numbers.mpx1], 1);
                // NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
                const mtab1 = new Margintable(na_tab, [NaN, 1 - risk_numbers.rrr], [NaN, NaN]);
                const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);


                const check_risk = new RiskCollection(ntab, ptab, mtab1, mtab2);
                check_risk.ptab.complete_margins();
                check_risk.n_from_p();

                check_risk.try_completion();
                check_risk.ntab.complete_margins();
                console.log(check_risk);

                // USe the 2x2 table to calculate outputs:
                console.log(check_risk.ntab.tab.margin1_mean());

                // Following the current definition this is the risk:
                const group_risks = check_risk.ntab.tab.margin2_mean();
                console.log(group_risks);
                $("#risk-treat").text(group_risks[1][1]);
                $("#risk-control").text(group_risks[0][1]);
                $("#arr").text(Math.round((group_risks[0][1] - group_risks[1][1]) * 1000) / 1000);
                $("#rrr").text(Math.round((1 - group_risks[1][1] / group_risks[0][1]) * 1000) / 1000);
                // Rounding can eventually be improved!

                check_risk.ntab.get_N();  // calculate N if not provided.
                console.log(`N is ${check_risk.ntab.N}`);

                // Flexible scaling for large numbers:
                let N_scale = 1;
                if (check_risk.ntab.N > 100) {  // Determine useful maximum.
                    N_scale = check_risk.ntab.N / 100
                }

                // Icon array:
                const cur2x2 = check_risk.ntab.tab.tab2x2.map((x) => x.map((y) => Math.round(y / N_scale)));
                console.log(cur2x2);

                create_icon_array(
                    cur2x2[0][1], cur2x2[1][1],  // treatment group.
                    cur2x2[0][0], cur2x2[1][0],  // control group.
                    'dotdisplay');
                $("#dotdisplay").show();
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
    "or-case",
    "n-side",
    "results"];
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
const entry_keys = [
    "rrr", "N_tot",
    "n00", "n01", "n10", "n11",
    "msum0x", "msum1x", "msum0x", "msum1x",
    "p00", "p01", "p10", "p11",
    "mpx0",
    // Non-numeric info:
    "any_control"
]
const risk_numbers = Object.fromEntries(entry_keys.map((x) => [x, NaN]));

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


// FUNCTIONS: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function create_icon_array(n1, n2, n3, n4, id) {

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
        const n_dots = n1 + n2 + n3 + n4;

        // Create an array of types:
        // Determine number of rows:
        const ncols = Math.floor(Math.sqrt(n_dots));   // Math.floor(n_dots / 10);  // n_dots % 10;  // remainder.
        const remainder = n_dots % ncols;
        const nrows = Math.ceil(n_dots / ncols);

        console.log(n_dots + " dots, " + nrows + " rows and " + ncols + " columns");

        // Create a vector of dot types:
        const type_vec = Array(n1).fill(1).concat(Array(n2).fill(2), Array(n3).fill(3), Array(n4).fill(4));
        console.log("Type vec:");
        console.log(type_vec);

        // Determine fontsize:
        const fsize = "40px";
        const maxdim = Math.max(ncols, nrows);
        const wh = maxdim * 50;  // controls the area, the larger the smaller the icons appear.
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
            var h = c.height = wh;  // window.innerHeight;
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
                    x: (icol + 0.5) * w / (maxdim + 2),  // the larger, the less spaced out.
                    y: (irow + 0.5) * h / (maxdim + 2),
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
                    // ctx.fillText('\uF007', dot.x, dot.y);  // use user icon.
                    // https://stackoverflow.com/questions/63601531/draw-font-awesome-icons-to-canvas-based-on-class-names

                    // Define dot colors:
                    // const col_arr = ["#90f6d7", "#41506b", "#35bcbf", "#263849"];
                    const col_arr = ["blue", "red", "green", "purple"];
                    ctx.fillStyle = col_arr[dot.type - 1];

                    ctx.fillText(((dot.type % 2 === 0) ? "\uf119" : '\uf118'), dot.x, dot.y);  // smile or frown.
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
