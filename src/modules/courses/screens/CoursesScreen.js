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
import { Card } from '~/modules/courses/components';
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

export function coursesScreenConfig() {
  return {
    header: null,
  };
}

const CoursesScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const [data, setData] = useState([
    {
      name: '',
      date: '',
      authorName: '',
    },
  ]);
  const [shimmer, setShimmer] = useState(false);

  const renderCoursesListItem = item => {
    const {
      imageLink,
      name,
      date,
      authorName,
      description,
      externalLink,
      youtubeLink,
    } = item;

    return (
      <Card
        imageLink={imageLink}
        name={name}
        date={date}
        authorName={authorName}
        shimmer={shimmer}
        onPress={
          shimmer
            ? () =>
                navigate('CoursesDetailScreen', {
                  title: name,
                  authorName,
                  description,
                  youtubeLink,
                  externalLink,
                })
            : () => {}
        }
      />
    );
  };

  const renderItemSeparator = () => <Separator />;

  const renderCoursesList = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => renderCoursesListItem(item)}
      keyExtractor={() => uuidv4()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
      extraData={data} // Flatlist re-render.
    />
  );

  const queryFirebase = async () => {
    let arr = [];
    db.collection('courses')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          arr = R.append(doc.data(), arr);
        });
        setData(arr);
        setShimmer(true);
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
    <CollapsingToolbar headerTitle="Cursos">
      <StatusBarManager />
      <Content>{renderCoursesList()}</Content>
    </CollapsingToolbar>
  );
};

export default CoursesScreen;

CoursesScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
