
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

    renderMarkers(map, maps) {
        let marker = new maps.Marker({
          position: {lat: 38.8002324, lng: -90.3171687},
          map,
          title: 'Hello World!'
        });
      }

    render() {
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
          <AnyReactComponent 
            lat={38.8002324} 
            lng={-90.3171687} 
            text={'Our Krib Yo'} 
          /> }
        </GoogleMapReact>
        </div>
      );
    }
  }

export default SimpleMap