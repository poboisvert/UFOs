// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = new Array();

// 3. Use this function to update the filters.
function updateFilters() {
  //
  // updateFilters() function will replace your handleClick() function and update the filters

  // 4a. Save the element that was changed as a variable.
  let elementSelected = d3.select(this);
  // https://website.education.wisc.edu/~swu28/d3t/concept.html

  // 4b. Save the value that was changed as a variable.
  let elementValue = elementSelected.property("value");
  console.log(elementValue);

  // 4c. Save the id of the filter that was changed as a variable.
  let elementId = elementSelected.attr("id");
  //console.log(elementId);

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    //console.log(elementValue.length);
    filters[elementId] = elementValue;
    //console.log(filters);
  } else {
    filters[elementId] = "";
  }

  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  // 8. Set the filtered data to the tableData // Import from data.js
  let prefilterData = tableData;
  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  let filteredData = [];

  //console.log(filters);

  Object.entries(filters).forEach(([key, value]) => {
    console.log(key);
    console.log(value);
    //console.log(text(value));
    if (!value) {
      buildData = prefilterData;
    } else {
      buildData = prefilterData.filter((row) => row[key] === value);
    }
  });
  // 10. Finally, rebuild the table using the filtered data
  buildTable(buildData);
}

// GENEREIC JS - LOAD on page open
// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
