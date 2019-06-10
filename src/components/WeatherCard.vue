<template>
    <div class="weather">
        <div class="weather__header">
            <h1 class="weather__header__title">{{ forecast.location.name }}</h1>
            <time :datetime="forecast.current.dt | ISODateTime(forecast.location.timezone)" class="weather__header__time">
                {{ forecast.current.dt | shortDateTime(forecast.location.timezone) }}
            </time>
        </div>

        <div class="weather__current weather__summary">
            <div class="weather__summary__icon">
                <img :src="`http://openweathermap.org/img/w/${forecast.current.weather[0].icon}.png`" alt="">
            </div>

            <h2 class="weather__summary__text">
                {{ forecast.current.main.temp | roundTemperature }}&deg; {{ forecast.current.weather[0].main }}
            </h2>
        </div>

        <div class="weather__upcoming">

            <div v-for="(report, index) in forecast.upcoming.list.slice(0, 5)" v-bind:key="index" class="weather__upcoming__item weather__summary">

                <time class="weather__summary__time" :datetime="report.dt | ISODateTime(forecast.location.timezone)">
                    {{ report.dt | shortDateTime(forecast.location.timezone) }}
                </time>

                <div class="weather__summary__icon">
                    <img :src="`http://openweathermap.org/img/w/${report.weather[0].icon}.png`" alt="">
                </div>

                <h2 class="weather__summary__text">{{ report.main.temp | roundTemperature }}&deg; {{ report.weather[0].main }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    name: 'WeatherCard',
    props: {
        forecast: {
            type: Object,
            required: true
        }
    },
    filters: {
        roundTemperature: function(temp) {
            return Number.parseFloat(temp).toFixed(1);
        },
        shortDateTime: function(dt, timezone) {
            const date = moment.unix(dt).utc();
            return date.tz(timezone).format("ddd MMMM Do, HH:mm");
        },
        ISODateTime: function(dt, timezone) {
            const date = moment.unix(dt).utc();
            return date.tz(timezone).format();
        }
    }
}
</script>

<style scoped lang="scss">
    .weather {
        margin: 50px 0;

        &__header {
            &__title {
                font-size: 24px;
            }
        }

        &__current {
            margin: 3px 0 20px 0;
            padding-bottom: 20px;
            border-bottom: solid 2px #d3d3d3;

            .weather__summary__text {
                font-size: 48px;
            }
        }

        &__summary {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            &__time {
                width: 100%;
            }

            &__icon {
                margin-right: 5px;
            }

            &__text {
                font-size: 24px;
            }
        }

        &__upcoming {
            display: flex;
            justify-content: space-between;

            .weather__summary {
                justify-content: center;

                &__time {
                    text-align: center;
                }
            }

            &__item:not(:last-child) {
                margin-right: 15px;
            }
        }
    }
</style>
