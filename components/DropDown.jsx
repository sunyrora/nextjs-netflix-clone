import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const DropDown = ({ children, className = '' }) => {
  return (
    <div className="flex justify-center ml-6">
      <Menu as="div" className={`${className}`}>
        {/* <Menu.Button className={`${className?.menuButton}`}> */}
        <Menu.Button
          className={`'h-[12px] w-[50px] rounded bg-transparent text-[10px] p-0'`}
        >
          <div className="flex items-center space-x-1">
            <div>Browse</div>
            <div className="rotate-180 text-[9px]">∆</div>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition duration-300 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className={`absolute origin-top-left left-0 w-[250px] flex flex-col bg-bggray-100/90 border-t-2 borfder-white`}
          >
            <div className="">{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
