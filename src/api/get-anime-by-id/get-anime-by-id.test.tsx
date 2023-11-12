import { describe, it, expect, vi } from 'vitest';
import { getAnimeById } from './get-anime-by-id';
import axios from 'axios';
vi.mock('axios');

describe('get-anime', () => {
  it('should create URL to request with passed arguments', async () => {
    axios.get = vi.fn().mockResolvedValueOnce({ data: 'data' });
    await getAnimeById(1);
    expect(axios.get).toBeCalledWith('https://api.jikan.moe/v4/anime/1/full');
    expect(axios.get).toBeCalledTimes(1);
  });
});
