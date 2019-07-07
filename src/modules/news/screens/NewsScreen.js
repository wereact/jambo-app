import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager, CollapsingToolbar } from '~/common/components';
import { Card } from '~/modules/news/components';

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

  const data = [
    {
      id: '1',
      category: 'BIM',
      categoryColor: '#87CEFA',
      title: 'Certificação de BIM',
      date: '30/06/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
      link: 'https://www.youtube.com',
    },
    {
      id: '2',
      category: 'Inovação',
      categoryColor: '#FF8C00',
      title: 'Jambo inovando o mercado de Curso de Engenharia Civl',
      date: '10/06/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
    },
    {
      id: '3',
      category: 'Engenharia',
      categoryColor: '#228B22',
      title: 'Certificação de BIM',
      date: '05/03/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
      link: 'https://www.terra.com',
    },
    {
      id: '4',
      category: 'Tecnologia',
      categoryColor: '#6A5ACD',
      title: 'Jambo lança App voltado para Cursos em Engenharia Civil.',
      date: '15/07/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
      link: 'https://www.reddit.com',
    },
    {
      id: '5',
      category: 'BIM',
      categoryColor: '#87CEFA',
      title: 'BIM será obrigatório a partir de 2020',
      date: '02/07/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
      link: 'https://www.twitter.com',
    },
    {
      id: '6',
      category: 'Tecnologia',
      categoryColor: '#6A5ACD',
      title:
        'Cursos da área de Engenharia Civil agora são feitos de modo Tecnologico/Online pela Jambo.',
      date: '30/06/2019',
      source: 'Folha da Engenharia',
      body:
        'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum',
      link: 'https://www.ifood.com',
    },
  ];

  const renderNewsListItem = item => {
    const { category, categoryColor, title, date, source, body, link } = item;

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
            link,
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
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
      // extraData={this.state} // Flatlist re-render.
    />
  );

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
