import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AppRuntimeConfigurationService {
  private configuration;
  constructor(private http: HttpClient) {}

  loadAppConfig() {
    return this.http.get("/assets/metadata/configuration.json").toPromise()
    .then(
      conf => this.configuration = conf
    )
  }

  getConfig() {
    return this.configuration;
  }
}
