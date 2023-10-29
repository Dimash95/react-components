import { Component } from 'react';
import { getAnime } from '../../api/get-anime';
import Search from '../../components/search';
import Card from '../../components/card';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import styles from './home.module.css';

interface HomeState {
  items: Item[];
  searchQuery: string;
  error: boolean;
}

class Home extends Component<object, HomeState> {
  constructor(props: object) {
    super(props);

    this.state = {
      items: [],
      searchQuery: localStorage.getItem('Searched anime') || '',
      error: false,
    };
  }

  throwError = () => {
    this.setState({ error: true });
  };

  displayItems = async (searchedAnime: string = '') => {
    const itemResponses = (await getAnime(searchedAnime)) as unknown as {
      data: ItemResponse[];
    };
    if (itemResponses) {
      const fetchedItems = itemResponses.data.map(
        (itemResponse: ItemResponse) => this.mapItemResponseToItem(itemResponse)
      );
      this.setState({ items: fetchedItems });
    }
  };

  mapItemResponseToItem = (payload: ItemResponse): Item => ({
    title: payload.title,
    image: payload.images.webp.image_url,
    synopsis: payload.synopsis,
  });

  handleSearch = () => {
    this.displayItems(this.state.searchQuery);
    localStorage.setItem('Searched anime', this.state.searchQuery);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchQuery: value });
  };

  componentDidMount() {
    const searchedAnime = localStorage.getItem('Searched anime');
    if (searchedAnime) {
      this.setState({ searchQuery: searchedAnime }, () => {
        this.displayItems(searchedAnime);
      });
    } else {
      this.displayItems();
    }
  }

  render() {
    if (this.state.error) {
      throw new Error('Test error!');
    }
    return (
      <>
        <div className={styles.wrapper}>
          <button className={styles.errorButton} onClick={this.throwError}>
            Throw Error
          </button>
          <Search
            searchQuery={this.state.searchQuery}
            setSearchQuery={(searchQuery) => this.setState({ searchQuery })}
            handleSearch={this.handleSearch}
          />
          <Card items={this.state.items} />
        </div>
      </>
    );
  }
}

export default Home;
