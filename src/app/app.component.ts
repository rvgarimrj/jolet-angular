import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { LoaderService } from './shared/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    showLoader: boolean;

    constructor(private loaderService: LoaderService,
                private authToken: Angular2TokenService) 
      {
        this.authToken.init(environment.token_auth_config);
      }

    ngOnInit() {
        // console.log(this.Materialize);

        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });

    }
}
