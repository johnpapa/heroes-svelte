import axios from 'axios';
import * as store from './store';
import { parseItem, parseList } from './http-utils';
import API from './config';

export async function getHeroesAction() {
  try {
    const response = await axios.get(`${API}/heroes`);
    const heroes = parseList(response);
    store.getHeroes(heroes);
    return heroes;
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteHeroAction(hero) {
  try {
    const response = await axios.delete(`${API}/heroes/${hero.id}`);
    parseItem(response, 200);
    store.deleteHero(hero);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateHeroAction(hero) {
  try {
    const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    const updatedHero = parseItem(response, 200);
    store.updateHero(updatedHero);
    return updatedHero;
  } catch (error) {
    console.error(error);
  }
}
export async function addHeroAction(hero) {
  try {
    const response = await axios.post(`${API}/heroes`, hero);
    const addedHero = parseItem(response, 201);
    store.addHero(addedHero);
    return addedHero;
  } catch (error) {
    console.error(error);
  }
}
