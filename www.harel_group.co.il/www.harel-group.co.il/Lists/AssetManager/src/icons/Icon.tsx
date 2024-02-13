import React, {FC} from 'react';
import * as icons from './components/index';

export interface IconProps {
  name:
    | 'add'
    | 'bikes'
    | 'camera'
    | 'cancel'
    | 'earthQuake'
    | 'folder'
    | 'garage'
    | 'homeInside'
    | 'homeOnly'
    | 'houseBroken'
    | 'info'
    | 'infoOpen'
    | 'jewellery'
    | 'laptop'
    | 'pipesBroken'
    | 'thirdSide'
    | 'trash'
    | 'worker'
    | 'workFromHome';
}

export const Icon: FC<IconProps> = ({name}) => {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const iconName = capitalize(name);
  // @ts-ignore
  if (icons[iconName]) {
    // @ts-ignore
    const SvgIcon = icons[iconName];
    return <SvgIcon />;
  }
  return <></>;
};
