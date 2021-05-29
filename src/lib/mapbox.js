import { WebMercatorViewport } from 'react-map-gl'

export const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const publicToken = 'pk.eyJ1IjoiZGF0YWJveSIsImEiOiJja3A1bzY3MTIwM3JoMm5vZm51bmM1Y3FuIn0.zPC8jQhM2p3S_pIpJIKa9Q'
export const endUrl = `.json?access_token=${publicToken}`
export const mapboxStyleUrl = 'mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i'

export function subSetViewport(memoryObject, viewport) {

  const centerCoordinates = memoryObject.location.coordinates
  const boundaryBox = memoryObject.location.boundaryBox
  const placeType = memoryObject.location.placeType

  // * checking first is boundaryBox was stored, for mor accuracy in viewport display
  if (boundaryBox && boundaryBox.length === 4) {

    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds(boundaryBox, {
        padding: 10,
        offset: [0, -100],
      })

    return [[longitude,latitude],zoom]

    // * else just manually define depending on the place type
  } else {

    let zoom = 10

    if (placeType === 'country') zoom = 6
    if (placeType === 'region') zoom = 7
    if (placeType === 'postcode') zoom = 8
    if (placeType === 'district') zoom = 9
    if (placeType === 'place') zoom = 10
    if (placeType === 'locality') zoom = 11
    if (placeType === 'neighbourhood') zoom = 12
    if (placeType === 'address') zoom = 13
    if (placeType === 'poi') zoom = 14

    return [centerCoordinates,zoom]

  }
}

