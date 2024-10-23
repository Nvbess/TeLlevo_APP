import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/inicios/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
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
    loadChildren: () => import('./pages/usuarios/pasajero/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'conductor-home',
    loadChildren: () => import('./pages/usuarios/conductor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicios/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/adm-usuarios/adm-usuarios.module').then( m => m.AdmUsuariosPageModule)
      },
      {
        path: ':uid',
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
    loadChildren: () => import('./pages/usuarios/pasajero/pj-profile/pj-profile.module').then( m => m.PjProfilePageModule)
  },
  {
    path: 'viajes-pas',
    loadChildren: () => import('./pages/usuarios/pasajero/pj-actividad/pj-actividad.module').then( m => m.PjActividadPageModule)
  },
  {
    path: 'pj-detviaje/:id',
    loadChildren: () => import('./pages/usuarios/pasajero/pj-detviaje/pj-detviaje.module').then( m => m.PjDetviajePageModule)
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
    loadChildren: () => import('./pages/admin/adm-viajes/adm-viajes.module').then( m => m.AdmViajesPageModule)
  },
  {
    path: 'det-viajes/:id',
    loadChildren: () => import('./pages/admin/det-viajes/det-viajes.module').then( m => m.DetViajesPageModule)
  },
  {
    path: 'perfil-admin',
    loadChildren: () => import('./pages/admin/perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
  },
  {
    path: 'cond-profile',
    loadChildren: () => import('./pages/usuarios/conductor/cond-profile/cond-profile.module').then( m => m.CondProfilePageModule)
  },
  {
    path: 'cond-actividad',
    loadChildren: () => import('./pages/usuarios/conductor/cond-actividad/cond-actividad.module').then( m => m.CondActividadPageModule)
  },
  {
    path: 'cond-viaje',
    loadChildren: () => import('./pages/usuarios/conductor/cond-viaje/cond-viaje.module').then( m => m.CondViajePageModule)
  },
  {
    path: 'cond-viajeinit/:id',
    loadChildren: () => import('./pages/usuarios/conductor/cond-viajeinit/cond-viajeinit.module').then( m => m.CondViajeinitPageModule)
  },
  {
    path: 'pj-viajesdis',
    loadChildren: () => import('./pages/usuarios/pasajero/pj-viajesdis/pj-viajesdis.module').then( m => m.PjViajesdisPageModule)
  },
  {
    path: 'pj-viajeinit',
    loadChildren: () => import('./pages/usuarios/pasajero/pj-viajeinit/pj-viajeinit.module').then( m => m.PjViajeinitPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./pages/registration/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'cond-detviaje/:uid',
    loadChildren: () => import('./pages/usuarios/conductor/cond-detviaje/cond-detviaje.module').then( m => m.CondDetviajePageModule)
  },
  {
    path: 'pj-qr',
    loadChildren: () => import('./pages/usuarios/pasajero/pj-qr/pj-qr.module').then( m => m.PjQrPageModule)
  },
  {
    path: 'mod-usuarios/:uid',
    loadChildren: () => import('./pages/admin/mod-usuarios/mod-usuarios.module').then( m => m.ModUsuariosPageModule)
  },
  {
    path: 'cond-editprofile/:uid',
    loadChildren: () => import('./pages/usuarios/conductor/cond-editprofile/cond-editprofile.module').then( m => m.CondEditprofilePageModule)
  },
  {
    path: 'conf-viaje/:id',
    loadChildren: () => import('./pages/admin/conf-viaje/conf-viaje.module').then( m => m.ConfViajePageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
