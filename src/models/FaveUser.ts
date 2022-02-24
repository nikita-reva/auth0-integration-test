import { UUID } from './FaveGeneralTypes';

export interface UserRelationships {
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
