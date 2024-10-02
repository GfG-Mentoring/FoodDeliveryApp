import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/slices/cart.slice';
import { RootState } from '../types';
import { Restaurant } from '../types/restaurant';
import { useEffect } from 'react';
import { getRestaurantById } from '../api/restaurants';
import { addRestaurant } from '../store/slices/restaurant.slice';

const FoodCatalogue = () => {
  const dispatch = useDispatch();
  const { id: restaurantId } = useParams();

  const cartData = useSelector((state: RootState) => state.cart);

  const restaurantsSnapshot = useSelector(
    (state: RootState) => state.restaurant
  );

  const restaurant = restaurantsSnapshot.restaurants?.find(
    (restaurant) => restaurant._id === restaurantId
  );

  const getQuantityInCart = (foodDetails: Restaurant['foodItems'][number]) => {
    const foodItemInCart = cartData.cartItems.find(
      (item) => item.item.id === foodDetails._id
    );
    return foodItemInCart?.quantity ?? 0;
  };

  const getRestaurantData = async () => {
    const [data, err] = await getRestaurantById(restaurantId ?? '');
    if (!err) {
      dispatch(addRestaurant(data));
    }
  };

  useEffect(() => {
    if (!restaurant) {
      getRestaurantData();
    }
  }, []);

  return (
    <div className="flex w-full m-8 gap-4 flex-wrap">
      {restaurant?.foodItems.map((foodItem) => (
        <Card shadow="sm" className="min-w-64" key={foodItem._id}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="20px"
              alt={foodItem.name}
              className="w-full object-cover h-[140px]"
              src={foodItem.imageUrl}
            />
          </CardBody>
          <CardFooter className="text-small ">
            <div className="flex flex-col" w-full>
              <h1>{foodItem.name}</h1>
              <span className="capitalize text-xs overflow-hidden max-w-24 text-slate-500">
                {foodItem.description}
              </span>
              <h2 className="text-default-500">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  notation: 'compact',
                }).format(foodItem.price)}{' '}
                per Serving
              </h2>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                isIconOnly
                size="sm"
                onPress={() => {
                  dispatch(
                    addToCart({
                      id: foodItem._id,
                      name: foodItem.name,
                      price: foodItem.price,
                    })
                  );
                }}
              >
                <FiPlus size={18} />
              </Button>
              <span>{getQuantityInCart(foodItem)}</span>
              <Button
                isIconOnly
                size="sm"
                onPress={() => dispatch(removeFromCart({ id: foodItem._id }))}
              >
                <FiMinus size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { FoodCatalogue };
