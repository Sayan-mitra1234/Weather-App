import React, { useEffect, useState } from "react";
import "../App.css"

const Search=()=>{
    const [data,setData]=useState(null)
    const [city,setCity]=useState("")
    const [entry,setEntry]=useState([])

    useEffect(()=>{
        function fetchData(){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=baca46f74581af303a74f4928e275a4b`).then(res=>res.json()).then(json=>{json.cod===200 ? setData(json) : setData(null)})
        };
        fetchData()
    },[city])

    return(
        <>
            <h1 className="weather">Weather App</h1>
            <input type="search" value={city}  placeholder="Enter city Name" onChange={(e)=>{setCity(e.target.value)}}/>
            <br />
            <button className="ADD" onClick={()=>{if(data !==null){setEntry([...entry,city]); setCity("")}}}>ADD the City</button>
            <br />
            
           
            {
                data ?
                <> 
                <p>Weather Details of the City : {data.name}</p>
                <p>Current Temperature : {data.main.temp}</p>
                <p>Temperature Range : {data.main.temp_min} to {data.main.temp_max}</p>
                <p>Humidity : {data.main.humidity}</p>
                <p>Country : {data.sys.country}</p>
                <p>longitude : {data.coord.lon}</p>
                <p>latitude : {data.coord.lat}</p>
                </>
                : <button className="enter">Enter Valid City Name</button>
            }
            <h1 className="entry">Last 3 City Entries</h1>
             {entry.length !== 0 ? entry.map((place,index)=>{
                return(
                    
                <>
                    
                    <li key={index} onClick={()=> setCity(place)}>{place}</li>
                    </>
                )
            }) : <p></p>}
        </>
    )
}

export default Search