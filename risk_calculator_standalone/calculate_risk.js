$(document).ready(function(){
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
    // Note: missings shuld be handled as NaN, to be ignored in calculations!
    testtab.update([[2850, 150], [NaN, 50]]);
    // console.log(testtab);
    // console.log("Sum margin 1: ");
    // console.log(testtab.margin1_sum());
    // console.log("Mean margin 1: ");
    // console.log(testtab.margin1_mean());

    // Create a risk object:
    let testobj = new RiskArray([[2800, 200], [2950, 50]], [[NaN, NaN], [NaN, NaN]], 2000);
    console.log(testobj);

    // Update to work:
    testobj = new RiskArray([[2800, 200], [2950, 50]], [[NaN, NaN], [NaN, NaN]]);
    console.log(testobj);

})


// Class to construct risk arrays:
class RiskArray {
    constructor(n_tab, p_tab, N=NaN, risk_ratio=NaN) {

        // TODO: Maybe pass table objects as inputs instead of creating them here?

        // Set fields:
        this.n_tab = new Table2x2(n_tab);
        this.p_tab = new Table2x2(p_tab);

        this.risk_ratio = risk_ratio;

        console.log(n_tab);

        // Define total number of cases:
            let N_tab = this.n_tab.N;  // N from table.

            console.log("N provided: " + N + ", N calculated: " + N_tab);

            // Check N:
            if(!isNaN(N) && !isNaN(N_tab)){
                if(N !== N_tab){
                    console.error("Total number of cases in table and provided do not match. Please check!");
                    // no_N = true;
                    // TODO: Proper error handling!
                    N = NaN;
                }
            } else if(isNaN(N)) {
                // If N is NAN use calculated N (results in NaN if it cannot be provided!):
                N = N_tab;
            }

            // If they are equal or only one was provided:
            this.N = N;
    }

    // Next: Add function to complete the information!
}


// Class to contruct 2x2 Tables, with functions to calculate the margins:
class Table2x2 {
    constructor(nested_list) {
        this.tab = nested_list;  // pass the class a nested list to operate on.
        this.N = nested_list.flat().reduce((d, i) => d + i);  // Will be 1 for probability table!
        // Add risk ratio here?
    }

    // Function to update the table:
    // Eventually this should go automatically!
    update(nested_list){
        this.tab = nested_list;
        this.N = nested_list.flat().reduce((d, i) => d + i);
    }

    check_missings(){

    }

    // Implement functions to check for missings and complete them!
    // Potentially use a new (super?) class that contains the tables plus additional information?
    // could be a class RiskArray, containing 2 tables, an N (supplied or calculated), and relations (e.g., RRR).
    complete_table(){

    }

    // Calculate margin sums and means:
    margin1_sum(){
        return sumNestedLists(this.tab);
    }
    margin1_mean(){
        return meanNestedLists(this.tab);
    }

    margin2_sum(){
        let t_tab = transpose(this.tab);
        return sumNestedLists(t_tab);
    }
    margin2_mean(){
        let t_tab = transpose(this.tab);
        return meanNestedLists(t_tab);
    }
}

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



