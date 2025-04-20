import axios from 'axios';
import { MISA_ROOT_URL } from 'utils/services';

export class MISA {
  static login({ variables }) {
    return axios.post(`${MISA_ROOT_URL}/auth/login/`, { ...variables });
  }

  static register({ variables }) {
    return axios.post(`${MISA_ROOT_URL}/auth/register`, { ...variables });
  }

  static logout({token}) {
    return axios.post(
      `${MISA_ROOT_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static getMe({token}) {
    return axios.get(`${MISA_ROOT_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  static refresh({token}) {
    return axios.post(`${MISA_ROOT_URL}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
