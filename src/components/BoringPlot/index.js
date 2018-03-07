/* global Plotly:true */
import React from 'react'

import createPlotlyComponent from 'react-plotly.js/factory'
const Plot = createPlotlyComponent(Plotly);

const plotStyle = {
  width: '100%',
  height: '100%'
}

class BoringPlot extends React.Component {
    render () {
      let scatterPlot = true
      var d3 = Plotly.d3

      if(!scatterPlot) {


        function normal_array( mean, stddev, size ){
            var arr = new Array(size), i;
            // from http://bl.ocks.org/nrabinowitz/2034281
            var generator = (function() {
                return d3.random.normal(mean, stddev);
            }());
        
            for( i=0; i< arr.length; i++ ){
                arr[i] = generator();
            }
            return arr;
        }
        
        var x0 = normal_array(2, 0.45, 300);
        var y0 = normal_array(2, 0.45, 300);
        var z0 = normal_array(2, 0.45, 300);
        
        var x1 = normal_array(6, 0.4, 200);
        var y1 = normal_array(6, 0.4, 200)
        var z1 = normal_array(6, 0.4, 200)
        
        var x2 = normal_array(4, 0.3, 200);
        var y2 = normal_array(4, 0.3, 200);
        var z2 = normal_array(4, 0.3, 200);
        
        console.log(x0);
        
        var data = [
            {
                x: x0,
                y: y0,
                z: z0,
                mode: 'scatter3d'
            }, {
                x: x1,
                y: y1,
                z: z1,
                mode: 'scatter3d'
            }, {
                x: x2,
                y: y2,
                z: z2,
                mode: 'scatter3d'
            }, {
                x: x1,
                y: y0,
                z: z2,
                mode: 'scatter3d'
            }
        ];
        
        var layout = {
            shapes: [
                {
                    type: 'circle',
                    xref: 'x',
                    yref: 'y',
                    zref: 'z',
                    x0: d3.min(x0),
                    y0: d3.min(y0),
                    z0: d3.min(z0),
                    x1: d3.max(x0),
                    y1: d3.max(y0),
                    z1: d3.max(z0),
                    x2: d3.max(x0),
                    y2: d3.max(y0),
                    z2: d3.max(z0),
                    opacity: 0.2,
                    fillcolor: 'blue',
                    line: {
                        color: 'blue'
                    }
                },
                {
                    type: 'circle',
                    xref: 'x',
                    yref: 'y',
                    zref: 'z',
                    x0: d3.min(x1),
                    y0: d3.min(y1),
                    z0: d3.min(z1),
                    x1: d3.max(x1),
                    y1: d3.max(y1),
                    z1: d3.max(z1),
                    x2: d3.max(x1),
                    y2: d3.max(y1),
                    z2: d3.max(z1),
                    opacity: 0.2,
                    fillcolor: 'orange',
                    line: {
                        color: 'orange'
                    }
                },
                {
                    type: 'circle',
                    xref: 'x',
                    yref: 'y',
                    zref: 'z',
                    x0: d3.min(x2),
                    y0: d3.min(y2),
                    z0: d3.min(z2),
                    x1: d3.max(x2),
                    y1: d3.max(y2),
                    z1: d3.max(z2),
                    x2: d3.max(x2),
                    y2: d3.max(y2),
                    z2: d3.max(z2),
                    opacity: 0.2,
                    fillcolor: 'green',
                    line: {
                        color: 'green'
                    }
                },
                {
                    type: 'circle',
                    xref: 'x',
                    yref: 'y',
                    zref: 'z',
                    x0: d3.min(x1),
                    y0: d3.min(y0),
                    z0: d3.min(z0),
                    x1: d3.max(x1),
                    y1: d3.max(y0),
                    z1: d3.max(z0),
                    x2: d3.max(x1),
                    y2: d3.max(y0),
                    z2: d3.max(z0),
                    opacity: 0.2,
                    fillcolor: 'red',
                    line: {
                        color: 'red'
                    }
                }
            ],
            autosize: true, 
            margin: 0,
            height: '100%',
            showlegend: false
        }

        return (
          <Plot
            data={data}
            style={plotStyle}
            useResizeHandler={true}
            layout={layout}
            config={{
              displayModeBar: false
            }}
          />
        );
      }
      else if(scatterPlot) {
      // generate data from stratas
      let strataList;
      let strataDataX = []
      let strataDataY = []
      let strataDataZ = []
      let dataBottom = 0;
      let dataTop = 0;      
      
      if(this.props.stratas){
        strataList = Object.keys(this.props.stratas).map(key => {
          return this.props.stratas[key]
        })
        strataList.sort(function(b, a) {
          return (a.top ? a.top : 0) - (b.top ? b.top : 0);
        }); // does this really matter?
        // maybe remove all stratas that are not yet complete?

        strataList.forEach((value, index)=> {
           strataDataX.push(0.5); // lat/long in future
           strataDataY.push(0.5);
           strataDataZ.push(value.top)

           dataTop = dataTop > value.top ? dataTop : value.top
           dataBottom = dataBottom < value.bottom ? dataBottom : value.bottom
           
        })

        dataTop *= 1.25
        dataBottom *= 1.25
      }

      var boundsMax = 1;
      var boundsMin = 0;

      var data = [
        {
          x: [boundsMax, boundsMin, boundsMin, boundsMax, boundsMax], // based on lat long
          y: [boundsMax, boundsMax, boundsMin, boundsMin, boundsMax], // y stays same
          z: [dataBottom, dataBottom, dataBottom, dataBottom, dataBottom],
          type: 'scatter3d',
          connectgaps: true
        },
        {
          x: [ boundsMax,  boundsMax,  boundsMin,  boundsMin,  boundsMax],
          y: [ boundsMax,  boundsMin,  boundsMin,  boundsMax,  boundsMax],
          z: [dataTop, dataTop, dataTop, dataTop, dataTop],
          type: 'scatter3d',
          color: 'rgb(0, 0, 255)',
          connectgaps: true
        },
        {
          x: strataDataX,
          y: strataDataY,
          z: strataDataZ,
          type: 'scatter3d',
          color: 'rgb(0, 0, 255)',
        },
      ]
        return (
          <Plot
            data={data}
            style={plotStyle}
            useResizeHandler={true}
            layout={
              {
                autosize: true, 
                margin: 0,
                height: '100%',
              }
            }
            config={{
              displayModeBar: false
            }}
          />
        );
      }
    }
}

export default BoringPlot