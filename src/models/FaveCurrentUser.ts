import { UUID } from './FaveGeneralTypes';
import { UserRelationships } from './FaveUser';

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
