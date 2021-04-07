import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
@Injectable({
  providedIn: 'root'
})



export class AdminGuard implements CanActivate {

  constructor(private service: AppService, private router: Router ){}

  canActivate():boolean {
    if (this.service.get_session()) {
        return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }

  }
}
