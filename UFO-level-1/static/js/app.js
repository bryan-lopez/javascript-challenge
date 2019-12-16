// from data.js
var tableData = data;

// Locate Table, id="#ufo-table"
// Locate Body
var table = d3.select("#ufo-table");
var tbody = table.select("tbody")

// Attach data to node
var tr = tbody.selectAll("tr")
  .data(data)
  .enter()
  .append("tr");

// Unwrap object data
// keys:
//   datetime, city, state, country, shape, durationMinutes, comments
var td = tr.selectAll("td")
  .data( function(d) {
    return Object.values(d);
  })
  .enter()
  .append("td")
  .text(d => d); //Add data to td tag


// Part 2: Filter
// <form> tag -- input and button

// Filtering Table Function
function filteredTable(filteredArr) {
  var tbody = d3.select("#ufo-table").select("tbody");

  // Remove all rows
  tbody.selectAll("tr").remove()

  // Create new table
  var tr = tbody.selectAll("tr")
    .data(filteredArr)
    .enter()
    .append("tr")

  var td = tr.selectAll("td")
    .data( function(d) {
      return Object.values(d);
    })
    .enter()
    .append("td")
    .text(d => d); //Add data to td tag
};

// Locate input tag
var input = d3.select("#datetime");

// Locate button
var button = d3.select("#filter-btn");

// Define click behavior
function onClick(event) {
  try {
    // Check value of input node
    var value = input.node().value;
    input.node().value = "";

    // Filtering Logic
    if (value === "") {
      // No filter selected
      console.log(`No filter selected`);
      filteredTable(data); // Reset Table 
    } else {
      // Filtering
      var filtered = data.filter( function(item) {
        return item.datetime === value;
      });

      // Create filtered table
      filteredTable(filtered);

      console.log(`Filter: ${value}`);
    }
  } catch (e) {
    console.log(e);
  }
};

// Add event listener

button.on("click", onClick);
