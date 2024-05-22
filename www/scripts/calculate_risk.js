$(document).ready(function () {


    console.log("App started");

    // Likely we want to have an OOP table representation, where we can calculate margin sums of interest etc.!
    let testtab = new Table2x2([[2800, 200], [2950, 50]]);
    // console.log(testtab);
    // // console.log("Sum margin 1: ");
    // // console.log(testtab.margin1_sum());
    // console.log("Mean margin 1: ");
    // console.log(testtab.margin1_mean());
    // console.log("Sum margin 2: " + testtab.margin2_sum());

    // Now test a table with missings (create through update function):
    // Note: missings should be handled as NaN, to be ignored in calculations!
    testtab.update([[2850, 150], [NaN, 50]]);
    // console.log(testtab);
    // console.log("Sum margin 1: ");
    // console.log(testtab.margin1_sum());
    // console.log("Mean margin 1: ");
    // console.log(testtab.margin1_mean());

    // New usecase:

    // Eventual example:
    // Basic tables:
    const ntab = new Basetable([[NaN, NaN], [NaN, 141]], [NaN, NaN], [NaN, NaN], 32449);
    const ptab = new Basetable(na_tab, [NaN, 0.67], [NaN, NaN], 1);
    const mtab1 = new Margintable(na_tab, [NaN, 1 - 0.79], [NaN, NaN]);
    const mtab2 = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);

    const testcase = new RiskCollection(ntab, ptab, mtab1, mtab2);

    // Simple example:
    const ntab2 = new Basetable([[10708, NaN], [NaN, 141]], [NaN, NaN], [11040, NaN], 32449);
    const ptab2 = new Basetable(na_tab, [NaN, 0.67], [NaN, NaN], 1);
    // console.log(ntab2);
    // console.log(ntab2.complete_margins());
    // console.log(ntab2.complete_table());
    // // ntab2.complete_table();
    // console.log(ntab2);

    // console.log(ptab2);
    // console.log(ptab2.tab.count_missings());

    const simple_risk = new RiskCollection(ntab2, ptab2, mtab1, mtab2);
    simple_risk.ptab.complete_margins();
    simple_risk.n_from_p();
    // console.log(simple_risk);

    // How far are we with out testcase?
    console.log("Main testcase");
    // testcase.ptab.complete_margins();
    // testcase.n_from_p();
    // testcase.ntab.complete_table();
    testcase.try_completion();
    testcase.try_completion();
    console.log(testcase);
    console.log(testcase.ntab.tab.tab2x2);


})


/*
Possible flow:
1. Fill the provided information into tables (in the HTML maybe make content-cases toggelable.
2. Complete the provided cases in a risk array
criterion: ntab is complete
3. Extract requested information based on underlying rules for each content case.
*/

/*
ELements are (annotations for vaccination/treatment case):
ntab, absolute ptab (less interesting),
ptab_m1 (sublist-level, risks in each group, lower row follows RR),
ptab_m2 (rows, transposed sublist-level, proportion vaccinated and unvaccinated among healthy and sick -- also sometimes provided!),
N (total cases),
ntab_m1 (margin table "columns", number in each group), ntab_m2 (margin table "rows", numer of healthy and infected)
*/

const na_tab = [[NaN, NaN], [NaN, NaN]]  // define NA-table.

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}


// Collection of tables:
class RiskCollection {
    constructor(ntab, ptab, mtab1, mtab2) {
        this.ntab = ntab;
        this.ptab = ptab;
        this.mtab1 = mtab1;
        this.mtab2 = mtab2;
    }

    // Method to combine information in ntab and ptab:
    n_from_p() {
        console.log("n from p");
        let refsums = Object.assign([], this.ntab.msums1);
        this.ntab.msums1 = this.ptab.msums1.map(val => Math.round(val * this.ntab.N));

        console.log(refsums);
        console.log(this.ntab.msums1);
        console.log(arrayEquals(refsums, this.ntab.msums1));

        return !arrayEquals(refsums, this.ntab.msums1);
    }


    // Method to try and complete the set:
    try_completion() {
        // Clone reference tables to compare:
        // https://www.freecodecamp.org/news/clone-an-object-in-javascript/  on cloning...
        let reftab_n = Object.assign([], this.ntab.tab.tab2x2);
        let reftab_p = {...this.ptab.tab.tab2x2};

        let nchange = 0;

        nchange += this.ntab.get_N();
        nchange += this.ptab.complete_margins();  // calculate margin sums.
        nchange += this.n_from_p();  // get numbers from probabilities.
        nchange += this.ntab.complete_table();  // try to complete the table.

        console.log("n changes: " + nchange);

        console.log("Reftabs:");
        console.log(reftab_n);
        console.log(this.ntab.tab.tab2x2);
        console.log(arrayEquals(reftab_n.flat(), this.ntab.tab.tab2x2.flat()));
        console.log(reftab_p);
        // Recursively retry, when there was a change:
        // if(reftab_n !== this.ntab.tab.tab2x2 || reftab_p !== this.ptab.tab.tab2x2){
        //     this.try_completion();
        // } else {
        //     alert("Done changing stuff!");
        // }
    }

    // Update by array index:
    update_by_arr(arr, val) {

        const expr = "this" + get_expression(arr) + ` = ${val}`;  // add target value.
        console.log(expr);

        try {
            eval(expr);
        } catch (e) {
            console.error(`Assignment of ${expr} failed`);
        }

    }

    get_by_arr(arr) {
        const expr = "this" + get_expression(arr);
        console.log("Get expression " + expr);
        return eval(expr);
    }
}

function get_expression(arr) {
    // Create a string expression:
    let expr = "";

    for (const curkey of arr) {
        // Ensure that ALL keys are quoted (seems to work for arrays, too!)
        let strkey = String(curkey);
        strkey = (!["\"", "\'"].includes(strkey[0]) ? "\"" : "") +
            strkey +
            (!["\"", "\'"].includes(strkey[strkey.length]) ? "\"" : "");
        expr += `[${strkey}]`
    }

    return expr;
}


// Table types (basic table is Table2x2):
class Basetable {
    // A basic table with margin sums:
    constructor(nested_list, msums1, msums2, N) {
        this.tab = new Table2x2(nested_list);
        this.msums1 = msums1;  // this.tab.margin1_sum();
        this.msums2 = msums2;  // this.tab.margin2_sum();
        // TODO: Eventually compare them with provided info?
        this.N = N;

        this.get_N();
    }

    // Function to get total number N:
    get_N() {
        let N_tab = this.tab.sum_table();
        // console.log("Getting N");
        // console.log(N_tab);

        // If not caclulable get from margins:
        if(isNaN(N_tab)){

            N_tab = compare_vals(this.msums1.flat().reduce((d, i) => d + i),
                this.msums2.flat().reduce((d, i) => d + i));
        }

        this.N = compare_vals(this.N, N_tab);
    }

    // Function to complete margins:
    complete_margins() {
        // TODO: Don't do this if all values are NA!

        const nonmissings_m1 = this.msums1.reduce((d, i) => d + !isNaN(i), 0);
        const nonmissings_m2 = this.msums2.reduce((d, i) => d + !isNaN(i), 0);
        let repval = -99;

        if (nonmissings_m1 > 0) {
            repval = this.N - this.msums1.reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
            this.msums1 = this.msums1.map(val => isNaN(val) ? repval : val);
        }


        // Transposed variant:
        if (nonmissings_m2 > 0) {
            repval = this.N - this.msums2.reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
            this.msums2 = this.msums2.map(val => isNaN(val) ? repval : val);
        }

        // Return whether change was made:
        return repval !== -99;

    }


    // Function to complete the table based on the available information *within* the table:
    complete_table() {
        const nmiss = this.tab.count_missings();
        let curtab = this.tab.tab2x2;
        let repval = NaN;

        let reftab = Object.assign([], this.tab.tab2x2);  // {...curtab};
        console.log("Complete the table from within");
        // console.log(transpose(transpose(curtab)));  // tweak the printout!

        // Check if can be completed with N:
        if (nmiss === 1) {
            // Define the replacement value:
            repval = this.N - this.tab.sum_table(true);

            // Replace the NaN value:
            for (let i = 0; i < 2; i++) {
                curtab[i] = curtab[i].map(val => isNaN(val) ? repval : val);
            }
        } else {
            // Check if can be completed based on margin sums:
            for (let i = 0; i < 2; i++) {
                // If only one is missing:
                let nmiss_col = curtab[i].reduce((d, i) => d + isNaN(i), 0);
                if (nmiss_col === 1) {
                    let repval = this.msums1[i] - curtab[i].reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
                    // console.log(this.msums1[i] - curtab[i].reduce((d, i) => d + (isNaN(i) ? 0 : i), 0));
                    curtab[i] = curtab[i].map(val => isNaN(val) ? repval : val);
                }

            }

            // For margin 2 transpose and re-transpose:
            curtab = transpose(this.tab.tab2x2);
            for (let i = 0; i < 2; i++) {
                let nmiss_col = curtab[i].reduce((d, i) => d + isNaN(i), 0);
                if (nmiss_col === 1) {
                    let repval = this.msums2[i] - curtab[i].reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
                    // console.log(this.msums2[i] - curtab[i].reduce((d, i) => d + (isNaN(i) ? 0 : i), 0));
                    curtab[i] = curtab[i].map(val => isNaN(val) ? repval : val);
                }

            }
            this.tab.tab2x2 = transpose(curtab);  // re-assign the result.
        }

        // Log whether a change was made (may need updating in the future):
        return !isNaN(repval);


    }
}


class Margintable {
    // A marginal table with known relations:
    constructor(nested_list, rel1, rel2) {
        this.tab = new Table2x2(nested_list);
        this.rel1 = rel1;
        this.rel2 = rel2;
    }
}


// Class to contruct 2x2 Tables, with functions to calculate the margins:
class Table2x2 {
    constructor(nested_list) {
        this.tab2x2 = nested_list;  // pass the class a nested list to operate on.
    }

    // Function to update the table:
    // Eventually this should go automatically!
    update(nested_list) {
        this.tab2x2 = nested_list;
    }

    // Function to count missings:
    count_missings() {
        return this.tab2x2.flat().reduce((d, i) => d + isNaN(i), 0);
    }

    // Implement functions to check for missings and complete them!
    // Potentially use a new (super?) class that contains the tables plus additional information?
    // could be a class RiskArray, containing 2 tables, an N (supplied or calculated), and relations (e.g., RRR).

    // Calculate sums:
    sum_table(ignore_na = false) {
        if (ignore_na) {
            return this.tab2x2.flat().reduce((d, i) => d + (isNaN(i) ? 0 : i), 0)
        } else {
            return this.tab2x2.flat().reduce((d, i) => d + i);
        }

    }

    // Calculate margin sums and means:
    margin1_sum() {
        return sumNestedLists(this.tab2x2);
    }

    margin1_mean() {
        return meanNestedLists(this.tab2x2);
    }

    margin2_sum() {
        let t_tab = transpose(this.tab2x2);
        return sumNestedLists(t_tab);
    }

    margin2_mean() {
        let t_tab = transpose(this.tab2x2);
        return meanNestedLists(t_tab);
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FUNCTION DEFINITIONS: ---------------------------------------
// Function for summing up:
function sumNestedLists(list) {
    return list.map(subList => {
        let sum = 0;
        for (let i = 0; i < subList.length; i++) {
            sum += subList[i];
        }
        return sum;
    });
}

// Calculate the means:
function meanNestedLists(list) {
    return list.map(subList => {
        let sum = subList.reduce((a, b) => a + b, 0); // "0" is the starting value of the sum.
        return subList.map(num => num / sum);
    });
}

// Transpose a matrix:
function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}


// Function to compare two values and take the one that is not missing (if any):
function compare_vals(val1, val2) {
    if (!isNaN(val1) && !isNaN(val2)) {
        if (val1 !== val2) {
            console.error("Provided values do not match. Please check!");
            // no_N = true;
            // TODO: Proper error handling!
            val1 = NaN;  // set val1 NaN to return NaN.
        }
    } else if (isNaN(val1)) {
        // If N is NAN use calculated N (results in NaN if it cannot be provided!):
        val1 = val2;
    }

    // If they are equal or only one was provided:
    return (val1);
}


// TESTING ONLY:
const ntabb = new Basetable(na_tab,  // condition.
    [NaN, NaN],
    [NaN, NaN],
    NaN);
const ptabb = new Basetable(
    na_tab,
    [NaN, NaN], [NaN, NaN], 1);
// NOTE: Make sure to appropriately distinguish relative risk increase and reduction!
const mtab1b = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);
const mtab2b = new Margintable(na_tab, [NaN, NaN], [NaN, NaN]);
const check_risk2 = new RiskCollection(ntabb, ptabb, mtab1b, mtab2b);