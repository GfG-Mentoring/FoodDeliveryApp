import { useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input,
} from '@nextui-org/react';

import { useDispatch, useSelector } from 'react-redux';
import { addRestaurants } from '../store/slices/restaurant.slice';
import { FiStar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { getNearestRestaurants } from '../api/restaurants';
import { toast } from 'react-toastify';
import type { Restaurant } from '../types/restaurant';
import { RootState } from '../types';

const Restaurant = () => {
  const restaurantData = useSelector((state: RootState) => state.restaurant);

  const restaurants = restaurantData.restaurants;

  const locationData = {
    address: restaurantData.address,
    coordinates: restaurantData.coordinates,
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getLocationAndFetchRestaurants();
  }, []);

  const getLocationAndFetchRestaurants = async () => {
    const locationData = await getCurrentLocation();
    if (locationData?.coordinates != null) {
      const [restaurants, err] = await getNearestRestaurants(
        locationData.coordinates?.longitude,
        locationData.coordinates?.latitude,
        6000
      );

      if (err) {
        toast.error(err);
      }

      dispatch(addRestaurants(restaurants));
    }
  };

  const getCurrentLocation = async () => {
    try {
      const coordinates: GeolocationCoordinates = await new Promise(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(
            (data) => resolve(data.coords),
            (err) => reject(err),
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 5000,
            }
          )
      );

      const locationUrl = new URL(
        'https://api.opencagedata.com/geocode/v1/json?'
      );
      locationUrl.searchParams.append(
        'q',
        `${coordinates.latitude},${coordinates.longitude}`
      );
      locationUrl.searchParams.append(
        'key',
        '74c89b3be64946ac96d777d08b878d43'
      );

      const data = await fetch(locationUrl.toString());

      const response = await data.json();

      return {
        coordinates: coordinates,
        address: response.results[0].formatted,
      };
    } catch (err) {
      console.error(err);
    }
  };

  if (!restaurants.length) {
    return (
      <div className="w-full flex items-center justify-center h-[80vh]">
        <span>No serviceable restaurants nearby.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full gap-2 flex max-w-screen-md mt-2 p-3">
        <Input type="search" placeholder="search by restaurant." />
      </div>
      <span className={`${!locationData.address ? 'hidden' : 'block'}`}>
        Showing restaurants near {locationData.address}
      </span>
      <div className="flex gap-4 flex-wrap m-8">
        {restaurants.map((item, index) => {
          const calc = (item.foodItems ?? []).reduce(
            (acc, cur) => {
              acc.count += 1;
              acc.sum += cur.price ?? 0;

              return acc;
            },
            { count: 0, sum: 0 }
          );

          const avg = calc.sum / (calc.count || 1);

          // const distance = Math.sqrt(
          //   Math.pow(
          //     locationData.coordinates?.longitude -
          //       item.location.coordinates[0],
          //     2
          //   ) +
          //     Math.pow(
          //       locationData.coordinates?.latitude -
          //         item.location.coordinates[1],
          //       2
          //     )
          // );

          return (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => navigate('/restaurant/' + item._id)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[140px]"
                  src={'/dominoes.avif'}
                />
              </CardBody>
              <CardFooter className="text-small flex justify-between">
                <div className="flex flex-col">
                  <h1>{item.name}</h1>
                  <span className="capitalize text-xs truncate overflow-hidden max-w-24 text-slate-500">
                    {item.cuisine}
                  </span>
                </div>
                <div className="flex flex-col">
                  <Chip
                    startContent={<FiStar size={18} />}
                    variant="light"
                    color="success"
                  >
                    {item.rating}
                  </Chip>
                  <h2 className="text-default-500">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      notation: 'compact',
                    }).format(avg)}{' '}
                    per Person
                  </h2>
                  {/* <h2>{distance.toFixed(1)} meters</h2> */}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export { Restaurant };
