import { HttpClient,  HttpHeaders,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherDataByCoords(lat:number, lon:number): Observable<WeatherData> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', environment.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(environment.apiURL, { params });
  }

  getWeatherDataByCity(city: string): Observable<WeatherData> {
    let params = new HttpParams()
      .set('q', city)
      .set('appid', environment.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(environment.apiURL, { params });
  }
}
