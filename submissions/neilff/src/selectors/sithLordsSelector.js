import { createSelector } from 'reselect';
import { Map } from 'immutable';

const sithLordsSelector = state => state.sithLords;
const apprenticeSelector = state => state.sithLords.getIn(['0', 'apprentice'], Map());
const masterSelector = state => state.sithLords.getIn(['4', 'master'], Map());
const planetIdSelector = state => state.planet.id;

export const loadedLords = createSelector(
  sithLordsSelector,
  planetIdSelector,
  masterSelector,
  apprenticeSelector,
  (sithLords, planetId, master, apprentice) => {
    return {
      sithLords: sithLords.map(i => {
        return i.getIn(['homeworld', 'id']) === planetId ?
          i.set('selected', true) :
          i.set('selected', false);
      }).toList(),
      disableUI: sithLords.filter(i => {
        return i.getIn(['homeworld', 'id']) === planetId;
      }).size > 0,
      disableUp: apprentice.get('url') === null && apprentice.get('id') === null,
      disableDown: master.get('url') === null && master.get('id') === null,
    };
  }
);
