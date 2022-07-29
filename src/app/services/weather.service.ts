import { HttpClient,  HttpHeaders,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiURL='https://api.openweathermap.org/data/2.5/weather'
  apiKEY='507e4803d863eeb0c7a76cb34bca05af'
  constructor(private http: HttpClient) {}

  getWeatherDataByCoords(lat:number, lon:number): Observable<WeatherData> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(this.apiURL, { params });
  }

  getWeatherDataByCity(city: string): Observable<WeatherData> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(this.apiURL, { params });
  }
}
