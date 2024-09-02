<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registration/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pasajero-home',
    loadChildren: () => import('./pages/pasajero/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'conductor-home',
    loadChildren: () => import('./pages/conductor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
];
=======
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registration/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'pasajero-home',
    loadChildren: () => import('./pages/pasajero/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'conductor-home',
    loadChildren: () => import('./pages/conductor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'login-page',
    loadChildren: () => import('./pages/registration/login-page/login-page.module').then( m => m.LoginPagePageModule)
  }
>>>>>>> 9aa42d2797abfbacf5acd6989ed55e5f463d28b3

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
