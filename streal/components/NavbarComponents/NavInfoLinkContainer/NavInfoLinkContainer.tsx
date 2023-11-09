import React, { useRef } from 'react';
import MobileNavTitle from '../MobileNavTitle/MobileNavTitle';
import NavInfoLink, { LinkProps } from '../NavInfoLink/NavInfoLink';

import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { BsBook, BsDiscord, BsGithub } from 'react-icons/bs';
import { ImCreditCard } from 'react-icons/im';
import { WebModalProps } from '../GlobalSettings/GlobalSettings';
import { useSelector } from 'react-redux';
import useOutsideClick from '../../../hooks/useOutsideClick';
import useEscapeKey from '../../../hooks/useEscapeKey';

const NavInfoLinkContainer = ({ position, modal, setMoreModal }: any) => {
  const ref = useRef(null);

  const darkMode = useSelector((state: any) => state.interface.mode);

  const handleClose = () => {
    setMoreModal && setMoreModal(false);
  };

  useEscapeKey(handleClose);
  useOutsideClick(handleClose, ref);

  const Links = [
    { title: 'FAQ', icon: HiOutlineQuestionMarkCircle, url: '/faq' },
    { title: 'Developers', icon: BsBook, url: '/developers' },
    { title: 'Discord', icon: BsDiscord, url: '/discord' },
    { title: 'Github', icon: BsGithub, url: '/github' },
    { title: 'Buy Crypto With Fiat', icon: ImCreditCard, url: '/fiat' },
  ];

  return (
    <div
      ref={ref}
      className={`menu--container web--more bg-slate-700 ${
        position === 'web' && !modal && 'close--web--more--settings'
      } ${position === 'web' && darkMode && 'dark--mode--modal--bg'}`}
    >
      <MobileNavTitle text='Links' />
      {Links.map((obj) => (
        <NavInfoLink
          key={obj.title}
          url={obj.url}
          title={obj.title}
          Icon={obj.icon}
        />
      ))}
    </div>
  );
};

export default NavInfoLinkContainer;
