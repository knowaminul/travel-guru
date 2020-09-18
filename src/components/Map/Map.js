import {GoogleApiWrapper, Map, MapProps} from 'google-maps-react';
import * as React from 'react'

export class MapContainer extends React.Component<MapProps> {

public render() {
  return (
    <Map 
        google={this.props.google} 
        centerAroundCurrentLocation={true}
        zoom={20}
    />
  );
 }
}

export default GoogleApiWrapper({
  apiKey: ('API_KEY')
})(MapContainer)