
/* NOTES
* On Odds Ratios in case control studies: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7850067/
* * Case-control studies sample based on outcome status: https://en.wikipedia.org/wiki/Case%E2%80%93control_study
 */
$(document).ready(function () {


    console.log("App started");

    // // Likely we want to have an OOP table representation, where we can calculate margin sums of interest etc.!
    // let testtab = new Table2x2([[2800, 200], [2950, 50]]);
    // // console.log(testtab);
    // // // console.log("Sum margin 1: ");
    // // // console.log(testtab.margin1_sum());
    // // console.log("Mean margin 1: ");
    // // console.log(testtab.margin1_mean());
    // // console.log("Sum margin 2: " + testtab.margin2_sum());
    //
    // // Now test a table with missings (create through update function):
    // // Note: missings should be handled as NaN, to be ignored in calculations!
    // testtab.update([[2850, 150], [NaN, 50]]);
    // // console.log(testtab);
    // // console.log("Sum margin 1: ");
    // // console.log(testtab.margin1_sum());
    // // console.log("Mean margin 1: ");
    // // console.log(testtab.margin1_mean());
    //
    // // New usecase:
    //
    // // Eventual example:
    // // Basic tables:
    // const ntab2 = new Basetable(
    //     [
    //         [NaN, NaN],  // non-cases among control and treatment.
    //         [NaN, 141]], // cases among control and treatment.
    //     [NaN, NaN], [NaN, NaN], 32449);
    // const ptab2 = new Basetable(na_tab,
    //     [NaN, NaN], [NaN, 0.67], 1);
    // const mtab12 = new Margintable(na_tab,
    //     [NaN, NaN], [NaN, NaN]);
    // const mtab22 = new Margintable(na_tab,
    //     [NaN, NaN],  // relative risk (NOT reduction) between dim0 1/0
    //     [NaN, 1 - 0.79]  // the array position indicates the direction.
    //     // relative risk (NOT REDUCTION) between dim1 1/0 (typically treatment/control)
    // );
    //
    // const testcase = new RiskCollection(ntab2, ptab2, mtab12, mtab22);
    //
    // // Simple example:
    // const ntab3 = new Basetable([[10708, NaN], [NaN, 141]], [NaN, NaN], [11040, NaN], 32449);
    // const ptab3 = new Basetable(na_tab, [NaN, 0.67], [NaN, NaN], 1);
    // // console.log(ntab2);
    // // console.log(ntab2.complete_margins());
    // // console.log(ntab2.complete_table());
    // // // ntab2.complete_table();
    // // console.log(ntab2);
    //
    // // console.log(ptab2);
    // // console.log(ptab2.tab.count_missings());
    //
    // const simple_risk = new RiskCollection(ntab3, ptab3, mtab12, mtab22);
    // simple_risk.ptab.complete_margins();
    // simple_risk.n_from_p();
    // // console.log(simple_risk);
    //
    // // How far are we with out testcase?
    // // console.log("+++ Main testcase +++");
    // // console.log(JSON.stringify(testcase));
    // // testcase.ptab.complete_margins();
    // // testcase.n_from_p();
    // // testcase.ntab.complete_table();
    // testcase.try_completion(0);
    // // testcase.try_completion();
    // // console.log(testcase);
    // // console.log(testcase.ntab.tab.tab2x2);
    //
    // // console.log("+++ eof. Main testcase +++");


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

        // console.log(arguments);

        if (arguments.length === 0) {
            this.reset_entries()
        } else {
            console.log("Show inputs");
            console.log(ntab);
            console.log(ptab);
            console.log(mtab1);
            console.log(mtab2);

            this.ntab = ntab;
            this.ptab = ptab;
            this.mtab1 = mtab1;
            this.mtab2 = mtab2;
        }


    }

    // Method to combine information in ntab and ptab:
    n_from_p() {
        // console.log("n from p");
        const nsums1 = this.ntab.msums1;
        const psums1 = this.ptab.msums1;
        const nsums2 = this.ntab.msums2;
        const psums2 = this.ptab.msums2;
        const Ntot = this.ntab.N;

        // console.log("Input n from p:");
        // this.print();

        this.ntab.msums1 = nsums1
            .map((val, ix) => compare_vals(Math.round(psums1[ix] * Ntot), val, 1));
        this.ntab.msums2 = nsums2
            .map((val, ix) => compare_vals(Math.round(psums2[ix] * Ntot), val, 1));

        // console.log("Output n from p:");
        // console.log(JSON.stringify(this.ntab.msums1));
        // console.log(JSON.stringify(this.ntab.msums2));
        this.print();

        // Second approach:
        this.ntab.msums1 = nsums1
            .map((val, ix) => compare_vals(Math.round(nsums1[1 - ix] * psums1[ix] / psums1[1 - ix]), val, 1));
        this.ntab.msums2 = nsums2
            .map((val, ix) => compare_vals(Math.round(nsums2[1 - ix] * psums2[ix] / psums2[1 - ix]), val, 1));

        // Full table from probabilities:
        this.ntab.tab.tab2x2 = this.ptab.tab.tab2x2
            .map((vx, ix) => vx
                .map((vy, iy) => compare_vals(Math.round(vy * Ntot), this.ntab.tab.tab2x2[ix][iy], 1)));

    }

    p_from_n() {
        // console.log("p from n");
        //
        // console.log("p margins from n margins:");
        // console.log(this.ptab);
        // console.log(JSON.stringify(this.ptab));
        const cur_ntab = this.ntab;

        // Margin sums:
        this.ptab.msums1 = this.ptab.msums1
            .map((val, ix) => isNaN(val) ? cur_ntab.msums1[ix] / cur_ntab.N : val);
        this.ptab.msums2 = this.ptab.msums2
            .map((val, ix) => isNaN(val) ? cur_ntab.msums2[ix] / cur_ntab.N : val);

        // console.log(JSON.stringify(this.ptab));

        // Complete the inner p-table:
        this.ptab.tab.tab2x2 = this.ptab.tab.tab2x2
            .map((vx, ix) => vx
                .map((vy, iy) => compare_vals(vy, cur_ntab.tab.tab2x2[ix][iy] / cur_ntab.N, 0.005)));
    }

    // Method to get the margin from p-table margins:


    // Method to try and complete the set:
    try_completion(nchange) {
        // Clone reference tables to compare:
        // https://www.freecodecamp.org/news/clone-an-object-in-javascript/  on cloning...

        // Stringify all objects before trying to complete them
        // This allows to test strings against each other!
        const reftab_n = JSON.stringify(this.ntab);
        const reftab_p = JSON.stringify(this.ptab);  // was: {...this.ptab.tab.tab2x2};
        const reftab_m1 = JSON.stringify(this.mtab1);
        const reftab_m2 = JSON.stringify(this.mtab2);

        console.log("~~~ ATTEMPT TO COMPLETE THE TABLE ~~~");
        this.print();

        // Try the different completion functions:
        // console.log("Get N");
        this.ntab.get_N();
        // this.print();

        // console.log("Complete the margins");
        this.ntab.complete_margins();
        this.ptab.complete_margins();  // calculate margin sums.
        // this.print();

        // console.log("Get n from p and vice versa");
        this.n_from_p();  // get numbers from probabilities.
        this.p_from_n();  // get probabilities from numbers.
        // this.print();

        // console.log("use the margin tables");
        this.get_margintabs();  // Try to complete the margin tables.
        // this.print();
        this.get_tab_from_margins("ntab"); // Get elements from margin tables.
        // TODO: make method to get anything from margins?
        // Here an issue occurs!
        // this.print();


        this.ntab.complete_table();  // try to complete the table.
        this.ptab.complete_table();
        // this.print();

        // console.log("n changes: " + nchange);
        //
        // // Show contents of logical statement:
        // console.log(reftab_n); console.log(JSON.stringify(this.ntab));
        // console.log(reftab_p); console.log(JSON.stringify(this.ptab));
        // console.log(reftab_m1); console.log(JSON.stringify(this.mtab1));
        // console.log(reftab_m2); console.log(JSON.stringify(this.mtab2));


        // Recursively retry, when there was a change:
        if (reftab_n !== JSON.stringify(this.ntab) ||
            reftab_p !== JSON.stringify(this.ptab) ||
            reftab_m1 !== JSON.stringify(this.mtab1) ||
            reftab_m2 !== JSON.stringify(this.mtab2) &&
            nchange < 100) {

            // Retry completion:
            this.try_completion(nchange + 1);
        } else {
            console.log(`Done changing stuff after ${nchange} iterations!`);
            // alert(`Done changing stuff after ${nchange} iterations!`);
        }
    }

    // Get margin table:
    get_margintabs() {

        // console.log("Calculate margin tables");
        // Decide whether to get from ntab or ptab!

        // Ensure that margins are completed beforehand!
        this.ntab.complete_margins();

        // console.log("Input margin tables");
        // console.log(JSON.stringify(this.mtab1));
        // console.log(JSON.stringify(this.mtab2));

        // Get the margin tables:
        this.mtab1.tab.tab2x2 = this.ntab.tab.tab2x2
            .map((x, ix) => x
                .map((y, iy) => compare_vals(this.mtab1.tab.tab2x2[ix][iy], y / this.ntab.msums1[ix], 0.005)));
        this.mtab2.tab.tab2x2 = transpose(this.ntab.tab.tab2x2)
            .map((x, ix) => x
                .map((y, iy) => compare_vals(this.mtab2.tab.tab2x2[ix][iy], y / this.ntab.msums2[ix], 0.005)));

        // console.log("Intermediate margin tables");
        // console.log(JSON.stringify(this.mtab1));
        // console.log(JSON.stringify(this.mtab2));

        // Try to complete the margin tables:
        this.mtab1.get_from_rel();
        this.mtab2.get_from_rel();

        // console.log("Output margin tables");
        // console.log(JSON.stringify(this.mtab1));
        // console.log(JSON.stringify(this.mtab2));

    }

    // Get n from margin tables:
    get_tab_from_margins(tabtype) {
        // console.log("+++ Calculate from margins: +++");
        // this.print();

        // Exemplary for mtab2:
        const curmsums = this[tabtype].msums2;
        // can be done analogously for msums 2!
        // console.log(curmsums);

        // console.log(transpose(this.mtab2.tab));

        const tab_from_margins = transpose(this.mtab2.tab.tab2x2
            .map((x, ix) => x
                .map(y => Math.round(y * curmsums[ix]))));

        // console.log("Table from margins:");
        // console.log(JSON.stringify(tab_from_margins));
        // Note: Must be transposed for margins 2.

        this[tabtype].tab.tab2x2 = this[tabtype].tab.tab2x2
            .map((x, ix) => x
                .map((z, iz) => isNaN(z) ? tab_from_margins[ix][iz] : z));


        // ++++ HERE NOW +++
    }

    // Update by array index:
    update_by_arr(arr, val) {

        console.log(arr);
        console.log(JSON.stringify(this));

        if (arr !== undefined) {
            const expr = "this" + get_expression(arr) + ` = ${val}`;  // add target value.
            console.log(expr);

            try {
                eval(expr);
                console.log(JSON.stringify(this));
            } catch (e) {
                console.error(`Assignment of ${expr} failed`);
            }
        }

    }

    get_by_arr(arr) {
        const expr = "this" + get_expression(arr);
        // console.log("Get expression " + expr);
        return eval(expr);
    }

    reset_entries() {

        this.ntab = new Basetable([[NaN, NaN], [NaN, NaN]],  // condition.
            [NaN, NaN],
            [NaN, NaN],
            NaN);
        this.ptab = new Basetable(
            [[NaN, NaN], [NaN, NaN]],
            [NaN, NaN], [NaN, NaN], 1);

        this.mtab1 = new Margintable([[NaN, NaN], [NaN, NaN]],  // condition.
            [NaN, NaN],
            [NaN, NaN]);

        this.mtab2 = new Margintable([[NaN, NaN], [NaN, NaN]],  // condition.
            [NaN, NaN],
            [NaN, NaN]);
        console.log("Cleared all");
        console.log(this);
    }

    print() {
        console.log("ntab: " + this.ntab.print() + "\nptab: " + this.ptab.print() +
            "\nmtab1: " + JSON.stringify(this.mtab1) + "\nmtab2: " + JSON.stringify(this.mtab2));
    }
}

function get_expression(arr) {

    // Skip, if no aray was provided:
    let expr = "";
    // Create a string expression:


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

        //
        this.msums1 = msums1;  // this.tab.margin1_sum();
        this.msums2 = msums2;  // this.tab.margin2_sum();
        // TODO: Eventually compare them with provided info?
        this.N = N;

        // Call initial functions:
        this.get_N();
    }

    // Function to get total number N:
    get_N() {
        let N_tab = this.tab.sum_table();
        // console.log("Getting N");
        // console.log(N_tab);

        // If not calculable get from margins:
        if (isNaN(N_tab)) {

            N_tab = compare_vals(this.msums1.flat().reduce((d, i) => d + i),
                this.msums2.flat().reduce((d, i) => d + i),
                1);
            // console.log("Table from margins");
            // console.log(N_tab);
        }

        this.N = compare_vals(this.N, N_tab, 1);

        return isNaN(this.N);
    }

    // Function to complete margins:
    complete_margins() {
        // TODO: Don't do this if all values are NA!

        // console.log(`Complete margins in`);
        // console.log(JSON.stringify(this));

        const nonmissings_m1 = this.msums1.reduce((d, i) => d + !isNaN(i), 0);
        const nonmissings_m2 = this.msums2.reduce((d, i) => d + !isNaN(i), 0);
        let repval = -99;  // initialize replacement value.

        if (nonmissings_m1 > 0) {
            repval = this.N - this.msums1.reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
            this.msums1 = this.msums1.map(val => isNaN(val) ? repval : val);
        }


        // Transposed variant:
        if (nonmissings_m2 > 0) {
            repval = this.N - this.msums2.reduce((d, i) => d + (isNaN(i) ? 0 : i), 0);
            this.msums2 = this.msums2.map(val => isNaN(val) ? repval : val);
        }

        // console.log(`Tried to complete margins in`);
        // console.log(JSON.stringify(this));


    }


    // Function to complete the table based on the available information *within* the table:
    complete_table() {
        const nmiss = this.tab.count_missings();
        let curtab = this.tab.tab2x2;
        let repval = NaN;

        let reftab = Object.assign([], this.tab.tab2x2);  // {...curtab};
        // console.log("Complete the table from within");
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

    // Printing:
    print() {
        // Desired:
        //         ntab: {
        //          "tab":{"tab2x2":
        //              [[null,null],
        //              [null,null]]},
        //          "msums1":[null,null],
        //          "msums2":[null,null],
        //          "N":null
        //         }
        // Raw:
        // ptab: {"tab":{"tab2x2":[[null,null],[null,null]]},"msums1":[null,null],"msums2":[null,null],"N":1}
        // mtab1: {"tab":[[null,null],[null,null]],"rel1":[null,null],"rel2":[null,null]}
        // mtab2: {"tab":[[null,null],[null,null]],"rel1":[null,null],"rel2":[3.0303030303030307,0.32999999999999996]}

        // return JSON.stringify(this);
        return JSON.stringify(this)
            .replace("{", "{\n")
            .replace("},", "},\n")
            .replace("],", "],\n  ")
            .replace(":[[", ":\n  [[")
            .replace("]]", "]]\n");
    }
}


class Margintable {
    // A marginal table with known relations:
    constructor(nested_list, rel1, rel2) {
        this.tab = new Table2x2(nested_list);
        this.rel1 = rel1;
        this.rel2 = rel2;
    }

    // Complete margins to sum up to 1:

    // Get entries from relative:
    get_from_rel() {

        // Potentially make more concise?
        // Add other dimensions?
        console.log("Margintable before:");
        console.log(JSON.stringify(this));

        // Margins should be designed so that the arrays add up to 1.

        // Complete the relations:
        this.rel2[0] = isNaN(this.rel2[0]) ? 1 / this.rel2[1] : this.rel2[0];
        this.rel2[1] = isNaN(this.rel2[1]) ? 1 / this.rel2[0] : this.rel2[1];

        const curtab = this.tab.tab2x2;


        // Note: Currently ONLY for dim1 in margin table!
        curtab[1][1] = compare_vals(curtab[1][1], curtab[0][1] / this.rel2[0], 0.005);
        // Was: isNaN(this.tab[1][1]) ? this.tab[0][1] / this.rel2[0] : this.tab[1][1];
        curtab[0][1] = compare_vals(curtab[0][1], curtab[1][1] / this.rel2[1], 0.005);
        // isNaN(this.tab[0][1]) ? this.tab[1][1] / this.rel2[1] : this.tab[0][1];


        // Try completing missing fields (adding up t 1 within array[0] and array[1]:
        curtab[0][0] = compare_vals(1 - curtab[0][1], curtab[0][0], 0.005);
        // isNaN(this.tab[0][0]) ? 1 - this.tab[0][1] : this.tab[0][0];
        curtab[0][1] = compare_vals(1 - curtab[0][0], curtab[0][1], 0.005);
        // isNaN(this.tab[0][1]) ? 1 - this.tab[0][0] : this.tab[0][1];
        curtab[1][0] = compare_vals(1 - curtab[1][1], curtab[1][0], 0.005);
        // isNaN(this.tab[1][0]) ? 1 - this.tab[1][1] : this.tab[1][0];
        curtab[1][1] = compare_vals(1 - curtab[1][0], curtab[1][1], 0.005);
        // isNaN(this.tab[1][1]) ? 1 - this.tab[1][0] : this.tab[1][1];


        console.log("Margintable after:");
        console.log(JSON.stringify(this));
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
function compare_vals(val1, val2, tol) {
    if (!isNaN(val1) && !isNaN(val2)) {
        console.warn(`Comparing ${val1} and ${val2} (${Math.abs(val1 - val2)}) with tolerance ${tol}`);
        if (Math.abs(val1 - val2) > tol) {
            console.error("Provided values do not match. Please check!");
            // no_N = true;
            // TODO: Proper error handling!
            throw "Provided values do not match. Please check!";
            // val1 = NaN;  // set val1 NaN to return NaN.
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