async function loadBar() {
    const data = await d3.csv('https://mgopal7.github.io/Project-Final/dataset.csv');

    const illinois_data = data.filter(function (d) {
        return d.state == 'IL'});
    var illinois_average = d3.sum(illinois_data.map(function(d) {                
        return d.abortionrate2529;                                           
      })); 
``
    const texas_data = data.filter(function (d) {
        return d.state == 'TX'});
    var texas_average = d3.sum(texas_data.map(function(d) {                
        return d.abortionrate2529;                                           
      }));

    const arkansas_data = data.filter(function (d) {
        return d.state == 'AK'});
    var arkansas_average = d3.sum(arkansas_data.map(function(d) {                
        return d.abortionrate2529;                                           
      }));

    const california_data = data.filter(function (d) {
        return d.state == 'CA'});
    var california_average = d3.sum(california_data.map(function(d) {                
        return d.abortionrate2529;                                           
      }));

    const florida_data = data.filter(function (d) {
        return d.state == 'FL'});
    var florida_average = d3.sum(florida_data.map(function(d) {                
        return d.abortionrate2529;                                           
      }));

    const newyork_data = data.filter(function (d) {
        return d.state == 'NY'});
    var newyork_average = d3.sum(newyork_data.map(function(d) {                
        return d.abortionrate2529;                                           
      }));


    const finalData = [{state: "IL", value: illinois_average},{state: "TX", value: texas_average},{state: "AK", value: arkansas_average},{state: "CA", value: california_average},{state: "FL", value: florida_average},{state: "New York", value: newyork_average}]

    var svg = d3.select("#two"), margin = 200,width = svg.attr("width") - margin,height = svg.attr("height") - margin

    var x = d3.scaleBand().range([0,width]).padding(0.2)
    var y = d3.scaleLinear().range([height,0])
    var color = d3.scaleOrdinal(['black','brown','green','tan','red', 'purple']);

    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

    x.domain(finalData.map(function(d) { return d.state; }));
    y.domain([0, d3.max(finalData, function(d) { return d.value; })]);

    g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    g.selectAll(".bar").data(finalData).enter().append("rect").attr('fill', function(d,i) { return color(i)}).attr("class", "bar").attr("x", function(d) { return x(d.state); }).attr("y", function(d) { return y((d.value)); }).attr("width", x.bandwidth()).attr("height", function(d) { return height - y((d.value)); })
    
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+120).attr("y", 110).text(Math.round(illinois_average));
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+220).attr("y", 150).text(Math.round(texas_average));
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+318).attr("y", 175).text(Math.round(arkansas_average));
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+412).attr("y", 210).text(Math.round(california_average));
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+505).attr("y", 100).text(Math.round(florida_average));
    // svg.append("text").attr("text-anchor", "middle").attr("x", x.bandwidth()/2+605).attr("y", 250).text(Math.round(newyork_average));

    g.append("text").attr("text-anchor", "end").attr("x", width/2).attr("y", height + 50).text("State");
    g.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", -50).attr("x", -200).text("Average # of abortions")
}


async function loadPie() {
    const csvData = await d3.csv('https://mgopal7.github.io/Project-Final/dataset.csv');
    var data = [{state: "Texas", value: 5406},{state: "Arkansas", value: 20423},{state: "California", value: 120000},{state: "New York", value: 513},{state: "Florida", value: 106},{state: "Illinois", value: 160942}]

    var width = 1000, height = 1000, opacity = 1, hoverOpacity = 0.50, other = 1, tooltipSize = 15, piechart = "#four";

    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(['black','red','orange','pink','yellow', 'green']);

    var svg = d3.select(piechart).append('svg').attr('class','pie').attr('width', width).attr('height', height);
    var g = svg.append('g').attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
    var arc = d3.arc().innerRadius(radius - 200).outerRadius(radius);

    var pie = d3.pie().value(function(d) { return d.value; });

    var path = g.selectAll('path').data(pie(data)).enter().append("g").append('path').attr('d', arc).attr('fill', function(d,i) { return color(i)}).style('opacity', opacity).style('stroke', 'white')
    .on("mouseover", function(d) {
      d3.selectAll('path')
        .style("opacity", other);
      d3.select(this) 
        .style("opacity", hoverOpacity);

    let g = d3.select("svg")
        .style("cursor", "pointer")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 1);

        g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.year} (${d.data.value}) (${(Math.round(1000 * d.data.value) / 200) + '%'})`)
        .attr('text-anchor', 'middle');
      })
    .on("mousemove", function(d) {
          let mousePosition = d3.mouse(this);
          let x = mousePosition[0] + width/2;
          let y = mousePosition[1] + height/2 - tooltipSize;
      
          let text = d3.select('.tooltip text');
          d3.select('.tooltip')
            .style("opacity", 1)
            .attr('transform',`translate(${x}, ${y})`);
      })
    .on("mouseout", function(d) {   
        d3.select("svg") 
          .select(".tooltip").remove();
      d3.selectAll('path')
          .style("opacity", opacity);
      })

    let legend = d3.select("#four").append('div')
      .attr('class', 'legend')
      .style('margin-top', '30px');

let keys = legend.selectAll('.key')
      .data(data)
      .enter().append('div')
      .attr('class', 'key')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin-right', '20px');

    keys.append('div')
      .attr('class', 'symbol')
      .style('height', '10px')
      .style('width', '10px')
      .style('margin', '5px 5px')
      .style('background-color', (d, i) => color(i));

    keys.append('div')
      .attr('class', 'year')
      .text(d => `${d.state}`);

    keys.exit().remove();
}

async function loadScatter() {
    const data = await d3.csv('https://mgopal7.github.io/Project-Final/dataset.csv');

    // console.log(data)

    const states = ["TX", "IL", "AK", "CA","NY","FL"]


    d3.select("#select-state")
            .selectAll('options')
            .data(states)
            .enter()
            .append('option')
            .text(function (d) {
                return d;
            }) 
            .attr("value", function (d) {
                return d;
            })

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    var svg = d3.select("#five").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.year; })]).range([ 0, width ]);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).ticks(6));
    
    var y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.pregnancies2529; })]).range([ height, 0 ]);
    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("circle").data(data.filter(function(d){return d.year})).enter().append("circle").attr("cx", function(d) { return x(d.year)}).attr("cy", function(d) { return y(d.pregnancies2024)}).attr("r", 3).attr("fill", "red")

    svg.append("text").attr("text-anchor", "end").attr("x", width/2).attr("y", height + margin.top + 18).text("Year");
    svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", -margin.left+20).attr("x", -250).text("Number of abortions")
}
