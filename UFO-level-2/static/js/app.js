// from data.js
var tableData = data;

/* Document Set-Up */

// Data Sets
var dates = d3.set( data.map(d => d.datetime) );
var cities = d3.set( data.map(d => d.city) );
var states = d3.set( data.map(d => d.state) );
var countries = d3.set( data.map(d => d.country) );
var shapes = d3.set( data.map(d => d.shape) );


// Set selects and options
var dateSelect = d3.select("#date-select");
dateSelect.selectAll("option")
  .data(dates.values())
  .enter().append("option")
  .attr("value", d => d)
  .text(d => d);

var citySelect = d3.select("#city-select");
citySelect.selectAll("option")
  .data(cities.values())
  .enter().append("option")
  .attr("value", d => d)
  .text(d => d);

var stateSelect = d3.select("#state-select");
stateSelect.selectAll("option")
  .data(states.values())
  .enter().append("option")
  .attr("value", d => d)
  .text(d => d);

var countrySelect = d3.select("#country-select");
countrySelect.selectAll("option")
  .data(countries.values())
  .enter().append("option")
  .attr("value", d => d)
  .text(d => d);

var shapeSelect = d3.select("#shape-select");
shapeSelect.selectAll("option")
  .data(shapes.values())
  .enter().append("option")
  .attr("value", d => d)
  .text(d => d);

/* Tabling */

// createTable will create a NEW table with each call
function createTable(tableData) {
  var tbody = d3.select("#ufo-table").select("tbody");

  // If tbody contains data, clear it for filtered or normal data
  if (!tbody.empty()) {
    // Remove all rows
    tbody.selectAll("tr").remove();
  }

  // Create new table
  var tr = tbody.selectAll("tr")
    .data(tableData)
    .enter()
    .append("tr")

  var td = tr.selectAll("td")
    .data( function(d) {
      return Object.values(d);
    })
    .enter()
    .append("td")
    .text(d => d);
};


/* Filtering */

function onFilter(event) {
  var options = {
    dateFilter: (dateSelect.node().value === "") ? false : dateSelect.node().value,
    cityFilter: (citySelect.node().value === "") ? false : citySelect.node().value,
    stateFilter: (stateSelect.node().value === "") ? false : stateSelect.node().value,
    countryFilter: (countrySelect.node().value === "") ? false :
      countrySelect.node().value,
    shapeFilter: (shapeSelect.node().value === "") ? false: shapeSelect.node().value
  }

  console.log(options)

  // multi-filter
  var filtered = data.filter( (d) => {

    if ((options.dateFilter) && !(options.dateFilter === d.datetime)){
      return false;
    } if ((options.cityFilter) && !(options.cityFilter === d.city)) {
      return false;
    } if ((options.stateFilter) && !(options.stateFilter === d.state)) {
      return false;
    } if ((options.countryFilter) && !(options.countryFilter === d.country)) {
      return false;
    } if ((options.shapeFilter) && !(options.shapeFilter === d.shape)) {
      return false;
    }

    return true;

  });

  console.log(filtered);
  createTable(filtered);
};

/* Clearing Filters */
function onClear(event) {
  dateSelect.node().selectedIndex = 0;
  citySelect.node().selectedIndex = 0;
  stateSelect.node().selectedIndex = 0;
  countrySelect.node().selectedIndex = 0;
  shapeSelect.node().selectedIndex = 0;
}

/* Listeners */

filterButton = d3.select("#filter-btn");
clearButton = d3.select("#clear-btn");

filterButton.on("click", onFilter);
clearButton.on("click", onClear);


/* RUN */
createTable(data);
