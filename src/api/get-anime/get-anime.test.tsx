import { describe, it, expect, vi } from 'vitest';
import { getAnime } from './get-anime';
import axios from 'axios';
vi.mock('axios');

describe('get-anime', () => {
  it('should create URL to request with passed arguments', async () => {
    axios.get = vi.fn().mockResolvedValueOnce({ data: 'data' });
    await getAnime('searchedAnime', 4, 45);
    expect(axios.get).toBeCalledWith(
      'https://api.jikan.moe/v4/anime?page=4&sfw&limit=45&q=searchedAnime'
    );
    expect(axios.get).toBeCalledTimes(1);
  });
});
