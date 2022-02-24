// This endpoint requires an access token that belongs to a user that is a party in the given transaction.

import { UUID } from './FaveGeneralTypes';

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
