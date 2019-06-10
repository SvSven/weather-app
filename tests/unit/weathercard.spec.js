import { shallowMount } from '@vue/test-utils'
import WeatherCard from '@/components/WeatherCard.vue'

import * as weatherSample from '../resources/weather.sample.json';
import * as forecastSample from '../resources/forecast.sample.json';

describe('WeatherCard.vue', () => {
    it('displays forecast data if passed', () => {
        const forecast = {
            location: {
                name: 'London, United Kingdom',
                lat: 51.51,
                lng: -0.13,
                timezone: 'Europe/London'
            },
            current: weatherSample,
            upcoming: forecastSample,
            units: 'metric'
        }

        const wrapper = shallowMount(WeatherCard, {
            propsData: { forecast }
        });

        const locationName = wrapper.find('.weather__header__title');
        expect(locationName.text()).toBe(forecast.location.name);

        const currentWeatherText = wrapper.find('.weather__current .weather__summary__text');
        expect(currentWeatherText.text()).toBe(forecast.current.weather[0].description);

        const forecastContainer = wrapper.findAll('.weather__upcoming > .weather__upcoming__item');
        expect(forecastContainer.length).toBe(5);

        const upcomingItem = wrapper.find('.weather__upcoming__item > .weather__summary__text');
        expect(upcomingItem.text()).toBe(forecast.upcoming.list[0].weather[0].description);
    })
})
