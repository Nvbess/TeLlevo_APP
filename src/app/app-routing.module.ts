import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
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
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/adm-usuarios/adm-usuarios.module').then( m => m.AdmUsuariosPageModule)
      },
      {
        path: ':email',
        loadChildren: () => import('./pages/admin/det-usuarios/det-usuarios.module').then( m => m.DetUsuariosPageModule)
      },
    ]
  },
  {
    path: 'adm-viajes',
    loadChildren: () => import('./pages/admin/adm-viajes/adm-viajes.module').then( m => m.AdmViajesPageModule)
  },
  {
    path: 'pj-profile',
    loadChildren: () => import('./pages/pasajero/pj-profile/pj-profile.module').then( m => m.PjProfilePageModule)
  },
  {
    path: 'viajes-pas',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pasajero/pj-actividad/pj-actividad.module').then( m => m.PjActividadPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/pasajero/pj-detviaje/pj-detviaje.module').then( m => m.PjDetviajePageModule)
      },
    ]
  },
  {
    path: 'det-usuarios',
    loadChildren: () => import('./pages/admin/det-usuarios/det-usuarios.module').then( m => m.DetUsuariosPageModule)
  },
  {
    path: 'lista-cond',
    loadChildren: () => import('./pages/admin/lista-cond/lista-cond.module').then( m => m.ListaCondPageModule)
  },
  {
    path: 'lista-pas',
    loadChildren: () => import('./pages/admin/lista-pas/lista-pas.module').then( m => m.ListaPasPageModule)
  },
  {
    path: 'viajes',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/adm-viajes/adm-viajes.module').then( m => m.AdmViajesPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/admin/det-viajes/det-viajes.module').then( m => m.DetViajesPageModule)
      },
    ]
  },
  {
    path: 'det-viajes',
    loadChildren: () => import('./pages/admin/det-viajes/det-viajes.module').then( m => m.DetViajesPageModule)
  },
  {
    path: 'perfil-admin',
    loadChildren: () => import('./pages/admin/perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
  },
  {
    path: 'cond-profile',
    loadChildren: () => import('./pages/conductor/cond-profile/cond-profile.module').then( m => m.CondProfilePageModule)
  },
  {
    path: 'cond-actividad',
    loadChildren: () => import('./pages/conductor/cond-actividad/cond-actividad.module').then( m => m.CondActividadPageModule)
  },
  {
    path: 'cond-viaje',
    loadChildren: () => import('./pages/conductor/cond-viaje/cond-viaje.module').then( m => m.CondViajePageModule)
  },
  {
    path: 'cond-viajeinit',
    loadChildren: () => import('./pages/conductor/cond-viajeinit/cond-viajeinit.module').then( m => m.CondViajeinitPageModule)
  },
  {
    path: 'pj-viajesdis',
    loadChildren: () => import('./pages/pasajero/pj-viajesdis/pj-viajesdis.module').then( m => m.PjViajesdisPageModule)
  },
  {
    path: 'pj-viajeinit',
    loadChildren: () => import('./pages/pasajero/pj-viajeinit/pj-viajeinit.module').then( m => m.PjViajeinitPageModule)
  },  {
    path: 'reset-pass',
    loadChildren: () => import('./pages/registration/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'cond-detviaje',
    loadChildren: () => import('./pages/conductor/cond-detviaje/cond-detviaje.module').then( m => m.CondDetviajePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
