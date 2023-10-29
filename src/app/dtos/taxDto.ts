export interface ITax {
  tax_id: number;
  tax_code: string;
  tax_description: string;
  tax_siglas: string;
  tax_status: number;
  tax_type: number;
  tax_affects_cost: number;
  tax_percentage: number;
}

export class CreateTaxDto implements Omit<ITax, 'tax_id' | 'tax_status'> {
  tax_code!: string;
  tax_description!: string;
  tax_siglas!: string;
  tax_type!: number;
  tax_affects_cost!: number;
  tax_percentage!: number;
}

export class UpdateTaxDto implements Omit<ITax, 'tax_code'> {
  tax_id!: number;
  tax_description!: string;
  tax_siglas!: string;
  tax_status!: number;
  tax_type!: number;
  tax_affects_cost!: number;
  tax_percentage!: number;
}
