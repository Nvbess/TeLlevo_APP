import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RandomuserService {

  constructor() { }

  async getRandomUsers(count: number) {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${count}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching random users', error);
      return [];
    }
  }
}