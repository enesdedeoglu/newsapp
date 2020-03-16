import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import {getNews} from './news';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default class MainScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
    };

    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews(this.props.url)
      .then(articles => this.setState({articles, refreshing: false}))
      .catch(() => this.setState({refreshing: false}));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => this.fetchNews(),
    );
  }

  renderNews = news => {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.details({
            image: news.urlToImage,
            text: news.title,
            date: news.publishedAt,
            detail: news.description,
            url: news.url,
          })
        }>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Text> </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: news.urlToImage}} style={styles.avatar} />

            <View style={styles.info}>
              <Text style={{color: 'grey'}}>{news.author}</Text>
              <Text style={{fontSize: 20}}>{news.title}</Text>
              <Text style={{color: 'grey'}}>
                {news.publishedAt.substring(0, 10) +
                  ' ' +
                  news.publishedAt.substring(11, 19)}
              </Text>
            </View>
          </View>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>
      </TouchableOpacity>
    );
  };
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.details({
            image: item.urlToImage,
            text: item.title,
            date: item.publishedAt,
            detail: item.description,
            url: item.url,
          })
        }>
        <View style={styles.slide}>
          <ImageBackground
            source={{
              uri: item.urlToImage,
            }}
            style={styles.carousel}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.subtitle}>{item.title}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  render() {
    function wp(percentage) {
      const value = (percentage * viewportWidth) / 100;
      return Math.round(value);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.today}>Today</Text>
        <Text style={{color: 'grey', textAlign: 'center'}}>
          Discover Last News Today
        </Text>
        <ImageBackground
          source={require('./assets/background.jpg')}
          style={{width: '100%', height: '100%'}}>
          <Carousel
            layout={'stack'}
            layoutCardOffset={this.state.articles.length}
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.articles}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={wp(75) + wp(2) * 2}
            contentContainerCustomStyle={styles.sliderContentContainer}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            loop={true}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />

          <FlatList
            contentContainerStyle={{flexGrow: 0.7}}
            style={styles.feed}
            data={this.state.articles}
            renderItem={({item}) => this.renderNews(item)}
            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
            ItemSeparatorComponent={this.renderSeparator}></FlatList>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  avatar: {
    width: 150,
    height: 100,
    borderRadius: 7,
    marginRight: 16,
  },
  carousel: {
    width: 300,
    height: 300,
    borderRadius: 7,
  },
  feed: {
    marginHorizontal: 16,
  },
  slide: {
    overflow: 'visible', // for custom animations
    paddingVertical: 30,
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  exampleContainer: {
    paddingVertical: 30,
  },
  subtitle: {
    marginTop: 130,
    width: 0,
    flexGrow: 0.9,
    flex: 0.5,
    color: 'white',
    fontSize: 17,
    fontStyle: 'italic',
    textAlign: 'left',
    backgroundColor: 'red',
  },
  today: {
    fontSize: 38,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginTop: 110,
    alignContent: 'flex-start',
  },
});
