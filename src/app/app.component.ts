import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiLoaded!: Observable<boolean>;
  lat!: number;
  lon!: number;
  dateNowForDisplay!:Date
  weather!: WeatherData;
  

  constructor(private weatherService: WeatherService) {}

  cityName!: string;
  weatherData?: WeatherData;
  dayOrNight?: string;
  
  ngOnInit() {
    this.getLocation() 
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService
          .getWeatherDataByCoords(this.lat, this.lon)
          .subscribe((data) => {
            this.weather = data;
            this.dayOrNightFunc(this.weather);   
            setInterval(()=>{
              this.dateNowForDisplay=new Date();
            },1000)
          });
      });
    }
  }

  getWeatherData(cityName: string) {
    this.weatherService.getWeatherDataByCity(cityName).subscribe({
      next: (response) => {
        this.weather = response;
        console.log(this.weather)
        this.dayOrNightFunc(this.weather);
        console.log((new Date(this.weather.dt *1000)).toUTCString())
        console.log((new Date(this.weather.dt *1000)).toTimeString())
      },
    });
  }

  dayOrNightFunc(weather:WeatherData){
    const sunriseDate = new Date(weather.sys.sunrise * 1000);
    const sunsetDate = new Date(weather.sys.sunset * 1000);
    const dateNow = new Date();
    if (dateNow > sunriseDate && dateNow < sunsetDate) {
      this.dayOrNight = 'day';
    } else {
      this.dayOrNight = 'night';
    }
  }

  
}


