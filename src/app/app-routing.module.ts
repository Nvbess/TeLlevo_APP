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
    loadChildren: () => import('./pages/onboarding/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registration/register-pas/register.module').then( m => m.RegisterPageModule)
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
    loadChildren: () => import('./pages/onboarding/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'register-cond',
    loadChildren: () => import('./pages/registration/register-cond/register-cond.module').then( m => m.RegisterCondPageModule)
  },
  {
    path: 'tipo-reg',
    loadChildren: () => import('./pages/onboarding/tipo-reg/tipo-reg.module').then( m => m.TipoRegPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
