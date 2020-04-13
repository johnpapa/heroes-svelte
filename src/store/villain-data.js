import * as store from './store';
import { parseItem, parseList } from './http-utils';
import API from './config';

export async function getVillainsAction() {
  try {
    const response = await fetch(`${API}/villains`);
    const villains = await parseList(response);
    store.getVillains(villains);
    return villains;
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteVillainAction(villain) {
  try {
    const response = await fetch(`${API}/villains/${villain.id}`, {
      method: 'DELETE',
    });
    await parseItem(response, 200);
    store.deleteVillain(villain);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateVillainAction(villain) {
  try {
    const response = await fetch(`${API}/villains/${villain.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(villain),
    });
    const updatedVillain = await parseItem(response, 200);
    store.updateVillain(updatedVillain);

    return updatedVillain;
  } catch (error) {
    console.error(error);
  }
}
export async function addVillainAction(villain) {
  try {
    const response = await fetch(`${API}/villains`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(villain),
    });
    const addedVillain = await parseItem(response, 201);
    store.addVillain(addedVillain);
    return addedVillain;
  } catch (error) {
    console.error(error);
  }
}
