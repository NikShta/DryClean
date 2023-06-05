import axios, {AxiosError} from 'axios';
import {TUserInfo} from '../types';

class UsersApi {
  async logInUser(login: string, password: string) {
    try {
      const res = await axios.get(
        `https://6400a81563e89b0913b3f891.mockapi.io/users/?login=${login}&password=${password}`,
      );

      return res.data[0];
    } catch (error: unknown | Error | AxiosError) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.status);
      }
    }
  }

  async logUpUser(newUserInfo: TUserInfo) {
    try {
      const {data} = await axios.get(
        `https://6400a81563e89b0913b3f891.mockapi.io/users/?login=${newUserInfo.login}`,
      );

      if (data.length) {
        console.log('уже есть такой');
        return;
      }

      try {
        const res = await axios.post(
          `https://6400a81563e89b0913b3f891.mockapi.io/users/`,
          newUserInfo,
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error?.response?.status);
        }
      }
    } catch (error) {}
  }

  async changeDeposit(amount: number, id: string) {
    try {
      const {data}: any = await axios.get(
        `https://6400a81563e89b0913b3f891.mockapi.io/users/${id}`,
      );
      const newValue = Number(data.deposit) + Number(amount);
      axios.patch(`https://6400a81563e89b0913b3f891.mockapi.io/users/${id}`, {
        deposit: newValue,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UsersApi();
