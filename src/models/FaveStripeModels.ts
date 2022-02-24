import { UUID } from './FaveGeneralTypes';

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

interface StripeCustomerRelationships {
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
