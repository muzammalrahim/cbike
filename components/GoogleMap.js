import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useRouter } from "next/router";
import en from './locales/en';
import fr from './locales/fr';
import { Marker } from 'google-maps-react';
// import Marker from './Marker';
import GoogleMapArabic from './GoogleMapArabic';
import axios from 'axios';

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
const GoogleMap = () => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : fr
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")
  const onMapClicked = async (clickEvent) => {
    let payload = {
      longitude: clickEvent.lng,
      latitude: clickEvent.lat

    }

    const res = await axios.post("https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/save-map", payload)

    // setLongitude(res.data)
    // setLatitude(res.data)
    // console.log("click event", clickEvent.lng);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    })
  }, [])


  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Hello World!'
    });
    return marker;
  };

  return locale === "en" ? (
    // Important! Always set the container height explicitly
    <div className='container-fluid'>
      <div className=''>
        <div className='row'>
          <div className='col-md-4 station'>
            <div className='station__heading'>
              <h2>{t.googleMap.station}</h2>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='map'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
                center={{
                  lat: latitude,
                  lng: longitude
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}

                // defaultCenter={defaultProps.center}
                zoom={11}
                // yesIWantToUseGoogleMapApiInternals
                onClick={onMapClicked}
              >
                {/* <AnyReactComponent
                  lat={latitude}
                  lng={longitude}
                  title="my marker"
                /> */}
              </GoogleMapReact>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : <GoogleMapArabic />;
}
export default GoogleMap