import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
// import { FaBeer } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../../context/shopContext";
import { formatter } from "../../utils/helpers";

export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef();

  const { cartOpen, setCartOpen, checkoutUrl, removeCartItem } =
    useContext(CartContext);

  let cartTotal = 0;

  cart.map((item) => {
    cartTotal += item?.variantPrice * item?.variantQuantity;
  });

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-[1000] inset-0 overflow-hidden"
        onClose={() => {
          setCartOpen(!cartOpen);
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex pointer-events-none">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col overflow-y-scroll ">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6 ">
                    <div className="flex items-start justify-between ">
                      <Dialog.Title className="text-lg font-medium text-gray-900"></Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className=" text-gray-400 hover:text-gray-500 bg-white/60 backdrop-blur-md rounded px-1 py-1 thumbcursor pointer-events-auto"
                          onClick={() => setCartOpen(false)}
                          style={{ transition: "0.3s" }}
                        >
                          <span className="sr-only">Close panel</span>

                          {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <RiCloseFill className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flow-root pointer-events-auto">
                        {cart.length > 0 ? (
                          <>
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
                            >
                              {cart.map((product) => (
                                <li
                                  key={product.id + Math.random()}
                                  className="py-3 flex bg-white/60 backdrop-blur-md rounded px-4 mb-5"
                                >
                                  <div className="relative flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            href={`/shop/${product.handle}`}
                                            passHref
                                          >
                                            <a
                                              className="thumbcursor"
                                              onClick={() => setCartOpen(false)}
                                            >
                                              {product.title}
                                            </a>
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {formatter.format(
                                            product.variantPrice
                                          )}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-xs text-gray-500">
                                        {product.variantTitle}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-xs">
                                      <p className="text-gray-500">
                                        Qty {product.variantQuantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            removeCartItem(product.id)
                                          }
                                          type="button"
                                          className="font-medium thumbcursor text-gray-500 hover:text-gray-800"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            {cart.length > 0 ? (
                              <div className="py-4 sm:px-0">
                                <div className=" bg-white/60 backdrop-blur-md rounded px-5 py-4">
                                  <div className="flex justify-between text-base font-medium text-gray-900 ">
                                    <p>Subtotal</p>
                                    <p>{formatter.format(cartTotal)}</p>
                                  </div>
                                  <p className="mt-0.5 text-xs text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                </div>

                                <div className=" mt-6 ">
                                  <a
                                    href={checkoutUrl}
                                    className="flex justify-center items-center px-3 py-2 rounded text-base font-medium bg-white/60 backdrop-blur-md thumbcursor"
                                  >
                                    Checkout
                                  </a>
                                </div>
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div
                            className="thumbcursor px-3 py-2 rounded bg-white/60 backdrop-blur-md pointer-events-auto"
                            onClick={() => setCartOpen(false)}
                          >
                            <p>Nothing in your cart!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}