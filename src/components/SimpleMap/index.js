
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react'

// TODO: move this to a settings file
let GOOGLE_MAP_API_KEY_DEV = 'AIzaSyBO7LZFLgtfJcw_yWfCiEf9_KdG3SjwbB0'

const AnyReactComponent = ({ text }) => (
    <div style={{
      position: 'relative', color: 'white', background: 'red',
      height: 40, width: 60, top: -20, left: -30,    
    }}>
      {text}
    </div>
  );
  
  class SimpleMap extends React.Component {
    static defaultProps = {
      center: {lat: 38.8002324, lng: -90.3171687},
      zoom: 11
    };

    renderMarkers = (map, maps) => { 
      this.props.locations.map(element => {
        let marker = new maps.Marker({
          position: {
             lat: element.latitude, 
             lng: element.longitude
            },
          map,
          title: element.title
        });
      })
    }

    render() {
      const { locations } = this.props

      let anyReactComponents = locations.map(element => {
          return (
            <AnyReactComponent 
            text={element.title} 
            lat={element.latitude} 
            lng={element.longitude} 
            /> 
          )
      });

      console.log("any react components", anyReactComponents)
      console.log("any react locations", locations)

      return (
        <div style={{width: '100%', height: '400px'}}>
        <GoogleMapReact
         bootstrapURLKeys={{key: GOOGLE_MAP_API_KEY_DEV}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
         >
          {/* 
          TODO: use code from project below
          https://github.com/istarkov/google-map-clustering-example/tree/master/src
          */
          }
          { anyReactComponents }
        </GoogleMapReact>
        </div>
      );
    }
  }

export default SimpleMap