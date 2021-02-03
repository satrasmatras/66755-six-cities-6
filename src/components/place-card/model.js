import PropTypes from "prop-types";

const PlacePropType = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired
  }),
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    // eslint-disable-next-line camelcase
    avatar_url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    // eslint-disable-next-line camelcase
    is_pro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line camelcase
  is_favorite: PropTypes.bool.isRequired,
  // eslint-disable-next-line camelcase
  is_premium: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired,
  // eslint-disable-next-line camelcase
  max_adults: PropTypes.number.isRequired,
  // eslint-disable-next-line camelcase
  preview_image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

export default PlacePropType;
