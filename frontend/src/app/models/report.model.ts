export interface Attribute {
  label: string;
  kind: string;
  description: string;
}

export interface Report {
  name: string;
  json: string;
  csv: string;
  logo: string;
  icon: string;
  description: string;
  attributes: Attribute[];
}
