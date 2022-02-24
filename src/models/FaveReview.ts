import { UUID } from './FaveGeneralTypes';

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

export type ReviewType = 'ofProvider' | 'ofCustomer';
export type ReviewState = 'public' | 'pending';

export interface FaveReview {
  data: {
    id: UUID;
    type: 'review';
    attributes: {
      type: ReviewType;
      state: ReviewState;
      rating: number;
      content: string;
      createdAt: string;
      deleted: boolean;
    };
    relationships: ReviewRelationships;
  };
}
