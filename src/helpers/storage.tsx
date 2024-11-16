import { gestaoHospitalarToken } from "../constants/default";

export const getToken = (): string | null =>
  localStorage.getItem(gestaoHospitalarToken);

export const setToken = (token: string) => {
  if (token !== null) {
    localStorage.setItem(gestaoHospitalarToken, token);
  }
};
