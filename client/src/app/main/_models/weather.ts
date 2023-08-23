

export class Weather {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    wind: {speed: number};
    weather: {
        description: string;
    }[];
    image: string;

    constructor(
        name: string,
        main: { 
            temp: number, 
            feels_like: number,
            pressure: number,
            humidity: number,
        },
        wind: {speed: number},
        weather: { description: string }[],
        image: string
    ) {
        this.name = name;
        this.main = main;
        this.wind = wind;
        this.weather = weather;
        this.image = image;
    }
}
