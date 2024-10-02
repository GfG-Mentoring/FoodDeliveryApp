import { Button, Image } from '@nextui-org/react';
import { FiDelete, FiTrash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../store/slices/cart.slice';

type Props = {};

const CartItems = (props: Props) => {
  const dispatch = useDispatch();

  const cartDetails = useSelector((state: any) => state.cart);

  return (
    <div className="space-y-2">
      {cartDetails.cartItems.map((item: any) => (
        <div className="flex justify-between gap-4">
          <div className="inline-flex items-center justify-between w-full">
            <h2 className="text-md">{item.item.name}</h2>
            <h3 className="text-sm font-normal">{item.item.price}</h3>
          </div>
          <Button
            size="sm"
            color="danger"
            variant="light"
            isIconOnly
            onPress={() => dispatch(removeFromCart({ id: item.item.id }))}
          >
            <FiTrash />
          </Button>
        </div>
      ))}
      <div className="flex justify-between gap-4">
        <div className="inline-flex items-center justify-between w-full">
          <h2 className="text-md">Total cost</h2>
          <h3 className="text-sm font-normal">
            {cartDetails.cartItems.reduce((acc, cur) => {
              acc += cur.item.price * cur.quantity;
              return acc;
            }, 0)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export { CartItems };
