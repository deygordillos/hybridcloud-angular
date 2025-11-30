# Hybrid Cloud Angular - AI Coding Assistant Instructions

## Project Overview
Angular 15 enterprise application for hybrid cloud management with JWT-based authentication and PrimeNG UI components. Backend API at `environment.API_URL` (default: http://localhost:3001/api).

**API Documentation**: Swagger available at `http://localhost:3001/api/v1/docs.json`

## Architecture

### Module Structure
Feature modules follow this pattern (see `src/app/modules/impuestos` as reference):
```
modules/[feature]/
  ├── pages/[feature]/[feature].component.ts    # Main page with data table
  ├── components/form-crear-editar/             # Modal form for CRUD
  ├── [feature]-routing.module.ts
  └── [feature].module.ts
```

### Routing Hierarchy
- `/auth/*` - Public authentication routes (no guard)
- `/admin/*` - Admin features (AuthGuard protected)
- `/app/*` - Main app features (AuthGuard protected)
- `/app/demo/*` - Demo routes (dev only, `!environment.production`)

New feature routes MUST be lazy-loaded in `app-routing.module.ts` under appropriate parent.

### Path Aliases (tsconfig.json)
Always use these imports:
- `@app/*` - `src/app/*`
- `@environments/*` - `src/environments/*`
- `@services/*`, `@models/*`, `@guards/*`, `@interceptors/*`, etc.

## Authentication & HTTP

### Token Management
- **TokenInterceptor** (`@interceptors/token-interceptor/token.interceptor`):
  - ALL API calls MUST include `context: checkToken()` to attach JWT tokens
  - Auto-refreshes expired tokens using `/auth/refresh` endpoint
  - Handles 401 errors and redirects to login
  
Example service call:
```typescript
this.httpClient.get(`${this.url}/v1/taxes`, { context: checkToken() })
```

- **TokenService**: Uses `typescript-cookie` for token storage, validates JWT expiration
- **AuthGuard**: Validates `refreshToken` before allowing route access

## Common Patterns

### Service Layer
Services (in `src/app/services/`) use Promise-based API:
```typescript
getTaxes(status: Status, offset: number, limit: number): Promise<GenericResponse<Tax>> {
  const response = this.httpClient.get<GenericResponse<Tax>>(
    `${this.url}/v1/taxes/?tax_status=${status}&offset=${offset}&limit=${limit}`,
    { context: checkToken() }
  );
  return lastValueFrom(response);
}
```

### Component CRUD Pattern
List components (e.g., `impuestos.component.ts`):
1. Use `UtilsService.openModal()` to open form components via `DynamicDialogRef`
2. Tables use PrimeNG `p-table` with:
   - `rowsPerPageOptions` and `currentPageReportTemplate` from `@app/constants/tables`
   - Server-side pagination with `offset`/`limit` params
   - `loading` state with skeleton loaders
3. Status filtering via `SelectItem[]` dropdowns (convert enums with `utilsService.convertEnumToItemSelectArray()`)

Form components (e.g., `form-crear-editar.component.ts`):
- Receive data via `DynamicDialogConfig`
- Use reactive forms (`FormGroup`)
- Close with `dialogRef.close(result)` on success
- Parent component refreshes data table on modal close

### DTOs vs Models
- **Models** (`@models/*`): Interface types matching API responses
- **DTOs** (`@app/dtos/*`): Class-based with `Omit<>` for create/update operations
  - Example: `CreateTaxDto implements Omit<ITax, 'tax_id' | 'tax_status'>`

### Toast Notifications
Use `UtilsService.openToast()` for all user feedback:
```typescript
this.utilsService.openToast({
  severity: 'success', // 'info' | 'warn' | 'error'
  summary: 'Felicidades',
  detail: 'Operación completada',
});
```

### Modal Confirmations
Use `UtilsService.openModalConfirm()` for destructive actions (returns Promise<boolean>).

## PrimeNG Integration

### Modules
PrimeNG components imported via `src/app/modules/prime-ng/prime-ng.module.ts`. Add new imports there, then include in feature modules.

### Common Components
- Tables: `p-table` with lazy loading (`(onLazyLoad)="loadTaxes($event)"`)
- Dialogs: `DynamicDialogModule` + `DialogService` (not static `p-dialog`)
- Forms: `p-inputText`, `p-dropdown`, `p-inputSwitch`, `p-inputNumber`
- Services: `MessageService` (toasts), `ConfirmationService` (confirms)

## Menu System
Menu items defined in `app.menu.component.ts`:
- `adminModel` for `/admin` routes (requires admin role check)
- `model` for `/app` routes
- Menu structure: `{ label, items: [{ label, icon, routerLink }] }`

## Development Workflow

### Starting Dev Server
```bash
npm start  # ng serve on http://localhost:4200
```

### Adding a New Feature Module
1. Generate: `ng generate module modules/[feature] --route [feature] --module app-routing.module`
2. Create structure: `pages/`, `components/`, service in `services/[feature]/`
3. Add route to `app-routing.module.ts` under `/app` or `/admin`
4. Add menu item to `app.menu.component.ts`
5. Import required PrimeNG components in feature module

### Linting
```bash
npm run lint      # Check for errors
npm run lint:fix  # Auto-fix issues
```

## Critical Conventions

1. **Never hardcode API URLs** - Always use `environment.API_URL`
2. **Always use checkToken()** - Every HTTP request to backend needs authentication context
3. **Use path aliases** - Never relative imports for `app/`, `environments/`, etc.
4. **Lazy load modules** - All feature modules must be lazy-loaded in routing
5. **Status enums** - Use `Status` enum from `@app/enums/status` for entity states
6. **Reactive forms** - All forms use `FormGroup`/`FormControl`, never template-driven
7. **Service promises** - Convert observables with `lastValueFrom()`, don't expose observables from services (except AuthService.$user BehaviorSubject)

## Key Files Reference
- Module example: `src/app/modules/impuestos/`
- Service pattern: `src/app/services/impuestos/impuestos.service.ts`
- Interceptor: `src/app/interceptors/token-interceptor/token.interceptor.ts`
- Guards: `src/app/guards/auth/auth.guard.ts`
- Utils: `src/app/services/utils/utils.service.ts`
- Constants: `src/app/constants/tables.ts`

## API Response Patterns

### Generic Response Structure
API responses follow this pattern:
```typescript
{
  success: boolean;
  data: T | T[];  // Single object or array
  message: string;
  recordsTotal?: number;      // For paginated list endpoints
  recordsFiltered?: number;   // For filtered results
}
```

### Nested Data in GET Responses
Some GET endpoints return nested related data (e.g., `/v1/companies` includes `admin_users` array). Always check API documentation for available nested fields to avoid unnecessary additional requests.

Example - Companies endpoint returns:
```typescript
{
  company_id: number;
  company_name: string;
  admin_users: Array<{    // Nested admin users
    user_id: number;
    username: string;
    email: string;
    is_company_admin: number;
  }>;
}
```
