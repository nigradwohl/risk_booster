$(document).ready(function(){
    console.log("App started");

    // Likely we want to have an OOP table representation, where we can calculate margin sums of interest etc.!
    let testtab = new Table2x2([[2800, 200], [2950, 50]]);
    console.log(testtab);
    console.log("Sum margin 1: ");
    console.log(testtab.margin1_sum());
    console.log("Mean margin 1: ");
    console.log(testtab.margin1_mean());
    console.log("Sum margin 2: " + testtab.margin2_sum());
})



// Class to contruct 2x2 Tables, with functions to calculate the margins:
class Table2x2 {
    constructor(nested_list) {
        this.tab = nested_list;
    }

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
    // TODO: Handle missings!
    return list.map(subList => {
        let sum = subList.reduce((a, b) => a + b, 0);
        return subList.map(num => num / sum);
    });
}

// Transpose a matrix:
function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}



