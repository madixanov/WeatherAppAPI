import { useEffect, useRef } from "react";
import { useCityStore } from "../store/city-store"
import { gsap } from "gsap";
import { API } from "./api";

export default function Main() {
    const cityName = useCityStore((state) => state.cityName);
    const removeFromCity = useCityStore((state) => state.removeFromCity) 

    useEffect(() => {
        gsap.fromTo(".main-element", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1})
    }, [cityName])

    useEffect(() => {
        if (cityName) {
            const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`)
            const data = await res.json()
            console.log(data)
            }
            fetchData()
        }
        
    }, [cityName])
    
    function handleClick() {
        removeFromCity();
    }

    return (
        <main className="main-element">
            {cityName ? <p>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</p> : <p>Please enter a city name</p>}
            {cityName && <button onClick={handleClick}>Remove</button>}
        </main>
    )
}