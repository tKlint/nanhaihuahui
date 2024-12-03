import React, { useState } from 'react';

export type TUseEnum<T> = [
  T,
  {
    triggerEnumType: React.Dispatch<React.SetStateAction<T>>;
    whenEnumType: (type: T) => boolean;
  }
];

export function useEnum<T>(defaultEnumType: T): TUseEnum<T> {
  const [enumType, triggerEnumType] = useState<T>(defaultEnumType);

  function whenEnumType(type: T) {
    return enumType === type;
  }

  return [
    enumType,
    {
      triggerEnumType,
      whenEnumType
    }
  ];
}
