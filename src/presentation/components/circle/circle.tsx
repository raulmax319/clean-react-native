import React from 'react';
import { CircleProps, RedCircle } from './circle.styles';

const Circle: React.FC<CircleProps> = (props) => <RedCircle {...props} />;

export default React.memo(Circle);
