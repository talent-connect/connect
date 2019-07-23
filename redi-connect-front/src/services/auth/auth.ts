import { RedUser } from '../../types/RedUser';
import { AccessToken } from '../../types/AccessToken';
import { RedProfile } from '../../types/RedProfile';

export const isLoggedIn = (): boolean => {
  const profile: any = window.localStorage.getItem('redProfile');
  const accessToken: any = window.localStorage.getItem('accessToken');
  try {
    const r1: any = JSON.parse(profile);
    const r2: any = JSON.parse(accessToken);
    return r1 && r2;
  } catch (err) {
    return false;
  }
};

export const getRedUser = (): RedUser =>
  JSON.parse(<string>window.localStorage.getItem('redUser'));

export const saveRedUser = (redUser: RedUser) => {
  window.localStorage.setItem('redUser', JSON.stringify(redUser));
};

export const getRedProfile = (): RedProfile =>
  JSON.parse(<string>window.localStorage.getItem('redProfile'));

export const saveRedProfile = (redProfile: RedProfile) => {
  window.localStorage.setItem('redProfile', JSON.stringify(redProfile));
};

export const getAccessToken = (): AccessToken =>
  JSON.parse(<string>window.localStorage.getItem('accessToken'));

export const saveAccessToken = (accessToken: AccessToken) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
};

export const purgeAllSessionData = () => {
  window.localStorage.clear();
};
