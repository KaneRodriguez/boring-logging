/* global Plotly:true */
import React from 'react'
//import Plot from 'react-plotly.js'

import createPlotlyComponent from 'react-plotly.js/factory'
const Plot = createPlotlyComponent(Plotly);

const plotStyle = {
  width: '100%',
  height: '100%'
}

class BoringPlot extends React.Component {
    render () {

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

      var data = [
        {
          x: [1, 0, 0, 1, 1], // based on lat long
          y: [1, 1, 0, 0, 1], // y stays same
          z: [dataBottom, dataBottom, dataBottom, dataBottom, dataBottom],
          type: 'scatter3d',
          connectgaps: true
        },
        {
          x: [ 1,  1,  0,  0,  1],
          y: [ 1,  0,  0,  1,  1],
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

export default BoringPlot