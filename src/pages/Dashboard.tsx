import {
  Badge,
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toggleCart } from '../store/slices/cart.slice';
import { FiShoppingCart } from 'react-icons/fi';
import { CartItems } from './components/CartItems';
import UserDropdown from './components/UserDropdown';

type Props = {};

const Dashboard = (props: Props) => {
  const authData = useSelector((state: any) => state.auth);
  const cartDetails = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();

  const getDefaultUserProfile = (fullName: string) => {
    const profileUrl = new URL('https://api.dicebear.com/9.x/initials/svg');
    profileUrl.searchParams.append('seed', fullName);

    return profileUrl.toString();
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Food delivery</p>
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Restaurants
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Cuisines
            </Link>
          </NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Badge content={cartDetails.cartItems.length} color="primary">
              <Button
                isIconOnly
                onPress={() => dispatch(toggleCart({ isOpen: true }))}
              >
                <FiShoppingCart />
              </Button>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            <UserDropdown>
              <User
                name={authData.fullName}
                avatarProps={{
                  src: authData.profilePic
                    ? authData.profilePic
                    : getDefaultUserProfile(authData.fullName),
                }}
              />
            </UserDropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Modal
        isOpen={cartDetails.showCart}
        onOpenChange={(isOpen) => dispatch(toggleCart(isOpen))}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your food items
              </ModalHeader>
              <ModalBody>
                <CartItems />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Clear cart
                </Button>
                <Button color="primary" onPress={onClose}>
                  Checkout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Outlet />
    </>
  );
};

export default Dashboard;
