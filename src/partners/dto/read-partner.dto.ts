import { ReadAttachmentDto } from "../../attachments/dto/read-attachment.dto";

export class ReadPartnerDto {
  id: number;
  name: string;
  company_id: number;
  create_date: Date;
  display_name: string;
  date: Date;
  title: string;
  parent_id: number;
  ref: string;
  lang: string;
  tz: string;
  user_id: number;
  vat: string;
  website: string;
  comment: string;
  credit_limit: number;
  active: boolean;
  employee: boolean;
  function: string;
  type: string;
  street: string;
  street2: string;
  zip: string;
  city: string;
  state_id: number;
  country_id: number;
  partner_latitude: number;
  email: string;
  phone: string;
  mobile: string;
  is_company: boolean;
  industry_id: number;
  attachment: ReadAttachmentDto;
}
