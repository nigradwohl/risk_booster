$(document).ready(function () {

    // let entry_ix = 0;  // index for the current entry.
    // let is_skip = false;
    // let out_arr = [0, false];

    // Get the variation of the page:
    // Get parameters from URL:
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('page');

    // console.warn(text);

    // TODO: Here the set of wordings has to be adjusted to the case!
    // Note: The outcome may be selected on a first page?
    let typeword = "Einflussgröße";
    let typeverb = "behandelt";
    let addinfo_rrr = "";

    let info_treat = "haben die Behandlung (z.B. das Medikament) erhalten";
    let info_treat2 = "Behandelt";
    let info_contr = "Vergleichsgruppe (z.B., Placebo)";
    let info_contr2 = "Vergleichsgruppe";

    class Verblist {
        constructor(base, aux, main) {
            this.base = base;
            this.aux = aux;
            this.main = main;
        }
    }

    const outcome_list = {
        "eff":
            [{"verb": new Verblist("sterben", "sind", "verstorben"), "noun": "Todesfälle", "direction": "prevent"}],
        "side": [
            // Exchange ERLEIDEN for BERICHTEN?
            {
                "verb": new Verblist("erleiden Nebenwirkungen", "erleiden", "Nebenwirkungen"), "noun": "Nebenwirkungen",
                "direction": "prevent"
            },
            {
                "verb": new Verblist("erleiden leichte Nebenwirkungen", "erleiden", "leichte Nebenwirkungen"),
                "noun": "leichte Nebenwirkungen"
            },
            {
                "verb": new Verblist("erleiden schwere Nebenwirkungen", "erleiden", "schwere Nebenwirkungen"),
                "noun": "schwere Nebenwirkungen"
            }
        ]
    };
    // TODO:


    if (text === "treat") {
        typeword = "Behandlung";

        // outcome = {"verb": ["versterben", "sind verstorben"], "noun": "Todsfälle"};
        // Ad treatment specific endpoints:
        outcome_list.eff = [
            {
                "verb": new Verblist("werden symptomfrei", "werden", "symptomfrei"),
                "noun": "Symptomfreiheit", "direction": "achieve"
            },
            {
                "verb": new Verblist("genesen", "genesen", ""),
                "noun": "Genesungen", "direction": "achieve"
            },
            {
                "verb": new Verblist("berichten Symptomlinderung", "berichten", "Symptomlinderung"),
                "noun": "Symptomlinderung", "direction": "achieve"
            }
        ].concat(outcome_list.eff);

    } else if (text === "impf") {
        typeword = "Impfung";
        typeverb = "geimpft";
        addinfo_rrr = "Manchmal wird diese Zahl auch als \"Impfschutz\" bezeichnet." +
            "<br>" +
            "Unter dem Begriff der Impfstoffwirksamkeit versteht man in der Regel,\n" +
            "wie viele Prozent weniger in der Gruppe der Geimpften erkranken."
        info_treat = "wurden geimpft";
        info_treat2 = "Geimpft";
        info_contr2 = "Ungeimpft";

        outcome_list.eff = [
            {"verb": new Verblist("erkranken", "erkranken", ""), "noun": "Erkrankungen"},
            {
                "verb": new Verblist("ins Krankenhaus eingewiesen worden", "werden", "ins Krankenhaus eingewiesen"),
                "noun": "Krankenhauseinweisungen", "direction": "prevent"
            },
            {
                "verb": new Verblist("auf die Intensivstation eingewiesen worden", "werden", "auf die Intensivstation eingewiesen"),
                "noun": "Krankenhauseinweisungen", "direction": "prevent"
            },
            {
                "verb": new Verblist("werden diagnostiziert", "werden", "diagnostiziert"),
                "noun": "Positive Diagnosen", "direction": "prevent"
            }
        ].concat(outcome_list.eff);
    } else if (text === "test") {
        $("#prev-treat").html("ist tatsächlich erkrankt (\"Prävalenz\")");
        $("#sens").html("Positive Tests unter den Erkrankten (Sensitivität)");
        $("#spec").html("Negative Tests unter den Gesunden (Spezifität)");
        typeverb = "tatsächlich erkrankt";
        typeword = "Diagnostischer Test";

        // Change the results display:
        $("#head1").text("Testgüte (Spezifität und Sensitivität)");
        $("#head2").text("Vorhersagegüte (NPV und PPV)");
        $(".grid-subhead1").text("Unter den Gesunden");
        $(".grid-subhead2").text("Unter den Erkrankten");
        $(".grid-subhead1#subhead1-r2").text("Unter den negativ getesteten");
        $(".grid-subhead2#subhead2-r2").text("Unter den positiv getesteten");
        // TODO: Switch perspective?
        // $("#results-2").html("");  // Second results are not needed for tests.

        // Define outcome information:
        outcome_list.eff = [
            {
                "verb": new Verblist("bekommen ein positives Testergebnis", "werden", "positv getestet"),
                "noun": "Positives Testergebnis", "direction": "achieve"
            }
        ]

        outcome_list.side = [
            {
                "verb": new Verblist("sind tatsächlich erkrankt", "sind", "erkrankt"),
                "noun": "Tatsächlich erkrankt", "direction": "achieve"
            }
        ]
    }

    // Assign the words determined above to the ids and classes:
    $("#case-test").text(typeword);
    $(".cur-topic").text(typeword);
    $(".typeword").text(typeword);  // Set wordings
    $(".typeverb").text(typeverb);  // Set wordings
    $(".addinfo-rrr").html(addinfo_rrr);

    $(".info-treat").text(info_treat);
    $(".info-treat2").text(info_treat2);
    $(".info-control").text(info_contr);
    $(".info-control2").text(info_contr2);


    // Add outcome to selections:
    for (let i = 0; i < outcome_list.eff.length; i++) {
        $("#out-eff").append(`<option value="${i}">${outcome_list.eff[i].noun}</option>`);
    }
    for (let i = 0; i < outcome_list.side.length; i++) {
        $("#out-side").append(`<option value="${i}">${outcome_list.side[i].noun}</option>`);
    }


    // Preparations:
    const cur_order = text === "test" ? q_order_test : q_order;
    const cur_checklist = new Checklist(cur_order, outcome_list, text);  // create a new checklist instance.
    // const check_risk = new RiskCollection();

    // Set initial values:
    if (text === "test") {
        // Set the margin sums:
        cur_checklist.check_risk.ntab.N = 10000;  // Determine a random N.
    }

    console.log("CURRENT CHECKLIST");
    console.log(cur_checklist);


    console.log("+++ Handle questions +++");

    // Define order by type (press release, article etc.):
    // Show the first element:
    console.log("#" + cur_checklist.q_order[cur_checklist.entry_ix] + "-q");
    $("#" + cur_checklist.q_order[cur_checklist.entry_ix] + "-q").css('display', 'flex');

    // ~~~ ADVANCING ~~~
    // Handle button clicks:
    $(".continue-btn").on("click", function (ev) {
        cur_checklist.continue_page(ev);
        // out_arr = continue_page(ev, entry_ix, check_risk, is_skip);
        // entry_ix = out_arr[0];
        // is_skip = out_arr[1];
    })

    // Continue on keypress:
    $(window).on("keypress", function (ev) {
        // console.log(ev);
        if (ev.key === "Enter" && cur_checklist.entry_ix < cur_checklist.q_order.length - 1) {
            // console.log(`CONTINUE ON ENTER! -- ${cur_checklist.entry_ix} < ${cur_checklist.q_order.length}?`);
            cur_checklist.continue_page(ev);
            // out_arr = continue_page(ev, entry_ix, check_risk, is_skip);
            // entry_ix = out_arr[0];
            // is_skip = out_arr[1];
        }

    })

    // ~~~ GOING BACK ~~~
    $(".back-btn").on("click", function () {
        cur_checklist.handle_back();

    })

    // ~~~ HANDLING OTHER ~~~

    // Entry deletion:
    $(".delete-entry").on("click", function () {
        const cur_inp = $(this).siblings("input");  // id of current page.

        cur_inp.val("");  // empty input.
        console.log(`Deleted inputs for ID ${cur_inp.attr("id")}:`);

        // Delete associated table inputs:
        // const cur_q_key = id_to_num_dict[cur_inp.attr("id")]
        // console.log(number_dict[cur_q_key]);
        // check_risk.update_by_arr(number_dict[cur_q_key], NaN);
        // console.log(check_risk);
        // Note: This only deletes the entry itself and not derived quantities.

    })

    // Decide to provide missing input:
    $("#input-missing").on("click", function (ev) {
        $("#noentry-popup").hide();
    })

    // Incompatible entries:
    $("#acknowledge-incompatible").on("click", function () {
        $("#incompatible-popup").hide();
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

    // Editing risk info elements:
    let curtext;
    // $(".editable").on("click", function () {
    //
    //     $("#edit-text-popup").show();
    //
    //     curtext = $(this);
    //     console.log("curtext is:");
    //     console.log(curtext);
    //     $("#edit-newtext").val(curtext.text());
    // })

    function end_editing() {
        const textfields = $(".edit-note");
        textfields.hide();
        textfields.removeClass("selected-blur");

        const elems_edit = $(".editable");

        elems_edit.each(function (ix, el) {
            console.log(el);
            const curid = el.id;
            // get the input values:
            $("#" + curid).text($("#edit-" + curid).val());
        });

        // Hide editable elements and show text fields instead:
        elems_edit.show();
        $("#edit-texts").show();
        $("#stop-edit").hide();
    }

    $("#edit-texts").on("click", function (e) {

        const elems_edit = $(".editable");

        elems_edit.each(function (ix) {
            console.log(this);
            const curid = this.id;
            const curtext = $("#" + curid).text();
            console.log(JSON.stringify(curtext));
            $("#edit-" + curid).val(curtext);
        });

        // Hide editable elements and show text fields instead:
        elems_edit.hide();
        $(this).hide();
        $("#stop-edit").show();

        const textfields = $(".edit-note");
        textfields.show();
        // textfields.css("z-index", 9999);
        textfields[0].className = textfields[0].className + " selected-blur";  // add blurring class to one element.

        // Allow to end editing by clicking anywhere:
        e.stopPropagation();
        $(window).on("click", function (e) {
            // $(".edit-note").removeClass("selected-blur");
            // $("#stop-edit").hide();
            // $("#edit-texts").show();
            // console.log("CLICKED ELEMENT");
            // console.log(e);
            // console.log(e.target.className);

            // When not clicking on a text field for editing:
            if (!/(edit-note|navele)/.test(e.target.className)) {
                end_editing();
                $(window).unbind("click");
            }
        })

    })

    $("#stop-edit").on("click", end_editing)

    // $("#edit-ok").on("click", function () {
    //
    //     console.log(curtext);
    //     const text_element = $("#edit-newtext");
    //     console.log(text_element.val());
    //
    //     curtext.text(text_element.val());
    //
    //     text_element.val("");
    //     $("#edit-text-popup").hide();
    // })


    // $("#edit-cancel").on("click", function () {
    //     $("#edit-newtext").val("");
    //     $("#edit-text-popup").hide();
    // })

});


// eof. handling after document is loaded

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
------------------------------ RESOURCES -------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */


// ~~~~~~~~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO


// ~~~~~~~~~~~~~~~~~~~~~~~ CLASSES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Class to create a checklist instance
 */

class Checklist {
    constructor(q_order, outcome_list, type) {
        this.type = type;
        this.q_order = q_order;

        // Input map:
        this.q_inputs = Object.fromEntries(q_order.map((x) => [x, [x]]));
        if (q_order.includes("n-case")) {
            this.q_inputs["n-case"] = ["n-case-impf", "n-case-control"]
        }
        if (q_order.includes("p-case")) {
            this.q_inputs["p-case"] = ["p-case-impf", "p-case-control"]
        }
        if (q_order.includes("n-treat-control")) {
            this.q_inputs["n-treat-control"] = ["n-impf", "n-control"]
        }
        if (q_order.includes("n-side")) {
            this.q_inputs["n-side"] = ["n-side-impf", "n-side-control"]
        }
        if (q_order.includes("p-side")) {
            this.q_inputs["p-side"] = ["p-side-impf", "p-side-control"]
        }
        if (q_order.includes("p-sens-spec")) {
            this.q_inputs["p-sens-spec"] = ["p-sens", "p-spec"]
        }

        this.outcome_list = outcome_list;
        if (type === "test") {

            this.assign_words(0, 0)

        } else {

            this.outcome = "";
            this.outcome_side = "";
        }


        this.entry_ix = 0;

        this.is_skip = false;
        this.is_error = false;
        this.is_incompatible = false;
        this.is_invalid = false;
        this.is_reload = false;

        this.skip_misses = false;
        this.missing_entries = [];
        this.skipped_inputs = [];  // list of inputs that were previously skipped.

        // TODO: Update if input is skipped; also delete inputs that were not skipped a different time!
        this.check_risk = new RiskCollection();
        this.check_side = new RiskCollection();
    }

    assign_words(out_eff, out_side) {
        this.outcome = this.outcome_list.eff[out_eff];  // assign the selected outcome.
        this.outcome_side = this.outcome_list.side[out_side]

        $(".outcome-noun").text(this.outcome.noun);
        $(".outcome-verb").text(this.outcome.verb.base);

        $(".side-noun").text(this.outcome_side.noun);
        $(".side-verb").text(this.outcome_side.verb.base);
    }

    // Method to advance page:
    continue_page(ev) {

        // 0. Initialize variables: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.is_error = this.is_incompatible || this.is_invalid;
        // this.is_reload = false;
        this.missing_entries = [];

        // Check, if it is a relaod.
        // If so, fill the table with all entries until now:
        if (this.is_reload) {
            this.handle_reloads();
        }

        this.skip_misses = ev.currentTarget.id === "skip-missing" || (this.is_skip && !this.is_error) || this.entry_ix === 0;
        // skip, if calling event is the "skip-misses" button or if the page is to be skipped.
        console.log(`Current target ID is ${ev.currentTarget.id}; Skip misses ${this.skip_misses}; Incompatible: ${this.is_incompatible}; Invalid: ${this.is_invalid}`);

        const curid = this.q_order[this.entry_ix];  // get id of current page.

        console.log(`${"~".repeat(30)} NEXT PAGE ${curid} ${"~".repeat(30)}`);

        // For the first page where outcomes are selected:
        if (curid === "select-outcome") {

            const out_eff = $("#out-eff").val();
            const out_side = $("#out-side").val();

            console.log(`Eff: ${out_eff}, Side: ${out_side}`);

            this.assign_words(out_eff, out_side);  // assign the corresponding words.

            // Show the new question and hide the previous one:
            this.entry_ix++;
            $("#" + this.q_order[this.entry_ix] + "-q").css('display', 'flex');
            $("#select-outcome-q").hide();

            // Removal of higlighting classes:
            $("#noentry-popup").hide();
            $(".missing-input").removeClass("missing-input").removeClass("selected-blur");

            // Show back button:
            if (this.entry_ix > 0) {
                $(".back-btn").css('display', 'inline-block');
            }

        } else {
            // For all subsequent pages:
            // 1. Get the inputs on current page: ~~~~~~~~~~~~~~~~~~~~~~~~
            if (!this.skip_misses) {

                console.log("++++ Getting inputs and complete ++++");

                // Save the previous instances:
                // const risk_prev = JSON.stringify(this.check_risk);
                // const side_prev = JSON.stringify(this.check_side);
                this.check_risk.save_current_content();
                this.check_side.save_current_content();

                // If it is not a round where inputs should be skipped:
                const inp_test = this.get_current_input(curid, this.q_inputs[curid], id_to_num_dict);
                // After trying to get the inputs, try completing the table:

                try {
                    this.check_risk.try_completion(0);

                    if (!["test"].includes(this.type)) {
                        this.check_side.try_completion(0);
                    }

                    // Reset flag if no error is caught:
                    this.is_incompatible = false;
                } catch (e) {
                    console.error("Non-matching entries! " + e);

                    // Reset the values to before getting entries and trying to complete:
                    this.check_risk.retrieve_previous_content();
                    if (!["test"].includes(this.type)) {
                        this.check_side.retrieve_previous_content();
                    }

                    // After reset:
                    console.log("AFTER RESET");
                    console.log(this.check_risk);
                    if (!["test"].includes(this.type)) {
                        console.log(this.check_side);
                    }

                    // Show that inputs were incompatible:
                    $("#incompatible-popup").show().addClass("selected-blur");
                    this.is_error = true;
                    this.is_incompatible = true;
                }

                // Check for errors:
                if (this.is_error) {
                    console.error(`An error (${inp_test}) occured when providing input!`);
                }

            } else {
                // If misses were skipped:
                this.is_skip = false;
            }

            // TODO: Check for errors!

            console.warn(`There is invalid input ${this.is_invalid}`);

            // 2. Handle missing entries:
            if (this.missing_entries.length > 0 && !this.is_incompatible && !this.is_invalid) {
                // alert("Sie haben nichts eingegeben! Absicht?");
                // Show popup that can be skipped!
                // this.is_skip = true;
                handle_missing_input(ev, this.missing_entries);

            }


            // Advance page:
            if (!this.is_error && this.missing_entries.length === 0) {

                // Pages before results:
                if (this.entry_ix < this.q_order.length) {
                    this.increment_or_skip();
                }

                // Final results page:
                if (this.entry_ix === this.q_order.length - 1) {

                    this.handle_final_page();  // handle the final page.

                    // Hide the continue button:
                    $(".continue-btn").hide();
                }

            } else if (this.is_error) {
                console.error("An error occured!");
                this.is_invalid = false;  // reset the invalidity flag.
            }
        }


    }

    // Increment page:
    increment_or_skip() {
        // Check whether input can be skipped: ~~~~~~~~~~~~
        console.log("+++ CHECK IF SKIPPABLE +++");
        const skiplist = ["n-total", "p-treat", "n-case", "p-case", "n-side", "p-side"];  // Make p-side or n-side skippable, if both were provided!
        const cur_entry = this.q_order[this.entry_ix];
        let next_entry;

        let skip = true;

        /*
        Do-while loop to increment entry index, check if the to be replaced value exists, if it does --> skip.
         */
        do {
            this.entry_ix++;  // Increment entry index.
            next_entry = this.q_order[this.entry_ix];  // get the next entry.
            skip = false;  // set to false.

            console.log(`Next entry is ${next_entry}`);

            if (skiplist.includes(next_entry)) {

                // Get the previous value for the field(s):
                let prevvals = [];

                for (const inp of this.q_inputs[next_entry]) {

                    console.log("Index array");
                    const ref_ix = id_to_num_dict[inp];
                    console.log(ref_ix);

                    if (eff_keys.includes(ref_ix)) {
                        // Get from effectivity object if not in side-keys:
                        prevvals = prevvals.concat(this.check_risk.get_by_arr(number_dict[ref_ix]));
                    }
                    if (side_keys.includes(ref_ix)) {
                        prevvals = prevvals.concat(this.check_side.get_by_arr(number_dict[ref_ix]));
                    }
                }


                console.log(`Previous value was ${prevvals}`);
                console.log(prevvals);

                // MAY ALSO TEST MULTIPLE INPUTS in loop/map!

                // SKip, if value exists in object:
                if (!prevvals.includes(NaN)) {
                    skip = true;  // May be done more sophisticated in the future!
                    this.skipped_inputs = this.skipped_inputs.concat(this.entry_ix);
                }

            }

        } while (skip)


        // Show the new question and hide the previous one:
        $("#" + this.q_order[this.entry_ix] + "-q").css('display', 'flex');
        $("#" + cur_entry + "-q").hide();

        // Removal of popups and highlighting classes:
        $("#noentry-popup").hide();
        $("#incompatible-popup").hide();
        $(".missing-input").removeClass("missing-input").removeClass("selected-blur");

        // Show back button:
        if (this.entry_ix > 0) {
            $(".back-btn").css('display', 'inline-block');
        }

        // console.log("Risk object after entries and calculation");
        // this.check_risk.print();
        // this.check_side.print();
    }

    // Method to handle final page:
    handle_final_page() {
        console.log("+++ Handling final page +++");

        // this.handle_reloads();

        // CALCULATE RISK INFORMATION
        const risk_info = this.calculate_risks();
        console.log(risk_info);
        const cur2x2_eff = risk_info.cur2x2_eff;
        const cur2x2_side = risk_info.cur2x2_side;
        const group_arrs_eff = {
            "treat": [cur2x2_eff[1][1], cur2x2_eff[1][0]],
            "control": [cur2x2_eff[0][1], cur2x2_eff[0][0]]
        }
        const group_arrs_side = {
            "treat": [cur2x2_side[1][1], cur2x2_side[1][0]],
            "control": [cur2x2_side[0][1], cur2x2_side[0][0]]
        }


        // ICON ARRAYS:
        let ncol = risk_info.N_scale === 1000 ? 25 : 10;  // determine number of columns.
        const curwid_px = 180;  // Determine basic width in pixels.
        const expansion = risk_info.N_scale === 1000 ? 25 : 40;  // expansion factor for area.

        // Effectivity:
        try {
            // Create the icon arrays and assigne them:
            create_icon_array(
                group_arrs_eff.treat,  // treatment group.
                // cur2x2[0][0], cur2x2[0][1],  // control group.
                'dotdisplay-treat',
                ncol,
                ["coral", "lightgrey"],
                expansion);

            create_icon_array(
                // [cur2x2[1][0], cur2x2[1][1]],  // treatment group.
                group_arrs_eff.control,  // control group.
                'dotdisplay-control',
                ncol,
                ["coral", "lightgrey"],
                expansion);

            $("#results-1-error ~ *:not(textarea)").show();
            $("#results-1-error").hide();

        } catch (error) {
            console.warn(error);

            console.log(this.check_risk);

            // TODO: Show which info is missing!
            // Candidates are:
            // Sizes of the groups:

            // Baseline risk/AR in at least one of the groups:
            // Through risk in margins or cases plus number of individuals.
            if (this.check_risk.mtab2.tab.tab2x2.flat().every(x => isNaN(x))) {
                console.warn("We could not determine the risk in either of the groups. " +
                    "Providing a risk in one of the groups throguh a percentage or a number of cases in that group should help!");
            }


            $("#results-1-error ~ *:not(textarea)").hide();
            $("#results-1-error").show();

        }


        // Side effects:
        // if (["test"].includes(this.type)) {
        try {
            create_icon_array(
                group_arrs_side.treat,  // treatment group.
                // cur2x2[0][0], cur2x2[0][1],  // control group.
                'dotdisplay-treat-side',
                ncol,
                ["steelblue", "lightgrey"],
                expansion);

            create_icon_array(
                // [cur2x2[1][0], cur2x2[1][1]],  // treatment group.
                group_arrs_side.control,  // control group.
                'dotdisplay-control-side',
                ncol,
                ["steelblue", "lightgrey"],
                expansion);

            $("#results-2-error ~ *").show();
            $("#results-2-error").hide();

        } catch (error) {
            console.warn(error);

            // TODO: Show which info is missing!

            $("#results-2-error ~ *").hide();
            $("#results-2-error").show();
        }
        // }


        // Adding functionality: ~~~~~~~~~~~~~~~~~~
        // Add button for saving the page:
        buttonPrintOrSaveDocument.addEventListener("click", printOrSave);  // allow saving.

        // Allow zooming into the canvas:
        $(".canvas-base")
            .css({
                width: curwid_px + 'px',
                height: Math.round(curwid_px / ncol * risk_info.N_scale / ncol) + 'px'
            })
            .on("click", function (e) {
                // const obj = $(this);
                console.log(e);
                // Check whether risk or side!
                const clickid = e.currentTarget.id;
                const is_side = /-side/.test(clickid);
                const group_arrs = is_side ? group_arrs_side : group_arrs_eff;
                const col_arr = is_side ? ["steelblue", "lightgrey"] : ["coral", "lightgrey"];
                const curgrp = clickid.match(/control|treat/)[0];
                console.log(group_arrs)

                zoom_canvas(e, group_arrs[curgrp], ncol, "dotdisplay-zoom", col_arr);
            })
            .show();
    }

    // METHOD TO CALCULATE RISKS:
    calculate_risks() {

        console.log("~~~~~~~~~~~~~~~~ Calculate table ~~~~~~~~~~~~~~~~");
        // First index is condition, second index is treatment!
        // console.log(risk_numbers);

        // this.check_risk.ptab.complete_margins();
        // this.check_risk.n_from_p();
        //
        //
        // this.check_risk.ntab.complete_margins();
        //
        // this.check_risk.ntab.get_N();  // calculate N if not provided.
        // console.log(`N is ${this.check_risk.ntab.N}`);

        console.log("~~~~~~ Final risk objects ~~~~~~");
        console.log("Effectivity:");
        console.log(this.check_risk);
        console.log("Side effects:");
        console.log(this.check_side);

        // Transpose the risks for testing case:
        if (["test"].includes(this.type)) {
            this.check_side.ntab.tab.tab2x2 = transpose(this.check_risk.ntab.tab.tab2x2);
        }

        console.log("~~~~~~ Calculate the risks ~~~~");
        // TODO: Rather get from ptab/mtab -- this should be more flexible
        //  (e.g., if the risks in both groups were entered in percent).
        const eff_group_risks = this.check_risk.ntab.tab.margin2_mean();
        let side_group_risks = this.check_side.ntab.tab.margin2_mean();  // Get the margins.
        // For testing case switch negatively tested to show actually healthy:
        if (["test"].includes(this.type)) {
            side_group_risks[0] = side_group_risks[0].reverse();
        }

        console.log("Risks in each group:");
        console.log(eff_group_risks);
        console.log(side_group_risks);

        const group_risks_flat = eff_group_risks.flat().concat(side_group_risks.flat()).filter(x => x && !isNaN(x));

        // Translate to natural frequencies:
        // const curscale = 1000;  // fixed reference! Should eventually be so that the smallest number is detectable!
        // was: [100, 1000, 2000, 5000, 10000, 50000, 100000]
        const curscale = [100, 1000, 10000, 100000]
            .filter((x) => group_risks_flat.every((r) => (r * x) >= 5))[0];
        // Get the first reference for which the product is greater 1!
        // Altering this threshold will lead to larger references (which may differentiate better!)
        console.log("Curscale is " + curscale);
        // Flexible scaling for large numbers:
        let N_scale = curscale;
        if (curscale > 1000) {  // Determine useful maximum.
            N_scale = 1000;
        }

        function get_risk_set(group_risks) {
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
            // For an increase report the multiple!
            const rrc = arc > 0 ? Math.abs(arc / group_risks[0][1]) : group_risks[1][1] / group_risks[0][1];
            // relative risk change.
            // How many times higher is the risk in the treatment group?

            const rrr = Math.round(rrc * 1000) / 1000;
            console.log("RRR is " + rrr);
            const rr_factor = Math.abs(rrr) >= 2 ? 1 : 100;
            const rrr_p = Math.round(rrr * rr_factor) +
                (rr_factor === 100 ? "% " : " mal ") +
                meaning_arc;
            // For numbers greater than 2 "x mal mehr" may be more appropriate.

            return {
                "risk_treat_nh": risk_treat_nh, "risk_control_nh": risk_control_nh,
                "arc": arc, "arr_p": arr_p, "rrr_p": rrr_p
            }
        }

        const eff_risks = get_risk_set(eff_group_risks);
        console.log(eff_risks);

        // Assign the information to the objects in results page:
        $("#risk-treat").html(this.outcome.verb.aux + "<br>" + eff_risks.risk_treat_nh + " " + this.outcome.verb.main);
        $("#risk-control").html(this.outcome.verb.aux + "<br>" + eff_risks.risk_control_nh + " " + this.outcome.verb.main);

        // Rounding can eventually be improved!

        const cur2x2_eff = eff_group_risks.map((x) => x.map((y) => Math.round(y * N_scale)));
        console.log(cur2x2_eff);

        // Handle side effects:
        // Handle side effects:
        const side_risks = get_risk_set(side_group_risks);
        console.log("Side risks");
        console.log(side_risks);
        console.log(side_group_risks);
        // Assign the information to the objects in results page:
        $("#risk-treat-side").html(this.outcome_side.verb.aux + "<br>" + side_risks.risk_treat_nh + " " + this.outcome_side.verb.main);

        let cur_side_control = side_risks.risk_control_nh;

        if (["test"].includes(this.type)) {
            cur_side_control = cur_side_control + " nicht";  // highlight the non-events!
        } else {
            // Add some information only in non-testing case:
            $("#abs-change").html(`Absolute${eff_risks.arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}: in der Behandlungsgruppe ${this.outcome.verb.aux} <span class="risk-info" id="arr">${eff_risks.arr_p} ${this.outcome.verb.main}</span>`);
            $("#rel-change").html(`Relative${eff_risks.arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}:<span class="risk-info" id="rrr">${eff_risks.rrr_p}</span>`);
            $("#abs-change-side").html(`Absolute${side_risks.arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}: in der Behandlungsgruppe ${this.outcome_side.verb.aux} <span class="risk-info" id="arr">${side_risks.arr_p}</span> ${this.outcome_side.verb.main}`);
            $("#rel-change-side").html(`Relative${side_risks.arc < 0 ? "r Risikoanstieg" : " Risikoreduktion"}:<span class="risk-info" id="rrr">${side_risks.rrr_p}</span>`);
        }

        // Also assign the side effect risks in the control group (or among the nagtively tested):
        $("#risk-control-side").html(this.outcome_side.verb.aux + "<br>" + cur_side_control + " " + this.outcome_side.verb.main);

        const cur2x2_side = side_group_risks.map((x) => x.map((y) => Math.round(y * N_scale)));
        console.log(cur2x2_side);


        // Return value of method:
        return {"cur2x2_eff": cur2x2_eff, "cur2x2_side": cur2x2_side, "N_scale": N_scale};
    }

    get_current_input(curid, input_arr, id_to_num_dict) {
        // Loop over defined input fields:
        this.is_invalid = false;  // flag that input is valid.

        for (const cur_input of input_arr) {

            const cur_q_key = id_to_num_dict[cur_input];  // get current input field, tied to table.

            let curval;  // initialize current value.

            // console.log("Is this a button with meaning? " + $(this).hasClass("input-btn"))

            console.log("++++ Checking current input ++++");
            console.log($("#" + cur_input)[0].validity.patternMismatch);

            // Is the input a button or a text-field?
            if ($(this).hasClass("input-btn")) {
                console.log("Button with meaning!");
                // console.log($(this).val());
                curval = $(this).val();
            } else {
                const cur_field = $("#" + cur_input);
                if (cur_field[0].validity.patternMismatch) {
                    console.error("Input pattern does not match");
                    this.is_error = true;
                    this.is_invalid = true;
                    return "err_pat";
                } else {
                    // If there is no error:
                    curval = cur_field.val();  // current input value.
                    // this.is_invalid = false;
                }

            }
            console.log("Current value is: " + curval);

            // If misses should not be skipped:


            // If not a missing value is skipped:
            // console.log(this.missing_entries.toString());  // check current set of missings.
            // Check the value; if appropriate, check the number format, transform and save to object.
            if ([undefined, "", " "].includes(curval)) {
                this.missing_entries = this.missing_entries.concat(cur_input);
                console.warn("Sie haben nichts eingegeben! Absicht?");

            } else {
                // If the current value is defined and non-empty:

                // Evaluate entry (curval in, checked val out):
                let checked_val = evaluate_entry(curval, cur_q_key);
                // this.is_error = cureval !== "noerr";  // log if an error occurred.
                //
                // // Save value to table object:
                // this.check_risk.update_by_arr(number_dict[cur_q_key], checked_val);

                // Check if an error occurred:
                if (/err_/.test(checked_val.toString())) {
                    this.is_error = true;
                    return checked_val;

                } else {
                    console.log(`Update objects ${cur_q_key}:`);
                    console.log(number_dict[cur_q_key]);

                    console.log(`Side keys: ${side_keys.includes(cur_q_key)}, eff keys: ${eff_keys.includes(cur_q_key)}; VALUE: ${checked_val}`)

                    if (eff_keys.includes(cur_q_key)) {
                        // Change effectivity as a function of prevention vs. achievement:
                        if (cur_q_key === "rrr" && this.outcome.direction === "achieve") {
                            console.log("Update relative value:");
                            checked_val = 2 - checked_val;
                        }
                        this.check_risk.update_by_arr(number_dict[cur_q_key], checked_val);
                    }

                    if (side_keys.includes(cur_q_key)) {
                        this.check_side.update_by_arr(number_dict[cur_q_key], checked_val);
                    }
                }

            }
        }

    }

    handle_reloads() {

        // ~~~~~~~~~ Loop over all entries and complete (for reloads)! ~~~~~~~~~~~~~
        console.log(`Is reload? ${this.is_reload}`);
        this.is_reload = false;  // reset the flag!
        console.log("~~~~ Risk object before re-calculation ~~~");
        this.check_risk.print();

        // console.log("Skipped inputs were:");
        this.skipped_inputs = this.skipped_inputs.filter(x => x < this.entry_ix);  // remove future skips!
        // console.log(this.skipped_inputs);
        const skipped_ids = this.q_order.filter((x, ix) => this.skipped_inputs.includes(ix));
        // console.log(skipped_ids);

        // Loop over defined input fields (omit the first 2 uninformative questions):
        for (const curid of this.q_order.slice(2, this.entry_ix)) {

            // Skip input fields that have been skipped previously!
            if (!skipped_ids.includes(curid)) {
                console.log(`Current inputs for ID ${curid}:`);
                console.log(this.q_inputs[curid]);

                this.get_current_input(curid, this.q_inputs[curid], id_to_num_dict);

                console.log("Risk object after re-evaluating inputs until then");
                this.check_risk.print();
            }


        }

        // Retry completion:
        console.log("~~~~ Risk object after re-calculation ~~~~");
        this.check_risk.print();
        this.check_risk.try_completion(0);
        this.check_side.try_completion(0);

        // Reset array of missings:
        this.missing_entries = [];
    }

    handle_back() {
        if (this.entry_ix > 0) {

            // When going back, reset the object to be filled again:
            this.check_risk.reset_entries();
            this.check_side.reset_entries();
            this.is_reload = true;  // set reload flag to true.

            // Decrementing the page:
            // TODO: Skip inputs that were previously skipped
            // Get previously seen input (or skip, if this.q_order[this.entry_ix] in skiplist?)
            // Note: Also must ensure that elements from the skiplist are removed when they are passed upon a back-button click!
            const calling_entry = this.q_order[this.entry_ix];

            // Decrement, while previous input has been skipped:
            do {
                this.entry_ix--;
            } while (this.skipped_inputs.includes(this.entry_ix))

            $("#" + this.q_order[this.entry_ix] + "-q").css('display', 'flex');
            $("#" + calling_entry + "-q").hide();
            $(".continue-btn").css('display', 'inline-block');

            if (this.entry_ix === 0) {
                $(".back-btn").hide();
            }

            // Removal of highlighting classes:
            $(".missing-input").removeClass("missing-input").removeClass("selected-blur");
        }
    }

}


// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Handle missing inputs.
 * @param ev Calling event
 * @param missing_entries Array of missing entries
 */
function handle_missing_input(ev, missing_entries) {

    const input_field = $("#" + missing_entries[0]);  // Get FIRST input field for reference (may be improved).

    console.log(input_field.parent("td"));
    console.log(input_field.parents("table"));

    // Take the input field as reference if one element or if inside of table take the table, to ensure non-overlap:
    const thispos = input_field.parent("td").length === 0 ? input_field.position() : input_field.parents("table").position();  // get position of current question.
    console.log(input_field);
    console.log(thispos);

    console.log("MISSING ENTRIES ARE:");
    console.log(missing_entries);
    // Only assign blur class to last missing item; for the rest assign decreasing z-indices (above the blurred item though):
    missing_entries.forEach((id, ix) => $("#" + id).addClass("missing-input").addClass(ix + 1 === missing_entries.length ? "selected-blur" : "").css("z-index", 9997 - ix));

    // Change the popup text here:
    const cur_popup = $("#noentry-popup");

    const popup_height = cur_popup.height();
    const popup_pad = cur_popup.innerHeight() - popup_height;
    const num_height = input_field.height();

    console.log(`Popup height (pad): ${popup_height} (${popup_pad}), Highlight height: ${num_height}, 
            Highlight pos (top, bottom) ${thispos.top}, ${thispos.left}`);

    cur_popup
        .css({
            top: thispos.top - popup_height - popup_pad * 2,
            left: thispos.left,
            position: 'absolute'
        })
        .show();

    // Prevent propagation:
    ev.stopPropagation();

    $(window).on("click", function (e) {

        $("#noentry-popup").hide().removeClass("selected-blur");
        missing_entries.forEach((id) => $("#" + id).removeClass("selected-blur"));
        $(window).unbind("click");
    })
}

/**
 * Function to continue page
 * @param ev Calling event
 * @param entry_ix Index of current entry
 * @param check_risk Object
 * @param is_skip Is the current iteration a skip?
 * @returns {(*|boolean)[]}
 */


/**
 *
 * @param e Calling event
 * @param info_arr ordered array with icon info
 * @param curid Current ID for replacement
 * @param col_arr Array of colors
 */
function zoom_canvas(e, info_arr, ncol, curid, col_arr) {
    // console.log(obj.attr("id"));
    $(".zoomed-canvas").hide();

    // const cur_type = obj.attr("id").replace("dotdisplay-", "");
    const n_dots = info_arr.reduce((d, i) => d + i);

    // $(this).clone().appendTo(".canvas-zoom");
    create_icon_array(
        info_arr,  // control group.
        curid,
        // obj.attr("id") + '-zoom',
        ncol,
        col_arr,
        (n_dots > 100 ? 25 : 40));

    // Determine plotting area:
    // Create an array of types:
    const block = [10, -1];  // current blocking constant!
    // Determine number of rows:
    let nrows = Math.ceil(n_dots / ncol);
    nrows = nrows + (block[0] > 0 ? Math.floor(nrows / block[0]) : 0);
    let ncols = ncol + (block[1] > 0 ? Math.floor(ncol / block[1]) : 0);

    const hw_arr = [window.innerHeight, window.innerWidth];

    const height_is_min = hw_arr[0] <= hw_arr[1];
    const minpx = hw_arr[(height_is_min ? 0 : 1)] - 10;

    // Use the minimal dimension to determine the ratio!
    let zoom_hi = height_is_min ? minpx : minpx * nrows / ncols;
    let zoom_wd = height_is_min ? minpx * ncols / nrows : minpx;

    console.log(`height is min: ${height_is_min}, hi, wd: ${zoom_hi}, ${zoom_wd}, nrows/ncols: ${nrows}, ${ncols},
    window hi/wd: ${hw_arr.toString()}`);

    $(".canvas-zoom")
        .height(zoom_hi)
        .width(zoom_wd)
        .css("display", "flex");
    $("#" + curid).show();

    // Allow clicking anywhere to close:
    e.stopPropagation();  // stop event propagation to avoid immediate hiding on click.
    $(window).on("click", function () {
        $(".canvas-zoom").hide();
        $(".zoomed-canvas").hide();
        // $(this).unbind("click");
    });
}

// ~~~~~~~~~~~~~~~~ DICTIONARIES ~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Ordered array of question (subpage) IDs which can be reordered fo reach type.
 * @type {string[]}
 */
const q_order = [
    "start",
    "select-outcome",
    "rel-risk-reduction",
    // "any-control",
    "n-treat-control",
    "n-total",
    "p-treat", "p-case",
    "n-case",
    // "or-case",
    // "side",
    "p-side",
    "n-side",
    "results"
];
// ORDER WILL BE FLEXIBLE!

/**
 * Ordered array of question (subpage) IDs which can be reordered fo reach type.
 * @type {string[]}
 */
const q_order_test = [
    "start",
    // "n-treat-control",
    // "n-total",
    "prev",  // prevalence.
    "p-sens-spec",  // sens & spec.
    "n-case",
    "results"
];


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
    "p-case-impf": "mtx1",
    // careful! Vaccinated are now column 2 (index 1)!
    // cases are second row (index 1)
    "p-case-control": "mtx0",  // cases among untreated (cases: 1, treatment: 0)
    "n-case-impf": "n11",
    // careful! Vaccinated are now column 2 (index 1)!
    // cases are second row (index 1)
    "n-case-control": "n10",  // cases among untreated (cases: 1, treatment: 0)
    "n-side-impf": "n11s",
    "n-side-control": "n10s",
    "p-side-impf": "mtx1s",
    "p-side-control": "mtx0s",
    // ~~~ TESTS ~~~
    "prev": "mpx1",
    "p-sens": "mt11",
    // careful! Vaccinated are now column 2 (index 1)!
    // cases are second row (index 1)
    "p-spec": "mt00",  // cases among untreated (cases: 1, treatment: 0)
}

const eff_keys = ["N_tot",
    "n00", "n01", "n10", "n11",
    "msumx0", "msumx1",
    "msum0x", "msum1x",
    "rrr",
    "p00", "p01", "p10", "p11",
    "mpx0", "mpx1",
    "mtx0", "mtx1",
    // Tests and screening:
    "mt00", "mt11"
]

const side_keys = ["N_tot",
    "n00s", "n01s", "n10s", "n11s",
    "msumx0", "msumx1",
    "msum0xs", "msum1xs",
    "rrrs",
    "p00s", "p01s", "p10s", "p11s",
    "mpx0s", "mpx1s",
    "mtx0s", "mtx1s"
]


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
    "msum0x": ["ntab", "msums1", 0],
    "msum1x": ["ntab", "msums1", 1],
    "msumx0": ["ntab", "msums2", 0],
    "msumx1": ["ntab", "msums2", 1],
    "p00": ["ptab", "tab", "tab2x2", 0, 0],
    "p01": ["ptab", "tab", "tab2x2", 0, 1],
    "p10": ["ptab", "tab", "tab2x2", 1, 0],
    "p11": ["ptab", "tab", "tab2x2", 1, 1],
    "mpx0": [],
    "mpx1": ["ptab", "msums2", 1],
    "mtx0": ["mtab2", "tab", "tab2x2", 0, 1],
    "mtx1": ["mtab2", "tab", "tab2x2", 1, 1],
    // Side-effect info:
    "n10s": ["ntab", "tab", "tab2x2", 1, 0],
    "n11s": ["ntab", "tab", "tab2x2", 1, 1],
    "mtx0s": ["mtab2", "tab", "tab2x2", 0, 1],
    "mtx1s": ["mtab2", "tab", "tab2x2", 1, 1],
    // Screening:
    "mt00": ["mtab2", "tab", "tab2x2", 0, 0],
    "mt11": ["mtab2", "tab", "tab2x2", 1, 1],
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
    "n00s", "n01s", "n10s", "n11s",
    "msum00", "msum01",
    "msum10", "msum11"];
const float_keys = ["rrr",
    "p00", "p01", "p10", "p11",
    "mpx0",
    "mtx0", "mtx1",
    "mtx0s", "mtx1s"]
const perc_keys = ["rrr", "mpx1",
    "mtx0", "mtx1",
    "mtx0s", "mtx1s",
    "p00", "p01", "p10", "p11",
    "mt00", "mt11"
]


// FUNCTIONS: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Evaluate checklist entry.
 */
function evaluate_entry(curval, cur_q_key) {
    // TODO: Check format!
    let checked_val;
    let cur_error = "noerr";

    // replace period with nothing:
    checked_val = curval.replace(/\./, "");
    // Replace comma with period:
    checked_val = checked_val.replace(/,/, ".");

    console.log("++++ CHECKING INPUT ++++");

    // Test, if it is a number and convert if true:
    const is_num = !isNaN(parseFloat(checked_val));
    if (is_num) {
        // Note: Ignores additional text!
        checked_val = parseFloat(checked_val);
    }

    console.log(is_num);
    console.log(curval);

    if (int_keys.includes(cur_q_key)) {
        // Check integer entries:
        if (!is_num) {
            // alert("KEINE ZAHL!");
            cur_error = "err_nonum";
        } else if (!Number.isInteger(checked_val)) {
            // alert("KEINE GANZE ZAHL!");
            cur_error = "err_noint";
        }
    } else if (float_keys.includes(cur_q_key) || perc_keys.includes(cur_q_key)) {

        // Check float entries:
        if (!is_num) {
            // alert("KEINE ZAHL!");
            cur_error = "err_nonum";
        }

    } else {
        // All other keys (string, boolean etc.)
    }

    if (cur_error === "noerr") {
        // Update percentages:
        if (perc_keys.includes(cur_q_key)) {

            // Check the percentage
            if (checked_val < 1) {
                // alert("Prozentzahl kleiner 0; Absicht?");
            }

            checked_val = checked_val / 100;  // percentage to floating point number.

            // For relative risk reduction revert:
            if (cur_q_key === "rrr") {
                checked_val = 1 - checked_val;  // maybe code transformation in dictionary object?
            }
        }  // eof. percentage handling.
    } else {

        checked_val = cur_error;

    }


    return checked_val;
}

/**
 * Function to create an icon array.
 * @param arr_n An array of icon types
 * @param id ID of the HTML element
 * @param ncol Number of columns in icon array
 * @param col_arr Array of colors for each icon type
 * @param exf Expansion factor for the canvas area (makes icons appear smaller).
 */
function create_icon_array(arr_n, id, ncol, col_arr, exf) {

    // Check for non-integer inputs:
    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input/469362#469362

    const block = [10, -1];

    if (exf === undefined) {
        exf = 40;
    }

    // Create an ordered array:
    try {
        // Check for integers (numbers( using "try" for now.
        // Update in time!
        // TODO: Proper input checking!
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

        let nrows = Math.ceil(n_dots / ncols);
        nrows = nrows + (block[0] > 0 ? Math.floor(nrows / block[0]) : 0);

        ncols = ncols + (block[1] > 0 ? Math.floor(ncols / block[1]) : 0);


        console.log(n_dots + " dots, " + nrows + " rows and " + ncols + " columns");

        // Create a vector of dot types:
        const type_vec = arr_n.map((x, i) => Array(x).fill(i + 1)).flat();
        console.log("Type vec:");
        console.log(type_vec);

        // Determine fontsize:
        const fsize = "40px";
        const maxdim = Math.max(ncols, nrows);
        const wh = maxdim * exf;  // controls the area, the larger the smaller the icons appear.
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
            var h = c.height = wh / (ncols / nrows);  // window.innerHeight;
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

                    if (irow % (block[0] + 1) === 0 && block[0] > 0) {
                        irow++;
                    }
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
                if (icol % block[1] === 0 && block[1] > 0) {
                    icol++;
                }


            }

// draw all balls each frame
            function draw() {
                ctx.clearRect(0, 0, w, h);
                let j, dot;
                // console.log("The ball object:");
                // console.log(balls);
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
        // alert("Bitte geben Sie eine ganze Zahl ein!");
        console.log(err);
        throw "Error! Calculation not possible!";
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
