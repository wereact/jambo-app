import React from 'react';
import { FlatList } from 'react-native';
// import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager, CollapsingToolbar } from '~/common/components';
import { Card } from '~/modules/courses/components';

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

const CoursesScreen = () => {
  // const { navigation } = props;
  // const { navigate } = navigation;

  const data = [
    {
      id: '1',
      courseImage: 'https://i.imgur.com/pVJSPiF.png',
      courseName: 'AutoCad',
      date: '30/06/2019',
      author: 'Eduardo Albuquerque',
    },
    {
      id: '2',
      courseImage: '',
      courseName: 'Engenharia em 2019',
      date: '03/06/2019',
      author: 'Eduardo Albuquerque',
    },
    {
      id: '3',
      courseImage: 'https://i.imgur.com/mgGnMXH.png',
      courseName: 'A:Z da Engenharia',
      date: '05/05/2019',
      author: 'Eduardo Albuquerque',
    },
    {
      id: '4',
      courseImage: '',
      courseName: 'Por trás das Contruções',
      date: '01/07/2019',
      author: 'Eduardo Albuquerque',
    },
    {
      id: '5',
      courseImage: 'https://i.imgur.com/DDKBKAe.png',
      courseName: 'Certificação de BIM',
      date: '20/03/2019',
      author: 'Eduardo Albuquerque',
    },
    {
      id: '6',
      courseImage: 'https://i.imgur.com/OiVthKM.png',
      courseName: 'Oque é BIM?',
      date: '14/04/2019',
      author: 'Eduardo Albuquerque',
    },
  ];

  const renderCoursesListItem = item => {
    const { courseImage, courseName, date, author } = item;

    return (
      <Card
        courseImage={courseImage}
        courseName={courseName}
        date={date}
        author={author}
      />
    );
  };

  const renderItemSeparator = () => <Separator />;

  const renderCoursesList = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => renderCoursesListItem(item)}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
      // extraData={this.state} // Flatlist re-render.
    />
  );

  return (
    <CollapsingToolbar headerTitle="Cursos">
      <StatusBarManager />
      <Content>{renderCoursesList()}</Content>
    </CollapsingToolbar>
  );
};

export default CoursesScreen;

// CoursesScreen.propTypes = {
//   navigation: PropTypes.objectOf(
//     PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   ).isRequired,
// };
