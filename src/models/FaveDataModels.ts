// The date and time when the transaction was initiated in ISO 8601 format.

export interface UUID {
  uuid: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Money {
  amount: number;
  currency: string;
}

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

interface UserRelationships {
  marketplace: {
    data: {
      id: string;
      type: 'marketplace';
    };
  };
  profileImage?: {
    data: {
      id: string;
      type: 'image';
    };
  };
}

export interface FaveUser {
  data: {
    id: UUID;
    type: 'user';
    attributes: {
      banned: false;
      deleted: false;
      createdAt: string;
      profile: {
        displayName: string;
        abbreviatedName: string;
        bio: string | null;
        publicData: {
          // fandom?
          // topSeller?
        };
        metadata: {
          // verified: true?
        };
      };
    };
    relationships: UserRelationships;
  };
}

export interface CurrentUserRelationships extends UserRelationships {
  stripeAccount?: {
    data: {
      id: string;
      type: 'stripeAccount';
    };
  };
  stripeCustomer?: {
    data: {
      id: string;
      type: 'stripeCustomer';
    };
  };
}

// Most current_user/ API endpoints require an authenticated user access token.

export interface FaveCurrentUser {
  data: {
    id: UUID;
    type: 'currentUser';
    attributes: {
      banned: false;
      deleted: false;
      createdAt: string;
      email: string;
      emailVerified: boolean;
      stripeConnected: boolean;
      stripePayoutsEnabled: boolean; // DEPRECATED -> Always false
      stripeChargesEnabled: boolean; // DEPRECATED -> Always false
      identityProviders: [];
      profile: {
        firstName: string;
        lastName: string;
        displayName: string;
        abbreviatedName: string;
        bio: string | null;
        publicData: {
          // fandom?
        };
        protectedData: {
          // phoneNumber?
          // TODO: Is there any?
        };
        privateData: {
          // discoveredServiceVia
          // TODO: Is there any?
        };
        metadata: {
          // TODO: Is there any?
        };
      };
    };
    relationships: CurrentUserRelationships;
  };
}

export interface StripeAccount {
  data: {
    id: UUID;
    type: 'stripeAccount';
    attributes: {
      stripeAccountId: string;
      stripeAccountData: {
        // https://stripe.com/docs/api/accounts/object
      };
    };
  };
}

export interface StripeCustomerRelationships {
  defaultPaymentMethod: {
    data: {
      id: string;
      type: 'stripePaymentMethod';
    };
  };
}

export interface StripeCustomer {
  data: {
    id: UUID;
    type: 'stripeCustomer';
    attributes: {
      stripeCustomerId: string;
    };
    relationships: StripeCustomerRelationships;
  };
}

// Only payment cards are supported as payment methods
export interface StripePaymentMethod {
  data: UUID;
  type: 'stripePaymentMethod';
  attributes: {
    type: 'stripe-payment-method/card';
    stripePaymentMethodId: string;
    card: {
      brand: string;
      last4Digits: string;
      expirationYear: number;
      expirationMonth: number;
    };
  };
}

// export type LineItemCodes<C extends string = null> =
export type LineItemCodes =
  | 'line-item/day'
  | 'line-item/night'
  | 'line-item/units'
  | 'line-item/units2'
  | 'line-item/units3'
  | 'line-item/negotiation'
  | 'line-item/provider-comission'
  | 'line-item/customer-comission'
  | 'line-item/provider-fixed-comission'
  | 'line-item/customer-fixed-comission';
// | `line-item/${C}`;

export interface TransactionRelationships {
  marketplace: {
    data: {
      id: string;
      type: 'marketplace';
    };
  };
  listing: {
    data: {
      id: string;
      type: 'listing';
    };
  };
  customer: {
    id: string;
    type: 'user';
  };
  booking?: {
    id: string;
    type: 'booking';
  };
  stockReservation?: {
    id: string;
    type: 'stockReservation';
  };
  reviews?: {
    id: string;
    type: 'review';
  }[];
  messages?: {
    id: string;
    type: 'message';
  }[];
}

export interface FaveTransaction {
  data: {
    id: UUID;
    type: 'transaction';
    attributes: {
      createdAt: string;
      processName: string;
      processVersion: number;
      lastTransition: string;
      lastTransitionAt: string;
      lineItems: {
        code: LineItemCodes;
        unitPrice: Money;
        quantity?: number;
        units?: number;
        percentage?: number;
        lineTotal: Money;
        lineItems: boolean;
        includedFor: string[];
      }[];
      payinTotal: Money;
      payoutTotal: Money;
      protectedData: {
        // TODO: To be defined
      };
      metadata: {
        // TODO: To be defined
      };
      // A transaction can have a maximum of 100 transitions.
      transitions: {
        transition: string;
        createdAt: string;
        by: 'customer' | 'provider' | 'operator' | 'system';
      }[];
    };
    relationships: TransactionRelationships;
  };
}

export type ActorRoles = 'customer' | 'provider' | 'operator' | 'system';

export type ParameterType =
  | 'uuid'
  | 'string'
  | 'integer'
  | 'boolean'
  | 'timestamp'
  | 'object'
  | 'money'
  | '["lineItem"]';

export interface FaveProcessTransition {
  data: {
    id: UUID;
    type: 'processTransition';
    attributes: {
      name: string;
      actor: ActorRoles[];
      actions: string[];
      params: {
        req: {
          [name: string]: ParameterType;
        };
        opt?: {
          [name: string]: ParameterType;
        };
      };
    };
  };
}

export interface FaveStock {
  data: {
    id: UUID;
    type: 'stock';
    attributes: {
      quantity: number;
    };
  };
}

export interface StockAdjustmentRelationships {
  ownListing: {
    data: {
      id: string;
      type: 'ownListing';
    };
  };
  stockReservation: {
    data: {
      id: string;
      type: 'stockReservation';
    };
  };
}

export interface FaveStockAdjustment {
  data: {
    id: UUID;
    type: 'stockAdjustment';
    attributes: {
      at: string; // timestamp
      quantity: number;
    };
    relationships: StockAdjustmentRelationships;
  };
}

export type StockReservationState = 'pending' | 'proposed' | 'accepted' | 'declined' | 'cancelled';

export interface StockReservationRelationships {
  transaction: {
    data: {
      id: string;
      type: 'transaction';
    };
  };
}

export interface FaveStockReservation {
  data: {
    id: UUID;
    type: 'stockReservation';
    attributes: {
      quantity: number;
      state: StockReservationState;
    };
    relationships: StockReservationRelationships;
  };
}

export interface ReviewRelationships {
  author: {
    data: {
      id: string;
      type: 'user';
    };
  };
  listing: {
    data: {
      id: string;
      type: 'listing';
    };
  };
  subject: {
    data: {
      id: string;
      type: 'user';
    };
  };
}

export interface FaveReview {
  data: {
    id: UUID;
    type: 'review';
    attributes: {
      type: 'ofProvider' | 'ofCustomer';
      state: 'public' | 'pending';
      rating: number;
      content: string;
      createdAt: string;
      deleted: boolean;
    };
    relationships: ReviewRelationships;
  };
}

export interface MessageRelationships {
  sender: {
    data: {
      id: string;
      type: 'user';
    };
  };
  transaction: {
    data: {
      id: string;
      type: 'transaction';
    };
  };
}

export interface FaveMessage {
  data: {
    id: UUID;
    type: 'message';
    attributes: {
      content: string;
      createdAt: string;
    };
    relationships: MessageRelationships;
  };
}

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
