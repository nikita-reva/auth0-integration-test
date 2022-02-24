import { LatLng, Money, UUID } from './FaveGeneralTypes';
import { ListingAvailabilityPlan, ListingRelationships, ListingState } from './FaveListing';

export type OwnListingState = ListingState | 'draft' | 'pendingApproval';

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface OwnListingAvailabilityPlan extends ListingAvailabilityPlan {
  entries?: {
    dayOfWeek?: DayOfWeek;
    seats?: number;
    startTime?: 'string';
    endTime?: 'string';
  }[];
}

// This API endpoint requires an authenticated user access token.
// The total size of the public data object as JSON string must not exceed 50KB.
// The total size of the private data object as JSON string must not exceed 50KB.

export interface FaveOwnListing {
  data: {
    id: UUID;
    type: 'ownListing';
    attributes: {
      title: string;
      description: string;
      price: Money;
      createdAt: string;
      state: OwnListingState;
      deleted: boolean;
      geolocation?: LatLng; // Probably not needed
      availabilityPlan?: OwnListingAvailabilityPlan; // Probably not needed
      publicData?: {
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
        color?: string;
        [customProperty: string]: any;
      };
      metadata?: {
        [privateDataKey: string]: any;
      };
      privateData?: {
        [privateDataKey: string]: any;
      };
    };
    relationships?: ListingRelationships;
  };
}
