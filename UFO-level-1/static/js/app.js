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
