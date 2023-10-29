export interface GenericResponse<T> {
  code: number;
  message: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: T[];
}
