import { Component } from 'react';
import { getAnime } from './api/get-anime';
import Search from './components/search';
import Card from './components/card';
import { Item } from './entities/item';
import { ItemResponse } from './entities/item-response';

interface AppState {
  items: Item[];
  searchQuery: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: [],
      searchQuery: localStorage.getItem('Searched anime') || '',
    };
  }

  // const [items, setItems] = useState<Item[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');

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

  // useEffect(() => {
  //   displayItems();
  // }, []);

  handleSearch = () => {
    this.displayItems(this.state.searchQuery);
    localStorage.setItem('Searched anime', this.state.searchQuery);

    // const searchedAnime = localStorage.getItem('Searched anime');

    // this.setState({ searchQuery: searchedAnime != null ? searchedAnime : '' });
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
    return (
      <div className="wrapper">
        <Search
          searchQuery={this.state.searchQuery}
          setSearchQuery={(searchQuery) => this.setState({ searchQuery })}
          handleSearch={this.handleSearch}
        />
        <Card items={this.state.items} />
      </div>
    );
  }
}

export default App;
