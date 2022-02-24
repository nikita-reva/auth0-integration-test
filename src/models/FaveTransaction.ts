import { Money, UUID } from './FaveGeneralTypes';

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
