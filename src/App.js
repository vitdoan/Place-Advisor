import React, { useEffect, useState } from "react";
import { CssBaseline, Grid} from "@material-ui/core";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { getPlacesData } from "./api";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates,setCoordinates] = useState({});
    const [bounds,setBounds] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{ 
            setCoordinates({lat:latitude,lng:longitude});
        })
    },[]);

    useEffect(()=>{
        console.log("Bounds: ");
        console.log(bounds);
        if(bounds){
            getPlacesData(bounds.sw,bounds.ne).then(data=>{
                console.log(data);
                setPlaces(data);
            })
        }
    
    },[coordinates,bounds])
	return (
		<div>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
		</div>
	);
};

export default App;
