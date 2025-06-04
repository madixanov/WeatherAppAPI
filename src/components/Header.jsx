import { useEffect, useState } from "react";
import { useCityStore } from "../store/city-store"
import { gsap } from "gsap";

export default function Header() {
    const cityName = useCityStore((state) => state.cityName );
    const addToCity = useCityStore((state) => state.addToCity )
    const [ inputValue, setInputValue ] = useState("");

    useEffect(() => {
        gsap.fromTo(".header-element", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1})
    }, [])
    

    function handleChange(event) {
        let value = event.target.value;
        setInputValue(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addToCity(inputValue);
        setInputValue("");
    }

    return (
        <header className="header-element">
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="London" onChange={handleChange} value={inputValue} />
                </div>
                <button type="submit">Search</button>
            </form>
        </header>
    )
}