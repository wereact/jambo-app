import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from 'ramda';
import uuidv4 from 'uuid/v4';

import { StatusBarManager, CollapsingToolbar } from '~/common/components';
import { Card } from '~/modules/news/components';
import { db } from '~/config/firebase';

const Content = styled.View`
  display: flex;
  flex: 1;
  margin-left: ${wp('2%')};
  margin-right: ${wp('2%')};
`;

const Separator = styled.View`
  height: ${hp('2%')};
`;

export function newsScreenConfig() {
  return {
    header: null,
  };
}

const NewsScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;
  const [data, setData] = useState([]);

  const renderNewsListItem = item => {
    const {
      category,
      categoryColor,
      title,
      date,
      source,
      body,
      newsLink,
    } = item;

    return (
      <Card
        category={category}
        categoryColor={categoryColor}
        title={title}
        date={date}
        source={source}
        onPress={() =>
          navigate('NewsDetailScreen', {
            title,
            date,
            source,
            body,
            newsLink,
          })
        }
      />
    );
  };

  const renderItemSeparator = () => <Separator />;

  const renderNewsList = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => renderNewsListItem(item)}
      keyExtractor={() => uuidv4()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
      extraData={data} // Flatlist re-render.
    />
  );

  const queryFirebase = async () => {
    let arr = [];
    db.collection('news')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          arr = R.append(doc.data(), arr);
        });
        setData(arr);
      })
      .catch(error => {
        console.log('error lol', error);
        return Alert.alert(
          'Ops!',
          'Ocorreu um problema ao carregar os dados, tenta novamente mais tarde.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      });
  };

  useEffect(() => {
    queryFirebase();
  }, []);

  return (
    <CollapsingToolbar headerTitle="Notícias">
      <StatusBarManager />
      <Content>{renderNewsList()}</Content>
    </CollapsingToolbar>
  );
};

export default NewsScreen;

NewsScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
