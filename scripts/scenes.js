const regionNames = ["Australia and New Zealand", "Central and Eastern Europe", "Eastern Asia", "Latin America and Caribbean",
  "Middle East and Northern Africa", "North America", "Southeastern Asia", "Southern Asia", "Sub-Saharan Africa",
  "Western Europe"
];


var year;
var previousYear;

var data = [];
var previousData = [];

var piedata = [];

var sumEconomy = 0;
var sumSocial = 0;
var sumFreedom = 0;
var sumGenerosity = 0;
var sumCorruptionPerception = 0;
var sumHealth = 0;
var sumDystopiaResidual = 0;
var sumHappinessScore = 0;
var topCountries = [];
var topCountriesRank = [];
var topCountriesScore = [];
var selectedRegions = [];


async function init(year) {
  this.previousYear = this.year;
  this.year = year;
  var dataUrlForYear = "https://raw.githubusercontent.com/pinkychauhan89/cs498dataviz/master/data/" + this.year + ".csv";
  this.previousData = this.data;
  this.data = await d3.csv(dataUrlForYear);
  displayCharts(true);

}

function updateCharts(region) {
  if (!document.getElementById(region).checked) {
    document.getElementById(region).checked = true;
    displayCharts(false);
  }
}

function displayCharts(transition) {
  constructNavigation();
  computeValues();
  clearCharts();
  displayBarChartAndAnnotations(transition);
  displayTopCountries();
  displayPieChart();
  displayScatterChart(transition);
  displayFiltersAndOptions();
}

function constructNavigation() {
  d3.select("#current").html("Currently viewing: " + year).on("click", function(d, i) {
    return init(year);
  });
  if (year == 2015) {
    d3.select("#prev").html("<< Home").on("click", function(d, i) {
      return location.href = 'index.html';
    });
    d3.select("#next").html("2016 >>").on("click", function(d, i) {
      return init(2016);
    });
  } else if (year == 2019) {
    d3.select("#prev").html("<< 2018").on("click", function(d, i) {
      return init(2018);
    });
    d3.select("#next").html("Home >>").on("click", function(d, i) {
      return location.href = 'index.html';
    });
  } else {
    d3.select("#prev").html("<< " + (year - 1)).on("click", function(d, i) {
      return init(year - 1);
    });
    d3.select("#next").html((year + 1) + " >>").on("click", function(d, i) {
      return init(year + 1);
    });
  }
}

function computeValues() {
  sumEconomy = 0;
  sumSocial = 0;
  sumFreedom = 0;
  sumGenerosity = 0;
  sumCorruptionPerception = 0;
  sumHealth = 0;
  sumDystopiaResidual = 0;
  sumHappinessScore = 0;
  topCountries = [];
  topCountriesRank = [];
  topCountriesScore = [];

  this.selectedRegions = getSelectedRegions();

  var counter = 0;
  for (var j = 0; j < data.length; j++) {
    for (var i = 0; i < selectedRegions.length; i++) {
      if (selectedRegions[i] === data[j].Region) {
        counter = counter + 1;
        sumEconomy = sumEconomy + parseFloat(data[j].Economy);
        sumSocial = sumSocial + parseFloat(data[j].SocialSupport);
        sumFreedom = sumFreedom + parseFloat(data[j].Freedom);
        sumGenerosity = sumGenerosity + parseFloat(data[j].Generosity);
        sumCorruptionPerception = sumCorruptionPerception + parseFloat(data[j].PerceptionOfCorruption);
        sumHealth = sumHealth + parseFloat(data[j].Health);
        sumDystopiaResidual = sumDystopiaResidual + parseFloat(data[j].DystopiaResidual);
        if (counter <= 10) {
          topCountries.push(data[j].Country);
          topCountriesRank.push(data[j].HappinessRank);
          topCountriesScore.push(data[j].HappinessScore);
        }
      }
    }
  }

  this.piedata = [sumEconomy / counter, sumCorruptionPerception / counter, sumFreedom / counter, sumSocial / counter, sumGenerosity / counter,
    sumHealth / counter, sumDystopiaResidual / counter
  ];
}

function clearCharts() {
  d3.selectAll("rect").remove();
  d3.select("#leftAxis").remove();
  d3.selectAll("#bottomAxis").remove();
  d3.selectAll("path").remove();
  d3.selectAll("circle").remove();
  d3.selectAll("g").remove();
  d3.select(".baryearlabel").selectAll("h3").remove();
  d3.select(".pieyearlabel").selectAll("h3").remove();
  d3.select(".scatteryearlabel").selectAll("h3").remove();
  d3.selectAll(".annotation").remove();
  d3.select(".topCountriesList").selectAll("ul").remove();
  d3.selectAll("table").remove();
}

function displayFiltersAndOptions() {
  d3.selectAll("fieldset").style("opacity", 1);
}

function displayBarChartAndAnnotations(transition) {
  const maxHappinessScore = 10;
  const maxRank = data.length;

  var width = 0.6 * screen.width;
  var height = 0.3 * screen.height;
  var margin = 50;

  var scaleX = d3.scaleLinear().domain([0, maxRank]).range([0, width]);
  var scaleY = d3.scaleLinear().domain([0, maxHappinessScore]).range([0, height]);
  var scaleNegY = d3.scaleLinear().domain([0, maxHappinessScore]).range([height, 0]);
  var scaleColor = d3.scaleLinear().domain([0, maxHappinessScore]).range(["red", "green"]);

  var tooltip = d3.select("#tooltip");

  d3.select(".baryearlabel").append("h3").html("Ranking of countries based on happiness score");

  d3.select(".barchart")
    .style("opacity", 1)
    .attr("width", width + (2 * margin))
    .attr("height", height + (2 * margin));

  d3.select(".barchart")
    .append("g").attr("id", "main")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .selectAll("rect").data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return scaleX(i)
    })
    .attr("width", 0.9 * (width / data.length))
    .attr("height", function(d, i) {
      if (transition) {
        if (previousData != null && previousData != undefined && previousData.length >= (i + 1)) {
          return scaleY(previousData[i].HappinessScore);
        } else {
          return scaleY(0);
        }
      } else return scaleY(d["HappinessScore"]);
    })
    .attr("y", function(d, i) {
      if (transition) {
        if (previousData != null && previousData != undefined && previousData.length >= (i + 1)) {
          return height - scaleY(previousData[i].HappinessScore);
        } else {
          return height - scaleY(0);
        }
      } else return height - scaleY(d["HappinessScore"]);
    })
    .style("fill", function(d, i) {
      return scaleColor(d["HappinessScore"]);
    })
    .style("stroke", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        return "black";
      } else {
        return "white";
      }
    })
    .attr("class", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        return "displayChart"
      } else {
        return "notdisplayChart";
      }
    })
    .style("opacity", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        return 1;
      } else {
        return 0.2;
      }
    })
    .attr("id", function(d, i) {
      return d.Country;
    })
    .on("mousemove", function(d, i) {
      if (d3.select(this).attr("class") === 'displayChart') {
        tooltip
          .style("opacity", 1)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 10) + "px")
          .style("border", "solid 1px")
          .html("Country: " + d["Country"] + "<br/>Region:" + d["Region"] + "<br/>Happiness Rank: " + d["HappinessRank"] +
            "<br/>Happiness Score: " + d["HappinessScore"] + "<br/>Economy (GDP per Capita): " + d["Economy"] +
            "<br/>Health: " + d["Health"] + "<br/>Freedom: " + d["Freedom"] + "<br/>SocialSupport: " + d["SocialSupport"] +
            "<br/>Generosity: " + d["Generosity"] + "<br/>PerceptionOfCorruption: " + d["PerceptionOfCorruption"])
      }
    })
    .on("mouseleave", function(d, i) {
      tooltip.style("opacity", 0)
        .html("");
    })
    .transition().duration(1000)
    .attr("height", function(d, i) {
      return scaleY(d["HappinessScore"])
    })
    .attr("y", function(d, i) {
      return height - scaleY(d["HappinessScore"])
    });

  displayAnnotations(scaleX, scaleY, scaleColor, height);


  d3.select(".barchart")
    .append("g").attr("id", "leftAxis").attr("transform", "translate(" + margin + "," + margin + ")")
    .call(d3.axisLeft(scaleNegY));

  d3.select(".barchart")
    .append("g").attr("id", "bottomAxis").attr("transform", "translate(" + margin + "," + (height + margin) + ")")
    .call(d3.axisBottom(scaleX));



}


function displayAnnotations(scaleX, scaleY, scaleColor, height) {
  var topCountryInEachSelectedRegion = [];
  var selectedRegionsWithCountryIdentified = [];
  var selectedTopMostCountriesScore = [];
  var selectedTopMostCountriesRank = [];

  for (var a = 0; a < data.length; a++) {
    for (var b = 0; b < selectedRegions.length; b++) {
      if (data[a].Region === selectedRegions[b]) {
        var countryFound = false;
        for (var c = 0; c < selectedRegionsWithCountryIdentified.length; c++) {
          if (data[a].Region === selectedRegionsWithCountryIdentified[c]) {
            countryFound = true;
            break;
          }
        }
        if (countryFound == false) {
          topCountryInEachSelectedRegion.push(data[a].Country);
          selectedRegionsWithCountryIdentified.push(data[a].Region);
          selectedTopMostCountriesScore.push(data[a].HappinessScore);
          selectedTopMostCountriesRank.push(data[a].HappinessRank);
        }
      }
    }
  }

  d3.select("#main").selectAll("text")
    .data(topCountryInEachSelectedRegion)
    .enter()
    .append("text")
    .text(function(d, i) {
      return selectedRegionsWithCountryIdentified[i] + " (" + d + ")";
    })
    .attr("x", function(d, i) {
      return scaleX(selectedTopMostCountriesRank[i])
    })
    .attr("y", function(d, i) {
      return height - scaleY(selectedTopMostCountriesScore[i])
    })
    .attr("text-anchor", "start")
    .attr("transform", function(d, i) {
      return "rotate(320," + scaleX(selectedTopMostCountriesRank[i]) + "," + (height - scaleY(selectedTopMostCountriesScore[i])) + ")"
    })
    .style("font-size", "x-small")
    .style("fill", function(d, i) {
      return scaleColor(selectedTopMostCountriesScore[i]);
    })

  d3.select("#main").selectAll("rect")
    .filter(function(d, i) {
      var result = false;
      for (var j = 0; j < topCountryInEachSelectedRegion.length; j++) {
        if (d.Country === topCountryInEachSelectedRegion[j]) {
          result = true;
          break;
        }
      }
      return result;
    })
    .attr("stroke-width", 3)

}

function displayTopCountries() {
  //console.log(topCountries);
  d3.select(".topCountriesList").append("table");

  var row = d3.select("table").append("tr");
  row.append("th").html("Country");
  row.append("th").html("Rank");
  row.append("th").html("Happiness Score");

  for (var i = 0; i < topCountries.length; i++) {
    var row = d3.select("table").append("tr");
    row.append("td").html(topCountries[i]);
    row.append("td").html(topCountriesRank[i]);
    row.append("td").html(topCountriesScore[i]);
  }


}

function displayPieChart() {
  const colors = ['pink', 'lightyellow', 'lightgreen', 'lightcyan', 'lightblue', 'violet', 'grey'];
  const labels = ['Economy', 'Perception of Corruption', 'Freedom', 'Social Support', 'Generosity',
    'Health', 'Dystopia Residual'
  ];

  var width = 0.28 * screen.width;
  var height = 0.3 * screen.height;
  var marginX = 0.5 * width;
  var marginY = 0.5 * height;

  var radius = 0.4 * Math.min(width, height);
  var pie = d3.pie();
  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
  var label = d3.arc()
    .outerRadius(radius + 40)
    .innerRadius(radius);

  d3.select(".pieyearlabel").append("h3").html("Contribution of factors comprising happiness score");

  d3.select(".piechart")
    .style("opacity", 1)
    .style("position", "relative")
    .style("float", "right")
    .attr("width", width)
    .attr("height", height);

  var g = d3.select(".piechart")
    .append("g").attr("transform", "translate(" + marginX + ", " + marginY + ")");

  var arc = g.selectAll(".arc")
    .data(pie(piedata))
    .enter().append("g")
    .attr("class", "arc");
  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d, i) {
      return colors[i];
    });

  arc.append("text")
    .attr("transform", function(d, i) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function(d, i) {
      return labels[i] + '\n' + piedata[i].toFixed(2);
    });

}

function displayScatterChart(transition) {
  var width = 0.28 * screen.width;
  var height = 0.2 * screen.height;
  var margin = 50;
  var circleRadius = 6;
  var scaleX = d3.scaleLinear().domain([0, 1.5]).range([0, width]);
  var scaleY = d3.scaleLinear().domain([0, 2]).range([0, height]);
  var scaleNegY = d3.scaleLinear().domain([0, 2]).range([height, 0]);
  var scaleColor = d3.scaleLinear().domain([0, 3]).range(["red", "green"]);

  var tooltip = d3.select("#tooltip");

  var dataOrderedBySelection = [];
  var unselectedData = [];
  var selectedData = [];
  for (var i = 0; i < data.length; i++) {
    if (isDataPointWithinSelection(data[i])) {
      selectedData.push(data[i]);
    } else {
      unselectedData.push(data[i]);
    }
  }
  dataOrderedBySelection = (unselectedData.concat(selectedData));


  d3.select(".scatteryearlabel")
    .append("h3")
    .html("Scatter plot between health and social/family support");

  d3.select(".scatterchart")
    .style("opacity", 1)
    .style("position", "relative")
    .style("float", "right")
    .attr("width", width + 100)
    .attr("height", height + 100);

  d3.select(".scatterchart").append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")")
    .selectAll("circle").data(dataOrderedBySelection)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
      if (transition) {
        var oldValue = getPreviousHealthDataValueForCountry(d.Country);
        return scaleX(oldValue);
      } else {
        return scaleX(d.Health);
      }
    })
    .attr("cy", function(d, i) {
      if (transition) {
        var oldValue = getPreviousSocialSupportDataValueForCountry(d.Country);
        return height - scaleY(oldValue);
      } else {
        return height - scaleY(d.SocialSupport);
      }
    })
    .attr("r", circleRadius)
    .style("opacity", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        return 1;
      } else {
        return 0.2;
      }
    })
    .attr("stroke", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        return "black";
      } else {
        return "white";
      }
    })
    .attr("fill", function(d, i) {
      return scaleColor(parseFloat(d.Health) + parseFloat(d.SocialSupport));
    })
    .on("mouseover", function(d, i) {
      if (isDataPointWithinSelection(d)) {
        tooltip
          .style("opacity", 1)
          .style("left", (d3.event.pageX + 4) + "px")
          .style("top", (d3.event.pageY + 5) + "px")
          .style("border", "solid 1px")
          .html(d.Country + "<br/>(" + d.Region + ")<br/>Health: " + d.Health + "<br>Social Support: " + d.SocialSupport);
      }
    })
    .on("mouseout", function(d, i) {
      tooltip.style("opacity", 0)
        .style("left", "0px")
        .style("top", "0px")
        .html("");
    })
    .transition().duration(500)
    .attr("cx", function(d, i) {
      return scaleX(d.Health);
    })
    .attr("cy", function(d, i) {
      return height - scaleY(d.SocialSupport)
    });


  d3.select(".scatterchart")
    .append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")")
    .call(d3.axisLeft(scaleNegY));

  d3.select(".scatterchart")
    .append("g")
    .attr("transform", "translate(" + margin + ", " + (height + margin) + ")")
    .call(d3.axisBottom(scaleX));


}

function getSelectedRegions() {
  var selectedRegions = [];
  var regions = document.getElementsByName("regions");
  for (var i = 0; i < regions.length; i++) {
    if (regions[i].checked) {
      if (regions[i].value === 'All') {
        selectedRegions = regionNames;
        break;
      }
      selectedRegions.push(regions[i].value);
    }
  }
  return selectedRegions;
}

function getSelectedYear() {
  var selectedYear = 2015;
  var years = document.getElementsByName("year");
  for (var i = 0; i < years.length; i++) {
    if (years[i].checked) {
      selectedYear = year[i];
      break;
    }
  }
  return selectedYear;
}

function isDataPointWithinSelection(data) {
  var isDataPointWithinSelection = false;
  for (var i = 0; i < this.selectedRegions.length; i++) {
    if (this.selectedRegions[i] === data.Region) {
      isDataPointWithinSelection = true;
      break;
    }
  }
  return isDataPointWithinSelection;
}

function getPreviousHealthDataValueForCountry(country) {
  if (previousData != null && previousData != undefined) {
    for (var i = 0; i < previousData.length; i++) {
      if (previousData[i].Country === country) {
        return previousData[i].Health;
      }
    }
  }
  return 0;
}

function getPreviousSocialSupportDataValueForCountry(country) {
  if (previousData != null && previousData != undefined) {
    for (var i = 0; i < previousData.length; i++) {
      if (previousData[i].Country === country) {
        return previousData[i].SocialSupport;
      }
    }
  }
  return 0;
}

function getPreviousScoreDataValueForCountry(country) {
  if (previousData != null && previousData != undefined) {
    for (var i = 0; i < previousData.length; i++) {
      if (previousData[i].Country === country) {
        return previousData[i].HappinessScore;
      }
    }
  }
  return 0;
}

function getPreviousRankDataValueForCountry(country) {
  if (previousData != null && previousData != undefined) {
    for (var i = 0; i < previousData.length; i++) {
      if (previousData[i].Country === country) {
        return previousData[i].HappinessRank;
      }
    }
  }
  return 0;
}

var modal = document.getElementById("aboutVizModal");

// Get the button that opens the modal
var btn = document.getElementById("aboutViz");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
