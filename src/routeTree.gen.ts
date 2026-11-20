









import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as TeapotRouteImport } from './routes/418'
import { Route as CasasRouteImport } from './routes/casas'
import { Route as DonacionesRouteImport } from './routes/donaciones'
import { Route as GenesisRouteImport } from './routes/genesis'
import { Route as LiderazgoRouteImport } from './routes/liderazgo'
import { Route as SolicitudesRouteImport } from './routes/solicitudes'
import { Route as SoporteRouteImport } from './routes/soporte'
import { Route as VoluntariadoRouteImport } from './routes/voluntariado'
import { Route as ApiHealthRouteImport } from './routes/api.health'
import { Route as LegalSlugRouteImport } from './routes/legal.$slug'

const TeapotRoute = TeapotRouteImport.update({
  id: '/418',
  path: '/418',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const CasasRoute = CasasRouteImport.update({
  id: '/casas',
  path: '/casas',
  getParentRoute: () => rootRouteImport,
} as any)
const DonacionesRoute = DonacionesRouteImport.update({
  id: '/donaciones',
  path: '/donaciones',
  getParentRoute: () => rootRouteImport,
} as any)
const GenesisRoute = GenesisRouteImport.update({
  id: '/genesis',
  path: '/genesis',
  getParentRoute: () => rootRouteImport,
} as any)
const LiderazgoRoute = LiderazgoRouteImport.update({
  id: '/liderazgo',
  path: '/liderazgo',
  getParentRoute: () => rootRouteImport,
} as any)
const SolicitudesRoute = SolicitudesRouteImport.update({
  id: '/solicitudes',
  path: '/solicitudes',
  getParentRoute: () => rootRouteImport,
} as any)
const SoporteRoute = SoporteRouteImport.update({
  id: '/soporte',
  path: '/soporte',
  getParentRoute: () => rootRouteImport,
} as any)
const VoluntariadoRoute = VoluntariadoRouteImport.update({
  id: '/voluntariado',
  path: '/voluntariado',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiHealthRoute = ApiHealthRouteImport.update({
  id: '/api/health',
  path: '/api/health',
  getParentRoute: () => rootRouteImport,
} as any)
const LegalSlugRoute = LegalSlugRouteImport.update({
  id: '/legal/$slug',
  path: '/legal/$slug',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/418': typeof TeapotRoute
  '/': typeof IndexRoute
  '/casas': typeof CasasRoute
  '/donaciones': typeof DonacionesRoute
  '/genesis': typeof GenesisRoute
  '/liderazgo': typeof LiderazgoRoute
  '/solicitudes': typeof SolicitudesRoute
  '/soporte': typeof SoporteRoute
  '/voluntariado': typeof VoluntariadoRoute
  '/api/health': typeof ApiHealthRoute
  '/legal/$slug': typeof LegalSlugRoute
}
export interface FileRoutesByTo {
  '/418': typeof TeapotRoute
  '/': typeof IndexRoute
  '/casas': typeof CasasRoute
  '/donaciones': typeof DonacionesRoute
  '/genesis': typeof GenesisRoute
  '/liderazgo': typeof LiderazgoRoute
  '/solicitudes': typeof SolicitudesRoute
  '/soporte': typeof SoporteRoute
  '/voluntariado': typeof VoluntariadoRoute
  '/api/health': typeof ApiHealthRoute
  '/legal/$slug': typeof LegalSlugRoute
}
export interface FileRoutesById {
  '/418': typeof TeapotRoute
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/casas': typeof CasasRoute
  '/donaciones': typeof DonacionesRoute
  '/genesis': typeof GenesisRoute
  '/liderazgo': typeof LiderazgoRoute
  '/solicitudes': typeof SolicitudesRoute
  '/soporte': typeof SoporteRoute
  '/voluntariado': typeof VoluntariadoRoute
  '/api/health': typeof ApiHealthRoute
  '/legal/$slug': typeof LegalSlugRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/418'
    | '/'
    | '/casas'
    | '/donaciones'
    | '/genesis'
    | '/liderazgo'
    | '/solicitudes'
    | '/soporte'
    | '/voluntariado'
    | '/api/health'
    | '/legal/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/418'
    | '/'
    | '/casas'
    | '/donaciones'
    | '/genesis'
    | '/liderazgo'
    | '/solicitudes'
    | '/soporte'
    | '/voluntariado'
    | '/api/health'
    | '/legal/$slug'
  id:
    | '__root__'
    | '/418'
    | '/'
    | '/casas'
    | '/donaciones'
    | '/genesis'
    | '/liderazgo'
    | '/solicitudes'
    | '/soporte'
    | '/voluntariado'
    | '/api/health'
    | '/legal/$slug'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  TeapotRoute: typeof TeapotRoute
  IndexRoute: typeof IndexRoute
  CasasRoute: typeof CasasRoute
  DonacionesRoute: typeof DonacionesRoute
  GenesisRoute: typeof GenesisRoute
  LiderazgoRoute: typeof LiderazgoRoute
  SolicitudesRoute: typeof SolicitudesRoute
  SoporteRoute: typeof SoporteRoute
  VoluntariadoRoute: typeof VoluntariadoRoute
  ApiHealthRoute: typeof ApiHealthRoute
  LegalSlugRoute: typeof LegalSlugRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/418': {
      id: '/418'
      path: '/418'
      fullPath: '/418'
      preLoaderRoute: typeof TeapotRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/casas': {
      id: '/casas'
      path: '/casas'
      fullPath: '/casas'
      preLoaderRoute: typeof CasasRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/donaciones': {
      id: '/donaciones'
      path: '/donaciones'
      fullPath: '/donaciones'
      preLoaderRoute: typeof DonacionesRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/genesis': {
      id: '/genesis'
      path: '/genesis'
      fullPath: '/genesis'
      preLoaderRoute: typeof GenesisRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/liderazgo': {
      id: '/liderazgo'
      path: '/liderazgo'
      fullPath: '/liderazgo'
      preLoaderRoute: typeof LiderazgoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/solicitudes': {
      id: '/solicitudes'
      path: '/solicitudes'
      fullPath: '/solicitudes'
      preLoaderRoute: typeof SolicitudesRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/soporte': {
      id: '/soporte'
      path: '/soporte'
      fullPath: '/soporte'
      preLoaderRoute: typeof SoporteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/voluntariado': {
      id: '/voluntariado'
      path: '/voluntariado'
      fullPath: '/voluntariado'
      preLoaderRoute: typeof VoluntariadoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/health': {
      id: '/api/health'
      path: '/api/health'
      fullPath: '/api/health'
      preLoaderRoute: typeof ApiHealthRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/legal/$slug': {
      id: '/legal/$slug'
      path: '/legal/$slug'
      fullPath: '/legal/$slug'
      preLoaderRoute: typeof LegalSlugRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  TeapotRoute: TeapotRoute,
  IndexRoute: IndexRoute,
  CasasRoute: CasasRoute,
  DonacionesRoute: DonacionesRoute,
  GenesisRoute: GenesisRoute,
  LiderazgoRoute: LiderazgoRoute,
  SolicitudesRoute: SolicitudesRoute,
  SoporteRoute: SoporteRoute,
  VoluntariadoRoute: VoluntariadoRoute,
  ApiHealthRoute: ApiHealthRoute,
  LegalSlugRoute: LegalSlugRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
