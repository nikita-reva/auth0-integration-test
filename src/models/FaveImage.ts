import { UUID } from './FaveGeneralTypes';

export interface FaveImage {
  data: {
    id: UUID;
    type: 'image';
    attributes: {
      variants: {
        [variantName: string]: {
          name: string;
          width: number;
          height: number;
          url: string;
        };
      };
    };
  };
}
