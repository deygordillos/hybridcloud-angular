import { Group } from "./group.model";

export interface Company {
  company_id?: number;
  group_id?: Group;
  company_is_principal?: number;
  company_name?: string;
  company_status?: number;
  created_at?: Date;
  updated_at?: Date;
  company_color?: string;
  company_razon_social?: string;
  company_id_fiscal?: string;
  company_email?: string;
  company_facebook?: string;
  company_url_logo?: string;
  company_instagram?: string;
  company_address?: string;
  company_phone1?: string;
  company_phone2?: string;
  company_website?: string;
  company_logo?: string;
  company_contact_name?: string;
  company_contact_phone?: string;
  company_contact_email?: string;

}
