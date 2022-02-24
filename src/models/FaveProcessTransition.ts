import { UUID } from './FaveGeneralTypes';

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
