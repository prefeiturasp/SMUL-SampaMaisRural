export interface checkboxes {
  id: number;
  title: string;
};

export interface radioButtons {
  id: number;
  title: string;
};

export interface textField {
  name: string;
  label: string;
  mask?: string;
  required: boolean;
  activeWhen:  Array<String>;
}

export interface selectField {
  name: string;
  label: string;
  required?: boolean;
  activeWhen: Array<String>;
  values: Array<String>;
}

export interface images {
  preview: string | ArrayBuffer;
  file: File
};

export interface phones {
  name: string;
  label: string;
  value: string;
  index: number;
  disabled: boolean;
  kind: string;
  scope?: string;
  validation: boolean;
};

export interface formDefinition {
  category: string;
  subcategory: string;
}

export interface addPlaceForm {
  stages: stages[]
}

export interface stages {
  areas: areas[]
}

export interface areas {
  title?: string;
  subTitle?: string;
  warn?: string;
  fields: fields[]
}

export interface fields {
   category?: string;
   noPadding?: boolean;
   type: string;
   values?: Array<string>;
   subtype?: string;
   name: string;
   label?: string;
   title?: string;
   required?: boolean;
   selectField?: selectField;
   rows?: number;
   mask?: string;
   min?: number;
   max?: number;
   hideType?: boolean;
   textField?: textField;
   yesNo?: boolean;
   contactInfo?: object;
   retract?: boolean;
   subtitle?: string;
   otherField?: boolean;
   legend?: string;
   setValue?: string;
   address?: string;
   validation?: boolean;
}
