import axios from 'axios';
import {TAffiliate, TFetchAffiliate} from '../types';

class AffiliatesApi {
  async getAffiliates() {
    try {
      const {data}: {data: TFetchAffiliate[]} = await axios.get(
        'https://64072ebd862956433e672515.mockapi.io/affiliates',
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async saveAffiliate(newData: TAffiliate, id?: string) {
    try {
      if (id !== undefined) {
        axios.patch(
          `https://64072ebd862956433e672515.mockapi.io/affiliates/${id}`,
          newData,
        );

        return;
      }
      axios.post(
        `https://64072ebd862956433e672515.mockapi.io/affiliates`,
        newData,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async removeAffiliate(id: string) {
    try {
      axios.delete(
        `https://64072ebd862956433e672515.mockapi.io/affiliates/${id}`,
      );

      return;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AffiliatesApi();
