import * as store from './store';
import { parseItem, parseList } from './http-utils';
import API from './config';

export async function getHeroesAction() {
  try {
    const response = await fetch(`${API}/heroes`);
    const heroes = await parseList(response);
    store.getHeroes(heroes);
    return heroes;
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteHeroAction(hero) {
  try {
    const response = await fetch(`${API}/heroes/${hero.id}`, {
      method: 'DELETE',
    });
    await parseItem(response, 200);
    store.deleteHero(hero);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateHeroAction(hero) {
  try {
    const response = await fetch(`${API}/heroes/${hero.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });
    const updatedHero = await parseItem(response, 200);
    store.updateHero(updatedHero);
    return updatedHero;
  } catch (error) {
    console.error(error);
  }
}
export async function addHeroAction(hero) {
  try {
    const response = await fetch(`${API}/heroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });
    const addedHero = await parseItem(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
