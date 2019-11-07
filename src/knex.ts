import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
import * as _ from 'lodash';
import { Interfaces } from './shared';

export class Knex<T> {
  private store: any;
  private sjStoreChanges: Rx.BehaviorSubject<any>;

  static create <StoreType> (
    options?: Interfaces.StoreOptions<StoreType>,
  ): Knex<StoreType> {
    const inst = new Knex<StoreType>();
    inst.init();
    return inst;
  }

  private init () {
    this.sjStoreChanges = new Rx.BehaviorSubject(null);
  }

  select <StateType = any> (state: string[]): StateType {
    return;
  }

  getState <StateType = any> (state: string[]): StateType {
    const statePath = _.join(state, '.');
    return _.get(this.store, statePath);
  }

  setState (stateActions: Interfaces.StateAction|Interfaces.StateAction[]) {
    const arrOfStateActions = _.isArray(stateActions)
      ? stateActions : [ stateActions ];

    _.forEach(arrOfStateActions, (stateAction) => {
      const statePath = _.join(stateAction.state, '.');
      const oldValue = _.get(this.store, statePath);

      _.set(this.store, statePath, stateAction.value);

      this.sjStoreChanges.next({
        statePath: statePath,
        state: stateAction.state,
        oldValue: oldValue,
        newValue: stateAction.value,
      });
    });
  }
}
