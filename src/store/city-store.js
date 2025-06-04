import { create } from "zustand";

export const useCityStore = create((set) => ({
    cityName: "",
    addToCity: (city) => set({
        cityName: city
    }),
    removeFromCity: () => set({cityName: ""})
}))