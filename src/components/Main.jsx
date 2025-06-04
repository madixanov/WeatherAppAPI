import { useEffect, useRef, useState } from "react";
import { useCityStore } from "../store/city-store"
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { API } from "./api";
import { cities } from "./city-list";

gsap.registerPlugin(TextPlugin);

export default function Main() {
    const cityName = useCityStore((state) => state.cityName);
    const removeFromCity = useCityStore((state) => state.removeFromCity) 

    const [ temp, setTemp ] = useState({});
    const [ weather, setWeather ] = useState("");
    const [ weatherPhoto, setWeatherPhoto ] = useState("");
    const [ humidity, setHumidity ] = useState();

    const [ index, setIndex ] = useState(0);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        gsap.to(textRef.current, {
            duration: 0.7,
            text: cities[index],
            ease: "none",
            onComplete: () => {
                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % cities.length);
                }, 1000)
            }
        })
    }, [index]);

    useEffect(() => {
        gsap.fromTo(".main-element", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1})
    }, [cityName])

    useEffect(() => {
        if (cityName) {
            const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`)
            const data = await res.json()
            setTemp({
                temp: data.main.temp,
                max_temp: data.main.temp_max,
                min_temp: data.main.temp_min
            })
            setWeather(data.weather[0].description)
            setWeatherPhoto(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            setHumidity(data.main.humidity)
            console.log(data)
            }
            fetchData()
        }
        
    }, [cityName])
    
    function handleClick() {
        removeFromCity();
        setIndex(0);
    }

    const weatherContainer = (<div className="weather-container">
                <h1>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h1>
                <img src={weatherPhoto} alt={weather} />
                <h2>{weather.charAt(0).toUpperCase() + weather.slice(1)}</h2>
                <h3>{Math.floor(temp.temp)} °C</h3>
                <p>Min: {Math.floor(temp.min_temp)} °C Max: {Math.floor(temp.max_temp)} °C</p>
                <p>Humidity: {Math.floor(humidity)}%</p>
            </div>)

    const emptyInput = (
        <div>
            <p>Please enter a city name</p>
            <p ref={textRef}></p>
        </div>
    )

    return (
        <main className="main-element">
            {cityName ? weatherContainer : emptyInput}
            {cityName && <button onClick={handleClick}>Remove</button>}
        </main>
    )
}