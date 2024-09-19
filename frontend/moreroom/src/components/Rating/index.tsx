import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { CustomStarIcon } from "./StarIcon";
import { RatingProps } from "./Rating.types";

const Rating: React.FC<RatingProps> = ({
  count = 5,
  value = 3,
  size = 1.5,
  activeColor = 'primary',
  transparentBackground = false,
  disabled = false,
  onChange = () => {},
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const ratingRef = useRef<HTMLDivElement>(null);

  // 사용자의 터치의 위치(clientX)를 기반으로 별점 계산하는 함수 
  const calculateRating = (clientX: number) => {
    if (ratingRef.current) {
      const { left, width } = ratingRef.current.getBoundingClientRect();
      const percent = (clientX - left) / width;
      const numberInStars = percent * count;
      const nearestHalf = Math.round(numberInStars * 2) / 2;
      return Math.min(Math.max(nearestHalf, 0.5), count);
    }
    return 0;
  };

  // 사용자가 화면을 터치하고 좌 우로 움직일 때 사용되는 함수 
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!disabled && isDragging) {
      const newValue = calculateRating(event.touches[0].clientX);
      setHoverValue(newValue);
      onChange(newValue);
    }
  };

  // 사용자가 화면을 처음 터치할 때 호출 
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!disabled) {
      setIsDragging(true);
      const newValue = calculateRating(event.touches[0].clientX);
      setHoverValue(newValue);
      onChange(newValue);
    }
  };

  // 사용자가 손가락을 화면에서 뗄 때 호출 
  // 만약 disabled가 false라면 드래그 상태 X
  const handleTouchEnd = () => {
    if (!disabled) {
      setIsDragging(false);
      setHoverValue(undefined);
    }
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너 추가 
  useEffect(() => {
    if (!disabled) {
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [disabled]);

  // 별 배열을 메모이제이션 
  const stars = useMemo(() => 
    Array.from({ length: count }, (_, index) => {
      const fillValue = (hoverValue !== undefined ? hoverValue : value) - index;
      return (
        <CustomStarIcon
          key={index}
          fill={Math.max(0, Math.min(5, fillValue))}
          size={size}
          activeColor={activeColor}
          transparentBackground={transparentBackground}
          isDragging={isDragging}
          disabled={disabled}
        />
      );
    }),
  [count, value, hoverValue, size, activeColor, transparentBackground, isDragging, disabled]
  );

  return (
    <div
      ref={ratingRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ display: 'inline-flex'}}
    >
      {stars}
    </div>
  );
};

export default Rating;