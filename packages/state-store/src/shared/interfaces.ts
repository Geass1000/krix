import * as Enums from './enums';

export interface StateActionOptions {
  signal?: boolean;
}

export interface StateAction {
  state: string[];
  value: any;
  options?: StateActionOptions;
}

export interface KrixOptions <StoreType> {
  initStore: StoreType;
}

export interface StoreCommand <StoreCommandDataType = any> {
  type: Enums.StoreCommandType;
  data: StoreCommandDataType;
}

export interface AddSubStoreCommand <SubStoreType = any> {
  subStoreName: string;
  subStore: SubStoreType;
}

export interface SetStateCommand <StateType = any> {
  statePath: string;
  state: string[];
  oldValue: StateType;
  newValue: StateType;
  options?: StateActionOptions;
}

export interface StateChange <StateType = any> {
  oldValue: StateType;
  newValue: StateType;
}
