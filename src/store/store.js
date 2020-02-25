import { writable } from 'svelte/store';

const state = {
  heroes: writable([]),
  villains: writable([])
};

const getHeroes = heroes => {
  state.heroes.update(old => heroes);
};

const addHero = hero => {
  state.heroes.update(old => {
    old.unshift(hero);
    return old;
  });
};

const deleteHero = hero => {
  state.heroes.update(old => [...old.filter(h => h.id !== hero.id)]);
};

const updateHero = hero => {
  state.heroes.update(old => {
    const index = old.findIndex(h => h.id === hero.id);
    old.splice(index, 1, hero);
    return [...old];
  });
};

const getVillains = villains => {
  state.villains.update(old => villains);
};

const addVillain = villain => {
  state.villains.update(old => {
    old.unshift(villain);
    return old;
  });
};

const deleteVillain = villain => {
  state.villains.update(old => [...old.filter(v => v.id !== villain.id)]);
};

const updateVillain = villain => {
  state.villains.update(old => {
    const index = old.findIndex(v => v.id === villain.id);
    old.splice(index, 1, villain);
    return [...old];
  });
};

export {
  state,
  addHero,
  addVillain,
  getHeroes,
  getVillains,
  updateHero,
  updateVillain,
  deleteHero,
  deleteVillain
};
