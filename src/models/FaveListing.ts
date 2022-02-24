import { LatLng, Money, UUID } from './FaveGeneralTypes';

export type ListingState = 'published' | 'closed';

export type AvailabilityPlanType = 'availability-plan/day' | 'availability-plan/time';

export interface ListingAvailabilityPlan {
  type: AvailabilityPlanType;
  timezone?: string;
}

export interface ListingRelationships {
  marketplace: {
    data: {
      id: string;
      type: 'marketplace';
    };
  };
  author: {
    data: {
      id: string;
      type: 'user';
    };
  };
  images?: {
    data: {
      id: string;
      type: 'image';
    }[];
  };
  currentStock?: {
    data: {
      id: string;
      type: 'stock';
    };
  };
}

export interface FaveListing {
  data: {
    id: UUID;
    type: 'listing';
    attributes: {
      title: string;
      description: string;
      price: Money;
      createdAt: string;
      state: ListingState;
      deleted: boolean;
      geolocation?: LatLng; // Probably not needed
      availabilityPlan?: ListingAvailabilityPlan; // Probably not needed
      publicData: {
        fandom: string; // Additional API for fandom data???
        category: string;
        isVariant: boolean;
        /** Base listing ID */
        variantOf?: string;
        isIntangible: boolean;
        // isService: boolean???
        // Can be purchased with fave currency???
        // Link to a video???
        size?: number;
        brand: 'Nike';

        color?: string;
        [customProperty: string]: any;
      };
      metadata?: {};
    };
    relationships?: ListingRelationships;
  };
}
