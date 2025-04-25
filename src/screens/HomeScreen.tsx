import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStore from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  const categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.ScreenContainer}>
        <StatusBar
          backgroundColor={COLORS.primaryBlackHex}
          translucent={false}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.screenViewFlex}>
          {/*App Header */}
          <HeaderBar />
          <Text style={styles.ScreenTitle}>
            Find the best{'\n'}coffee for you
          </Text>
          {/*Search Input */}
          <View style={styles.InputContainerComponent}>
            <TouchableOpacity onPress={() => {}}>
              <CustomIcon
                style={styles.InputIcon}
                name="search"
                size={FONTSIZE.size_18}
                color={
                  searchText.length > 0
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex
                }
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find Your Coffee..."
              value={searchText}
              onChangeText={text => setSearchText(text)}
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.TextInputContainer}
            />
          </View>
          {/* Category Scroller */}

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}>
            {categories.map((data, index) => (
              <View
                key={index.toString()}
                style={styles.CategoryScrollViewConatainer}>
                <TouchableOpacity
                  style={styles.CategoryScrollViewItem}
                  onPress={() => {
                    setCategoryIndex({
                      index: index,
                      category: categories[index],
                    });
                    setSortedCoffee([
                      ...getCoffeeList(categories[index], CoffeeList),
                    ]);
                  }}>
                  <Text
                    style={[
                      styles.CategoryText,
                      categoryIndex.index === index
                        ? {color: COLORS.primaryOrangeHex}
                        : {},
                    ]}>
                    {data}
                  </Text>
                  {categoryIndex.index === index ? (
                    <View style={styles.ActiveCategory} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Coffee Flatlist */}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.FlatlistConatainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <CoffeeCard
                    id={item.id}
                    index={item.index}
                    name={item.name}
                    type={item.type}
                    roasted={item.roasted}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    price={item.prices[2]}
                    average_rating={item.average_rating}
                    bottonPressHandler={() => {}}
                  />
                </TouchableOpacity>
              );
            }}
          />

          {/* Beans Flatlist */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  screenViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewConatainer: {
    paddingHorizontal: SPACING.space_15,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  FlatlistConatainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
});

export default HomeScreen;
