/** @jsxImportSource @emotion/react */
import React, { Key, ReactElement, useEffect, useState } from 'react';

interface TransitionProps {
  ['data-key']: Key;
  wrapperCss?: React.CSSProperties;
  children: ReactElement[];
}

export const Transition = (props: TransitionProps) => {
  const [currentItem, setCurrentItem] = useState<ReactElement | null>(null);

  useEffect(() => {
    const matchedChild = props.children.find(
      (child) => child.key === props['data-key']
    );
    if (matchedChild) {
      setCurrentItem(matchedChild);
    }
  }, [props['data-key'], props.children]);

  return (
    <div style={props.wrapperCss}>
      {currentItem}
    </div>
  );
};
