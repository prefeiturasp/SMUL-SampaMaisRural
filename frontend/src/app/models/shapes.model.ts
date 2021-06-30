export interface Shapes {
  geometry: ShapeGeometry;
  properties: ShapeProperties;
 
}

export interface ShapeGeometry {
  coordinates: Array<Array<number>>;
  type: "MultiPolygon";
  id: 1;
}

export interface ShapeProperties {
  api_code: string;
  area: number;
  cd_perimet: string;
  cd_tema_di: string;
  kind: string;
  name: string;
  nm_tema_di: string;
  status: string;
  uc_categor: string;
  uc_gestao: string;
  uc_lei: string;
}