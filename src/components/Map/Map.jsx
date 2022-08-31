import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab";
import useStyles from "./styles";
import mapStyles from '../../mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: "AIzaSyDkzBsN1D-cx5Zl3LXUrpGWZ8AvWOJ0FiI",
				}}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
				onChange={(e) => {
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
				}}
			>
				{places?.map((place,i) => {
					return (
						<div
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
						>
							{!isDesktop ? (
								<LocationOnOutlinedIcon
									color="primary"
									fontSize="large"
								/>
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography
										className={classes.typography}
										variant="subtitle2"
										gutterBottom
									>
										{place.name}
									</Typography>
									<img
										className={classes.pointer}
										src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
									/>
								</Paper>
							)}
						</div>
					);
				})}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
