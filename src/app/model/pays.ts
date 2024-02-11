export interface PaysHttp {
  code: string;
  nom: string;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Pays extends PaysHttp {
  code: string;
  nom: string;
}

export type PaysForm = Omit<Pays, 'code'>;

export namespace Pays {
  export function mapperFromHttp(paysHttp: PaysHttp): Pays {
    return {
      code: paysHttp.code,
      nom: paysHttp.nom,
    };
  }
}
