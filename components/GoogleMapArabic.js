import React, { Component } from 'react';
import { useRouter } from "next/router";
import en from './locales/en';
import fr from './locales/fr';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';
import GoogleMap from './GoogleMap';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const Markers = () => {
//   return (
//     <div className="marker"
//       style={{ backgroundColor: 'red', cursor: 'pointer'}}
//       title={'My Marker'}
//     />
//   );
// };

// class GoogleMap extends Component {
//   state = {
//     zoom: 11,
//     latitude: "",
//     longitude: ""
//   };

//   onMapClicked = (clickEvent) => {
//     console.log("click event", clickEvent);
//   }

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition((position) => {
//       // console.log("position", position.coords);
//       this.setState({ latitude: position.coords.latitude })
//       this.setState({longitude: position.coords.longitude})
//     })
//   }

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyCia-ojsGHgn-InxD3nI97yiysWUG2IMZU"}}
//           defaultCenter={{
//             lat: this.state.latitude,
//             lng: this.state.longitude
//           }}
//           defaultZoom={this.state.zoom}
//           onClick={this.onMapClicked}
//         >
//           <Marker
//             lat={this.state.latitude}
//             lng={this.state.longitude}
//             // text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default GoogleMap;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMapArabic = () => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : fr
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return locale === "ar" ? (
    // Important! Always set the container height explicitly
    <div className='container-fluid'>
      <div className=''>
        <div className='row'>
          <div className='col-md-8'>
            <div className='map'>
              <GoogleMapReact
                // bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </div>
          <div className='col-md-4 station'>
            <div className='station__heading'>
              <h2>{t.googleMap.station}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  ): <GoogleMap/>;
}

export default GoogleMapArabic