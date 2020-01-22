var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
var chosenXAxis = "LACCESS_POP15"
console.log(chosenXAxis)

var chosenYAxis = "PCT_OBESE_ADULTS13"
console.log(chosenYAxis)

// // function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]),
        d3.max(data, d => d[chosenXAxis])
        ])
        .range([0, width]);

    return xLinearScale;

}
function yScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]),
        d3.max(data, d => d[chosenYAxis])
        ])
        .range([0, height]);

    return yLinearScale;

}

// // function used for updating xAxis var upon click on axis label
function xrenderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}


function yrenderAxes(newYScale, yAxis) {
    var leftAxis = d3.axis(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

// // function used for updating circles group with a transition to
// // new circles
function xrenderCircles(circlesGroup, newXScale) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}
// function used for updating circles group with a transition to
// new circles
function yrenderCircles(circlesGroup2, newYScale) {

    circlesGroup2.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup2;
}


// // function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "LACCESS_POP15") {
        var label = "Population with Low Access to Stores";
    }
    else {
        var label = "Low Income Population with Low Access to Stores";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.State}<br>${label} ${d[chosenXAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}



// // function used for updating circles group with new tooltip
function updateToolTip2(chosenYAxis, circlesGroup2) {

    if (chosenYAxis === "PCT_OBESE_ADULTS13") {
        var label = "% Obese Adults";
    }
    else {
        var label = "% Diabetes Adults";
    }

    var updateToolTip2 = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.State}<br>${label} ${d[chosenYAxis]}`);
        });

    circlesGroup2.call(toolTip2);

    circlesGroup2.on("mouseover", function (data) {
        toolTip2.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip2.hide(data);
        });

    return circlesGroup2;
}

// // Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function (data, err) {
    if (err) throw err;

    //   // parse data
    data.forEach(function (data) {
        data.LACCESS_POP15 = +data.LACCESS_POP15;
        data.PCT_OBESE_ADULTS13 = +data.PCT_OBESE_ADULTS13;
        data.LACCESS_LOWI15 = +data.LACCESS_LOWI15;
        data.PCT_DIABETES_ADULTS13 = +data.PCT_DIABETES_ADULTS13
    });

    //   // xLinearScale function above csv import
    var xLinearScale = xScale(data, chosenXAxis);

    //   // Create y scale function
    var yLinearScale = yScale(data, chosenYAxis)


    //   // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //   // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .attr("transform", `translate(0, ${width})`)
        .call(leftAxis);


    //   // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    //   // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 5)
        .attr("fill", "teal")
        .attr("opacity", ".5");

    //   // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var LACCESS_POP15 = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "LACCESS_POP15") // value to grab for event listener
        .classed("active", true)
        .text("Population With Low Access to Stores")

    var LACCESS_LOWI15 = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "LACCESS_LOWI15") // value to grab for event listener
        .classed("inactive", true)
        .text("Low Income Population With Low Access to Stores")

    var ylabelsGroup = chartGroup.append("g")
        .call(leftAxis);

    //   // append y axis
    var PCT_OBESE_ADULTS13 = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("value", "PCT_OBESE_ADULTS13")
        .classed("active", true)
        .classed("axis-text", true)
        .text("Adult Obesity (%)");

    //   // append y axis
    var PCT_DIABETES_ADULTS13 =  ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("value", "PCT_DIABETES_ADULTS13")
        .attr("dy", "1em")
        .classed("axis-text", false)
        .classed("inactive", true)
        .text("Adult Diabetes (%)");


    //   // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    //   // x axis labels event listener
    labelsGroup.selectAll("text")
     .on("click", function () {
            // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

                //         // replaces chosenXAxis with value
            chosenXAxis = value;
                // console.log(chosenXAxis)
                //         // functions here found above csv import
                // updates x scale for new data
            xLinearScale = xScale(data, chosenXAxis);
                //         // updates x axis with transition
            xAxis = xrenderAxes(xLinearScale, xAxis);
                //         // updates circles with new x values
            circlesGroup = xrenderCircles(circlesGroup, xLinearScale);
                //         // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
                //         // changes classes to change bold text
                       
            if (chosenXAxis === "LACCESS_LOWI15") {
                LACCESS_LOWI15
                    .classed("active", true)
                    .classed("inactive", false);
                LACCESS_POP15
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                LACCESS_POP15
                    .classed("active", false)
                    .classed("inactive", true);
                LACCESS_LOWI15
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    }).catch(function(error) {
        console.log(error);
      });

    var circlesGroup2 = updateToolTip2(chosenYAxis, circlesGroup2);
                    //   // x axis labels event listener
    ylabelsGroup.selectAll("text")
     .on("click", function () {
                            // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {

                                //         // replaces chosenXAxis with value
            chosenYAxis = value;
            ylabelsGroup.selectAll("text") 
            yLinearScale = yScale(data, chosenYAxis);
            yAxis = yrenderAxes(yLinearScale, yAxis);
            circlesGroup2= yrenderCircles(circlesGroup2, yLinearScale);
            circlesGroup2 = updateToolTip2(chosenYAxis, circlesGroup2);

                                            // changes classes to change bold text
            if (chosenYAxis === "PCT_OBESE_ADULTS13") {
                PCT_OBESE_ADULTS13
                    .classed("active", true)
                    .classed("inactive", false);
                PCT_DIABETES_ADULTS13
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                PCT_DIABETES_ADULTS13
                    .classed("active", false)
                    .classed("inactive", true);
                PCT_OBESE_ADULTS13
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    })
}).catch(function (error) {
 console.log(error);
})