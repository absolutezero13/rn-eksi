import React, { useState } from 'react';
import { Pressable, PressableProps } from 'react-native';

export default function PressableOpacity(props: PressableProps): JSX.Element {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);


  const { children, style } = props;

  return (
    <Pressable
      {...props}
      onPressIn={() => {
        setScale(0.98);
        setOpacity(0.7)}}
      onPressOut={() => {
        setScale(1)

        setOpacity(1)}}
      style={[style, { opacity,transform: [{ scale }] }]}
    >
      {children}
    </Pressable>
  );
}
