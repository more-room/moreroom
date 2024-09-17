import React, { useState, useMemo, useCallback, useRef } from "react";
import { CustomStarIcon } from "./StarIcon";
import { RatingProps } from "./Rating.types";
//"#e4e5e9"
const Rating: React.FC<RatingProps> = ({
  count = 5,
  value = 0,
  size = 1.5,
  activeColor = 'primary',
  transparentBackground = false,
  disabled = false,
  onChange = () => {},
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const ratingRef = useRef<HTMLDivElement>(null);

  const calculateRating = useCallback((clientX: number) => {
    if (ratingRef.current) {
      const { left, width } = ratingRef.current.getBoundingClientRect();
      const percent = (clientX - left) / width;
      const numberInStars = percent * count;
      const nearestHalf = Math.round(numberInStars * 2) / 2;
      return Math.min(Math.max(nearestHalf, 0.5), count);
    }
    return 0;
  }, [count]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && isDragging) {
      const newValue = calculateRating(event.clientX);
      setHoverValue(newValue);
      onChange(newValue);
    }
  }, [disabled, isDragging, calculateRating, onChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      setIsDragging(true);
      const newValue = calculateRating(event.clientX);
      setHoverValue(newValue);
      onChange(newValue);
    }
  }, [disabled, calculateRating, onChange]);

  const handleMouseUp = useCallback(() => {
    if (!disabled) {
      setIsDragging(false);
    }
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled) {
      if (isDragging) {
        setIsDragging(false);
      }
      setHoverValue(undefined);
    }
  }, [disabled, isDragging]);

  React.useEffect(() => {
    if (!disabled) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseUp, disabled]);

  const stars = useMemo(() => 
    Array.from({ length: count }, (_, index) => {
      const fillValue = (hoverValue !== undefined ? hoverValue : value) - index;
      return (
        <CustomStarIcon
          key={index}
          fill={Math.max(0, Math.min(1, fillValue))}
          size={size}
          activeColor={activeColor}
          transparentBackground={transparentBackground}
          isActive={!disabled && isDragging && fillValue > 0}
          disabled={disabled}
        />
      );
    }),
  [count, value, hoverValue, size, activeColor, transparentBackground, isDragging, disabled]
  );

  return (
    <div
      ref={ratingRef}
      style={{ 
        display: 'inline-block', 
        cursor: disabled ? 'default' : 'pointer',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {stars}
    </div>
  );
};

export default Rating;