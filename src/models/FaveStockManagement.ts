import { UUID } from './FaveGeneralTypes';

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
