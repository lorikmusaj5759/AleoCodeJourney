/* 
Filename: AdvancedDataVisualization.js
Content: Advanced Data Visualization using JavaScript and D3.js library 
*/

// Import D3.js library
import * as d3 from 'd3';

// Function to draw advanced data visualization
function drawVisualization() {
  // Set up canvas and dimensions
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create scales
  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);
  
  // Read data from external source
  d3.csv('data.csv').then(function(data) {

    // Process and format data

    // Compute the domain for scales
    xScale.domain(d3.extent(data, d => d.x));
    yScale.domain([0, d3.max(data, d => d.y)]);

    // Initialize axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to the SVG
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Draw data points
    svg.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue');

    // Display tooltips on mouseover
    svg.selectAll('.data-point')
      .on('mouseover', function(d) {
        const x = parseFloat(d3.select(this).attr('cx'));
        const y = parseFloat(d3.select(this).attr('cy'));

        d3.select('.tooltip')
          .style('left', x + 'px')
          .style('top', (y - 20) + 'px')
          .html(`(${d.x}, ${d.y})`)
          .classed('hidden', false);
      })
      .on('mouseout', function() {
        d3.select('.tooltip')
          .classed('hidden', true);
      });

    // Add a legend
    
    // ...

    // Add additional complex visualization features
    
    // ...

  }).catch(function(error) {
    console.log(error); // Handle errors while reading data
  });
}

// Call the function to draw the advanced data visualization
drawVisualization();

// Add custom CSS styles for the visualization
const styles = `
  svg {
    background-color: #f7f7f7;
  }
  
  .x-axis line,
  .x-axis path,
  .y-axis line,
  .y-axis path {
    stroke: #999;
  }
  
  .data-point {
    stroke: none;
  }
  
  .tooltip {
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px;
    font-size: 12px;
    border-radius: 4px;
  }
  
  .hidden {
    display: none;
  }
`;

// Add custom styles to the page
const styleElement = document.createElement('style');
styleElement.innerText = styles;
document.head.appendChild(styleElement);